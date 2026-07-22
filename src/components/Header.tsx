import React, { useState } from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onOpenAccount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#faf8ff]/95 backdrop-blur-md border-b border-[#c3c6d7]/40 shadow-2xs">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center px-4 md:px-8 py-3">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2 cursor-pointer active:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-lg bg-[#004ac6] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-xl">menu_book</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif-headline text-xl font-bold text-[#004ac6] leading-tight tracking-tight">LitBuddy AI</h1>
            <span className="text-[10px] font-semibold text-[#516070] -mt-0.5 hidden sm:inline-block">Literary Assistant</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex gap-1.5 items-center bg-[#eaedff]/60 p-1 rounded-full border border-[#c3c6d7]/30">
            <button
              onClick={() => handleNavClick('home')}
              className={`font-sans-body text-xs md:text-sm px-4 py-1.5 rounded-full transition-all font-semibold cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#004ac6] bg-white shadow-2xs'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('analyzer')}
              className={`font-sans-body text-xs md:text-sm px-4 py-1.5 rounded-full transition-all font-semibold cursor-pointer ${
                currentView === 'analyzer'
                  ? 'text-[#004ac6] bg-white shadow-2xs'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
            >
              Deep Analyzer
            </button>
            <button
              onClick={() => handleNavClick('planner')}
              className={`font-sans-body text-xs md:text-sm px-4 py-1.5 rounded-full transition-all font-semibold cursor-pointer ${
                currentView === 'planner'
                  ? 'text-[#004ac6] bg-white shadow-2xs'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
            >
              Smart Planner
            </button>
          </nav>

          {/* Quick Action Button */}
          <button
            onClick={() => handleNavClick('planner')}
            className="hidden sm:flex items-center gap-1.5 bg-[#004ac6] text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-[#003ea8] transition-colors shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">edit_note</span>
            Draft Outline
          </button>

          {/* Account Icon */}
          <button
            onClick={onOpenAccount}
            title="Scholar Workspace & Saved Outlines"
            className="material-symbols-outlined text-[#434655] cursor-pointer hover:bg-[#eaedff] transition-colors p-2 rounded-full text-2xl"
          >
            account_circle
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#434655] p-1.5 rounded-lg hover:bg-[#eaedff] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#c3c6d7] px-4 py-3 space-y-2 animate-fade-in shadow-md">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              currentView === 'home' ? 'bg-[#d5e4f8] text-[#004ac6]' : 'text-[#434655]'
            }`}
          >
            <span className="material-symbols-outlined text-base">home</span>
            Home
          </button>
          <button
            onClick={() => handleNavClick('analyzer')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              currentView === 'analyzer' ? 'bg-[#d5e4f8] text-[#004ac6]' : 'text-[#434655]'
            }`}
          >
            <span className="material-symbols-outlined text-base">analytics</span>
            Deep Text Analyzer
          </button>
          <button
            onClick={() => handleNavClick('planner')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              currentView === 'planner' ? 'bg-[#d5e4f8] text-[#004ac6]' : 'text-[#434655]'
            }`}
          >
            <span className="material-symbols-outlined text-base">schema</span>
            Smart Outline Planner
          </button>
        </div>
      )}
    </header>
  );
};

