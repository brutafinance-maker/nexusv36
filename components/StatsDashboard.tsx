
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
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import PBLDigital from './PBLDigital';

interface StatsDashboardProps {
  stats: UserStats;
  allUsers: any[];
  onNavigate: (view: any) => void;
  onSyncPoints?: () => void;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, allUsers, onNavigate, onSyncPoints }) => {
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
    { 
      id: 'pbl-digital', 
      label: 'PBL Digital', 
      description: 'Editor de conteúdo modular',
      icon: <GraduationCap className="w-5 h-5" />, 
      color: 'bg-indigo-500',
      progress: 60
    },
  ];

  return (
    <div className="py-8 px-2 max-w-6xl mx-auto space-y-8 font-sans text-med-text dark:text-slate-100">
      
      {/* 1. Header Superior */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight text-med-text dark:text-white"
          >
            Bom dia, <span className="text-med-primary dark:text-blue-400">{stats.displayName?.split(' ')[0] || 'Doutor'}</span>
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
              {progressPercent}% da meta diária concluída
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
          Iniciar sessão de foco
        </motion.button>
      </header>

      {/* 2. Top row: Side-by-side balanced focal cards (Melhoria 1 e 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CARD 1: Foco do Dia Otimizado (Melhoria 1) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-med-border/30 dark:shadow-none overflow-hidden flex flex-col justify-between"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-med-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-med-primary/10 dark:bg-blue-900/30 text-med-primary dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                Foco do dia
              </div>
              <span className="text-[10px] font-mono font-bold text-med-sec px-2 py-0.5 bg-med-bg dark:bg-slate-800 rounded">
                Hoje
              </span>
            </div>

            {/* Split layout: text metrics left, progress ring right */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-med-sec dark:text-slate-400 uppercase tracking-wider">Tempo Estudado</p>
                  <p className="text-3xl font-extrabold tracking-tight text-med-text dark:text-white mt-1">
                    {formatTime(stats.dailyStudyTime || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-med-sec dark:text-slate-400 uppercase tracking-wider">Meta Estipulada</p>
                  <p className="text-lg font-bold text-med-sec dark:text-slate-400 mt-0.5">
                    4h 00m
                  </p>
                </div>
              </div>

              {/* Progress Ring */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-med-bg dark:text-slate-800"
                  />
                  <motion.circle
                    initial={{ strokeDasharray: "289 289", strokeDashoffset: 289 }}
                    animate={{ strokeDashoffset: 289 - (289 * progressPercent) / 100 }}
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    className="text-med-primary dark:text-blue-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold">{progressPercent}%</span>
                  <span className="text-[8px] font-bold text-med-sec uppercase tracking-widest">Meta</span>
                </div>
              </div>
            </div>

            {/* Sub-grid of detailed info (Melhoria 1) */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-med-border dark:border-slate-800/80">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-med-sec uppercase tracking-wider">Atividades do Dia</p>
                <p className="text-sm font-semibold text-med-text dark:text-slate-200">
                  2 de 4 concluídas
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-med-sec uppercase tracking-wider">Próxima Atividade</p>
                <p className="text-sm font-bold text-med-primary dark:text-blue-400 truncate">
                  Questões de Cardiologia
                </p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-[10px] font-bold text-med-sec uppercase tracking-wider">Tempo Estimado</p>
                <p className="text-xs font-medium text-med-text dark:text-slate-300">
                  30 minutos de concentração recomendada
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onNavigate('foco')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-med-primary hover:bg-highlight text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Continuar Sessão de Foco
            </motion.button>
          </div>
        </motion.div>

        {/* CARD 2: Caso PBL Atual (Melhoria 5) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-med-border/30 dark:shadow-none overflow-hidden flex flex-col justify-between"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                Caso pbl atual
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
                Ativo
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-med-sec uppercase tracking-wider">Nome do Caso</span>
              <h3 className="text-xl font-extrabold text-med-text dark:text-white tracking-tight">
                Paciente idoso com dor torácica
              </h3>
            </div>

            {/* List of Objectives */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-med-sec uppercase tracking-wider block mb-1">Metas e Diretrizes Clínicas</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Anatomia Cardíaca</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Fisiologia Cardíaca</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-med-sec dark:text-slate-400">
                  <div className="w-4 h-4 rounded-full border-2 border-med-border dark:border-slate-700 shrink-0" />
                  <span>ECG e Arritmias</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-med-sec dark:text-slate-400">
                  <div className="w-4 h-4 rounded-full border-2 border-med-border dark:border-slate-700 shrink-0" />
                  <span>Hipertensão e Conduta</span>
                </div>
              </div>
            </div>

            {/* Progress bar and next objective */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-med-sec dark:text-slate-400">Progresso Geral</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">50%</span>
              </div>
              <div className="w-full h-2 bg-med-bg dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "50%" }} />
              </div>
              <p className="text-xs text-med-sec dark:text-slate-400">
                <span className="font-bold text-med-text dark:text-slate-200">Próximo objetivo:</span> ECG e diagnóstico diferencial decorrente de infarto.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onNavigate('pbl')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              Continuar PBL
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* 3. Main content Layout grid (Melhoria 7 - Desktop Optimization) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left main columns - span 2 */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* CARD: PLANO DE HOJE (Melhoria 2) */}
          <section className="bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-med-text dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-med-primary" />
                Plano de Hoje
              </h2>
              <span className="text-xs text-med-sec font-medium">4 atividades programadas</span>
            </div>

            <div className="relative pl-6 border-l-2 border-med-border dark:border-slate-800 space-y-6">
              {[
                { time: '09:00', title: 'Anatomia Cardíaca', type: 'PBL • Ciclo Clínico', status: 'completed' },
                { time: '11:00', title: 'Fisiologia Cardíaca', type: 'Aula Teórica', status: 'completed' },
                { time: '14:00', title: 'Questões de Cardiologia', type: 'CT / Questões Reais', status: 'pending' },
                { time: '18:00', title: 'Revisão Espaçada', type: 'Cards de Memorização', status: 'waiting' },
              ].map((activity, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Node dot */}
                  <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-med-card dark:bg-slate-900 flex items-center justify-center ${
                    activity.status === 'completed' ? 'border-emerald-500' :
                    activity.status === 'pending' ? 'border-med-primary animate-pulse' : 'border-slate-500'
                  }`}>
                    {activity.status === 'completed' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    {activity.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-med-primary" />}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-med-bg/40 dark:bg-slate-800/20 hover:bg-med-bg/80 dark:hover:bg-slate-800/40 rounded-xl border border-transparent hover:border-med-border dark:hover:border-slate-800/60 transition-all">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-med-sec dark:text-slate-400 font-mono tracking-wider">{activity.time}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          activity.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          activity.status === 'pending' ? 'bg-med-primary/10 text-med-primary dark:text-blue-400' : 'bg-slate-500/10 text-slate-500'
                        }`}>
                          {activity.type}
                        </span>
                      </div>
                      <p className="text-sm font-extrabold text-med-text dark:text-slate-200 mt-1">{activity.title}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {activity.status === 'completed' ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-500/5 px-2.5 py-1 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Concluído
                        </span>
                      ) : activity.status === 'pending' ? (
                        <button 
                          onClick={() => onNavigate('ct')}
                          className="text-xs font-bold text-med-primary dark:text-blue-400 flex items-center gap-1 bg-med-primary/10 hover:bg-med-primary hover:text-white px-2.5 py-1.5 rounded-lg transition-all"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          Praticar agora
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          Agendado
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CARD: PROGRESSO ACADÊMICO (Melhoria 3) */}
          <section className="bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-med-text dark:text-white flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-med-primary" />
              Progresso Acadêmico por Especialidade
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'Cardiologia', percentage: 80, color: 'bg-blue-500' },
                { name: 'Pneumologia', percentage: 65, color: 'bg-emerald-500' },
                { name: 'Nefrologia', percentage: 42, color: 'bg-indigo-500' },
                { name: 'Gastroenterologia', percentage: 37, color: 'bg-rose-500' }
              ].map((row, idx) => (
                <div key={idx} className="space-y-2 p-3 bg-med-bg/20 dark:bg-slate-800/10 rounded-xl border border-med-border/40 dark:border-slate-800/40">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-med-text dark:text-slate-200">{row.name}</span>
                    <span className="font-mono font-bold text-med-sec dark:text-slate-400">{row.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-med-bg dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${row.percentage}%` }}
                      className={`h-full ${row.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Grid de Acessos Rápidos */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-med-text dark:text-slate-200 ml-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-med-primary" />
              Acesso Rápido às Ferramentas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <motion.button
                  key={action.id}
                  whileHover={{ y: -4 }}
                  onClick={() => onNavigate(action.id as any)}
                  className="flex flex-col p-4 bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-2xl hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${action.color} text-white`}>
                      {action.icon}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold text-med-sec dark:text-slate-500 uppercase tracking-widest">Progresso</span>
                      <span className="text-xs font-bold text-med-text dark:text-slate-300">{action.progress}%</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-extrabold text-med-text dark:text-white mb-0.5 group-hover:text-med-primary dark:group-hover:text-blue-400 transition-colors">{action.label}</h3>
                  <p className="text-[11px] text-med-sec dark:text-slate-400 mb-3">{action.description}</p>
                  <div className="w-full h-1 bg-med-bg dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${action.color} rounded-full`} style={{ width: `${action.progress}%` }} />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Column (Performance, priorities and ranking) */}
        <div className="space-y-8">
          
          {/* CARD: MÉTRICAS REAIS DE ESTUDO (Melhoria 6) */}
          <section className="bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-med-text dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-med-primary" />
              Estatísticas Reais de Estudo
            </h2>

            <div className="grid grid-cols-2 gap-3">
              
              {/* Horas na semana */}
              <div className="p-3 bg-med-bg/40 dark:bg-slate-800/30 border border-med-border dark:border-slate-800 rounded-xl">
                <span className="text-[9px] font-bold text-med-sec uppercase tracking-widest block">Estudo Semanal</span>
                <span className="text-lg font-extrabold text-med-text dark:text-white mt-0.5 block">18h 35m</span>
              </div>

              {/* Horas no mês */}
              <div className="p-3 bg-med-bg/40 dark:bg-slate-800/30 border border-med-border dark:border-slate-800 rounded-xl">
                <span className="text-[9px] font-bold text-med-sec uppercase tracking-widest block">Acumulado Mês</span>
                <span className="text-lg font-extrabold text-med-text dark:text-white mt-0.5 block">72h 10m</span>
              </div>

              {/* Questões respondidas */}
              <div className="p-3 bg-med-bg/40 dark:bg-slate-800/30 border border-med-border dark:border-slate-800 rounded-xl">
                <span className="text-[9px] font-bold text-med-sec uppercase tracking-widest block">Questões Feitas</span>
                <span className="text-lg font-extrabold text-med-text dark:text-white mt-0.5 block">{stats.totalAnswered || 0}</span>
              </div>

              {/* Taxa de Acertos */}
              <div className="p-3 bg-med-bg/40 dark:bg-slate-800/30 border border-med-border dark:border-slate-800 rounded-xl">
                <span className="text-[9px] font-bold text-med-sec uppercase tracking-widest block">Média de Acertos</span>
                <span className="text-lg font-extrabold text-med-primary dark:text-blue-400 mt-0.5 block">{hitRate}%</span>
              </div>

              {/* Conteúdos concluídos */}
              <div className="p-3 bg-med-bg/40 dark:bg-slate-800/30 border border-med-border dark:border-slate-800 rounded-xl col-span-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-med-sec uppercase tracking-widest block">Conteúdos Concluídos</span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                      {stats.completedPblModules?.length || 8} módulos
                    </span>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500/20 shrink-0" />
                </div>
              </div>

            </div>

            {/* Micro weekly chart */}
            <div className="mt-4 pt-4 border-t border-med-border dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-med-sec uppercase tracking-wide">Evolução do Tempo de Estudo</p>
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-nexus-orange fill-current" />
                  <span className="text-xs font-bold text-nexus-orange font-mono">{stats.streak} dias</span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-1.5 h-10 px-1">
                {[30, 45, 25, 60, 80, 55, 70].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className={`w-full rounded-t-sm ${i === 6 ? 'bg-med-primary' : 'bg-med-border dark:bg-slate-800'}`}
                  />
                ))}
              </div>
            </div>

          </section>

          {/* CARD: SUAS PRIORIDADES SECCIONADO (Melhoria 4) */}
          <section className="bg-med-card dark:bg-slate-900 border border-med-border dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-med-text dark:text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-med-primary" />
              Suas Prioridades
            </h2>
            
            <div className="space-y-4">
              
              {/* 1. Revisar Hoje */}
              <div className="space-y-1 pb-3 border-b border-med-border dark:border-slate-800/80">
                <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                  <History className="w-3 h-3" />
                  <span>Revisar Hoje</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-orange-500/5 rounded-xl border border-orange-200/20 dark:border-orange-950/20">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-med-text dark:text-slate-200 truncate">Puericultura e Amamentação</p>
                    <p className="text-[9px] text-med-sec dark:text-slate-400">12 flashcards • Pediatria</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('ct')}
                    className="text-[9px] font-bold text-orange-600 dark:text-orange-400 hover:opacity-80 py-1 px-2 shrink-0 bg-orange-500/10 rounded-md"
                  >
                    Estudar
                  </button>
                </div>
              </div>

              {/* 2. Continuar Estudo */}
              <div className="space-y-1 pb-3 border-b border-med-border dark:border-slate-800/80">
                <div className="flex items-center gap-1 text-[10px] font-bold text-med-primary dark:text-blue-400 uppercase tracking-widest">
                  <Play className="w-3 h-3" />
                  <span>Continuar Estudo</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-med-primary/5 rounded-xl border border-med-primary/10 dark:border-blue-950/20">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-med-text dark:text-slate-200 truncate">
                      {stats.lastWatched?.lessonTitle || 'Reanimação Neonatal Integrada'}
                    </p>
                    <p className="text-[9px] text-med-primary font-bold truncate">
                      {stats.lastWatched?.courseName || 'Foco Clínico'}
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('pbl')}
                    className="text-[9px] font-bold text-med-primary dark:text-blue-400 hover:opacity-80 py-1 px-2 shrink-0 bg-med-primary/10 rounded-md"
                  >
                    Ver Aula
                  </button>
                </div>
              </div>

              {/* 3. Assuntos com Maior Dificuldade */}
              <div className="space-y-1 pb-3 border-b border-med-border dark:border-slate-800/80">
                <div className="flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                  <AlertCircle className="w-3 h-3" />
                  <span>Dificuldade Identificada</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-red-500/5 rounded-xl border border-red-200/20 dark:border-red-950/20">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-med-text dark:text-slate-200 truncate">
                      {stats.weakestTheme?.theme || 'Equilíbrio Ácido-Básico'}
                    </p>
                    <p className="text-[9px] text-red-650 dark:text-red-405 font-semibold">Acerto crítico: 22%</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('ct')}
                    className="text-[9px] font-bold text-red-600 dark:text-red-400 hover:opacity-80 py-1 px-2 shrink-0 bg-red-500/10 rounded-md"
                  >
                    Treinar
                  </button>
                </div>
              </div>

              {/* 4. Próxima Avaliação */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  <BookOpen className="w-3 h-3" />
                  <span>Próxima Avaliação</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-emerald-500/5 rounded-xl border border-emerald-200/20 dark:border-emerald-950/20">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-med-text dark:text-slate-200 truncate">Simulado Geral de Cirurgia</p>
                    <p className="text-[9px] text-med-sec dark:text-slate-400">Em 3 dias • 80 questões</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('hp')}
                    className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 hover:opacity-80 py-1 px-2 shrink-0 bg-emerald-500/10 rounded-md"
                  >
                    Treinar
                  </button>
                </div>
              </div>

            </div>

            <button 
              onClick={() => onNavigate('pbl')} 
              className="w-full mt-4 py-2 bg-med-bg/40 dark:bg-slate-800/50 hover:bg-med-bg/85 dark:hover:bg-slate-850 border border-med-border dark:border-slate-800 rounded-xl text-xs font-bold text-med-sec dark:text-slate-400 transition-colors"
            >
              Ver Cronograma de Estudos
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
                    <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName || 'User'}`} className="w-8 h-8 rounded-full border border-med-border object-cover" alt="" referrerPolicy="no-referrer" />
                    <span className={`text-xs font-bold ${user.uid === stats.uid ? 'text-med-primary' : 'text-med-text dark:text-slate-300'}`}>
                      {user.uid === stats.uid ? 'Você' : user.displayName?.split(' ')[0] || 'Doutor'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-med-sec">{user.points?.toLocaleString()} pts</span>
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

