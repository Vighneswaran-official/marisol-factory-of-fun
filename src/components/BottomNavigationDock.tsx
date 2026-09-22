import React from 'react';
import { Home, Sparkles, Music, Play, Lock } from 'lucide-react';
import { audioEngine } from '../services/synthAudioEngine';

export type MainNavTab = 'home' | 'anime' | 'lounge' | 'quiz' | 'locket';

interface BottomNavigationDockProps {
  activeTab: MainNavTab;
  onTabSelect: (tab: MainNavTab) => void;
}

export const BottomNavigationDock: React.FC<BottomNavigationDockProps> = ({ activeTab, onTabSelect }) => {
  const tabs: Array<{ id: MainNavTab; label: string; icon: React.ReactNode; emoji: string }> = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, emoji: '🏠' },
    { id: 'anime', label: 'Cartoon', icon: <Sparkles className="w-4 h-4" />, emoji: '🎬' },
    { id: 'lounge', label: 'Lounge', icon: <Music className="w-4 h-4" />, emoji: '🎵' },
    { id: 'quiz', label: 'Quiz', icon: <Play className="w-4 h-4 fill-current" />, emoji: '🍳' },
    { id: 'locket', label: 'Locket', icon: <Lock className="w-4 h-4" />, emoji: '🔐' },
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-white/90 backdrop-blur-md border-2 border-pink-300 rounded-full px-3 py-1.5 shadow-sketch-lg flex items-center gap-1 sm:gap-2 max-w-md w-full justify-around">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioEngine.playSfx('click');
                onTabSelect(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 sm:px-3 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs scale-105 font-black'
                  : 'text-stone-500 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <span className="text-base sm:text-lg leading-none">{tab.emoji}</span>
              <span className="text-[10px] sm:text-[11px] font-display font-black tracking-tight mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
