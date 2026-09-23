import React from 'react';
import { audioEngine } from '../services/synthAudioEngine';

export type MainNavTab = 'home' | 'quiz' | 'wall';

interface BottomNavigationDockProps {
  activeTab: MainNavTab;
  onTabSelect: (tab: MainNavTab) => void;
}

export const BottomNavigationDock: React.FC<BottomNavigationDockProps> = ({ activeTab, onTabSelect }) => {
  const tabs: Array<{ id: MainNavTab; label: string; emoji: string }> = [
    { id: 'home', label: 'Home & Video', emoji: '🏠' },
    { id: 'quiz', label: 'Mood Quiz', emoji: '🎯' },
    { id: 'wall', label: 'Bulletin Chat', emoji: '📌' },
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-md border-2.5 border-ink rounded-full p-1.5 shadow-sketch-lg flex items-center gap-1 sm:gap-3 max-w-sm w-full justify-between">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioEngine.playSfx('click');
                onTabSelect(tab.id);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-sketch-xs scale-102 font-black'
                  : 'text-stone-700 hover:text-pink-600 hover:bg-pink-50/80 font-bold'
              }`}
            >
              <span className="text-lg leading-none">{tab.emoji}</span>
              <span className="text-xs font-display font-black tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
