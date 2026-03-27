
import React from 'react';

const EixoHipotalamoHipofiseGonadas: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Eixo Hipotálamo-Hipófise-Gônadas
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-8">
          O eixo Hipotálamo-Hipófise-Gônadas (HHG) é a unidade funcional que controla o desenvolvimento, a maturação e a função reprodutiva em ambos os sexos.
        </p>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Componentes do Eixo
        </h2>
        <ul className="space-y-4 mb-8">
          <li><strong>Hipotálamo:</strong> Secreta o Hormônio Liberador de Gonadotrofinas (GnRH) de forma pulsátil.</li>
          <li><strong>Hipófise Anterior:</strong> Responde ao GnRH secretando FSH (Hormônio Folículo-Estimulante) e LH (Hormônio Luteinizante).</li>
          <li><strong>Gônadas (Testículos/Ovários):</strong> Respondem às gonadotrofinas produzindo gametas e hormônios sexuais.</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Mecanismos de Feedback
        </h2>
        <p className="mb-6">
          O sistema opera através de feedbacks negativos (e ocasionalmente positivos no ciclo feminino) para manter o equilíbrio hormonal.
        </p>

        <div className="my-12 p-8 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-nexus-purple">Diagrama do Eixo HHG</h3>
          <div className="aspect-video bg-neutral-200 dark:bg-nexus-card rounded-2xl flex items-center justify-center mt-4">
            <span className="text-neutral-400 font-medium">Visualização do Controle Hormonal</span>
          </div>
        </div>

        <div className="mt-16 p-8 bg-nexus-purple/5 border border-nexus-purple/20 rounded-3xl">
          <h2 className="text-xl font-black text-nexus-purple uppercase tracking-widest mb-4">Resumo Final</h2>
          <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
            A integridade do eixo HHG é essencial para a fertilidade. Qualquer disfunção em um de seus níveis pode resultar em distúrbios reprodutivos significativos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EixoHipotalamoHipofiseGonadas;
