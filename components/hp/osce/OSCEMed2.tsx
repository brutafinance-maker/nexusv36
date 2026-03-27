
import React, { useState } from 'react';
import OSCEMed2Conteudo from './med2/OSCEMed2Conteudo';
import OSCEMed2Checklists from './med2/OSCEMed2Checklists';

const OSCEMed2: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'conteudos' | 'checklists'>('dashboard');
  const [showPopup, setShowPopup] = useState(true);

  if (view === 'conteudos') {
    // ... rest of the component
    return (
      <div className="animate-in fade-in duration-500">
        <button 
          onClick={() => setView('dashboard')}
          className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Voltar para Dashboard</span>
        </button>
        <OSCEMed2Conteudo />
      </div>
    );
  }

  if (view === 'checklists') {
    return (
      <div className="animate-in fade-in duration-500">
        <button 
          onClick={() => setView('dashboard')}
          className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Voltar para Dashboard</span>
        </button>
        <OSCEMed2Checklists />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-nexus-card w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl border border-neutral-200 dark:border-nexus-border animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h2 className="text-4xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-6 italic">IMPORTANTE</h2>
              <div className="space-y-4 text-neutral-500 dark:text-nexus-text-main text-sm leading-relaxed mb-8">
                <p>
                  Durante o uso dos checklists e simulados de OSCE, é muito importante marcar corretamente os checkboxes de cada etapa do exame.
                </p>
                <p>
                  Essas marcações ajudam a gerar estatísticas individuais e coletivas, permitindo que você veja:
                </p>
                <ul className="text-left list-disc pl-5 space-y-1">
                  <li>Em quais partes do exame você está errando mais</li>
                  <li>Quais etapas precisam ser mais treinadas</li>
                  <li>Quais pontos a maioria dos estudantes também tem dificuldade</li>
                </ul>
                <p>
                  Isso ajuda você a melhorar seu desempenho e torna os simulados mais próximos da realidade de um OSCE.
                </p>
                <p className="font-bold text-neutral-900 dark:text-white">
                  Sempre que possível, marque os itens corretamente antes de enviar seu exame.
                </p>
              </div>
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="mb-10">
        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2 block">OSCE • Med 2</span>
        <h2 className="text-3xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tight italic">Estações de Exame Prático</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Conteúdos Digitais */}
        <div 
          onClick={() => setView('conteudos')}
          className="bg-neutral-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-rose-500/10 cursor-pointer hover:-translate-y-1 transition-all group relative overflow-hidden"
        >
          <div className="relative z-10">
            <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2 block">Novo</span>
            <h3 className="text-2xl font-black tracking-tighter italic mb-4">Conteúdos Digitais</h3>
            <p className="text-neutral-400 text-xs leading-relaxed mb-6">Acesse os materiais convertidos de PDF para estudo nativo.</p>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Acessar Materiais →</span>
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all"></div>
        </div>

        {/* Checklists */}
        <div 
          onClick={() => setView('checklists')}
          className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm cursor-pointer hover:border-rose-400/50 hover:-translate-y-1 transition-all group relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter italic mb-4">Checklists</h3>
            <p className="text-neutral-400 text-xs leading-relaxed mb-6">Estruturas de avaliação para exames físicos fisiológicos.</p>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">Acessar Checklists →</span>
            <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
          </div>
        </div>

        {/* Protocolos Clínicos */}
        <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm border-dashed opacity-60">
          <h3 className="text-lg font-black text-neutral-900 dark:text-nexus-text-title mb-4">Protocolos Clínicos</h3>
          <p className="text-neutral-400 text-xs italic">Em breve.</p>
        </div>

        {/* Simulações */}
        <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm border-dashed">
          <h3 className="text-lg font-black text-neutral-900 dark:text-nexus-text-title mb-4">Simulações</h3>
          <p className="text-neutral-400 text-xs italic">Nenhuma simulação adicionada ainda.</p>
        </div>

        {/* Casos Clínicos */}
        <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm border-dashed">
          <h3 className="text-lg font-black text-neutral-900 dark:text-nexus-text-title mb-4">Casos Clínicos</h3>
          <p className="text-neutral-400 text-xs italic">Nenhum caso clínico adicionado ainda.</p>
        </div>

        {/* Vídeos */}
        <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm border-dashed">
          <h3 className="text-lg font-black text-neutral-900 dark:text-nexus-text-title mb-4">Vídeos Demonstrativos</h3>
          <p className="text-neutral-400 text-xs italic">Nenhum vídeo adicionado ainda.</p>
        </div>

        {/* Imagens */}
        <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm border-dashed">
          <h3 className="text-lg font-black text-neutral-900 dark:text-nexus-text-title mb-4">Imagens e Atlas</h3>
          <p className="text-neutral-400 text-xs italic">Nenhuma imagem adicionada ainda.</p>
        </div>
      </div>
    </div>
  );
};

export default OSCEMed2;
