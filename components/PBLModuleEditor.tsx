import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { 
  ChevronLeft, 
  Download, 
  Plus, 
  Type, 
  Highlighter, 
  Quote, 
  Save, 
  Trash2, 
  Link as LinkIcon,
  GripVertical,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronRight,
  Code,
  Info,
  Heading1,
  Heading2,
  Heading3,
  Split,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  MessageSquare,
  Type as TypeIcon,
  Palette,
  Maximize2,
  MoreHorizontal
} from 'lucide-react';
import { UserStats } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';

type BlockType = 'text' | 'h1' | 'h2' | 'h3' | 'quote' | 'callout' | 'toggle' | 'todo' | 'divider' | 'code';

interface TextBlock {
  id: string;
  type: BlockType;
  content: string;
  source?: string;
  checked?: boolean;
  isOpen?: boolean;
  children?: TextBlock[];
  style?: {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontFamily?: string;
  };
}

interface PBLModuleEditorProps {
  userStats: UserStats;
  docId: string;
  onBack: () => void;
}

const FONTS = [
  { name: 'Inter (Sans)', value: 'Inter, sans-serif' },
  { name: 'Playfair (Serif)', value: 'Playfair Display, serif' },
  { name: 'JetBrains (Mono)', value: 'JetBrains Mono, monospace' },
  { name: 'Outfit', value: 'Outfit, sans-serif' },
];

const COLORS = [
  { name: 'Padrão', color: 'inherit' },
  { name: 'Roxo', color: '#a855f7' },
  { name: 'Azul', color: '#3b82f6' },
  { name: 'Verde', color: '#10b981' },
  { name: 'Amarelo', color: '#f59e0b' },
  { name: 'Vermelho', color: '#ef4444' },
];

const BLOCK_DEFINITIONS: { type: BlockType; label: string; icon: any; placeholder: string }[] = [
  { type: 'text', label: 'Texto', icon: Type, placeholder: 'Comece a escrever...' },
  { type: 'h1', label: 'Título 1', icon: Heading1, placeholder: 'Título Grande' },
  { type: 'h2', label: 'Título 2', icon: Heading2, placeholder: 'Título Médio' },
  { type: 'h3', label: 'Título 3', icon: Heading3, placeholder: 'Título Pequeno' },
  { type: 'todo', label: 'Checklist', icon: CheckSquare, placeholder: 'Tarefa...' },
  { type: 'toggle', label: 'Toggle', icon: ChevronRight, placeholder: 'Conteúdo expansível...' },
  { type: 'quote', label: 'Citação', icon: Quote, placeholder: 'Citação...' },
  { type: 'callout', label: 'Callout', icon: Info, placeholder: 'Destaque importante...' },
  { type: 'divider', label: 'Divisor', icon: Split, placeholder: '' },
];

const COLOR_CODES = [
  { key: 'concept', label: 'Conceito', hex: '#dcfce7', text: '#166534' }, // Green
  { key: 'stat', label: 'Estatística', hex: '#dbeafe', text: '#1e40af' }, // Blue
  { key: 'clinical', label: 'Caso Clínico', hex: '#fef3c7', text: '#92400e' }, // Yellow
  { key: 'important', label: 'Importante', hex: '#fee2e2', text: '#991b1b' }, // Red
  { key: 'physio', label: 'Fisiopatologia', hex: '#f3e8ff', text: '#6b21a8' }, // Purple
];

