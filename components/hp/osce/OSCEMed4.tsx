
import React from 'react';

const OSCEMed4: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10">
        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2 block">OSCE • Med 4</span>
        <h2 className="text-3xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tight italic">Estações de Exame Prático</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Protocolos Clínicos */}
        <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm border-dashed">
          <h3 className="text-lg font-black text-neutral-900 dark:text-nexus-text-title mb-4">Protocolos Clínicos</h3>
          <p className="text-neutral-400 text-xs italic">Nenhum protocolo adicionado ainda.</p>
        </div>

        {/* Checklists */}
        <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm border-dashed">
          <h3 className="text-lg font-black text-neutral-900 dark:text-nexus-text-title mb-4">Checklists</h3>
          <p className="text-neutral-400 text-xs italic">Nenhum checklist adicionado ainda.</p>
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

export default OSCEMed4;
