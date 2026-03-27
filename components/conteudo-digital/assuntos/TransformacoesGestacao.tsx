
import React from 'react';

const TransformacoesGestacao: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Transformações Durante a Concepção
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-8">
          A concepção e a gestação inicial desencadeiam uma série de transformações fisiológicas e anatômicas no corpo da mulher para suportar o desenvolvimento fetal.
        </p>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Mudanças Iniciais
        </h2>
        <ul className="space-y-4 mb-8">
          <li><strong>Hormonais:</strong> Aumento massivo de hCG, estrogênio e progesterona.</li>
          <li><strong>Uterinas:</strong> Aumento da vascularização e amolecimento do istmo (Sinal de Hegar).</li>
          <li><strong>Mamárias:</strong> Sensibilidade e aumento do volume das mamas (Sinal de Hunter).</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Sinais e Sintomas de Gravidez
        </h2>
        <p className="mb-6">
          Classificados em sinais de presunção, probabilidade e certeza.
        </p>

        <div className="my-12 p-8 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-nexus-purple">Tabela de Sinais de Gravidez</h3>
          <div className="aspect-video bg-neutral-200 dark:bg-nexus-card rounded-2xl flex items-center justify-center mt-4">
            <span className="text-neutral-400 font-medium">Visualização das Transformações</span>
          </div>
        </div>

        <div className="mt-16 p-8 bg-nexus-purple/5 border border-nexus-purple/20 rounded-3xl">
          <h2 className="text-xl font-black text-nexus-purple uppercase tracking-widest mb-4">Resumo Final</h2>
          <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
            As transformações gestacionais são adaptações fisiológicas essenciais que garantem a nutrição, o crescimento e a proteção do feto durante toda a gravidez.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TransformacoesGestacao;
