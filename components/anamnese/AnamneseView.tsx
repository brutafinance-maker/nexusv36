
import React, { useState, Suspense, lazy } from 'react';
import { ArrowLeft } from 'lucide-react';

const ConsultaNaoAgendada = lazy(() => import('./forms/ConsultaNaoAgendada'));
const InscricaoPreNatal = lazy(() => import('./forms/InscricaoPreNatal'));
const ConsultaPreNatal = lazy(() => import('./forms/ConsultaPreNatal'));
const InscricaoCD = lazy(() => import('./forms/InscricaoCD'));
const ConsultaCD = lazy(() => import('./forms/ConsultaCD'));

interface AnamneseViewProps {
  onModelSelect?: (isActive: boolean) => void;
}

const AnamneseView: React.FC<AnamneseViewProps> = ({ onModelSelect }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  React.useEffect(() => {
    if (onModelSelect) {
      onModelSelect(!!selectedType);
    }
  }, [selectedType, onModelSelect]);

  const renderSelected = () => {
    const onBack = () => setSelectedType(null);
    switch (selectedType) {
      case 'consulta-nao-agendada': return <ConsultaNaoAgendada onBack={onBack} />;
      case 'inscricao-pre-natal': return <InscricaoPreNatal onBack={onBack} />;
      case 'consulta-pre-natal': return <ConsultaPreNatal onBack={onBack} />;
      case 'inscricao-cd': return <InscricaoCD onBack={onBack} />;
      case 'consulta-cd': return <ConsultaCD onBack={onBack} />;
      default: return null;
    }
  };

  const anamneseTypes = [
    { id: 'consulta-nao-agendada', title: 'Consulta não agendada (demanda espontânea)', icon: '🏥', color: 'bg-rose-500/10 text-rose-500' },
    { id: 'inscricao-pre-natal', title: 'Inscrição de Pré-Natal', icon: '🤰', color: 'bg-sky-500/10 text-sky-500' },
    { id: 'consulta-pre-natal', title: 'Consulta de Pré-Natal', icon: '🩺', color: 'bg-indigo-500/10 text-indigo-500' },
    { id: 'inscricao-cd', title: 'Inscrição de CD', icon: '👶', color: 'bg-emerald-500/10 text-emerald-500' },
    { id: 'consulta-cd', title: 'Consulta de CD', icon: '🍼', color: 'bg-amber-500/10 text-amber-500' },
  ];

  if (selectedType) {
    return (
      <div className="animate-in fade-in duration-500 bg-white -mx-4 px-4 md:-mx-8 md:px-8 min-h-screen">
        <div className="max-w-[1400px] mx-auto py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50 flex items-center border-b border-neutral-100 mb-6">
          <button 
            onClick={() => setSelectedType(null)}
            className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-bold text-xs uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para modelos
          </button>
        </div>
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-nexus-blue/20 border-t-nexus-blue rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-400 text-xs uppercase tracking-widest animate-pulse">Carregando Modelo...</p>
          </div>
        }>
          {renderSelected()}
        </Suspense>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 bg-neutral-50 -mx-4 px-4 md:-mx-8 md:px-8 min-h-screen text-neutral-900 w-auto">
      <div className="max-w-[1400px] mx-auto py-6 space-y-10">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-neutral-900 tracking-tight italic">Modelos de Anamnese</h2>
          <p className="text-neutral-500 text-sm mt-2">Guia estruturado para consultas clínicas e acompanhamento.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {anamneseTypes.map((type) => (
            <button 
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className="bg-white border border-neutral-200 p-8 rounded-[2.5rem] cursor-pointer hover:border-nexus-blue/50 hover:-translate-y-1 transition-all group flex flex-col justify-between h-[220px] shadow-sm relative overflow-hidden text-left w-full"
            >
              <div className="relative z-10">
                <span className="text-[9px] font-black text-nexus-blue uppercase tracking-widest mb-2 block">Modelo Clínico</span>
                <h3 className="text-2xl font-black text-neutral-900 tracking-tighter leading-tight group-hover:text-nexus-blue transition-colors">{type.title}</h3>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-neutral-900 transition-colors">Acessar Guia →</span>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${type.color} group-hover:bg-nexus-blue group-hover:text-white transition-all`}>
                  {type.icon}
                </div>
              </div>
              {/* Background Decoration */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-nexus-blue/5 rounded-full blur-2xl group-hover:bg-nexus-blue/10 transition-all"></div>
            </button>
          ))}
        </div>

        <footer className="mt-20 pt-10 border-t border-neutral-200 text-center">
          <p className="text-neutral-400 text-[10px] uppercase tracking-widest">NexusBQ • Guia de Consulta Clínica</p>
        </footer>
      </div>
    </div>
  );
};

export default AnamneseView;
