
import React from 'react';
import TermoInterativo from '../shared/TermoInterativo';

const PeriodoFetal: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-nexus-purple/10 text-nexus-purple text-[10px] font-black uppercase tracking-widest rounded-full">Embriologia Humana</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
          <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Módulo 7</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-nexus-text-title tracking-tighter mb-6 leading-[0.9]">
          Período Fetal: <br />
          <span className="text-nexus-purple">Crescimento e Maturação</span>
        </h1>
        <div className="h-1.5 w-24 bg-nexus-purple rounded-full"></div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {/* Seção 1: Definição */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">01</span>
            Definição e Delimitação
          </h2>
          <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-[2rem] p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-nexus-text-main">
              O desenvolvimento humano pré-natal é convencionalmente dividido em dois grandes períodos: o período embrionário e o período fetal. 
              O período embrionário compreende as primeiras oito semanas após a fertilização e é marcado por eventos de extraordinária complexidade 
              <TermoInterativo 
                termo="morfogenética" 
                explicacao="É o processo biológico que faz com que um organismo desenvolva sua forma. É como a 'arquitetura' básica do corpo sendo construída."
              /> — a formação das três 
              <TermoInterativo 
                termo="camadas germinativas" 
                explicacao="Ectoderme, mesoderme e endoderme: são as três camadas iniciais de células que darão origem a todos os tecidos e órgãos do corpo."
              />, a 
              <TermoInterativo 
                termo="organogênese primária" 
                explicacao="O processo inicial onde as células começam a se agrupar para formar o esboço dos órgãos internos (coração, pulmões, etc)."
              /> e o estabelecimento do plano corporal básico.
            </p>
            
            <div className="mt-8 p-6 bg-amber-50 dark:bg-nexus-orange/5 border-l-4 border-amber-400 rounded-r-2xl italic text-neutral-600 dark:text-nexus-text-main">
              "É durante esse intervalo que a maioria das 
              <TermoInterativo 
                termo="malformações congênitas" 
                explicacao="Alterações na estrutura ou função de órgãos que ocorrem durante o desenvolvimento antes do nascimento, muitas vezes por falhas na formação inicial."
              /> maiores tem origem, dada a intensidade dos processos de indução, migração e diferenciação celular em curso."
            </div>

            <p className="mt-8 text-neutral-700 dark:text-nexus-text-main">
              Ao término da oitava semana, todos os sistemas orgânicos já estão esboçados em sua forma rudimentar, e o concepto passa a ser denominado feto — uma transição que não é apenas nomenclatural, mas reflete uma mudança fundamental na natureza dos processos desenvolvimentais predominantes.
            </p>
          </div>
        </section>

        {/* Seção 2: Idade Gestacional */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">02</span>
            Idade Gestacional vs. Pós-Fertilização
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 dark:bg-nexus-surface rounded-[2rem] p-8 border border-neutral-200 dark:border-nexus-border">
              <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
                O período fetal tem início na nona semana pós-fertilização — o que corresponde à décima primeira semana de 
                <TermoInterativo 
                  termo="idade gestacional" 
                  explicacao="É o tempo de gravidez contado a partir do primeiro dia da última menstruação. Como a ovulação ocorre cerca de 2 semanas depois, a idade gestacional é sempre maior que a idade real do feto."
                /> quando se adota como referência a 
                <TermoInterativo 
                  termo="DUM" 
                  explicacao="Data da Última Menstruação" 
                  isSigla={true}
                />, convenção amplamente utilizada na prática obstétrica.
              </p>
            </div>
            <div className="bg-nexus-purple/5 rounded-[2rem] p-8 border border-nexus-purple/10">
              <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
                Essa distinção é clinicamente relevante: a idade gestacional supera em aproximadamente duas semanas a idade pós-fertilização, pois o ciclo menstrual típico implica ovulação ao redor do 14º dia. 
                Assim, da 9ª à 38ª semana pós-fertilização equivale à 11ª à 40ª semana de idade gestacional.
              </p>
            </div>
          </div>
        </section>

        {/* Seção 3: Critério de Transição */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">03</span>
            O Critério de Transição
          </h2>
          <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-purple/5 rounded-bl-full -mr-16 -mt-16"></div>
            <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed relative z-10">
              O critério que define a transição do embrião ao feto é essencialmente histológico e funcional: o encerramento da fase crítica de diferenciação celular e organogênese primária. 
              Isso não significa que a diferenciação cesse abruptamente — estruturas como o córtex cerebral, o cerebelo e os glomérulos renais continuarão se diferenciando ao longo de todo o período fetal e mesmo após o nascimento.
            </p>
            <div className="mt-8 p-6 bg-neutral-900 text-white rounded-2xl">
              <p className="font-bold text-nexus-purple mb-2 uppercase tracking-widest text-xs">O Foco Muda:</p>
              <p className="text-lg italic">
                "O eixo central do desenvolvimento desloca-se da morfogênese para o <strong>crescimento quantitativo</strong> e a <strong>maturação funcional</strong> dos sistemas já formados."
              </p>
            </div>
          </div>
        </section>

        {/* Seção 4: Trimestres */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">04</span>
            Subdivisões por Trimestres
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-6 hover:border-nexus-purple transition-colors">
                <h3 className="font-black text-nexus-purple mb-3">1º Trimestre</h3>
                <p className="text-sm text-neutral-600 dark:text-nexus-text-main">Dominado pelo início do crescimento rápido e pela diferenciação sexual (nas semanas finais).</p>
              </div>
              <div className="flex-1 bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-6 hover:border-nexus-purple transition-colors">
                <h3 className="font-black text-nexus-purple mb-3">2º Trimestre</h3>
                <p className="text-sm text-neutral-600 dark:text-nexus-text-main">
                  Aceleração intensa do crescimento linear e aquisição dos movimentos fetais percebidos pela mãe (
                  <TermoInterativo 
                    termo="quickening" 
                    explicacao="O termo técnico para o momento em que a mãe sente os primeiros 'chutes' ou movimentos do bebê, geralmente entre a 16ª e 20ª semana."
                  />).
                </p>
              </div>
              <div className="flex-1 bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-6 hover:border-nexus-purple transition-colors">
                <h3 className="font-black text-nexus-purple mb-3">3º Trimestre</h3>
                <p className="text-sm text-neutral-600 dark:text-nexus-text-main">Maior ganho ponderal absoluto, maturação pulmonar crítica e preparação para o parto.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 5: Viabilidade */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">05</span>
            Viabilidade Fetal
          </h2>
          <div className="bg-neutral-900 text-white rounded-[2.5rem] p-10 shadow-2xl">
            <p className="text-lg leading-relaxed mb-8 opacity-90">
              A definição de 
              <TermoInterativo 
                termo="viabilidade fetal" 
                explicacao="A capacidade do feto de sobreviver fora do útero com suporte médico. Depende principalmente do desenvolvimento dos pulmões e do sistema nervoso."
              /> — a capacidade de sobreviver fora do útero com suporte médico intensivo — situa-se atualmente em torno da 22ª a 24ª semana de idade gestacional.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-nexus-purple/20 flex items-center justify-center text-nexus-purple">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 12h10"/><path d="M7 8h10"/><path d="M7 16h10"/></svg>
                  </div>
                  <div>
                    <p className="font-bold">Peso Aproximado</p>
                    <p className="text-neutral-400">500 gramas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-nexus-blue/20 flex items-center justify-center text-nexus-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <p className="font-bold">Limiar de Segurança</p>
                    <p className="text-neutral-400">26ª a 28ª semana</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <p className="text-sm leading-relaxed italic text-neutral-300">
                  "O principal fator limitante não é o tamanho, mas a imaturidade pulmonar — especificamente, a insuficiência na produção de 
                  <TermoInterativo 
                    termo="surfactante" 
                    explicacao="Uma substância 'ensaboada' produzida nos pulmões que impede que as pequenas bolsas de ar (alvéolos) grudem e fechem ao expirar."
                  /> e o desenvolvimento incompleto da 
                  <TermoInterativo 
                    termo="unidade alveolocapilar" 
                    explicacao="A estrutura microscópica onde o oxigênio do ar passa para o sangue e o gás carbônico sai do sangue para o ar."
                  />."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 6: Dinâmica do Crescimento */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">06</span>
            Dinâmica do Crescimento
          </h2>
          <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-[2rem] p-8 shadow-sm">
            <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed mb-8">
              O período fetal é marcado por uma dinâmica temporal muito particular. Nas semanas iniciais, a velocidade de crescimento linear é máxima em termos relativos: o feto praticamente dobra seu comprimento entre a 9ª e a 14ª semana.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-neutral-50 dark:bg-nexus-surface rounded-2xl text-center">
                <p className="text-xs font-black text-neutral-400 uppercase mb-2">20 Semanas</p>
                <p className="text-3xl font-black text-nexus-purple">300g</p>
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-nexus-surface rounded-2xl text-center">
                <p className="text-xs font-black text-neutral-400 uppercase mb-2">Aumento</p>
                <p className="text-3xl font-black text-nexus-purple">10x</p>
                <p className="text-[10px] text-neutral-500 mt-1">No 2º semestre</p>
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-nexus-surface rounded-2xl text-center">
                <p className="text-xs font-black text-neutral-400 uppercase mb-2">Termo</p>
                <p className="text-3xl font-black text-nexus-purple">~3.4kg</p>
              </div>
            </div>

            <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
              Esse padrão não é uniforme: o encéfalo exibe seu maior pico de crescimento celular entre a 15ª e a 20ª semana, enquanto o tecido adiposo subcutâneo se deposita predominantemente nas últimas seis a oito semanas de gestação.
            </p>
          </div>
        </section>

        {/* Seção 7: Bases do Crescimento */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">07</span>
            Crescimento Ponderoestatural
          </h2>
          <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-[2rem] p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-nexus-text-main">
              O <TermoInterativo termo="crescimento ponderoestatural" explicacao="É o crescimento que envolve tanto o ganho de peso (ponderal) quanto o aumento da altura ou comprimento (estatural)." /> fetal é um dos fenômenos biológicos mais impressionantes. Em pouco menos de 30 semanas, um organismo de 3 cm e menos de 10g transforma-se em um ser de 50 cm e mais de 3kg.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-sky-50 dark:bg-nexus-blue/5 rounded-xl border border-sky-100 dark:border-nexus-blue/10">
                <p className="text-sm font-bold text-sky-700 dark:text-nexus-blue mb-1">Fatores Determinantes:</p>
                <ul className="text-xs space-y-1 text-neutral-600 dark:text-nexus-text-main list-disc ml-4">
                  <li>Genoma fetal (potencial máximo)</li>
                  <li>Ambiente intrauterino</li>
                  <li>Função placentária</li>
                  <li>Estado nutricional materno</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-nexus-purple/5 rounded-xl border border-purple-100 dark:border-nexus-purple/10">
                <p className="text-sm font-bold text-purple-700 dark:text-nexus-purple mb-1">Processo Orquestrado:</p>
                <p className="text-xs text-neutral-600 dark:text-nexus-text-main">Não é apenas aumento de tamanho, mas uma expansão metabolicamente custosa e temporalmente regulada.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 8: Distinção Conceitual */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">08</span>
            Peso vs. Estatura
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-6">
                <h3 className="font-black text-nexus-blue mb-2">Crescimento Estatural</h3>
                <p className="text-sm text-neutral-600 dark:text-nexus-text-main">
                  Reflete a proliferação do tecido cartilaginoso e ósseo. Influenciado por genética e pelo eixo 
                  <TermoInterativo termo="IGF" explicacao="Fatores de Crescimento Semelhantes à Insulina: proteínas que estimulam o crescimento das células e tecidos." />.
                </p>
              </div>
              <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-6">
                <h3 className="font-black text-nexus-purple mb-2">Crescimento Ponderal</h3>
                <p className="text-sm text-neutral-600 dark:text-nexus-text-main">
                  Acúmulo de massa (água, proteínas, minerais e gordura). É mais sensível a variações ambientais e nutrição.
                </p>
              </div>
            </div>
            <div className="bg-neutral-900 text-white rounded-[2rem] p-8">
              <h3 className="text-xl font-black mb-4 text-nexus-orange italic">RCIU: Restrição de Crescimento</h3>
              <div className="space-y-4 text-sm">
                <div className="pb-4 border-b border-white/10">
                  <p className="font-bold text-nexus-orange">Simétrico (Precoce):</p>
                  <p className="opacity-70">Peso, comprimento e cabeça reduzidos proporcionalmente. Causas: genética ou infecções.</p>
                </div>
                <div>
                  <p className="font-bold text-nexus-orange">Assimétrico (Tardio):</p>
                  <p className="opacity-70">
                    Peso reduzido, mas cabeça e comprimento preservados. Ocorre o 
                    <TermoInterativo termo="brain sparing" explicacao="Efeito de 'proteção cerebral': o feto desvia o sangue para o cérebro para garantir seu desenvolvimento mesmo com poucos nutrientes." />.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 9: Velocidade e Aceleração */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">09</span>
            Velocidade e Aceleração
          </h2>
          <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-[2rem] p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed mb-4">
                  A velocidade não é constante. Entre a 9ª e 14ª semana, a velocidade <strong>linear relativa</strong> é máxima (o feto cresce de 3cm para 8cm).
                </p>
                <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed">
                  No 3º trimestre (28ª a 36ª semana), ocorre o maior <strong>ganho ponderal absoluto</strong>, podendo ultrapassar 200g por semana.
                </p>
              </div>
              <div className="w-full md:w-64 p-6 bg-nexus-purple/5 border border-nexus-purple/10 rounded-3xl">
                <h4 className="text-xs font-black text-nexus-purple uppercase mb-4 tracking-widest">Perímetro Cefálico</h4>
                <p className="text-xs text-neutral-600 dark:text-nexus-text-main leading-relaxed">
                  Reflete a intensa <TermoInterativo termo="neurogênese" explicacao="O processo de criação de novos neurônios no cérebro." />. 
                  Uma redução isolada pode indicar problemas neurológicos primários (ex: Zika ou CMV).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 10: Curvas de Crescimento */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">10</span>
            Curvas de Crescimento
          </h2>
          <div className="bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-[2rem] p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-white dark:bg-nexus-card rounded-2xl border border-neutral-200 dark:border-nexus-border text-center">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">AIG</span>
                <p className="text-sm font-bold mt-1">Adequado</p>
              </div>
              <div className="p-4 bg-white dark:bg-nexus-card rounded-2xl border border-neutral-200 dark:border-nexus-border text-center">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">PIG</span>
                <p className="text-sm font-bold mt-1 text-red-500">Pequeno (&lt;p10)</p>
              </div>
              <div className="p-4 bg-white dark:bg-nexus-card rounded-2xl border border-neutral-200 dark:border-nexus-border text-center">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">GIG</span>
                <p className="text-sm font-bold mt-1 text-sky-500">Grande (&gt;p90)</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-nexus-text-main italic">
              *Nota: Curvas universais têm limitações. O ideal é o uso de curvas customizadas que consideram altura, peso e etnia da mãe.
            </p>
          </div>
        </section>

        {/* Seção 11: Composição Corporal */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">11</span>
            Composição Corporal
          </h2>
          <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-[2rem] p-8 shadow-sm">
            <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed mb-8">
              No início, o feto é 90% água. Ao longo da gestação, a água diminui e as frações de proteína, minerais e gordura aumentam.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-amber-50 dark:bg-nexus-orange/5 rounded-3xl border border-amber-100 dark:border-nexus-orange/10">
                <h4 className="font-black text-amber-700 dark:text-nexus-orange mb-4">Gordura Parda</h4>
                <p className="text-sm text-neutral-600 dark:text-nexus-text-main leading-relaxed">
                  Especializada na <TermoInterativo termo="termogênese sem tremor" explicacao="Produção de calor através da queima de gordura parda, sem que o bebê precise tremer (o que gastaria muita energia)." />. 
                  Mediada pela proteína <TermoInterativo termo="UCP-1" explicacao="Proteína Desacopladora 1: funciona como uma 'chave' que faz a gordura gerar calor em vez de energia química." />.
                </p>
              </div>
              <div className="p-6 bg-blue-50 dark:bg-nexus-blue/5 rounded-3xl border border-blue-100 dark:border-nexus-blue/10">
                <h4 className="font-black text-blue-700 dark:text-nexus-blue mb-4">Minerais</h4>
                <p className="text-sm text-neutral-600 dark:text-nexus-text-main leading-relaxed">
                  Cálcio e Fósforo são transferidos ativamente no 3º trimestre (300mg/dia). O Ferro é acumulado nas últimas 10 semanas, por isso prematuros têm alto risco de anemia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 12: Fatores Reguladores */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">12</span>
            Reguladores do Crescimento
          </h2>
          <div className="space-y-6">
            <div className="bg-neutral-900 text-white rounded-[2rem] p-8">
              <h3 className="text-xl font-black mb-4 text-nexus-purple">Genética e Imprinting</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                O <TermoInterativo termo="imprinting genômico" explicacao="Mecanismo onde apenas o gene do pai ou da mãe funciona. Geralmente, genes do pai 'pedem' mais crescimento e os da mãe tentam 'limitar' para proteger o corpo dela." /> equilibra o tamanho fetal. 
                Genes paternos tendem a promover o crescimento, enquanto os maternos tendem a limitá-lo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-6">
                <h4 className="font-black text-nexus-blue mb-2">Eixo IGF</h4>
                <p className="text-xs text-neutral-600 dark:text-nexus-text-main">
                  IGF-2 predomina no início. IGF-1 assume no 3º trimestre e é sensível à nutrição. São os principais motores do crescimento celular.
                </p>
              </div>
              <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl p-6">
                <h4 className="font-black text-nexus-purple mb-2">Insulina Fetal</h4>
                <p className="text-xs text-neutral-600 dark:text-nexus-text-main">
                  No feto, a insulina é um <strong>hormônio de crescimento</strong>. Hiperglicemia materna gera hiperinsulinismo fetal e <TermoInterativo termo="macrossomia" explicacao="Quando o bebê nasce muito grande (geralmente acima de 4kg), comum em mães com diabetes não controlado." />.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 13: A Placenta */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">13</span>
            A Placenta
          </h2>
          <div className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-[2rem] p-8 shadow-sm">
            <p className="text-neutral-700 dark:text-nexus-text-main leading-relaxed mb-6">
              A placenta é o pulmão, intestino, rim e fígado do feto. Sua eficiência determina o tamanho ao nascer.
            </p>
            <div className="p-6 bg-neutral-50 dark:bg-nexus-surface rounded-2xl border border-neutral-200 dark:border-nexus-border">
              <p className="text-sm font-bold mb-2">Avaliação Clínica:</p>
              <p className="text-sm text-neutral-600 dark:text-nexus-text-main">
                A <TermoInterativo termo="dopplervelocimetria" explicacao="Exame de ultrassom que mede a velocidade do sangue nos vasos. Ajuda a saber se a placenta está nutrindo o bebê corretamente." /> permite detectar se o feto está redistribuindo o fluxo para proteger o cérebro (centralização).
              </p>
            </div>
          </div>
        </section>

        {/* Seção 14: Programação Fetal */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-neutral-800 dark:text-nexus-text-title mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-nexus-surface text-sm">14</span>
            Programação Fetal (DOHaD)
          </h2>
          <div className="bg-nexus-purple text-white rounded-[2.5rem] p-10 shadow-xl">
            <h3 className="text-2xl font-black mb-6 italic">A Hipótese de Barker</h3>
            <p className="text-lg leading-relaxed mb-8 opacity-90">
              Condições de crescimento intrauterino têm consequências para toda a vida. É a chamada <TermoInterativo termo="DOHaD" explicacao="Origens Desenvolvimentais da Saúde e da Doença: a ideia de que o que acontece no útero 'programa' o risco de doenças no futuro." />.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
              <p className="text-sm leading-relaxed">
                Fetos em ambientes restritos fazem uma <TermoInterativo termo="adaptação poupadora" explicacao="O feto 'aprende' a sobreviver com pouco. Ele diminui a insulina e guarda mais gordura. Se depois de nascer ele tiver comida em excesso, esse 'ajuste' vira diabetes e obesidade." />. 
                Isso ocorre via <TermoInterativo termo="epigenética" explicacao="Mudanças na forma como o corpo lê o DNA, sem mudar o código genético em si. É como colocar 'etiquetas' nos genes para ligar ou desligar funções." />.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusão */}
        <div className="mt-20 p-12 bg-nexus-purple text-white rounded-[3rem] shadow-2xl shadow-nexus-purple/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <h2 className="text-3xl font-black mb-6 italic">Síntese do Aprendizado</h2>
          <p className="text-xl leading-relaxed opacity-90 font-light">
            Compreender a delimitação e a dinâmica do período fetal é o alicerce para analisar a maturação de cada sistema. 
            <strong> O que se desenvolve no período embrionário determina a arquitetura; o que ocorre no período fetal determina a função</strong> — e é essa função que permitirá a transição bem-sucedida para a vida independente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeriodoFetal;