const PBLModuleEditor: React.FC<PBLModuleEditorProps> = ({ userStats, docId, onBack }) => {
  const [docData, setDocData] = useState<{ title: string; blocks: TextBlock[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [slashMenu, setSlashMenu] = useState<{ x: number, y: number, blockId: string } | null>(null);
  const [selectionMenu, setSelectionMenu] = useState<{ x: number, y: number, text: string } | null>(null);
  const [activeFont, setActiveFont] = useState(FONTS[0].value);
  const [fontSize, setFontSize] = useState('18px');
  const [customColorCodes, setCustomColorCodes] = useState(COLOR_CODES);

  const contentRef = useRef<HTMLDivElement>(null);

  // Load Document
  useEffect(() => {
    const loadDoc = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, 'pblDocuments', docId));
        if (snap.exists()) {
          const data = snap.data();
          setDocData({
            title: data.title || '',
            blocks: data.blocks || []
          });
          if (data.colorCodes) {
            setCustomColorCodes(data.colorCodes);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar documento:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDoc();
  }, [docId]);

  const handleManualSave = async () => {
    if (!docData || loading) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'pblDocuments', docId), {
        ...docData,
        colorCodes: customColorCodes,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Erro ao salvar manual:", err);
    } finally {
      setTimeout(() => setSaving(false), 800);
    }
  };

  const handleBack = () => {
    handleManualSave();
    onBack();
  };

  // Handle Context Menu
  const handleContextMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't show slash menu if clicking inside an input or editable area that is NOT a block
    if (target.closest('[contenteditable]')) {
      // Just let default behavior or selection menu handle it
    } else {
      e.preventDefault();
      setSlashMenu({ x: e.clientX, y: e.clientY + window.scrollY, blockId: activeBlockId || 'new' });
    }
  };

  const applyColorCode = (hex: string) => {
    applyFormat('hiliteColor', hex);
    setSelectionMenu(null);
  };

  // Auto-save logic with debounce
  useEffect(() => {
    if (!docData || loading) return;

    const timeout = setTimeout(async () => {
      setSaving(true);
      try {
        await updateDoc(doc(db, 'pblDocuments', docId), {
          ...docData,
          colorCodes: customColorCodes,
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        console.error("Erro ao salvar automaticamente:", err);
      } finally {
        // Delay to show "Salvo" message for a brief moment
        setTimeout(() => setSaving(false), 1000);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [docData, docId, loading, customColorCodes]);

  // Save on unload
  useEffect(() => {
    const handleUnload = () => {
      if (docData && !loading) {
        // Note: updateDoc is async, but on unload we can only do so much.
        // We trigger a manual save attempt.
        handleManualSave();
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [docData, loading]);

  const addBlock = (type: BlockType = 'text', index?: number, parentId?: string) => {
    if (!docData) return;
    const newBlock: TextBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      isOpen: type === 'toggle',
      checked: false,
      children: [],
      style: { fontFamily: activeFont, fontSize }
    };
    
    if (parentId) {
      setDocData(prev => {
        if (!prev) return null;
        const updateNested = (blocks: TextBlock[]): TextBlock[] => {
          return blocks.map(b => {
            if (b.id === parentId) {
              const newChildren = [...(b.children || [])];
              if (typeof index === 'number') {
                newChildren.splice(index + 1, 0, newBlock);
              } else {
                newChildren.push(newBlock);
              }
              return { ...b, children: newChildren, isOpen: true };
            }
            if (b.children) return { ...b, children: updateNested(b.children) };
            return b;
          });
        };
        return { ...prev, blocks: updateNested(prev.blocks) };
      });
    } else {
      setDocData(prev => {
        if (!prev) return null;
        const newBlocks = [...prev.blocks];
        if (typeof index === 'number') {
          newBlocks.splice(index + 1, 0, newBlock);
        } else {
          newBlocks.push(newBlock);
        }
        return { ...prev, blocks: newBlocks };
      });
    }
    setSlashMenu(null);
  };

  const updateBlock = useCallback((id: string, updates: Partial<TextBlock>) => {
    setDocData(prev => {
      if (!prev) return null;
      const updateNested = (blocks: TextBlock[]): TextBlock[] => {
        return blocks.map(b => {
          if (b.id === id) return { ...b, ...updates };
          if (b.children && b.children.length > 0) {
            return { ...b, children: updateNested(b.children) };
          }
          return b;
        });
      };
      return { ...prev, blocks: updateNested(prev.blocks) };
    });
  }, []);

  const removeBlock = (id: string) => {
    setDocData(prev => {
      if (!prev) return null;
      const removeFromNested = (blocks: TextBlock[]): TextBlock[] => {
        return blocks.filter(b => b.id !== id).map(b => ({
          ...b,
          children: b.children ? removeFromNested(b.children) : undefined
        }));
      };
      return { ...prev, blocks: removeFromNested(prev.blocks) };
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string, index: number, parentId?: string) => {
    if (e.key === '/') {
       const rect = (e.target as HTMLElement).getBoundingClientRect();
       setSlashMenu({ x: rect.left, y: rect.bottom + window.scrollY, blockId: id });
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addBlock('text', index, parentId);
    }
    if (e.key === 'Backspace') {
      const blockEl = document.getElementById(`block-${id}`);
      if (blockEl && (blockEl.innerText === '' || blockEl.innerHTML === '<br>')) {
        e.preventDefault();
        removeBlock(id);
      }
    }
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionMenu({
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY - 50,
        text: selection.toString()
      });
    } else {
      setSelectionMenu(null);
    }
  };

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Force a save after formatting
    if (activeBlockId) {
      const blockEl = document.getElementById(`block-${activeBlockId}`);
      if (blockEl) {
        updateBlock(activeBlockId, { content: blockEl.innerHTML });
      }
    }
  };

  const handleLink = () => {
    const url = prompt('Insira o link:');
    if (url) applyFormat('createLink', url);
  };

  const handleHighlight = (color: string) => {
    applyFormat('hiliteColor', color);
  };

  if (loading) {
     return (
       <div className="fixed inset-0 bg-white dark:bg-[#0B1120] z-[200] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Carregando seu Workspace...</p>
          </div>
       </div>
     );
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#0B1120] z-[100] flex flex-col overflow-hidden animate-in fade-in duration-500">
      {/* Upper Toolbar - Microsoft/Google Style */}
      <header className="h-14 shrink-0 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-slate-500" />
          </button>
          <div className="w-[1px] h-6 bg-slate-100 dark:bg-slate-800 mx-2 shrink-0" />
          
          {/* Font Controls */}
          <select 
            value={activeFont}
            onChange={(e) => setActiveFont(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border-none rounded-lg py-1 px-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-purple-500/20 shrink-0"
          >
            {FONTS.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
          </select>

          <select 
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border-none rounded-lg py-1 px-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-purple-500/20 shrink-0"
          >
            {['14px', '16px', '18px', '20px', '24px', '32px'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <div className="w-[1px] h-6 bg-slate-100 dark:bg-slate-800 mx-2 shrink-0" />

          {/* Formatting */}
          <div className="flex items-center gap-0.5 shrink-0">
             <ToolbarButton icon={<Bold size={16} />} title="Negrito" onClick={() => applyFormat('bold')} />
             <ToolbarButton icon={<Italic size={16} />} title="Itálico" onClick={() => applyFormat('italic')} />
             <ToolbarButton icon={<Underline size={16} />} title="Sublinhado" onClick={() => applyFormat('underline')} />
             <ToolbarButton icon={<Strikethrough size={16} />} title="Tachado" onClick={() => applyFormat('strikeThrough')} />
          </div>

          <div className="w-[1px] h-6 bg-slate-100 dark:bg-slate-800 mx-2 shrink-0" />

          <div className="flex items-center gap-0.5 shrink-0">
             <div className="relative group/color">
               <ToolbarButton icon={<Palette size={16} />} title="Cor do Texto" />
               <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-1 shadow-xl opacity-0 group-hover/color:opacity-100 transition-opacity z-[60] flex gap-1">
                 {COLORS.map(c => <button key={c.color} onClick={() => applyFormat('foreColor', c.color)} className="w-6 h-6 rounded" style={{ backgroundColor: c.color === 'inherit' ? '#94a3b8' : c.color }} />)}
               </div>
             </div>
             
             <div className="relative group/highlight">
               <ToolbarButton icon={<Highlighter size={16} />} title="Destaque" />
               <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-1 shadow-xl opacity-0 group-hover/highlight:opacity-100 transition-opacity z-[60] flex gap-1">
                 {COLORS.map(c => <button key={c.color} onClick={() => applyFormat('hiliteColor', c.color === 'inherit' ? 'transparent' : c.color)} className="w-6 h-6 rounded border border-slate-100" style={{ backgroundColor: c.color === 'inherit' ? 'transparent' : c.color }} />)}
               </div>
             </div>

             <ToolbarButton icon={<LinkIcon size={16} />} title="Inserir Link" onClick={handleLink} />
             <ToolbarButton icon={<MessageSquare size={16} />} title="Comentar" onClick={() => alert('Recurso de comentários sincronizados em desenvolvimento.')} />
          </div>

          <div className="w-[1px] h-6 bg-slate-100 dark:bg-slate-800 mx-2 shrink-0" />
          
          <div className="relative group/config">
            <ToolbarButton icon={<ChevronDown size={14} className="ml-1" />} title="Configurar Legenda" />
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 opacity-0 group-hover/config:opacity-100 transition-opacity z-[70] pointer-events-none group-hover/config:pointer-events-auto">
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Legenda de Cores</p>
               <div className="space-y-3">
                  {customColorCodes.map((cc, index) => (
                    <div key={cc.key} className="flex items-center gap-2">
                       <div className="w-4 h-4 rounded shadow-sm shrink-0" style={{ backgroundColor: cc.hex }} />
                       <input 
                         className="flex-grow bg-slate-50 dark:bg-slate-800 border-none rounded px-2 py-1 text-[11px] font-bold text-slate-600 focus:ring-1 focus:ring-purple-500/30"
                         value={cc.label}
                         onChange={(e) => {
                           const newCodes = [...customColorCodes];
                           newCodes[index].label = e.target.value;
                           setCustomColorCodes(newCodes);
                         }}
                       />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {saving ? (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Salvando</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-slate-400"
              >
                <div className="w-2 h-2 bg-slate-300 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest">Salvo</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1 h-8 bg-slate-50 dark:bg-slate-900 rounded-xl px-1">
             <button 
                onClick={handleManualSave}
                className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all"
                title="Salvar agora"
             >
               <Save size={18} />
             </button>
             <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800" />
             <button 
               onClick={async () => {
                 if (window.confirm("Excluir este documento permanentemente?")) {
                   try {
                     await deleteDoc(doc(db, 'pblDocuments', docId));
                     onBack();
                   } catch (err) {
                     console.error("Erro ao excluir:", err);
                   }
                 }
               }}
               className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all"
               title="Excluir Documento"
             >
               <Trash2 size={18} />
             </button>
             <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800" />
             <button className="p-1.5 text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg"><Maximize2 size={18} /></button>
             <button className="p-1.5 text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg"><MoreHorizontal size={18} /></button>
          </div>
        </div>
      </header>

      {/* Workspace */}
      <main 
        className="flex-grow overflow-y-auto bg-[#f8fafc] dark:bg-[#0B1120] p-4 md:p-12 overflow-x-hidden"
        onMouseUp={handleSelection}
        onContextMenu={handleContextMenu}
      >
        <div 
          ref={contentRef} 
          className="max-w-[92%] mx-auto min-h-full bg-white dark:bg-[#0B1120] shadow-2xl shadow-slate-200/50 dark:shadow-none p-12 md:p-24 rounded-3xl"
        >
          {/* Auto-expanding Title */}
          <textarea 
            autoFocus
            className="w-full bg-transparent border-none focus:ring-0 text-5xl font-black text-slate-900 dark:text-white mb-12 resize-none h-auto italic tracking-tight overflow-hidden transition-[height]"
            rows={1}
            onBlur={() => {
              if (docData) {
                handleManualSave();
              }
            }}
            placeholder="Título do Documento"
            value={docData?.title}
            onChange={(e) => {
              if (docData) {
                setDocData({ ...docData, title: e.target.value });
              }
              const target = e.target as HTMLTextAreaElement;
              target.style.height = '0px';
              target.style.height = target.scrollHeight + 'px';
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = '0px';
              target.style.height = target.scrollHeight + 'px';
            }}
          />

          <Reorder.Group axis="y" values={docData?.blocks || []} onReorder={(b) => setDocData({ ...docData!, blocks: b })} className="space-y-2">
            {docData?.blocks.map((block, index) => (
              <Reorder.Item 
                key={block.id} 
                value={block}
                className="group relative"
              >
                {/* Block Controls Column */}
                <div className="absolute -left-12 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col">
                    <button className="p-1 hover:bg-slate-100 rounded cursor-grab text-slate-300"><GripVertical size={14} /></button>
                    <button onClick={() => addBlock('text', index)} className="p-1 hover:bg-slate-100 rounded text-slate-300"><Plus size={14} /></button>
                  </div>
                </div>

                <div className="flex-grow">
                   <BlockContent 
                     block={block} 
                     onUpdate={(upd) => updateBlock(block.id, upd)}
                     onKeyDown={(e, id, idx, pId) => handleKeyDown(e, id, idx, pId)}
                     onFocus={() => setActiveBlockId(block.id)}
                     onAddBlock={addBlock}
                     onUpdateBlock={updateBlock}
                     onRemoveBlock={removeBlock}
                     onFocusBlock={(id) => setActiveBlockId(id)}
                   />
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          {docData?.blocks.length === 0 && (
            <div 
              onClick={() => addBlock()}
              className="py-20 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-300 hover:text-purple-500 hover:border-purple-200 transition-all cursor-pointer"
            >
              <TypeIcon size={32} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Clique para começar o seu estudo</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Menus (Slash & Selection) */}
      <AnimatePresence>
        {slashMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ left: slashMenu.x, top: slashMenu.y }}
            className="fixed z-[300] w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2"
          >
             {BLOCK_DEFINITIONS.map(def => (
               <button
                 key={def.type}
                 onClick={() => {
                   if (slashMenu.blockId === 'new') {
                     addBlock(def.type);
                   } else {
                     updateBlock(slashMenu.blockId, { type: def.type });
                   }
                   setSlashMenu(null);
                 }}
                 className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-all"
               >
                  <div className="w-8 h-8 bg-slate-50 dark:bg-slate-800 flex items-center justify-center rounded-lg text-slate-400">
                     <def.icon size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-white leading-none mb-1">{def.label}</p>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{def.type}</p>
                  </div>
               </button>
             ))}
          </motion.div>
        )}

        {selectionMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ left: selectionMenu.x, top: selectionMenu.y, transform: 'translateX(-50%)' }}
            className="fixed z-[300] flex items-center gap-1 bg-slate-900 border border-slate-700 p-2 rounded-2xl shadow-2xl"
          >
             <ToolbarButton icon={<Bold size={14} />} title="Negrito" onClick={() => applyFormat('bold')} />
             <ToolbarButton icon={<Italic size={14} />} title="Itálico" onClick={() => applyFormat('italic')} />
             <div className="w-px h-6 bg-slate-700 mx-2" />
             
             {/* Color Codes */}
             <div className="flex items-center gap-1.5 px-1">
                {customColorCodes.map(cc => (
                  <button
                    key={cc.key}
                    onClick={() => applyColorCode(cc.hex)}
                    className="group relative flex flex-col items-center"
                  >
                    <div 
                      className="w-6 h-6 rounded-lg border border-slate-700 hover:scale-110 transition-transform"
                      style={{ backgroundColor: cc.hex }}
                    />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] font-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[310] border border-slate-700 uppercase tracking-widest">
                      {cc.label}
                    </span>
                  </button>
                ))}
             </div>

             <div className="w-px h-6 bg-slate-700 mx-2" />
             <ToolbarButton icon={<LinkIcon size={14} />} title="Link" onClick={handleLink} />
             <ToolbarButton icon={<MessageSquare size={14} />} title="Comentar" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ToolbarButton: React.FC<{ icon: any; title: string; active?: boolean; onClick?: () => void }> = ({ icon, title, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-lg transition-all relative group ${active ? 'bg-purple-100 text-purple-600' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
  >
     {icon}
     <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[1000]">
        {title}
     </span>
  </button>
);

const BlockContent: React.FC<{ 
  block: TextBlock, 
  onUpdate: (upd: Partial<TextBlock>) => void,
  onKeyDown: (e: React.KeyboardEvent, id: string, index: number, parentId?: string) => void,
  onFocus: () => void,
  onAddBlock: (type: BlockType, index?: number, parentId?: string) => void,
  onUpdateBlock: (id: string, upd: Partial<TextBlock>) => void,
  onRemoveBlock: (id: string) => void,
  onFocusBlock: (id: string) => void
}> = ({ block, onUpdate, onKeyDown, onFocus, onAddBlock, onUpdateBlock, onRemoveBlock, onFocusBlock }) => {
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editableRef.current && editableRef.current.innerHTML !== block.content) {
      editableRef.current.innerHTML = block.content;
    }
  }, [block.content]);

  const handleInput = () => {
    if (editableRef.current) {
      onUpdate({ content: editableRef.current.innerHTML });
    }
  };

  const commonStyles = {
    fontFamily: block.style?.fontFamily,
    fontSize: block.style?.fontSize,
    color: block.style?.color,
    padding: '8px 0',
    minHeight: '1.5em',
    outline: 'none',
  };

  const renderEditable = (className: string, placeholder: string) => (
    <div
      id={`block-${block.id}`}
      ref={editableRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={(e) => onKeyDown(e, block.id, 0)}
      onFocus={onFocus}
      style={commonStyles}
      className={`w-full bg-transparent border-none focus:ring-0 ${className} relative before:content-[attr(data-placeholder)] before:absolute before:text-slate-300 before:pointer-events-none ${block.content ? 'before:hidden' : ''}`}
      data-placeholder={placeholder}
    />
  );

  switch (block.type) {
    case 'h1':
      return renderEditable("text-4xl font-black text-slate-900 dark:text-white italic mb-2", "Título 1");
    case 'h2':
      return renderEditable("text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2", "Título 2");
    case 'h3':
      return renderEditable("text-2xl font-bold text-slate-700 dark:text-slate-200 mb-1", "Título 3");
    case 'todo':
      return (
        <div className="flex items-start gap-4 py-1">
          <button 
            onClick={() => onUpdate({ checked: !block.checked })}
            className={`mt-1.5 transition-colors shrink-0 ${block.checked ? 'text-purple-500' : 'text-slate-300 hover:text-purple-400'}`}
          >
            {block.checked ? <CheckSquare size={22} /> : <Square size={22} />}
          </button>
          <div className={block.checked ? 'opacity-50 line-through' : ''} style={{ flexGrow: 1 }}>
            {renderEditable("text-xl text-slate-700 dark:text-slate-300", "Tarefa")}
          </div>
        </div>
      );
    case 'quote':
      return (
        <div className="pl-6 border-l-4 border-purple-500 py-1 my-2">
          {renderEditable("text-2xl italic font-medium text-slate-600 dark:text-slate-400 leading-relaxed", "Citação")}
        </div>
      );
    case 'toggle':
      return (
        <div className="space-y-2 py-1">
           <div className="flex items-center gap-2">
              <button 
                onClick={() => onUpdate({ isOpen: !block.isOpen })} 
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors shrink-0"
              >
                {block.isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              {renderEditable("text-xl font-bold text-slate-800 dark:text-slate-100", "Clique para expandir")}
           </div>
           <AnimatePresence>
             {block.isOpen && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="pl-8 border-l-2 border-purple-500/10 ml-3 py-2 space-y-2 overflow-hidden"
               >
                  {block.children && block.children.length > 0 ? (
                    <div className="space-y-2">
                       {block.children.map((child, idx) => (
                         <div key={child.id} className="group/sub relative">
                            <div className="absolute -left-8 top-1 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                               <button 
                                 onClick={() => onRemoveBlock(child.id)}
                                 className="p-1 text-slate-300 hover:text-red-400"
                               >
                                  <Trash2 size={12} />
                               </button>
                            </div>
                            <BlockContent 
                              block={child}
                              onUpdate={(upd) => onUpdateBlock(child.id, upd)}
                              onKeyDown={(e, id, idx, pId) => onKeyDown(e, id, idx, block.id)}
                              onFocus={() => onFocusBlock(child.id)}
                              onAddBlock={onAddBlock}
                              onUpdateBlock={onUpdateBlock}
                              onRemoveBlock={onRemoveBlock}
                              onFocusBlock={onFocusBlock}
                            />
                         </div>
                       ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-xs italic py-2">Vazio. Adicione conteúdo abaixo.</p>
                  )}
                  <button 
                    onClick={() => onAddBlock('text', undefined, block.id)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-500 transition-colors py-2"
                  >
                    <Plus size={12} /> Adicionar Sub-bloco
                  </button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      );
    case 'divider':
      return (
        <div className="py-6 group/div relative">
           <div className="h-0.5 bg-slate-100 dark:bg-slate-800 w-full rounded-full transition-all group-hover/div:h-1 group-hover/div:bg-purple-200" />
        </div>
      );
    case 'callout':
      return (
        <div className="flex gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 my-4">
           <div className="text-purple-500 shrink-0 mt-1"><Info size={24} /></div>
           <div className="flex-grow">
             {renderEditable("text-lg font-medium text-slate-700 dark:text-slate-300", "Informação importante...")}
           </div>
        </div>
      );
    default:
      return renderEditable("text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed", "Comece a escrever...");
  }
};

export default PBLModuleEditor;
