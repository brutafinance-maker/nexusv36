
import React from 'react';

const PatologiasToracicas: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 border-b border-neutral-200 dark:border-nexus-border pb-8">
        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-4 block">Patologias Torácicas</span>
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Guia de Estudo: Patologias Torácicas
        </h1>
        <p className="text-neutral-500 dark:text-nexus-text-main text-lg leading-relaxed">
          Resumo estruturado sobre as principais patologias do tórax respiratório: Pneumonia, Pneumotórax, Edema Agudo de Pulmão, Derrame Pleural e DPOC.
        </p>
      </header>

      {/* PNEUMONIA */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-rose-500/20"></div>
          <h2 className="text-2xl font-black text-rose-500 uppercase tracking-widest">Pneumonia</h2>
          <div className="h-px flex-grow bg-rose-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Definição</h3>
              <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed">
                Inflamação das estruturas parenquimatosas do pulmão e das vias respiratórias inferiores, inclusive alvéolos e bronquíolos.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Epidemiologia</h3>
              <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed">
                Extremos de idade (idoso e crianças), comorbidades crônicas (ex: DPOC), infecção do trato respiratório superior, distúrbios do sistema imune.
              </p>
            </div>
          </div>
          <div className="bg-neutral-50 dark:bg-nexus-surface p-6 rounded-3xl border border-neutral-200 dark:border-nexus-border">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-4">Etiologia</h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-nexus-text-main">
              <li><strong className="text-rose-500">Bacteriana:</strong> S. pneumoniae, Mycoplasma, Haemophilus, Chlamydia, Legionella.</li>
              <li><strong className="text-sky-500">Viral:</strong> Influenza A/B, SARS-CoV-2, Rinovírus, Parainfluenza.</li>
              <li><strong className="text-emerald-500">Fúngica:</strong> P. jirovecii, Histoplasma, Aspergillus.</li>
            </ul>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-4">Fisiopatologia</h3>
          <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed mb-4">
            Ocorre quando micro-organismos vencem as barreiras de defesa, desencadeando resposta inflamatória nos alvéolos. A ativação do sistema imunológico leva à liberação de citocinas, recrutamento de leucócitos e formação de exsudato nos alvéolos, prejudicando a troca gasosa.
          </p>
          <div className="bg-rose-500/5 border-l-4 border-rose-500 p-4 italic text-sm text-neutral-700 dark:text-nexus-text-main">
            Sintomas comuns: febre, tosse produtiva, dispneia e dor torácica.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Diagnóstico (Exame Físico)</h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-neutral-600 dark:text-nexus-text-main">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Queda do estado geral, febre, sudorese</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Taquipneia e dispneia</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Expansibilidade reduzida</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> <strong className="text-neutral-900 dark:text-white">FTV aumentado</strong></li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> <strong className="text-neutral-900 dark:text-white">Macicez à percussão</strong></li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> MV reduzidos e estertores crepitantes</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Radiografia de Tórax</h3>
            <div className="aspect-video bg-neutral-100 dark:bg-nexus-surface rounded-2xl flex items-center justify-center border border-neutral-200 dark:border-nexus-border overflow-hidden relative group">
              <img src="https://picsum.photos/seed/pneumonia-xray/800/600" alt="Radiografia Pneumonia" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-nexus-bg/90 px-3 py-1 rounded-full text-neutral-900 dark:text-white">Condensação Pulmonar (Radiopacidade)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PNEUMOTÓRAX */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-sky-500/20"></div>
          <h2 className="text-2xl font-black text-sky-500 uppercase tracking-widest">Pneumotórax</h2>
          <div className="h-px flex-grow bg-sky-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Definição</h3>
              <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed">
                Presença de ar ou gás na cavidade pleural, podendo levar ao colapso pulmonar.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Epidemiologia</h3>
              <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed">
                Homens jovens, altos e magros (20-40 anos), idosos e tabagistas.
              </p>
            </div>
          </div>
          <div className="bg-sky-50 dark:bg-nexus-surface p-6 rounded-3xl border border-sky-200 dark:border-nexus-border">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-4">Classificação</h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-nexus-text-main">
              <li><strong className="text-sky-600">Espontâneo Primário:</strong> Sem doença subjacente (ruptura de bolhas).</li>
              <li><strong className="text-sky-600">Espontâneo Secundário:</strong> Associado a DPOC, Fibrose Cística, TB.</li>
              <li><strong className="text-sky-600">Adquirido:</strong> Traumático ou Iatrogênico.</li>
            </ul>
          </div>
        </div>

        <div className="bg-neutral-900 text-white p-8 rounded-[2.5rem] mb-10">
          <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.3em] mb-4">Exame Físico Característico</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-black mb-1">Assimetria</div>
              <div className="text-[10px] uppercase tracking-widest opacity-60">Tórax</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black mb-1">Abolido</div>
              <div className="text-[10px] uppercase tracking-widest opacity-60">FTV</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black mb-1">Timpanismo</div>
              <div className="text-[10px] uppercase tracking-widest opacity-60">Percussão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black mb-1">Ausente</div>
              <div className="text-[10px] uppercase tracking-widest opacity-60">MV</div>
            </div>
          </div>
        </div>

        <div className="bg-rose-500 text-white p-6 rounded-2xl mb-10">
          <h3 className="text-sm font-black uppercase tracking-widest mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Atenção: Pneumotórax Hipertensivo
          </h3>
          <p className="text-xs leading-relaxed opacity-90">
            Diagnóstico é <strong className="underline">CLÍNICO</strong>. Não pedir radiografia se houver desvio traqueal, hipotensão, taquicardia e turgência jugular. O paciente não pode esperar.
          </p>
        </div>
      </section>

      {/* EDEMA AGUDO DE PULMÃO */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-emerald-500/20"></div>
          <h2 className="text-2xl font-black text-emerald-500 uppercase tracking-widest">Edema Agudo de Pulmão</h2>
          <div className="h-px flex-grow bg-emerald-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-2">Fisiopatologia</h3>
            <p className="text-neutral-600 dark:text-nexus-text-main text-sm leading-relaxed">
              Acúmulo excessivo de líquido nos pulmões, prejudicando a troca gasosa. No tipo <strong className="text-emerald-600">Cardiogênico</strong>, há aumento da pressão venosa pulmonar. No <strong className="text-emerald-600">Não Cardiogênico</strong>, há dano direto à barreira alvéolo-capilar (aumento da permeabilidade).
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-nexus-surface p-6 rounded-3xl border border-emerald-200 dark:border-nexus-border">
            <h3 className="text-sm font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-wider mb-4">Sinal da Borboleta</h3>
            <p className="text-xs text-neutral-500 mb-4 italic">Radiografia característica:</p>
            <div className="aspect-square bg-neutral-100 rounded-xl flex items-center justify-center overflow-hidden">
               <img src="https://picsum.photos/seed/lung-edema/400/400" alt="Edema Pulmonar" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* DERRAME PLEURAL */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-amber-500/20"></div>
          <h2 className="text-2xl font-black text-amber-500 uppercase tracking-widest">Derrame Pleural</h2>
          <div className="h-px flex-grow bg-amber-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h4 className="text-xs font-black text-amber-600 uppercase mb-2">Transudato</h4>
            <p className="text-[11px] leading-relaxed text-neutral-500">Pobre em proteínas. Associado a IC ou Cirrose.</p>
          </div>
          <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h4 className="text-xs font-black text-amber-600 uppercase mb-2">Exsudato</h4>
            <p className="text-[11px] leading-relaxed text-neutral-500">Rico em proteínas. Causado por inflamações ou infecções.</p>
          </div>
          <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h4 className="text-xs font-black text-amber-600 uppercase mb-2">Empiema</h4>
            <p className="text-[11px] leading-relaxed text-neutral-500">Derrame purulento. Comum em infecções bacterianas graves.</p>
          </div>
        </div>

        <div className="bg-amber-500/10 p-6 rounded-3xl border border-amber-500/20">
          <h3 className="text-sm font-black text-amber-600 uppercase tracking-wider mb-4">Parábola de Damoiseau</h3>
          <p className="text-sm text-neutral-600 dark:text-nexus-text-main leading-relaxed">
            Na radiografia, observa-se a obliteração do seio costofrênico e a formação de uma linha curva (parábola) com concavidade voltada para cima.
          </p>
        </div>
      </section>

      {/* DPOC */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-neutral-500/20"></div>
          <h2 className="text-2xl font-black text-neutral-500 uppercase tracking-widest">DPOC</h2>
          <div className="h-px flex-grow bg-neutral-500/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-nexus-text-title mb-4">Enfisema vs Bronquite</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-neutral-300 pl-4">
                <h4 className="font-bold text-neutral-900 dark:text-white">Enfisema</h4>
                <p className="text-sm text-neutral-500">Destruição dos alvéolos, reduzindo a superfície de troca gasosa. Tórax em tonel.</p>
              </div>
              <div className="border-l-2 border-neutral-300 pl-4">
                <h4 className="font-bold text-neutral-900 dark:text-white">Bronquite Crônica</h4>
                <p className="text-sm text-neutral-500">Inflamação das vias aéreas com hipersecreção de muco e tosse produtiva.</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center">
            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">Sinal Clínico Clássico</h3>
            <div className="text-4xl font-black italic tracking-tighter mb-2">Tórax em Tonel</div>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Aumento do diâmetro anteroposterior</p>
          </div>
        </div>
      </section>

      <footer className="mt-20 pt-10 border-top border-neutral-200 dark:border-nexus-border text-center">
        <p className="text-neutral-400 text-[10px] uppercase tracking-widest">NexusBQ • Habilidades Profissionais 2 • 2025</p>
      </footer>
    </div>
  );
};

export default PatologiasToracicas;
