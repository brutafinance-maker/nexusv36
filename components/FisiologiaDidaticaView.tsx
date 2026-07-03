import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Brain, 
  Heart, 
  Wind, 
  Sparkles, 
  Droplets, 
  CircleDot, 
  Dna, 
  Zap, 
  Eye, 
  ShieldAlert, 
  Activity, 
  Flame, 
  Thermometer, 
  Dumbbell,
  Play,
  CheckCircle2,
  BookOpen,
  Lock
} from 'lucide-react';
import { VideoLesson } from '../types';
import { db, auth } from '../lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface FisiologiaDidaticaViewProps {
  onBack: () => void;
  onLessonSelect: (lesson: VideoLesson, courseName: string, playlist?: VideoLesson[]) => void;
  watchedVideos: string[];
  onAwardPoints?: (id: string, value?: number) => void;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

const NEUROFISIOLOGIA_CHAPTERS: Chapter[] = [
  {
    id: 'cap-2',
    title: 'CAPÍTULO 2 — Anatomia',
    lessons: [
      { id: 'll8kvFAms40', title: 'Visão Geral', duration: '10:00' },
      { id: 'dT83878tsF8', title: 'Estruturas do Sistema Nervoso', duration: '12:00' }
    ]
  },
  {
    id: 'cap-3',
    title: 'CAPÍTULO 3 — Células do Sistema Nervoso',
    lessons: [
      { id: 'JZ5vSfgWWsw', title: 'Introdução', duration: '08:00' },
      { id: 'A71H3FgrxTE', title: 'Visão Geral', duration: '10:00' },
      { id: 'znoZOZrrywk', title: 'Células Gliais', duration: '11:00' },
      { id: 'VfrImAU8imI', title: 'Neurônios', duration: '14:00' }
    ]
  },
  {
    id: 'cap-4',
    title: 'CAPÍTULO 4 — Sinapses',
    lessons: [
      { id: 'mNuUqloq3Pw', title: 'Introdução', duration: '07:00' },
      { id: 'S8n-RJ_AVIs', title: 'Visão Geral', duration: '09:00' },
      { id: 'Npg8boyCvbo', title: 'Funcionamento Sináptico', duration: '12:00' },
      { id: 'bHAvWAUwj-8', title: 'Tipos de Sinapses', duration: '10:00' }
    ]
  },
  {
    id: 'cap-5',
    title: 'CAPÍTULO 5 — Circulação Encefálica',
    lessons: [
      { id: '1F6j9TyczEs', title: 'Introdução', duration: '06:00' },
      { id: '1ZWVnl_SRlw', title: 'Visão Geral', duration: '09:00' },
      { id: 'jzECkSs8GZ0', title: 'Artérias Encefálicas', duration: '11:00' }
    ]
  },
  {
    id: 'cap-6',
    title: 'CAPÍTULO 6 — Líquido Cerebroespinal',
    lessons: [
      { id: '-p4QoG7U2JU', title: 'Introdução', duration: '07:00' },
      { id: '2jGoacZivHg', title: 'Visão Geral', duration: '09:00' },
      { id: 'YhSKafOylvs', title: 'Produção do Líquor', duration: '10:00' },
      { id: 'QHqrCqKiogc', title: 'Funções do Líquor', duration: '08:00' },
      { id: 'y49wZHdvs7o', title: 'Circulação do Líquor', duration: '12:00' }
    ]
  },
  {
    id: 'cap-7',
    title: 'CAPÍTULO 7 — Sistema Somatossensorial I (Tato)',
    lessons: [
      { id: 'VSTZnxTTasw', title: 'Introdução', duration: '09:00' },
      { id: 'Hhq1cuYtGUs', title: 'Visão Geral', duration: '11:00' },
      { id: '8xZk5TA0CrE', title: 'Estrutura Central', duration: '12:00' },
      { id: '23dQJdjUupQ', title: 'Estrutura Periférica', duration: '10:00' }
    ]
  },
  {
    id: 'cap-8',
    title: 'CAPÍTULO 8 — Sistema Somatossensorial II (Dor)',
    lessons: [
      { id: 'LOzJyKFSCR8', title: 'Introdução', duration: '07:00' },
      { id: 'q0pYOqBGBX8', title: 'Visão Geral', duration: '10:00' },
      { id: 'RUPy2H1E1ug', title: 'Classificação da Dor', duration: '12:00' },
      { id: 'yDNqX2snoOU', title: 'Via da Dor', duration: '11:00' }
    ]
  },
  {
    id: 'cap-9',
    title: 'CAPÍTULO 9 — Visão',
    lessons: [
      { id: '5iuBss_Sqag', title: 'Introdução', duration: '08:00' },
      { id: 'S-aKxbkpjKw', title: 'Visão Geral', duration: '11:00' },
      { id: 'A_IemOK86jw', title: 'Estrutura do Olho', duration: '13:00' },
      { id: 'pXpKvFK5jnQ', title: 'Fisiologia da Visão', duration: '14:00' }
    ]
  },
  {
    id: 'cap-10',
    title: 'CAPÍTULO 10 — Audição',
    lessons: [
      { id: 'sUJLbJmR3lM', title: 'Introdução', duration: '07:00' },
      { id: 'NhJ5_UE01fo', title: 'Visão Geral', duration: '10:00' },
      { id: 'vfkTY1oKRg4', title: 'Estrutura da Orelha', duration: '12:00' }
    ]
  }
];

