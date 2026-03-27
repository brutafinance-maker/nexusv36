
import React, { useState } from 'react';
import Modulo7Conteudo from './modulos/Modulo7Conteudo';

const ConteudoDigitalPage: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<number>(7);

  const modules = [
    { id: 1, title: 'ASE 1 — Introdução ao Estudo da Medicina' },
    { id: 2, title: 'ASE 2 — Proliferação e Diferenciação Celular' },
    { id: 3, title: 'ASE 3 — Funções Biológicas 1' },
    { id: 4, title: 'ASE 4 — Funções Biológicas 2' },
    { id: 5, title: 'ASE 5 — Metabolismo e Nutrição' },
    { id: 6, title: 'ASE 6 — Mecanismo de Agressão e Defesa' },
    { id: 7, title: 'ASE 7 — Concepção, Formação do Ser Humano e Gestação' },
    { id: 8, title: 'ASE 8 — Nascimento e Desenvolvimento' },
    { id: 9, title: 'ASE 9 — Vida Adulta e Envelhecimento' },
    { id: 10, title: 'ASE 10 — Percepção e Emoções' },
    { id: 11, title: 'ASE 11 — Febre e Inflamação' },
    { id: 12, title: 'ASE 12 — Fadiga e Anemias' },
  ];

  const renderModuleContent = () => {
    switch (selectedModule) {
      case 7:
        return <Modulo7Conteudo />;
      default:
        return (
          <div className="py-40 text-center bg-white dark:bg-nexus-card border border-dashed border-neutral-200 dark:border-nexus-border rounded-[3rem] shadow-sm">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-nexus-surface rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <h3 className="text-xl font-black text-neutral-900 dark:text-nexus-text-title mb-2">Módulo em Desenvolvimento</h3>
            <p className="text-neutral-500 dark:text-nexus-text-main max-w-md mx-auto">O conteúdo digital para o Módulo {selectedModule} está sendo preparado pela nossa equipe acadêmica.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 pb-32 animate-in fade-in duration-700">
      <header className="mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-nexus-text-title mb-6 tracking-tighter italic">Conteúdo Digital</h1>
        <p className="text-neutral-500 dark:text-nexus-text-main text-lg md:text-2xl font-light max-w-4xl leading-relaxed">
          Uma experiência de aprendizado modular e interativa, focada na clareza e profundidade de cada assunto médico.
        </p>
      </header>

      {/* Seletor de Módulos */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-8 mb-12 -mx-4 px-4">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedModule(m.id)}
            className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              selectedModule === m.id
                ? 'bg-nexus-purple text-white border-nexus-purple shadow-xl shadow-nexus-purple/20 scale-105'
                : 'bg-white dark:bg-nexus-card text-neutral-500 dark:text-nexus-text-sec border-neutral-200 dark:border-nexus-border hover:border-nexus-purple/50'
            }`}
          >
            Módulo {m.id}
          </button>
        ))}
      </div>

      {/* Conteúdo do Módulo */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {renderModuleContent()}
      </div>
    </div>
  );
};

export default ConteudoDigitalPage;
