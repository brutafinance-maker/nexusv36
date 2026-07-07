import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronDown,
  ChevronUp,
  Brain, 
  BookOpen, 
  Play,
  CheckCircle2,
  Lock,
  AlertCircle
} from 'lucide-react';
import { VideoLesson } from '../types';
import { db, auth } from '../lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface SistemaNervosoViewProps {
  onBack: () => void;
  onLessonSelect: (lesson: VideoLesson, courseName: string, playlist?: VideoLesson[]) => void;
  watchedVideos: string[];
  onAwardPoints?: (id: string, value?: number) => void;
}

interface Lesson {
  id: string;
  title: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  note?: string;
}

const SISTEMA_NERVOSO_MODULES: Module[] = [
  {
    id: 'mod-1',
    title: 'Módulo 1 – Bases do Sistema Nervoso',
    lessons: [
      { id: 'xRlREtoq8GQ', title: 'Tecido Nervoso – O Sistema Nervoso' },
      { id: 'eXa28cAJh_Q', title: 'Tecido Nervoso – Componentes' },
      { id: 'Lumg4V4Gx0o', title: 'Neurônios' },
      { id: 'FgQBGY9RAks', title: 'Células da Neuróglia' }
    ]
  },
  {
    id: 'mod-2',
    title: 'Módulo 2 – Organização Anatômica Geral',
    lessons: [
      { id: 'Yc4w7ZSAXsM', title: 'Anatomia Macroscópica' },
      { id: '-K9i2o5em68', title: 'Anatomia Macroscópica do Encéfalo' },
      { id: 'Q_A1Q6FacFU', title: 'Meninges, Plexo Coroide e Líquor' }
    ]
  },
  {
    id: 'mod-3',
    title: 'Módulo 3 – Medula Espinal',
    lessons: [
      { id: '0RfdN1NT9JM', title: 'Medula Espinal' }
    ]
  },
  {
    id: 'mod-4',
    title: 'Módulo 4 – Tronco Encefálico',
    lessons: [
      { id: '-MLiWHMXFos', title: 'Tronco Encefálico' }
    ]
  },
  {
    id: 'mod-5',
    title: 'Módulo 5 – Cerebelo',
    lessons: [
      { id: '9qYHfgb63lE', title: 'Anatomia do Cerebelo' },
      { id: 'UrTU1AjfFYQ', title: 'Cerebelo e Equilíbrio' }
    ]
  },
  {
    id: 'mod-6',
    title: 'Módulo 6 – Cérebro',
    lessons: [
      { id: '5lxFEk8r2CM', title: 'Cérebro' },
      { id: '8Ie4-7usW54', title: 'Funções Superiores do Sistema Nervoso Central' }
    ]
  },
  {
    id: 'mod-7',
    title: 'Módulo 7 – Vascularização',
    lessons: [
      { id: 'L_sjxO4MuwA', title: 'Vascularização do Encéfalo' }
    ]
  },
  {
    id: 'mod-8',
    title: 'Módulo 8 – Sistema Nervoso Periférico',
    lessons: [
      { id: 'IQm8kF7qdBk', title: 'Sistema Nervoso Periférico' }
    ]
  },
  {
    id: 'mod-9',
    title: 'Módulo 9 – Nervos Cranianos',
    lessons: [
      { id: '5WCHaWV7F1c', title: 'Nervos Cranianos – 1º ao 6º Par' },
      { id: 'a7IxvPvzjhQ', title: 'Nervos Cranianos – 9º ao 12º Par' }
    ],
    note: 'Observação: Temporariamente indisponível as aulas dos nervos cranianos VII (Facial) e VIII (Vestibulococlear).'
  },
  {
    id: 'mod-10',
    title: 'Módulo 10 – Sistemas Funcionais',
    lessons: [
      { id: 'QWK6aGH09dE', title: 'Sistema Somatossensorial' },
      { id: 'vK9WXTXpjPQ', title: 'Sistema Nervoso Autônomo e seu Controle Central' }
    ]
  },
  {
    id: 'mod-11',
    title: 'Módulo 11 – Sistema Visual',
    lessons: [
      { id: 'kiAaixJoW9Q', title: 'Sistema Fotorreceptor – Retina e Estruturas Acessórias' },
      { id: '-Tn2dbfRdgI', title: 'Sistema Fotorreceptor – Camada Externa, Média e Lentes' },
      { id: 'ARoV_hgU2Jg', title: 'Sistema Fotorreceptor e Visão' },
      { id: 'f1xLnBqNTXg', title: 'Sentidos Especiais – Visão' }
    ]
  },
  {
    id: 'mod-12',
    title: 'Módulo 12 – Sistema Auditivo e Vestibular',
    lessons: [
      { id: 'Ef3jv93ED44', title: 'Sistema Audiorreceptor' },
      { id: 'DmqOkFZqFhw', title: 'Sentidos Especiais – Audição' },
      { id: 'P74ZH3LiE-M', title: 'Sentidos Especiais – Vestibular' }
    ]
  },
  {
    id: 'mod-13',
    title: 'Módulo 13 – Olfato e Gustação',
    lessons: [
      { id: '9qii8vKv5S8', title: 'Olfato' },
      { id: 'N2nzlwslNhE', title: 'Sentidos Especiais – Gustação e Olfação' }
    ]
  }
];

