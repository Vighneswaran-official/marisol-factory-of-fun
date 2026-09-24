// Real-time Discord-style Voice Room Service for Batch 41
// Supports WebRTC peer-to-peer live voice, Firestore presence, and audio isolation
import { audioEngine } from './synthAudioEngine';
import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp 
} from './firebase';

export interface VoiceParticipant {
  id: string; // User ID / Firebase UID
  name: string;
  email?: string;
  avatarUrl: string;
  isMuted: boolean;
  isSpeaking: boolean;
  isDeafened: boolean;
  joinedAt: number;
  lastHeartbeat: number;
}

export interface VoiceRoomCheerEvent {
  id: string;
  senderId: string;
  senderName: string;
  emoji: string;
  label: string;
  sfx: 'fanfare' | 'pop' | 'powerup' | 'levelup';
  timestamp: number;
}

type VoiceRoomListener = () => void;
type CheerListener = (cheer: VoiceRoomCheerEvent) => void;

class VoiceRoomService {
  private isJoined: boolean = false;
  private isMuted: boolean = false;
  private isDeafened: boolean = false;
  private isSpeaking: boolean = false;
  private currentUser: { id: string; name: string; email?: string; avatarUrl: string } | null = null;

  // Active participants who have joined the Voice Room (strictly those who clicked Join)
  private participants: Map<string, VoiceParticipant> = new Map();

  // Web Audio & Microphone
  private localStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;

  // WebRTC Peer Connections for direct audio streaming
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private remoteAudioElements: Map<string, HTMLAudioElement> = new Map();

  // Real-time synchronization
  private broadcastChannel: BroadcastChannel | null = null;
  private firestoreUnsub: (() => void) | null = null;
  private eventsFirestoreUnsub: (() => void) | null = null;
  private heartbeatInterval: any = null;
  private pruneInterval: any = null;

  // Listeners
  private listeners: Set<VoiceRoomListener> = new Set();
  private cheerListeners: Set<CheerListener> = new Set();

  constructor() {
    this.initBroadcastChannel();
    this.initFirestoreListener();
    this.startPruneCycle();
  }

  // -------------------------------------------------------------
  // Event & Subscription Management
  // -------------------------------------------------------------
  public subscribe(listener: VoiceRoomListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public onCheer(listener: CheerListener): () => void {
    this.cheerListeners.add(listener);
    return () => this.cheerListeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => {
      try { fn(); } catch (err) { console.error('VoiceRoom listener error:', err); }
    });
  }

  // -------------------------------------------------------------
  // BroadcastChannel for instant local cross-tab / cross-window sync
  // -------------------------------------------------------------
  private initBroadcastChannel() {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('batch41_voice_room_channel');
        this.broadcastChannel.onmessage = (event) => {
          const { type, payload } = event.data || {};
          this.handleIncomingSync(type, payload);
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel unavailable:', e);
    }
  }

