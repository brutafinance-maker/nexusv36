
import React, { useState } from 'react';
import Module7Training from './training/Module7Training';

const TrainingCenterView: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    { 
      id: 'm1', 
      name: 'ASE 1 — Introdução ao Estudo da Medicina', 
      icon: '🩺', 
      color: 'bg-blue-500/10 text-blue-500',
      description: 'Fundamentos da prática médica e ética profissional.'
    },
    { 
      id: 'm7', 
      name: 'ASE 7 — Concepção, Formação do Ser Humano e Gestação', 
      icon: '🤰', 
      color: 'bg-rose-500/10 text-rose-500',
      description: 'Embriologia, fisiologia obstétrica e desenvolvimento fetal completo.'
    },
    { 
      id: 'm8', 
      name: 'ASE 8 — Nascimento, Crescimento e Desenvolvimento', 
      icon: '👶', 
      color: 'bg-emerald-500/10 text-emerald-500',
      description: 'Pediatria básica e marcos do desenvolvimento infantil.'
    }
  ];

  if (activeModule === 'm7') {
    return (
      <div className="animate-in fade-in duration-500">
        <Module7Training onBack={() => setActiveModule(null)} hideHeader={false} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 py-6 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-nexus-text-title tracking-tight">
            Centro de <span className="text-nexus-blue font-medium">Treinamento (CT)</span>
          </h1>
          <p className="text-xs text-neutral-500 dark:text-nexus-text-sec mt-1 font-medium tracking-wide uppercase">
            Treinamento intensivo por módulos e tópicos específicos.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div 
            key={module.id}
            className="group bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-nexus-blue/30 dark:hover:border-nexus-hover transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-blue/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative">
              <div className={`w-14 h-14 rounded-2xl ${module.color} flex items-center justify-center text-2xl mb-6 shadow-sm`}>
                {module.icon}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-nexus-text-title leading-tight mb-3 group-hover:text-nexus-blue transition-colors">
                {module.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-nexus-text-sec leading-relaxed mb-8">
                {module.description}
              </p>
            </div>

            <button 
              onClick={() => {
                setActiveModule(module.id);
              }}
              className="relative w-full py-4 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 dark:text-nexus-text-main hover:bg-nexus-blue hover:text-white hover:border-nexus-blue transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Ver Conteúdo
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        ))}
      </div>

      {activeModule && activeModule !== 'm7' && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-10 max-w-md w-full text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-nexus-blue/10 text-nexus-blue rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🚧</div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-nexus-text-title uppercase italic mb-2 tracking-tighter">Em Desenvolvimento</h2>
            <p className="text-sm text-neutral-500 dark:text-nexus-text-sec mb-8">O treinamento para este módulo está sendo compilado pela nossa equipe médica.</p>
            <button 
              onClick={() => setActiveModule(null)}
              className="w-full py-4 bg-nexus-blue text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCenterView;
