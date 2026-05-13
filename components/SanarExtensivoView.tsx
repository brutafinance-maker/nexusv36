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
  Play,
  Stethoscope,
  Scissors,
  Baby,
  Activity,
  ShieldCheck,
  Brain,
  Layers
} from 'lucide-react';
import { VideoLesson } from '../types';

interface SanarExtensivoViewProps {
  onBack: () => void;
  onLessonSelect: (lesson: VideoLesson, courseName: string, playlist?: VideoLesson[]) => void;
  watchedVideos: string[];
}

interface SanarItem {
  id: string;
  title: string;
  type: 'folder' | 'lesson' | 'material';
  children?: SanarItem[];
  id_youtube?: string;
  duration?: string;
  size?: string;
  image?: string;
  icon?: React.ReactNode;
}

const SANAR_DATA: SanarItem[] = [
  {
    id: 'cirurgia',
    title: 'Cirurgia',
    type: 'folder',
    icon: <Scissors size={24} />,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
    children: [
      { id: 'cabeça-pescoço', title: 'Cirurgia de Cabeça e Pescoço', type: 'folder' },
      { id: 'aparelho-digestivo', title: 'Cirurgia do Aparelho Digestivo', type: 'folder' },
      { id: 'trauma', title: 'Cirurgia do Trauma', type: 'folder' },
      { id: 'geral', title: 'Cirurgia Geral', type: 'folder' },
      { id: 'infantil', title: 'Cirurgia Infantil', type: 'folder' },
      { id: 'plástica', title: 'Cirurgia Plástica', type: 'folder' },
      { id: 'vascular', title: 'Cirurgia Vascular', type: 'folder' },
      { id: 'perioperatório', title: 'Perioperatório', type: 'folder' },
      { id: 'urologia', title: 'Urologia', type: 'folder' },
    ]
  },
  {
    id: 'clinica-medica',
    title: 'Clínica Médica',
    type: 'folder',
    icon: <Stethoscope size={24} />,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    children: [
      { id: 'cardiologia', title: 'Cardiologia', type: 'folder' },
      { id: 'endocrinologia', title: 'Endocrinologia', type: 'folder' },
      { id: 'hematologia', title: 'Hematologia', type: 'folder' },
      { id: 'infectologia', title: 'Infectologia', type: 'folder' },
      { id: 'nefrologia', title: 'Nefrologia', type: 'folder' },
      { id: 'neurologia', title: 'Neurologia', type: 'folder' },
      { id: 'pneumologia', title: 'Pneumologia', type: 'folder' },
      { id: 'reumatologia', title: 'Reumatologia', type: 'folder' },
    ]
  },
  {
    id: 'extras',
    title: 'Extras',
    type: 'folder',
    icon: <Layers size={24} />,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
    children: [
      { id: 'oftalmologia', title: 'Oftalmologia', type: 'folder' },
      { id: 'ortopedia', title: 'Ortopedia', type: 'folder' },
      { id: 'terapia-intensiva', title: 'Terapia Intensiva', type: 'folder' },
    ]
  },
  {
    id: 'go',
    title: 'Ginecologia e Obstetrícia',
    type: 'folder',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600',
    children: [
      { id: 'ginecologia', title: 'Ginecologia', type: 'folder' },
      { id: 'obstetricia', title: 'Obstetrícia', type: 'folder' },
    ]
  },
  {
    id: 'mentoria',
    title: 'Mentoria',
    type: 'folder',
    icon: <Brain size={24} />,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    children: [
      { id: 'modulo-1', title: 'Módulo 1', type: 'folder' },
      { id: 'modulo-2', title: 'Módulo 2', type: 'folder' },
      { id: 'modulo-3', title: 'Módulo 3', type: 'folder' },
      { id: 'modulo-4', title: 'Módulo 4', type: 'folder' },
    ]
  },
  {
    id: 'pediatria',
    title: 'Pediatria',
    type: 'folder',
    icon: <Baby size={24} />,
    image: 'https://images.unsplash.com/photo-1519689689353-897c1d3609b1?auto=format&fit=crop&q=80&w=600',
    children: [
      { 
        id: 'endocrino-ped', 
        title: 'Endocrinologia Pediátrica', 
        type: 'folder',
        children: [
          { id: 'Zm1x2mYlYzo', title: 'Puberdade precoce 1', type: 'lesson', id_youtube: 'Zm1x2mYlYzo', duration: '4:28' },
          { id: 's_D-U_D-U-U', title: 'Etiologia', type: 'lesson', id_youtube: 's_D-U_D-U-U', duration: '4:03' },
          { id: 'u_D-U_D-U-U', title: 'Estágios de Tanner', type: 'lesson', id_youtube: 'u_D-U_D-U-U', duration: '4:49' },
        ]
      },
      { id: 'gastro-ped', title: 'Gastroenterologia Pediátrica', type: 'folder' },
      { id: 'neonatologia', title: 'Neonatologia', type: 'folder' },
      { 
        id: 'onco-ped', 
        title: 'Oncologia Pediátrica', 
        type: 'folder',
        children: [
          { id: '_YEur0I1vYo', title: 'Osteossarcoma Condrossarcoma', type: 'lesson', id_youtube: '_YEur0I1vYo', duration: '4:44' },
          { id: 'l_0O9uG9G6E', title: 'Sarcoma de Ewing e Mieloma múltiplo', type: 'lesson', id_youtube: 'l_0O9uG9G6E', duration: '4:07' },
        ]
      },
      { 
        id: 'pediatria-geral', 
        title: 'Pediatria Geral', 
        type: 'folder',
        children: [
          { id: 'v_D-U_D-U-U', title: 'Tipos de aleitamento materno', type: 'lesson', id_youtube: 'v_D-U_D-U-U', duration: '5:02' },
          { id: 'PR_1gmwa4Bw', title: 'Fisiologia e funções do leite materno', type: 'lesson', id_youtube: 'PR_1gmwa4Bw', duration: '7:38' },
          { id: 'GiZHlAm58XM', title: 'Marcos do desenvolvimento neuropsicomotor', type: 'lesson', id_youtube: 'GiZHlAm58XM', duration: '6:39' },
          { id: 'f_V0R5Z_T0E', title: 'Alimentação precoce', type: 'lesson', id_youtube: 'f_V0R5Z_T0E', duration: '6:43' },
          { id: '4_PVElbmlOQ', title: 'Dislipidemia', type: 'lesson', id_youtube: '4_PVElbmlOQ', duration: '3:36' },
          { id: 'cyeXhOIUJqU', title: 'Hipovitaminose E, C, B1 e B3', type: 'lesson', id_youtube: 'cyeXhOIUJqU', duration: '5:20' },
          { id: 'uD0-U_D-U-U', title: 'Quadro clínico', type: 'lesson', id_youtube: 'uD0-U_D-U-U', duration: '4:56' },
          { id: 'eRrPIFdqY0A', title: 'Aspectos gerais', type: 'lesson', id_youtube: 'eRrPIFdqY0A', duration: '7:48' },
          { id: 'PAY-RCG37_4', title: 'Classificação nas curvas de referência', type: 'lesson', id_youtube: 'PAY-RCG37_4', duration: '8:02' },
          { id: '0N7Ktdy81F4', title: 'Profilaxia do tétano', type: 'lesson', id_youtube: '0N7Ktdy81F4', duration: '3:29' },
          { id: 'CBUnoImpQjY', title: 'Atualização vacinal', type: 'lesson', id_youtube: 'CBUnoImpQjY', duration: '5:12' },
          { id: '_Nwy8RTa9oY', title: 'Consulta e ética', type: 'lesson', id_youtube: '_Nwy8RTa9oY', duration: '5:17' },
          { id: 'RonCmAMarns', title: 'Exantema súbito', type: 'lesson', id_youtube: 'RonCmAMarns', duration: '4:28' },
          { id: 'WEWYL97_8Hk', title: 'Rubéola', type: 'lesson', id_youtube: 'WEWYL97_8Hk', duration: '5:06' },
          { id: 't_D-U_D-U-U', title: 'Eritema infeccioso', type: 'lesson', id_youtube: 't_D-U_D-U-U', duration: '5:54' },
          { id: 'U-xAMd_6wRw', title: 'Doença mão pé boca', type: 'lesson', id_youtube: 'U-xAMd_6wRw', duration: '4:03' },
        ]
      },
      { 
        id: 'pneumo-ped', 
        title: 'Pneumologia Pediátrica', 
        type: 'folder',
        children: [
          { id: 'Z_D-U_D-U-U', title: 'Resfriado comum', type: 'lesson', id_youtube: 'Z_D-U_D-U-U', duration: '4:37' },
          { id: 'Y_D-U_D-U-U', title: 'Otite média aguda Quadro clínico', type: 'lesson', id_youtube: 'Y_D-U_D-U-U', duration: '5:35' },
          { id: 'KTvSIPyCHfc', title: 'Faringite aguda Diagnósticos diferenciais', type: 'lesson', id_youtube: 'KTvSIPyCHfc', duration: '5:49' },
          { id: '-Y6-fJ6w-vQ', title: 'Etiologia pneumonia comunitária na pediatria', type: 'lesson', id_youtube: '-Y6-fJ6w-vQ', duration: '4:50' },
          { id: 'QTNSqB0nMEM', title: 'Quadro clínico pcnp', type: 'lesson', id_youtube: 'QTNSqB0nMEM', duration: '5:34' },
          { id: 'PCed8P9F-Kg', title: 'Exames complementares pcnp', type: 'lesson', id_youtube: 'PCed8P9F-Kg', duration: '3:50' },
          { id: 'LWd4WPofQWo', title: 'Tratamento pcnp', type: 'lesson', id_youtube: 'LWd4WPofQWo', duration: '5:09' },
          { id: 'W_D-U_D-U-U', title: 'Pneumonia atípica', type: 'lesson', id_youtube: 'W_D-U_D-U-U', duration: '4:14' },
          { id: 'X_D-U_D-U-U', title: 'Conceito e fisiologia', type: 'lesson', id_youtube: 'X_D-U_D-U-U', duration: '5:34' },
          { id: 'V_D-U_D-U-U', title: 'Manifestações clínicas e diagnóstico', type: 'lesson', id_youtube: 'V_D-U_D-U-U', duration: '4:45' },
          { id: 'PVX-YU9z7iU', title: 'Tratamento', type: 'lesson', id_youtube: 'PVX-YU9z7iU', duration: '5:41' },
        ]
      },
      { 
        id: 'urgencias-ped', 
        title: 'Urgências Pediátricas', 
        type: 'folder',
        children: [
          { id: 'f3p_70XNf5I', title: 'Conceito e epidemiologia', type: 'lesson', id_youtube: 'f3p_70XNf5I', duration: '5:19' },
          { id: 'w_D-U_D-U-U', title: 'Obstrução de vias aéreas superiores por corpo estranho', type: 'lesson', id_youtube: 'w_D-U_D-U-U', duration: '4:48' },
          { id: 'JdcHvxZSEQE', title: 'Quadro clínico UP', type: 'lesson', id_youtube: 'JdcHvxZSEQE', duration: '3:55' },
          { id: 'qoON9BLjFLM', title: 'Tratamento UP', type: 'lesson', id_youtube: 'qoON9BLjFLM', duration: '5:23' },
          { id: 'r_D-U_D-U-U', title: 'Quadro geral UP', type: 'lesson', id_youtube: 'r_D-U_D-U-U', duration: '6:04' },
          { id: 'a_D-U_D-U-U', title: 'Etiologia e Fisiopatologia UP', type: 'lesson', id_youtube: 'a_D-U_D-U-U', duration: '5:36' },
          { id: 'O5dxFTTvkIA', title: 'Suporte avançado', type: 'lesson', id_youtube: 'O5dxFTTvkIA', duration: '6:14' },
          { id: '14cg7INE9MM', title: 'Taqui e bradicardias na emergência', type: 'lesson', id_youtube: '14cg7INE9MM', duration: '5:38' },
          { id: 'b_D-U_D-U-U', title: 'Convulsão febril', type: 'lesson', id_youtube: 'b_D-U_D-U-U', duration: '8:16' },
        ]
      },
    ]
  },
  {
    id: 'preventiva',
    title: 'Preventiva',
    type: 'folder',
    icon: <ShieldCheck size={24} />,
    image: 'https://images.unsplash.com/photo-1576091160550-217359f47f6a?auto=format&fit=crop&q=80&w=600',
    children: [
      { id: 'epidemiologia', title: 'Epidemiologia', type: 'folder' },
      { id: 'estatística', title: 'Estatística', type: 'folder' },
      { id: 'saúde-coletiva', title: 'Saúde Coletiva', type: 'folder' },
    ]
  }
];

