import React, { useState } from 'react';
import { EssayOutline } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOutlines: EssayOutline[];
  onDeleteOutline: (id: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  savedOutlines,
  onDeleteOutline,
}) => {
  const [activeTab, setActiveTab] = useState<'outlines' | 'profile' | 'settings'>('outlines');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-[#c3c6d7] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#faf8ff] border-b border-[#c3c6d7]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#004ac6] text-3xl">account_circle</span>
            <div>
              <h3 className="font-serif-headline text-xl font-bold text-[#131b2e]">Scholar Workspace</h3>
              <p className="text-xs text-[#434655]">Amna Ahmad • Standard Academic License</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="material-symbols-outlined text-[#434655] hover:text-[#131b2e] text-2xl p-1 rounded-full hover:bg-[#eaedff] transition-colors"
          >
            close
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#c3c6d7] px-6 bg-white gap-4">
          <button
            onClick={() => setActiveTab('outlines')}
            className={`py-3 text-xs md:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'outlines'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">bookmark</span>
            Saved Outlines ({savedOutlines.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 text-xs md:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">badge</span>
            Scholar Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 text-xs md:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">settings</span>
            Preferences
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#faf8ff]">
          {activeTab === 'outlines' && (
            <div>
              {savedOutlines.length === 0 ? (
                <div className="text-center py-12 text-[#434655]">
                  <span className="material-symbols-outlined text-4xl text-[#737686] mb-2 block">bookmark_border</span>
                  <p className="font-semibold text-sm">No saved outlines yet.</p>
                  <p className="text-xs text-[#737686] mt-1">
                    Use the <strong>Planner</strong> to construct structured essay blueprints and click <em>Save Outline</em>.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedOutlines.map((outline) => (
                    <div
                      key={outline.id}
                      className="bg-white border border-[#c3c6d7] rounded-xl p-4 shadow-2xs hover:border-[#004ac6] transition-all flex justify-between items-start"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase bg-[#d5e4f8] text-[#004ac6] px-2 py-0.5 rounded">
                          {outline.mode} • {outline.createdAt}
                        </span>
                        <h4 className="font-serif-headline text-base font-bold text-[#131b2e] mt-1">
                          {outline.topic}
                        </h4>
                        <p className="font-sans-body text-xs text-[#434655] mt-1 line-clamp-2 italic">
                          "{outline.thesisStatement}"
                        </p>
                      </div>
                      <button
                        onClick={() => onDeleteOutline(outline.id)}
                        title="Remove Outline"
                        className="material-symbols-outlined text-[#ba1a1a] text-lg hover:bg-[#ffdad6] p-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-[#c3c6d7] space-y-2">
                <div className="text-xs font-bold text-[#737686] uppercase">Account Information</div>
                <div className="text-sm font-semibold text-[#131b2e]">Amna Ahmad</div>
                <div className="text-xs text-[#434655]">amnaahmadh02@gmail.com</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#c3c6d7] grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold font-serif-headline text-[#004ac6]">{savedOutlines.length}</div>
                  <div className="text-xs font-semibold text-[#434655]">Saved Outlines</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif-headline text-[#004ac6]">5</div>
                  <div className="text-xs font-semibold text-[#434655]">Classics Library Works</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-4 rounded-xl border border-[#c3c6d7] space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-semibold text-[#131b2e]">Academic Citation Style</div>
                  <div className="text-xs text-[#434655]">Default citation format for evidence extraction</div>
                </div>
                <select className="bg-[#faf8ff] border border-[#c3c6d7] text-xs font-semibold rounded px-2 py-1 outline-none">
                  <option>MLA 9th Edition</option>
                  <option>APA 7th Edition</option>
                  <option>Chicago 17th Edition</option>
                </select>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#c3c6d7]/40">
                <div>
                  <div className="text-sm font-semibold text-[#131b2e]">AI Analysis Depth</div>
                  <div className="text-xs text-[#434655]">Include historical & rhetorical contexts</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#004ac6]" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-[#c3c6d7] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#004ac6] text-white text-xs font-bold px-5 py-2 rounded-lg hover:bg-[#003ea8] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
