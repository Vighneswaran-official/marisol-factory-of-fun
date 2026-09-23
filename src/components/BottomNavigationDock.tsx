import React from 'react';
import { audioEngine } from '../services/synthAudioEngine';

export type MainNavTab = 'home' | 'play' | 'comfort' | 'vault' | 'profile';

interface BottomNavigationDockProps {
  activeTab: MainNavTab;
  onTabSelect: (tab: MainNavTab) => void;
}

export const BottomNavigationDock: React.FC<BottomNavigationDockProps> = ({ activeTab, onTabSelect }) => {
  const tabs: Array<{ id: MainNavTab; label: string; emoji: string }> = [
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'play', label: 'Play', emoji: '🍳' },
    { id: 'comfort', label: 'Comfort', emoji: '🌸' },
    { id: 'vault', label: 'Vault', emoji: '📖' },
    { id: 'profile', label: 'Profile', emoji: '👑' },
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none">
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-md border-2.5 border-ink rounded-full px-2.5 py-1.5 shadow-sketch-lg flex items-center gap-1 sm:gap-2 max-w-md w-full justify-around">
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
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sketch-xs scale-105 font-black'
                  : 'text-stone-600 hover:text-pink-600 hover:bg-pink-50'
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
