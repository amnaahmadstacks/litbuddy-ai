import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  setCurrentView: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="w-full bg-[#131b2e] text-[#eef0ff] border-t border-[#283044] pt-12 pb-24 md:pb-12 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#283044]">
          {/* Brand & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <span className="material-symbols-outlined text-[#b4c5ff] text-3xl font-bold">menu_book</span>
              <h2 className="font-serif-headline text-2xl font-bold text-white tracking-tight">LitBuddy AI</h2>
            </div>
            <p className="font-sans-body text-sm text-[#c3c6d7] leading-relaxed max-w-sm">
              LitBuddy AI bridges classical literary scholarship with cutting-edge artificial intelligence. Architect structured essay blueprints, unpack complex motifs, and master English literature with confidence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#283044] text-[#b4c5ff] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">school</span>
              Final Project Submission
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-sans-body text-xs font-bold uppercase tracking-wider text-[#b4c5ff]">Navigation</h3>
            <ul className="space-y-2 text-sm font-sans-body text-[#c3c6d7]">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('analyzer')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  Deep Text Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('planner')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  Smart Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-sans-body text-xs font-bold uppercase tracking-wider text-[#b4c5ff]">Core Capabilities</h3>
            <ul className="space-y-2 text-xs font-sans-body text-[#c3c6d7]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#b4c5ff]">schema</span>
                Rhetorical & Outline Blueprinting
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#b4c5ff]">auto_awesome</span>
                Symbolism & Imagery Extraction
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#b4c5ff]">auto_stories</span>
                Pre-loaded Classics Editions
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#b4c5ff]">forum</span>
                Interactive Text Q&A Tutor
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#737686] gap-4">
          <div>
            © {new Date().getFullYear()} LitBuddy AI. Built with Google AI Studio & Gemini API.
          </div>
          <div className="flex gap-6 text-[#c3c6d7]">
            <span className="hover:text-white cursor-pointer transition-colors">Academic Ethics</span>
            <span className="hover:text-white cursor-pointer transition-colors">Citation Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