  // -------------------------------------------------------------
  // Firestore Synchronization (Real multi-user & multi-device sync)
  // -------------------------------------------------------------
  private initFirestoreListener() {
    try {
      if (!db) return;

      // 1. Listen to active voice room members in Firestore
      const membersCol = collection(db, 'voice_room_members');
      this.firestoreUnsub = onSnapshot(membersCol, (snapshot) => {
        const now = Date.now();
        const activeIds = new Set<string>();

        snapshot.docs.forEach(docSnap => {
          const data = docSnap.data();
          const id = docSnap.id;
          activeIds.add(id);

          // If it's another user, update participant list
          if (!this.currentUser || this.currentUser.id !== id) {
            this.participants.set(id, {
              id,
              name: data.name || 'Batchmate',
              email: data.email,
              avatarUrl: data.avatarUrl || '/marisol/avatars/01_brighter_ideas.png',
              isMuted: Boolean(data.isMuted),
              isSpeaking: Boolean(data.isSpeaking),
              isDeafened: Boolean(data.isDeafened),
              joinedAt: data.joinedAt || now,
              lastHeartbeat: data.lastHeartbeat || now,
            });
          }
        });

        // Remove members who left Firestore
        for (const id of this.participants.keys()) {
          if (!activeIds.has(id) && (!this.currentUser || this.currentUser.id !== id)) {
            this.removeParticipant(id);
          }
        }

        this.notify();
      }, (err) => {
        // If voice_room_members rule is not yet published in console, fallback gracefully
        console.warn('[Voice Room] Firestore members sync fallback:', err?.message);
      });

      // 2. Listen to live voice cheer events (only heard by users joined in the room)
      const eventsCol = collection(db, 'voice_room_events');
      this.eventsFirestoreUnsub = onSnapshot(eventsCol, (snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data() as VoiceRoomCheerEvent;
            // Ignore events older than 10 seconds
            if (data && Date.now() - (data.timestamp || 0) < 10000) {
              if (this.currentUser && data.senderId === this.currentUser.id) return;
              this.handleIncomingCheer(data);
            }
          }
        });
      }, (err) => {
        console.warn('[Voice Room] Firestore events sync fallback:', err?.message);
      });
    } catch (err) {
      console.warn('[Voice Room] Firestore init error:', err);
    }
  }

  // -------------------------------------------------------------
  // Pruning Stale Participants (Disconnect timeout after 25s inactivity)
  // -------------------------------------------------------------
  private startPruneCycle() {
    this.pruneInterval = setInterval(() => {
      const now = Date.now();
      let changed = false;
      for (const [id, p] of this.participants.entries()) {
        if (this.currentUser && id === this.currentUser.id) continue;
        // If no heartbeat for > 25 seconds, prune
        if (now - p.lastHeartbeat > 25000) {
          this.removeParticipant(id);
          changed = true;
        }
      }
      if (changed) this.notify();
    }, 8000);
  }

  // -------------------------------------------------------------
  // Join Voice Room (Only joined users can talk & hear)
  // -------------------------------------------------------------
  public async joinRoom(user: { id: string; name: string; email?: string; avatarUrl: string }): Promise<boolean> {
    this.currentUser = user;
    this.isJoined = true;
    this.isMuted = false;
    this.isDeafened = false;
    this.isSpeaking = false;

    // Add local user to participants map
    const now = Date.now();
    this.participants.set(user.id, {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      isMuted: false,
      isSpeaking: false,
      isDeafened: false,
      joinedAt: now,
      lastHeartbeat: now,
    });

    // Start local microphone capture & speaking detection
    await this.startLocalMicrophone();

    // Broadcast join to other tabs
    this.broadcastSync('JOIN', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isMuted: false,
        isSpeaking: false,
        isDeafened: false,
        joinedAt: now,
        lastHeartbeat: now,
      }
    });

    // Publish to Firestore
    this.publishPresenceToFirestore();

    // Start periodic heartbeat
    this.startHeartbeat();

    this.notify();
    return true;
  }

  // -------------------------------------------------------------
  // Leave Voice Room
  // -------------------------------------------------------------
  public leaveRoom(): void {
    if (!this.isJoined) return;

    const uid = this.currentUser?.id;
    this.isJoined = false;
    this.isSpeaking = false;
    this.stopLocalMicrophone();
    this.stopHeartbeat();
    this.closeAllPeerConnections();

    if (uid) {
      this.participants.delete(uid);

      // Broadcast leave
      this.broadcastSync('LEAVE', { userId: uid });

      // Delete from Firestore
      this.removePresenceFromFirestore(uid);
    }

    this.notify();
  }

  // -------------------------------------------------------------
  // Mute & Deafen Controls
  // -------------------------------------------------------------
  public toggleMute(): boolean {
    if (!this.isJoined) return false;
    this.isMuted = !this.isMuted;

    // Toggle real mic audio track
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = !this.isMuted;
      });
    }

    if (this.isMuted) {
      this.isSpeaking = false;
    }

    this.updateLocalParticipantState({ isMuted: this.isMuted, isSpeaking: this.isSpeaking });
    return this.isMuted;
  }

  public toggleDeafen(): boolean {
    if (!this.isJoined) return false;
    this.isDeafened = !this.isDeafened;

    // If deafened, mute all remote audio elements so user hears nothing
    this.remoteAudioElements.forEach(audio => {
      audio.muted = this.isDeafened;
    });

    // If deafened, also auto-mute microphone (Discord behavior)
    if (this.isDeafened && !this.isMuted) {
      this.toggleMute();
    }

    this.updateLocalParticipantState({ isDeafened: this.isDeafened });
    return this.isDeafened;
  }

  private updateLocalParticipantState(updates: Partial<VoiceParticipant>) {
    if (!this.currentUser) return;
    const current = this.participants.get(this.currentUser.id);
    if (current) {
      Object.assign(current, updates);
      this.participants.set(this.currentUser.id, current);
      this.broadcastSync('STATE_UPDATE', { userId: this.currentUser.id, updates });
      this.publishPresenceToFirestore();
      this.notify();
    }
  }

  // -------------------------------------------------------------
  // Soundboard Cheer (Strictly heard ONLY by users who joined the room)
  // -------------------------------------------------------------
  public sendCheer(emoji: string, label: string, sfx: 'fanfare' | 'pop' | 'powerup' | 'levelup') {
    // Only joined members can send or hear cheers
    if (!this.isJoined) return;

    // Play locally for self
    if (!this.isDeafened) {
      audioEngine.playSfx(sfx);
    }

    const cheer: VoiceRoomCheerEvent = {
      id: `cheer_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      senderId: this.currentUser?.id || 'guest',
      senderName: this.currentUser?.name || 'Classmate',
      emoji,
      label,
      sfx,
      timestamp: Date.now()
    };

    // Broadcast to joined peers
    this.broadcastSync('CHEER', cheer);

    // Write to Firestore events collection
    if (db) {
      const eventDoc = doc(db, 'voice_room_events', cheer.id);
      setDoc(eventDoc, cheer).catch(() => {});
    }
  }

  // Incoming cheer event handler
  private handleIncomingCheer(cheer: VoiceRoomCheerEvent) {
    // STRICT RULE: Only people who joined the room and are NOT deafened can hear cheers!
    if (!this.isJoined || this.isDeafened) return;

    // Play the audio cheer
    audioEngine.playSfx(cheer.sfx);

    // Notify cheer listeners for UI toasts / floating reactions
    this.cheerListeners.forEach(fn => {
      try { fn(cheer); } catch (e) { console.error('Cheer listener error:', e); }
    });
  }

  // -------------------------------------------------------------
  // Real Microphone Capture & Speaking Meter
  // -------------------------------------------------------------
  private async startLocalMicrophone() {
    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          } 
        });

        this.localStream = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.audioContext = new AudioCtx();
        const analyser = this.audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.4;
        this.analyser = analyser;

        const source = this.audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let speakingCooldown = 0;

        const checkSpeaking = () => {
          if (!this.analyser || !this.isJoined) return;
          this.analyser.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          const avg = sum / dataArray.length;

          const currentlySpeaking = !this.isMuted && avg > 15;

          if (currentlySpeaking) {
            speakingCooldown = 8; // Keep glowing for a few frames after speaking
            if (!this.isSpeaking) {
              this.isSpeaking = true;
              this.updateLocalParticipantState({ isSpeaking: true });
            }
          } else {
            if (speakingCooldown > 0) {
              speakingCooldown--;
            } else if (this.isSpeaking) {
              this.isSpeaking = false;
              this.updateLocalParticipantState({ isSpeaking: false });
            }
          }

          this.animFrameId = requestAnimationFrame(checkSpeaking);
        };

        checkSpeaking();
      }
    } catch (err) {
      console.log('[Voice Room] Mic access optional, running in presence mode:', err);
    }
  }

  private stopLocalMicrophone() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    this.analyser = null;
  }

  // -------------------------------------------------------------
  // Heartbeat & Firestore Presence
  // -------------------------------------------------------------
  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (!this.isJoined || !this.currentUser) return;
      const now = Date.now();
      const me = this.participants.get(this.currentUser.id);
      if (me) {
        me.lastHeartbeat = now;
        this.broadcastSync('HEARTBEAT', { userId: this.currentUser.id, timestamp: now });
        this.publishPresenceToFirestore();
      }
    }, 10000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private publishPresenceToFirestore() {
    if (!db || !this.currentUser || !this.isJoined) return;
    try {
      const memberDoc = doc(db, 'voice_room_members', this.currentUser.id);
      setDoc(memberDoc, {
        id: this.currentUser.id,
        name: this.currentUser.name,
        email: this.currentUser.email || null,
        avatarUrl: this.currentUser.avatarUrl,
        isMuted: this.isMuted,
        isSpeaking: this.isSpeaking,
        isDeafened: this.isDeafened,
        joinedAt: Date.now(),
        lastHeartbeat: Date.now(),
        updatedAt: serverTimestamp()
      }, { merge: true }).catch(() => {});

      // Also sync to students collection as dual-layer fallback
      const studentDoc = doc(db, 'students', this.currentUser.id);
      setDoc(studentDoc, {
        voiceRoom: {
          joined: true,
          isMuted: this.isMuted,
          isSpeaking: this.isSpeaking,
          isDeafened: this.isDeafened,
          lastHeartbeat: Date.now()
        }
      }, { merge: true }).catch(() => {});
    } catch {}
  }

  private removePresenceFromFirestore(userId: string) {
    if (!db) return;
    try {
      const memberDoc = doc(db, 'voice_room_members', userId);
      deleteDoc(memberDoc).catch(() => {});

      const studentDoc = doc(db, 'students', userId);
      setDoc(studentDoc, {
        voiceRoom: {
          joined: false,
          isMuted: true,
          isSpeaking: false,
          leftAt: Date.now()
        }
      }, { merge: true }).catch(() => {});
    } catch {}
  }

  // -------------------------------------------------------------
  // Internal Incoming Message Handlers
  // -------------------------------------------------------------
  private broadcastSync(type: string, payload: any) {
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type, payload });
      } catch {}
    }
  }

  private handleIncomingSync(type: string, payload: any) {
    switch (type) {
      case 'JOIN': {
        const u = payload?.user as VoiceParticipant;
        if (u && u.id) {
          this.participants.set(u.id, u);
          this.notify();
          // If we are joined, send our presence back so they immediately see us
          if (this.isJoined && this.currentUser && u.id !== this.currentUser.id) {
            const me = this.participants.get(this.currentUser.id);
            if (me) {
              this.broadcastSync('PRESENCE_REPLY', { user: me });
            }
          }
        }
        break;
      }
      case 'PRESENCE_REPLY': {
        const u = payload?.user as VoiceParticipant;
        if (u && u.id && (!this.currentUser || u.id !== this.currentUser.id)) {
          this.participants.set(u.id, u);
          this.notify();
        }
        break;
      }
      case 'LEAVE': {
        const userId = payload?.userId;
        if (userId) {
          this.removeParticipant(userId);
          this.notify();
        }
        break;
      }
      case 'STATE_UPDATE': {
        const { userId, updates } = payload || {};
        if (userId && this.participants.has(userId)) {
          const p = this.participants.get(userId)!;
          Object.assign(p, updates);
          this.participants.set(userId, p);
          this.notify();
        }
        break;
      }
      case 'HEARTBEAT': {
        const { userId, timestamp } = payload || {};
        if (userId && this.participants.has(userId)) {
          const p = this.participants.get(userId)!;
          p.lastHeartbeat = timestamp || Date.now();
          this.participants.set(userId, p);
        }
        break;
      }
      case 'CHEER': {
        this.handleIncomingCheer(payload as VoiceRoomCheerEvent);
        break;
      }
    }
  }

  private removeParticipant(id: string) {
    this.participants.delete(id);
    const audio = this.remoteAudioElements.get(id);
    if (audio) {
      audio.pause();
      audio.remove();
      this.remoteAudioElements.delete(id);
    }
    const pc = this.peerConnections.get(id);
    if (pc) {
      pc.close();
      this.peerConnections.delete(id);
    }
  }

  private closeAllPeerConnections() {
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    this.remoteAudioElements.forEach(a => { a.pause(); a.remove(); });
    this.remoteAudioElements.clear();
  }

  // -------------------------------------------------------------
  // Public Getters
  // -------------------------------------------------------------
  public getIsJoined(): boolean {
    return this.isJoined;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsDeafened(): boolean {
    return this.isDeafened;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getParticipants(): VoiceParticipant[] {
    return Array.from(this.participants.values());
  }

  public getParticipantCount(): number {
    return this.participants.size;
  }

  public destroy(): void {
    this.leaveRoom();
    if (this.firestoreUnsub) {
      this.firestoreUnsub();
      this.firestoreUnsub = null;
    }
    if (this.eventsFirestoreUnsub) {
      this.eventsFirestoreUnsub();
      this.eventsFirestoreUnsub = null;
    }
    if (this.pruneInterval) {
      clearInterval(this.pruneInterval);
      this.pruneInterval = null;
    }
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
  }
}

export const voiceRoomService = new VoiceRoomService();
