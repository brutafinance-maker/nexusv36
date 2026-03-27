
import React, { useState, useRef, useEffect } from 'react';

interface TermoInterativoProps {
  termo: string;
  explicacao: string;
  isSigla?: boolean;
}

const TermoInterativo: React.FC<TermoInterativoProps> = ({ termo, explicacao, isSigla }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-help border-b-2 border-dotted transition-all duration-200 outline-none ${
          isSigla 
            ? 'border-sky-400 text-sky-600 dark:text-nexus-blue hover:bg-sky-50 dark:hover:bg-nexus-blue/10' 
            : 'border-nexus-purple/50 text-nexus-purple hover:bg-nexus-purple/5'
        } font-bold px-0.5 rounded-sm`}
        aria-expanded={isOpen}
      >
        {termo}
      </button>
      
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 text-sm font-normal text-neutral-700 dark:text-nexus-text-main leading-relaxed">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-neutral-100 dark:border-nexus-border/50">
            <span className="font-black text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-nexus-text-sec">
              {isSigla ? 'Significado da Sigla' : 'Explicação Simplificada'}
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
              className="text-neutral-300 hover:text-neutral-500 dark:hover:text-nexus-text-title transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <p className="italic">
            {explicacao}
          </p>
          {/* Seta do Balão */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-nexus-card border-r border-b border-neutral-200 dark:border-nexus-border rotate-45"></div>
        </div>
      )}
    </span>
  );
};

export default TermoInterativo;
