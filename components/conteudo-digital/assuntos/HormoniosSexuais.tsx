
import React from 'react';

const HormoniosSexuais: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Testosterona, Estrogênio e Progesterona
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-8">
          Os hormônios sexuais são esteroides derivados do colesterol que desempenham papéis cruciais no desenvolvimento sexual, na reprodução e na saúde metabólica.
        </p>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Testosterona
        </h2>
        <p className="mb-6">
          Principal hormônio sexual masculino, produzido principalmente pelas células de Leydig nos testículos.
        </p>
        <ul className="space-y-4 mb-8">
          <li><strong>Funções:</strong> Desenvolvimento dos órgãos reprodutores masculinos, características sexuais secundárias e espermatogênese.</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Estrogênio e Progesterona
        </h2>
        <p className="mb-6">
          Hormônios sexuais femininos produzidos principalmente pelos ovários.
        </p>
        <ul className="space-y-4 mb-8">
          <li><strong>Estrogênio:</strong> Desenvolvimento das características sexuais femininas e regulação do ciclo menstrual.</li>
          <li><strong>Progesterona:</strong> Preparação do útero para a gravidez e manutenção da gestação.</li>
        </ul>

        <div className="my-12 p-8 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-nexus-purple">Vias de Esteroidogênese</h3>
          <div className="aspect-video bg-neutral-200 dark:bg-nexus-card rounded-2xl flex items-center justify-center mt-4">
            <span className="text-neutral-400 font-medium">Diagrama de Síntese Hormonal</span>
          </div>
        </div>

        <div className="mt-16 p-8 bg-nexus-purple/5 border border-nexus-purple/20 rounded-3xl">
          <h2 className="text-xl font-black text-nexus-purple uppercase tracking-widest mb-4">Resumo Final</h2>
          <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
            O equilíbrio entre esses hormônios é fundamental para a função reprodutiva e o bem-estar geral. Suas flutuações regulam processos complexos como o ciclo menstrual e a gravidez.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HormoniosSexuais;
