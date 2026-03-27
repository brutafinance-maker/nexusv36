
import React from 'react';

const FecundacaoFertilizacao: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Fecundação e Fertilização
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-8">
          A fecundação é o processo biológico pelo qual dois gametas (espermatozoide e ovócito) se fundem para formar um novo organismo (zigoto).
        </p>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Etapas da Fecundação
        </h2>
        <ul className="space-y-4 mb-8">
          <li><strong>Capacitação Espermática:</strong> Ocorre no trato reprodutor feminino, permitindo a reação acrossômica.</li>
          <li><strong>Reação Acrossômica:</strong> Liberação de enzimas para atravessar a zona pelúcida.</li>
          <li><strong>Fusão de Membranas:</strong> O espermatozoide entra no ovócito secundário.</li>
          <li><strong>Reação Cortical:</strong> Bloqueio à poliespermia para garantir que apenas um espermatozoide fecunde o ovócito.</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Formação do Zigoto
        </h2>
        <p className="mb-6">
          A fusão dos pronúcleos masculino e feminino (singamia) completa a fertilização e inicia o desenvolvimento embrionário.
        </p>

        <div className="my-12 p-8 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-nexus-purple">Diagrama da Fecundação</h3>
          <div className="aspect-video bg-neutral-200 dark:bg-nexus-card rounded-2xl flex items-center justify-center mt-4">
            <span className="text-neutral-400 font-medium">Visualização da Fusão de Gametas</span>
          </div>
        </div>

        <div className="mt-16 p-8 bg-nexus-purple/5 border border-nexus-purple/20 rounded-3xl">
          <h2 className="text-xl font-black text-nexus-purple uppercase tracking-widest mb-4">Resumo Final</h2>
          <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
            A fecundação é um evento único e altamente coordenado que marca o início de uma nova vida, combinando o material genético de ambos os pais.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FecundacaoFertilizacao;
