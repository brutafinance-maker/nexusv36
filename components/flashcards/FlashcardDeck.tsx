
import React from 'react';

interface FlashcardDeckProps {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  onStudy: () => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ name, description, cardCount, onStudy }) => {
  return (
    <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-2xl p-6 hover:border-sky-500 dark:hover:border-nexus-blue transition-all group shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-sky-500/10 text-sky-500 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{cardCount} Cartões</span>
      </div>
      
      <h3 className="text-lg font-bold text-neutral-900 dark:text-nexus-text-title mb-2 group-hover:text-sky-500 dark:group-hover:text-nexus-blue transition-colors">
        {name}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-nexus-text-sec mb-6 line-clamp-2">
        {description}
      </p>
      
      <button 
        onClick={onStudy}
        className="w-full py-3 bg-neutral-900 dark:bg-nexus-surface text-white dark:text-nexus-text-title rounded-xl font-bold text-sm hover:bg-sky-500 dark:hover:bg-nexus-blue transition-all active:scale-[0.98]"
      >
        Estudar Agora
      </button>
    </div>
  );
};

export default FlashcardDeck;