const MODULES_CONFIG = [
  { id: 'neurofisiologia', title: 'Neurofisiologia', available: true, icon: 'Brain', desc: 'Estudo do funcionamento do sistema nervoso central e periférico.' },
  { id: 'cardiovascular', title: 'Sistema Cardiovascular', available: false, icon: 'Heart', desc: 'Fisiologia do coração, vasos sanguíneos e dinâmica circulatória.' },
  { id: 'respiratorio', title: 'Sistema Respiratório', available: false, icon: 'Wind', desc: 'Mecânica respiratória, hematose e transporte de gases.' },
  { id: 'endocrino', title: 'Sistema Endócrino', available: false, icon: 'Sparkles', desc: 'Glândulas, hormônios e mecanismos de regulação endócrina.' },
  { id: 'renal', title: 'Sistema Renal', available: false, icon: 'Droplets', desc: 'Filtração glomerular, reabsorção tubular e equilíbrio hidroeletrolítico.' },
  { id: 'digestorio', title: 'Sistema Digestório', available: false, icon: 'Apple', desc: 'Processamento, digestão e absorção de nutrientes.' },
  { id: 'reprodutor', title: 'Sistema Reprodutor', available: false, icon: 'Dna', desc: 'Fisiologia reprodutiva masculina e feminina e gestação.' },
  { id: 'muscular', title: 'Sistema Muscular', available: false, icon: 'Zap', desc: 'Contração muscular esquelética, lisa e cardíaca.' },
  { id: 'sensorial', title: 'Sistema Sensorial', available: false, icon: 'Eye', desc: 'Receptores sensoriais e vias de processamento sensorial.' },
  { id: 'imunologico', title: 'Sistema Imunológico', available: false, icon: 'ShieldAlert', desc: 'Imunidade inata e adquirida, respostas celulares e humorais.' },
  { id: 'hematologico', title: 'Sistema Hematológico', available: false, icon: 'Activity', desc: 'Hemácias, leucócitos, plaquetas e cascata de coagulação.' },
  { id: 'acido-base', title: 'Equilíbrio Ácido-Base', available: false, icon: 'Flame', desc: 'Sistemas tampão, regulação respiratória e renal do pH.' },
  { id: 'termorregulacao', title: 'Termorregulação', available: false, icon: 'Thermometer', desc: 'Mecanismos de controle e manutenção da temperatura corporal.' },
  { id: 'exercicio', title: 'Exercício Físico', available: false, icon: 'Dumbbell', desc: 'Respostas fisiológicas agudas e crônicas ao esforço físico.' }
];

