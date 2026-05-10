
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Folder, 
  Video, 
  FileText, 
  ChevronRight,
  Play,
  Download,
  Info
} from 'lucide-react';
import { VideoLesson } from '../types';

interface JalekoViewProps {
  onBack: () => void;
  onLessonSelect: (lesson: VideoLesson, courseName: string, playlist?: VideoLesson[]) => void;
  watchedVideos: string[];
}

interface JalekoItem {
  id: string;
  title: string;
  type: 'folder' | 'lesson' | 'material';
  children?: JalekoItem[];
  id_youtube?: string;
  duration?: string;
  size?: string;
  image?: string;
}

const JALEKO_DATA: JalekoItem[] = [
  {
    id: 'anatomia',
    title: 'Anatomia',
    type: 'folder',
    image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600',
    children: [
      {
        id: 'sistema-locomotor',
        title: 'Sistema Locomotor',
        type: 'folder',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
        children: [
          {
            id: 'articulacoes',
            title: 'Articulações',
            type: 'folder',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
            children: [
              {
                id: 'playlist-intro-art',
                title: 'Introdução às Articulações',
                type: 'folder',
                image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
                children: [
                  {
                    id: 'I0nnjK9Ga14',
                    title: '01 Sistema Articular',
                    type: 'lesson',
                    id_youtube: 'I0nnjK9Ga14',
                    duration: '18:34'
                  },
                  {
                    id: 'Gjg628pXXHM',
                    title: '02 Articulação Sinovial',
                    type: 'lesson',
                    id_youtube: 'Gjg628pXXHM',
                    duration: '17:17'
                  },
                  {
                    id: 'tBmhLMA3euw',
                    title: '03 Classificação das Articulações',
                    type: 'lesson',
                    id_youtube: 'tBmhLMA3euw',
                    duration: '14:09'
                  },
                  {
                    id: '_-enCQJvyNc',
                    title: 'Classificação Geral das Articulações',
                    type: 'lesson',
                    id_youtube: '_-enCQJvyNc',
                    duration: '17:39'
                  },
                ]
              },
              {
                id: 'playlist-art-especiais',
                title: 'Articulações Especiais',
                type: 'folder',
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
                children: [
                  { id: 'xQ3TBbwPb1g', title: '01 Esternoclavicular', type: 'lesson', id_youtube: 'xQ3TBbwPb1g', duration: '15:48' },
                  { id: 'KOgsHAffwo8', title: '02 Acromioclavicular', type: 'lesson', id_youtube: 'KOgsHAffwo8', duration: '17:34' },
                  { id: 'oxttS_m3zCI', title: '03 Glenoumeral (Parte 1)', type: 'lesson', id_youtube: 'oxttS_m3zCI', duration: '17:01' },
                  { id: 'p9InuTg2hA0', title: '03 Glenoumeral (Parte 2)', type: 'lesson', id_youtube: 'p9InuTg2hA0', duration: '17:08' },
                  { id: 'enC05w1dVXg', title: '04 Cotovelo', type: 'lesson', id_youtube: 'enC05w1dVXg', duration: '16:54' },
                  { id: 'qGO0BtPjaYY', title: '05 Radioulnar', type: 'lesson', id_youtube: 'qGO0BtPjaYY', duration: '16:40' },
                  { id: 'eSHVu3auyYk', title: '06 Radiocárpica', type: 'lesson', id_youtube: 'eSHVu3auyYk', duration: '16:23' },
                  { id: 'k22kY_Fyb_k', title: '07 Quadril', type: 'lesson', id_youtube: 'k22kY_Fyb_k', duration: '17:01' },
                  { id: 'Dm9W1ka6xKI', title: '08 Patelofemural', type: 'lesson', id_youtube: 'Dm9W1ka6xKI', duration: '16:29' },
                  { id: 'iGZK5zl2huI', title: '09 Femurotibial', type: 'lesson', id_youtube: 'iGZK5zl2huI', duration: '17:11' },
                  { id: 'liQ2oJTA1kg', title: '10 Articulações do Tornozelo', type: 'lesson', id_youtube: 'liQ2oJTA1kg', duration: '16:32' },
                ]
              },
              {
                id: 'mat-extras-art',
                title: 'Materiais Extras',
                type: 'folder',
                image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
                children: [
                  {
                    id: 'mat-1',
                    title: 'Mapa Mental: Articulações',
                    type: 'material',
                    size: '2.4 MB'
                  },
                  {
                    id: 'mat-2',
                    title: 'Apostila Completa - Sistema Locomotor',
                    type: 'material',
                    size: '15.8 MB'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

const JalekoView: React.FC<JalekoViewProps> = ({ onBack, onLessonSelect, watchedVideos }) => {
  const [path, setPath] = useState<JalekoItem[]>([]);
  
  const currentItems = path.length === 0 
    ? JALEKO_DATA 
    : path[path.length - 1].children || [];

  const handleItemClick = (item: JalekoItem) => {
    if (item.type === 'folder') {
      setPath([...path, item]);
    } else if (item.type === 'lesson' && item.id_youtube) {
      // Create a playlist of all lessons in the current folder
      const playlist = currentItems
        .filter(i => i.type === 'lesson' && i.id_youtube)
        .map(i => ({ 
          id: i.id_youtube!, 
          title: i.title,
          duration: i.duration 
        })) as any;
        
      onLessonSelect({ id: item.id_youtube, title: item.title }, 'Jaleko Artmed', playlist);
    }
  };

  const navigateBack = () => {
    if (path.length === 0) {
      onBack();
    } else {
      setPath(path.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#E5E7EB] animate-in fade-in duration-500 pb-32">
      {/* Hero Section for Jaleko if at root */}
      {path.length === 0 && (
        <div className="relative h-[40vh] w-full overflow-hidden mb-12">
          <img 
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Jaleko Artmed"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-12 max-w-[1400px] mx-auto right-0 flex flex-col items-start gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full backdrop-blur-md"
            >
              Parceiro Oficial Artmed
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white italic tracking-tighter"
            >
              JALEKO <span className="text-emerald-500">ARTMED</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#9CA3AF] text-lg max-w-2xl font-medium"
            >
              Acelere sua formação médica com a plataforma que une tecnologia, didática e os melhores professores do Brasil.
            </motion.p>
          </div>
        </div>
      )}

      <div className={`max-w-[1400px] mx-auto px-6 md:px-12 ${path.length === 0 ? 'pt-0' : 'pt-12'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={navigateBack}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-lg shadow-emerald-500/10"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter italic flex items-center gap-3">
                Jaleko <span className="text-emerald-500 not-italic font-normal">Artmed</span>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Início</span>
                {path.map((p, idx) => (
                  <React.Fragment key={p.id}>
                    <ChevronRight size={10} className="text-white/20" />
                    <span className={`text-[10px] font-black uppercase tracking-widest truncate max-w-[150px] ${idx === path.length - 1 ? 'text-emerald-500' : 'text-[#9CA3AF]'}`}>
                      {p.title}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleItemClick(item)}
                className={`group relative aspect-[4/5] rounded-[2.5rem] bg-[#111827] overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 ${
                  item.type === 'lesson' && watchedVideos.includes(item.id_youtube || '') ? 'ring-2 ring-emerald-500/50' : 'border border-white/5'
                }`}
              >
                {/* Background Image for Folders */}
                {item.type === 'folder' && item.image ? (
                  <>
                    <img 
                      src={item.image} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[#111827] group-hover:bg-[#1f2937] transition-colors" />
                )}

                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md ${
                    item.type === 'folder' ? 'bg-black/60 text-amber-500' : 
                    item.type === 'lesson' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {item.type === 'folder' && <Folder size={24} />}
                    {item.type === 'lesson' && <Video size={24} />}
                    {item.type === 'material' && <FileText size={24} />}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">
                      {item.type === 'folder' ? 'Módulo' : item.type === 'lesson' ? 'Aula HD' : 'PDF Material'}
                    </span>
                    <h3 className="text-xl font-black text-white italic tracking-tight leading-tight group-hover:text-emerald-400 transition-colors uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-full flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                    {item.duration && (
                      <span className="text-[10px] font-black text-[#9CA3AF] uppercase">
                        {item.duration}
                      </span>
                    )}
                    {item.size && (
                      <span className="text-[10px] font-black text-[#9CA3AF] uppercase">
                        {item.size}
                      </span>
                    )}
                    <ChevronRight size={16} className="text-[#9CA3AF] transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Progress Indicator for Watched Lessons */}
                {item.type === 'lesson' && watchedVideos.includes(item.id_youtube || '') && (
                  <div className="absolute top-6 left-6 px-3 py-1 bg-emerald-500 text-[9px] font-black text-white uppercase tracking-widest rounded-full shadow-lg">
                    Concluído
                  </div>
                )}
                
                {/* Download Icon for materials */}
                {item.type === 'material' && (
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Download size={18} className="text-emerald-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {currentItems.length === 0 && (
          <div className="py-24 text-center">
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Info size={32} className="text-[#9CA3AF]" />
             </div>
             <h4 className="text-xl font-black text-white italic uppercase">Pasta Vazia</h4>
             <p className="text-[#9CA3AF] text-sm mt-2">Nenhum conteúdo encontrado neste diretório.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JalekoView;
