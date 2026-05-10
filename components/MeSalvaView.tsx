import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Folder, 
  Video, 
  FileText, 
  ChevronRight,
  Download,
  Info,
  Play
} from 'lucide-react';
import { VideoLesson } from '../types';

interface MeSalvaViewProps {
  onBack: () => void;
  onLessonSelect: (lesson: VideoLesson, courseName: string, playlist?: VideoLesson[]) => void;
  watchedVideos: string[];
}

interface MeSalvaItem {
  id: string;
  title: string;
  type: 'folder' | 'lesson' | 'material';
  children?: MeSalvaItem[];
  id_youtube?: string;
  duration?: string;
  size?: string;
  image?: string;
}

const MESALVA_DATA: MeSalvaItem[] = [
  {
    id: 'anatomia',
    title: 'Anatomia',
    type: 'folder',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600',
    children: [
      {
        id: 'articulacoes',
        title: 'Articulações',
        type: 'folder',
        image: 'https://images.unsplash.com/photo-1576091160399-112521d4183a?auto=format&fit=crop&q=80&w=600',
        children: [
          { id: '6JgV-hJFcAw', title: 'SMES 04 Músculos da articulação escapulotorácica', type: 'lesson', id_youtube: '6JgV-hJFcAw', duration: '9:16' },
          { id: '8BWzF4sjdQU', title: 'SMEI03 Articulação do complexo do quadril', type: 'lesson', id_youtube: '8BWzF4sjdQU', duration: '9:51' },
          { id: 'ORdwoR3l3jM', title: 'ISME06 Articulacoes moveis diartroses sinoviais uniaxiais', type: 'lesson', id_youtube: 'ORdwoR3l3jM', duration: '16:31' },
          { id: 'SwQ_3btxD_U', title: 'SMEI07 Articulações do complexo do joelho', type: 'lesson', id_youtube: 'SwQ_3btxD_U', duration: '11:28' },
          { id: 'TGrodlRcbnQ', title: 'ISME05 Articulacoes imoveis anfiartroses e semi moveis diartroanfiartroses', type: 'lesson', id_youtube: 'TGrodlRcbnQ', duration: '13:33' },
          { id: 'Ulm50n7fdSY', title: 'SMES 03 Articulações do complexo do ombro', type: 'lesson', id_youtube: 'Ulm50n7fdSY', duration: '14:45' },
          { id: 'aIGo9A0KrOQ', title: 'SMES 10 Articulações do complexo punho e mão', type: 'lesson', id_youtube: 'aIGo9A0KrOQ', duration: '10:22' },
          { id: 'i6ZrFptkJUQ', title: 'ISME07 Articulacoes moveis diartroses sinoviais biaxiais, poliaxiais', type: 'lesson', id_youtube: 'i6ZrFptkJUQ', duration: '10:04' },
          { id: 'nTiJEr5DeT4', title: 'SMES 06 Ossos do complexo do cotovelo antebraco', type: 'lesson', id_youtube: 'nTiJEr5DeT4', duration: '12:36' },
          { id: 'tYYbbndBbEo', title: 'SMES 07 Articulacoes do complexo do cotovelo antebraco', type: 'lesson', id_youtube: 'tYYbbndBbEo', duration: '11:13' },
          { id: 'uyYBEfpCV6M', title: 'SMES 05 Músculos da articulação glenoumeral', type: 'lesson', id_youtube: 'uyYBEfpCV6M', duration: '15:52' },
          { id: 'vW7u34ounpA', title: 'SMEI11 Articulações do complexo do tornozelo', type: 'lesson', id_youtube: 'vW7u34ounpA', duration: '13:29' },
        ]
      }
    ]
  }
];

