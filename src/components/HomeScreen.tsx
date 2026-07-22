import React from 'react';
import { AppView, ClassicText } from '../types';
import { CLASSICS_LIBRARY } from '../data/classics';

interface HomeScreenProps {
  setCurrentView: (view: AppView) => void;
  onSelectClassic: (classic: ClassicText) => void;
  onSetAnalyzerPreset: (preset: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  setCurrentView,
  onSelectClassic,
  onSetAnalyzerPreset,
}) => {
  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-10 pb-32">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-10 md:py-16 gap-10">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#d5e4f8] text-[#004ac6] font-sans-body text-xs font-semibold shadow-xs">
            <span className="mr-2">✨</span> Literary AI Assistant
          </div>
          <h2 className="font-serif-headline text-3xl sm:text-5xl md:text-6xl text-[#131b2e] leading-tight font-bold">
            Master English Literature with AI.
          </h2>
          <p className="font-sans-body text-base md:text-lg text-[#434655] max-w-xl leading-relaxed">
            Analyze texts, discover themes, and plan your perfect essay in seconds. LitBuddy provides the intellectual depth of a scholar with the speed of advanced intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
            <button
              onClick={() => setCurrentView('planner')}
              className="bg-[#004ac6] text-white px-8 py-3.5 rounded-lg font-sans-body text-base font-bold shadow-md hover:bg-[#003ea8] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Get Started
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <button
              onClick={() => setCurrentView('analyzer')}
              className="border border-[#c3c6d7] text-[#004ac6] bg-white px-8 py-3.5 rounded-lg font-sans-body text-base font-bold hover:bg-[#eaedff] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Analyzer
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center relative w-full max-w-md">
          <div className="absolute w-64 h-64 bg-[#2563eb]/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm bg-white border border-[#c3c6d7] p-2.5">
            <img
              className="w-full h-full object-cover rounded-xl"
              alt="A high-end digital illustration featuring vintage books beside a tablet with glowing neural network"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_IRe8R3ozX7zRwtw2aEAkPx4wm8XcNs-3RMrwXmb8P80vgf5W85LYDoKD_beZMzCrrKjK-JjQLDg06dIqsk8qbc5Mo5L9-3sFRKMRgCdxQ-_EraUPBFJ1qKLz8v3Oup7IPFbCjxiqijWx8l1WgCb814T57SWcIKNTvsV_FNxl0LnXA5HkcMOuXqhBjm2dHg1ZhneWp4Z8pKmhlM6H1Se0Ic3lgyIaYXyFQntXWwyKnx8GwDrhW6qf"
            />
          </div>
        </div>
      </section>

      {/* App Description & Mission Banner */}
      <section className="bg-white border border-[#c3c6d7] rounded-2xl p-6 md:p-8 shadow-xs my-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[180px] text-[#004ac6]">auto_stories</span>
        </div>
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-xl">info</span>
            <span className="font-sans-body text-xs font-bold uppercase tracking-wider text-[#004ac6]">About LitBuddy AI</span>
          </div>
          <h3 className="font-serif-headline text-2xl md:text-3xl font-bold text-[#131b2e]">
            Your Complete Digital Academic Companion
          </h3>
          <p className="font-sans-body text-sm md:text-base text-[#434655] leading-relaxed">
            LitBuddy AI is designed for students, educators, and literary enthusiasts to simplify high-level text deconstruction and academic writing. Powered by Google Gemini AI, it generates structured essay blueprints, extracts symbolism, foreshowing, and tone, and provides interactive Q&A tutoring for literary passages.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#faf8ff] p-3 rounded-lg border border-[#c3c6d7]/50 text-center">
              <span className="font-serif-headline text-lg font-bold text-[#004ac6] block">100%</span>
              <span className="text-[11px] text-[#434655] font-semibold">Structured Outlines</span>
            </div>
            <div className="bg-[#faf8ff] p-3 rounded-lg border border-[#c3c6d7]/50 text-center">
              <span className="font-serif-headline text-lg font-bold text-[#004ac6] block">6+</span>
              <span className="text-[11px] text-[#434655] font-semibold">Literary Lenses</span>
            </div>
            <div className="bg-[#faf8ff] p-3 rounded-lg border border-[#c3c6d7]/50 text-center">
              <span className="font-serif-headline text-lg font-bold text-[#004ac6] block">Classics</span>
              <span className="text-[11px] text-[#434655] font-semibold">Pre-loaded Works</span>
            </div>
            <div className="bg-[#faf8ff] p-3 rounded-lg border border-[#c3c6d7]/50 text-center">
              <span className="font-serif-headline text-lg font-bold text-[#004ac6] block">Scholar</span>
              <span className="text-[11px] text-[#434655] font-semibold">Interactive Q&A</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8">
        {/* Deep Text Analyzer */}
        <div className="md:col-span-8 bg-white border border-[#c3c6d7] rounded-xl p-6 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#d5e4f8] flex items-center justify-center text-[#004ac6] mb-3">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <h3 className="font-serif-headline text-2xl font-semibold text-[#131b2e]">Deep Text Analyzer</h3>
              <p className="font-sans-body text-sm md:text-base text-[#434655] mt-2 leading-relaxed">
                Upload any passage and let LitBuddy identify motifs, metaphors, and historical contexts instantly.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Symbolism', 'Foreshadowing', 'Tone Analysis', 'Imagery'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onSetAnalyzerPreset(tag);
                  setCurrentView('analyzer');
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#DBEAFE] text-[#004ac6] font-sans-body text-xs font-semibold hover:bg-[#2563eb] hover:text-white transition-all cursor-pointer flex items-center gap-1"
              >
                <span>{tag}</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </button>
            ))}
          </div>
        </div>

        {/* Smart Planner Card */}
        <div className="md:col-span-4 bg-[#004ac6] text-white rounded-xl p-6 shadow-md flex flex-col justify-between hover:bg-[#003ea8] transition-colors">
          <div>
            <span className="material-symbols-outlined text-4xl mb-4">edit_note</span>
            <h3 className="font-serif-headline text-2xl font-bold">Smart Planner</h3>
            <p className="font-sans-body text-sm opacity-90 mt-2 leading-relaxed">
              Generate structured essay outlines based on prompt requirements and literary evidence.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('planner')}
            className="mt-6 w-full text-white border border-white/30 py-2.5 rounded-lg font-sans-body text-sm font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            Draft New Outline
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
          </button>
        </div>

        {/* Classics Library */}
        <div className="md:col-span-4 bg-[#f2f3ff] border border-[#c3c6d7] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-[#004ac6] text-3xl mb-2">auto_stories</span>
            <h3 className="font-sans-body text-xs font-bold text-[#131b2e] uppercase tracking-wider">Classics Library</h3>
            <p className="font-sans-body text-xs text-[#434655] mt-1">Pre-loaded critical editions of Shakespeare, Austen, Orwell, and more.</p>
            <div className="mt-4 space-y-2">
              {CLASSICS_LIBRARY.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectClassic(item);
                    setCurrentView('analyzer');
                  }}
                  className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#c3c6d7]/50 hover:border-[#004ac6] cursor-pointer transition-all shadow-2xs group"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#004ac6]">history_edu</span>
                    <span className="text-xs font-medium text-[#131b2e] group-hover:text-[#004ac6] transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-xs text-[#737686] group-hover:translate-x-0.5 transition-transform">
                    chevron_right
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight Widget */}
        <div className="md:col-span-8 bg-white border border-[#c3c6d7] rounded-xl overflow-hidden shadow-xs flex flex-col md:flex-row">
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-serif-headline text-2xl font-bold text-[#131b2e]">The Scholarly Advantage</h3>
              <p className="font-sans-body text-sm text-[#434655] mt-2 leading-relaxed">
                Our AI is trained specifically on academic literature journals and historical context, ensuring your analysis is precise and scholarly.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#d2d9f4] overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Scholar avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx8QQ0jewABwy5mMBpa4bxX8Tf5FsjkXKyMH_t8aEPSwbBMKcyZ9QUjtBK0jGrnN9HLCjT8ONFr4UAeTKpyaAAUpmc3w1Rj8gVN8M74Pcpx3b0LsiGrJwMWvqXbnNagvuWqoxkCVdwMUIQyhF066YxUNfu1I_Gp3sVDtrksGSbRxJnJOHzXZhWCP2jNR8XpkMnRZXt1s0-wyxgo35qdmpoJd-gb_BkXRBv5ywVx3KDDBlc_cRYO1rQ"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#d2d9f4] overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Professor avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH_CQnoatf6rU5DRc-DCZmRvTWg20niV72PScXRL0A56w8h-VBsyxGs7bE--0o05TE2EVUk4tiOE_Y241xLqPNAvUGkCxRmmAJDUgpfpFBJgEOORaat1850dJ-MTEy6-7KPvnmsQXEU67lybjcn7ntP8nULf9eT7r2QXhjjuaJXSfVZ8u70GkcBwM0MZNeJA3FQheuL8AfvW2oavPS3V_98XR-p13WVyK3VYP4tiq_k3nqyZH0NqCu"
                  />
                </div>
              </div>
              <span className="text-xs font-semibold text-[#434655]">Trusted by 2k+ students & researchers</span>
            </div>
          </div>
          <div className="flex-1 relative min-h-[180px] md:min-h-0 bg-[#d5e4f8]/30">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt="Ink pen resting on handwritten manuscript with glowing data points"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB36L4_KWWBN4s-RZ6U6Um4T6gtbXi-6bsuSEMGuEDqeB-YI4YbK6F3zT-RCzra9vHpGpnM44fEqMmlt7wi8H53CQ6yhJIMNk6Xs5qBdsbvk1sofEtFQPYSgY0aSj62ClNUzC_SVhBwtqipzDsJUeI-WJSnRN9wK5sbJio4DFzxlTTSPINpfK4depq-87YoB5bPfA2tLB_nyeJKZ58w0_Hp9sEUjYBkxNee5ATTVrV9qDtnziwLFCv0"
            />
          </div>
        </div>
      </section>

      {/* Academic Quote Section */}
      <section className="py-16 text-center max-w-2xl mx-auto border-t border-[#c3c6d7]/40 mt-8">
        <span className="material-symbols-outlined text-[#2563eb] text-4xl mb-4">format_quote</span>
        <p className="font-serif-headline text-2xl md:text-3xl italic text-[#131b2e] leading-snug">
          "The purpose of literature is to turn blood into ink."
        </p>
        <p className="font-sans-body text-sm font-semibold text-[#434655] mt-4 uppercase tracking-wider">
          — T.S. Eliot
        </p>
      </section>
    </main>
  );
};
