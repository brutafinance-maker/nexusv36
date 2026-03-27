
import React from 'react';

const FisiologiaReprodutiva: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Fisiologia Reprodutiva
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-8">
          A fisiologia reprodutiva abrange os processos funcionais que permitem a formação de gametas, a regulação hormonal e a preparação do corpo para a concepção e gestação.
        </p>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Espermatogênese e Ovogênese
        </h2>
        <p className="mb-6">
          Processos de formação de gametas masculinos e femininos, respectivamente, através da meiose, reduzindo o número de cromossomos pela metade.
        </p>
        <ul className="space-y-4 mb-8">
          <li><strong>Espermatogênese:</strong> Ocorre continuamente nos testículos a partir da puberdade.</li>
          <li><strong>Ovogênese:</strong> Inicia-se na vida fetal, é interrompida e retomada mensalmente na puberdade.</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Regulação Hormonal
        </h2>
        <p className="mb-6">
          O eixo Hipotálamo-Hipófise-Gônadas (HHG) é o principal regulador da função reprodutiva, utilizando hormônios como GnRH, FSH e LH.
        </p>

        <div className="my-12 p-8 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-nexus-purple">Diagrama de Fluxo Hormonal</h3>
          <p className="text-sm text-neutral-500 italic">
            [Diagrama: Interação entre GnRH, FSH, LH e esteroides sexuais]
          </p>
          <div className="aspect-video bg-neutral-200 dark:bg-nexus-card rounded-2xl flex items-center justify-center mt-4">
            <span className="text-neutral-400 font-medium">Representação Visual da Fisiologia</span>
          </div>
        </div>

        <div className="mt-16 p-8 bg-nexus-purple/5 border border-nexus-purple/20 rounded-3xl">
          <h2 className="text-xl font-black text-nexus-purple uppercase tracking-widest mb-4">Resumo Final</h2>
          <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
            A fisiologia reprodutiva é um sistema dinâmico e altamente regulado, onde a coordenação entre o sistema nervoso e o sistema endócrino garante a fertilidade e a saúde reprodutiva.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FisiologiaReprodutiva;
