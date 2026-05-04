import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Download, 
  Plus, 
  Type, 
  Highlighter, 
  Quote, 
  Save, 
  Trash2, 
  MousePointer2,
  FileText,
  Link as LinkIcon,
  Tag,
  GraduationCap
} from 'lucide-react';
import { UserStats } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Highlight {
  start: number;
  end: number;
  color: string;
  type: string;
}

interface TextBlock {
  id: string;
  text: string;
  source: string;
  type: 'text' | 'quote';
  highlights: Highlight[];
}

interface PBLModuleEditorProps {
  userStats: UserStats;
  module: { id: number, title: string };
  onClose: () => void;
}

const COLOR_CODES = [
  { name: 'Conceito', color: 'bg-blue-400/30 text-blue-700 dark:text-blue-300 border-blue-400/50', hex: '#60a5fa', key: '1' },
  { name: 'Fisiopatologia', color: 'bg-red-400/30 text-red-700 dark:text-red-300 border-red-400/50', hex: '#f87171', key: '2' },
  { name: 'Clínica', color: 'bg-yellow-400/30 text-yellow-700 dark:text-yellow-300 border-yellow-400/50', hex: '#fbbf24', key: '3' },
  { name: 'Tratamento', color: 'bg-green-400/30 text-green-700 dark:text-green-300 border-green-400/50', hex: '#4ade80', key: '4' },
];

