
import React from 'react';
import { UserStats } from '../types';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/hooks/useTheme';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: any) => void;
  userStats: UserStats;
  onOpenProfile: () => void;
  onToggleChat: () => void;
  activeStudyTime: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, userStats, onOpenProfile, onToggleChat, activeStudyTime }) => {
  const { theme, toggleTheme } = useTheme();
  const isBasic = userStats.plan === 'basic';
  const usage = userStats.openedContentIds?.length || 0;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
  };

  return (
    <header className="border-b border-med-border dark:border-nexus-border bg-med-card/90 dark:bg-nexus-bg/90 backdrop-blur-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* LADO ESQUERDO */}
        <div className="flex items-center gap-4 shrink-0">
          <div onClick={() => onNavigate('inicio')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-8 h-8 bg-med-primary dark:bg-nexus-blue rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-sm transition-transform group-hover:scale-105">N</div>
            <span className="text-lg font-semibold tracking-tight text-med-text dark:text-nexus-text-title hidden sm:inline">NexusBQ</span>
          </div>

          <button 
            onClick={() => onNavigate('inicio')}
            className={`p-2 rounded-lg transition-all ${currentView === 'inicio' ? 'text-med-primary dark:text-nexus-blue bg-med-primary/10 dark:bg-nexus-blue/10' : 'text-med-sec dark:text-nexus-text-sec hover:text-med-text dark:hover:text-nexus-text-title hover:bg-med-bg dark:hover:bg-nexus-surface'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>

          <button 
            onClick={() => onNavigate('pbl')}
            className={`p-2 rounded-lg transition-all ${currentView === 'pbl' ? 'text-med-primary dark:text-nexus-blue bg-med-primary/10 dark:bg-nexus-blue/10' : 'text-med-sec dark:text-nexus-text-sec hover:text-med-text dark:hover:text-nexus-text-title hover:bg-med-bg dark:hover:bg-nexus-surface'}`}
            title="PBL"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </button>

          <button 
            onClick={() => onNavigate('ct')}
            className={`p-2 rounded-lg transition-all ${currentView === 'ct' ? 'text-med-primary dark:text-nexus-blue bg-med-primary/10 dark:bg-nexus-blue/10' : 'text-med-sec dark:text-nexus-text-sec hover:text-med-text dark:hover:text-nexus-text-title hover:bg-med-bg dark:hover:bg-nexus-surface'}`}
            title="Centro de Treinamento"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </button>

          <button 
            onClick={() => onNavigate('biblioteca')}
            className={`p-2 rounded-lg transition-all ${currentView === 'biblioteca' ? 'text-med-primary dark:text-nexus-blue bg-med-primary/10 dark:bg-nexus-blue/10' : 'text-med-sec dark:text-nexus-text-sec hover:text-med-text dark:hover:text-nexus-text-title hover:bg-med-bg dark:hover:bg-nexus-surface'}`}
            title="Biblioteca"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
          </button>

          <button 
            onClick={() => onNavigate('premium')}
            className={`p-2 rounded-lg transition-all ${currentView === 'premium' ? 'text-med-primary dark:text-nexus-blue bg-med-primary/10 dark:bg-nexus-blue/10' : 'text-med-sec dark:text-nexus-text-sec hover:text-med-text dark:hover:text-nexus-text-title hover:bg-med-bg dark:hover:bg-nexus-surface'}`}
            title="Área Premium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          </button>
        </div>

        {/* CENTRO */}
        <div className="flex-grow flex justify-center">
          {userStats.studyActive && (
            <div onClick={() => onNavigate('foco')} className="flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-nexus-orange/10 border border-amber-200 dark:border-nexus-orange/20 rounded-md cursor-pointer group">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-nexus-orange animate-pulse"></div>
              <span className="text-[11px] font-semibold font-mono text-amber-600 dark:text-nexus-orange tracking-wide">{formatTime(activeStudyTime)}</span>
            </div>
          )}
        </div>

        {/* LADO DIREITO */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-lg text-neutral-500 dark:text-nexus-text-sec hover:text-blue-600 dark:hover:text-nexus-blue transition-all active:scale-95 shadow-sm"
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Botão de Chat */}
          <button 
            onClick={onToggleChat}
            className="p-2 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-lg text-neutral-500 dark:text-nexus-text-sec hover:text-sky-500 dark:hover:text-nexus-blue transition-all active:scale-95"
            title="Chat do Grupo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </button>

          <div className="h-5 w-px bg-med-border dark:bg-nexus-border mx-1"></div>

          <button onClick={onOpenProfile} className="flex items-center gap-2 group p-1 rounded-lg hover:bg-med-bg dark:hover:bg-nexus-surface transition-colors">
            <div className="w-7 h-7 rounded-md overflow-hidden border border-med-border dark:border-nexus-border group-hover:border-med-primary dark:group-hover:border-nexus-blue transition-colors bg-white">
               <img src={userStats.photoURL} alt="P" className="w-full h-full object-cover" />
            </div>
            <span className="hidden md:block text-[11px] font-semibold tracking-wide text-med-sec dark:text-nexus-text-main group-hover:text-med-text dark:group-hover:text-nexus-text-title transition-colors">
              {userStats.displayName.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
