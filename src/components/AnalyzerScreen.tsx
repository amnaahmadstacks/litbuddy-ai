import React, { useState, useEffect } from 'react';
import { ClassicText, TextAnalysisResult, ChatMessage } from '../types';
import { CLASSICS_LIBRARY } from '../data/classics';

interface AnalyzerScreenProps {
  selectedClassic?: ClassicText | null;
  analyzerPreset?: string | null;
}

export const AnalyzerScreen: React.FC<AnalyzerScreenProps> = ({
  selectedClassic,
  analyzerPreset
}) => {
  const [passage, setPassage] = useState<string>(
    selectedClassic ? selectedClassic.fullExcerpt : CLASSICS_LIBRARY[0].fullExcerpt
  );
  const [focusArea, setFocusArea] = useState<string>(analyzerPreset || 'General');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<TextAnalysisResult | null>(null);
  const [selectedHighlight, setSelectedHighlight] = useState<{ text: string; annotation: string; type: string } | null>(null);

  // Chat Q&A state
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAsking, setIsAsking] = useState(false);

  useEffect(() => {
    if (selectedClassic) {
      setPassage(selectedClassic.fullExcerpt);
    }
  }, [selectedClassic]);

  useEffect(() => {
    if (analyzerPreset) {
      setFocusArea(analyzerPreset);
    }
  }, [analyzerPreset]);

  const handleAnalyze = async () => {
    if (!passage.trim()) return;
    setIsAnalyzing(true);
    setSelectedHighlight(null);

    try {
      const res = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passage, focusArea })
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysisResult(data.analysis);
      }
    } catch (err) {
      console.error('Error analyzing passage:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setQuestion('');
    setIsAsking(true);

    try {
      const res = await fetch('/api/chat-passage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passage, question: userMsg.text })
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: data.reply || 'LitBuddy AI is evaluating your response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Failed to get answer:', err);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <main className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 mb-24 md:mb-12">
      {/* Title */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#d5e4f8] text-[#004ac6] text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-sm mr-1">analytics</span> Deep Text Analyzer
            </div>
            <h2 className="font-serif-headline text-3xl md:text-4xl font-bold text-[#131b2e]">
              Deconstruct Literary Works
            </h2>
            <p className="font-sans-body text-sm md:text-base text-[#434655] mt-1">
              Identify motifs, metaphors, historical contexts, and quote breakdowns powered by AI.
            </p>
          </div>

          {/* Quick Select Classic Literature */}
          <div className="w-full md:w-auto">
            <label className="text-xs font-semibold text-[#737686] block mb-1">Load Classic Text:</label>
            <select
              onChange={(e) => {
                const found = CLASSICS_LIBRARY.find(c => c.id === e.target.value);
                if (found) {
                  setPassage(found.fullExcerpt);
                  setAnalysisResult(null);
                }
              }}
              className="w-full md:w-64 bg-white border border-[#c3c6d7] rounded-lg px-3 py-2 text-sm font-sans-body text-[#131b2e] focus:border-[#004ac6] outline-none shadow-2xs"
            >
              <option value="">-- Choose a Masterpiece --</option>
              {CLASSICS_LIBRARY.map(item => (
                <option key={item.id} value={item.id}>
                  {item.title} ({item.author})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Input Card */}
      <div className="bg-white rounded-xl p-6 border border-[#c3c6d7] shadow-xs mb-8">
        <label className="font-sans-body text-sm font-semibold text-[#131b2e] block mb-2">
          Passage or Excerpt Text
        </label>
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          rows={5}
          placeholder="Paste or type a passage from Shakespeare, Gatsby, Austen, or any literary work..."
          className="w-full bg-[#faf8ff] border border-[#c3c6d7] rounded-lg p-4 font-serif-headline text-base focus:border-[#004ac6] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all leading-relaxed resize-y text-[#131b2e]"
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 pt-3 border-t border-[#c3c6d7]/40">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#737686]">Focus Lens:</span>
            {['General', 'Symbolism', 'Foreshadowing', 'Tone Analysis', 'Imagery', 'Character'].map(lens => (
              <button
                key={lens}
                onClick={() => setFocusArea(lens)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  focusArea === lens
                    ? 'bg-[#004ac6] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#434655] hover:bg-[#d5e4f8]'
                }`}
              >
                {lens}
              </button>
            ))}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !passage.trim()}
            className="w-full md:w-auto bg-[#004ac6] text-white font-sans-body text-sm font-bold py-2.5 px-6 rounded-lg hover:bg-[#003ea8] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                Analyzing Passage...
              </>
            ) : (
              <>
                Analyze Passage
                <span className="material-symbols-outlined text-lg">psychology</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Output Section */}
      {analysisResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Passage & Annotations (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#c3c6d7] rounded-xl p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif-headline text-xl font-bold text-[#131b2e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6]">find_in_page</span>
                  Annotated Passage
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-[#d5e4f8] text-[#004ac6] rounded-full">
                  Primary Tone: {analysisResult.primaryTone}
                </span>
              </div>

              {/* Interactive Passage View */}
              <div className="p-4 bg-[#faf8ff] rounded-lg border border-[#c3c6d7]/50 font-serif-headline text-base leading-loose text-[#131b2e] whitespace-pre-wrap">
                {passage}
              </div>

              {/* Highlighted Annotations Pills */}
              {analysisResult.highlightedRanges && analysisResult.highlightedRanges.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#c3c6d7]/40">
                  <span className="text-xs font-bold text-[#434655] uppercase tracking-wider block mb-2">
                    Click key phrases to reveal scholarly notes:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.highlightedRanges.map((hl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedHighlight(hl)}
                        className={`text-xs p-2 rounded-lg text-left transition-all cursor-pointer border ${
                          selectedHighlight?.text === hl.text
                            ? 'bg-[#004ac6] text-white border-[#004ac6] shadow-xs'
                            : 'bg-white text-[#131b2e] border-[#c3c6d7] hover:border-[#004ac6]'
                        }`}
                      >
                        <span className="font-semibold block truncate max-w-[200px]">"{hl.text}"</span>
                        <span className="text-[10px] opacity-80 uppercase tracking-wide">{hl.type}</span>
                      </button>
                    ))}
                  </div>

                  {selectedHighlight && (
                    <div className="mt-4 p-4 bg-[#d5e4f8] rounded-xl border border-[#004ac6]/30 animate-fade-in">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold uppercase text-[#004ac6]">
                          Annotation ({selectedHighlight.type})
                        </span>
                        <button
                          onClick={() => setSelectedHighlight(null)}
                          className="material-symbols-outlined text-sm text-[#434655] hover:text-[#131b2e]"
                        >
                          close
                        </button>
                      </div>
                      <p className="font-serif-headline text-sm font-semibold italic text-[#131b2e] mt-1">
                        "{selectedHighlight.text}"
                      </p>
                      <p className="font-sans-body text-xs text-[#131b2e] mt-2 leading-relaxed">
                        {selectedHighlight.annotation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Q&A Literature Assistant */}
            <div className="bg-white border border-[#c3c6d7] rounded-xl p-6 shadow-xs">
              <h3 className="font-serif-headline text-xl font-bold text-[#131b2e] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6]">forum</span>
                Ask LitBuddy AI about this text
              </h3>
              <p className="text-xs text-[#434655] mb-4">
                Ask specific questions about literary motifs, sentence syntax, character motives, or exam preparation.
              </p>

              {/* Chat Thread */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto p-2">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-xl text-xs md:text-sm font-sans-body leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#004ac6] text-white rounded-br-none'
                          : 'bg-[#eaedff] text-[#131b2e] rounded-bl-none border border-[#c3c6d7]/50'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[#737686] mt-0.5 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {isAsking && (
                  <div className="flex items-center gap-2 text-xs text-[#004ac6] italic p-2">
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    LitBuddy AI is consulting literary archives...
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
                  placeholder="e.g. What does the color green symbolize in this line?"
                  className="flex-1 bg-[#faf8ff] border border-[#c3c6d7] rounded-lg px-3 py-2 text-xs md:text-sm font-sans-body outline-none focus:border-[#004ac6] text-[#131b2e]"
                />
                <button
                  onClick={handleSendQuestion}
                  disabled={isAsking || !question.trim()}
                  className="bg-[#004ac6] text-white px-4 py-2 rounded-lg font-sans-body text-xs font-bold hover:bg-[#003ea8] transition-colors disabled:opacity-50"
                >
                  Ask
                </button>
              </div>
            </div>
          </div>

          {/* Devices, Themes & Context (Right Column) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Literary Devices */}
            <div className="bg-white border border-[#c3c6d7] rounded-xl p-6 shadow-xs">
              <h4 className="font-sans-body text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6]">auto_awesome</span>
                Extracted Literary Devices
              </h4>
              <div className="space-y-3">
                {analysisResult.literaryDevices.map((device, idx) => (
                  <div key={idx} className="p-3 bg-[#faf8ff] rounded-lg border border-[#c3c6d7]/60">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-sans-body text-xs font-bold text-[#004ac6]">
                        {device.name}
                      </span>
                      <span className="text-[10px] bg-[#d5e4f8] text-[#576676] px-2 py-0.5 rounded font-semibold">
                        {device.category}
                      </span>
                    </div>
                    {device.snippet && (
                      <p className="font-serif-headline text-xs italic text-[#131b2e] mb-1">
                        "{device.snippet}"
                      </p>
                    )}
                    <p className="font-sans-body text-xs text-[#434655]">
                      {device.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Themes & Historical Context */}
            <div className="bg-[#f2f3ff] border border-[#c3c6d7] rounded-xl p-6 shadow-xs space-y-4">
              <div>
                <h4 className="font-sans-body text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-2">
                  Core Themes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.overallThemes.map((theme, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-[#c3c6d7] text-[#004ac6] text-xs font-semibold rounded-full shadow-2xs">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-sans-body text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-1">
                  Historical & Literary Context
                </h4>
                <p className="font-sans-body text-xs text-[#434655] leading-relaxed">
                  {analysisResult.historicalContext}
                </p>
              </div>

              <div>
                <h4 className="font-sans-body text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-1">
                  Structural & Rhetorical Insights
                </h4>
                <p className="font-sans-body text-xs text-[#434655] leading-relaxed">
                  {analysisResult.structuralInsights}
                </p>
              </div>
            </div>

            {/* Scholarly Essay Ideas */}
            <div className="bg-white border border-[#c3c6d7] rounded-xl p-6 shadow-xs">
              <h4 className="font-sans-body text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6]">school</span>
                Suggested Essay Angles
              </h4>
              <ul className="space-y-2">
                {analysisResult.suggestedEssayTopics.map((topicItem, i) => (
                  <li key={i} className="text-xs text-[#131b2e] bg-[#faf8ff] p-2.5 rounded border border-[#c3c6d7]/50 flex items-start gap-2">
                    <span className="font-bold text-[#004ac6]">{i + 1}.</span>
                    <span>{topicItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-[#c3c6d7] rounded-xl p-12 text-center max-w-lg mx-auto shadow-xs">
          <span className="material-symbols-outlined text-5xl text-[#004ac6] mb-3">auto_stories</span>
          <h3 className="font-serif-headline text-2xl font-bold text-[#131b2e] mb-2">Ready to Analyze</h3>
          <p className="font-sans-body text-sm text-[#434655] leading-relaxed">
            Select a classic text from the dropdown above or paste a custom passage, then click <strong>Analyze Passage</strong> to view deep literary insights.
          </p>
        </div>
      )}
    </main>
  );
};
