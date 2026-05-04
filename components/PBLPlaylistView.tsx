import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Plus, 
  Folder, 
  MoreVertical, 
  Trash2, 
  Edit2,
  Search
} from 'lucide-react';
import { UserStats } from '../types';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

interface PBLPlaylist {
  id: string;
  title: string;
  color: string;
  moduleId: string;
}

interface PBLPlaylistViewProps {
  userStats: UserStats;
  module: { id: number, title: string };
  onBack: () => void;
  onSelectPlaylist: (playlist: PBLPlaylist) => void;
}

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#06b6d4'];

const PBLPlaylistView: React.FC<PBLPlaylistViewProps> = ({ userStats, module, onBack, onSelectPlaylist }) => {
  const [playlists, setPlaylists] = useState<PBLPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPlaylists();
  }, [module.id, userStats.uid]);

  const loadPlaylists = async () => {
    if (!userStats.uid) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, 'pblPlaylists'),
        where('userId', '==', userStats.uid),
        where('moduleId', '==', `ase_${module.id}`)
      );
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as PBLPlaylist));
      setPlaylists(list);
    } catch (err) {
      console.error("Erro ao carregar playlists:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim() || !userStats.uid) return;
    try {
      const docRef = await addDoc(collection(db, 'pblPlaylists'), {
        userId: userStats.uid,
        moduleId: `ase_${module.id}`,
        title: newTitle,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        createdAt: serverTimestamp()
      });
      setPlaylists([...playlists, { id: docRef.id, title: newTitle, color: '#6366f1', moduleId: `ase_${module.id}` }]);
      setIsCreating(false);
      setNewTitle('');
    } catch (err) {
      console.error("Erro ao criar playlist:", err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Excluir esta playlist e todos os seus documentos permanentemente? Isso não pode ser desfeito.")) return;
    
    try {
      // 1. Delete all documents associated with this playlist
      const docsQuery = query(collection(db, 'pblDocuments'), where('playlistId', '==', id));
      const docsSnap = await getDocs(docsQuery);
      
      const deletePromises = docsSnap.docs.map(d => deleteDoc(doc(db, 'pblDocuments', d.id)));
      await Promise.all(deletePromises);

      // 2. Delete the playlist itself
      await deleteDoc(doc(db, 'pblPlaylists', id));
      
      setPlaylists(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Erro ao deletar playlist e documentos:", err);
      alert("Houve um erro ao excluir. Verifique sua conexão.");
    }
  };

  const filteredPlaylists = playlists.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-full bg-slate-50 dark:bg-[#0B1120] p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mb-6 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Voltar para Módulos</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-[10px] font-black uppercase tracking-widest">ASE {module.id}</span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">{module.title.split(' — ')[1] || module.title}</h1>
            </div>
            <p className="text-slate-400 font-medium">Gerencie suas playlists de estudo para este módulo.</p>
          </div>

          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-2xl shadow-xl shadow-purple-600/20 hover:bg-purple-700 transition-all font-bold text-sm"
          >
            <Plus className="w-5 h-5" /> Nova Playlist
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto overflow-x-hidden">
        {/* Search */}
        <div className="relative mb-8 pt-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar playlist..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isCreating && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 border-2 border-dashed border-purple-200 dark:border-purple-900/30 rounded-3xl p-6"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-500 mb-4">
                <Folder className="w-6 h-6" />
              </div>
              <input 
                autoFocus
                type="text" 
                placeholder="Título da playlist..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm mb-4 outline-none"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCreate}
                  className="flex-grow bg-purple-500 text-white py-2 rounded-xl text-xs font-bold"
                >
                  Criar
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
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
            ))
          ) : filteredPlaylists.length === 0 && !isCreating ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
                <Folder className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sem Playlists</h3>
              <p className="text-slate-400 max-w-xs mx-auto">Crie sua primeira playlist para começar a organizar seus documentos de estudo.</p>
            </div>
          ) : (
            filteredPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                whileHover={{ y: -5 }}
                onClick={() => onSelectPlaylist(playlist)}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all cursor-pointer relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                    style={{ backgroundColor: playlist.color }}
                  >
                    <Folder className="w-6 h-6" />
                  </div>
                  <button 
                    onClick={(e) => handleDelete(playlist.id, e)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-1 truncate">{playlist.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Playlist de Estudo</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PBLPlaylistView;
