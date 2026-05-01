
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { UserStats, VideoLesson, LastWatched, ActivityItem } from '../types';
import { db, auth } from '../lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronLeft,
  PlayCircle,
  Clock,
  Play,
  Info,
  ChevronRight,
  TrendingUp,
  Star,
  Award,
  Search,
  Settings,
  Bell
} from 'lucide-react';
import NexusVideoPlayer from './NexusVideoPlayer';

interface PremiumViewProps {
  userStats: UserStats;
  onAddActivity: (item: any) => void;
  onAwardPoints?: (id: string, value?: number) => void;
  onIncrementUsage?: (contentId: string) => void;
  onNavigate?: (view: any) => void;
}

const STREAMING_COLORS = {
  bg: "#0B1120",
  card: "#111827",
  hover: "#1F2937",
  primary: "#3B82F6",
  text: "#E5E7EB",
  secondary: "#9CA3AF"
};

const SPECIALTY_THEMES: Record<string, { img: string; icon: string; accent: string; desc: string; gradient: string }> = {
  "Pediatria 1": { 
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    icon: "👶", accent: "#00A3FF", desc: "Neonatologia e desenvolvimento infantil.", gradient: "from-blue-600 to-cyan-400"
  },
  "Clínica Médica": { 
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    icon: "🩺", accent: "#3B82F6", desc: "Grandes temas da medicina interna.", gradient: "from-blue-700 to-indigo-500"
  },
  "Ginecologia e Obstetrícia": { 
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
    icon: "🤰", accent: "#FF2E5F", desc: "Saúde da mulher e ciclo gravídico.", gradient: "from-rose-600 to-red-400"
  },
  "Cirurgia": { 
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    icon: "🔪", accent: "#10B981", desc: "Técnica operatória e trauma.", gradient: "from-emerald-600 to-teal-400"
  },
  "Preventiva": { 
    img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800",
    icon: "📊", accent: "#8B5CF6", desc: "Epidemiologia, ética e SUS.", gradient: "from-purple-600 to-violet-400"
  },
  "Hematologia": { 
    img: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?auto=format&fit=crop&q=80&w=800",
    icon: "🩸", accent: "#ef4444", desc: "Anemias, leucemias, linfomas, mieloma e hemostasia.", gradient: "from-red-700 to-rose-500"
  },
  "Extensivo": { 
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    icon: "📚", accent: "#EF4444", desc: "Preparação completa de alto desempenho.", gradient: "from-red-600 to-orange-500"
  },
  "Reprodução Humana": { 
    img: "https://images.unsplash.com/photo-1579152276508-498c8c22252a?auto=format&fit=crop&q=80&w=800",
    icon: "🧬", accent: "#F43F5E", desc: "Gametogênese e fertilização.", gradient: "from-rose-500 to-pink-400"
  }
};

