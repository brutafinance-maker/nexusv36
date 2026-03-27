
import React, { useState, Suspense, lazy } from 'react';

// Lazy loading components for performance
const PatologiasToracicas = lazy(() => import('./conteudos/PatologiasToracicas'));
const PatologiasPrecordiais = lazy(() => import('./conteudos/PatologiasPrecordiais'));
const PatologiasAbdominais = lazy(() => import('./conteudos/PatologiasAbdominais'));
const SistemaOsteoarticular = lazy(() => import('./conteudos/SistemaOsteoarticular'));
const SuporteBasicoVida = lazy(() => import('./conteudos/SuporteBasicoVida'));
const PatologiasOsteoarticulares = lazy(() => import('./conteudos/PatologiasOsteoarticulares'));

interface Material {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const OSCEMed2Conteudo: React.FC = () => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

  const materials = [
    {
      id: 'toracicas',
      title: 'Patologias Torácicas',
      category: 'Respiratório',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2-2.67 4-4 6-4a4 4 0 1 1 0 8c-2 0-4-1.33-6-4Z"/><path d="M12 12v10"/><path d="M12 12V2"/></svg>,
      component: <PatologiasToracicas />
    },
    {
      id: 'precordiais',
      title: 'Patologias Precordiais',
      category: 'Cardiovascular',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
      component: <PatologiasPrecordiais />
    },
    {
      id: 'abdominais',
      title: 'Patologias Abdominais',
      category: 'Gastrointestinal',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>,
      component: <PatologiasAbdominais />
    },
    {
      id: 'osteoarticular_manual',
      title: 'Sistema Osteoarticular (Manual)',
      category: 'Exame Físico',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H5a3 3 0 0 0 3-3V7a3 3 0 0 1 3-3h2.5"/><path d="M13 14.2V20"/><path d="M16 7a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/><path d="M8.6 18a4.4 4.4 0 0 0 10.8 0"/></svg>,
      component: <SistemaOsteoarticular />
    },
    {
      id: 'sbv',
      title: 'Suporte Básico de Vida',
      category: 'Emergência',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>,
      component: <SuporteBasicoVida />
    },
    {
      id: 'osteoarticulares_pat',
      title: 'Patologias Osteoarticulares',
      category: 'Locomotor',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 9 12 4 9.5 9 4.5 6.5 7 11.5 2 14l5 2.5-2.5 5 5-2.5 2.5 5 2.5-5 5 2.5-2.5-5 5-2.5-5-2.5 2.5-5-5 2.5Z"/></svg>,
      component: <PatologiasOsteoarticulares />
    }
  ];

  if (selectedMaterialId) {
    const material = materials.find(m => m.id === selectedMaterialId);
    return (
      <div className="animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedMaterialId(null)}
          className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Voltar para Conteúdos</span>
        </button>

        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-400 text-xs uppercase tracking-widest animate-pulse">Carregando Material Digital...</p>
          </div>
        }>
          {material?.component}
        </Suspense>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10">
        <h2 className="text-3xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tight italic">Conteúdos Digitais</h2>
        <p className="text-neutral-500 dark:text-nexus-text-main text-sm mt-2">Materiais convertidos de PDF para estudo nativo na plataforma.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div 
            key={material.id}
            onClick={() => setSelectedMaterialId(material.id)}
            className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] cursor-pointer hover:border-rose-400/50 hover:-translate-y-1 transition-all group flex flex-col justify-between h-[220px] shadow-sm relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-2 block">{material.category}</span>
              <h3 className="text-2xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter leading-tight">{material.title}</h3>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-sec uppercase tracking-widest group-hover:text-neutral-900 dark:group-hover:text-nexus-text-title transition-colors">Iniciar Estudo →</span>
              <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                {material.icon}
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

export default OSCEMed2Conteudo;
