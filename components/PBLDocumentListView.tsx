import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Plus, 
  FileText, 
  Trash2, 
  Edit2,
  Search,
  Clock,
  Layout
} from 'lucide-react';
import { UserStats } from '../types';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, deleteDoc, doc, orderBy } from 'firebase/firestore';

interface PBLDocument {
  id: string;
  title: string;
  playlistId: string;
  updatedAt: any;
}

interface PBLDocumentListViewProps {
  userStats: UserStats;
  playlist: { id: string, title: string };
  onBack: () => void;
  onSelectDocument: (docId: string) => void;
}

const PBLDocumentListView: React.FC<PBLDocumentListViewProps> = ({ userStats, playlist, onBack, onSelectDocument }) => {
  const [documents, setDocuments] = useState<PBLDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDocuments();
  }, [playlist.id, userStats.uid]);

  const loadDocuments = async () => {
    if (!userStats.uid) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, 'pblDocuments'),
        where('userId', '==', userStats.uid),
        where('playlistId', '==', playlist.id),
        orderBy('updatedAt', 'desc')
      );
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as PBLDocument));
      setDocuments(list);
    } catch (err) {
      console.error("Erro ao carregar documentos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim() || !userStats.uid) return;
    try {
      const docRef = await addDoc(collection(db, 'pblDocuments'), {
        userId: userStats.uid,
        playlistId: playlist.id,
        title: newTitle,
        blocks: [],
        updatedAt: serverTimestamp()
      });
      onSelectDocument(docRef.id);
    } catch (err) {
      console.error("Erro ao criar documento:", err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Excluir este documento permanentemente? Isso não pode ser desfeito.")) return;
    
    try {
      await deleteDoc(doc(db, 'pblDocuments', id));
      setDocuments(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error("Erro ao deletar documento:", err);
      alert("Erro ao excluir documento. Verifique sua conexão.");
    }
  };

  const filteredDocs = documents.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-full bg-[#f8fafc] dark:bg-[#0B1120] p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mb-6 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Voltar para Playlists</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-500/10 text-purple-600 rounded-lg flex items-center justify-center">
                 <Clock className="w-4 h-4" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">{playlist.title}</h1>
            </div>
            <p className="text-slate-400 font-medium">Documentos e anotações desta playlist.</p>
          </div>

          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-xl hover:opacity-90 transition-all font-bold text-sm"
          >
            <Plus className="w-5 h-5" /> Novo Documento
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto overflow-x-hidden">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar documento..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-slate-500/20 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* List */}
        <div className="space-y-4">
          {isCreating && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white dark:bg-slate-900 border-2 border-dashed border-purple-200 dark:border-purple-900/30 rounded-3xl p-6 flex items-center justify-between gap-6"
            >
              <div className="flex-grow flex items-center gap-4">
                <FileText className="text-purple-500" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Título do documento..."
                  className="flex-grow bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm outline-none"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCreate}
                  className="bg-purple-500 text-white px-6 py-2 rounded-xl text-xs font-bold"
                >
                  Criar e Abrir
                </button>
                <button 
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-slate-400 text-xs font-bold"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          )}

          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))
          ) : filteredDocs.length === 0 && !isCreating ? (
            <div className="py-20 text-center">
              <FileText className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Vazio</h3>
              <p className="text-slate-400">Esta playlist ainda não possui documentos.</p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ x: 10 }}
                onClick={() => onSelectDocument(doc.id)}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-inner">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{doc.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      Última edição: {doc.updatedAt?.toDate?.() ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(doc.updatedAt.toDate()) : 'Agora mesmo'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                   >
                     <Trash2 size={16} />
                   </button>
                   <ChevronLeft className="w-5 h-5 text-slate-300 rotate-180" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PBLDocumentListView;
