
import React from 'react';

const SuporteBasicoVida: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 border-b border-neutral-200 dark:border-nexus-border pb-8">
        <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.4em] mb-4 block">Emergência e Trauma</span>
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Suporte Básico de Vida (SBV)
        </h1>
        <p className="text-neutral-500 dark:text-nexus-text-main text-lg leading-relaxed">
          Protocolos essenciais para o atendimento inicial: Sequência X-ABCDE, manejo de síncope, convulsão, engasgo e PCR.
        </p>
      </header>

      {/* SEQUÊNCIA X-ABCDE */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-rose-500/20"></div>
          <h2 className="text-2xl font-black text-rose-500 uppercase tracking-widest">Protocolo X-ABCDE</h2>
          <div className="h-px flex-grow bg-rose-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { letter: "X", title: "Exanguinação", desc: "Controle de hemorragias externas graves." },
            { letter: "A", title: "Airway", desc: "Via aérea e proteção da coluna cervical." },
            { letter: "B", title: "Breathing", desc: "Respiração e ventilação adequada." },
            { letter: "C", title: "Circulation", desc: "Circulação e controle de choque." },
            { letter: "D", title: "Disability", desc: "Avaliação neurológica (Glasgow)." },
            { letter: "E", title: "Exposure", desc: "Exposição e controle da hipotermia." }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm group hover:border-rose-500 transition-colors">
              <div className="text-3xl font-black text-rose-500 mb-2">{item.letter}</div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-1 uppercase tracking-tight">{item.title}</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PCR - PARADA CARDIORRESPIRATÓRIA */}
      <section className="mb-16">
        <div className="bg-neutral-900 text-white p-10 rounded-[3rem] shadow-xl">
          <h2 className="text-3xl font-black tracking-tighter mb-8 italic text-rose-400">Parada Cardiorrespiratória</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Ritmos Chocáveis</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="font-bold text-rose-400">FV:</span> Fibrilação Ventricular
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="font-bold text-rose-400">TVSP:</span> Taquicardia Ventricular Sem Pulso
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Ritmos Não Chocáveis</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="font-bold text-sky-400">AESP:</span> Atividade Elétrica Sem Pulso
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="font-bold text-sky-400">Assistolia:</span> Ausência de atividade elétrica
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-rose-500/10 p-8 rounded-3xl border border-rose-500/20 flex flex-col justify-center">
              <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-4">Compressões de Alta Qualidade</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Frequência: 100-120/min</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Profundidade: 5-6 cm</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Retorno total do tórax</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Minimizar interrupções</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONVULSÃO E SÍNCOPE */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-sky-50 dark:bg-nexus-surface p-8 rounded-[2.5rem] border border-sky-200 dark:border-nexus-border">
            <h3 className="text-xl font-black text-sky-600 mb-4 italic">Manejo da Convulsão</h3>
            <ul className="space-y-3 text-xs text-neutral-600 dark:text-nexus-text-main leading-relaxed">
              <li>• <strong className="text-neutral-900 dark:text-white">Segurança:</strong> Afastar objetos perigosos.</li>
              <li>• <strong className="text-neutral-900 dark:text-white">Posicionamento:</strong> Decúbito lateral (evitar aspiração).</li>
              <li>• <strong className="text-neutral-900 dark:text-white">Proteção:</strong> Proteger a cabeça, não colocar nada na boca.</li>
              <li>• <strong className="text-neutral-900 dark:text-white">Tempo:</strong> Cronometrar a duração da crise.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-nexus-surface p-8 rounded-[2.5rem] border border-emerald-200 dark:border-nexus-border">
            <h3 className="text-xl font-black text-emerald-600 mb-4 italic">Manejo da Síncope</h3>
            <ul className="space-y-3 text-xs text-neutral-600 dark:text-nexus-text-main leading-relaxed">
              <li>• <strong className="text-neutral-900 dark:text-white">Posição de Choque:</strong> Elevação dos MMII a 45°.</li>
              <li>• <strong className="text-neutral-900 dark:text-white">Avaliação:</strong> Checar responsividade e pulso.</li>
              <li>• <strong className="text-neutral-900 dark:text-white">Recuperação:</strong> Hidratação após retorno da consciência.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* OVACE */}
      <section className="mb-16">
        <div className="bg-amber-500/5 border border-amber-500/20 p-10 rounded-[3rem]">
          <h2 className="text-2xl font-black text-amber-600 mb-6 italic tracking-tighter">Engasgo (OVACE)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-xs font-black text-amber-600 uppercase mb-4 tracking-widest">Adultos e Crianças &gt; 1 ano</h4>
              <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
                <h5 className="font-bold text-sm text-neutral-900 dark:text-white mb-2 underline decoration-amber-500 underline-offset-4">Manobra de Heimlich</h5>
                <p className="text-xs text-neutral-500 leading-relaxed">Compressões abdominais rápidas "em J" (para dentro e para cima) até a desobstrução ou inconsciência.</p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-600 uppercase mb-4 tracking-widest">Lactentes (&lt; 1 ano)</h4>
              <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
                <h5 className="font-bold text-sm text-neutral-900 dark:text-white mb-2 underline decoration-amber-500 underline-offset-4">Tapas e Compressões</h5>
                <p className="text-xs text-neutral-500 leading-relaxed">5 tapas firmes entre as escápulas + 5 compressões torácicas com o bebê em decúbito ventral/dorsal declive.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-20 pt-10 border-top border-neutral-200 dark:border-nexus-border text-center">
        <p className="text-neutral-400 text-[10px] uppercase tracking-widest">NexusBQ • Habilidades Profissionais 2 • 2025</p>
      </footer>
    </div>
  );
};

export default SuporteBasicoVida;
