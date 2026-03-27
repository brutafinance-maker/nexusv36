
import React from 'react';

const PatologiasPrecordiais: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 border-b border-neutral-200 dark:border-nexus-border pb-8">
        <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em] mb-4 block">Patologias Precordiais</span>
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Ausculta e Patologias Precordiais
        </h1>
        <p className="text-neutral-500 dark:text-nexus-text-main text-lg leading-relaxed">
          Domine a semiologia cardíaca: bulhas fisiológicas e patológicas, sopros, insuficiência cardíaca e tamponamento.
        </p>
      </header>

      {/* BULHAS CARDÍACAS */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-sky-500/20"></div>
          <h2 className="text-2xl font-black text-sky-500 uppercase tracking-widest">Bulhas Cardíacas</h2>
          <div className="h-px flex-grow bg-sky-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white dark:bg-nexus-card p-8 rounded-[2rem] border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-4">Bulhas Fisiológicas</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 font-black shrink-0">B1</div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">"TUM"</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">Início da sístole. Fechamento das valvas Mitral e Tricúspide.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 font-black shrink-0">B2</div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">"TÁ"</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">Início da diástole. Fechamento das valvas Aórtica e Pulmonar.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-nexus-surface p-8 rounded-[2rem] border border-rose-200 dark:border-nexus-border">
            <h3 className="text-sm font-black text-rose-600 uppercase tracking-wider mb-4">Bulhas Patológicas</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">B3 (Terceira Bulha)</h4>
                <p className="text-xs text-neutral-600 dark:text-nexus-text-main leading-relaxed">Ocorre logo após B2. Fluxo rápido para ventrículo dilatado. Sobrecarga de volume.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">B4 (Quarta Bulha)</h4>
                <p className="text-xs text-neutral-600 dark:text-nexus-text-main leading-relaxed">Ocorre antes de B1. Contração atrial contra ventrículo rígido. Sobrecarga de pressão.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOPROS CARDÍACOS */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-amber-500/20"></div>
          <h2 className="text-2xl font-black text-amber-500 uppercase tracking-widest">Sopros Cardíacos</h2>
          <div className="h-px flex-grow bg-amber-500/20"></div>
        </div>

        <div className="bg-neutral-900 text-white p-8 rounded-[2.5rem] mb-10">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-[0.3em] mb-6">Mecanismos de Geração</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="text-lg font-black mb-2 text-amber-400 italic">Estenose</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">Estreitamento do lúmen valvar. Dificulta a passagem do sangue.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="text-lg font-black mb-2 text-sky-400 italic">Insuficiência</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">A valva não fecha adequadamente. Ocorre refluxo (regurgitação).</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-nexus-border">
                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Valva</th>
                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Sopro Sistólico</th>
                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Sopro Diastólico</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-neutral-100 dark:border-nexus-border/50">
                <td className="py-4 font-bold text-neutral-900 dark:text-white">Mitral</td>
                <td className="py-4 text-rose-500">Insuficiência</td>
                <td className="py-4 text-sky-500">Estenose</td>
              </tr>
              <tr className="border-b border-neutral-100 dark:border-nexus-border/50">
                <td className="py-4 font-bold text-neutral-900 dark:text-white">Aórtica</td>
                <td className="py-4 text-sky-500">Estenose</td>
                <td className="py-4 text-rose-500">Insuficiência</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* MANOBRAS */}
      <section className="mb-16">
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[2rem]">
          <h3 className="text-sm font-black text-emerald-600 uppercase tracking-wider mb-6">Manobras Dinâmicas</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Rivero Carvalho</h4>
              <p className="text-sm text-neutral-600 dark:text-nexus-text-main leading-relaxed">Inspiração profunda. Aumenta retorno venoso. Intensifica sopros do <strong className="text-emerald-600">Lado Direito</strong>.</p>
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Valsalva</h4>
              <p className="text-sm text-neutral-600 dark:text-nexus-text-main leading-relaxed">Expiração forçada com glote fechada. Reduz retorno venoso. Aumenta sopros de <strong className="text-emerald-600">Prolapso Mitral</strong> e <strong className="text-emerald-600">Miocardiopatia Hipertrófica</strong>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSUFICIÊNCIA CARDÍACA */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-rose-500/20"></div>
          <h2 className="text-2xl font-black text-rose-500 uppercase tracking-widest">Insuficiência Cardíaca</h2>
          <div className="h-px flex-grow bg-rose-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Critérios de Framingham</h3>
            <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
              <h4 className="text-xs font-black text-rose-500 uppercase mb-3">Maiores</h4>
              <ul className="text-xs space-y-2 text-neutral-500">
                <li>• DPN (Dispneia Paroxística Noturna)</li>
                <li>• Estase Jugular</li>
                <li>• Crepitações Pulmonares</li>
                <li>• Cardiomegalia (Raio-X)</li>
                <li>• B3</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-neutral-50 dark:bg-nexus-surface p-8 rounded-3xl border border-neutral-200 dark:border-nexus-border">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-4">Exame Físico na IC</h3>
            <p className="text-sm text-neutral-600 dark:text-nexus-text-main leading-relaxed italic">
              "Ictus cordis desviado para a esquerda, amplitude difusa, ritmo de galope (B3), estertores finos em bases e edema de MMII."
            </p>
          </div>
        </div>
      </section>

      {/* TAMPONAMENTO CARDÍACO */}
      <section className="mb-16">
        <div className="bg-rose-600 text-white p-10 rounded-[3rem] shadow-xl shadow-rose-600/20">
          <h2 className="text-3xl font-black tracking-tighter mb-6 italic">Tamponamento Cardíaco</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xs font-black text-rose-200 uppercase tracking-[0.3em] mb-4">Tríade de Beck</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">1</div>
                  <span className="font-bold text-lg">Hipotensão Arterial</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">2</div>
                  <span className="font-bold text-lg">Turgência Jugular</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">3</div>
                  <span className="font-bold text-lg">Bulhas Abafadas</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center border-l border-white/10 pl-10">
              <h3 className="text-xs font-black text-rose-200 uppercase tracking-[0.3em] mb-4">Sinal Radiológico</h3>
              <div className="text-2xl font-black mb-2">Coração em Moringa</div>
              <p className="text-xs text-rose-100 opacity-80 leading-relaxed">Silhueta cardíaca globosa e simétrica devido ao grande volume de líquido pericárdico.</p>
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

export default PatologiasPrecordiais;