const MeSalvaView: React.FC<MeSalvaViewProps> = ({ onBack, onLessonSelect, watchedVideos }) => {
  const [path, setPath] = useState<MeSalvaItem[]>([]);
  
  const currentItems = path.length === 0 
    ? MESALVA_DATA 
    : path[path.length - 1].children || [];

  const handleItemClick = (item: MeSalvaItem) => {
    if (item.type === 'folder') {
      setPath([...path, item]);
    } else if (item.type === 'lesson' && item.id_youtube) {
      const playlist = currentItems
        .filter(i => i.type === 'lesson' && i.id_youtube)
        .map(i => ({ 
          id: i.id_youtube!, 
          title: i.title,
          duration: i.duration 
        })) as any;
        
      onLessonSelect({ id: item.id_youtube, title: item.title }, 'Me Salva!', playlist);
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
    <div className="min-h-screen bg-[#0B0101] text-[#E5E7EB] animate-in fade-in duration-500 pb-32">
      {/* Hero Section for Me Salva! if at root */}
      {path.length === 0 && (
        <div className="relative h-[45vh] w-full overflow-hidden mb-12">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover opacity-50 scale-105"
            alt="Me Salva!"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0101] via-[#0B0101]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-12 max-w-[1400px] mx-auto right-0 flex flex-col items-start gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 bg-rose-600/20 border border-rose-500/30 text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full backdrop-blur-md"
            >
              Plataforma de Ensino Online
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white italic tracking-tighter"
            >
              ME <span className="text-rose-600">SALVA!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#9CA3AF] text-xl max-w-2xl font-medium"
            >
              O Me Salva! é a maior plataforma de educação online do Brasil, focada em ajudar você a atingir seus objetivos acadêmicos.
            </motion.p>
          </div>
        </div>
      )}

      <div className={`max-w-[1400px] mx-auto px-6 md:px-12 ${path.length === 0 ? 'pt-0' : 'pt-12'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={navigateBack}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-lg shadow-rose-600/10"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter italic flex items-center gap-3">
                Me <span className="text-rose-600 not-italic font-normal">Salva!</span>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Estudar</span>
                {path.map((p, idx) => (
                  <React.Fragment key={p.id}>
                    <ChevronRight size={10} className="text-white/20" />
                    <span className={`text-[10px] font-black uppercase tracking-widest truncate max-w-[150px] ${idx === path.length - 1 ? 'text-rose-600' : 'text-[#9CA3AF]'}`}>
                      {p.title}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                className={`group relative aspect-[3/4] rounded-[3rem] bg-[#1a0f0f] overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 ${
                  item.type === 'lesson' && watchedVideos.includes(item.id_youtube || '') ? 'ring-2 ring-rose-600/50' : 'border border-white/5'
                }`}
              >
                {item.image ? (
                  <>
                    <img 
                      src={item.image} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0101] via-[#0B0101]/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[#0B0101]/20 group-hover:bg-[#1a0f0f] transition-colors" />
                )}

                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md ${
                    item.type === 'folder' ? 'bg-black/60 text-rose-600' : 
                    item.type === 'lesson' ? 'bg-rose-600/20 text-rose-400' : 
                    'bg-emerald-600/20 text-emerald-400'
                  }`}>
                    {item.type === 'folder' && <Folder size={24} />}
                    {item.type === 'lesson' && <Video size={24} />}
                    {item.type === 'material' && <FileText size={24} />}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-rose-500/60 uppercase tracking-[0.2em]">
                      {item.type === 'folder' ? 'Módulo' : item.type === 'lesson' ? 'Videoaula' : 'Material'}
                    </span>
                    <h3 className="text-xl font-black text-white italic tracking-tight leading-tight group-hover:text-rose-500 transition-colors uppercase">
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
                    <ChevronRight size={16} className="text-rose-600 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {item.type === 'lesson' && watchedVideos.includes(item.id_youtube || '') && (
                  <div className="absolute top-6 left-6 px-3 py-1 bg-rose-600 text-[9px] font-black text-white uppercase tracking-widest rounded-full shadow-lg">
                    Visto
                  </div>
                )}
                
                {item.type === 'material' && (
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Download size={18} className="text-rose-400" />
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
             <h4 className="text-xl font-black text-white italic uppercase">Nenhum Conteúdo</h4>
             <p className="text-[#9CA3AF] text-sm mt-2">Esta pasta ainda não possui materiais disponíveis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeSalvaView;