const FisiologiaDidaticaView: React.FC<FisiologiaDidaticaViewProps> = ({ onBack, onLessonSelect, watchedVideos, onAwardPoints }) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'cap-2': true // Expand first chapter by default
  });

  const neuroLessonsList = useMemo(() => {
    return NEUROFISIOLOGIA_CHAPTERS.flatMap(c => c.lessons);
  }, []);

  // Compute watched count for Neurofisiologia
  const neuroWatchedCount = useMemo(() => {
    return neuroLessonsList.filter(l => watchedVideos.includes(l.id)).length;
  }, [neuroLessonsList, watchedVideos]);

  const neuroProgress = useMemo(() => {
    if (neuroLessonsList.length === 0) return 0;
    return Math.round((neuroWatchedCount / neuroLessonsList.length) * 100);
  }, [neuroLessonsList, neuroWatchedCount]);

  // Overall course progress (currently equal to Neurofisiologia since it's the only active module)
  const courseProgress = neuroProgress;

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
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

  const handlePlayLesson = (lesson: Lesson, chapterTitle: string) => {
    // Prefix the lesson title with the chapter name for clarity in the player
    const fullTitle = `${chapterTitle} — ${lesson.title}`;
    
    // Build a playlist containing all neuro lessons with correct chapter titles prefixed
    const playlist = NEUROFISIOLOGIA_CHAPTERS.flatMap(ch => 
      ch.lessons.map(l => ({
        id: l.id,
        title: `${ch.title} — ${l.title}`,
        duration: l.duration
      }))
    );

    onLessonSelect({ id: lesson.id, title: fullTitle }, 'Fisiologia Didática', playlist);
  };

  const renderModuleIcon = (iconName: string, size = 24) => {
    switch (iconName) {
      case 'Brain': return <Brain size={size} />;
      case 'Heart': return <Heart size={size} />;
      case 'Wind': return <Wind size={size} />;
      case 'Sparkles': return <Sparkles size={size} />;
      case 'Droplets': return <Droplets size={size} />;
      case 'Apple': return <CircleDot size={size} />;
      case 'Dna': return <Dna size={size} />;
      case 'Zap': return <Zap size={size} />;
      case 'Eye': return <Eye size={size} />;
      case 'ShieldAlert': return <ShieldAlert size={size} />;
      case 'Activity': return <Activity size={size} />;
      case 'Flame': return <Flame size={size} />;
      case 'Thermometer': return <Thermometer size={size} />;
      case 'Dumbbell': return <Dumbbell size={size} />;
      default: return <Brain size={size} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#E5E7EB] animate-in fade-in duration-500 pb-32">
      <AnimatePresence mode="wait">
        {!selectedModule ? (
          <motion.div
            key="modules-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Capa Oficial e Header do Curso */}
            <div className="relative h-[45vh] w-full overflow-hidden mb-12">
              <img 
                src="https://raw.githubusercontent.com/samielabud-ui/nexus-capas/main/IMG-Destacada.png" 
                className="w-full h-full object-cover opacity-50 scale-100"
                referrerPolicy="no-referrer"
                alt="Fisiologia Didática"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 max-w-[1400px] mx-auto right-0 flex flex-col items-start gap-4">
                <button 
                  onClick={onBack}
                  className="mb-4 flex items-center gap-3 text-[#9CA3AF] hover:text-white transition-all text-xs font-black uppercase tracking-[0.2em] group bg-white/5 px-6 py-2.5 rounded-full border border-white/10 w-fit"
                >
                  <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                  Voltar ao Catálogo
                </button>

                <div className="px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full backdrop-blur-md">
                  Área Premium
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                  Fisiologia <span className="text-blue-500">Didática</span>
                </h1>
                <p className="text-[#9CA3AF] text-lg max-w-2xl font-medium leading-relaxed">
                  Domine a fisiologia humana através de uma abordagem visual, moderna e organizada por grandes sistemas.
                </p>

                {/* Curso Overall Progress */}
                <div className="w-full max-w-md mt-4 bg-[#111827]/80 backdrop-blur-md border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-white/60">Progresso Geral</span>
                    <span className="text-sm font-black text-blue-500 italic">{courseProgress}% concluído</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${courseProgress}%` }}
                      className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Sistemas (Módulos) */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-8 flex items-center gap-3">
                <BookOpen className="text-blue-500" size={24} />
                Sistemas do Corpo Humano
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MODULES_CONFIG.map((mod) => {
                  const isAvailable = mod.available;
                  const progress = isAvailable ? neuroProgress : 0;

                  return (
                    <motion.div
                      key={mod.id}
                      whileHover={isAvailable ? { y: -8, scale: 1.02 } : {}}
                      onClick={() => isAvailable && setSelectedModule(mod.id)}
                      className={`group relative aspect-[4/5] rounded-[2.5rem] bg-[#111827] overflow-hidden shadow-2xl transition-all duration-300 ${
                        isAvailable 
                          ? 'cursor-pointer border border-white/5 hover:border-blue-500/40 hover:shadow-blue-500/5' 
                          : 'opacity-50 border border-white/5 cursor-not-allowed select-none'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                      <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                        <div className="flex justify-between items-start">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md ${
                            isAvailable ? 'bg-blue-500/20 text-blue-400' : 'bg-neutral-800 text-neutral-500'
                          }`}>
                            {renderModuleIcon(mod.icon, 24)}
                          </div>

                          {!isAvailable && (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-neutral-400 text-[8px] font-black uppercase tracking-widest rounded-md">
                              <Lock size={10} /> Em breve
                            </span>
                          )}

                          {isAvailable && (
                            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] font-black uppercase tracking-widest rounded-md">
                              Disponível
                            </span>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Módulo</span>
                            <h3 className={`text-xl font-black italic tracking-tight leading-tight uppercase transition-colors ${
                              isAvailable ? 'text-white group-hover:text-blue-400' : 'text-neutral-500'
                            }`}>
                              {mod.title}
                            </h3>
                            <p className="text-xs text-neutral-400 leading-normal line-clamp-2">
                              {mod.desc}
                            </p>
                          </div>

                          {isAvailable && (
                            <div className="pt-2">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[9px] font-black uppercase tracking-wider text-white/40">Progresso</span>
                                <span className="text-[10px] font-black text-blue-400 italic">{progress}%</span>
                              </div>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  className="h-full bg-blue-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="neurofisiologia-chapters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12"
          >
            {/* Header Módulo */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Fisiologia Didática</span>
                    <span className="text-white/20">/</span>
                    <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.2em]">Módulos</span>
                  </div>
                  <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase flex items-center gap-3 mt-1">
                    Neurofisiologia
                  </h2>
                </div>
              </div>

              {/* Progress of Neurofisiologia */}
              <div className="w-full md:w-64 bg-[#111827] border border-white/5 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Progresso do Módulo</span>
                  <span className="text-xs font-black text-blue-500">{neuroProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${neuroProgress}%` }} />
                </div>
              </div>
            </div>

            {/* Lista de Capítulos (Accordions) */}
            <div className="space-y-4">
              {NEUROFISIOLOGIA_CHAPTERS.map((chapter) => {
                const isExpanded = !!expandedChapters[chapter.id];
                const chapterWatchedCount = chapter.lessons.filter(l => watchedVideos.includes(l.id)).length;
                const chapterTotal = chapter.lessons.length;
                const chapterProgress = chapterTotal > 0 ? Math.round((chapterWatchedCount / chapterTotal) * 100) : 0;

                return (
                  <div 
                    key={chapter.id}
                    className="border border-white/5 bg-[#111827] rounded-[2rem] overflow-hidden transition-all duration-300"
                  >
                    {/* Header do Accordion */}
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="w-full px-6 py-5 md:px-8 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-wider rounded">Capítulo</span>
                          <span className="text-[10px] font-mono text-neutral-500">{chapterWatchedCount} / {chapterTotal} concluídas</span>
                        </div>
                        <h3 className="text-base md:text-lg font-black text-white uppercase tracking-tight">{chapter.title}</h3>
                      </div>

                      <div className="flex items-center gap-6 shrink-0">
                        {/* Circular dynamic progress display */}
                        <div className="flex items-center gap-2">
                          <div className="text-right hidden sm:block">
                            <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Progresso</p>
                            <p className="text-xs font-black text-blue-500">{chapterProgress}%</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-[10px] text-blue-400 border border-white/10">
                            {chapterProgress}%
                          </div>
                        </div>
                        
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9CA3AF]">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>
                    </button>

                    {/* Conteúdo Expansível do Accordion */}
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
                            {chapter.lessons.map((lesson) => {
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
                                      onClick={() => handlePlayLesson(lesson, chapter.title)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FisiologiaDidaticaView;