const HEMATOLOGIA_LESSONS: (VideoLesson & { duration: string; block: string })[] = [
  { id: 'ihsoMziMuQk', title: 'Abordagem Inicial da Anemia', duration: '18:40', block: '🔴 HEMATOLOGIA I — ANEMIAS' },
  { id: 'NMymZUam5bU', title: 'Anemia de Doença Crônica', duration: '15:20', block: '🔴 HEMATOLOGIA I — ANEMIAS' },
  { id: 'p6smbJ03oA8', title: 'Anemia Ferropriva', duration: '22:15', block: '🔴 HEMATOLOGIA I — ANEMIAS' },
  { id: 'RlR8wl0DyGE', title: 'Anemia Megaloblástica', duration: '19:30', block: '🔴 HEMATOLOGIA I — ANEMIAS' },
  { id: 'TBktA-sm5Is', title: 'Anemias Hemolíticas — Parte 1', duration: '25:10', block: '🔴 HEMATOLOGIA I — ANEMIAS' },
  { id: 'qbOF7LzuzUU', title: 'Anemias Hemolíticas — Parte 2', duration: '24:45', block: '🔴 HEMATOLOGIA I — ANEMIAS' },
  { id: 'gxT4eQAZZNs', title: 'Introdução às Leucemias', duration: '12:50', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'KsIXu3iTPS0', title: 'Leucemia Linfoide Aguda', duration: '20:05', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'meAIZneoEmo', title: 'Leucemia Linfoide Crônica', duration: '18:30', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'pf7Pu2PZUlU', title: 'Leucemia Mieloide Aguda', duration: '21:15', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'MacxmFyY4sw', title: 'Leucemia Mieloide Crônica', duration: '19:40', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'E9P8JjVruMM', title: 'Leucemias Agudas', duration: '26:20', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'RUTDF07ITq4', title: 'Leucemias Crônicas', duration: '24:10', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'jqHQYZCCfww', title: 'Linfomas', duration: '30:00', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'zIMygSaGF8w', title: 'Mieloma', duration: '22:35', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
  { id: 'TW2sdKHi6dI', title: 'Hemostasia — Bloco 2', duration: '28:50', block: '🟣 HEMATOLOGIA II — DOENÇAS NEOPLÁSICAS' },
];

const EMBRIOLOGIA_LESSONS: (VideoLesson & { duration: string })[] = [
  { id: 'O9YsUhCQv64', title: 'Fecundação', duration: '12:45' },
  { id: 'tMXgjHq61wQ', title: 'Gametogênese', duration: '15:20' },
  { id: '-iuWA5CQCMI', title: 'Zigoto e Blastocisto', duration: '10:15' },
  { id: 'i29YGecX9UQ', title: 'Âmnio e Celoma', duration: '14:30' },
  { id: 'HbQ8Zpex0AA', title: 'Córion', duration: '08:50' },
  { id: 'HVVclowB9qI', title: 'Gastrulação', duration: '18:10' },
  { id: 'XUD3IUNK7Vk', title: 'Notocorda e Tubo Neural', duration: '11:25' },
  { id: '7rYQMJzQoYg', title: 'Somitos, Celoma Intra e Sistema Cardiovascular', duration: '22:05' },
  { id: 'iu5VjWLLoKU', title: 'Organogênese e Dobramento do Embrião', duration: '16:40' },
  { id: 'tSqOhvdTDnc', title: 'Embriologia da 4ª à 8ª Semana', duration: '13:15' },
  { id: 'aFEVmlbJ708', title: 'Embriologia da 9ª Semana ao Nascimento', duration: '09:55' },
  { id: 'L2IZEut6Yok', title: 'Cavidades do Corpo Embrionário', duration: '11:45' },
  { id: 'CeDWt2Qg3UE', title: 'Desenvolvimento do Diafragma', duration: '07:30' },
  { id: 'WEzfPk3OJ9o', title: 'Aparelho Faríngeo (Arcos e Derivados)', duration: '19:20' },
  { id: 'Wxo8xMksxiU', title: 'Aparelho Faríngeo (Bolsas, Sulcos e Membranas)', duration: '15:50' },
  { id: 'axyh2MK-XDU', title: 'Embriologia do Pescoço', duration: '12:10' },
  { id: 'fnJnYip6qWA', title: 'Primórdio Respiratório e Faringe', duration: '14:05' },
  { id: 'iExD4xImT24', title: 'Embriologia da Face', duration: '17:35' },
  { id: 'xQO9_OJmuCI', title: 'Embriologia do Palato', duration: '10:40' },
  { id: '7ydEZDWXWmg', title: 'Maturação Pulmonar', duration: '08:25' },
  { id: 'a3zj8iowhJ8', title: 'Membranas Fetais', duration: '13:50' },
  { id: 'f2k4ng4kLzQ', title: 'Traqueia, Brônquios e Pulmões', duration: '11:15' },
  { id: 'IqL5Icry-ZQ', title: 'Intestino Anterior (Bolsa Omental e Duodeno)', duration: '14:25' },
  { id: 'V3gyiEpoEXA', title: 'Intestino Anterior (Fígado e Sistema Biliar)', duration: '16:05' },
  { id: 'D4GpR1-IJ5M', title: 'Intestino Anterior (Pâncreas e Baço)', duration: '12:50' },
  { id: 'BbYOX4kR3vc', title: 'Placenta', duration: '15:15' },
  { id: 'kDNHoeo5Yio', title: 'Intestino Anterior (Esôfago e Estômago)', duration: '13:30' },
  { id: 'MvR0FbqGD_Y', title: 'Intestino Médio (Herniação e Rotação)', duration: '18:45' },
  { id: 'XU-voGzqC_c', title: 'Intestino Médio (Ceco e Apêndice)', duration: '10:10' },
  { id: 'kCVHiNzogbI', title: 'Intestino Posterior e Cloaca', duration: '12:20' },
  { id: 'Tow8vrGpf6A', title: 'Sistema Urinário (Bexiga e Defeitos)', duration: '16:55' },
  { id: 'Sb62GtZf0LY', title: 'Sistema Genital (Gônadas Indiferenciadas)', duration: '20:10' },
  { id: '8ivU4plbcUw', title: 'Desenvolvimento do Coração e Vasos', duration: '25:30' },
];

const REPRODUCAO_HUMANA_LESSONS: (VideoLesson & { duration: string; block: string })[] = [
  { id: 'x3PuKN0TK7Q', title: 'Gametogênese – Espermatogênese', duration: '15:40', block: '0️⃣ Gametogênese' },
  { id: '02qzFxym5wg', title: 'Gametogênese – Ovogênese', duration: '14:20', block: '0️⃣ Gametogênese' },
  { id: 'TmUPeZcs_Fo', title: 'Gametogênese – Diferenças entre Espermatogênese e Ovogênese', duration: '08:15', block: '0️⃣ Gametogênese' },
  { id: 'e_vuOHUhpYU', title: 'Gametogênese – Partenogênese', duration: '10:50', block: '0️⃣ Gametogênese' },
  { id: 'gRWG7Whisvo', title: 'Gametogênese – Tipos de Partenogênese', duration: '12:10', block: '0️⃣ Gametogênese' },
  { id: 'eidGIV69EbA', title: 'Gametogênese – Pedogênese e Neotenia', duration: '11:05', block: '0️⃣ Gametogênese' },
  { id: 'j6zDCgvNHus', title: '17 – Ciclos Ovarianos', duration: '15:00', block: '1️⃣ Ciclos Ovarianos' },
  { id: 'anwKQjOAZKs', title: '18 – Cronologia do Ciclo', duration: '14:00', block: '1️⃣ Ciclos Ovarianos' },
  { id: 'MuGOO0oAn5Y', title: '20 – Métodos Anticoncepcionais', duration: '18:00', block: '1️⃣ Ciclos Ovarianos' },
  { id: 'hWzfJlaCBWQ', title: '21 – Menarca e Menopausa', duration: '12:00', block: '1️⃣ Ciclos Ovarianos' },
  { id: 'f6iSpbPj034', title: '22 – Ovócito 2º e Espermatozoide', duration: '16:00', block: '2️⃣ Fecundação' },
  { id: 'bVaxntcQdDc', title: '23 – Fecundação', duration: '15:00', block: '2️⃣ Fecundação' },
];

const PEDIATRIA_1_LESSONS: (VideoLesson & { duration: string; block: string; isBonus?: boolean })[] = [
  { id: '9Gvq0WceuPk', title: 'Introdução Neonatal', duration: '25:00', block: '1️⃣ NEONATOLOGIA – BASE' },
  { id: 'A4_sGTxXLjw', title: 'Reanimação Neonatal', duration: '30:00', block: '1️⃣ NEONATOLOGIA – BASE' },
  { id: 'sTxiSLpDjkU', title: 'Icterícia Neonatal', duration: '28:00', block: '1️⃣ NEONATOLOGIA – BASE' },
  { id: 'e3xEPYIujN0', title: 'Infecções Congênitas – Exposição', duration: '22:00', block: '2️⃣ INFECÇÕES CONGÊNITAS' },
  { id: 'CMXnFxqEcx8', title: 'Infecções Congênitas – Sífilis', duration: '24:00', block: '2️⃣ INFECÇÕES CONGÊNITAS' },
  { id: 'PRB9jAbbikQ', title: 'Infecções Congênitas – Outras', duration: '20:00', block: '2️⃣ INFECÇÕES CONGÊNITAS' },
  { id: '0wQ0uK3bDF4', title: 'Infecções Congênitas – Outras 2', duration: '18:00', block: '2️⃣ INFECÇÕES CONGÊNITAS' },
  { id: 'Z6IZ3pX43wE', title: 'Distúrbio Respiratório – Parte 1', duration: '15:00', block: '3️⃣ DISTÚRBIOS RESPIRATÓRIOS NEONATAIS' },
  { id: 'XGXe2_qYwP8', title: 'Distúrbio Respiratório – Parte 2', duration: '16:00', block: '3️⃣ DISTÚRBIOS RESPIRATÓRIOS NEONATAIS' },
  { id: 'HMB2JHyyH4s', title: 'Distúrbio Respiratório – Parte 3', duration: '14:00', block: '3️⃣ DISTÚRBIOS RESPIRATÓRIOS NEONATAIS' },
  { id: 'xXjKSU36Um4', title: 'Doenças Exantemáticas – Introdução', duration: '12:00', block: '4️⃣ DOENÇAS EXANTEMÁTICAS' },
  { id: '8pRZJsazvCs', title: 'Caso Clínico 01', duration: '10:00', block: '4️⃣ DOENÇAS EXANTEMÁTICAS' },
  { id: 'kPI3lzbKkoo', title: 'Caso Clínico 02', duration: '11:00', block: '4️⃣ DOENÇAS EXANTEMÁTICAS' },
  { id: '6du-1JJd8rQ', title: 'Caso Clínico 03', duration: '09:00', block: '4️⃣ DOENÇAS EXANTEMÁTICAS' },
  { id: 'yWSWkqAAG1M', title: 'Caso Clínico 04', duration: '12:00', block: '4️⃣ DOENÇAS EXANTEMÁTICAS' },
  { id: 'i7SEn1c5pxE', title: 'Triagem Neonatal', duration: '42:00', block: '5️⃣ BÔNUS PED1', isBonus: true },
  { id: 'IDy-T2pE2Zg', title: 'O Exame Físico Neonatal', duration: '47:00', block: '5️⃣ BÔNUS PED1', isBonus: true },
  { id: 'jFq-l20Truw', title: 'Doenças do Trato Gastrointestinal', duration: '26:00', block: '5️⃣ BÔNUS PED1', isBonus: true },
  { id: 'Mv7SJ0_IoZQ', title: 'Miscelânea', duration: '52:00', block: '5️⃣ BÔNUS PED1', isBonus: true },
];

const SANARFLIX_COURSES = [
  "Anatomia do Sistema Locomotor", "Anatomia dos Órgãos e Sistemas", "Antibioticoterapia",
  "Atendimento Pré-Hospitalar", "Biofísica", "Biologia Molecular e Celular",
  "Bioquímica", "Eletrocardiograma (ECG)", "Embriologia", "Exames Laboratoriais",
  "Farmacologia", "Fisiologia", "Genética", "Histologia", "Microbiologia",
  "Neuroanatomia", "Parasitologia", "Patologia", "Primeiros Socorros",
  "Radiologia", "Semiologia", "Sistema Circulatório", "Sistema Digestório",
  "Sistema Endócrino", "Sistema Hematopoiético", "Sistema Imune", "Sistema Nervoso",
  "Sistema Reprodutor", "Sistema Respiratório", "Sistema Urinário e Renal", "Trauma"
];

const VEST_COURSES = [ "Reprodução Humana", "Embriologia Animal" ];
const MEDCOF_COURSES = [ "Extensivo", "Curso de Ultrassom – POCUS", "Desafios de Imagem", "Estações Multimídia", "Hands On – OSCE", "Medical Life Hacks", "RX" ];
const MEDCURSO_COURSES = [ "Pediatria 1", "Ginecologia e Obstetrícia", "Cirurgia", "Clínica Médica", "Hematologia", "Preventiva" ];

const PREMIUM_PLATFORMS = [
  { id: 'sanarflix', title: 'Sanarflix', category: 'official', description: 'Plataforma oficial Sanarflix.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600' },
  { id: 'medcurso', title: 'Medcurso', category: 'official', description: 'Preparatório para Residência Médica.', image: 'https://medgrupo.com.br/wp-content/uploads/2024/03/medgrupo.png' },
  { id: 'medcof', title: 'MedCof', category: 'official', description: 'Elite em aprovação na residência médica.', image: 'https://www.grupomedcof.com.br/blog/wp-content/uploads/2024/10/Modelo-instituicoes-16.png' },
  { id: 'devoltavest', title: 'De Volta ao Vest', category: 'foundation', description: 'Fundamentos do vestibular.', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600' },
];

const PremiumView: React.FC<PremiumViewProps> = ({ userStats, onAddActivity, onAwardPoints, onIncrementUsage, onNavigate }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);
  
  const videoRef = useRef<HTMLIFrameElement>(null);
  const watchedVideos = userStats.watchedLessons || [];
  
  const premiumHistory = useMemo(() => 
    (userStats.recentActivity || [])
      .filter(a => a.type === 'aula' && a.metadata && a.metadata.platformId)
      .slice(0, 8),
  [userStats.recentActivity]);

  const handleResumeActivity = (act: any) => {
    if (act.metadata) {
      setSelectedPlatform(act.metadata.platformId);
      setSelectedCourse(act.metadata.courseName);
      setActiveVideo({ id: act.metadata.lessonId, title: act.title });
    }
  };

  const markAsWatched = async (id: string, forceState?: boolean) => {
    if ((!userStats.isPremium && !userStats.adm) || !auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    const isCurrentlyWatched = watchedVideos.includes(id);
    const targetState = forceState !== undefined ? forceState : !isCurrentlyWatched;
    if (targetState === isCurrentlyWatched) return;
    try {
      await updateDoc(userRef, { watchedLessons: targetState ? arrayUnion(id) : arrayRemove(id) });
      onAwardPoints?.(id);
    } catch (err) { console.error(err); }
  };

  const isOverLimit = (id: string) => {
    if (userStats.plan === 'premium' || userStats.adm) return false;
    if (userStats.openedContentIds?.includes(id)) return false;
    return (userStats.openedContentIds?.length || 0) >= 10;
  };

  const handleLessonSelect = async (lesson: VideoLesson, courseName?: string) => {
    const contentId = `aula_${lesson.id}`;
    const course = courseName || selectedCourse;
    if (isOverLimit(contentId)) { setActiveVideo(lesson); return; }
    setActiveVideo(lesson);
    if ((!userStats.isPremium && !userStats.adm) || !auth.currentUser) { onIncrementUsage?.(contentId); return; }
    onAddActivity({
      id: contentId, type: 'aula', title: lesson.title, subtitle: `${course}`,
      metadata: { platformId: selectedPlatform, courseName: course, lessonId: lesson.id }
    });
    onAwardPoints?.(contentId, 5);
    const userRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(userRef, { lastWatched: { lessonId: lesson.id, lessonTitle: lesson.title, courseName: course || '', platformId: selectedPlatform || '' } });
    } catch (err) { console.error(err); }
  };

  const getLessonsForCourse = (course: string) => {
    if (course === 'Embriologia' || course === 'Embriologia Animal') return EMBRIOLOGIA_LESSONS;
    if (course === 'Reprodução Humana') return REPRODUCAO_HUMANA_LESSONS;
    if (course === 'Pediatria 1') return PEDIATRIA_1_LESSONS;
    if (course === 'Hematologia') return HEMATOLOGIA_LESSONS;
    return [{ id: 'dQw4w9WgXcQ', title: `Aula 01: Introdução a ${course}`, duration: '15:00' }];
  };

  const currentCourses = useMemo(() => {
    if (selectedPlatform === 'sanarflix') return SANARFLIX_COURSES;
    if (selectedPlatform === 'devoltavest') return VEST_COURSES;
    if (selectedPlatform === 'medcof') return MEDCOF_COURSES;
    if (selectedPlatform === 'medcurso') return MEDCURSO_COURSES;
    return [];
  }, [selectedPlatform]);

  const filteredLessons = useMemo(() => {
    return getLessonsForCourse(selectedCourse || '');
  }, [selectedCourse]);

  if (!userStats.isPremium && !userStats.adm) {
    return (
      <div className="max-w-[1200px] mx-auto pt-10 pb-32 px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-16 bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-12 md:p-20 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-50 dark:bg-nexus-blue/10 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600 dark:text-nexus-blue"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 dark:text-nexus-text-title mb-4 tracking-tight">Área Premium Exclusiva</h1>
          <p className="text-neutral-500 dark:text-nexus-text-sec text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-8">Para acessar bibliotecas e videoaulas, assine o plano Premium.</p>
          <button className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-10 py-4 rounded-xl text-sm transition-all shadow-sm active:scale-[0.98]">Ver Planos Área Premium</button>
        </div>
      </div>
    );
  }

  // --- VIEW DO PLAYER ---
  if (activeVideo) {
    const isCompleted = watchedVideos.includes(activeVideo.id);
    const groupedLessons = filteredLessons.reduce((acc: any, lesson: any) => {
      const block = (lesson as any).block || 'Grade de Aulas';
      if (!acc[block]) acc[block] = [];
      acc[block].push(lesson);
      return acc;
    }, {});

    const progressValue = Math.round((watchedVideos.length / filteredLessons.length) * 100);

    return (
      <div className="fixed inset-0 z-[60] bg-[#0B1120] flex flex-col lg:flex-row animate-in fade-in duration-300 overflow-hidden">
        <div className="flex-grow flex flex-col overflow-y-auto no-scrollbar bg-black/40">
          <header className="h-20 shrink-0 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 z-50">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => { setActiveVideo(null); setSelectedCourse(null); }} 
                className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-all font-black text-[10px] uppercase tracking-widest group"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Voltar
              </button>
              <div className="h-8 w-px bg-white/10 hidden md:block" />
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3B82F6] leading-none mb-1.5">{selectedCourse}</p>
                <h2 className="text-sm font-black text-white truncate max-w-[200px] md:max-w-2xl italic">{activeVideo.title}</h2>
              </div>
            </div>
            
            <button 
              onClick={() => onNavigate?.('inicio')}
              className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white px-5 py-2 rounded-full border border-white/10 transition-all font-black text-[9px] uppercase tracking-widest"
            >
              Sair do Hub
            </button>
          </header>

          <div className="flex-grow flex flex-col items-center justify-start py-8 px-6 md:px-12">
            <div className="w-full max-w-[1400px] aspect-video bg-black shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden rounded-[2rem] border border-white/10 ring-1 ring-white/5">
              <NexusVideoPlayer 
                videoId={activeVideo.id} 
                title={activeVideo.title} 
                onComplete={() => markAsWatched(activeVideo.id, true)} 
              />
            </div>

            <div className="w-full max-w-[1400px] mt-12 pb-20">
              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pb-10 border-b border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] font-black uppercase tracking-widest rounded-md border border-[#3B82F6]/20">4K ULTRA HD</span>
                    <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest flex items-center gap-2">
                       <Clock size={12} /> {(activeVideo as any).duration || '12:00'}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">{activeVideo.title}</h1>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => markAsWatched(activeVideo.id)} 
                    className={`flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl hover:scale-105 active:scale-95 ${
                      isCompleted 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : <Play size={18} fill="currentColor" />}
                    {isCompleted ? 'Concluído' : 'Marcar Concluída'}
                  </button>
                  <button className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-all">
                     <Star size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3 mb-4">
                      <div className="w-8 h-px bg-[#3B82F6]/30" /> Sobre esta Aula
                    </h3>
                    <p className="text-[#9CA3AF] text-lg leading-relaxed font-medium">
                      Domine os conceitos fundamentais de {selectedCourse} com esta aula especializada. 
                      Focamos nos pontos mais cobrados em provas de residência e na prática clínica diária, 
                      utilizando uma metodologia integrada e visual.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {['#Hematologia', '#Residência', '#CicloClínico', '#Medcurso'].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black text-[#9CA3AF] border border-white/5 cursor-default hover:text-white transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#111827] rounded-[2rem] p-8 border border-white/5 space-y-6">
                   <h4 className="text-xs font-black text-white uppercase tracking-widest">Recursos Extras</h4>
                   <div className="space-y-3">
                      <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left flex items-center justify-between group transition-all">
                         <span className="text-[11px] font-black text-[#E5E7EB] uppercase tracking-widest">Resumo em PDF</span>
                         <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Award size={16} />
                         </div>
                      </button>
                      <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left flex items-center justify-between group transition-all">
                         <span className="text-[11px] font-black text-[#E5E7EB] uppercase tracking-widest">Flashcards Anki</span>
                         <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Star size={16} />
                         </div>
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-[400px] xl:w-[480px] bg-[#0B1120] border-l border-white/5 flex flex-col h-[500px] lg:h-full z-20">
          <div className="p-8 border-b border-white/5 bg-[#0B1120]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em]">Grade Curricular</h3>
              <div className="flex items-center gap-2">
                 <span className="text-2xl font-black text-white italic">{progressValue}%</span>
                 <span className="text-[10px] font-black text-[#3B82F6] uppercase">Done</span>
              </div>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressValue}%` }}
                className="h-full bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-6">
            {Object.keys(groupedLessons).map(block => (
              <div key={block} className="space-y-2">
                <p className="px-5 py-2 text-[9px] font-black text-[#3B82F6] uppercase tracking-[0.2em] bg-[#3B82F6]/10 rounded-lg w-fit mb-3">{block}</p>
                {groupedLessons[block].map((lesson: any, idx: number) => (
                  <button 
                    key={lesson.id} 
                    onClick={() => handleLessonSelect(lesson)} 
                    className={`w-full text-left p-5 rounded-[1.5rem] flex items-center gap-5 transition-all group/item ${
                      activeVideo.id === lesson.id 
                        ? 'bg-[#111827] border border-[#3B82F6]/40 shadow-2xl' 
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs transition-colors shadow-lg ${
                        watchedVideos.includes(lesson.id) 
                          ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                          : activeVideo.id === lesson.id 
                            ? 'bg-[#3B82F6] text-white' 
                            : 'bg-white/5 text-[#9CA3AF] border border-white/10'
                      }`}>
                        {watchedVideos.includes(lesson.id) ? <CheckCircle2 size={18} /> : (idx + 1).toString().padStart(2, '0')}
                      </div>
                    </div>

                    <div className="min-w-0 flex-grow">
                      <p className={`text-xs font-black leading-tight transition-colors ${
                        activeVideo.id === lesson.id ? 'text-white' : 'text-[#9CA3AF] group-hover/item:text-white'
                      }`}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                         <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#9CA3AF]/60 uppercase tracking-widest">
                            <PlayCircle size={12} /> {lesson.duration || '12:00'}
                         </div>
                         {activeVideo.id === lesson.id && (
                           <span className="text-[8px] font-black text-[#3B82F6] animate-pulse uppercase tracking-widest">Reproduzindo</span>
                         )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>
      </div>
    );
  }

  // --- VISTA PRINCIPAL (STREAMING STYLE) ---
  if (selectedPlatform) {
    const platform = PREMIUM_PLATFORMS.find(p => p.id === selectedPlatform);
    
    return (
      <div className="min-h-screen bg-[#0B1120] text-[#E5E7EB] animate-in fade-in duration-500 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12">
          <button 
            onClick={() => setSelectedPlatform(null)} 
            className="mb-12 flex items-center gap-3 text-[#9CA3AF] hover:text-white transition-all text-sm font-black uppercase tracking-[0.2em] group bg-white/5 px-6 py-2.5 rounded-full border border-white/10 w-fit"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Voltar ao Catálogo
          </button>

          <header className="mb-16 relative">
            <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-[#3B82F6] font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                 <div className="w-12 h-px bg-[#3B82F6]/30" /> {platform?.category || 'PLATAFORMA'}
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">
                {platform?.title}
              </h2>
              <p className="text-[#9CA3AF] text-lg font-medium max-w-2xl leading-relaxed">
                {platform?.description || 'Explore o conteúdo completo e acelere sua jornada de aprendizado.'}
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentCourses.map((course, idx) => {
              const theme = SPECIALTY_THEMES[course] || SPECIALTY_THEMES["Clínica Médica"];
              return (
                <motion.div 
                  key={course}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => {
                    setSelectedCourse(course);
                    const lessons = getLessonsForCourse(course);
                    if (lessons.length > 0) {
                      handleLessonSelect(lessons[0], course);
                    }
                  }}
                  className="group relative h-[320px] rounded-[2.5rem] bg-[#111827] border border-white/5 overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl hover:shadow-[#3B82F6]/5"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={theme.img} 
                      alt={course} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000 border-0" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/40 to-transparent" />
                  </div>

                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl backdrop-blur-md border border-white/10"
                        style={{ backgroundColor: `${theme.accent}20` }}
                      >
                        {theme.icon}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                            <Play size={16} fill="currentColor" className="ml-1" />
                         </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                         <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Especialidade</span>
                      </div>
                      <h3 className="text-3xl font-black text-white tracking-tighter leading-tight group-hover:text-[#3B82F6] transition-colors">{course}</h3>
                      <p className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-widest line-clamp-1 opacity-60 group-hover:opacity-100 transition-opacity">
                         {theme.desc}
                      </p>
                      
                      <div className="pt-2">
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full bg-gradient-to-r ${theme.gradient} opacity-40 group-hover:opacity-100 transition-opacity`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#E5E7EB] pb-32 overflow-x-hidden relative">
      {/* Global Exit Button (Since navbar is hidden) */}
      <div className="absolute top-8 left-8 z-50">
        <button 
          onClick={() => onNavigate?.('inicio')}
          className="flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 transition-all font-bold text-xs uppercase tracking-widest group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar ao Nexus
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?auto=format&fit=crop&q=80&w=1600" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-20 left-0 p-8 md:p-16 max-w-4xl space-y-4 md:space-y-6 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#3B82F6] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] bg-[#3B82F6]/10 w-fit px-4 py-1.5 rounded-full border border-[#3B82F6]/20"
          >
            <TrendingUp size={14} /> Destaque da Semana
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-black italic tracking-tighter"
          >
            Anemia de Doença Crônica
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#9CA3AF] text-lg md:text-2xl font-medium max-w-3xl leading-relaxed"
          >
            Hematologia • Aprenda a diferenciar as anemias microcíticas com foco em ferritina e transferrina. O tema mais cobrado em provas.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            <button 
              onClick={() => {
                setSelectedPlatform('medcurso');
                setSelectedCourse('Hematologia');
                handleLessonSelect(HEMATOLOGIA_LESSONS[1], 'Hematologia');
              }}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-10 md:px-14 py-4 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-4 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              <Play size={20} fill="currentColor" className="ml-1" /> Continuar Assistindo
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-4 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-4 transition-all border border-white/10">
              <Info size={20} /> Ver Detalhes
            </button>
          </motion.div>
        </div>
      </section>

      <div className="px-8 mt-0 relative z-20 space-y-24 py-20">
        {/* Continuar Assistindo */}
        {premiumHistory.length > 0 && (
          <section className="relative">
            <h3 className="text-xl md:text-3xl font-black text-white mb-8 italic flex items-center gap-4">
              Continuar Assistindo <ChevronRight className="text-[#3B82F6] w-6 h-6" />
            </h3>
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-10 -mx-8 px-8 scroll-smooth">
              {premiumHistory.map((act) => (
                <motion.div 
                  key={act.id} 
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  onClick={() => handleResumeActivity(act)} 
                  className="flex-none w-[280px] md:w-[400px] aspect-video bg-[#111827] rounded-[2rem] overflow-hidden cursor-pointer relative group shadow-2xl border border-white/5"
                >
                  <img 
                    src={SPECIALTY_THEMES[act.metadata?.courseName]?.img || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400"} 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity"
                    alt={act.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-2xl">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h5 className="text-base font-black text-white truncate">{act.title}</h5>
                    <span className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-widest mt-1.5 block">{act.subtitle}</span>
                    <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-[#3B82F6] w-[70%]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Mais de Hematologia */}
        <section>
          <h3 className="text-xl md:text-3xl font-black text-white mb-8 italic flex items-center gap-4">
            Explosão de <span className="text-red-500">Hematologia</span> <div className="h-px flex-grow bg-red-500/20" />
          </h3>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-10 -mx-8 px-8">
            {HEMATOLOGIA_LESSONS.slice(0, 10).map((lesson) => (
              <motion.div 
                key={lesson.id} 
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                   setSelectedPlatform('medcurso');
                   setSelectedCourse('Hematologia');
                   handleLessonSelect(lesson, 'Hematologia');
                }}
                className="flex-none w-[240px] md:w-[320px] bg-[#111827] rounded-[2rem] overflow-hidden cursor-pointer relative group shadow-xl border border-white/5"
              >
                <div className="aspect-[16/10] bg-[#1F2937] relative">
                   <img 
                    src={`https://img.youtube.com/vi/${lesson.id}/mqdefault.jpg`}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                    alt={lesson.title}
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                   <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-black/60 text-[10px] font-black text-white backdrop-blur-md">
                      {lesson.duration}
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="text-white w-12 h-12" />
                   </div>
                </div>
                <div className="p-6">
                  <h5 className="text-sm font-black text-[#E5E7EB] line-clamp-1 group-hover:text-[#3B82F6] transition-colors">{lesson.title}</h5>
                  <div className="flex items-center gap-4 mt-3">
                     <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">AULA HD</span>
                     <span className="text-[10px] font-black text-red-500/80 uppercase">RESIDRE</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recomendado para Você */}
        <section>
          <h3 className="text-xl md:text-3xl font-black text-white mb-8 italic flex items-center gap-4">
            Recomendado para Você <Star className="text-yellow-500 w-6 h-6 fill-current" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {EMBRIOLOGIA_LESSONS.slice(0, 4).map((lesson) => (
              <motion.div 
                key={lesson.id}
                whileHover={{ y: -10 }}
                onClick={() => {
                  setSelectedPlatform('devoltavest');
                  setSelectedCourse('Embriologia');
                  handleLessonSelect(lesson, 'Embriologia');
                }}
                className="bg-[#111827] rounded-[2.5rem] p-1 border-2 border-transparent hover:border-[#3B82F6]/30 overflow-hidden cursor-pointer shadow-2xl transition-all"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                       <Award size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#3B82F6] uppercase tracking-[0.2em]">Sugerido</p>
                      <h4 className="text-base font-black text-white truncate">{lesson.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-10">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-[#9CA3AF]">
                       <Clock size={14} /> {lesson.duration}
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                       <Play size={16} fill="currentColor" className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Plataformas (Catalog Browsing) */}
        <section className="pb-32">
          <h3 className="text-xl md:text-3xl font-black text-white mb-10 italic">Explorar Plataformas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {PREMIUM_PLATFORMS.map((platform) => (
                <motion.div 
                  key={platform.id} 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedPlatform(platform.id)} 
                  className="group relative aspect-video rounded-[2.5rem] bg-[#111827] border border-white/5 overflow-hidden cursor-pointer transition-all shadow-2xl"
                >
                  <img 
                    src={platform.image} 
                    alt={platform.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                    <h4 className="text-2xl font-black text-white tracking-tight italic">{platform.title}</h4>
                    <p className="text-[11px] text-[#9CA3AF] mt-1.5 font-bold uppercase tracking-widest">{platform.category}</p>
                  </div>
                </motion.div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PremiumView;
