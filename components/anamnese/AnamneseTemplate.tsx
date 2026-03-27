
import React from 'react';

interface AnamneseSectionProps {
  title: string;
  children?: React.ReactNode;
}

const AnamneseSection: React.FC<AnamneseSectionProps> = ({ title, children }) => (
  <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-4 border-b border-neutral-100 pb-2 italic">
      {title}
    </h3>
    <div className="min-h-[100px] flex items-center justify-center border-2 border-dashed border-neutral-100 rounded-xl text-neutral-400 text-xs font-medium italic">
      {children || "Conteúdo a ser adicionado..."}
    </div>
  </div>
);

interface AnamneseTemplateProps {
  title: string;
  onBack: () => void;
}

const AnamneseTemplate: React.FC<AnamneseTemplateProps> = ({ title, onBack }) => {
  const sections = [
    "Identificação do Paciente",
    "Queixa Principal",
    "História da Doença Atual",
    "Antecedentes Pessoais",
    "Antecedentes Familiares",
    "Hábitos de Vida",
    "Exame Físico",
    "Hipóteses ou Conduta"
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-neutral-50 -mx-4 px-4 md:-mx-8 md:px-8 min-h-screen text-neutral-900 w-auto">
      <div className="max-w-5xl mx-auto py-6">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-black text-neutral-900 tracking-tight italic uppercase">
            {title}
          </h2>
          <div className="h-1 w-20 bg-nexus-blue mx-auto mt-4 rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <AnamneseSection key={index} title={section} />
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-neutral-100 text-center no-print">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em]">
            NexusBQ • Guia de Consulta Clínica
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AnamneseTemplate;
