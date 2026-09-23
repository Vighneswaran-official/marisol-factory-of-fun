// Firebase Initialization & Services
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  type Auth,
  type User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc,
  getDocs, 
  addDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy,
  limit,
  serverTimestamp,
  type Firestore
} from 'firebase/firestore';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Read from Vite environment variables with fallback to project credentials
const envConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyD4dIfV_Xv7sE_sx4wHE6n66QGWw9HZf-A',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kritika-61cc2.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kritika-61cc2',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kritika-61cc2.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '926415718546',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:926415718546:web:bbca8e9e21becdbc8d7e4b',
};

// Check if valid Firebase credentials are provided
export const isFirebaseConfigured = Boolean(
  envConfig.apiKey && 
  envConfig.apiKey !== 'YOUR_FIREBASE_API_KEY' &&
  envConfig.projectId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(envConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (error) {
    console.warn('Firebase initialization error, fallback mode active:', error);
  }
}

export { 
  app, 
  auth, 
  db, 
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  firebaseSignOut,
  onAuthStateChanged,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  type FirebaseUser
};
