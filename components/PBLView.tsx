
import React, { useState, useEffect, useMemo } from 'react';
import { UserStats, ActivityItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { CheckCircle2, Circle, TrendingUp, Flag, Map as MapIcon, ChevronRight, Trophy, BookOpen, AlertCircle, Play } from 'lucide-react';

interface SummaryProblem {
  numero: string;
  titulo: string;
  conteudo: Record<string, any>;
  pdfUrl?: string; 
  isPremium?: boolean;
}

interface ModuleSummaryItem {
  id: string;
  title: string;
  url: string;
}

const GLOBAL_SUMMARIES: Record<number, SummaryProblem[]> = {
  7: [
    {
      numero: "1", 
      titulo: "Aspectos Anatômicos e Histológicos do Aparelho Reprodutor Masculino e Feminino",
      pdfUrl: "https://drive.google.com/file/d/1xMwHuLSTsFT2Rh0ZmQaNZ_qqT_XBS7aR/preview", 
      isPremium: true,
      conteudo: {
        "Aviso": "Este conteúdo é exclusivo para assinantes Premium. Por favor, utilize o visualizador de PDF para acessar o material completo."
      }
    },
    {
      numero: "2", 
      titulo: "Apostila de Fisiologia Reprodutiva",
      pdfUrl: "https://drive.google.com/file/d/1TKn87giS22q1dIAuWwC3d2hWsCPspETk/preview",
      isPremium: true,
      conteudo: {
        "Aviso": "Este conteúdo é exclusivo para assinantes Premium. Por favor, utilize o visualizador de PDF para acessar o material completo."
      }
    },
    { 
      numero: "3", 
      titulo: "Eixo Hipotálamo-Hipófise-Gônadas no Controle da Espermatogênese e Ovogênese", 
      pdfUrl: "https://drive.google.com/file/d/1dH1ja-cFpWuj-Ol80mDMLZ4UFe7_9hYr/preview",
      isPremium: true,
      conteudo: {
        "Aviso": "Este conteúdo é exclusivo para assinantes Premium. Por favor, utilize o visualizador de PDF para acessar o material completo."
      }
    },
    { 
      numero: "4", 
      titulo: "Testosterona, Estrogênio e Progesterona", 
      pdfUrl: "https://drive.google.com/file/d/13kqZjhPjiIFDTnLV2FsbCj74SL_eASw3/preview",
      isPremium: true,
      conteudo: {
        "Aviso": "Este conteúdo é exclusivo para assinantes Premium. Por favor, utilize o visualizador de PDF para acessar o material completo."
      }
    },
    { 
      numero: "5", 
      titulo: "Ciclo Menstrual: Fases, Flutuações Hormonais e Preparação Endometrial", 
      pdfUrl: "https://drive.google.com/file/d/18n5F8L1nfm5uU5tGEDi2qoQKuoGsrr_u/preview",
      isPremium: true,
      conteudo: {
        "Aviso": "Este conteúdo é exclusivo para assinantes Premium. Por favor, utilize o visualizador de PDF para acessar o material completo."
      }
    },
    { 
      numero: "6", 
      titulo: "Fecundação e Fertilização: Conceituação, Caracterização e Diferenciação dos Processos", 
      pdfUrl: "https://drive.google.com/file/d/1tKO-LoqOaD2AFDwUzve2mpPEUOdX6l44/preview",
      isPremium: true,
      conteudo: {
        "Aviso": "Este conteúdo é exclusivo para assinantes Premium. Por favor, utilize o visualizador de PDF para acessar o material completo."
      }
    },
    { 
      numero: "7", 
      titulo: "Transformações no Corpo da Mulher Durante a Concepção", 
      pdfUrl: "https://drive.google.com/file/d/19gLUbmOg2K6dV7WXWAD3_MpcXEmsb0cc/preview",
      isPremium: true,
      conteudo: {
        "Aviso": "Este conteúdo é exclusivo para assinantes Premium. Por favor, utilize o visualizador de PDF para acessar o material completo."
      }
    },
    { 
      numero: "8", 
      titulo: "Métodos de Diagnóstico de Gravidez", 
      pdfUrl: "https://drive.google.com/file/d/1VXvskD_POFinT60xKS4JqRU_6G4R3WbF/preview",
      isPremium: true,
      conteudo: {
        "Aviso": "Este conteúdo é exclusivo para assinantes Premium. Por favor, utilize o visualizador de PDF para acessar o material completo."
      }
    }
  ],
};

const MODULE_SUMMARIES_GALLERY: Record<number, ModuleSummaryItem[]> = {
  7: [
    {
      id: "m7_resumo_p6",
      title: "Resumo do módulo 7",
      url: "https://drive.google.com/file/d/1InoOMXuLKm3-ofq_3K35akrmjYxdZq_g/preview"
    }
  ]
};

interface PBLViewProps {
  userDisplayName?: string;
  userStats: UserStats;
  onNavigateToPremium?: () => void;
  onIncrementUsage?: (contentId: string) => void;
  onAddActivity: (item: any) => void;
  onAwardPoints?: (id: string, value?: number) => void;
  onSyncPoints?: () => void;
}

const PBLView: React.FC<PBLViewProps> = ({ userDisplayName, userStats, onNavigateToPremium, onIncrementUsage, onAddActivity, onAwardPoints, onSyncPoints }) => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'conteudos' | 'resumos'>('info');
  const [selectedProblemNum, setSelectedProblemNum] = useState<string | null>(null);
  const [activeModuleSummary, setActiveModuleSummary] = useState<ModuleSummaryItem | null>(null);
  const [viewMode, setViewMode] = useState<'text' | 'pdf'>('text');
  const [isDownloading, setIsDownloading] = useState(false);

  const isPremiumUser = userStats.isPremium || userStats.plan === 'premium';
  
  const isOverLimit = (id: string) => {
    if (isPremiumUser) return false;
    if (userStats.openedContentIds?.includes(id)) return false;
    return (userStats.openedContentIds?.length || 0) >= 10;
  };

  const handleToggleModule = async (e: React.MouseEvent, moduleId: number) => {
    e.stopPropagation();
    if (!userStats.uid) return;

    const moduleKey = `ase_${moduleId}`;
    const userDocRef = doc(db, 'users', userStats.uid);
    const isCompleted = userStats.completedPblModules?.includes(moduleKey);

    try {
      if (isCompleted) {
        await updateDoc(userDocRef, {
          completedPblModules: arrayRemove(moduleKey)
        });
      } else {
        await updateDoc(userDocRef, {
          completedPblModules: arrayUnion(moduleKey)
        });
      }
      // Re-sync points based on new completedPblModules
      setTimeout(() => {
        onSyncPoints?.();
      }, 500); 
    } catch (err) {
      console.error("Erro ao atualizar progresso:", err);
    }
  };

  const allModules = useMemo(() => {
    const basicoTitles = [
      'Introdução ao Estudo da Medicina',
      'Proliferação e Crescimento Celular',
      'Funções Biológicas 1',
      'Funções Biológicas 2',
      'Metabolismo e Nutrição',
      'Mecanismo de Agressão e Defesa',
      'Concepção e Gestação',
      'Nascimento e Desenvolvimento',
      'Vida Adulta e Envelhecimento',
      'Percepção e Emoções',
      'Febre e Infecção',
      'Fadiga e Anemias'
    ];
    
    const clinicoTitles = [
      'Disúria e Edema',
      'Perda de Sangue',
      'Mente e Comportamento',
      'Cardiologia e Pneumologia',
      'Gastroenterologia',
      'Endocrinologia',
      'Infectologia Clínica',
      'Ginecologia e Obstetrícia',
      'Pediatria Clínica',
      'Cirurgia e Urgência',
      'Medicina da Família',
      'Ética e Propedêutica Avançada'
    ];

    const meds = [];
    for (let i = 1; i <= 8; i++) {
      const titles = i <= 4 ? basicoTitles : clinicoTitles;
      const startIdx = (i <= 4 ? (i - 1) * 3 : (i - 5) * 3);
      
      meds.push({
        name: `MED ${i}`,
        modules: [
          { id: (i - 1) * 3 + 1, title: `ASE ${(i - 1) * 3 + 1} — ${titles[startIdx]}` },
          { id: (i - 1) * 3 + 2, title: `ASE ${(i - 1) * 3 + 2} — ${titles[startIdx + 1]}` },
          { id: (i - 1) * 3 + 3, title: `ASE ${(i - 1) * 3 + 3} — ${titles[startIdx + 2]}` }
        ]
      });
    }
    return meds;
  }, []);

  const totalModulesCount = 24;
  const completedCount = userStats.completedPblModules?.length || 0;
  const progressPercent = Math.round((completedCount / totalModulesCount) * 100);

  const getPhrase = (progress: number) => {
    if (progress === 0) return "Sua jornada começa agora! Já revisou algo hoje?";
    if (progress < 15) return "O básico está ganhando forma. Continue focado!";
    if (progress < 30) return "Quase completando o Ciclo Básico inicial. Orgulho!";
    if (progress < 50) return "O Ciclo Clínico está no horizonte. Falta pouco!";
    if (progress < 65) return "Você já dominou o Básico! O hospital te espera.";
    if (progress < 80) return "Clínica a todo vapor! Você está se tornando um mestre.";
    if (progress < 95) return "Falta muito pouco! O Internato já está logo ali.";
    if (progress === 100) return "CRM na mão? Trilha 100% concluída! Sucesso absoluto.";
    return "Mandando muito bem! A medicina é para os fortes.";
  };

  // Auto-scroll para o primeiro não concluído
  useEffect(() => {
    if (!selectedModule) {
      setTimeout(() => {
        const firstUncompletedId = allModules
          .flatMap(med => med.modules)
          .find(mod => !userStats.completedPblModules?.includes(`ase_${mod.id}`))?.id;

        if (firstUncompletedId) {
          const element = document.getElementById(`module-card-${firstUncompletedId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 500);
    }
  }, [selectedModule]);

  const handleSelectProblem = (num: string) => {
    const summaries = GLOBAL_SUMMARIES[selectedModule!] || [];
    const prob = summaries.find(s => s.numero === num);
    
    if (prob?.isPremium && !isPremiumUser) {
      onNavigateToPremium();
      return;
    }

    const contentId = `pbl_${selectedModule}_${num}`;
    if (isOverLimit(contentId)) return;
    
    setSelectedProblemNum(num);
    
    if (prob) {
      onAddActivity({
        id: `pbl_${selectedModule}_${num}`,
        type: 'apostila',
        title: prob.titulo,
        subtitle: `ASE ${selectedModule} • Conteúdo ${num}`,
        metadata: { moduleId: selectedModule, problemNum: num }
      });
      onIncrementUsage(contentId);
      onAwardPoints?.(`pbl_${selectedModule}_${num}`, 5);
    }
  };

  const handleOpenModuleSummary = (item: ModuleSummaryItem) => {
    if (isOverLimit(item.id)) return;
    
    setActiveModuleSummary(item);
    onAddActivity({
        id: item.id,
        type: 'apostila',
        title: item.title,
        subtitle: `ASE ${selectedModule} • Resumo`,
        metadata: { moduleId: selectedModule, isModuleSummary: true, url: item.url }
    });
    onIncrementUsage(item.id);
    onAwardPoints?.(item.id, 5);
  };

  const handleTabChange = (tab: 'info' | 'conteudos' | 'resumos') => {
    setActiveTab(tab);
    if (tab !== 'resumos') setActiveModuleSummary(null);
  };

  const handleModuleClick = (id: number) => {
    setSelectedModule(id);
    setActiveTab('info');
    setSelectedProblemNum(null);
    setActiveModuleSummary(null);
  };

  const handleDownloadApostila = async (pdfUrl: string, titulo: string) => {
    const downloadId = `download_${selectedModule}_${selectedProblemNum}`;
    if (isOverLimit(downloadId)) return;
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const { PDFDocument, rgb, degrees, StandardFonts } = (window as any).PDFLib;
      const flattenedModules = allModules.flatMap(m => m.modules);
      const currentModuleObj = flattenedModules.find(m => m.id === selectedModule);
      const moduleName = currentModuleObj?.title || "NexusBQ";
      const userName = userDisplayName || "Estudante NexusBQ";
      
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const watermarkText = `NEXUSBQ - ${userName.toUpperCase()} - ${moduleName}`;
      
      page.drawText(watermarkText, {
        x: 50, y: 100, size: 30, font: font, color: rgb(0.5, 0.5, 0.5), opacity: 0.1, rotate: degrees(45),
      });

      page.drawText(titulo, {
        x: 50, y: 750, size: 20, font: font, color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `NexusBQ_${titulo.replace(/\s+/g, '_')}.pdf`;
      link.click();
      onIncrementUsage(downloadId);
      onAwardPoints?.(downloadId, 5);
    } catch (err) {
      console.error("Erro no download:", err);
      alert("Erro ao processar download.");
    } finally {
      setIsDownloading(false);
    }
  };

  const renderRecursiveContent = (content: any): React.ReactNode => {
    if (typeof content === 'string') {
      return <p className="text-neutral-700 dark:text-nexus-text-main text-sm leading-[1.8] font-light text-justify mb-6">{content}</p>;
    }
    if (content && typeof content === 'object') {
      return (
        <div className="space-y-6 md:space-y-8">
          {Object.entries(content).map(([label, sub]: [string, any], i) => (
            <div key={i} className="space-y-2 md:space-y-3">
              <h5 className="text-[9px] md:text-[11px] font-black text-nexus-purple uppercase tracking-[0.2em] flex items-center gap-2 md:gap-3">
                 <div className="w-1.5 h-1.5 bg-nexus-purple rounded-full shrink-0"></div> {label}
              </h5>
              <div className="pl-4 md:pl-6 border-l border-neutral-200 dark:border-nexus-border">{renderRecursiveContent(sub)}</div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (selectedModule) {
    const flattenedModules = allModules.flatMap(m => m.modules);
    const currentModule = flattenedModules.find(m => m.id === selectedModule);
    const summaries = GLOBAL_SUMMARIES[selectedModule] || [];
    const moduleSummaryGallery = MODULE_SUMMARIES_GALLERY[selectedModule] || [];

    const currentProblemId = `pbl_${selectedModule}_${selectedProblemNum}`;
    const showOverLimitBanner = (isOverLimit(currentProblemId) && activeTab === 'conteudos' && selectedProblemNum) || 
                               (activeModuleSummary && isOverLimit(activeModuleSummary.id) && activeTab === 'resumos');

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-[1800px] mx-auto px-0 md:px-4 relative">
        {showOverLimitBanner && (
          <div className="absolute inset-0 z-40 bg-neutral-900/90 dark:bg-nexus-bg/90 backdrop-blur-md flex items-center justify-center p-6 text-center rounded-[2rem]">
            <div className="max-w-md">
              <div className="w-16 h-16 bg-sky-600/20 rounded-full flex items-center justify-center text-sky-600 dark:text-nexus-blue mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className="text-2xl font-black text-neutral-900 dark:text-nexus-text-title mb-4">Limite Atingido</h3>
              <p className="text-neutral-500 dark:text-nexus-text-main mb-8 text-sm leading-relaxed">
                Você atingiu o limite de <span className="font-bold">10 conteúdos</span> do plano básico. Este limite não renova.
              </p>
              <button onClick={onNavigateToPremium} className="w-full bg-sky-600 hover:bg-sky-500 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-sky-600/20 uppercase tracking-widest text-xs">Conhecer Plano Premium</button>
            </div>
          </div>
        )}

        <button onClick={() => { setSelectedModule(null); setSelectedProblemNum(null); setActiveModuleSummary(null); }} className="mb-6 md:mb-8 flex items-center gap-2 text-neutral-500 dark:text-nexus-text-sec hover:text-neutral-900 dark:hover:text-white transition-colors px-4 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Voltar para Grade</span>
        </button>

        <header className="mb-8 md:mb-10 flex items-center gap-3 md:gap-4 px-4">
          <span className={`bg-nexus-purple text-white text-[9px] md:text-[11px] font-black px-2 md:px-3 py-1.5 rounded-lg shadow-sm shrink-0`}>ASE {currentModule?.id}</span>
          <h1 className="text-xl md:text-3xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter">{currentModule?.title}</h1>
        </header>

        <div className="flex gap-1 md:gap-2 bg-white dark:bg-nexus-surface p-1 rounded-2xl mb-8 md:mb-12 w-fit border border-neutral-200 dark:border-nexus-border mx-4 overflow-x-auto no-scrollbar">
          <button onClick={() => handleTabChange('info')} className={`px-4 md:px-8 py-2 md:py-3 rounded-xl text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'info' ? 'bg-neutral-100 dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border text-neutral-900 dark:text-nexus-text-title shadow-sm' : 'text-neutral-500 dark:text-nexus-text-sec hover:text-neutral-900 dark:hover:text-white'}`}>Sobre</button>
          <button onClick={() => handleTabChange('conteudos')} className={`px-4 md:px-8 py-2 md:py-3 rounded-xl text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'conteudos' ? `bg-nexus-purple text-white shadow-md` : 'text-neutral-500 dark:text-nexus-text-sec hover:text-neutral-900 dark:hover:text-white'}`}>Conteúdos</button>
          <button onClick={() => handleTabChange('resumos')} className={`px-4 md:px-8 py-2 md:py-3 rounded-xl text-[10px] md:text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'resumos' ? 'bg-sky-600 dark:bg-white text-white dark:text-black shadow-md' : 'text-neutral-500 dark:text-nexus-text-sec hover:text-neutral-900 dark:hover:text-white'}`}>
            Resumos
            {!isPremiumUser && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
          </button>
        </div>

        {activeTab === 'info' && (
          <div className="bg-white dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] mx-4 shadow-sm">
            <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-nexus-text-title mb-6 italic">Visão do Módulo</h3>
            <p className="text-neutral-600 dark:text-nexus-text-main text-base md:text-lg font-light leading-relaxed mb-8">
              Módulo integrante da grade curricular do curso de Medicina no método PBL. Focado na integração de competências clínicas e científicas.
            </p>
          </div>
        )}

        {activeTab === 'resumos' && (
          <div className="animate-in fade-in duration-500 px-4">
            {!isPremiumUser ? (
              <div className="bg-white dark:bg-nexus-surface border border-sky-600/20 dark:border-nexus-blue/20 p-12 md:p-20 rounded-[2.5rem] md:rounded-[3.5rem] text-center border-dashed shadow-sm">
                 <div className="w-16 h-16 md:w-20 md:h-20 bg-sky-600/10 dark:bg-nexus-blue/10 rounded-full flex items-center justify-center text-sky-600 dark:text-nexus-blue mx-auto mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                 </div>
                 <h4 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-nexus-text-title mb-4 tracking-tight">Resumos Exclusivos Premium</h4>
                 <p className="text-neutral-500 dark:text-nexus-text-main text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10">
                   Acesse resumos completos indexados, revisados e formatados para iPad/Desktop. Este recurso é exclusivo para assinantes Premium.
                 </p>
                 <button onClick={onNavigateToPremium} className="bg-sky-600 hover:bg-sky-500 text-white font-black px-10 py-4 rounded-2xl text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-md transition-all active:scale-95">
                   Quero ser Premium
                 </button>
              </div>
            ) : (
              activeModuleSummary ? (
                <div className="flex flex-col gap-4 md:gap-6 animate-in zoom-in duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-nexus-surface p-5 md:p-6 rounded-2xl md:rounded-3xl border border-neutral-200 dark:border-nexus-border gap-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setActiveModuleSummary(null)} className="w-10 h-10 bg-neutral-100 dark:bg-nexus-card hover:bg-neutral-200 dark:hover:bg-nexus-hover border border-neutral-200 dark:border-nexus-border rounded-xl flex items-center justify-center text-neutral-600 dark:text-nexus-text-sec transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <div>
                        <h4 className="text-sm md:text-base text-neutral-900 dark:text-nexus-text-title font-bold">{activeModuleSummary.title}</h4>
                        <p className="text-neutral-500 dark:text-nexus-text-label text-[10px] uppercase tracking-widest">Visualizador Interno NexusBQ</p>
                      </div>
                    </div>
                    <a 
                      href={activeModuleSummary.url.replace('/preview', '/view')} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      Baixar no Drive
                    </a>
                  </div>
                  <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-md relative h-[600px] md:h-[900px] border border-neutral-200 dark:border-nexus-border">
                    <iframe src={activeModuleSummary.url} className="w-full h-full border-none" title={activeModuleSummary.title}></iframe>
                  </div>
                </div>
              ) : (
                moduleSummaryGallery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {moduleSummaryGallery.map((item) => (
                      <div key={item.id} className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2rem] hover:border-nexus-purple/50 transition-all group flex flex-col justify-between h-64 shadow-sm hover:-translate-y-1">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-nexus-purple/10 rounded-2xl flex items-center justify-center text-nexus-purple group-hover:bg-nexus-purple group-hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                          </div>
                          <span className="text-[9px] font-black text-neutral-500 dark:text-nexus-text-label uppercase tracking-widest bg-neutral-50 dark:bg-nexus-surface px-2 py-1 rounded">Módulo {selectedModule}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-neutral-900 dark:text-nexus-text-title mb-6 tracking-tight leading-tight">{item.title}</h4>
                          <button 
                            onClick={() => handleOpenModuleSummary(item)}
                            className="w-full bg-neutral-100 dark:bg-white text-neutral-900 dark:text-black py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-nexus-purple hover:text-white transition-all shadow-sm"
                          >
                            Visualizar Resumo
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 md:py-40 text-center border-2 border-dashed border-neutral-200 dark:border-nexus-border rounded-[2rem] md:rounded-[3rem] text-neutral-500 dark:text-nexus-text-sec bg-white dark:bg-nexus-surface shadow-sm">
                    <h4 className="text-neutral-900 dark:text-nexus-text-main font-bold mb-1">Nenhum resumo disponível</h4>
                    <p className="text-xs">Os resumos para este módulo estão sendo organizados.</p>
                  </div>
                )
              )
            )}
          </div>
        )}

        {activeTab === 'conteudos' && (
          <div className="px-4 pb-20">
            {!selectedProblemNum ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black text-neutral-500 dark:text-nexus-text-label uppercase tracking-[0.3em]">Biblioteca de Conteúdos</h3>
                  <span className="text-[10px] font-bold text-nexus-purple bg-nexus-purple/10 px-3 py-1 rounded-full">{summaries.length} Itens Disponíveis</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {summaries.map((p, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleSelectProblem(p.numero)}
                      className="group relative bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-6 md:p-8 rounded-[2rem] cursor-pointer hover:border-nexus-purple/50 hover:shadow-xl hover:shadow-nexus-purple/5 transition-all hover:-translate-y-1 flex flex-col justify-between h-64 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-nexus-surface rounded-2xl flex items-center justify-center text-neutral-400 group-hover:bg-nexus-purple group-hover:text-white transition-all shadow-inner">
                          <span className="text-sm font-black">{p.numero}</span>
                        </div>
                        {p.isPremium && (
                          <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-lg md:text-xl font-black text-neutral-900 dark:text-nexus-text-title mb-4 tracking-tight leading-tight group-hover:text-nexus-purple transition-colors line-clamp-3">
                          {p.titulo}
                        </h4>
                        <div className="flex items-center gap-2 text-[9px] font-black text-neutral-400 uppercase tracking-widest group-hover:text-nexus-purple transition-colors">
                          Acessar Conteúdo 
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              (() => {
                const prob = summaries.find(s => s.numero === selectedProblemNum);
                if (!prob) return null;
                return (
                  <div className="animate-in fade-in zoom-in-95 duration-500 max-w-[1400px] mx-auto">
                    {/* Header de Leitura */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 bg-white dark:bg-nexus-surface p-6 md:p-8 rounded-[2rem] border border-neutral-200 dark:border-nexus-border shadow-sm">
                      <div className="flex items-center gap-4 md:gap-6">
                        <button 
                          onClick={() => setSelectedProblemNum(null)} 
                          className="w-12 h-12 bg-neutral-100 dark:bg-nexus-card hover:bg-neutral-200 dark:hover:bg-nexus-hover border border-neutral-200 dark:border-nexus-border rounded-2xl flex items-center justify-center text-neutral-600 dark:text-nexus-text-sec transition-all group"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <div>
                          <p className="text-[10px] font-black text-nexus-purple uppercase tracking-[0.3em] mb-1">Conteúdo {prob.numero}</p>
                          <h2 className="text-xl md:text-3xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter leading-tight">{prob.titulo}</h2>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto">
                        {prob.pdfUrl && (
                          <>
                            <div className="flex bg-neutral-100 dark:bg-nexus-card p-1 rounded-xl border border-neutral-200 dark:border-nexus-border shadow-inner flex-grow md:flex-grow-0">
                              <button 
                                onClick={() => setViewMode('text')} 
                                className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'text' ? 'bg-white dark:bg-nexus-surface text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                              >
                                Texto
                              </button>
                              <button 
                                onClick={() => setViewMode('pdf')} 
                                className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${viewMode === 'pdf' ? 'bg-nexus-purple text-white shadow-md' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                PDF
                              </button>
                            </div>
                            <button 
                              onClick={() => prob.pdfUrl && handleDownloadApostila(prob.pdfUrl, prob.titulo)}
                              disabled={isDownloading}
                              className="bg-nexus-green hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/10 disabled:opacity-50 flex items-center gap-2"
                            >
                              {isDownloading ? "..." : <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Baixar</>}
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Área de Leitura Focada */}
                    <div className="relative">
                      {viewMode === 'text' ? (
                        <div className="bg-white dark:bg-nexus-surface p-8 md:p-16 lg:p-24 rounded-[2.5rem] md:rounded-[4rem] border border-neutral-200 dark:border-nexus-border shadow-xl shadow-neutral-200/20 dark:shadow-none">
                          <div className="max-w-[900px] mx-auto">
                            {renderRecursiveContent(prob.conteudo)}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative h-[700px] md:h-[1000px] border border-neutral-200 dark:border-nexus-border">
                           <iframe src={prob.pdfUrl} className="w-full h-full border-none" title="PDF Viewer"></iframe>
                        </div>
                      )}
                    </div>
                    
                    {/* Navegação Inferior */}
                    <div className="mt-12 flex justify-center">
                      <button 
                        onClick={() => setSelectedProblemNum(null)}
                        className="flex items-center gap-3 text-neutral-500 dark:text-nexus-text-sec hover:text-nexus-purple transition-all font-black text-[10px] uppercase tracking-[0.3em] group"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                        Voltar para Biblioteca
                      </button>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-32">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Lado Esquerdo: Trilha */}
        <div className="flex-grow">
          <header className="mb-8 pt-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-black text-med-text dark:text-nexus-text-title tracking-tight italic"
            >
              Trilha <span className="text-med-primary dark:text-nexus-blue">PBL</span>
            </motion.h2>
            <p className="text-med-sec dark:text-nexus-text-sec text-sm mt-1 font-medium">
              O mapa da sua formação médica em módulos ASE.
            </p>
          </header>

          <div className="relative space-y-12">
            <div className="absolute left-[31px] md:left-[32px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-med-primary/20 via-med-primary/5 to-transparent -translate-x-1/2"></div>

            {allModules.map((med, medIdx) => (
              <section key={medIdx} className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-med-text dark:bg-nexus-text-title text-med-card dark:text-nexus-bg rounded-lg flex items-center justify-center font-black text-sm shadow-md">
                    {medIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-med-text dark:text-nexus-text-title tracking-tight">{med.name}</h3>
                    <p className="text-[8px] font-black text-med-sec uppercase tracking-[0.2em]">
                      {medIdx < 4 ? 'Ciclo Básico' : 'Ciclo Clínico'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {med.modules.map((module) => {
                    const isCompleted = userStats.completedPblModules?.includes(`ase_${module.id}`);
                    return (
                      <motion.div 
                        key={module.id}
                        id={`module-card-${module.id}`}
                        whileHover={{ y: -2 }}
                        onClick={() => handleModuleClick(module.id)}
                        className={`relative p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between h-40 shadow-sm overflow-hidden ${
                          isCompleted 
                            ? 'bg-med-primary/5 dark:bg-sky-500/5 border-med-primary/20 dark:border-nexus-blue/20' 
                            : 'bg-white dark:bg-nexus-surface border-med-border dark:border-nexus-border hover:border-med-primary/50 dark:hover:border-nexus-blue/50'
                        }`}
                      >
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                          <MapIcon className="w-20 h-20" />
                        </div>

                        <div className="flex justify-between items-start relative z-10">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[9px] ${
                            isCompleted ? 'bg-med-primary text-white' : 'bg-neutral-50 dark:bg-nexus-card text-med-sec'
                          }`}>
                            {module.id}
                          </div>
                          <button 
                            onClick={(e) => handleToggleModule(e, module.id)}
                            className={`p-1 rounded-lg transition-all ${
                              isCompleted ? 'text-med-primary dark:text-nexus-blue' : 'text-neutral-300 dark:text-nexus-border hover:text-med-primary'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-5 h-5 fill-current" /> : <Circle className="w-5 h-5" />}
                          </button>
                        </div>

                        <div className="relative z-10">
                          <h4 className={`text-sm font-black tracking-tight leading-snug mb-2 line-clamp-2 ${
                            isCompleted ? 'text-med-primary dark:text-nexus-blue' : 'text-med-text dark:text-nexus-text-title'
                          }`}>
                            {module.title}
                          </h4>
                          
                          <div className="flex items-center justify-between">
                            <span className={`text-[8px] font-bold uppercase tracking-widest ${
                              isCompleted ? 'text-med-primary/60 dark:text-nexus-blue/60' : 'text-med-sec'
                            }`}>
                              {isCompleted ? 'Concluído' : 'Acessar →'}
                            </span>
                            {isCompleted && (
                              <div className="flex items-center gap-1 text-[8px] font-black text-med-primary dark:text-nexus-blue uppercase tracking-widest">
                                +50 PTS <Trophy className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}

            <section className="relative z-10 flex flex-col items-center py-8">
              <div className="w-12 h-12 bg-med-primary dark:bg-nexus-blue rounded-full flex items-center justify-center text-white shadow-xl shadow-med-primary/40 mb-3">
                <Flag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-med-text dark:text-nexus-text-title tracking-tight">Internato</h3>
            </section>
          </div>
        </div>

        {/* Floating Sidebar */}
        <div className="lg:w-[280px] shrink-0">
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Progresso Card Slim */}
            <div className="bg-white dark:bg-nexus-surface border border-med-border dark:border-nexus-border p-5 rounded-[1.5rem] shadow-xl shadow-black/5">
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[9px] font-black text-med-sec uppercase tracking-widest">Sua Jornada</span>
                <span className="text-xs font-black text-med-primary dark:text-nexus-blue">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 dark:bg-nexus-bg rounded-full overflow-hidden mb-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-med-primary dark:bg-nexus-blue"
                />
              </div>
              <div className="flex justify-between items-center text-[8px] font-bold text-med-sec uppercase tracking-wider">
                <span>{completedCount} módulos</span>
                <span>Faltam {totalModulesCount - completedCount}</span>
              </div>
            </div>

            {/* Frase Motivacional Floating */}
            <motion.div 
              key={progressPercent}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-med-text dark:bg-nexus-card p-5 rounded-[1.5rem] relative overflow-hidden shadow-xl"
            >
              <div className="absolute -right-2 -bottom-2 opacity-10 text-white/20">
                <Trophy className="w-12 h-12" />
              </div>
              <p className="text-white dark:text-nexus-text-title font-bold italic text-xs relative z-10 leading-relaxed">
                "{getPhrase(progressPercent)}"
              </p>
            </motion.div>

            {/* Quick Status */}
            <div className="bg-white dark:bg-nexus-surface border border-neutral-100 dark:border-nexus-border p-4 rounded-[1.5rem] hidden lg:block">
              <h4 className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-3">Status da Grade</h4>
              <div className="grid grid-cols-6 gap-1.5">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-md flex items-center justify-center text-[7px] font-black transition-colors ${
                      userStats.completedPblModules?.includes(`ase_${i + 1}`)
                        ? 'bg-med-primary text-white'
                        : 'bg-neutral-50 dark:bg-nexus-bg text-neutral-300 dark:text-slate-600'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PBLView;