const SanarExtensivoView: React.FC<SanarExtensivoViewProps> = ({ onBack, onLessonSelect, watchedVideos }) => {
  const [path, setPath] = useState<SanarItem[]>([]);
  
  const currentItems = path.length === 0 
    ? SANAR_DATA 
    : path[path.length - 1].children || [];

  const handleItemClick = (item: SanarItem) => {
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
        
      onLessonSelect({ id: item.id_youtube, title: item.title }, 'Sanar Extensivo', playlist);
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
    <div className="min-h-screen bg-[#070B14] text-[#E5E7EB] animate-in fade-in duration-500 pb-32">
      {/* Hero Section for Sanar if at root */}
      {path.length === 0 && (
        <div className="relative h-[45vh] w-full overflow-hidden mb-12">
          <img 
            src="https://raw.githubusercontent.com/samielabud-ui/nexus-capas/main/banner-sanar2.webp" 
            className="w-full h-full object-cover opacity-50 scale-105"
            alt="Sanar Extensivo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-12 max-w-[1400px] mx-auto right-0 flex flex-col items-start gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full backdrop-blur-md"
            >
              Extensivo 2024
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white italic tracking-tighter"
            >
              SANAR <span className="text-blue-500">EXTENSIVO</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#9CA3AF] text-xl max-w-2xl font-medium"
            >
              Domine as grandes áreas da medicina com o curso preparatório mais completo para residência médica do Brasil.
            </motion.p>
          </div>
        </div>
      )}

      <div className={`max-w-[1400px] mx-auto px-6 md:px-12 ${path.length === 0 ? 'pt-0' : 'pt-12'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={navigateBack}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-lg shadow-blue-600/10"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter italic flex items-center gap-3">
                Sanar <span className="text-blue-500 not-italic font-normal">Extensivo</span>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Catálogo</span>
                {path.map((p, idx) => (
                  <React.Fragment key={p.id}>
                    <ChevronRight size={10} className="text-white/20" />
                    <span className={`text-[10px] font-black uppercase tracking-widest truncate max-w-[150px] ${idx === path.length - 1 ? 'text-blue-500' : 'text-[#9CA3AF]'}`}>
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
                className={`group relative aspect-[3/4] rounded-[3rem] bg-[#0F172A] overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 ${
                  item.type === 'lesson' && watchedVideos.includes(item.id_youtube || '') ? 'ring-2 ring-blue-500/50' : 'border border-white/5'
                }`}
              >
                {item.image ? (
                  <>
                    <img 
                      src={item.image} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50"
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[#0F172A] group-hover:bg-[#1E293B] transition-colors" />
                )}

                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md ${
                    item.type === 'folder' ? 'bg-black/60 text-blue-500' : 
                    item.type === 'lesson' ? 'bg-blue-600/20 text-blue-400' : 
                    'bg-emerald-600/20 text-emerald-400'
                  }`}>
                    {item.icon ? item.icon : (
                      <>
                        {item.type === 'folder' && <Folder size={24} />}
                        {item.type === 'lesson' && <Video size={24} />}
                        {item.type === 'material' && <FileText size={24} />}
                      </>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-blue-500/60 uppercase tracking-[0.2em]">
                      {item.type === 'folder' ? 'Módulo' : item.type === 'lesson' ? 'Videoaula' : 'Material'}
                    </span>
                    <h3 className="text-xl font-black text-white italic tracking-tight leading-tight group-hover:text-blue-400 transition-colors uppercase">
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
                    <ChevronRight size={16} className="text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {item.type === 'lesson' && watchedVideos.includes(item.id_youtube || '') && (
                  <div className="absolute top-6 left-6 px-3 py-1 bg-blue-600 text-[9px] font-black text-white uppercase tracking-widest rounded-full shadow-lg">
                    Concluído
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
             <h4 className="text-xl font-black text-white italic uppercase">Conteúdo em Breve</h4>
             <p className="text-[#9CA3AF] text-sm mt-2">Estamos processando os materiais deste módulo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SanarExtensivoView;
