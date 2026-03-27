
import React from 'react';

const CicloMenstrual: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Ciclo Menstrual
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-8">
          O ciclo menstrual é um processo fisiológico mensal que prepara o corpo feminino para uma possível gravidez.
        </p>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Fases do Ciclo
        </h2>
        <ul className="space-y-4 mb-8">
          <li><strong>Fase Folicular:</strong> Recrutamento e desenvolvimento de folículos ovarianos sob estímulo do FSH.</li>
          <li><strong>Ovulação:</strong> Liberação do ovócito secundário induzida pelo pico de LH.</li>
          <li><strong>Fase Lútea:</strong> Formação do corpo lúteo e secreção de progesterona para preparar o endométrio.</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Preparação Endometrial
        </h2>
        <p className="mb-6">
          O endométrio passa por fases proliferativa (estrogênica) e secretora (progestacional) para permitir a implantação do blastocisto.
        </p>

        <div className="my-12 p-8 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-nexus-purple">Gráfico do Ciclo Menstrual</h3>
          <div className="aspect-video bg-neutral-200 dark:bg-nexus-card rounded-2xl flex items-center justify-center mt-4">
            <span className="text-neutral-400 font-medium">Flutuações Hormonais e Espessura Endometrial</span>
          </div>
        </div>

        <div className="mt-16 p-8 bg-nexus-purple/5 border border-nexus-purple/20 rounded-3xl">
          <h2 className="text-xl font-black text-nexus-purple uppercase tracking-widest mb-4">Resumo Final</h2>
          <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
            O ciclo menstrual é uma orquestração hormonal complexa que reflete a saúde reprodutiva feminina e sua capacidade de gerar vida.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CicloMenstrual;
