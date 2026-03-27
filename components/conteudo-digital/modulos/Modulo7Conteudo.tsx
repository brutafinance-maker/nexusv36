
import React, { Suspense, useState } from 'react';

// Lazy loading subjects
const AnatomiaReprodutiva = React.lazy(() => import('../assuntos/AnatomiaReprodutiva'));
const FisiologiaReprodutiva = React.lazy(() => import('../assuntos/FisiologiaReprodutiva'));
const EixoHipotalamoHipofiseGonadas = React.lazy(() => import('../assuntos/EixoHipotalamoHipofiseGonadas'));
const HormoniosSexuais = React.lazy(() => import('../assuntos/HormoniosSexuais'));
const CicloMenstrual = React.lazy(() => import('../assuntos/CicloMenstrual'));
const FecundacaoFertilizacao = React.lazy(() => import('../assuntos/FecundacaoFertilizacao'));
const TransformacoesGestacao = React.lazy(() => import('../assuntos/TransformacoesGestacao'));
const DiagnosticoGravidez = React.lazy(() => import('../assuntos/DiagnosticoGravidez'));
const PeriodoFetal = React.lazy(() => import('../assuntos/PeriodoFetal'));

const Modulo7Conteudo: React.FC = () => {
  const [selectedAssunto, setSelectedAssunto] = useState<string | null>(null);

  const assuntos = [
    { id: 'anatomia', title: 'Anatomia Reprodutiva', component: <AnatomiaReprodutiva /> },
    { id: 'fisiologia', title: 'Fisiologia Reprodutiva', component: <FisiologiaReprodutiva /> },
    { id: 'eixo', title: 'Eixo HHG', component: <EixoHipotalamoHipofiseGonadas /> },
    { id: 'hormonios', title: 'Hormônios Sexuais', component: <HormoniosSexuais /> },
    { id: 'ciclo', title: 'Ciclo Menstrual', component: <CicloMenstrual /> },
    { id: 'fecundacao', title: 'Fecundação e Fertilização', component: <FecundacaoFertilizacao /> },
    { id: 'transformacoes', title: 'Transformações na Gestação', component: <TransformacoesGestacao /> },
    { id: 'diagnostico', title: 'Diagnóstico de Gravidez', component: <DiagnosticoGravidez /> },
    { id: 'fetal', title: 'Período Fetal', component: <PeriodoFetal /> },
  ];

  const renderContent = () => {
    const assunto = assuntos.find(a => a.id === selectedAssunto);
    return assunto ? assunto.component : (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-nexus-purple/10 rounded-full flex items-center justify-center text-nexus-purple mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </div>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-nexus-text-title mb-2 italic">Selecione um Assunto</h2>
        <p className="text-neutral-500 dark:text-nexus-text-main max-w-md">Escolha um dos temas ao lado para carregar o conteúdo digital interativo.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar de Assuntos */}
      <aside className="w-full lg:w-80 shrink-0">
        <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-6 sticky top-24">
          <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-6">Assuntos do Módulo</h3>
          <nav className="space-y-2">
            {assuntos.map((assunto) => (
              <button
                key={assunto.id}
                onClick={() => setSelectedAssunto(assunto.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${
                  selectedAssunto === assunto.id
                    ? 'bg-nexus-purple text-white shadow-lg shadow-nexus-purple/20'
                    : 'text-neutral-600 dark:text-nexus-text-main hover:bg-neutral-50 dark:hover:bg-nexus-surface'
                }`}
              >
                {assunto.title}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${selectedAssunto === assunto.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`}><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-grow bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-[2.5rem] p-8 md:p-12 lg:p-16 min-h-[600px] shadow-sm">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-4 border-nexus-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          {renderContent()}
        </Suspense>
      </main>
    </div>
  );
};

export default Modulo7Conteudo;
