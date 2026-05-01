
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../../lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  Timestamp,
  serverTimestamp 
} from "firebase/firestore";

export interface ChecklistItem {
  id: string;
  label: string;
  required?: boolean;
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

interface InteractiveChecklistProps {
  exameId: string;
  title: string;
  description: string;
  sections: ChecklistSection[];
  category: string;
}

interface ExamAttempt {
  date: any;
  score: number;
  missedItems: string[];
}

interface CommunityStats {
  avgScore: number;
  mostMissed: { label: string; count: number }[];
  totalAttempts: number;
}

const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({
  exameId,
  title,
  description,
  sections,
  category
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<ExamAttempt | null>(null);
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentResult, setCurrentResult] = useState<{
    score: number;
    missed: string[];
    feedback: string;
  } | null>(null);

  // Load history and stats from Firebase
  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return;

      try {
        // Fetch last attempt
        const q = query(
          collection(db, "osce_results"),
          where("userId", "==", auth.currentUser.uid),
          where("exameId", "==", exameId),
          orderBy("date", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0].data();
          setLastAttempt({
            date: doc.date?.toDate() || new Date(),
            score: doc.score,
            missedItems: doc.missedItems
          });
        }

        // Fetch community stats
        const statsQ = query(
          collection(db, "osce_results"),
          where("exameId", "==", exameId),
          limit(100) // Limit for performance
        );
        const statsSnapshot = await getDocs(statsQ);
        if (!statsSnapshot.empty) {
          const results = statsSnapshot.docs.map(d => d.data());
          const totalScore = results.reduce((acc, r) => acc + r.score, 0);
          const avgScore = Math.round(totalScore / results.length);
          
          const missedMap: Record<string, number> = {};
          results.forEach(r => {
            r.missedItems.forEach((item: string) => {
              missedMap[item] = (missedMap[item] || 0) + 1;
            });
          });

          const mostMissed = Object.entries(missedMap)
            .map(([label, count]) => ({ label, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

          setCommunityStats({
            avgScore,
            mostMissed,
            totalAttempts: results.length
          });
        }
      } catch (error) {
        console.error("Error fetching OSCE data:", error);
      }
    };

    fetchData();
  }, [exameId]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const allItems = sections.flatMap(s => s.items);
    const totalItems = allItems.length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const score = Math.round((checkedCount / totalItems) * 100);
    
    const missed = allItems
      .filter(item => !checkedItems[item.id])
      .map(item => item.label);

    let feedback = "";
    if (score >= 90) feedback = "Excelente! Você domina quase todas as etapas deste exame.";
    else if (score >= 70) feedback = "Bom desempenho, mas ainda há pontos importantes a serem revisados.";
    else if (score >= 50) feedback = "Desempenho regular. Recomenda-se treinar mais a sequência completa.";
    else feedback = "Atenção! Muitas etapas essenciais foram esquecidas. Pratique com mais frequência.";

    try {
      if (auth.currentUser) {
        await addDoc(collection(db, "osce_results"), {
          userId: auth.currentUser.uid,
          exameId,
          score,
          missedItems: missed,
          category,
          date: serverTimestamp()
        });
      }

      setCurrentResult({ score, missed, feedback });
      setShowFeedback(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error saving OSCE result:", error);
      alert("Erro ao salvar resultado. Verifique sua conexão.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEvolutionMessage = () => {
    if (!lastAttempt || !currentResult) return null;
    const previous = lastAttempt.score;
    const current = currentResult.score;

    if (current > previous) return { text: "Você melhorou seu desempenho neste exame!", type: "success" };
    if (current === previous) return { text: "Você manteve seu desempenho.", type: "neutral" };
    return { text: "Houve uma queda no desempenho em relação à última tentativa.", type: "warning" };
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 border-b border-neutral-200 dark:border-nexus-border pb-8">
        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-4 block">Checklist • {category}</span>
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          {title}
        </h1>
        <p className="text-neutral-500 dark:text-nexus-text-main text-lg leading-relaxed">
          {description}
        </p>
      </header>

      {/* Último Resultado */}
      {lastAttempt && !showFeedback && (
        <div className="mb-12 bg-neutral-900 text-white p-8 rounded-[2.5rem] shadow-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black italic text-rose-400">Último Resultado</h2>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              {new Date(lastAttempt.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black tracking-tighter">{lastAttempt.score}%</span>
            <span className="text-neutral-400 text-sm font-medium uppercase tracking-widest">de desempenho</span>
          </div>
          {lastAttempt.missedItems.length > 0 && (
            <div>
              <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">Itens mais esquecidos:</p>
              <ul className="text-sm text-neutral-300 space-y-1">
                {lastAttempt.missedItems.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
                {lastAttempt.missedItems.length > 3 && (
                  <li className="text-neutral-500 italic">...e mais {lastAttempt.missedItems.length - 3} itens</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Feedback Automático */}
      {showFeedback && currentResult && (
        <div className="mb-12 bg-white dark:bg-nexus-card border-2 border-rose-500 p-10 rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-500 text-white rounded-3xl mb-6 shadow-lg shadow-rose-500/20">
              <span className="text-3xl font-black">{currentResult.score}%</span>
            </div>
            <h2 className="text-3xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-2 italic">Resultado do Exame</h2>
            <p className="text-neutral-500 dark:text-nexus-text-main">{currentResult.feedback}</p>
          </div>

          {getEvolutionMessage() && (
            <div className={`mb-8 p-4 rounded-2xl text-center text-sm font-bold uppercase tracking-widest ${
              getEvolutionMessage()?.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
              getEvolutionMessage()?.type === 'warning' ? 'bg-rose-500/10 text-rose-500' :
              'bg-neutral-500/10 text-neutral-500'
            }`}>
              {getEvolutionMessage()?.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 dark:bg-emerald-500/5 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-500/20">
              <h3 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4">Pontos Fortes</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Você demonstrou boa fluidez nas etapas iniciais e técnicas de inspeção.</p>
            </div>
            <div className="bg-rose-50 dark:bg-rose-500/5 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-500/20">
              <h3 className="text-sm font-black text-rose-600 uppercase tracking-widest mb-4">A Melhorar</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Foque em memorizar a sequência de manobras específicas e a comunicação final com o paciente.</p>
            </div>
          </div>

          {currentResult.missed.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-widest mb-4 italic">Etapas Esquecidas:</h3>
              <div className="flex flex-wrap gap-2">
                {currentResult.missed.map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium rounded-full border border-neutral-200 dark:border-neutral-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={() => {
              setShowFeedback(false);
              setCheckedItems({});
            }}
            className="w-full mt-10 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Checklist Interativo */}
      {!showFeedback && (
        <div className="space-y-12">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border p-8 rounded-[2.5rem] shadow-sm">
              <h2 className="text-xl font-black text-neutral-900 dark:text-nexus-text-title mb-6 italic">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                      checkedItems[item.id] 
                        ? 'bg-rose-500/5 border-rose-500/30 text-rose-600' 
                        : 'bg-neutral-50 dark:bg-neutral-800/50 border-transparent text-neutral-600 dark:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      checkedItems[item.id]
                        ? 'bg-rose-500 border-rose-500 text-white'
                        : 'border-neutral-300 dark:border-neutral-600'
                    }`}>
                      {checkedItems[item.id] && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Estatísticas Coletivas */}
          <div className="bg-neutral-50 dark:bg-nexus-surface p-10 rounded-[3rem] border border-neutral-200 dark:border-nexus-border">
            <h2 className="text-xl font-black text-neutral-900 dark:text-nexus-text-title mb-8 italic">Estatísticas da Comunidade</h2>
            <div className="space-y-6">
              {communityStats ? (
                <>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Etapas mais esquecidas pelos usuários:</p>
                    <div className="space-y-3">
                      {communityStats.mostMissed.map((item, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{i+1}️⃣ {item.label}</span>
                            <span className="text-xs font-black text-rose-500">{Math.round((item.count / communityStats.totalAttempts) * 100)}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500" style={{ width: `${(item.count / communityStats.totalAttempts) * 100}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Taxa média de acerto:</span>
                    <span className="text-lg font-black text-neutral-900 dark:text-white">{communityStats.avgScore}%</span>
                  </div>
                </>
              ) : (
                <p className="text-neutral-400 text-xs italic">Ainda não há estatísticas suficientes para este exame.</p>
              )}
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-6 bg-rose-500 text-white rounded-[2rem] font-black text-xl uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Exame'}
          </button>
        </div>
      )}

      <footer className="mt-20 pt-10 border-top border-neutral-200 dark:border-nexus-border text-center">
        <p className="text-neutral-400 text-[10px] uppercase tracking-widest">NexusBQ • OSCE MED 2 • Checklist Interativo</p>
      </footer>
    </div>
  );
};

export default InteractiveChecklist;
