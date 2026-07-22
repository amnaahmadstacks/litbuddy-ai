import React from 'react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#faf8ff] border-t border-[#c3c6d7] md:hidden shadow-lg">
      <button
        onClick={() => setCurrentView('home')}
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${
          currentView === 'home'
            ? 'bg-[#d5e4f8] text-[#576676] rounded-full font-bold scale-105'
            : 'text-[#434655] hover:text-[#004ac6]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">home</span>
        <span className="text-xs font-semibold">Home</span>
      </button>

      <button
        onClick={() => setCurrentView('analyzer')}
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${
          currentView === 'analyzer'
            ? 'bg-[#d5e4f8] text-[#576676] rounded-full font-bold scale-105'
            : 'text-[#434655] hover:text-[#004ac6]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">analytics</span>
        <span className="text-xs font-semibold">Analyzer</span>
      </button>

      <button
        onClick={() => setCurrentView('planner')}
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${
          currentView === 'planner'
            ? 'bg-[#d5e4f8] text-[#576676] rounded-full font-bold scale-105'
            : 'text-[#434655] hover:text-[#004ac6]'
        }`}
      >
        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          edit_note
        </span>
        <span className="text-xs font-semibold">Planner</span>
      </button>
    </nav>
  );
};
