
import React from 'react';

const PatologiasAbdominais: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 border-b border-neutral-200 dark:border-nexus-border pb-8">
        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4 block">Patologias Abdominais</span>
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Abdome Agudo e Patologias Abdominais
        </h1>
        <p className="text-neutral-500 dark:text-nexus-text-main text-lg leading-relaxed">
          Semiologia abdominal avançada: apendicite, patologias biliares, cirrose hepática e pielonefrite.
        </p>
      </header>

      {/* APENDICITE */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-emerald-500/20"></div>
          <h2 className="text-2xl font-black text-emerald-500 uppercase tracking-widest">Apendicite Aguda</h2>
          <div className="h-px flex-grow bg-emerald-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Fisiopatologia</h3>
            <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed">
              Obstrução do lúmen (geralmente por <strong className="text-emerald-600">fecálitos</strong>) → acúmulo de secreção → distensão e inflamação → isquemia e necrose → perfuração (peritonite).
            </p>
            <div className="bg-emerald-50 dark:bg-nexus-surface p-6 rounded-2xl border border-emerald-200 dark:border-nexus-border">
              <h4 className="text-xs font-black text-emerald-600 uppercase mb-3">Cronologia de Murphy</h4>
              <p className="text-xs text-neutral-500 leading-relaxed italic">"Dor periumbilical que migra para a Fossa Ilíaca Direita (FID) após 6-12 horas."</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Manobras Especiais</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: "Blumberg", desc: "Descompressão brusca dolorosa no ponto de McBurney (Peritonite)." },
                { name: "Rovsing", desc: "Palpação da FIE causa dor na FID (deslocamento de gases)." },
                { name: "Psoas", desc: "Dor à extensão do quadril direito (apêndice retrocecal)." },
                { name: "Obturador", desc: "Dor à rotação interna do quadril flexionado." },
                { name: "Dunphy", desc: "Dor na FID ao tossir." }
              ].map((m, i) => (
                <div key={i} className="bg-white dark:bg-nexus-card p-4 rounded-xl border border-neutral-200 dark:border-nexus-border shadow-sm flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <span className="font-bold text-xs text-neutral-900 dark:text-white">{m.name}:</span>
                    <span className="text-xs text-neutral-500 ml-2">{m.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLECISTITE E COLELITÍASE */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-amber-500/20"></div>
          <h2 className="text-2xl font-black text-amber-500 uppercase tracking-widest">Patologias Biliares</h2>
          <div className="h-px flex-grow bg-amber-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-neutral-900 text-white p-8 rounded-[2.5rem]">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.3em] mb-4">Fatores de Risco (5 F's)</h3>
            <ul className="grid grid-cols-1 gap-3 text-sm font-bold italic">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-amber-400 rotate-45"></div> Female (Sexo Feminino)</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-amber-400 rotate-45"></div> Forty (Idade ≥ 40 anos)</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-amber-400 rotate-45"></div> Fat (Obesidade)</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-amber-400 rotate-45"></div> Fertile (Multiparidade)</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-amber-400 rotate-45"></div> Fair (Caucasiana)</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-2">Sinal de Murphy</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">Interrupção súbita da inspiração profunda durante a palpação do ponto cístico. <strong className="text-amber-600">Patognomônico de Colecistite Aguda.</strong></p>
            </div>
            <div className="bg-amber-50 dark:bg-nexus-surface p-6 rounded-2xl border border-amber-200 dark:border-nexus-border">
              <h4 className="text-xs font-black text-amber-600 uppercase mb-2">Cólica Biliar vs Colecistite</h4>
              <p className="text-xs text-neutral-600 dark:text-nexus-text-main">A cólica biliar dura &lt; 6h e não tem febre. A colecistite dura &gt; 6h, tem febre e Murphy positivo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CIRROSE HEPÁTICA */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-rose-500/20"></div>
          <h2 className="text-2xl font-black text-rose-500 uppercase tracking-widest">Cirrose Hepática</h2>
          <div className="h-px flex-grow bg-rose-500/20"></div>
        </div>

        <div className="bg-white dark:bg-nexus-card p-8 rounded-[2.5rem] border border-neutral-200 dark:border-nexus-border shadow-sm mb-10">
          <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-6">Estigmas de Hepatopatia Crônica</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Icterícia", "Ascite", "Circulação Colateral (Cabeça de Medusa)",
              "Telangiectasias (Aranhas Vasculares)", "Eritema Palmar", "Ginecomastia",
              "Hipotrofia Testicular", "Hepatomegalia", "Esplenomegalia"
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-rose-500" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-xs font-medium text-neutral-600 dark:text-nexus-text-main">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-50 dark:bg-nexus-surface p-6 rounded-3xl border border-rose-200 dark:border-nexus-border">
            <h4 className="text-xs font-black text-rose-600 uppercase mb-4">Pesquisa de Ascite</h4>
            <ul className="space-y-4">
              <li className="text-xs">
                <strong className="block text-neutral-900 dark:text-white mb-1">Semicírculo de Skoda:</strong>
                Timpanismo central e macicez periférica.
              </li>
              <li className="text-xs">
                <strong className="block text-neutral-900 dark:text-white mb-1">Macicez Móvel:</strong>
                Mudança da área de macicez ao mudar o decúbito.
              </li>
              <li className="text-xs">
                <strong className="block text-neutral-900 dark:text-white mb-1">Sinal do Piparote:</strong>
                Transmissão de onda líquida ao percutir um flanco.
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center">
             <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 dark:border-nexus-border relative group">
                <img src="https://picsum.photos/seed/liver-cirrhosis/800/600" alt="Cirrose Hepática" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full text-neutral-900">Cabeça de Medusa</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* PIELONEFRITE */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-sky-500/20"></div>
          <h2 className="text-2xl font-black text-sky-500 uppercase tracking-widest">Pielonefrite</h2>
          <div className="h-px flex-grow bg-sky-500/20"></div>
        </div>

        <div className="bg-sky-600 text-white p-10 rounded-[3rem] shadow-xl shadow-sky-600/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-3xl font-black tracking-tighter mb-4 italic">Sinal de Giordano</h3>
              <p className="text-sm text-sky-100 leading-relaxed mb-6">
                Punho-percussão dolorosa na região lombar (ângulo costovertebral). Indica inflamação renal.
              </p>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-xs italic">
                "Paciente apresenta febre alta, calafrios, náuseas e dor lombar intensa."
              </div>
            </div>
            <div className="flex flex-col justify-center border-l border-white/10 pl-10">
              <h3 className="text-xs font-black text-sky-200 uppercase tracking-[0.3em] mb-4">Quadro Clínico</h3>
              <ul className="space-y-2 text-sm">
                <li>• Disúria e Estrangúria</li>
                <li>• Polaciúria e Urgência</li>
                <li>• Febre e Calafrios</li>
                <li>• Náuseas e Vômitos</li>
              </ul>
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

export default PatologiasAbdominais;
