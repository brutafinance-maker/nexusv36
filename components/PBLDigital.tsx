
import React, { useMemo, useState } from 'react';
import { UserStats } from '../types';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, GraduationCap, ChevronLeft } from 'lucide-react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { generatePBLModules } from '../lib/pblData';
import PBLModuleEditor from './PBLModuleEditor';

interface PBLDigitalProps {
  userStats: UserStats;
  onSyncPoints?: () => void;
  onClose?: () => void;
}

const PBLDigital: React.FC<PBLDigitalProps> = ({ userStats, onSyncPoints, onClose }) => {
  const [selectedModule, setSelectedModule] = useState<{ id: number, title: string } | null>(null);
  const allModules = useMemo(() => generatePBLModules(), []);
  
  const completedModules = userStats.completedPblModules || [];

  const handleToggleModule = async (moduleId: number) => {
    if (!userStats.uid) return;

    const moduleKey = `ase_${moduleId}`;
    const userDocRef = doc(db, 'users', userStats.uid);
    const isCompleted = completedModules.includes(moduleKey);

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
      if (onSyncPoints) {
        setTimeout(onSyncPoints, 500);
      }
    } catch (err) {
      console.error("Erro ao atualizar progresso PBL Digital:", err);
    }
  };

  if (selectedModule) {
    return (
      <PBLModuleEditor 
        userStats={userStats} 
        module={selectedModule} 
        onClose={() => setSelectedModule(null)} 
      />
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors md:hidden"
             >
                <ChevronLeft className="w-6 h-6 text-slate-500" />
             </button>
             <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic">PBL <span className="text-purple-500">DIGITAL</span></h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Controle de Módulos ASE — Ciclo Básico & Clínico</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-[2rem] shadow-sm flex items-center gap-12">
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Módulos</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white italic">{completedModules.length}<span className="text-slate-300 dark:text-slate-700 mx-1">/</span>24</p>
           </div>
           <div className="h-10 w-px bg-slate-100 dark:bg-slate-800" />
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Status</p>
              <p className="text-base font-black text-purple-500 italic uppercase">
                {completedModules.length === 24 ? "Finalizado" : "Em Progresso"}
              </p>
           </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 relative">
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(completedModules.length / 24) * 100}%` }}
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 relative"
          >
             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
          </motion.div>
        </div>
        <div className="absolute -top-6 left-0 right-0 flex justify-between px-2">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Início do Ciclo</span>
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Conclusão Total</span>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {allModules.map((med, medIdx) => (
          <div key={medIdx} className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-500">
                  {medIdx + 1}
               </div>
               <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest italic">{med.name}</h3>
            </div>
            
            <div className="space-y-3">
              {med.modules.map((module) => {
                const isCompleted = completedModules.includes(`ase_${module.id}`);
                const titleParts = module.title.split(' — ');
                const aseCount = titleParts[0];
                const realTitle = titleParts[1];

                return (
                  <motion.button
                    key={module.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('.status-btn')) {
                        handleToggleModule(module.id);
                      } else {
                        setSelectedModule(module);
                      }
                    }}
                    className={`w-full group relative flex items-center gap-4 p-4 rounded-3xl border-2 transition-all text-left ${
                      isCompleted 
                        ? 'bg-white dark:bg-slate-900 border-purple-500 shadow-lg shadow-purple-500/10' 
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center font-black text-xs transition-colors ${
                      isCompleted ? 'bg-purple-500 text-white shadow-xl shadow-purple-500/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'
                    }`}>
                      {module.id}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <p className={`text-[9px] font-black uppercase tracking-wider mb-0.5 ${
                        isCompleted ? 'text-purple-400' : 'text-slate-400'
                      }`}>
                        {aseCount}
                      </p>
                      <h4 className={`text-xs font-bold truncate leading-tight ${
                        isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {realTitle}
                      </h4>
                    </div>

                    <div className="shrink-0 status-btn">
                      {isCompleted ? (
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white scale-110">
                          <CheckCircle2 size={16} />
                        </div>
                      ) : (
                        <Circle className="w-6 h-6 text-slate-200 dark:text-slate-800 group-hover:text-purple-300" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PBLDigital;
