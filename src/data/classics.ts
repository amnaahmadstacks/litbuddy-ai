import { ClassicText } from '../types';

export const CLASSICS_LIBRARY: ClassicText[] = [
  {
    id: 'gatsby',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    era: '1925 • Jazz Age Modernism',
    coverExcerpt: 'Gatsby believed in the green light, the orgastic future that year by year recedes before us...',
    fullExcerpt: `Gatsby believed in the green light, the orgastic future that year by year recedes before us. It eluded us then, but that’s no matter—tomorrow we will run faster, stretch out our arms farther... And one fine morning—
So we beat on, boats against the current, borne back ceaselessly into the past.`,
    themes: ['The American Dream', 'Class & Wealth Structure', 'Illusion vs. Reality', 'Nostalgia & Time'],
    keyQuotes: [
      {
        quote: "He looked at her the way all women want to be looked at by a man.",
        context: "Jordan describing Gatsby's devotion to Daisy.",
        actOrChapter: "Chapter 4"
      },
      {
        quote: "Gatsby believed in the green light...",
        context: "Nick reflecting on Gatsby's tragic pursuit of Daisy and his ideal.",
        actOrChapter: "Chapter 9"
      }
    ],
    summary: 'A landmark Jazz Age novel depicting Jay Gatsby\'s obsessive pursuit of Daisy Buchanan and the disillusionment of the American Dream.'
  },
  {
    id: 'hamlet-act3',
    title: 'Hamlet — Act III',
    author: 'William Shakespeare',
    era: '1601 • Elizabethan Tragedy',
    coverExcerpt: 'To be, or not to be, that is the question: Whether \'tis nobler in the mind to suffer...',
    fullExcerpt: `To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them. To die—to sleep,
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to: 'tis a consummation
Devoutly to be wish'd. To die, to sleep;
To sleep, perchance to dream—ay, there's the rub...`,
    themes: ['Existential Dread', 'Action vs. Inaction', 'Mortality & Corruption', 'Madness & Soliloquy'],
    keyQuotes: [
      {
        quote: "To be, or not to be, that is the question...",
        context: "Hamlet contemplating existence and the agony of mortal suffering.",
        actOrChapter: "Act III, Scene 1"
      },
      {
        quote: "The lady doth protest too much, methinks.",
        context: "Queen Gertrude commenting on the Play-within-a-play.",
        actOrChapter: "Act III, Scene 2"
      }
    ],
    summary: 'The pivotal third act of Shakespeare\'s masterpiece featuring the "To be or not to be" soliloquy and the Mousetrap play.'
  },
  {
    id: 'pride-prejudice',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    era: '1813 • Regency Literature',
    coverExcerpt: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    fullExcerpt: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.
However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.`,
    themes: ['Social Class & Marriage', 'Pride & Personal Bias', 'Irony & Satire', 'Gender Expectations'],
    keyQuotes: [
      {
        quote: "It is a truth universally acknowledged...",
        context: "Famous opening line establishing the ironical societal expectations of 19th-century England.",
        actOrChapter: "Chapter 1"
      },
      {
        quote: "My courage always rises with every attempt to intimidate me.",
        context: "Elizabeth Bennet asserting her independence to Mr. Darcy.",
        actOrChapter: "Chapter 31"
      }
    ],
    summary: 'Jane Austen\'s classic romance satirizing British social hierarchies through the witty clash between Elizabeth Bennet and Fitzwilliam Darcy.'
  },
  {
    id: 'macbeth',
    title: 'Macbeth — Act V',
    author: 'William Shakespeare',
    era: '1606 • Jacobean Tragedy',
    coverExcerpt: 'Tomorrow, and tomorrow, and tomorrow, creeps in this petty pace from day to day...',
    fullExcerpt: `Tomorrow, and tomorrow, and tomorrow,
Creeps in this petty pace from day to day
To the last syllable of recorded time,
And all our yesterdays have lighted fools
The way to dusty death. Out, out, brief candle!
Life's but a walking shadow, a poor player
That struts and frets his hour upon the stage
And then is heard no more. It is a tale
Told by an idiot, full of sound and fury,
Signifying nothing.`,
    themes: ['Ambition & Tyranny', 'Guilt & Psychological Decay', 'Nihilism & Fate', 'Appearance vs. Reality'],
    keyQuotes: [
      {
        quote: "Life's but a walking shadow, a poor player...",
        context: "Macbeth upon learning of Lady Macbeth's death.",
        actOrChapter: "Act V, Scene 5"
      },
      {
        quote: "Out, damned spot! out, I say!",
        context: "Lady Macbeth sleepwalking while tortured by guilt.",
        actOrChapter: "Act V, Scene 1"
      }
    ],
    summary: 'A dark psychological exploration of unbridled ambition and tragic moral ruin in Jacobean Scotland.'
  },
  {
    id: '1984',
    title: 'Nineteen Eighty-Four',
    author: 'George Orwell',
    era: '1949 • Dystopian Fiction',
    coverExcerpt: 'It was a bright cold day in April, and the clocks were striking thirteen.',
    fullExcerpt: `It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.`,
    themes: ['Totalitarianism & Control', 'Language (Newspeak)', 'Memory & Truth', 'Individual Isolation'],
    keyQuotes: [
      {
        quote: "Big Brother is watching you.",
        context: "The omnipresent Party slogan warning citizens of total surveillance.",
        actOrChapter: "Chapter 1"
      },
      {
        quote: "Who controls the past controls the future. Who controls the present controls the past.",
        context: "The Party's doctrine on reality manipulation.",
        actOrChapter: "Chapter 3"
      }
    ],
    summary: 'Orwell\'s haunting dystopian vision of totalitarian control, psychological manipulation, and the destruction of individual truth.'
  }
];
