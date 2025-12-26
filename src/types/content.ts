// Content Types for Overlord Study App

export interface StudyCard {
  id: string;
  title: string;
  content: string;
  frenchPerspective?: string;
  sources: string[];
  images?: ImageItem[];
  videos?: VideoItem[];
}

export interface ImageItem {
  url: string;
  caption: string;
  credit: string;
  sourceLink: string;
  alt: string;
}

export interface VideoItem {
  title: string;
  channel: string;
  url: string;
  relevance: string;
  duration?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedModules: string[];
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  type: 'mcq' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  overview: string;
  keyIdeas: string[];
  cards: StudyCard[];
  glossaryTerms: string[];
  images: ImageItem[];
  videos: VideoItem[];
  quizQuestions: string[];
  estimatedTime: string;
  frenchHighlights?: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  time?: string;
  title: string;
  description: string;
  category: 'airborne' | 'beach' | 'command' | 'civilian' | 'german' | 'naval' | 'air' | 'resistance';
  location?: string;
  relatedModules: string[];
  images?: ImageItem[];
  importance: 'major' | 'significant' | 'minor';
}

export interface Source {
  id: string;
  type: 'book' | 'website' | 'documentary' | 'museum' | 'archive' | 'article';
  title: string;
  author?: string;
  publisher?: string;
  year?: string;
  url?: string;
  accessDate?: string;
  description: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'glossary' | 'fact' | 'date' | 'person' | 'location';
  moduleId?: string;
  lastReviewed?: string;
  confidence?: 'again' | 'good' | 'easy';
  nextReview?: string;
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  modules: string[];
  focusAreas: string[];
}

export interface UserProgress {
  modulesCompleted: string[];
  cardsRead: Record<string, string[]>;
  quizAttempts: QuizAttempt[];
  flashcardProgress: Record<string, FlashcardState>;
  currentPath?: string;
  lastVisited: string;
  bookmarks: Bookmark[];
  frenchPerspectiveEnabled: boolean;
}

export interface QuizAttempt {
  quizId: string;
  moduleId: string;
  date: string;
  score: number;
  totalQuestions: number;
  incorrectQuestions: string[];
}

export interface FlashcardState {
  lastReviewed: string;
  confidence: 'again' | 'good' | 'easy';
  reviewCount: number;
  nextReview: string;
}

export interface Bookmark {
  type: 'module' | 'card' | 'timeline' | 'glossary';
  id: string;
  title: string;
  dateAdded: string;
}

export interface NormandySite {
  id: string;
  name: string;
  type: 'cemetery' | 'museum' | 'beach' | 'memorial' | 'battlefield';
  location: string;
  description: string;
  whatItTeaches: string;
  visitTips?: string;
  website?: string;
}

export interface MuseumItem {
  id: string;
  name: string;
  type: 'tank' | 'vehicle' | 'aircraft' | 'weapon' | 'artillery' | 'equipment';
  nation: 'allied' | 'axis';
  country: string;
  description: string;
  specifications: Record<string, string>;
  dDayRole: string;
  image: string;
  imageCredit: string;
}

export interface HistoricalMap {
  id: string;
  title: string;
  description: string;
  image: string;
  credit: string;
  category: 'overview' | 'beaches' | 'airborne' | 'german' | 'campaign' | 'logistics';
  relatedModules: string[];
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  url: string;
  thumbnail: string;
  duration: string;
  category: 'animated-overview' | 'german-perspective' | 'beach-landings' | 'airborne' | 'equipment' | 'planning' | 'french-perspective';
  description: string;
  relatedModules: string[];
  recommended: boolean;
}
