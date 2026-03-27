
import React from 'react';

const PatologiasOsteoarticulares: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 border-b border-neutral-200 dark:border-nexus-border pb-8">
        <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-4 block">Patologias Osteoarticulares</span>
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Patologias do Sistema Locomotor
        </h1>
        <p className="text-neutral-500 dark:text-nexus-text-main text-lg leading-relaxed">
          Estudo das principais doenças metabólicas e inflamatórias das articulações e ossos.
        </p>
      </header>

      {/* OSTEOPOROSE */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-amber-500/20"></div>
          <h2 className="text-2xl font-black text-amber-500 uppercase tracking-widest">Osteoporose</h2>
          <div className="h-px flex-grow bg-amber-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Definição</h3>
            <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed">
              Doença metabólica caracterizada pela diminuição da massa óssea e deterioração da microarquitetura, levando à fragilidade e risco de fraturas.
            </p>
            <div className="bg-amber-50 dark:bg-nexus-surface p-6 rounded-2xl border border-amber-200 dark:border-nexus-border">
              <h4 className="text-xs font-black text-amber-600 uppercase mb-3">Diagnóstico (DMO)</h4>
              <p className="text-xs text-neutral-500 leading-relaxed italic">"Confirmado pelo Escore T na Densitometria Óssea."</p>
            </div>
          </div>
          <div className="bg-neutral-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4">Manifestações Clínicas</h3>
            <ul className="space-y-3 text-sm italic">
              <li>• Geralmente assintomática</li>
              <li>• Perda de estatura</li>
              <li>• Cifose torácica</li>
              <li>• Fraturas por fragilidade</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ARTRITE GOTOSA */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-rose-500/20"></div>
          <h2 className="text-2xl font-black text-rose-500 uppercase tracking-widest">Artrite Gotosa (Gota)</h2>
          <div className="h-px flex-grow bg-rose-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-rose-50 dark:bg-nexus-surface p-8 rounded-[2.5rem] border border-rose-200 dark:border-nexus-border">
            <h3 className="text-xl font-black text-rose-600 mb-4 italic">Crise Aguda</h3>
            <p className="text-xs text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-4">
              Início súbito de dor intensa, edema e calor. Geralmente monoarticular.
            </p>
            <div className="bg-white dark:bg-nexus-card p-4 rounded-xl border border-rose-200 shadow-sm">
              <span className="font-bold text-xs text-neutral-900 dark:text-white uppercase">Podagra:</span>
              <span className="text-xs text-neutral-500 ml-2">Acometimento clássico da 1ª metatarsofalângica (dedão).</span>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Fisiopatologia</h3>
            <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed">
              Depósito de cristais de <strong className="text-rose-500">monourato de sódio</strong> nas articulações devido à hiperuricemia (&gt; 6,8 mg/dL).
            </p>
            <div className="bg-neutral-100 dark:bg-nexus-surface p-4 rounded-xl border border-neutral-200 dark:border-nexus-border">
              <h4 className="text-[10px] font-black text-neutral-400 uppercase mb-2">Gota Crônica Tofácea</h4>
              <p className="text-[11px] text-neutral-500">Presença de <strong className="text-neutral-900 dark:text-white">Tofos</strong> (depósitos de cristais cercados por tecido inflamatório).</p>
            </div>
          </div>
        </div>
      </section>

      {/* OSTEOARTRITE VS ARTRITE REUMATOIDE */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-sky-500/20"></div>
          <h2 className="text-2xl font-black text-sky-500 uppercase tracking-widest">Diferencial Articular</h2>
          <div className="h-px flex-grow bg-sky-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-nexus-card p-8 rounded-[2.5rem] border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h3 className="text-xl font-black text-sky-600 mb-6 italic">Osteoartrite</h3>
            <ul className="space-y-4 text-xs text-neutral-500">
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5"></div> <span><strong className="text-neutral-900 dark:text-white">Mecânica:</strong> Piora com esforço, melhora com repouso.</span></li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5"></div> <span><strong className="text-neutral-900 dark:text-white">Nódulos:</strong> Heberden (distais) e Bouchard (proximais).</span></li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5"></div> <span><strong className="text-neutral-900 dark:text-white">Radiologia:</strong> Osteófitos (bicos de papagaio) e redução do espaço articular.</span></li>
            </ul>
          </div>
          <div className="bg-white dark:bg-nexus-card p-8 rounded-[2.5rem] border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h3 className="text-xl font-black text-rose-600 mb-6 italic">Artrite Reumatoide</h3>
            <ul className="space-y-4 text-xs text-neutral-500">
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5"></div> <span><strong className="text-neutral-900 dark:text-white">Inflamatória:</strong> Rigidez matinal &gt; 1 hora.</span></li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5"></div> <span><strong className="text-neutral-900 dark:text-white">Deformidades:</strong> Pescoço de cisne e dedos em abotoadura.</span></li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5"></div> <span><strong className="text-neutral-900 dark:text-white">Laboratório:</strong> Fator Reumatoide (FR) e Anti-CCP positivos.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="mt-20 pt-10 border-top border-neutral-200 dark:border-nexus-border text-center">
        <p className="text-neutral-400 text-[10px] uppercase tracking-widest">NexusBQ • Habilidades Profissionais 2 • 2025</p>
      </footer>
    </div>
  );
};

export default PatologiasOsteoarticulares;