const PBLModuleEditor: React.FC<PBLModuleEditorProps> = ({ userStats, module, onClose }) => {
  const [blocks, setBlocks] = useState<TextBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const [selectionMenu, setSelectionMenu] = useState<{ x: number, y: number, text: string } | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);

  // Load content
  useEffect(() => {
    const loadContent = async () => {
      if (!userStats.uid) return;
      const contentId = `${userStats.uid}_ase_${module.id}`;
      const docRef = doc(db, 'userModuleContent', contentId);
      
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setBlocks(snap.data().blocks || []);
        }
      } catch (err) {
        console.error("Erro ao carregar conteúdo PBL:", err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [userStats.uid, module.id]);

  // Save content
  const saveContent = useCallback(async (updatedBlocks: TextBlock[]) => {
    if (!userStats.uid) return;
    setSaving(true);
    const contentId = `${userStats.uid}_ase_${module.id}`;
    const docRef = doc(db, 'userModuleContent', contentId);

    try {
      await setDoc(docRef, {
        userId: userStats.uid,
        moduleId: `ase_${module.id}`,
        blocks: updatedBlocks,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error("Erro ao salvar PBL:", err);
    } finally {
      setSaving(false);
    }
  }, [userStats.uid, module.id]);

  const addBlock = (x: number, y: number) => {
    const newBlock: TextBlock = {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      source: '',
      type: 'text',
      highlights: []
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    setContextMenu(null);
  };

  const updateBlockText = (id: string, text: string) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, text } : b);
    setBlocks(newBlocks);
  };

  const updateBlockSource = (id: string, source: string) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, source } : b);
    setBlocks(newBlocks);
  };

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter(b => b.id !== id);
    setBlocks(newBlocks);
    saveContent(newBlocks);
  };

  // Selection Logic
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionMenu({
        x: rect.left + rect.width / 2,
        y: rect.top - 40,
        text: selection.toString()
      });
    } else {
      setSelectionMenu(null);
    }
  };

  const highlightSelection = (color: string, type: string) => {
    // This is a simplified highlight implementation for the POC
    // In a full implementation, we would map selection to exact block index and offsets
    setSelectionMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const generatePDF = async () => {
    if (!contentRef.current) return;
    
    setSaving(true);
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imWidth = 210;
      const imHeight = (canvas.height * imWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imWidth, imHeight);
      pdf.save(`PBL_Digital_ASE_${module.id}.pdf`);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-white dark:bg-[#0B1120] z-[100] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sincronizando Módulo...</p>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-white dark:bg-[#0B1120] z-[100] flex flex-col overflow-hidden animate-in fade-in duration-500"
      onContextMenu={handleContextMenu}
      onClick={() => { setContextMenu(null); setSelectionMenu(null); }}
    >
      {/* Dynamic Header */}
      <header className="h-20 shrink-0 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl">
              <GraduationCap size={24} />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest truncate max-w-[200px] md:max-w-md">
              {module.title}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Espaço Digital de Estudo</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => saveContent(blocks)}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-all shadow-xl shadow-black/10"
          >
            {saving ? 'Salvando...' : <><Save size={14} /> Salvar Alterações</>}
          </motion.button>
          
          <button 
            onClick={generatePDF}
            className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-purple-500 transition-all"
          >
            <Download size={18} />
          </button>

          <div className="w-px h-8 bg-slate-100 dark:bg-slate-800 mx-2" />

          <button 
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/20"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Fechar</span>
            <ChevronLeft size={16} className="rotate-180 group-hover:rotate-0 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main 
        className="flex-grow overflow-y-auto p-8 md:p-16 lg:p-24 selection:bg-purple-500/20 selection:text-purple-700"
        onMouseUp={handleMouseUp}
      >
        <div ref={contentRef} className="max-w-[800px] mx-auto min-h-full bg-white dark:bg-[#0B1120] rounded-[3rem] p-12 md:p-20 relative">
          
          {/* Watermark Section */}
          <div className="mb-16 pb-8 border-b border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white text-xl">
                    <GraduationCap size={24} />
                </div>
                <div>
                   <h1 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">NEXUS <span className="text-purple-500">PBL</span></h1>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Digital — {userStats.name || 'Estudante'}</p>
                </div>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed max-w-lg italic font-medium">
                Este é seu espaço de síntese. Use o botão auxiliar do mouse para adicionar novos blocos de conhecimento e organize seu aprendizado com o sistema ColorCode.
             </p>
          </div>

          <div className="space-y-12">
            {blocks.map((block) => (
              <div key={block.id} className="group relative animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="absolute -left-16 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                    onClick={() => removeBlock(block.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>

                <div className="space-y-4">
                  <textarea
                    placeholder="Comece a digitar aqui..."
                    value={block.text}
                    onChange={(e) => updateBlockText(block.id, e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed resize-none overflow-hidden min-h-[100px]"
                    style={{ height: 'auto' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800">
                        <LinkIcon size={12} className="text-slate-400" />
                        <input 
                          type="text"
                          placeholder="Fonte/Referência..."
                          value={block.source}
                          onChange={(e) => updateBlockSource(block.id, e.target.value)}
                          className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase text-slate-500 tracking-widest w-40"
                        />
                     </div>
                  </div>
                </div>
              </div>
            ))}

            {blocks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 mb-6 font-black text-2xl cursor-default">
                  ?
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Editor Vazio</h3>
                <p className="text-xs text-slate-400 max-w-xs uppercase font-black tracking-widest">Clique com o botão auxiliar (direito) para adicionar notas.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Custom Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{ left: contextMenu.x, top: contextMenu.y }}
            className="fixed z-[200] w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2"
          >
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ferramentas PBL</p>
            </div>
            <button 
              onClick={() => addBlock(contextMenu.x, contextMenu.y)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 transition-all"
            >
              <Plus size={16} className="text-purple-500" /> Adicionar Bloco de Texto
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold text-slate-400 transition-all cursor-not-allowed">
              <Quote size={16} /> Adicionar Citação (Breve)
            </button>
            <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 mt-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">ID: {module.id}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Selection Menu (ColorCode) */}
      <AnimatePresence>
        {selectionMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{ 
              left: selectionMenu.x, 
              top: selectionMenu.y,
              transform: 'translateX(-50%)'
            }}
            className="fixed z-[200] flex items-center gap-1 bg-[#0B1120] border border-white/10 p-1 rounded-2xl shadow-2xl"
          >
            {COLOR_CODES.map((cc) => (
              <button
                key={cc.key}
                onClick={() => highlightSelection(cc.hex, cc.name)}
                className="group relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-all"
                title={cc.name}
              >
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white/20"
                  style={{ backgroundColor: cc.hex }}
                />
                <div className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[8px] font-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest pointer-events-none">
                   {cc.name}
                </div>
              </button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-1" />
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
               <Highlighter size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ColorCode Legend Sidebar */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 space-y-4 z-50 hidden md:block">
         <div className="flex flex-col gap-4">
            {COLOR_CODES.map((cc) => (
              <div key={cc.key} className="flex items-center gap-3 group">
                 <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: cc.hex }} />
                 <div className="px-3 py-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{cc.name}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default PBLModuleEditor;
