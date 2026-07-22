import React, { useState } from 'react';
import { EssayOutline } from '../types';

interface PlannerScreenProps {
  onSaveOutline: (outline: EssayOutline) => void;
  savedOutlinesCount: number;
}

export const PlannerScreen: React.FC<PlannerScreenProps> = ({ onSaveOutline, savedOutlinesCount }) => {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState<'Creative' | 'Academic'>('Academic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentOutline, setCurrentOutline] = useState<EssayOutline | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const SAMPLE_PROMPTS = [
    'The symbolism of the green light in The Great Gatsby as a metaphor for the American Dream',
    "Hamlet's soliloquy 'To be or not to be' and existential delay in Elizabethan tragedy",
    'Language control and memory distortion in Orwell\'s 1984 Newspeak',
    'Satire of social class and marital transactions in Austen\'s Pride and Prejudice'
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setIsSaved(false);

    try {
      const res = await fetch('/api/generate-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, mode })
      });
      const data = await res.json();
      if (data.outline) {
        setCurrentOutline(data.outline);
      }
    } catch (err) {
      console.error('Failed to generate outline:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!currentOutline) return;
    const text = `# ${currentOutline.topic}\n\n**Mode:** ${currentOutline.mode}\n**Thesis Statement:** ${currentOutline.thesisStatement}\n\n` +
      currentOutline.steps.map(step => 
        `## Step ${step.number}: ${step.title}\n` +
        step.points.map(p => `- **${p.heading}:** ${p.details}` + (p.textualEvidence ? `\n  *Evidence:* "${p.textualEvidence}"` : '')).join('\n')
      ).join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!currentOutline) return;
    onSaveOutline(currentOutline);
    setIsSaved(true);
  };

  return (
    <main className="w-full max-w-[800px] mx-auto px-4 md:px-6 py-8 mb-24 md:mb-12">
      {/* Header Section */}
      <section className="mb-8 text-center md:text-left">
        <h2 className="font-serif-headline text-3xl md:text-4xl font-bold mb-2 text-[#131b2e]">
          Architect Your Ideas
        </h2>
        <p className="font-sans-body text-[#434655] max-w-xl text-sm md:text-base leading-relaxed">
          Transform a simple prompt into a structured literary masterpiece. Our AI maps the logic of your argument before you write a single word.
        </p>
      </section>

      {/* Input Bento Card */}
      <div className="bg-white rounded-xl p-6 shadow-xs border border-[#c3c6d7] mb-8">
        <div className="space-y-4">
          <label className="font-sans-body text-sm font-semibold text-[#434655] block" htmlFor="essay-topic">
            Essay Topic or Research Question
          </label>
          
          <div className="relative group">
            <textarea
              id="essay-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., The symbolism of the green light in The Great Gatsby as a metaphor for the American Dream..."
              rows={3}
              className="w-full bg-[#faf8ff] border border-[#c3c6d7] rounded-lg p-4 font-sans-body text-sm focus:border-[#004ac6] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all resize-none text-[#131b2e]"
            />
          </div>

          {/* Sample prompts */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-[#737686]">Quick Ideas:</span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PROMPTS.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTopic(sample)}
                  className="text-xs bg-[#eaedff] hover:bg-[#d5e4f8] text-[#004ac6] px-2.5 py-1 rounded-md transition-colors text-left truncate max-w-xs cursor-pointer"
                >
                  {sample.slice(0, 45)}...
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 border-t border-[#c3c6d7]/40">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('Creative')}
                className={`px-3.5 py-1.5 rounded-full font-sans-body text-xs font-semibold flex items-center gap-1 transition-all ${
                  mode === 'Creative'
                    ? 'bg-[#d5e4f8] text-[#576676] ring-1 ring-[#004ac6]'
                    : 'bg-[#eaedff] text-[#434655] hover:bg-[#d5e4f8]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span> Creative
              </button>
              
              <button
                type="button"
                onClick={() => setMode('Academic')}
                className={`px-3.5 py-1.5 rounded-full font-sans-body text-xs font-semibold transition-all ${
                  mode === 'Academic'
                    ? 'bg-[#004ac6] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#434655] hover:bg-[#d5e4f8]'
                }`}
              >
                Academic
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full sm:w-auto bg-[#004ac6] text-white font-sans-body text-sm font-bold py-3 px-6 rounded-lg hover:bg-[#003ea8] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  Architecting...
                </>
              ) : (
                <>
                  Generate Outline
                  <span className="material-symbols-outlined text-lg">schema</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Workspace / Outline Display */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563eb]">schema</span>
            <h3 className="font-sans-body text-xs font-bold text-[#131b2e] uppercase tracking-wider">
              Proposed Outline Structure
            </h3>
          </div>

          {currentOutline && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="text-xs bg-white border border-[#c3c6d7] hover:bg-[#eaedff] text-[#004ac6] px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleSave}
                disabled={isSaved}
                className="text-xs bg-[#004ac6] text-white hover:bg-[#003ea8] px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-sm">{isSaved ? 'bookmark_added' : 'bookmark'}</span>
                {isSaved ? 'Saved' : 'Save Outline'}
              </button>
            </div>
          )}
        </div>

        {/* Generated Outline content or placeholder */}
        {currentOutline ? (
          <div className="space-y-6">
            {/* Thesis Box */}
            <div className="bg-[#d5e4f8]/50 border-l-4 border-[#004ac6] p-4 rounded-r-xl">
              <span className="text-xs font-bold uppercase text-[#004ac6] tracking-wider block mb-1">
                Core Thesis Statement
              </span>
              <p className="font-serif-headline text-lg text-[#131b2e] italic">
                "{currentOutline.thesisStatement}"
              </p>
              <div className="mt-2 text-xs text-[#434655] font-medium">
                Target Tone: <span className="font-semibold text-[#004ac6]">{currentOutline.targetTone}</span>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6 relative">
              {currentOutline.steps.map((step) => (
                <div key={step.number} className="outline-step-connector relative flex gap-4">
                  <div className={`z-10 flex-shrink-0 w-10 h-10 rounded-full ${step.color} flex items-center justify-center font-bold shadow-md text-sm`}>
                    {step.number}
                  </div>
                  <div className="flex-grow bg-white border border-[#c3c6d7] rounded-xl p-5 shadow-xs hover:border-[#004ac6] transition-all">
                    <h4 className="font-serif-headline text-xl font-bold text-[#131b2e] mb-1">
                      {step.title}
                    </h4>
                    {step.subtitle && (
                      <p className="text-xs font-medium text-[#737686] mb-3">{step.subtitle}</p>
                    )}
                    <div className="space-y-3">
                      {step.points.map((point, pIdx) => (
                        <div key={pIdx} className="border-l-2 border-[#e2e8f0] pl-3 py-1">
                          <h5 className="font-sans-body text-sm font-semibold text-[#131b2e]">
                            {point.heading}
                          </h5>
                          <p className="font-sans-body text-xs text-[#434655] mt-1 leading-relaxed">
                            {point.details}
                          </p>
                          {point.textualEvidence && (
                            <div className="mt-1.5 text-xs bg-[#faf8ff] p-2 rounded border border-[#c3c6d7]/40 text-[#131b2e] italic">
                              <span className="font-bold not-italic text-[#004ac6] mr-1">Quote Focus:</span>
                              "{point.textualEvidence}"
                            </div>
                          )}
                          {point.literaryDevice && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-[#d5e4f8] text-[#004ac6] font-semibold text-[10px] rounded">
                              {point.literaryDevice}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 relative">
            {/* Grayed-out preview steps */}
            <div className="outline-step-connector relative flex gap-4">
              <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold shadow-md">
                1
              </div>
              <div className="flex-grow bg-white border border-[#c3c6d7] rounded-xl p-5 opacity-40 grayscale transition-all">
                <h4 className="font-serif-headline text-xl font-semibold mb-2">Introduction</h4>
                <div className="space-y-2">
                  <div className="h-4 bg-[#f2f3ff] rounded w-3/4"></div>
                  <div className="h-4 bg-[#f2f3ff] rounded w-1/2"></div>
                </div>
              </div>
            </div>

            <div className="outline-step-connector relative flex gap-4">
              <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#516070] text-white flex items-center justify-center font-bold shadow-md">
                2
              </div>
              <div className="flex-grow bg-white border border-[#c3c6d7] rounded-xl p-5 opacity-40 grayscale transition-all">
                <h4 className="font-serif-headline text-xl font-semibold mb-2">Development & Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-[#f2f3ff] rounded w-full"></div>
                    <div className="h-3 bg-[#f2f3ff] rounded w-5/6"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#f2f3ff] rounded w-full"></div>
                    <div className="h-3 bg-[#f2f3ff] rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="outline-step-connector relative flex gap-4">
              <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#525657] text-white flex items-center justify-center font-bold shadow-md">
                3
              </div>
              <div className="flex-grow bg-white border border-[#c3c6d7] rounded-xl p-5 opacity-40 grayscale transition-all">
                <h4 className="font-serif-headline text-xl font-semibold mb-2">Synthesis & Conclusion</h4>
                <div className="space-y-2">
                  <div className="h-4 bg-[#f2f3ff] rounded w-full"></div>
                  <div className="h-4 bg-[#f2f3ff] rounded w-1/4"></div>
                </div>
              </div>
            </div>

            {/* Empty State Overlay Card */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 pt-12">
              <div className="bg-white/95 backdrop-blur-md border border-[#2563eb] p-6 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-sm pointer-events-auto animate-pulse">
                <span className="material-symbols-outlined text-4xl text-[#004ac6] mb-2">draw</span>
                <h5 className="font-serif-headline text-xl font-bold mb-1 text-[#131b2e]">Awaiting Context</h5>
                <p className="font-sans-body text-xs md:text-sm text-[#434655]">
                  Enter your essay prompt above and LitBuddy will generate a structured academic blueprint here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
