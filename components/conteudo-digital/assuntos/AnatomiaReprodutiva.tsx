
import React from 'react';

const AnatomiaReprodutiva: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-4">
          Anatomia e Histologia do Aparelho Reprodutor
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-nexus-text-main leading-relaxed mb-8">
          O sistema reprodutor humano é um complexo biológico altamente especializado, composto por órgãos internos e externos que trabalham em conjunto para a produção de gametas, síntese hormonal e, no caso feminino, suporte ao desenvolvimento embrionário e fetal.
        </p>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Aparelho Reprodutor Masculino
        </h2>
        <p className="mb-6">
          Composto pelos testículos (gônadas), ductos (epidídimo, ducto deferente, ducto ejaculatório e uretra), glândulas acessórias (vesículas seminais, próstata e glândulas bulbouretrais) e estruturas de suporte, como o escroto e o pênis.
        </p>
        <ul className="space-y-4 mb-8">
          <li><strong>Testículos:</strong> Local de produção de espermatozoides e testosterona.</li>
          <li><strong>Epidídimo:</strong> Onde ocorre a maturação e armazenamento dos espermatozoides.</li>
          <li><strong>Próstata:</strong> Secreta um fluido alcalino que compõe o sêmen.</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-800 dark:text-nexus-text-title mt-12 mb-6">
          Aparelho Reprodutor Feminino
        </h2>
        <p className="mb-6">
          Inclui os ovários (gônadas), tubas uterinas, útero, vagina e a vulva (genitália externa). Além da reprodução, é responsável pela gestação e parto.
        </p>
        <ul className="space-y-4 mb-8">
          <li><strong>Ovários:</strong> Produzem ovócitos e hormônios (estrogênio e progesterona).</li>
          <li><strong>Tubas Uterinas:</strong> Local onde geralmente ocorre a fecundação.</li>
          <li><strong>Útero:</strong> Órgão muscular onde o embrião se implanta e se desenvolve.</li>
        </ul>

        <div className="my-12 p-8 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-3xl">
          <h3 className="text-xl font-bold mb-4 text-nexus-purple">Diagrama Conceitual</h3>
          <p className="text-sm text-neutral-500 italic">
            [Diagrama: Integração entre gônadas e ductos reprodutivos]
          </p>
          <div className="aspect-video bg-neutral-200 dark:bg-nexus-card rounded-2xl flex items-center justify-center mt-4">
            <span className="text-neutral-400 font-medium">Representação Visual da Anatomia</span>
          </div>
        </div>

        <div className="mt-16 p-8 bg-nexus-purple/5 border border-nexus-purple/20 rounded-3xl">
          <h2 className="text-xl font-black text-nexus-purple uppercase tracking-widest mb-4">Resumo Final</h2>
          <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
            A compreensão da anatomia e histologia é o primeiro passo para entender a fisiologia reprodutiva. A integração entre a estrutura física e a função celular permite a continuidade da espécie através de processos regulados por eixos hormonais complexos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AnatomiaReprodutiva;
