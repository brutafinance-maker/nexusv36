
import React from 'react';

const DiagnosticoGravidez: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Métodos de Diagnóstico de Gravidez
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-8">
          O diagnóstico de gravidez é fundamental para o início precoce do pré-natal e a garantia da saúde materna e fetal.
        </p>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Métodos Laboratoriais
        </h2>
        <ul className="space-y-4 mb-8">
          <li><strong>Beta-hCG Sérico:</strong> O padrão-ouro para o diagnóstico bioquímico precoce.</li>
          <li><strong>Teste de Gravidez Urinário:</strong> Método qualitativo amplamente utilizado.</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Métodos de Imagem
        </h2>
        <p className="mb-6">
          A ultrassonografia transvaginal é o método de imagem preferencial para confirmar a localização e a viabilidade da gestação.
        </p>

        <div className="my-12 p-8 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-nexus-purple">Zona Discriminatória de hCG</h3>
          <div className="aspect-video bg-neutral-200 dark:bg-nexus-card rounded-2xl flex items-center justify-center mt-4">
            <span className="text-neutral-400 font-medium">Visualização dos Níveis de hCG e Imagem</span>
          </div>
        </div>

        <div className="mt-16 p-8 bg-nexus-purple/5 border border-nexus-purple/20 rounded-3xl">
          <h2 className="text-xl font-black text-nexus-purple uppercase tracking-widest mb-4">Resumo Final</h2>
          <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
            O diagnóstico preciso de gravidez combina a avaliação clínica, os testes bioquímicos e os exames de imagem para garantir a segurança da gestante e do embrião.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DiagnosticoGravidez;
