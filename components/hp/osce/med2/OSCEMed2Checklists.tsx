
import React, { useState, Suspense, lazy } from 'react';

// Lazy loading components for performance
const CabecaPescoco = lazy(() => import('./checklists/CabecaPescoco'));
const AbdomeFisiologico = lazy(() => import('./checklists/AbdomeFisiologico'));
const ExamePrecordio = lazy(() => import('./checklists/ExamePrecordio'));
const ToraxRespiratorio = lazy(() => import('./checklists/ToraxRespiratorio'));
const LavagemMaos = lazy(() => import('./checklists/LavagemMaos'));
const MedidasAntropometricas = lazy(() => import('./checklists/MedidasAntropometricas'));
const SinaisVitais = lazy(() => import('./checklists/SinaisVitais'));

interface Checklist {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const OSCEMed2Checklists: React.FC = () => {
  const [selectedChecklistId, setSelectedChecklistId] = useState<string | null>(null);

  const checklists = [
    {
      id: 'cabeca_pescoco',
      title: 'Cabeça e Pescoço',
      category: 'Exame Físico',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/><path d="M12 15v7"/><path d="M7 22h10"/></svg>,
      component: <CabecaPescoco />
    },
    {
      id: 'abdome_fisiologico',
      title: 'Abdome Fisiológico',
      category: 'Exame Físico',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>,
      component: <AbdomeFisiologico />
    },
    {
      id: 'exame_precordio',
      title: 'Exame do Precórdio',
      category: 'Exame Físico',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
      component: <ExamePrecordio />
    },
    {
      id: 'torax_respiratorio',
      title: 'Tórax Respiratório',
      category: 'Exame Físico',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2-2.67 4-4 6-4a4 4 0 1 1 0 8c-2 0-4-1.33-6-4Z"/><path d="M12 12v10"/><path d="M12 12V2"/></svg>,
      component: <ToraxRespiratorio />
    },
    {
      id: 'lavagem_maos',
      title: 'Lavagem de Mãos e Luvas Estéreis',
      category: 'Procedimento',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13 9 11 11 9"/><path d="M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.9 4.9l2.8 2.8"/><path d="M16.3 16.3l2.8 2.8"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.9 19.1l2.8-2.8"/><path d="M16.3 7.7l2.8-2.8"/></svg>,
      component: <LavagemMaos />
    },
    {
      id: 'medidas_antropometricas',
      title: 'Medidas Antropométricas',
      category: 'Avaliação',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/><path d="M7 6v12"/><path d="M17 6v12"/></svg>,
      component: <MedidasAntropometricas />
    },
    {
      id: 'sinais_vitais',
      title: 'Sinais Vitais',
      category: 'Avaliação',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      component: <SinaisVitais />
    }
  ];

  if (selectedChecklistId) {
    const checklist = checklists.find(c => c.id === selectedChecklistId);
    return (
      <div className="animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedChecklistId(null)}
          className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Voltar para Checklists</span>
        </button>

        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-400 text-xs uppercase tracking-widest animate-pulse">Carregando Checklist...</p>
          </div>
        }>
          {checklist?.component}
        </Suspense>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10">
        <h2 className="text-3xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tight italic">Checklists de Exame Físico</h2>
        <p className="text-neutral-500 dark:text-nexus-text-main text-sm mt-2">Estruturas de avaliação para as estações práticas do OSCE MED 2.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklists.map((checklist) => (
          <div 
            key={checklist.id}
            onClick={() => setSelectedChecklistId(checklist.id)}
            className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] cursor-pointer hover:border-rose-400/50 hover:-translate-y-1 transition-all group flex flex-col justify-between h-[220px] shadow-sm relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-2 block">{checklist.category}</span>
              <h3 className="text-2xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter leading-tight">{checklist.title}</h3>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-sec uppercase tracking-widest group-hover:text-neutral-900 dark:group-hover:text-nexus-text-title transition-colors">Ver Checklist →</span>
              <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                {checklist.icon}
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OSCEMed2Checklists;
