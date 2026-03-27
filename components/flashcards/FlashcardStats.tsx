
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const FlashcardStats: React.FC = () => {
  const [stats, setStats] = useState({
    studiedToday: 0,
    remaining: 0,
    successRate: 0,
    totalCards: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!auth.currentUser) return;

      try {
        const userCardsRef = collection(db, "users", auth.currentUser.uid, "flashcards");
        const querySnapshot = await getDocs(userCardsRef);
        
        let studiedToday = 0;
        let correct = 0;
        let total = querySnapshot.size;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.lastReview && data.lastReview >= today.getTime()) {
            studiedToday++;
            if (data.step > 0) correct++;
          }
        });

        setStats({
          studiedToday,
          remaining: 0,
          successRate: studiedToday > 0 ? Math.round((correct / studiedToday) * 100) : 0,
          totalCards: total
        });
      } catch (err) {
        console.error("Error fetching flashcard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="h-40 bg-neutral-100 dark:bg-nexus-surface animate-pulse rounded-2xl"></div>;

  return (
    <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-neutral-50 dark:bg-nexus-surface rounded-xl">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Estudados Hoje</p>
          <p className="text-2xl font-black text-neutral-900 dark:text-nexus-text-title">{stats.studiedToday}</p>
        </div>
        
        <div className="p-4 bg-neutral-50 dark:bg-nexus-surface rounded-xl">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Taxa de Acerto</p>
          <p className="text-2xl font-black text-sky-500">{stats.successRate}%</p>
        </div>
        
        <div className="p-4 bg-neutral-50 dark:bg-nexus-surface rounded-xl">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Total de Cartões</p>
          <p className="text-2xl font-black text-neutral-900 dark:text-nexus-text-title">{stats.totalCards}</p>
        </div>
        
        <div className="p-4 bg-neutral-50 dark:bg-nexus-surface rounded-xl">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Próxima Revisão</p>
          <p className="text-sm font-bold text-neutral-600 dark:text-nexus-text-main mt-2">Amanhã</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-nexus-border/50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-neutral-500 dark:text-nexus-text-sec">Meta Diária</span>
          <span className="text-xs font-bold text-sky-500">{Math.min(100, Math.round((stats.studiedToday / 20) * 100))}%</span>
        </div>
        <div className="h-2 bg-neutral-100 dark:bg-nexus-surface rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-500 transition-all duration-1000" 
            style={{ width: `${Math.min(100, (stats.studiedToday / 20) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardStats;
