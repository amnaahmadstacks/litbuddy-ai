export type AppView = 'home' | 'analyzer' | 'planner';

export interface ClassicText {
  id: string;
  title: string;
  author: string;
  era: string;
  coverExcerpt: string;
  fullExcerpt: string;
  themes: string[];
  keyQuotes: { quote: string; context: string; actOrChapter: string }[];
  summary: string;
}

export interface OutlineStep {
  number: number;
  title: string;
  color: string;
  badge?: string;
  subtitle?: string;
  points: {
    heading: string;
    details: string;
    textualEvidence?: string;
    literaryDevice?: string;
  }[];
}

export interface EssayOutline {
  id: string;
  topic: string;
  mode: 'Creative' | 'Academic';
  thesisStatement: string;
  targetTone: string;
  steps: OutlineStep[];
  createdAt: string;
  wordCountTarget?: string;
}

export interface TextAnalysisResult {
  title?: string;
  author?: string;
  passageSnippet: string;
  primaryTone: string;
  literaryDevices: {
    name: string;
    snippet: string;
    explanation: string;
    category: 'Symbolism' | 'Foreshadowing' | 'Tone Analysis' | 'Imagery' | 'Metaphor' | 'Theme';
  }[];
  overallThemes: string[];
  historicalContext: string;
  structuralInsights: string;
  suggestedEssayTopics: string[];
  highlightedRanges?: {
    text: string;
    annotation: string;
    type: 'symbolism' | 'foreshadowing' | 'tone' | 'imagery';
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
