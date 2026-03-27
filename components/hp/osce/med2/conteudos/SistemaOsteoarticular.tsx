
import React from 'react';

const SistemaOsteoarticular: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 border-b border-neutral-200 dark:border-nexus-border pb-8">
        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-4 block">Manual de Exame Físico</span>
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Sistema Osteoarticular
        </h1>
        <p className="text-neutral-500 dark:text-nexus-text-main text-lg leading-relaxed">
          Guia completo para o exame físico do sistema locomotor: da anamnese às manobras especiais por segmento.
        </p>
      </header>

      {/* DESTAQUES DA ANAMNESE */}
      <section className="mb-16">
        <div className="bg-neutral-900 text-white p-10 rounded-[3rem] shadow-xl">
          <h2 className="text-2xl font-black tracking-tighter mb-8 italic text-rose-400">Destaques da Anamnese</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Quantidade de Articulações</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Monoarticular</span> <span className="font-bold">1</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Oligoarticular</span> <span className="font-bold">2 a 4</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Poliarticular</span> <span className="font-bold">&gt; 4</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Caráter do Acometimento</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5"></div>
                  <div><strong className="block">Fixo:</strong> Mantém-se na mesma articulação.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5"></div>
                  <div><strong className="block">Migratório:</strong> Desaparece em uma e surge em outra.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EXAME FÍSICO GERAL */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-neutral-200 dark:bg-nexus-border"></div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-nexus-text-title uppercase tracking-widest">Exame Físico Geral</h2>
          <div className="h-px flex-grow bg-neutral-200 dark:bg-nexus-border"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h3 className="text-xs font-black text-rose-500 uppercase mb-4">Inspeção</h3>
            <ul className="text-xs space-y-2 text-neutral-500">
              <li>• Alinhamento (Valgo/Varo)</li>
              <li>• Deformidades</li>
              <li>• Nódulos (Heberden/Bouchard)</li>
              <li>• Alterações de pele</li>
              <li>• Atrofia muscular</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h3 className="text-xs font-black text-rose-500 uppercase mb-4">Palpação</h3>
            <ul className="text-xs space-y-2 text-neutral-500">
              <li>• Temperatura (Calor)</li>
              <li>• Tumefação (Partes moles)</li>
              <li>• Derrame Articular</li>
              <li>• Pontos Dolorosos</li>
              <li>• Crepitações</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
            <h3 className="text-xs font-black text-rose-500 uppercase mb-4">Mobilidade</h3>
            <ul className="text-xs space-y-2 text-neutral-500">
              <li>• Ativa (Paciente)</li>
              <li>• Passiva (Examinador)</li>
              <li>• Contrarresistência (Força)</li>
              <li>• Amplitude de Movimento</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEGMENTOS - MÃOS E PUNHOS */}
      <section className="mb-16">
        <div className="bg-neutral-50 dark:bg-nexus-surface p-8 rounded-[2.5rem] border border-neutral-200 dark:border-nexus-border">
          <h2 className="text-xl font-black text-neutral-900 dark:text-nexus-text-title mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center text-white text-xs">01</div>
            Mãos e Punhos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-rose-500 uppercase tracking-widest">Manobras Especiais</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-rose-500 pl-4">
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Teste de Phalen</h4>
                  <p className="text-xs text-neutral-500">Punhos em flexão máxima por 60s. Indica Síndrome do Túnel do Carpo.</p>
                </div>
                <div className="border-l-2 border-rose-500 pl-4">
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Teste de Tinel</h4>
                  <p className="text-xs text-neutral-500">Percussão sobre o nervo mediano no túnel do carpo.</p>
                </div>
                <div className="border-l-2 border-rose-500 pl-4">
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Teste de Finkelstein</h4>
                  <p className="text-xs text-neutral-500">Polegar dentro do punho + desvio ulnar. Indica Tenossinovite de De Quervain.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
               <div className="aspect-square w-full max-w-[250px] bg-white dark:bg-nexus-card rounded-3xl border border-neutral-200 dark:border-nexus-border overflow-hidden relative group">
                  <img src="https://picsum.photos/seed/hand-anatomy/400/400" alt="Anatomia Mão" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-[10px] font-black uppercase text-neutral-400 mb-2">Anatomia</span>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">Interfalângicas e Metacarpofalângicas</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGMENTOS - OMBRO */}
      <section className="mb-16">
        <div className="bg-neutral-50 dark:bg-nexus-surface p-8 rounded-[2.5rem] border border-neutral-200 dark:border-nexus-border">
          <h2 className="text-xl font-black text-neutral-900 dark:text-nexus-text-title mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white text-xs">02</div>
            Ombro (Manguito Rotador)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-sky-500 uppercase tracking-widest mb-4">Testes de Impacto e Lesão</h3>
              {[
                { name: "Jobe", muscle: "Supraespinal", desc: "Braços a 90° + rotação interna + resistência para baixo." },
                { name: "Patte", muscle: "Redondo Menor", desc: "Braço abduzido a 90° + rotação externa contra resistência." },
                { name: "Gerber", muscle: "Subescapular", desc: "Mão nas costas tentando afastar contra resistência." },
                { name: "Neer", muscle: "Impacto", desc: "Elevação passiva do braço com escápula estabilizada." },
                { name: "Hawkins", muscle: "Impacto", desc: "Flexão de ombro e cotovelo a 90° + rotação interna passiva." }
              ].map((t, i) => (
                <div key={i} className="bg-white dark:bg-nexus-card p-4 rounded-xl border border-neutral-200 dark:border-nexus-border shadow-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-xs text-neutral-900 dark:text-white">{t.name}</span>
                    <span className="text-[9px] font-black text-sky-500 uppercase">{t.muscle}</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-neutral-900 text-white p-8 rounded-3xl flex flex-col justify-center">
               <h4 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-4 italic">Manguito Rotador</h4>
               <ul className="space-y-2 text-sm font-bold">
                 <li>• Supraespinal</li>
                 <li>• Infraespinal</li>
                 <li>• Subescapular</li>
                 <li>• Redondo Menor</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEGMENTOS - JOELHO */}
      <section className="mb-16">
        <div className="bg-neutral-50 dark:bg-nexus-surface p-8 rounded-[2.5rem] border border-neutral-200 dark:border-nexus-border">
          <h2 className="text-xl font-black text-neutral-900 dark:text-nexus-text-title mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs">03</div>
            Joelho
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
               <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
                 <h4 className="text-xs font-black text-emerald-600 uppercase mb-3">Derrame Articular</h4>
                 <p className="text-xs text-neutral-500 leading-relaxed">
                   <strong className="text-neutral-900 dark:text-white">Teste da Onda:</strong> Esvaziamento do líquido da face medial para lateral + pressão na patela.
                 </p>
               </div>
               <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
                 <h4 className="text-xs font-black text-emerald-600 uppercase mb-3">Lesão Meniscal</h4>
                 <p className="text-xs text-neutral-500 leading-relaxed">
                   <strong className="text-neutral-900 dark:text-white">Teste de McMurray:</strong> Flexão + rotação interna/externa + extensão gradual. Dor ou estalido é positivo.
                 </p>
               </div>
            </div>
            <div className="space-y-6">
               <div className="bg-white dark:bg-nexus-card p-6 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm">
                 <h4 className="text-xs font-black text-emerald-600 uppercase mb-3">Estresse Ligamentar</h4>
                 <ul className="text-xs space-y-2 text-neutral-500">
                   <li>• <strong className="text-neutral-900 dark:text-white">Valgo:</strong> Testa Ligamento Colateral Medial (LCM).</li>
                   <li>• <strong className="text-neutral-900 dark:text-white">Varo:</strong> Testa Ligamento Colateral Lateral (LCL).</li>
                 </ul>
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

export default SistemaOsteoarticular;
