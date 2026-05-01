
import React, { useMemo } from 'react';
import { UserStats } from '../types';
import { 
  Play, 
  Clock, 
  Target, 
  Flame, 
  BarChart3, 
  BookOpen, 
  FileText, 
  History, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface StatsDashboardProps {
  stats: UserStats;
  allUsers: any[];
  onNavigate: (view: any) => void;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, allUsers, onNavigate }) => {
  const rankingCycle = stats.ciclo;

  const filteredRanking = useMemo(() => {
    return allUsers
      .filter(u => u.ciclo === rankingCycle)
      .sort((a, b) => (b.points || 0) - (a.points || 0))
      .slice(0, 5) // Mostramos apenas top 5 na home para manter limpo
      .map((u, i) => ({ ...u, rank: i + 1 }));
  }, [allUsers, rankingCycle]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}min`;
  };

  const hitRate = useMemo(() => {
    if (!stats.totalAnswered) return 0;
    return Math.round((stats.totalCorrect / stats.totalAnswered) * 100);
  }, [stats.totalAnswered, stats.totalCorrect]);

  // Meta diária sugerida: 4 horas (14400 segundos)
  const dailyGoalSeconds = 14400;
  const progressPercent = Math.min(Math.round((stats.dailyStudyTime / dailyGoalSeconds) * 100), 100);

  const quickActions = [
    { 
      id: 'ct', 
      label: 'Questões', 
      description: 'Pratique com o banco de questões',
      icon: <Target className="w-5 h-5" />, 
      color: 'bg-blue-500',
      progress: 45
    },
    { 
      id: 'pbl', 
      label: 'Conteúdo Teórico', 
      description: 'Videoaulas e apostilas digitais',
      icon: <BookOpen className="w-5 h-5" />, 
      color: 'bg-purple-500',
      progress: 30
    },
    { 
      id: 'hp', 
      label: 'Simulados', 
      description: 'Testes de performance reais',
      icon: <FileText className="w-5 h-5" />, 
      color: 'bg-emerald-500',
      progress: 15
    },
  ];

  return (
    <div className="py-8 px-2 max-w-6xl mx-auto space-y-10 font-sans text-med-text dark:text-slate-100">
      
      {/* 1. Header Superior */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight text-med-text dark:text-white"
          >
            Bom dia, <span className="text-med-primary dark:text-blue-400">{stats.displayName.split(' ')[0]}</span>
          </motion.h1>
          <div className="flex items-center gap-4">
            <div className="flex-grow max-w-[200px] h-1.5 bg-med-border dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-med-primary dark:bg-blue-500"
              />
            </div>
            <span className="text-xs font-semibold text-med-sec dark:text-slate-400">
              {progressPercent}% da meta diária
            </span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('foco')}
          className="flex items-center gap-2 px-6 py-3 bg-med-primary hover:bg-highlight hover:opacity-90 text-white rounded-xl font-semibold shadow-lg shadow-med-primary/20 transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          Iniciar foco
        </motion.button>
      </header>

      {/* 2. Seção Principal (Foco do Dia) */}
      <section className="relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl shadow-med-border/50 dark:shadow-none overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-med-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-med-primary/10 dark:bg-blue-900/30 text-med-primary dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                <Target className="w-3 h-3" />
                Foco do dia
              </div>
              
              <div className="flex flex-col sm:flex-row gap-10">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-med-sec dark:text-slate-400">Tempo estudado hoje</p>
                  <p className="text-5xl font-extrabold tracking-tighter text-med-text dark:text-white">
                    {formatTime(stats.dailyStudyTime)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-med-sec dark:text-slate-400">Meta do dia</p>
                  <p className="text-5xl font-extrabold tracking-tighter text-med-border dark:text-slate-700">
                    4h 00m
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => onNavigate('foco')}
                className="flex items-center gap-2 text-med-primary dark:text-blue-400 font-bold hover:underline"
              >
                Continuar estudando de onde parou
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-med-bg dark:text-slate-800"
                  />
                  <motion.circle
                    initial={{ strokeDasharray: "440 440", strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * progressPercent) / 100 }}
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeLinecap="round"
                    className="text-med-primary dark:text-blue-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{progressPercent}%</span>
                  <span className="text-[10px] font-bold text-med-sec uppercase tracking-widest">Completo</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          {/* 3. Grid de Acessos Rápidos */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-med-text dark:text-slate-200 ml-1">Para hoje</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => onNavigate(action.id as any)}
                  className="flex flex-col p-5 bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-2xl hover:shadow-lg hover:shadow-med-border/50 dark:hover:shadow-none transition-all text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${action.color} text-white`}>
                      {action.icon}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-med-sec dark:text-slate-500 uppercase tracking-widest">Progresso</span>
                      <span className="text-sm font-bold text-med-text dark:text-slate-300">{action.progress}%</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-med-text dark:text-white mb-1">{action.label}</h3>
                  <p className="text-xs text-med-sec dark:text-slate-400 mb-4">{action.description}</p>
                  <div className="w-full h-1 bg-med-bg dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${action.color} rounded-full`} style={{ width: `${action.progress}%` }} />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* 4. Seção de Performance */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-med-text dark:text-slate-200 ml-1">Sua Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Streak */}
              <div className="p-6 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-2xl flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-nexus-orange text-white rounded-full flex items-center justify-center mb-3 shadow-lg shadow-nexus-orange/20">
                  <Flame className="w-6 h-6 fill-current" />
                </div>
                <p className="text-3xl font-extrabold text-nexus-orange">{stats.streak}</p>
                <p className="text-sm font-bold text-nexus-orange/60 uppercase tracking-widest">Dias seguidos</p>
              </div>

              {/* Hit Rate */}
              <div className="p-6 bg-med-primary/5 dark:bg-blue-900/10 border border-med-primary/10 dark:border-blue-900/30 rounded-2xl flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-med-primary text-white rounded-full flex items-center justify-center mb-3 shadow-lg shadow-med-primary/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <p className="text-3xl font-extrabold text-med-primary">{hitRate}%</p>
                <p className="text-sm font-bold text-med-primary/60 uppercase tracking-widest">Taxa de acertos</p>
              </div>

              {/* Weekly Chart Placeholder */}
              <div className="p-6 bg-med-bg dark:bg-slate-800/30 border border-med-border dark:border-slate-800 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold text-med-sec uppercase tracking-widest">Evolução</p>
                  <BarChart3 className="w-4 h-4 text-med-sec" />
                </div>
                <div className="flex items-end justify-between gap-1 h-12">
                  {[30, 45, 25, 60, 80, 55, 70].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className={`w-full rounded-t-sm ${i === 6 ? 'bg-med-primary' : 'bg-med-border dark:bg-slate-700'}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* 5. Seção de Prioridades */}
          <section className="bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-med-text dark:text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-med-primary" />
              Suas Prioridades
            </h2>
            
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-med-sec uppercase tracking-widest">O que revisar hoje</p>
                <div className="flex items-center gap-3 p-3 bg-med-bg dark:bg-slate-800/50 rounded-xl border border-med-border dark:border-slate-800">
                  <div className="w-8 h-8 bg-med-primary/10 text-med-primary rounded-lg flex items-center justify-center shrink-0">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-med-text dark:text-slate-300">Puericultura e Amamentação</p>
                    <p className="text-[10px] text-med-sec">Pediatria • 12 cartões</p>
                  </div>
                </div>
              </div>

              {stats.lastWatched && (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-med-sec uppercase tracking-widest">Continuar Assistindo</p>
                  <motion.button 
                    whileHover={{ x: 2 }}
                    className="w-full flex items-center gap-3 p-3 bg-med-primary/5 dark:bg-blue-900/10 rounded-xl border border-med-primary/10 dark:border-blue-900/30 text-left"
                  >
                    <div className="w-8 h-8 bg-med-primary/20 text-med-primary rounded-lg flex items-center justify-center shrink-0">
                      <Play className="w-3 h-3 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-med-text dark:text-slate-300 truncate max-w-[150px]">
                        {stats.lastWatched.lessonTitle}
                      </p>
                      <p className="text-[10px] text-med-primary font-medium">{stats.lastWatched.courseName}</p>
                    </div>
                  </motion.button>
                </div>
              )}

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-med-sec uppercase tracking-widest">Assunto fraco</p>
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                  <div className="w-8 h-8 bg-red-500/10 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-med-text dark:text-slate-300">
                      {stats.weakestTheme?.theme || 'Hemoterapia'}
                    </p>
                    <p className="text-[10px] text-red-600 font-medium">Acerto crítico: 22%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-med-sec uppercase tracking-widest">Pendências</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[11px] font-medium text-med-sec dark:text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-med-border" />
                    Finalizar checklist de Abdome
                  </li>
                  <li className="flex items-center gap-2 text-[11px] font-medium text-med-sec dark:text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-med-border" />
                    Simulado Mensal de Abril
                  </li>
                </ul>
              </div>
            </div>

            <button className="w-full mt-6 py-3 border border-med-border dark:border-slate-700 rounded-xl text-xs font-bold text-med-sec dark:text-slate-400 hover:bg-med-bg dark:hover:bg-slate-800 transition-colors">
              Ver cronograma completo
            </button>
          </section>

          {/* Ranking Compacto */}
          <section className="bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-med-text dark:text-white mb-6 flex items-center justify-between">
              Performance Global
              <span className="text-[10px] font-bold text-med-sec uppercase tracking-widest">{rankingCycle}</span>
            </h2>
            
            <div className="space-y-4">
              {filteredRanking.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 text-[10px] font-bold text-med-sec">#{user.rank}</div>
                    <img src={user.photoURL} className="w-8 h-8 rounded-full border border-med-border object-cover" alt="" />
                    <span className={`text-xs font-bold ${user.isCurrentUser ? 'text-med-primary' : 'text-med-text dark:text-slate-300'}`}>
                      {user.isCurrentUser ? 'Você' : user.displayName?.split(' ')[0] || 'Doutor'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-med-sec">{user.points?.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default StatsDashboard;

