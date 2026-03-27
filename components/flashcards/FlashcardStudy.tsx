
import React, { useState, useEffect, useMemo } from 'react';
import { Flashcard, CardProgress } from './types';
import FlashcardCard from './FlashcardCard';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { SistemaReprodutorMasculinoCards } from './decks/SistemaReprodutorMasculinoDeck';

interface FlashcardStudyProps {
  deckId: string;
  deckName: string;
  onExit: () => void;
}

const FlashcardStudy: React.FC<FlashcardStudyProps> = ({ deckId, deckName, onExit }) => {
  const [allCards, setAllCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isShuffled, setIsShuffled] = useState(true);
  const [progressMap, setProgressMap] = useState<Record<string, CardProgress>>({});
  const [sessionStats, setSessionStats] = useState({
    studied: 0,
    correct: 0,
    startTime: Date.now()
  });

  // Load cards and progress
  useEffect(() => {
    const loadData = async () => {
      let cards: Flashcard[] = [];
      if (deckId === 'sistema-reprodutor-masculino') {
        cards = SistemaReprodutorMasculinoCards;
      }

      if (auth.currentUser) {
        const progressRef = collection(db, "users", auth.currentUser.uid, "flashcards");
        const snap = await getDocs(progressRef);
        const map: Record<string, CardProgress> = {};
        snap.forEach(doc => {
          map[doc.id] = doc.data() as CardProgress;
        });
        setProgressMap(map);
      }

      setAllCards(cards);
      setLoading(false);
    };
    loadData();
  }, [deckId]);

  // Filter and sort cards for the session
  const sessionCards = useMemo(() => {
    let filtered = [...allCards];
    
    // In a real SRS, we would filter by nextReview <= now
    // For this implementation, we'll show all cards but prioritize those due
    const now = Date.now();
    filtered.sort((a, b) => {
      const progA = progressMap[a.id];
      const progB = progressMap[b.id];
      
      const dueA = progA ? progA.nextReview : 0;
      const dueB = progB ? progB.nextReview : 0;
      
      if (dueA <= now && dueB > now) return -1;
      if (dueB <= now && dueA > now) return 1;
      
      return 0;
    });

    if (isShuffled) {
      // Shuffle only the cards that are due or new
      const dueOrNew = filtered.filter(c => !progressMap[c.id] || progressMap[c.id].nextReview <= now);
      const others = filtered.filter(c => progressMap[c.id] && progressMap[c.id].nextReview > now);
      
      for (let i = dueOrNew.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dueOrNew[i], dueOrNew[j]] = [dueOrNew[j], dueOrNew[i]];
      }
      return [...dueOrNew, ...others];
    }

    return filtered;
  }, [allCards, progressMap, isShuffled]);

  const handleRate = async (rating: 'errei' | 'dificil' | 'bom' | 'facil') => {
    if (!auth.currentUser) return;

    const card = sessionCards[currentIndex];
    const userCardRef = doc(db, "users", auth.currentUser.uid, "flashcards", card.id);
    
    const existing = progressMap[card.id] || {
      cardId: card.id,
      repetitions: 0,
      easeFactor: 2.5,
      interval: 0,
      nextReview: 0,
      lastReview: 0,
      lapses: 0,
      step: 0
    };

    let { repetitions, easeFactor, interval, lapses, step } = existing;
    let nextIntervalMinutes = 0;
    let nextIntervalDays = 0;

    // Advanced SRS Logic
    if (step === 0) { // 1st Review
      if (rating === 'errei') { nextIntervalMinutes = 1; step = 0; lapses++; }
      else if (rating === 'dificil') { nextIntervalMinutes = 2; step = 1; }
      else if (rating === 'bom') { nextIntervalMinutes = 3; step = 1; }
      else if (rating === 'facil') { nextIntervalMinutes = 5; step = 1; }
    } else if (step === 1) { // 2nd Review
      if (rating === 'errei') { nextIntervalMinutes = 10; step = 0; lapses++; }
      else if (rating === 'dificil') { nextIntervalDays = 1; step = 2; }
      else if (rating === 'bom') { nextIntervalDays = 2; step = 2; }
      else if (rating === 'facil') { nextIntervalDays = 4; step = 2; }
    } else { // Graduated (Normal SRS)
      if (rating === 'errei') {
        nextIntervalMinutes = 10;
        step = 0;
        lapses++;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
      } else {
        const multiplier = rating === 'dificil' ? 1.2 : rating === 'bom' ? 1.5 : 2.0;
        nextIntervalDays = Math.max(1, Math.round(interval * easeFactor * multiplier));
        if (rating === 'facil') easeFactor += 0.15;
        if (rating === 'dificil') easeFactor = Math.max(1.3, easeFactor - 0.15);
      }
    }

    const nextReview = nextIntervalDays > 0 
      ? Date.now() + nextIntervalDays * 24 * 60 * 60 * 1000
      : Date.now() + nextIntervalMinutes * 60 * 1000;

    const updatedProgress: CardProgress = {
      ...existing,
      repetitions: rating !== 'errei' ? repetitions + 1 : repetitions,
      easeFactor,
      interval: nextIntervalDays,
      nextReview,
      lastReview: Date.now(),
      lapses,
      step
    };

    await setDoc(userCardRef, updatedProgress);
    setProgressMap(prev => ({ ...prev, [card.id]: updatedProgress }));

    setSessionStats(prev => ({
      ...prev,
      studied: prev.studied + 1,
      correct: rating !== 'errei' ? prev.correct + 1 : prev.correct
    }));

    if (currentIndex < sessionCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      onExit();
    }
  };

  const toggleDifficult = async () => {
    if (!auth.currentUser) return;
    const card = sessionCards[currentIndex];
    const isNowDifficult = !card.isDifficult;
    
    // Update local state
    setAllCards(prev => prev.map(c => c.id === card.id ? { ...c, isDifficult: isNowDifficult } : c));
    
    const userCardRef = doc(db, "users", auth.currentUser.uid, "flashcards", card.id);
    await setDoc(userCardRef, { isDifficult: isNowDifficult }, { merge: true });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const currentCard = sessionCards[currentIndex];
  const remaining = sessionCards.length - sessionStats.studied;
  const successRate = sessionStats.studied > 0 ? Math.round((sessionStats.correct / sessionStats.studied) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-in fade-in duration-500">
      {/* Top Stats */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-white dark:bg-nexus-card p-4 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Estudados</p>
            <p className="text-lg font-black text-neutral-900 dark:text-nexus-text-title">{sessionStats.studied}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Restantes</p>
            <p className="text-lg font-black text-sky-500">{remaining}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Acerto</p>
            <p className="text-lg font-black text-emerald-500">{successRate}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsShuffled(!isShuffled)}
            className={`p-2 rounded-lg transition-all ${isShuffled ? 'bg-sky-500 text-white' : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-500'}`}
            title="Misturar Cartões"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18 22 6"/><path d="m2 6 20 12"/><path d="M12 12h.01"/></svg>
          </button>
          <button 
            onClick={onExit}
            className="p-2 bg-neutral-100 dark:bg-nexus-surface text-neutral-500 rounded-lg hover:text-red-500 transition-all"
            title="Sair"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-neutral-100 dark:bg-nexus-surface rounded-full mb-12 overflow-hidden">
        <div 
          className="h-full bg-sky-500 transition-all duration-500" 
          style={{ width: `${(sessionStats.studied / sessionCards.length) * 100}%` }}
        ></div>
      </div>

      <div className="relative">
        <button 
          onClick={toggleDifficult}
          className={`absolute -top-4 -right-4 z-10 p-3 rounded-full shadow-lg transition-all active:scale-90 ${currentCard.isDifficult ? 'bg-amber-500 text-white' : 'bg-white dark:bg-nexus-card text-neutral-300 border border-neutral-200 dark:border-nexus-border'}`}
          title="Marcar como difícil"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={currentCard.isDifficult ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </button>
        
        <FlashcardCard 
          card={currentCard} 
          showAnswer={showAnswer} 
          onFlip={() => setShowAnswer(true)} 
        />
      </div>

      <div className="mt-12 min-h-[100px] flex items-center justify-center">
        {showAnswer ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl animate-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => handleRate('errei')}
              className="group flex flex-col items-center gap-1 px-4 py-4 bg-white dark:bg-nexus-card border-2 border-red-500/20 hover:border-red-500 rounded-2xl transition-all active:scale-95"
            >
              <span className="font-black text-red-500">Errei</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{progressMap[currentCard.id]?.step === 0 ? '1 min' : '10 min'}</span>
            </button>
            
            <button 
              onClick={() => handleRate('dificil')}
              className="group flex flex-col items-center gap-1 px-4 py-4 bg-white dark:bg-nexus-card border-2 border-orange-500/20 hover:border-orange-500 rounded-2xl transition-all active:scale-95"
            >
              <span className="font-black text-orange-500">Difícil</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{progressMap[currentCard.id]?.step === 0 ? '2 min' : '1 dia'}</span>
            </button>
            
            <button 
              onClick={() => handleRate('bom')}
              className="group flex flex-col items-center gap-1 px-4 py-4 bg-white dark:bg-nexus-card border-2 border-sky-500/20 hover:border-sky-500 rounded-2xl transition-all active:scale-95"
            >
              <span className="font-black text-sky-500">Bom</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{progressMap[currentCard.id]?.step === 0 ? '3 min' : '2 dias'}</span>
            </button>
            
            <button 
              onClick={() => handleRate('facil')}
              className="group flex flex-col items-center gap-1 px-4 py-4 bg-white dark:bg-nexus-card border-2 border-emerald-500/20 hover:border-emerald-500 rounded-2xl transition-all active:scale-95"
            >
              <span className="font-black text-emerald-500">Fácil</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{progressMap[currentCard.id]?.step === 0 ? '5 min' : '4 dias'}</span>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowAnswer(true)}
            className="w-full max-w-xs py-5 bg-neutral-900 dark:bg-nexus-surface text-white dark:text-nexus-text-title rounded-2xl font-black text-lg hover:bg-sky-500 dark:hover:bg-nexus-blue transition-all active:scale-95 shadow-xl shadow-sky-500/10"
          >
            Mostrar Resposta
          </button>
        )}
      </div>
    </div>
  );
};

export default FlashcardStudy;
