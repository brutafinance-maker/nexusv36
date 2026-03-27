
import React from 'react';
import { Flashcard } from './types';

interface FlashcardCardProps {
  card: Flashcard;
  showAnswer: boolean;
  onFlip: () => void;
}

const FlashcardCard: React.FC<FlashcardCardProps> = ({ card, showAnswer, onFlip }) => {
  // Function to format cloze deletions for the front of the card
  const formatFront = (text: string) => {
    return text.replace(/{{c\d::(.*?)(::.*?)?}}/g, '[...]');
  };

  // Function to format cloze deletions for the back of the card (highlighting the answer)
  const formatBack = (text: string) => {
    return text.replace(/{{c\d::(.*?)(::.*?)?}}/g, '<span class="text-sky-500 font-black underline">$1</span>');
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-8 md:p-12 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center transition-all"
      >
        {!showAnswer ? (
          <div className="animate-in fade-in duration-300 w-full">
            <h2 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-nexus-text-title leading-relaxed">
              {formatFront(card.pergunta)}
            </h2>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 fade-in duration-300 w-full">
            <div className="mb-8 pb-8 border-b border-neutral-100 dark:border-nexus-border/50">
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Pergunta</h3>
              <p className="text-lg text-neutral-600 dark:text-nexus-text-sec">
                {formatFront(card.pergunta)}
              </p>
            </div>
            
            <h3 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-4">Resposta</h3>
            <div 
              className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-nexus-text-title leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatBack(card.resposta) }}
            />
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-center gap-2">
        <span className="px-3 py-1 bg-neutral-100 dark:bg-nexus-surface text-[10px] font-bold text-neutral-500 dark:text-nexus-text-sec rounded-full uppercase tracking-widest">
          {card.assunto}
        </span>
        <span className="px-3 py-1 bg-neutral-100 dark:bg-nexus-surface text-[10px] font-bold text-neutral-500 dark:text-nexus-text-sec rounded-full uppercase tracking-widest">
          {card.subtopico}
        </span>
      </div>
    </div>
  );
};

export default FlashcardCard;
