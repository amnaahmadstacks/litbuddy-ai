import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is not defined.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Endpoint: Generate Essay Outline
  app.post('/api/generate-outline', async (req, res) => {
    try {
      const { topic, mode = 'Academic', gradeLevel = 'Undergraduate' } = req.body;
      if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ error: 'Essay topic string is required.' });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // Fallback structured response if API key is not yet configured in UI
        return res.json({
          outline: {
            id: `outline-${Date.now()}`,
            topic,
            mode,
            thesisStatement: `Through a critical literary lens, "${topic.slice(0, 50)}..." serves as a powerful metaphor exposing underlying structural tensions and thematic conflicts.`,
            targetTone: mode === 'Academic' ? 'Scholarly, Formal, Analytical' : 'Creative, Exploratory, Evocative',
            steps: [
              {
                number: 1,
                title: 'Introduction',
                color: 'bg-primary text-on-primary',
                subtitle: 'Hook, Contextual Framing, and Core Thesis',
                points: [
                  {
                    heading: 'Contextual Hook & Historical Grounding',
                    details: 'Introduce the literary landscape, historical era, and core cultural questions surrounding the topic.'
                  },
                  {
                    heading: 'Primary Focus Statement',
                    details: 'Establish the literary work and key thematic tension being examined.'
                  },
                  {
                    heading: 'Thesis Statement',
                    details: `In examining ${topic}, the text demonstrates how structural literary motifs bridge personal ambition and broader socio-cultural critique.`
                  }
                ]
              },
              {
                number: 2,
                title: 'Development & Analysis',
                color: 'bg-secondary text-on-secondary',
                subtitle: 'Substantiating the Thesis through Textual Evidence',
                points: [
                  {
                    heading: 'Body Paragraph I: Symbolic Foundation',
                    details: 'Analyze the primary motif or literary device, showing how early textual evidence sets up the central conflict.',
                    textualEvidence: 'Key primary quote demonstrating symbolic resonance.',
                    literaryDevice: 'Symbolism & Foreshadowing'
                  },
                  {
                    heading: 'Body Paragraph II: Character Dynamics & Irony',
                    details: 'Examine how character actions or dialogue heighten thematic stakes.',
                    textualEvidence: 'Interactive quote highlighting psychological complexity.',
                    literaryDevice: 'Dramatic Irony'
                  },
                  {
                    heading: 'Body Paragraph III: Nuance & Counter-Perspective',
                    details: 'Address potential counterarguments or structural ironies to deepen the argument.',
                    textualEvidence: 'Textual passage showing structural ambiguity.',
                    literaryDevice: 'Juxtaposition'
                  }
                ]
              },
              {
                number: 3,
                title: 'Synthesis & Conclusion',
                color: 'bg-tertiary text-on-tertiary',
                subtitle: 'Broader Implications & Literary Value',
                points: [
                  {
                    heading: 'Restatement of Thesis in Expanded Light',
                    details: 'Synthesize body arguments without simple repetition.'
                  },
                  {
                    heading: 'Broader Literary Significance',
                    details: 'Connect findings to universal themes of human condition or historical relevance.'
                  },
                  {
                    heading: 'Final Thought / Coda',
                    details: 'Provide a memorable closing insight that resonates beyond the essay scope.'
                  }
                ]
              }
            ],
            createdAt: new Date().toLocaleDateString()
          }
        });
      }

      const prompt = `You are LitBuddy AI, an elite literary scholar and professor.
Construct a highly structured, rigorous academic essay outline for the topic: "${topic}".
Style mode: ${mode}
Level: ${gradeLevel}

Provide:
1. A sharp, insightful Thesis Statement.
2. Target Tone.
3. Step 1 (Introduction): Hook, Context, Thesis.
4. Step 2 (Development & Analysis): 3 detailed body paragraph breakdowns, each including heading, details, textual evidence quote guidance, and literary device used.
5. Step 3 (Synthesis & Conclusion): Thesis restatement, Broader literary implications, Coda.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              thesisStatement: { type: Type.STRING },
              targetTone: { type: Type.STRING },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    number: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    points: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          heading: { type: Type.STRING },
                          details: { type: Type.STRING },
                          textualEvidence: { type: Type.STRING },
                          literaryDevice: { type: Type.STRING }
                        },
                        required: ['heading', 'details']
                      }
                    }
                  },
                  required: ['number', 'title', 'points']
                }
              }
            },
            required: ['thesisStatement', 'targetTone', 'steps']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');

      // Add default step styling colors
      const colorMap: Record<number, string> = {
        1: 'bg-primary text-on-primary',
        2: 'bg-secondary text-on-secondary',
        3: 'bg-tertiary text-on-tertiary'
      };

      const styledSteps = (parsed.steps || []).map((step: any) => ({
        ...step,
        color: colorMap[step.number] || 'bg-primary text-on-primary'
      }));

      res.json({
        outline: {
          id: `outline-${Date.now()}`,
          topic,
          mode,
          thesisStatement: parsed.thesisStatement || '',
          targetTone: parsed.targetTone || 'Scholarly and Analytical',
          steps: styledSteps,
          createdAt: new Date().toLocaleDateString()
        }
      });
    } catch (err: any) {
      console.error('Error generating outline:', err);
      res.status(500).json({ error: 'Failed to generate essay outline.', details: err.message });
    }
  });

  // API Endpoint: Deep Text Analyzer
  app.post('/api/analyze-text', async (req, res) => {
    try {
      const { passage, focusArea = 'General' } = req.body;
      if (!passage || typeof passage !== 'string') {
        return res.status(400).json({ error: 'Text passage is required.' });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // Safe fallback analysis if key pending
        return res.json({
          analysis: {
            passageSnippet: passage.slice(0, 150) + '...',
            primaryTone: 'Contemplative & Melancholic',
            overallThemes: ['Human Condition', 'Time & Memory', 'Desire vs. Reality'],
            historicalContext: 'Reflects the post-war shifts in literary modernism and existential inquiry.',
            structuralInsights: 'Employs a rhythmic cadence with vivid imagery to build psychological resonance.',
            literaryDevices: [
              {
                name: 'Symbolism',
                snippet: passage.slice(0, 40),
                explanation: 'Serves as an emblem for intangible aspiration and mortality.',
                category: 'Symbolism'
              },
              {
                name: 'Tone Analysis',
                snippet: passage.slice(20, 70) || passage,
                explanation: 'Shifts from reflective observation to poignant philosophical questioning.',
                category: 'Tone Analysis'
              },
              {
                name: 'Imagery',
                snippet: passage.slice(50, 100) || passage,
                explanation: 'Evokes visceral sensory details that heighten emotional gravity.',
                category: 'Imagery'
              }
            ],
            suggestedEssayTopics: [
              `The role of symbolic duality in: "${passage.slice(0, 30)}..."`,
              'Psychological isolation vs social expectations in modern literature',
              'Rhetorical pacing and character interiority'
            ],
            highlightedRanges: [
              {
                text: passage.slice(0, Math.min(30, passage.length)),
                annotation: 'Key symbolic anchor initiating the passage motif.',
                type: 'symbolism'
              }
            ]
          }
        });
      }

      const prompt = `You are LitBuddy AI, an expert literary analyst.