const SistemaNervosoView: React.FC<SistemaNervosoViewProps> = ({ onBack, onLessonSelect, watchedVideos, onAwardPoints }) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true // Expand first module by default
  });

  const allLessonsList = useMemo(() => {
    return SISTEMA_NERVOSO_MODULES.flatMap(m => m.lessons);
  }, []);

  const totalWatchedCount = useMemo(() => {
    return allLessonsList.filter(l => watchedVideos.includes(l.id)).length;
  }, [allLessonsList, watchedVideos]);

  const progressPercent = useMemo(() => {
    if (allLessonsList.length === 0) return 0;
    return Math.round((totalWatchedCount / allLessonsList.length) * 100);
  }, [allLessonsList, totalWatchedCount]);

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleToggleWatched = async (e: React.MouseEvent, lessonId: string) => {
    e.stopPropagation();
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    const isCurrentlyWatched = watchedVideos.includes(lessonId);
    try {
      await updateDoc(userRef, {
        watchedLessons: isCurrentlyWatched ? arrayRemove(lessonId) : arrayUnion(lessonId)
      });
      if (!isCurrentlyWatched && onAwardPoints) {
        onAwardPoints(lessonId, 5);
      }
    } catch (err) {
      console.error("Erro ao atualizar o progresso:", err);
    }
  };

  const handlePlayLesson = (lesson: Lesson, moduleTitle: string) => {
    const fullTitle = `${moduleTitle} — ${lesson.title}`;
    const playlist = SISTEMA_NERVOSO_MODULES.flatMap(m => 
      m.lessons.map(l => ({
        id: l.id,
        title: `${m.title} — ${l.title}`
      }))
    );

    onLessonSelect({ id: lesson.id, title: fullTitle }, 'Sistema Nervoso', playlist);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#E5E7EB] animate-in fade-in duration-500 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12">
        
        {/* Header e Navegação */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Sanarflix</span>
                <span className="text-white/20">/</span>
                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.2em]">Sistema Nervoso</span>
              </div>
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3 mt-1">
                <Brain className="text-blue-500" size={32} />
                Sistema Nervoso
              </h2>
            </div>
          </div>

          {/* Progresso Geral */}
          <div className="w-full md:w-64 bg-[#111827] border border-white/5 p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Aulas Concluídas</span>
              <span className="text-xs font-black text-blue-500">{totalWatchedCount} / {allLessonsList.length} ({progressPercent}%)</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Accordions de Módulos */}
        <div className="space-y-4">
          {SISTEMA_NERVOSO_MODULES.map((mod) => {
            const isExpanded = !!expandedModules[mod.id];
            const modWatchedCount = mod.lessons.filter(l => watchedVideos.includes(l.id)).length;
            const modTotal = mod.lessons.length;
            const modProgress = modTotal > 0 ? Math.round((modWatchedCount / modTotal) * 100) : 0;

            return (
              <div 
                key={mod.id}
                className="border border-white/5 bg-[#111827] rounded-[2rem] overflow-hidden transition-all duration-300"
              >
                {/* Cabeçalho do Módulo */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full px-6 py-5 md:px-8 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-wider rounded">Módulo</span>
                      <span className="text-[10px] font-mono text-neutral-500">{modWatchedCount} / {modTotal} concluídas</span>
                    </div>
                    <h3 className="text-base md:text-lg font-black text-white uppercase tracking-tight">{mod.title}</h3>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="text-right hidden sm:block">
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Conclusão</p>
                        <p className="text-xs font-black text-blue-500">{modProgress}%</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-[10px] text-blue-400 border border-white/10">
                        {modProgress}%
                      </div>
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9CA3AF]">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </button>

                {/* Conteúdo Expansível das Aulas */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden bg-[#0F1626]"
                    >
                      <div className="px-6 pb-6 pt-2 md:px-8 border-t border-white/5 space-y-3">
                        
                        {/* Se houver observação para o módulo, renderiza um aviso elegante */}
                        {mod.note && (
                          <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-500 text-xs font-medium mb-3">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <span>{mod.note}</span>
                          </div>
                        )}

                        {mod.lessons.map((lesson) => {
                          const isCompleted = watchedVideos.includes(lesson.id);

                          return (
                            <div 
                              key={lesson.id}
                              className="group/lesson flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all gap-4"
                            >
                              <div className="flex items-center gap-4 flex-grow min-w-0">
                                
                                {/* Checkbox Concluído */}
                                <button 
                                  onClick={(e) => handleToggleWatched(e, lesson.id)}
                                  className="shrink-0 focus:outline-none"
                                  title={isCompleted ? "Marcar como não assistida" : "Marcar como concluída"}
                                >
                                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                                    isCompleted 
                                      ? 'bg-green-500/20 border-green-500 text-green-400' 
                                      : 'border-white/20 group-hover/lesson:border-blue-500/50 text-transparent'
                                  }`}>
                                    <CheckCircle2 size={14} className={isCompleted ? 'opacity-100' : 'group-hover/lesson:opacity-30 group-hover/lesson:text-blue-500'} />
                                  </div>
                                </button>

                                <div className="min-w-0">
                                  <h4 className={`text-sm font-bold truncate leading-snug transition-colors ${
                                    isCompleted ? 'text-white/60 line-through' : 'text-white group-hover/lesson:text-blue-400'
                                  }`}>
                                    {lesson.title}
                                  </h4>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                {/* Botão Assistir */}
                                <button
                                  onClick={() => handlePlayLesson(lesson, mod.title)}
                                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                    isCompleted 
                                      ? 'bg-white/5 hover:bg-white/10 text-white' 
                                      : 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/10'
                                  }`}
                                >
                                  <Play size={10} fill="currentColor" /> Assistir
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SistemaNervosoView;
