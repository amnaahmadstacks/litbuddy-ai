import React, { useState } from 'react';
import { AppView, ClassicText, EssayOutline } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { PlannerScreen } from './components/PlannerScreen';
import { AnalyzerScreen } from './components/AnalyzerScreen';
import { AccountModal } from './components/AccountModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedClassic, setSelectedClassic] = useState<ClassicText | null>(null);
  const [analyzerPreset, setAnalyzerPreset] = useState<string | null>(null);
  const [savedOutlines, setSavedOutlines] = useState<EssayOutline[]>([]);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleSaveOutline = (outline: EssayOutline) => {
    setSavedOutlines((prev) => {
      if (prev.some((item) => item.id === outline.id)) return prev;
      return [outline, ...prev];
    });
  };

  const handleDeleteOutline = (id: string) => {
    setSavedOutlines((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans-body text-[#131b2e] bg-[#faf8ff] selection:bg-[#d5e4f8] selection:text-[#004ac6]">
      {/* Top Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Main View Router */}
      <div className="flex-grow">
        {currentView === 'home' && (
          <HomeScreen
            setCurrentView={setCurrentView}
            onSelectClassic={(classic) => {
              setSelectedClassic(classic);
            }}
            onSetAnalyzerPreset={(preset) => {
              setAnalyzerPreset(preset);
            }}
          />
        )}

        {currentView === 'planner' && (
          <PlannerScreen
            onSaveOutline={handleSaveOutline}
            savedOutlinesCount={savedOutlines.length}
          />
        )}

        {currentView === 'analyzer' && (
          <AnalyzerScreen
            selectedClassic={selectedClassic}
            analyzerPreset={analyzerPreset}
          />
        )}
      </div>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Account Workspace Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        savedOutlines={savedOutlines}
        onDeleteOutline={handleDeleteOutline}
      />

      {/* Responsive Bottom Navigation for Mobile */}
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}