Perform a deep textual, rhetorical, and thematic analysis of the following passage.
Focus area: ${focusArea}

Passage:
"""
${passage}
"""

Analyze for:
1. Primary tone (e.g., Elegiac, Satirical, Tense, Reflective).
2. Overall core themes (3 items).
3. Historical and literary context summary.
4. Structural and stylistic insights.
5. Key literary devices identified in the text (name, exact snippet from text, explanation, and category: Symbolism, Foreshadowing, Tone Analysis, Imagery, Metaphor, or Theme).
6. 3 high-level scholarly essay prompt ideas based on this passage.
7. Specific text range annotations (exact phrase from passage, annotation commentary, and type).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              primaryTone: { type: Type.STRING },
              overallThemes: { type: Type.ARRAY, items: { type: Type.STRING } },
              historicalContext: { type: Type.STRING },
              structuralInsights: { type: Type.STRING },
              literaryDevices: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    snippet: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    category: { type: Type.STRING }
                  },
                  required: ['name', 'snippet', 'explanation', 'category']
                }
              },
              suggestedEssayTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
              highlightedRanges: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    annotation: { type: Type.STRING },
                    type: { type: Type.STRING }
                  },
                  required: ['text', 'annotation', 'type']
                }
              }
            },
            required: ['primaryTone', 'overallThemes', 'historicalContext', 'structuralInsights', 'literaryDevices', 'suggestedEssayTopics']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({
        analysis: {
          passageSnippet: passage.slice(0, 150) + (passage.length > 150 ? '...' : ''),
          primaryTone: parsed.primaryTone || 'Analytical',
          overallThemes: parsed.overallThemes || [],
          historicalContext: parsed.historicalContext || '',
          structuralInsights: parsed.structuralInsights || '',
          literaryDevices: parsed.literaryDevices || [],
          suggestedEssayTopics: parsed.suggestedEssayTopics || [],
          highlightedRanges: parsed.highlightedRanges || []
        }
      });
    } catch (err: any) {
      console.error('Error analyzing text:', err);
      res.status(500).json({ error: 'Failed to analyze text passage.', details: err.message });
    }
  });

  // API Endpoint: Interactive Literature Q&A Assistant
  app.post('/api/chat-passage', async (req, res) => {
    try {
      const { passage, question, history = [] } = req.body;
      if (!question) {
        return res.status(400).json({ error: 'Question is required.' });
      }

      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          reply: `In analyzing your query regarding "${question}", LitBuddy AI notes that literary passages often balance explicit narrative progression with implicit symbolic motifs. Consider how character motives align with the broader thematic architecture.`
        });
      }

      const prompt = `You are LitBuddy AI, an encouraging and intellectually articulate literature tutor.
Passage context:
"""
${passage || 'General Literary Inquiry'}
"""

User question: "${question}"

Provide a clear, illuminating 2-3 paragraph explanation referencing specific literary techniques, thematic stakes, or historical context.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt
      });

      res.json({ reply: response.text || 'LitBuddy AI is evaluating your question.' });
    } catch (err: any) {
      console.error('Error in chat assistant:', err);
      res.status(500).json({ error: 'Failed to get answer.', details: err.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LitBuddy AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
