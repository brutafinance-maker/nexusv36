
export interface Flashcard {
  id: string;
  pergunta: string;
  resposta: string;
  assunto: string;
  subtopico: string;
  dificuldade: 'Fácil' | 'Médio' | 'Difícil';
  isDifficult?: boolean;
}

export interface CardProgress {
  cardId: string;
  repetitions: number;
  easeFactor: number;
  interval: number; // in days (0 means minutes/learning)
  nextReview: number; // timestamp
  lastReview: number; // timestamp
  lapses: number;
  step: number; // 0: new, 1: learning, 2: graduated
}

export interface StudySessionStats {
  cardsStudiedToday: number;
  cardsRemaining: number;
  successRate: number;
  studyTime: number; // in seconds
}
