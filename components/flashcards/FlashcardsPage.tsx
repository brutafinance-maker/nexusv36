
import React, { useState } from 'react';
import FlashcardDeck from './FlashcardDeck';
import FlashcardStudy from './FlashcardStudy';
import FlashcardStats from './FlashcardStats';
import { SistemaReprodutorMasculinoCards } from './decks/SistemaReprodutorMasculinoDeck';

const FlashcardsPage: React.FC = () => {
  const [activeDeck, setActiveDeck] = useState<string | null>(null);
  const [isStudying, setIsStudying] = useState(false);

  const decks = [
    {
      id: 'sistema-reprodutor-masculino',
      name: 'Sistema Reprodutor Masculino',
      description: 'Anatomia, fisiologia e histologia do sistema reprodutor masculino.',
      cardCount: SistemaReprodutorMasculinoCards.length
    }
  ];

  if (isStudying && activeDeck) {
    const deck = decks.find(d => d.id === activeDeck);
    return (
      <FlashcardStudy 
        deckId={activeDeck} 
        deckName={deck?.name || ''} 
        onExit={() => setIsStudying(false)} 
      />
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-500 text-[10px] font-black uppercase tracking-widest rounded-full">Estudo Ativo</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
          <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Flashcards</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-6 leading-[0.9]">
          Cartões de <br />
          <span className="text-sky-500">Memória</span>
        </h1>
        <p className="text-neutral-500 dark:text-nexus-text-sec max-w-2xl text-lg">
          Utilize a repetição espaçada para memorizar conceitos fundamentais de forma eficiente e duradoura.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-nexus-text-title flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/></svg>
            Seus Decks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decks.map(deck => (
              <FlashcardDeck 
                key={deck.id}
                id={deck.id}
                name={deck.name}
                description={deck.description}
                cardCount={deck.cardCount}
                onStudy={() => {
                  setActiveDeck(deck.id);
                  setIsStudying(true);
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-nexus-text-title flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Estatísticas
          </h2>
          <FlashcardStats />
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
