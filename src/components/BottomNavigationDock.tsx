import React from 'react';
import { audioEngine } from '../services/synthAudioEngine';

export type MainNavTab = 'home' | 'music' | 'quiz' | 'wall';

interface BottomNavigationDockProps {
  activeTab: MainNavTab;
  onTabSelect: (tab: MainNavTab) => void;
}

export const BottomNavigationDock: React.FC<BottomNavigationDockProps> = ({ activeTab, onTabSelect }) => {
  const tabs: Array<{ id: MainNavTab; label: string; emoji: string }> = [
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'music', label: 'Music', emoji: '🎵' },
    { id: 'quiz', label: '1000+ Quiz', emoji: '🎯' },
    { id: 'wall', label: 'Chat & Wall', emoji: '💬' },
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-2 sm:px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-md border border-stone-300 rounded-full p-1.5 shadow-lg flex items-center gap-1 max-w-md w-full justify-between">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioEngine.playSfx('click');
                onTabSelect(tab.id);
              }}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 sm:px-3 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-xs scale-102 font-black'
                  : 'text-stone-700 hover:text-rose-600 hover:bg-rose-50/80 font-bold'
              }`}
            >
              <span className="text-base sm:text-lg leading-none">{tab.emoji}</span>
              <span className="text-[11px] sm:text-xs font-display font-black tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
