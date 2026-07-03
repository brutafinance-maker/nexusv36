import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Baby, 
  BookOpen, 
  Activity, 
  Compass, 
  Sparkles, 
  Zap, 
  HelpCircle, 
  ShieldAlert, 
  Flame, 
  Heart,
  ChevronRight,
  Clock,
  Layers,
  FileText,
  AlertTriangle,
  RotateCw,
  PlusSquare,
  ThumbsUp,
  Award
} from 'lucide-react';

interface TrabalhoPartoParturicaoProps {
  onStartQuestions: () => void;
}

export default function TrabalhoPartoParturicao({ onStartQuestions }: TrabalhoPartoParturicaoProps) {
  const [dilatationValue, setDilatationValue] = useState<number>(4);
  const [selectedMecanismo, setSelectedMecanismo] = useState<number>(1);
  const [selectedHormone, setSelectedHormone] = useState<string>('ocitocina');

  // References for smooth scrolling within the same page
  const sectionRefs = {
    introducao: useRef<HTMLDivElement>(null),
    prodromos: useRef<HTMLDivElement>(null),
    colo: useRef<HTMLDivElement>(null),
    hormonios: useRef<HTMLDivElement>(null),
    fases: useRef<HTMLDivElement>(null),
    mecanismos: useRef<HTMLDivElement>(null),
    dequitacao: useRef<HTMLDivElement>(null),
    dor: useRef<HTMLDivElement>(null),
    partograma: useRef<HTMLDivElement>(null),
    resumo: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (id: keyof typeof sectionRefs) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sections = [
    { id: 'introducao', label: '1. Introdução & Sinais' },
    { id: 'prodromos', label: '2. Pródromos vs Real' },
    { id: 'colo', label: '3. O Colo do Útero' },
    { id: 'hormonios', label: '4. Guerra Hormonal' },
    { id: 'fases', label: '5. Fases do Parto' },
    { id: 'mecanismos', label: '6. Mecanismos (Giro)' },
    { id: 'dequitacao', label: '7. Dequitação' },
    { id: 'dor', label: '8. Fisiologia da Dor' },
    { id: 'partograma', label: '9. Partograma (GPS)' },
    { id: 'resumo', label: '10. Resumo de Fixação' },
  ];

  const hormones = [
    {
      id: 'ocitocina',
      name: 'Ocitocina',
      title: 'A Rainha do Parto',
      role: 'Estimula contrações uterinas potentes e coordenadas. É produzida pelo hipotálamo, liberada pela neuro-hipófise e ajuda a salvar vidas no pós-parto comprimindo vasos sanguíneos.',
      target: 'Miométrio',
      badge: 'Indutora & Hemostática',
      colorClass: 'border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-300'
    },
    {
      id: 'prostaglandinas',
      name: 'Prostaglandinas',
      title: 'Os Facilitadores do Colo',
      role: 'Atuam localnemte amolecendo, apagando e dilatando o colo. Alteram a matriz do colágeno para torná-lo elástico.',
      target: 'Colo Uterino',
      badge: 'Maturação Cervical',
      colorClass: 'border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300'
    },
    {
      id: 'estrogenio',
      name: 'Estrogênio',
      title: 'O Sensibilizador Uterino',
      role: 'Aumenta a densidade de receptores miometrais de ocitocina e as gap junctions (junções comunicantes), preparando o tecido para responder.',
      target: 'Receptores Miometrais',
      badge: 'Excitabilidade',
      colorClass: 'border-pink-500/30 bg-pink-500/5 text-pink-700 dark:text-pink-300'
    },
    {
      id: 'progesterona',
      name: 'Progesterona',
      title: 'O Freio Gestacional',
      role: 'Mantém o útero amparado e quiescente durante a gravidez. Perto da hora do parto, seu efeito bloqueador cai drasticamente.',
      target: 'Quiescência Uterina',
      badge: 'Bloqueador (Cai no fim)',
      colorClass: 'border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300'
    }
  ];

  const mecanismos = [
    { step: 1, title: 'Insinuação', desc: 'Passagem do maior diâmetro transverso da apresentação (diâmetro biparietal) pelo estreito superior da pelve materna.' },
    { step: 2, title: 'Descida', desc: 'Deslocamento contínuo e progressivo do bebezinho ao longo do trajeto (canal do parto).' },
    { step: 3, title: 'Flexão', desc: 'O feto flete o queixo contra o peito para oferecer o menor diâmetro possível da cabeça (suboccipitobregmático).' },
    { step: 4, title: 'Rotação Interna', desc: 'A cabeça fetal gira de forma a deixar a nuca logo abaixo da sínfise púbica da mãe (geralmente occipito-púbica).' },
    { step: 5, title: 'Extensão (ou Deflexão)', desc: 'Movimento de dobradiça: a cabeça do feto emerge para cima, saindo da pelve sacra.' },
    { step: 6, title: 'Rotação Externa (Desprendimento)', desc: 'A cabeça gira fora para restabelecer o alinhamento com os ombros biacromiais que entram na bacia.' },
    { step: 7, title: 'Expulsão', desc: 'Saída completa dos ombros (primeiro anterior sob o púbis, depois o posterior) e de todo o corpo restante.' }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 sm:p-8 shadow-xl animate-in fade-in duration-500 max-w-4xl mx-auto space-y-12">
      
      {/* Editorial Header */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-8 text-center sm:text-left space-y-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="p-1 px-3 text-[10px] bg-red-500/10 text-red-650 dark:text-red-400 rounded-full font-black tracking-widest flex items-center gap-1.5 uppercase">
            <Activity size={12} className="animate-pulse text-red-500" />
            Tema Quente de Residência Médica & Revalida
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight uppercase italic flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
          <span>Trabalho de</span>
          <span className="text-red-500 underline decoration-wavy decoration-red-500/30">Parto e Parturição</span>
        </h1>
        
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Este é o material completo, estruturado em uma única página para leitura focada de alto rendimento. Ative os mecanismos visuais para fixação muscular e prepare-se perfeitamente para gabaritar suas questões acadêmicas.
        </p>

        {/* Quick Menu / Index Map */}
        <div className="bg-neutral-50 dark:bg-zinc-950 p-4 rounded-2xl border border-neutral-100 dark:border-zinc-800">
          <p className="text-[10px] font-black uppercase text-zinc-400 tracking-wider mb-2 flex items-center gap-1.5">
            <Compass size={12} />
            Navegação Rápida (Clique para rolar)
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sections.map(sec => (
              <button
                key={sec.id}
                id={`anchor-nav-btn-${sec.id}`}
                onClick={() => scrollToSection(sec.id as any)}
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-red-500 hover:bg-red-500/5 border border-zinc-200 dark:border-zinc-850 transition-all"
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: INTRODUCAO */}
      <div ref={sectionRefs.introducao} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">✨</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            1. Introdução & Sinais do Corpo
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-500/5 to-rose-500/5 dark:from-red-950/[0.1] dark:to-rose-950/[0.1] p-6 rounded-3xl border border-red-500/10 space-y-4">
          <h3 className="text-md font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-red-500 shrink-0" size={18} />
            Como o corpo sabe a hora certa de começar o parto?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Reflita sobre uma pergunta intrigante: o útero passou literalmente <strong>meses</strong> evitando contrações fortes (mantendo o colo trancado e o miométrio relaxado)... e, de um momento para o outro, ele muda completamente de comportamento.
          </p>
          <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 font-semibold italic">
            É aí que se inicia o espetaculoso processo do trabalho de parto!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-red-500">
              O Pré-Aquecimento Fisiológico
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              A gestante geralmente chega ao consultório ou pronto-socorro referindo:
              <span className="block my-2 p-3 bg-neutral-55 dark:bg-zinc-950 rounded-xl italic border-l-4 border-zinc-300 text-zinc-700 dark:text-zinc-350">
                — “Estou sentindo umas dores estranhas…”
              </span>
              Só que nem toda dor significa parto verdadeiro! Dias antes de dar a largada, o organismo começa um pré-aquecimento fundamental.
            </p>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow bg-zinc-50 dark:bg-zinc-950 p-2">
            <img 
              src="https://images.openai.com/static-rsc-4/-HsnQlWT5wfflgUicSd39o8E4q1su2dm9ujzv7Brq3dVltLti-B4kj0xDiGiQt5E2nI504aOBbq7BzDE_Oudmsoc2Ttpwu7xCdEgVsy-L-Ah2hw-ljgOVZD-bppA2ukxNoijUcwglaVqk_8AAAs8cWqdVyVxelnzeASnYbdDhWY?purpose=inline" 
              alt="Anatomia pélvica e feto" 
              className="w-full h-auto object-cover max-h-56 rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="p-2.5 text-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                Pressão e Alinhamento Pélvico Inicial
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider">
            Sinais Tradicionais de Próxima Ativação (Pródromos):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { title: 'Pressão Pélvica', desc: 'Bebé encaixando' },
              { title: 'Dor Lombar', desc: 'Irradiação sacral' },
              { title: 'Tampão Mucoso', desc: 'Saída de muco cervical' },
              { title: 'Contrações Irregulares', desc: 'Frequência sem nexo' },
              { title: 'Sensação de Bebê Baixo', desc: 'Facilidade para respirar' }
            ].map((item, idx) => (
              <div key={idx} className="bg-neutral-50 dark:bg-zinc-950 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-850 text-center space-y-1">
                <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-black text-xs mx-auto mb-1">
                  {idx + 1}
                </span>
                <p className="font-extrabold text-[11px] text-zinc-800 dark:text-zinc-200 uppercase tracking-tight">{item.title}</p>
                <p className="text-[10px] text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-2xl mt-4">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest">⚠️ ESSENCIAL PARA PROVA</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1 font-semibold">
              O nome disso é: <strong>pródromos do parto</strong>. Lembre-se, essas contrações iniciais, embora doloridas ou assustadoras, NÃO representam ainda o trabalho de parto verdadeiro.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: PRODROMOS VS REAL */}
      <div ref={sectionRefs.prodromos} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">⚠️</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            2. Pródromos vs Trabalho de Parto Verdadeiro
          </h2>
        </div>

        <div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed">
            A maioria absoluta das pessoas pensa automaticamente: <em>“Se tem barulho de dor e contração na barriga, a mulher já está em trabalho de parto!”</em>. Para a obstetrícia e para os exames acadêmicos, essa afirmação está totalmente <strong>incompleta</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Falso/Pródromos */}
          <div className="border border-rose-500/20 bg-rose-500/[0.02] dark:bg-rose-950/[0.05] rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/10">
              <span className="text-xs font-black uppercase text-rose-600 tracking-wider">FALSO TRABALHO / PRÓDROMOS</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-550 animate-pulse bg-rose-500" />
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 text-lg">▪</span>
                <span><strong>Ritmo Irregular:</strong> Intervalos entre dores não se aproximam no relógio.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 text-lg">▪</span>
                <span><strong>Intensidade Estática:</strong> Pancadas na barriga de força uniforme que não sobem no gráfico.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 text-lg">▪</span>
                <span><strong>Falta de Efeito no Colo:</strong> Toque vaginal mostra colo espesso, fechado e posteriorizado.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 text-lg">▪</span>
                <span><strong>Efeito do Repouso:</strong> Deitar de lado ou tomar um banho morno costuma apaziguar todas as dores.</span>
              </li>
            </ul>
          </div>

          {/* Verdadeiro */}
          <div className="border border-emerald-500/20 bg-emerald-500/[0.02] dark:bg-emerald-950/[0.05] rounded-3xl p-6 space-y-4 ring-1 ring-emerald-500/10">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/10">
              <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">VERDADEIRO TRABALHO DE PARTO</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-550 animate-ping bg-emerald-500" />
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 text-lg">▪</span>
                <span><strong>Regularidade Férrea:</strong> Contrações rítmicas (mínimo de 2-3 a cada 10 minutos).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 text-lg">▪</span>
                <span><strong>Aumento Progressivo:</strong> Ficam dolorosamente mais longas e frequentes no tempo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 text-lg">▪</span>
                <span><strong>Modificação do Colo Uterino:</strong> O colo amolece, apaga e inicia dilatação efetiva (normalmente 4cm ou mais).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 text-lg">▪</span>
                <span><strong>Independe da Atividade:</strong> Andar ou repousar não diminui a potência do motor uterino ativo.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-zinc-900 text-zinc-100 p-5 rounded-3xl text-xs font-mono space-y-1">
          <p className="text-red-400 font-bold uppercase tracking-widest text-[10px]">🩺 SÍNTESE ACADÊMICA</p>
          <p className="leading-relaxed">
            Contração sem dilatação correspondente NÃO define trabalho de parto verdadeiro. Ponto final do raciocínio crítico!
          </p>
        </div>
      </div>

      {/* SECTION 3: O COLO DO UTERO */}
      <div ref={sectionRefs.colo} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">🤰</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            3. O Grande Protagonista – Colo do Útero
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              O colo precisa passar por exatamente três etapas fundamentais e consecutivas para dar passagem fetal:
            </p>
            
            <div className="space-y-2.5 text-xs font-semibold">
              <div className="flex items-center gap-3 p-3.5 bg-neutral-50 dark:bg-zinc-950 border border-neutral-100 dark:border-zinc-850 rounded-xl">
                <span className="p-1 px-2.5 bg-red-150 bg-red-100 dark:bg-rose-950/40 text-red-650 rounded-lg">A</span>
                <div>
                  <h5 className="font-extrabold uppercase">Amolecimento (Amaciamento)</h5>
                  <p className="text-zinc-400 text-[11px] mt-0.5">Mudança estrutural: consistência cartilaginosa vira consistência de lábios.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-neutral-50 dark:bg-zinc-950 border border-neutral-100 dark:border-zinc-850 rounded-xl">
                <span className="p-1 px-2.5 bg-red-150 bg-red-100 dark:bg-rose-950/40 text-red-650 rounded-lg">B</span>
                <div>
                  <h5 className="font-extrabold uppercase">Apagamento (Esvaecimento)</h5>
                  <p className="text-zinc-400 text-[11px] mt-0.5">O colo fica extremamente fino, até se incorporar por completo à parede uterina.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-neutral-50 dark:bg-zinc-950 border border-neutral-100 dark:border-zinc-850 rounded-xl">
                <span className="p-1 px-2.5 bg-red-150 bg-red-100 dark:bg-rose-950/40 text-red-650 rounded-lg">C</span>
                <div>
                  <h5 className="font-extrabold uppercase">Dilatação</h5>
                  <p className="text-zinc-400 text-[11px] mt-0.5">Abertura centrífuga circular do canal transuterino para livre tráfego cefálico.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500">
              E por que isso importa tanto no estudo? Porque o bebê simplesmente <strong>não consegue passar</strong> por um colo rígido e fechado. A dilatação total requerida na clínica é de exatamente <strong>10 cm</strong>.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-400">
              <span>Simulador Cervical Interativo</span>
              <span className="text-red-500 font-black">{dilatationValue} cm</span>
            </div>

            {/* Simulated cervix dynamically sizing */}
            <div className="flex justify-center py-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <div className="relative w-40 h-40 bg-rose-50 dark:bg-zinc-850 rounded-full flex items-center justify-center border-4 border-zinc-200 dark:border-zinc-700">
                <div 
                  className="bg-zinc-900 dark:bg-black rounded-full border-2 border-red-500 flex items-center justify-center text-[10px] font-black text-white transition-all shadow-inner"
                  style={{ 
                    width: `${Math.max(10, (dilatationValue / 10) * 100)}%`, 
                    height: `${Math.max(10, (dilatationValue / 10) * 100)}%`
                  }}
                >
                  {dilatationValue === 10 ? 'COROAÇÃO!' : `${dilatationValue}cm`}
                </div>
              </div>
            </div>

            <input 
              type="range" 
              min="1" 
              max="10" 
              value={dilatationValue}
              onChange={(e) => setDilatationValue(parseInt(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-400 text-center font-bold">
              Arraste o controle acima para visualizar o tamanho cirúrgico da abertura do colo do útero!
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: GUERRA HORMONAL */}
      <div ref={sectionRefs.hormonios} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">🧬</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            4. Quem "liga" o Trabalho de Parto? (Gerra Hormonal)
          </h2>
        </div>

        <div>
          <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed">
            A sincronia da expulsão uterina não é milagrosa, é neuro-hormonal. Quatro substâncias comandam o espetáculo e caem direto nas provas teóricas. Clique em cada uma para ver o raio-x analítico de sua atuação:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {hormones.map(hormone => (
            <button
              key={hormone.id}
              id={`btn-hormone-single-${hormone.id}`}
              onClick={() => setSelectedHormone(hormone.id)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedHormone === hormone.id
                  ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/15'
                  : 'bg-neutral-50 dark:bg-zinc-950 border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100 text-zinc-700 dark:text-zinc-350'
              }`}
            >
              <span className="text-[9px] uppercase font-bold tracking-widest opacity-80 block mb-1">
                {hormone.badge}
              </span>
              <h4 className="font-extrabold text-sm uppercase">{hormone.name}</h4>
              <span className="block text-[8px] font-bold opacity-75 mt-1">Alvo: {hormone.target}</span>
            </button>
          ))}
        </div>

        <div className={`p-6 rounded-3xl border ${hormones.find(h => h.id === selectedHormone)?.colorClass} space-y-2`}>
          <div className="flex flex-wrap justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
            <h4 className="text-md font-black uppercase italic">{hormones.find(h => h.id === selectedHormone)?.title}</h4>
            <span className="text-[9px] bg-black/10 px-2.5 py-1 rounded font-black uppercase tracking-wider">
              {hormones.find(h => h.id === selectedHormone)?.target}
            </span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-semibold">
            {hormones.find(h => h.id === selectedHormone)?.role}
          </p>
        </div>
      </div>

      {/* SECTION 5: FASES DO TRABALHO DE PARTO */}
      <div ref={sectionRefs.fases} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">⏳</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            5. As Fases Clínicas do Trabalho de Parto
          </h2>
        </div>

        <div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed">
            As provas de concurso adoram cobrar detalhadamente as etapas cronológicas. Vamos entender cada uma minuciosamente:
          </p>
        </div>

        {/* 1A FASE: DILATACAO */}
        <div className="bg-neutral-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h3 className="text-md font-black uppercase text-red-500 tracking-wide flex items-center gap-2">
              <span className="p-1 px-2.5 bg-red-100 dark:bg-red-950 text-red-650 rounded font-black text-xs">1ª Fase</span>
              Período de Dilatação
            </h3>
            <span className="text-xs font-bold bg-zinc-200/50 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-650 dark:text-zinc-400">
              Meta: Abrir de 0 a 10 cm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                Subfase Latente
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500">✔</span>
                  <span>Contrações de menor intensidade e amplitude.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500">✔</span>
                  <span>Dilação cervical vagarosa e lenta.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500">✔</span>
                  <span>Avança até aproximadamente <strong>5 a 6 cm</strong>.</span>
                </li>
                <li className="flex items-start gap-1.5 text-[10px] text-zinc-400 italic">
                  * A gestante geralmente mantém comportamento normal do cotidiano.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-red-500">
                Subfase Ativa (O Ritmo Acelera)
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500">☄</span>
                  <span>Contrações muito mais rítmicas, intensas e doloridas.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500">☄</span>
                  <span>Progresso geométrico veloz e dilatador do colo.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500">☄</span>
                  <span>Comportamento concentrado e busca de posições facilitadoras.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm max-w-md mx-auto bg-white p-2">
            <img 
              src="https://images.openai.com/static-rsc-4/BqNYTsOca9yJFVpJ6iSEreSgmBxB0tDj01PNMgrypnQZ2D-aOv1dyN09dQM6YqUnrH735sVDOYx78LwRqBqDAG3WTESd6C8wcPWn2EyC2fsWkn27seEKdcGm9CqZslb3bMUkXcL71IshiI-BLkWEx7IL4MjZ8q-GnM8XeVslrcE?purpose=inline" 
              alt="Mecanismo Clínico de toque de dilatação" 
              className="w-full h-auto object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 text-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Progressão do Apagamento ao Toque Cervical
              </span>
            </div>
          </div>
        </div>

        {/* 2A FASE: EXPULSIVO */}
        <div className="bg-neutral-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h3 className="text-md font-black uppercase text-red-500 tracking-wide flex items-center gap-2">
              <span className="p-1 px-2.5 bg-red-100 dark:bg-red-950 text-red-650 rounded font-black text-xs">2ª Fase</span>
              Período Expulsivo (Nascimento)
            </h3>
            <span className="text-xs font-bold bg-zinc-200/50 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-650 dark:text-zinc-400">
              Trabalho de Força e Ejeção Fetal
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-semibold">
            Esta é a fase folclórica associada ao parto: com dilatação de 10 cm, o pélvis materno está totalmente desobstruído. A musculatura estimula as famosas forças involuntárias ("puxo involuntário").
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 p-4 rounded-2xl space-y-1">
              <span className="font-black text-red-500 block">FORTE PRESSÃO</span>
              <p className="text-zinc-400 text-[11px]">Sensação intensa sobre o reto e bacia.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 p-4 rounded-2xl space-y-1">
              <span className="font-black text-red-500 block">DESEJO DE PUXO</span>
              <p className="text-zinc-400 text-[11px]">Necessidade ativa e premente de realizar prensa abdominal.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 p-4 rounded-2xl space-y-1">
              <span className="font-black text-red-500 block">DISTENSÃO PERINEAL</span>
              <p className="text-zinc-400 text-[11px]">Dilatação máxima do períneo (o "círculo de fogo").</p>
            </div>
          </div>

          <div className="bg-amber-500/5 border-l-4 border-amber-500 p-4 rounded-2xl mt-4">
            <p className="text-xs font-black text-neutral-800 dark:text-white uppercase">⚠️ DETALHE ENGENHOSO DO CORPO</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1">
              O feto <strong>não sai em linha reta uniforme</strong>. Como os diâmetros ósseos internos da pelve se alteram, a cabecinha fetal executa uma coreografia cardeal de giro adaptativo.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 6: MECANISMOS DO PARTO */}
      <div ref={sectionRefs.mecanismos} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">👶</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            6. O Bebê Literalmente "Gira" para Nascer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed">
              Estes passos de bailado pélvico são chamados cientificamente de <strong>Mecanismos do Parto</strong>. Para compreender isso de forma intuitiva, interaja com o guia mecânico abaixo passo a passo:
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
              {mecanismos.map(mec => (
                <button
                  key={mec.step}
                  id={`btn-mecanismo-multi-${mec.step}`}
                  onClick={() => setSelectedMecanismo(mec.step)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${
                    selectedMecanismo === mec.step
                      ? 'bg-red-500/10 border-red-550 text-red-750 dark:text-red-300 font-bold'
                      : 'bg-neutral-50 dark:bg-zinc-950 border-neutral-100 dark:border-zinc-850 hover:bg-neutral-100 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded flex items-center justify-center border text-[10px] font-black shrink-0 ${
                    selectedMecanismo === mec.step ? 'bg-red-500 text-white border-red-500' : 'bg-white dark:bg-zinc-800 text-zinc-400'
                  }`}>
                    {mec.step}
                  </span>
                  <div>
                    <span className="font-extrabold uppercase text-[11px] block">{mec.title}</span>
                    {selectedMecanismo === mec.step && (
                      <p className="mt-1 text-[11px] font-semibold text-zinc-650 dark:text-zinc-400">
                        {mec.desc}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-zinc-200 dark:border-zinc-850 rounded-3xl overflow-hidden shadow-sm bg-white p-2">
              <img 
                src="https://images.openai.com/static-rsc-4/E5fCwZqW3LvQJNcy5znfaIC930Q-o3SkYJJcrVh2xobYeAdZj3KjAiFZpJna4wkQq_YIx6f2h8jp9844Dj4HZkYcgOZQp7vRL5R-M_EkR7ITPkdxl4saoXgCDpzVSEOlI1NGuokKmBG_rvXTwm_2JggSwo4i_1pH9w-gKLnVsKY?purpose=inline" 
                alt="Diagrama esquemático dos movimentos cardinais" 
                className="w-full h-auto object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 text-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  Rotação e Alinhamento no Interior do Canal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 7: DEQUITACAO */}
      <div ref={sectionRefs.dequitacao} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">🩸</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            7. A 3ª Fase – Período de Dequitação
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed font-semibold">
              Nunca se esqueça: o nascimento do bebê NÃO completa o ato obstétrico total! Ainda falta expelir a placenta. Este evento biológico chama-se: <strong>Dequitação</strong>.
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              O desprendimento da placenta costuma ocorrer naturalmente nos primeiros 10 a 30 minutos pós-parto, devido à súbita atenuação de volume do miométrio.
            </p>
            
            <div className="border-l-4 border-rose-500 bg-rose-500/5 dark:bg-rose-950/10 p-4 rounded-r-2xl space-y-1.5">
              <h5 className="font-extrabold uppercase text-xs text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <ShieldAlert size={14} />
                A Maior Ameaça: Hemorragia Pós-Parto (HPP)
              </h5>
              <p className="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed font-semibold">
                Se o útero falhar em se contrair vigorosamente no minuto imediatamente após a dequitação, acontece a <strong>atonia uterina</strong>. Ela é a maior causa evitável de morte materna global!
              </p>
            </div>
          </div>

          <div className="p-5 border border-zinc-200 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 rounded-3xl space-y-3.5">
            <h4 className="text-xs font-black uppercase text-red-500 tracking-wider">
              Qual é o papel salvador da Ocitocina?
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Após o deslocamento placentário, dezenas de arteríolas espiraladas calibrosas uterinas são rompidas de uma vez. Para tamponar esse sangramento abundante, o próprio tecido se aperta como uma <strong>ligadura estrutural de Pinard</strong>.
            </p>
            <div className="bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 p-3 rounded-xl text-xs font-black uppercase text-center tracking-wider">
              OCITOCINA PROFILÁTICA DE ROTINA: 10 UI IM imediata
            </div>
            <p className="text-[10px] text-zinc-400 italic text-center font-bold">
              * Recomendado internacionalmente pela OMS a toda dequitação ativa.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 8: EVOLUCAO DA DOR */}
      <div ref={sectionRefs.dor} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">⚡</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            8. Fisiopatologia e Evolução da Dor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-305 leading-relaxed">
              O estímulo doloroso do parto assume rotas neurológicas radicalmente distintas dependendo da evolução clínica:
            </p>

            <div className="grid grid-cols-1 gap-3 text-xs font-semibold">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-2xl">
                <span className="p-1 px-2.5 bg-red-100 dark:bg-red-950 text-red-650 rounded text-[10px] font-black uppercase tracking-widest block w-max mb-2">
                  Começo / Dilatação
                </span>
                <h5 className="font-extrabold uppercase">DOR VISCERAL (T10 a L1)</h5>
                <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed">
                  Provocada pela hipóxia temporária da contração e estiramento do anel cervical. É difusa, vaga, mal circunscrita, irradiando para a região lombar.
                </p>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-2xl">
                <span className="p-1 px-2.5 bg-red-100 dark:bg-red-950 text-red-650 rounded text-[10px] font-black uppercase tracking-widest block w-max mb-2">
                  Final / Expulsivo
                </span>
                <h5 className="font-extrabold uppercase">DOR SOMÁTICA (S2 a S4)</h5>
                <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed">
                  Provocada pela compressão sacral e distensão violenta dos tecidos perineais baixos. Corre pelas fibras do <strong>nervo pudendo</strong>. É extremamente localizada, aguda e cortante.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-805 rounded-3xl overflow-hidden shadow-sm bg-white p-2">
            <img 
              src="https://images.openai.com/static-rsc-4/F66ijwSi5oWcjA_OsNmmBVmhMkjSqBjU6tj159NLi6D9YiRDuixkgRNzrq2qd1nTlxJT4EE3cyLiGEx8PLW_sbeDGLshxlgzHL4GhCB_nn8xcmj-YeGDcDMjPXyOv69n3A_bOWVONvTSprWCLzR8hGB2UIc2PBRPgcug9RH6F9c?purpose=inline" 
              alt="Transmissão nervosa da dor no parto" 
              className="w-full h-auto object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 text-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                Vias Nervosas e Dermátomos Envolvidos (T10-L1 e S2-S4)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 9: O PARTOGRAMA */}
      <div ref={sectionRefs.partograma} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">📈</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            9. O Partograma — O GPS Clínico do Parto
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3.5 text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-semibold">
            <p>
              O <strong>partograma</strong> é uma planilha e representação gráfica obrigatória anexada ao prontuário clínico. Nela desenha-se o avanço da dilatação a cada hora.
            </p>
            <p className="text-xs text-zinc-500">
              Ele atua de forma decisiva para acusar anomalias dinâmicas do parto antes que o sofrimento do concepto ou estiramentos uterinos drásticos se concretizem.
            </p>
            
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl space-y-2 border border-zinc-150">
              <span className="text-xs font-black text-red-500 uppercase">Rastreamento Triplo:</span>
              <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
                <li>• Dilatação cervical da gestante (linha contínua)</li>
                <li>• Altura da cabeça do feto pelos planos de De Lee</li>
                <li>• Frequência cardíaca fetal (prevenção de sofrimento fetal agudo)</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-500/5 dark:bg-amber-950/15 border border-amber-500/20 p-5 rounded-3xl space-y-3 font-semibold text-xs text-amber-900 dark:text-amber-400">
            <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle size={15} />
              Sinais e Distócias de Alerta Máximo na Prova:
            </h4>
            <div className="space-y-2.5">
              <div>
                <span className="font-extrabold uppercase">a) Fase Ativa Prolongada:</span>
                <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mt-0.5">Dilatação avança de forma desesperadoramente lerda (&lt; 1cm por hora) devido a inércia muscular.</p>
              </div>
              <div>
                <span className="font-extrabold uppercase">b) Parada Secundária da Dilatação:</span>
                <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mt-0.5">Toque vaginal com dilatação idêntica em duas medidas com espaçamento de 2 horas. Risco de DCP (Desproporção Céfalo-Pélvica).</p>
              </div>
              <div>
                <span className="font-extrabold uppercase">c) Parto Taquitócito (Precipitado):</span>
                <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mt-0.5">O bebê nasce inteiro em menos de 4 horas desde a dilatação inicial.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 10: O RESUMO QUE FIXA */}
      <div ref={sectionRefs.resumo} className="space-y-6 pt-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xl">🧠</span>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
            10. O Resumo Médico que Fixa na Memória
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-black uppercase tracking-wider text-center">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-2xl flex flex-col justify-center gap-1.5">
            <span className="text-zinc-400 text-[9px]">PARTURIMENTOS</span>
            <span className="text-red-500 font-extrabold text-sm font-mono">DILATAÇÃO 10 CM</span>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium lowercase">exigidos para coroamento cefálico</p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-2xl flex flex-col justify-center gap-1.5">
            <span className="text-zinc-400 text-[9px]">INTERVENÇÃO RÁPIDA</span>
            <span className="text-emerald-500 font-extrabold text-sm font-mono">OCITOCINA PROF.</span>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium lowercase text-center">essencial para prevenir atonia pós-parto</p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-2xl flex flex-col justify-center gap-1.5">
            <span className="text-zinc-400 text-[9px]">DIAGNOSTICAÇÃO</span>
            <span className="text-blue-500 font-extrabold text-sm font-mono">CONTR. + COLO</span>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium lowercase">modificações cervicais dinâmicas obrigatórias</p>
          </div>
        </div>

        <div className="bg-red-550 bg-red-500 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto text-xl">🏆</div>
          <h4 className="text-lg font-black uppercase tracking-tight italic">
            Estudo Teórico Concluído!
          </h4>
          <p className="text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            Você leu com atenção todos os segredos fisiopatológicos, hormonais e mecânicos do verdadeiro trabalho de parto e da prevenção de hemorragias. Demonstre seus conhecimentos respondendo às questões clínicas agora!
          </p>

          <button
            id="btn-trigger-questions-end-page"
            onClick={onStartQuestions}
            className="cursor-pointer mx-auto w-full max-w-xs py-4 bg-white text-zinc-900 border border-neutral-100 rounded-2xl hover:bg-neutral-50 shadow-md flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
          >
            Avançar para as Questões
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
