import React, { useState, useMemo, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Award, 
  Filter, 
  RefreshCw, 
  Sparkles, 
  Trophy, 
  Download, 
  Play, 
  HelpCircle, 
  Activity, 
  ShieldAlert, 
  ListChecks,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TrabalhoPartoParturicao from './TrabalhoPartoParturicao';

// Interfaces
export interface M8Question {
  id: string;
  topicId: number;
  temaPrincipal: string;
  topicoEspecifico: string;
  grauImportancia: 'Muito Alto' | 'Alto' | 'Médio';
  nivelDificuldade: '🟢 Fácil' | '🟡 Médio' | '🔴 Difícil';
  enunciado: string;
  alternativas: string[];
  gabarito: number;
  comentario: string;
}

interface Module8TrainingProps {
  onBack: () => void;
  onAnswer?: (isCorrect: boolean) => void;
}

// 9 High-yield topics with concise titles and high-impact summaries
const TOPICS = [
  { 
    id: 1, 
    title: 'Trabalho de Parto e Parturição', 
    summary: 'A fase ativa se inicia a partir de contrações regulares associadas à dilatação cervical ≥ 4cm (conforme diretrizes clássicas) ou 5cm (Ministério da Saúde). O partograma monitora esta progressão e ajuda no diagnóstico das distócias: fase ativa prolongada (dilatação cervical lenta), parada secundária da dilatação (dilatação cessada por ≥ 2h em avaliações sucessivas) e parto taquitócito.',
    insight: '🔑 Parada secundária exige descartar desproporção céfalo-pélvica (DCP), amniotomia artificial e ajuste dinâmico antes de correr para indicar cesariana.'
  },
  { 
    id: 2, 
    title: 'Assistência ao Recém-Nascido na Sala de Parto', 
    summary: 'Para recém-nascidos a termo saudáveis (com respiração ou choro vigentes, e tônus muscular flexionado), o clampeamento do cordão umbilical deve ser tardio (1 a 3 minutos). No entanto, em caso de apneia, gasping ou flacidez, inicia-se imediatamente o algoritmo de reanimação neonatal na mesa radiante: aquecer, posicionar, aspirar se obstruído, secar. Se a FC persistir < 100 bpm após esses passos iniciais de 30 segundos, a Ventilação com Pressão Positiva (VPP) sob ar ambiente (O2 21% em termo) é o passo de ouro do primeiro minuto (Minuto de Ouro).',
    insight: '🔑 Massagem cardíaca e adrenalina são medidas raras, indicadas apenas se a FC continuar < 60 bpm após VPP efetiva e técnica corretiva de vias aéreas.'
  },
  { 
    id: 3, 
    title: 'Icterícia Neonatal e Metabolismo da Bilirrubina', 
    summary: 'A bilirrubina indireta (não conjugada) é lipossolúvel e gerada pela quebra de hemácias. Em taxas excessivas, a bilirrubina não conjugada livre ultrapassa a barreira hematoencefálica e se deposita seletivamente nos gânglios da base, provocando o Kernicterus (encefalopatia crônica). A icterícia hemolítica precoce (< 24h) com Coombs direto positivo frequentemente sugere incompatibilidade ABO (mãe O, Rn A ou B) ou Rh (mãe Rh-, Rn Rh+).',
    insight: '🔑 A fototerapia atua convertendo a bilirrubina indireta tóxica em fotoisômeros solúveis em água (lumirrubina) eliminados pela bile e urina sem necessidade de conjugação hepática.'
  },
  { 
    id: 4, 
    title: 'Triagem Neonatal Universal', 
    summary: 'Rastreios obrigatórios na alta neonatal: O Teste do Pezinho deve ser coletado idealmente no 3º ao 5º dia de vida para detectar Hipotireoidismo Congênito, Fenilcetonúria, Anemias Falciformes/hemoglobinopatias, Fibrose Cística, Hiperplasia Adrenal Congênita e Deficiência de Biotinidase. O Teste do Coraçãozinho mede oxigenação no membro superior direito (pré-ductal) e em um membro inferior (pós-ductal) entre 24h e 48h de vida; normal se SatO2 ≥ 95% em ambos e diferença < 3% entre eles.',
    insight: '🔑 Testes do coraçãozinho alterados devem ser repetidos em 1h; se persistir a alteração, um ecocardiograma de urgência é mandatório.'
  },
  { 
    id: 5, 
    title: 'Aleitamento Materno e Imunologia Neonatal', 
    summary: 'O aleitamento materno exclusivo é recomendado até os 6 meses. O colostro se destaca por níveis altíssimos de Imunoglobulina A Secretória (IgAs), que reveste as mucosas gastrointestinais do RN de forma tópica, bloqueando adesão de patógenos. Mastite e abscesso mamário exigem drenagem parcial e antibiótico, mas o esvaziamento contínuo é tratamento fundamental e a amamentação não deve ser suspensa na mama afetada a menos que a incisão cirúrgica envolva a aréola.',
    insight: '🔑 A amamentação fortalece a barreira imune intestinal; fissuras mamárias ocorrem quase sempre por pega incorreta e aréola úmida.'
  },
  { 
    id: 6, 
    title: 'Sistema Musculoesquelético e Desenvolvimento Motor', 
    summary: 'A displasia do desenvolvimento do quadril (DDQ) é avaliada sistematicamente pelas manobras de Ortolani (redução ativa do quadril feto-luxado por abdução) e Barlow (instabilidade na adução/provocação). O torcicolo congênito exibe flexão e rotação restritas e cursa ocasionalmente com um tumor indolor nodular em oliva do músculo esternocleidomastoideo, manejado inicialmente com alongamento cervical físico passivo precoce.',
    insight: '🔑 O diagnóstico de DDQ precoce com manobras positivas de Barlow ou Ortolani e ultrassonografia de quadril previne coxartrose na infância.'
  },
  { 
    id: 7, 
    title: 'Desenvolvimento Neuropsicomotor e Teoria de Piaget', 
    summary: 'O período Sensório-motor (0-2 anos) de Jean Piaget baseia-se na exploração tátil/motora do espaço imediato. O seu marco crucial é a internalização da Permanência do Objeto (compreender que objetos existem mesmo quando escondidos, o que desfaz a ansiedade extrema de separação). Na puericultura geral, marcos motores como rolar, sustentação cervical e preensão voluntária de objetos com as duas mãos ocorrem no período consolidado dos 6 meses de idade.',
    insight: '🔑 A persistência de reflexos arcaicos (como Moro ou tônico-assimétrico) além dos 6 meses alerta para potencial atraso do neurodesenvolvimento.'
  },
  { 
    id: 8, 
    title: 'Puberdade, Adolescência e Crescimento Puberal', 
    summary: 'A puberdade fisiológica inicia-se pela telarca (broto mamário - Tanner M2) em meninas e aumento testicular ≥ 4mL (Tanner G2) em meninos, provocados pela ativação central do eixo gonadal. O pico do estirão de crescimento ocorre cedo nas meninas (Tanner M2-3), enquanto nos rapazes do sexo masculino ocorre mais tardiamente (Tanner G4). A primeira menstruação (menarca) é um evento puberal terminal indicando desaceleração final de crescimento.',
    insight: '🔑 Meninas crescem em média somente de 5 a 7 centímetros após a ocorrência do primeiro ciclo menstrual (menarca).'
  },
  { 
    id: 9, 
    title: 'Sexualidade, ISTs, ECA e Sigilo Médico', 
    summary: 'Pelo Estatuto da Criança e do Adolescente (ECA) e o Código de Ética Médica, o adolescente tem assegurado o direito ao sigilo e consentimento independente de intervenção/tratamento reprodutivo básico e ISTs se avaliada a sua capacidade de discernimento e maturidade. O sigilo do médico com o menor só será quebrado se for constatado risco eminente de vida, negligência grave do núcleo protetor ou violência sexual sistêmica dirigida.',
    insight: '🔑 Tratar parceiros sexuais é indispensável na abordagem sindrômica de ISTs no menor de forma consensual e autônoma direcionada.'
  }
];

// 18 Solid High-yield Medical Questions (2 questions per topic)
const QUESTIONS: M8Question[] = [
  {
    id: 'm8-q1',
    topicId: 1,
    temaPrincipal: 'Trabalho de Parto',
    topicoEspecifico: 'Fases clínicas do parto',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Paciente secundigesta, termo (39 semanas), dá entrada na maternidade com queixa de dor lombar e abdominal irradiada para o baixo ventre. Ao exame: dinâmica de 3 contrações em 10 minutos (com duração de 40 segundos cada), colo uterino centrado, esvaecido 80%, com dilatação de 4 cm. Apresentação cefálica, fletida, plano -2 de De Lee. Membranas íntegras. De acordo com a classificação das fases clínicas do parto, qual é a conduta diagnóstica e conduta imediata indicada?',
    alternativas: [
      'Fase latente do trabalho de parto; indicar alta hospitalar com orientação de retornar quando as contrações aumentarem de intensidade.',
      'Fase ativa do trabalho de parto; indicar internação hospitalar e acompanhamento da progressão pelo partograma.',
      'Falso trabalho de parto; administração de analgésico e observação por 12 horas antes da indução.',
      'Período pélvico; amniotomia imediata para aceleração do parto.',
      'Fase de transição; prescrição de ocitocina contínua em bomba de infusão.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: A fase ativa do trabalho de parto é classicamente definida pela presença de contrações regulares associadas à dilatação cervical de pelo menos 4 cm. A conduta nesta fase é a admissão hospitalar e o início do registro no partograma para avaliar a progressão do parto.\n● Por que as outras estão erradas: O falso trabalho de parto ou a fase latente possuem colo grosso/pouco dilatado e contrações irregulares que melhoram com analgesia. A amniotomia precoce e ocitocina sem indicação de distócia são intervenções desnecessárias.'
  },
  {
    id: 'm8-q2',
    topicId: 1,
    temaPrincipal: 'Trabalho de Parto',
    topicoEspecifico: 'Distócias do Partograma',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Durante a fase ativa de um trabalho de parto, o partograma revela duas aferições consecutivas de dilatação e altura da apresentação que demonstram parada da dilatação do colo uterino por 2 horas com dinâmica uterina mantida (4 contrações em 10 minutos). Trata-se de qual distócia do partograma e qual a conduta preferencial inicial?',
    alternativas: [
      'Fase ativa prolongada; indicar cesariana retoricamente de emergência.',
      'Parto taquitócito; fazer analgesia combinada imediatamente e repouso.',
      'Parada secundária da dilatação; avaliar integridade das membranas (amniotomia) e possivelmente analgesia ou correção com ocitocina antes de indicar via cirúrgica.',
      'Parada secundária da descida; indicar fórcipe de rotação ou vácuo-extrator.',
      'Parto obstruído funcional; indicar cesárea imediata sem nova avaliação.'
    ],
    gabarito: 2,
    comentario: '● Por que está certa: A parada secundária da dilatação é caracterizada pela interrupção da dilatação cervical por 2 horas ou mais em duas avaliações consecutivas. A conduta inicial é descartar desproporção cefalopélvica absoluta, realizar amniotomia se as membranas estiverem íntegras, corrigir eventual dinâmica ineficaz com ocitocina ou oferecer analgesia.\n● Por que as outras estão erradas: A fase ativa prolongada refere-se à dilatação que progride muito lentamente (< 1cm/h), mas não para. Parada da descida se refere à apresentação não mudar de plano de De Lee.'
  },
  {
    id: 'm8-q3',
    topicId: 2,
    temaPrincipal: 'Assistência ao RN',
    topicoEspecifico: 'Sala de parto a termo',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'Um recém-nascido a termo (39 semanas), de gestação sem intercorrências, nasce de parto vaginal chorando e respirando ativamente, com tônus muscular flexionado adequado. De acordo com as diretrizes vigentes da Sociedade Brasileira de Pediatria (SBP) para assistência ao RN na sala de parto, qual o manejo imediato indicado?',
    alternativas: [
      'Levar o Rn imediatamente à mesa de reanimação, aspirar boca e fossas nasais e administrar oxigênio inalatório profilático.',
      'Clampar o cordão umbilical de imediato nas primeiras frações de segundo para mitigar riscos de hiperbilirrubinemia severa.',
      'Promover contato pele a pele tardio após realizar banho higiênico completo na sala de parto.',
      'Clampar o cordão de forma tardia (1 a 3 minutos), posicionar o bebê sobre o abdômen ou tórax materno, manter aquecido por cobertores secos e promover o início do aleitamento materno na primeira hora.',
      'Secar ativamente, cobrir com campo estéril e realizar aspiração de vias aéreas por precaução de mecônio oculto.'
    ],
    gabarito: 3,
    comentario: '● Por que está certa: Bebês a termo vigorosos (choro e respiração presentes, tônus adequado) devem ser submetidos ao clampeamento tardio do cordão (1 a 3 min) e mantidos em contato pele a pele com a mãe para regulação térmica, fortalecimento de vínculo e facilitação da amamentação na chamada Golden Hour (primeira hora).\n● Por que as outras estão erradas: Aspiração sistemática é obsoleta em bebês vigorosos e causa bradicardia por reflexo vagal. O banho deve ser adiado por pelo menos 24 horas para preservação do vernix protetor térmico.'
  },
  {
    id: 'm8-q4',
    topicId: 2,
    temaPrincipal: 'Assistência ao RN',
    topicoEspecifico: 'Asfixia e reanimação',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Durante a reanimação de um RN de termo flácido, em apneia após as medidas iniciais na mesa aquecida (prover calor, posicionar a cabeça, aspirar vias se necessário e secar), o pediatra constata uma frequência cardíaca estável de 78 bpm. De acordo com as diretrizes da SBP de reanimação, qual é a conduta sequencial prioritária?',
    alternativas: [
      'Iniciar compressões cardíacas torácicas frequentes combinadas a oxigênio puro.',
      'Realizar aspiração traqueal mecânica para remoção de líquido amniótico residual profundo.',
      'Iniciar Ventilação com Pressão Positiva (VPP) com balão neonatal e máscara em ar ambiente (O2 21%) dentro do primeiro minuto de vida (minuto de ouro).',
      'Administrar via umbilical dose imediata de adrenalina ou expansor de volume.',
      'Administrar oxigênio livre por máscara facial encostada até que a saturação duplique.'
    ],
    gabarito: 2,
    comentario: '● Por que está certa: O tratamento da apneia ou frequência cardíaca < 100 bpm após os passos iniciais de aquecer e posicionar é a Ventilação com Pressão Positiva (VPP). Ela constitui o passo mais crítico da reanimação e deve ser iniciada nos primeiros 60 segundos de vida (o minuto de ouro) em ar ambiente para RNs de termo.\n● Por que as outras estão erradas: Compressões cardíacas são indicadas apenas se, após VPP adequada por 30 segundos, a FC mantiver-se < 60 bpm. A maior parte das bradicardias neonatais resolve-se rapidamente com expansão pulmonar eficiente através da VPP.'
  },
  {
    id: 'm8-q5',
    topicId: 3,
    temaPrincipal: 'Icterícia Neonatal',
    topicoEspecifico: 'Doença Hemolítica ABO/Rh',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Um RN nascido de parto normal com 32 horas de vida apresenta icterícia moderada que alcança o tronco superior (Zona II de Kramer). O laboratório indica Bilirrubina Total de 8,2 mg/dL com fração Indireta de 7,6 mg/dL. Tipo sanguíneo materno é O positivo, bebezinho é A positivo com teste de Coombs Direto discretamente positivo. Qual é a causa primária mais provável?',
    alternativas: [
      'Icterícia pelo aleitamento materno decorrente de jejum e desidratação branda.',
      'Icterícia hemolítica por incompatibilidade sanguínea materno-fetal do grupo ABO.',
      'Icterícia fisiológica precoce ocasionada pela alta massa eritrocitária neonatal.',
      'Deficiência congênita parcial da enzima glicuroniltransferase (Síndrome de Crigler-Najjar).',
      'Atresia congênita das vias biliares extra-hepáticas.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: A manifestação de icterícia antes de 36h acompanhada de hiperbilirrubinemia indireta em RN tipo A nascido de mãe tipo O, com Coombs Direto positivo confirma doença hemolítica por incompatibilidade ABO. Anticorpos maternos IgG anti-A preexistentes franqueiam a placenta e atacam as células vermelhas do feto.\n● Por que as outras estão erradas: A icterícia fisiológica é benigna, surge após 36-48h e tem Coombs direto negativo. Atresia biliar cursa com icterícia tardia por bilirrubina direta (colestática).'
  },
  {
    id: 'm8-q6',
    topicId: 3,
    temaPrincipal: 'Icterícia Neonatal',
    topicoEspecifico: 'Kernicterus e Barreira Hematoencefálica',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A toxicidade biológica da hiperbilirrubinemia indireta grave sobre o sistema nervoso central (Kernicterus) decorre diretamente de qual característica físico-química da bilirrubina livre (não conjugada)?',
    alternativas: [
      'Seu caráter altamente hidrossolúvel, que permite transporte ativo livre por canis proteicos na barreira hematoencefálica.',
      'Sua alta capacidade de união química com as glicoproteínas ácidas do líquido cefalorraquidiano.',
      'Sua natureza lipossolúvel (lipofílica) e estado não ligado à albumina, o que a permite transpor passivamente membranas biológicas e se depositar nos gânglios da base.',
      'Sua ação de induzir vasoconstrição arteríolar por competição com o Óxido Nítrico sináptico.',
      'Sua conversão metabólica em lumirrubina neurotóxica pela luz natural do sol.'
    ],
    gabarito: 2,
    comentario: '● Por que está certa: A bilirrubina indireta circula ligada à albumina plasmática. Em níveis de extrema saturação ou condições de hipoalbuminemia, acidose ou infecções, a fração de bilirrubina livre (e altamente lipofílica) atravessa a barreira hematoencefálica do RN, ligando-se covalentemente aos gânglios neuronais basais, causando destruição celular.\n● Por que as outras estão erradas: A bilirrubina direta é hidrossolúvel, não atravessa a barreira e não causa Kernicterus. A lumirrubina é o subproduto benigno da fototerapia, facilmente excretado.'
  },
  {
    id: 'm8-q7',
    topicId: 4,
    temaPrincipal: 'Triagem Neonatal',
    topicoEspecifico: 'Rastreio do Pezinho',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'O Programa Nacional de Triagem Neonatal biológica (Teste do Pezinho) é de extrema relevância no SUS. Qual é a janela ideal de coleta recomendada e as doenças rastreadas no pacote básico original?',
    alternativas: [
      'Nas primeiras 12 horas pós-venda, para evitar perda do seguimento; rastreia diabetes de tipo 1 e displasias.',
      'Do 3º ao 5º dia de vida útil; rastreia Hipotireoidismo Congênito, Fenilcetonúria, Anemia Falciforme/Hemoglobinopatias, Fibrose Cística, Hiperplasia Adrenal Congênita e Deficiência de Biotinidase.',
      'No 15º dia após queda do coto umbilical; rastreia autismo e doenças digestivas.',
      'Com um mês de vida na consulta inicial da puericultura; rastreia tuberculose e deficiência imune combinada.',
      'A qualquer momento no primeiro trimestre de forma indistinta.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: O período preconizado do 3º ao 5º dia garante esvaziamento de hormônios maternos residuais e sobrecarga ideal de fenilalanina pela ingestão adequada de leite antes do teste. O SUS cobre universalmente estas 6 emblemáticas patologias crônicas de diagnóstico silencioso.\n● Por que as outras estão erradas: Coletas no primeiro dia geram falsos positivos altos para hipotireoidismo pelo pico transiente neonatal fisiológico de TSH.'
  },
  {
    id: 'm8-q8',
    topicId: 4,
    temaPrincipal: 'Triagem Neonatal',
    topicoEspecifico: 'Teste do Coraçãozinho',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Na triagem de cardiopatias congênitas críticas via oximetria de pulso (Teste do Coraçãozinho), o enfermeiro obtém no MSD saturação de 92% e no MI saturação de 90%. Com base na norma clínica de aprovação do teste, qual a interpretação e a conduta obrigatória?',
    alternativas: [
      'O teste é considerado normal, pois ambas as medidas estão acima de 85% sem desvio lateral.',
      'Trata-se de um teste duvidoso; orientar repouso térmico por 12 horas e repetir antes da alta médica.',
      'Teste alterado. Deve-se repetir as medidas em 1 hora. Se persistir alterado (SatO2 < 95% ou diferença ≥ 3% entre pré e pós-ductal), o recém-nascido deve ser submetido a um Ecocardiograma urgente.',
      'Indicar transferência de urgência para cirurgia de anastomose de Blalock-Taussig imediata.',
      'Trata-se de falso-positivo; o teste só tem valor em bebês com cianose central visível de extremidades.'
    ],
    gabarito: 2,
    comentario: '● Por que está certa: O teste do coraçãozinho é considerado normal se as duas saturações periféricas forem ≥ 95% e com diferença menor que 3%. Se houver valores menores ou diferença de 3% ou mais, deve-se repetir a medição em 1 hora. Persistindo a alteração, o ecocardiograma deve ser realizado antes da alta para descartar anomalias cardíacas críticas dependentes de canal arterial.\n● Por que as outras estão erradas: Cardiopatias críticas podem se manifestar de forma assintomática inicial, o que justifica o teste ser focado em triagem universal.'
  },
  {
    id: 'm8-q9',
    topicId: 5,
    temaPrincipal: 'Leite Materno',
    topicoEspecifico: 'Imunologia do Colostro',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'O leite materno fornece robusta imunidade passiva ao bebê. No colostro, primeiro fluido secretado após o parto, qual anticorpo se faz maciçamente abundante para guiar a proteção mucosa intestinal neonatal?',
    alternativas: [
      'Imunoglobulina G total (IgG), absorvida ativamente para circulação sistêmica.',
      'Imunoglobulina A Secretória (IgAs), que se deposita localmente no lúmen das mucosas intestinais obstando fitas virais e bactérias.',
      'Imunoglobulina M (IgM) translocável.',
      'Imunoglobulina E (IgE), que estimula liberação imediata de histaminas em eosinófilos barreira.',
      'Inibina B imune estéril.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: A IgA Secretória (IgAs) possui uma barreira polipeptídica (peptídeo de ligação e componente secretor) que resiste bravamente ao ataque ácido estomacal. Ela se acopla nas microvilosidades do tubo digestivo do lactente, blindando contra infecções sem necessitar ativar vias de inflamação destrutiva.\n● Por que as outras estão erradas: O Rn recebe abundante IgG transplacentária sistêmica antes de nascer.'
  },
  {
    id: 'm8-q10',
    topicId: 5,
    temaPrincipal: 'Leite Materno',
    topicoEspecifico: 'Intercorrências na Lactação',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Mamãe com 10 dias pós-parto refere área intensamente dolorosa local em mama direita, com hiperemia focal no quadrante extra-superior, calafrios e febre axilar de 38,5°C há um dia. Constata-se massa palpável e flutuante de 2 cm de diâmetro. Qual diagnóstico clínico e recomendação assistencial ideal em relação à amamentação?',
    alternativas: [
      'Tratamento de Ingurgitamento simples; suspender o aleitamento na primeira fase para compressas quentes úmidas.',
      'Mastite bacteriana focal; dreno temporário e abolição das mamadas na mama afetada profilaticamente de fezes lácteas.',
      'Abscesso mamário puerperal; a conduta é drenagem cirúrgica ou punção esvaziadora guiada, uso de antibióticos apropriados e preservação rigorosa da amamentação se a cicatriz ou dreno não obstruírem a pega aréolar direta.',
      'Câncer de mama lobular de início precoce; desmame absoluto programado.',
      'Monilíase mamária dolorosa; suspender amamentação bilateral e iniciar fluconazol materno urgente.'
    ],
    gabarito: 2,
    comentario: '● Por que está certa: O abcesso mamário é uma das complicações da mastite acumulativa. O manejo clínico correto envolve drenagem e terapia antibiótica. O esvaziamento mamário mecânico ou por mamadas espontâneas é crucial para a recuperação; logo, o aleitamento na mama doente não deve ser cancelado, exceto se a incisão de drenagem impedir a pega aréolar correta.\n● Por que as outras estão erradas: Interrupção indesejada do fluxo lácteo agrava quadros de ingurgitamento e mastite secundária.'
  },
  {
    id: 'm8-q11',
    topicId: 6,
    temaPrincipal: 'Ortopedia Pediátrica',
    topicoEspecifico: 'Barlow e Ortolani',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Ao avaliar as articulações do quadril de um bebê de 5 dias na primeira consulta de triagem, o pediatra executa as manobras de Barlow e Ortolani. Qual a finalidade descritiva e os movimentos físicos de cada manobra?',
    alternativas: [
      'Barlow investiga rigidez medular cervical; Ortolani mimetiza marcha passiva do recém-nascido.',
      'Barlow age gerando subluxação com quadril flexionado e aduzido sob discreta pressão posterior; Ortolani age tentando reduzir ativamente no acetábulo um quadril previamente luxado usando abdução e elevação do grande trocanter.',
      'Barlow mobiliza a rótula rotacionalmente; Ortolani verifica o sinal do gaveta anterior ligamentoso.',
      'Ambas avaliam torcicolo por meio de tração cervical controlada.',
      'Barlow analisa a flexibilidade do calcanhar; Ortolani verifica luxação escapular de parto.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: A manobra de Barlow é de provocação, ou seja, verifica se um quadril instável é potencialmente luxável pela adução e pressão posterior leve. A de Ortolani é de redução, ou seja, recoloca o quadril deslocado no lugar por abdução e elevação, sentindo-se um característico clique ou ressalto de acomodação.\n● Por que as outras estão erradas: O teste de DDQ precoce afasta deficiências ortopédicas severas e permanentes de locomoção.'
  },
  {
    id: 'm8-q12',
    topicId: 6,
    temaPrincipal: 'Ortopedia Pediátrica',
    topicoEspecifico: 'Torcicolo Congênito',
    grauImportancia: 'Médio',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'RN de 24 dias de vida apresenta-se sistematicamente com a cabecinha fletida para a esquerda e o queixo rotacionado para a direita. Na palpação de região lateral cervical esquerda, identifica-se pequeno nódulo firme de 1,5 cm de consistência fibrocartilaginosa e indolor no corpo do esterno-cleido-mastoideo esquerdo. Qual diagnóstico exato e conduta indicativa inicial?',
    alternativas: [
      'Abscesso de glândula linfática satélite; antibioticoterapia intratecal de longa ação.',
      'Torcicolo congênito (tumor do esternocleidomastoideo); reabilitação com manobras posturais e exercícios precoces de alongamento passivo cervical direcionado por fisioterapia.',
      'Cisto de fenda branquial infectado; requisição de exérese em caráter de cirurgia de urgência no centro obstétrico.',
      'Fibrossarcoma maligno cervical de instalação fetal; internação em oncopediatria especializada para quimioterapia.',
      'Cisto do ducto tireoglosso com fístula em drenagem espontânea.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: O Torcicolo Congênito é uma fibrose focal do músculo esternocleidomastoideo que reduz elasticidade, gerando postura viciada patológica (inclinação da cabeça ipsilateral e rotação contralateral do queixo). Palpar o "tumor de oliva benigno" confirma o diagnóstico. Alongamentos cervicais passivos leves e mudanças de estímulo visual precoces resolvem mais de 90% dos casos sem necessidade de abordagens agressivas.\n● Por que as outras estão erradas: É uma alteração musculoesquelética benigna autolimitada.'
  },
  {
    id: 'm8-q13',
    topicId: 7,
    temaPrincipal: 'Neuropediatria',
    topicoEspecifico: 'Teoria Cognitiva de Piaget',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O desenvolvimento intelectual do RN e lactente até 24 meses é classificado no Estágio Sensório-Motor de Jean Piaget. Qual consiste o marco cognitivo central definidor desse intervalo que redefine a percepção de integridade externa?',
    alternativas: [
      'A aquisição do pensamento simbólico abstrato e solução verbal espontânea de problemas aritméticos.',
      'A internalização da Permanência do Objeto, estágio em que a criança entende que seres ou objetos continuam existindo mesmo quando retirados do seu amplo campo visual.',
      'A aquisição de habilidades espaciais de conservação matemática de líquidos em recipientes.',
      'O egocentrismo social verbal acentuado da pré-fala.',
      'A categorização racional de classes animais estruturada e hierárquica.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: No início do período sensório-motor, se um objeto sai da visão imediata, ele simplesmente "deixa de existir" para o bebê. O estabelecimento da "permanência do objeto", geralmente por volta do 8º ao 9º mês, viabiliza o entendimento de estabilidade física das coisas e possibilita a tolerância ao distanciamento dos pais.\n● Por que as outras estão erradas: A habilidade de conservação pertence ao período Operatório Concreto (7 a 11 anos); o pensamento puramente analítico abstrato é do Operatório Formal (acima de 11 anos).'
  },
  {
    id: 'm8-q14',
    topicId: 7,
    temaPrincipal: 'Neuropediatria',
    topicoEspecifico: 'Marcos do Desenvolvimento (6 meses)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Durante a consulta de rotina de puericultura de um lactente hígido com 6 meses de vida, quais marcos do desenvolvimento motor e psicomotor devem ser obrigatoriamente identificados pelo pediatra de forma regular?',
    alternativas: [
      'Andar arrastando as pernas sem controle, pinça madura fina entre polegar e indicador, balbucear 3 termos inteiros.',
      'Engatinhar com apoio, transferir objetos de canetas entre mãos de forma reflexa, e fixar olhar sem sorrir.',
      'Manter o controle cervical completo (sustentar cabeça), rolar lateralmente ativamente, tentar alcançar brinquedos intencionalmente na sua proximidade e iniciar ato de assentar-se com apoio físico posterior temporário.',
      'Ausência do reflexo pupilar e permanência de reflexos arcaicos severos de Moro na tração lombar.',
      'Ficar de pé sem ajuda, e dar tchau mecânico com os dedos flexionados.'
    ],
    gabarito: 2,
    comentario: '● Por que está certa: Condutas aos 6 meses de idade envolvem controle postural axial completo de pescoço, capacidade de rolar (virando-se de barriga para cima e para baixo), alcance voluntário de objetos sob coordenação olho-mão, e manutenção em posição sentada com apoio moderado de quadris.\n● Por que as outras estão erradas: Andar e pinça fina madura são metas próximas de 10 a 12 meses de idade no desenvolvimento infantil.'
  },
  {
    id: 'm8-q15',
    topicId: 8,
    temaPrincipal: 'Puberdade',
    topicoEspecifico: 'Classificação de Tanner início',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O início puberal fisiológico decorre do incremento de pulsatilidade de GnRH. Quais eventos morfológicos mínimos e seus respectivos estágios na escala de Tanner assinalam clinicamente a deflagração da puberdade central no sexo feminino e masculino?',
    alternativas: [
      'Surgimento da menarca (grau M5) na menina e pelos pubianos fartos (Tanner P3) no menino.',
      'Surgimento do broto mamário palpável ou telarca (Tanner M2) no sexo feminino; e o aumento do volume de cada testículo para pelo menos 4 mL (Tanner G2) no sexo masculino.',
      'Aparecimento da acne generalizada e mudança definitiva do timbre vocal (Tanner G3).',
      'Desaceleração exponencial do crescimento linear distal acentuado.',
      'Ocorrência de polução noturna de repetição no rapaz e aparecimento de pelos axilares abundantes na moça.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: M2 (Telarca) é o disparador do desenvolvimento estrogênico em meninas. O marco oficial testicular de ≥ 4mL (G2) em rapazes indica resposta funcional ao estímulo das gonadotrofinas (LH/FSH) sobre as células germinativas e de sustentação intersticial do testículo.\n● Por que as outras estão erradas: A menarca é um evento de puberdade adiantado tardio e não coincide com o início da ativação do eixo.'
  },
  {
    id: 'm8-q16',
    topicId: 8,
    temaPrincipal: 'Puberdade',
    topicoEspecifico: 'Dinâmica do Estirão Puberal',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Com relação ao estirão de crescimento (pico do estirão puberal estatural) e sua correlação de tempo em ambos os sexos, qual correlação clínica é fundamentada cientificamente?',
    alternativas: [
      'Meninas realizam seu estirão tardiamente, logo após o início do ciclo menstrual secundário consolidado.',
      'O garoto realiza seu maior estirão estatural no início fisiológico (G2), crescendo em ritmo menor de Tanner G4.',
      'As meninas fazem o estirão puberal estatural precoce de forma sistemática (fase inicial de Tanner M2-M3), ao passo que a menarca ocorre aproximadamente 2 anos depois da telarca, marcando desaceleração final do potencial de crescimento.',
      'Tanto meninos quanto meninas fazem o pico de estirão puberal em Tanner M5/G5 de forma exclusivamente síncrona.',
      'O estirão puberal é orquestrado de forma isolada por metabólitos da testosterona sem papel do estrogênio local.'
    ],
    gabarito: 2,
    comentario: '● Por que está certa: O surto de crescimento linear na menina é evento inicial da puberdade (M2-3). Os estrógenos geram rápida fusão óssea epifisária subsequente; por isso a menarca (evento tardio) consagra o fim do estirão de crescimento rápido de ossos longos. No menino, o estirão é tardio (estágio G3-G4).\n● Por que as outras estão erradas: Mitos sobre o estirão pós-menarca induzem diagnósticos errôneos de baixa estatura severa.'
  },
  {
    id: 'm8-q17',
    topicId: 9,
    temaPrincipal: 'Ética e ECA',
    topicoEspecifico: 'Sigilo médico e menor',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Uma garota saudável de 15 anos solicita atendimento hebiátrico desacompanhada. Ela revela estar com atividade sexual ativa recente e solicita prescrição de método anticonceptivo oral eficiente. Contudo, ela suplica que esta orientação e conduta não sejam relatadas à sua família sob hipótese alguma. Ante o ECA e o Código de Ética Médica brasileira, qual conduta procede?',
    alternativas: [
      'Negar atendimento e recusar prescrições até que os pais ou responsáveis assinem termo cartorário conjunto.',
      'Acatar a solicitação do uso do fármaco contraceptivo, porém acionar os pais por ligação privada obrigatória para ciência do ocorrido.',
      'Prescrever o anticonceptivo, e manter o sigilo absoluto e irretocável da consulta, uma vez que a paciente de 15 anos dispõe de discernimento, maturidade e capacidade intelectual para guiar sua saúde reprodutiva de forma autônoma, inexistindo em tela situação de risco de morte ou maus-tratos graves.',
      'Encaminhar denúncia imediata ao Conselho Tutelar local por comportamento sexual de menor desprotegido.',
      'Entregar a prescrição do anticonceptivo, porém obrigar a menor a trazer assinatura dos pais forjando atestado escolar.'
    ],
    gabarito: 2,
    comentario: '● Por que está certa: O Código de Ética Médica e o Estatuto da Criança e do Adolescente protegem o direito ao sigilo do menor capaz (com discernimento para avaliar riscos/benefícios de saúde). Prescrever contraceptivo é ato lícito de saúde preventiva sexual. O sigilo do ato é direito do menor e apenas deve ser rompido se houver risco real à sua vida ou evidência de abusos/exploração.\n● Por que as outras estão erradas: Ligar para os pais quebra desnecessariamente o sigilo ético, afastando a menor do contato preventivo de saúde pública.'
  },
  {
    id: 'm8-q18',
    topicId: 9,
    temaPrincipal: 'Ética e ECA',
    topicoEspecifico: 'Manejo de ISTs',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Lactente ou adolescente de 16 anos comparece com corrimento uretral mucopurulento sintomático sugestivo de infecção por Neisseria gonorrhoeae / Chlamydia trachomatis. De que forma deve se conduzir o manejo ético do parceiro ou parceira sexual do menor pelo médico de família?',
    alternativas: [
      'Ignorar o parceiro por completo em decorrência do dever rígido de sigilo estrito de dados do adolescente atendido.',
      'Orientar de modo acolhedor e sigiloso sobre a indispensável necessidade de tratar simultaneamente os parceiros sexuais para conter reinfecções consecutivas, estimulando o menor a encaminhar o contato e disponibilizar receitas preventivas em nome do(a) paciente se consentido.',
      'Prescrever tratamento apenas se houver ordem de tutela judicial de guarda de responsáveis.',
      'Indicar sorologia de triagem, mas notificar os responsáveis do parceiro mesmo contra o desejo expresso do menor.',
      'Notificar o conselho tutelar para averiguação corretiva de intimidades de menores de idades.'
    ],
    gabarito: 1,
    comentario: '● Por que está certa: O manejo eficaz de ISTs envolve o tratamento síncrono dos parceiros (prescrição ou notificação confidencial) de modo a debelar a circulação do patógeno comunitário. O médico atua informando o adolescente de modo autônomo, acolhendo seu papel e liberando prescrição para os parceiros (Tratamento Prescritivo de Parceiros - TPP) respaldado pelas diretrizes vigentes do Ministério da Saúde.\n● Por que as outras estão erradas: Omissão absoluta perpetua o círculo de reinfecções contínuas de clamídia e gonorreia no adolescente.'
  }
];

export default function Module8Training({ onBack, onAnswer }: Module8TrainingProps) {
  const [studyMode, setStudyMode] = useState<'selection' | 'trilha' | 'qbank'>('selection');
  
  // Trilha State
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [trilhaCompletedTopics, setTrilhaCompletedTopics] = useState<number[]>([]);
  const [activeTopicStep, setActiveTopicStep] = useState<'revision' | 'questions'>('revision');
  const [topicQuestionIndex, setTopicQuestionIndex] = useState<number>(0);
  const [trilhaAnswers, setTrilhaAnswers] = useState<Record<string, number>>({});
  const [trilhaRevealed, setTrilhaRevealed] = useState<Record<string, boolean>>({});
  const [xp, setXp] = useState<number>(0);
  const [showXpAnim, setShowXpAnim] = useState<boolean>(false);
  const [lastXpGain, setLastXpGain] = useState<number>(0);

  // QBank State
  const [qbankFilters, setQbankFilters] = useState({
    topics: [] as number[],
    difficulties: [] as string[],
    importances: [] as string[]
  });
  const [qbankAnswers, setQbankAnswers] = useState<Record<string, number>>({});
  const [qbankRevealed, setQbankRevealed] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatedMode, setSimulatedMode] = useState(false);
  const [showQbankFilters, setShowQbankFilters] = useState(true);
  
  // Timer State
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const activeTopicQuestions = useMemo(() => {
    if (selectedTopicId === null) return [];
    return QUESTIONS.filter(q => q.topicId === selectedTopicId);
  }, [selectedTopicId]);

  const filteredQBankQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      const matchTopic = qbankFilters.topics.length === 0 || qbankFilters.topics.includes(q.topicId);
      const matchDiff = qbankFilters.difficulties.length === 0 || qbankFilters.difficulties.includes(q.nivelDificuldade);
      const matchImp = qbankFilters.importances.length === 0 || qbankFilters.importances.includes(q.grauImportancia);
      const matchQuery = searchQuery === '' || 
        q.enunciado.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.temaPrincipal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topicoEspecifico.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTopic && matchDiff && matchImp && matchQuery;
    });
  }, [qbankFilters, searchQuery]);

  // Qbank Counters
  const qbankStats = useMemo(() => {
    let resolved = 0;
    let correct = 0;
    Object.keys(qbankAnswers).forEach(qid => {
      const q = QUESTIONS.find(qy => qy.id === qid);
      if (q) {
        resolved++;
        if (qbankAnswers[qid] === q.gabarito) {
          correct++;
        }
      }
    });
    return { resolved, correct, incorrect: resolved - correct };
  }, [qbankAnswers]);

  // Handle Trilha Action
  const triggerXpGain = (amount: number) => {
    setLastXpGain(amount);
    setXp(p => p + amount);
    setShowXpAnim(true);
    setTimeout(() => {
      setShowXpAnim(false);
    }, 2000);
  };

  const handleTrilhaAnswer = (questionId: string, index: number, originalGabarito: number) => {
    if (trilhaRevealed[questionId]) return;
    setTrilhaAnswers(prev => ({ ...prev, [questionId]: index }));
    setTrilhaRevealed(prev => ({ ...prev, [questionId]: true }));
    
    const correct = index === originalGabarito;
    if (onAnswer) onAnswer(correct);
    
    if (correct) {
      triggerXpGain(50);
    } else {
      triggerXpGain(15);
    }
  };

  const handleNextTrilha = () => {
    if (topicQuestionIndex + 1 < activeTopicQuestions.length) {
      setTopicQuestionIndex(prev => prev + 1);
    } else {
      // Completed Topic !
      if (selectedTopicId !== null && !trilhaCompletedTopics.includes(selectedTopicId)) {
        const nextCompleted = [...trilhaCompletedTopics, selectedTopicId];
        setTrilhaCompletedTopics(nextCompleted);
        triggerXpGain(150); // Bonus for finishing topic trail
      }
      setSelectedTopicId(null);
    }
  };

  const handleQbankAnswerSubmit = (questionId: string, index: number, originalGabarito: number) => {
    if (qbankRevealed[questionId]) return;
    setQbankAnswers(prev => ({ ...prev, [questionId]: index }));
    setQbankRevealed(prev => ({ ...prev, [questionId]: true }));
    const correct = index === originalGabarito;
    if (onAnswer) onAnswer(correct);
  };

  const resetQbank = () => {
    setQbankAnswers({});
    setQbankRevealed({});
    setSeconds(0);
    setIsTimerRunning(false);
  };

  // PDF Export
  const applyProfessionalTemplate = (pdfDoc: any, headerTitle: string) => {
    const pageCount = pdfDoc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdfDoc.setPage(i);
      
      // 1. Watermark rotated across center
      pdfDoc.setFont("helvetica", "bold");
      pdfDoc.setFontSize(60);
      pdfDoc.setTextColor(245, 247, 250); // extremely faint blueish grey
      pdfDoc.text("NEXUS BQ", 45, 170, { angle: 45 });
      
      // 2. Faint grid border around page
      pdfDoc.setDrawColor(241, 245, 249);
      pdfDoc.setLineWidth(0.5);
      pdfDoc.rect(10, 10, 190, 277); // soft border frame

      // 3. Header Styling
      pdfDoc.setDrawColor(226, 232, 240); // Slate 200
      pdfDoc.setLineWidth(1);
      pdfDoc.line(15, 20, 195, 20); // Divider

      pdfDoc.setFont("helvetica", "bold");
      pdfDoc.setFontSize(8);
      pdfDoc.setTextColor(14, 165, 233); // Light Blue / Teal
      pdfDoc.text("NEXUS ACADEMY", 15, 16);
      pdfDoc.setFont("helvetica", "bold");
      pdfDoc.setTextColor(71, 85, 105); // Slate 600
      const truncated = headerTitle.length > 50 ? headerTitle.substring(0, 47) + "..." : headerTitle;
      pdfDoc.text(truncated.toUpperCase(), 195, 16, { align: "right" });

      // 4. Footer Styling
      pdfDoc.line(15, 275, 195, 275);
      
      pdfDoc.setFont("helvetica", "normal");
      pdfDoc.setFontSize(8);
      pdfDoc.setTextColor(148, 163, 184); // Slate 400
      pdfDoc.text("Material Oficial de Apoio Didático • Proibido compartilhamento ou reprodução", 15, 281);
      pdfDoc.setFont("helvetica", "bold");
      pdfDoc.text(`PÁGINA ${i} DE ${pageCount}`, 195, 281, { align: "right" });
    }
  };

  const handleDownloadRevisionPdf = (topicId: number) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    const doc = new jsPDF();
    
    // Header band with brand color
    doc.setFillColor(14, 165, 233); // Nexus Academy blue
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("NEXUS ACADEMY", 15, 20);
    
    doc.setFontSize(10);
    doc.text("GUIA DE REVISÃO CLÍNICA DE ALTO RENDIMENTO - ASE 8", 15, 28);
    
    // Topic Title Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(15, 48, 180, 22, 3, 3, "DF");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // slate 900
    doc.text(`TÓPICO: ${topic.title.toUpperCase()}`, 20, 58);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // slate 500
    doc.text("Material de Apoio Acadêmico para Residência Médica", 20, 64);

    let y = 80;

    // Core content based on Topic ID
    if (topicId === 1) {
      // Extensive "Trabalho de Parto" clinical guide
      const sectionsData = [
        {
          title: "1. Introdução e Sinais do Corpo",
          text: "Como o corpo reconhece o momento fisiológico de iniciar o parto? Durante semanas, o útero mantém-se quiescente sob a influência de níveis elevados de progesterona, que evitam contrações mecânicas intensas. No entanto, no término da gravidez, uma cascata de sinais neuro-hormonais é desatada. A cabeça fetal encaixa na sínfise púbica gerando pressão tátil na bacia. Ocorre a eliminação do tampão mucoso, que é a saída de um muco cervical espesso, por vezes com estrias de sangue, denunciando as primeiras modificações microscópicas no colo. As contrações de Braxton-Hicks intensificam-se de modo irregular, configurando os pródromos do parto."
        },
        {
          title: "2. Pródromos vs Trabalho de Parto Verdadeiro",
          text: "Falsa Fase de Trabalho (Pródromos):\n• Ritmo irregular: as contrações ocorrem aleatoriamente e não ficam mais próximas no tempo.\n• Intensidade constante: a força da contração não acelera nem se intensifica.\n• Sem modificações cervicais: o colo uterino permanece espesso, fechado e posteriorizado.\n• Alívio com repouso: as dores atenuam com relaxamento muscular ou banho morno.\n\nTrabalho de Parto Verdadeiro:\n• Ritmo coordenado: mínimo de 2 a 3 contrações rítmicas a cada 10 minutos.\n• Padrão ascendente: a frequência cresce e as dores tornam-se progressivamente mais longas.\n• Modificações do colo: dilatação dinâmica cervical progressiva acompanhada de apagamento.\n• Motor persistente: as contrações continuam a progredir independentemente do repouso."
        },
        {
          title: "3. O Grande Protagonista – Colo do Útero",
          text: "Para dar passagem ao feto, o colo do útero precisa sofrer três alterações mecânicas contínuas:\n• Amolecimento (amaciamento): a matriz rica em colágeno sofre hidratação enzimática por ação local de prostaglandinas, tornando-se maleável e elástica.\n• Apagamento (esvaecimento): o comprimento cilíndrico do canal cervical retrai e afina-se até se reduzir a uma borda delgada homogênea.\n• Dilatação: abertura circular centrífuga progressiva até atingir o limite mecânico de 10 cm de diâmetro."
        },
        {
          title: "4. Guerra Hormonal — Ativação e Regulação",
          text: "A regulação neuroendócrina é conduzida por quatro eixos funcionais vitais:\n• Ocitocina (A Rainha do Parto): produzida pelo hipotálamo e liberada pela neuro-hipófise, acopla-se a receptores miometrais específicos para deflagrar contrações uterinas potentes. Desempenha papel vital no pós-parto comprimindo leitos vasculares.\n• Prostaglandinas: sintetizadas localmente nas membranas deciduais, promovem a maturação (apagamento e amaciamento) mecânica cervical.\n• Estrogênio: sensibiliza o útero ao estimular o aparecimento de novas gap junctions celulares e receptores de ocitocina.\n• Progesterona: atua como freio inibitório gestacional; sua queda acentua a excitabilidade miometral."
        },
        {
          title: "5. As Fases Clínicas do Trabalho de Parto",
          text: "• Período de Dilatação (1ª Fase): divide-se em subfase latente (dilatação gradual, contrações moderadas, vai até 5-6 cm) e subfase ativa (aceleração geométrica de dilatação acompanhada de comportamento altamente focado de parto).\n• Período Expulsivo (2ª Fase): inicia-se com a dilatação cervical completa (10 cm) e encerra-se com o desprendimento do feto. Caracterizado por reflexo de puxo involuntário materno gerado pelo estiramento mecânico perineal."
        },
        {
          title: "6. Mecanismos do Parto (Os Movimentos Cardinais)",
          text: "O feto realiza giros anatômicos obrigatórios na bacia para ajustar seus diâmetros cefálicos aos diâmetros ósseos maternos:\n1. Insinuação: passagem do maior diâmetro do polo cefálico pelo estreito superior.\n2. Descida: progressão vaginal descendente contínua.\n3. Flexão: o queixo apoia-se contra o esterno, reduzindo o diâmetro de apresentação.\n4. Rotação Interna: rotação da nuca sob a sínfise púbica.\n5. Extensão (Deflexão): desprendimento mecânico da cabeça em movimento de dobradiça.\n6. Rotação Externa: giro da cabeça fora do períneo para restabelecer o alinhamento com os ombros.\n7. Expulsão: ejeção sequencial dos ombros e corpo fetal."
        },
        {
          title: "7. Período de Dequitação (3ª Fase)",
          text: "Inicia-se após o nascimento do feto e perdura até a expulsão completa da placenta e membranas deciduais, durando de 10 a 30 minutos. A maior complicação deste intervalo é a Hemorragia Pós-Parto (HPP) devido à atonia uterina (quando o miométrio falha em contrair e selar os vasos rompidos). Por isso, a OMS recomenda a administração intramuscular de 10 UI de Ocitocina a todas as gestantes imediatamente após a saída fetal como conduta preventiva."
        },
        {
          title: "8. Fisiopatologia e Evolução da Dor",
          text: "• Dor Visceral (Contração e Dilatação Inicial): oriunda dos dermátomos correspondentes às raízes nervosas T10 a L1. É desencadeada pela isquemia miometral cíclica e pelo estiramento do canal cervical. Caráter difuso, vago e mal localizado.\n• Dor Somática (Fase Final e Expulsivo): mediada pelo nervo pudendo através de raízes S2 a S4. É desencadeada pelo estiramento violento dos tecidos moles do períneo, vagina e vulva. Caráter agudo, lancinante e perfeitamente localizado."
        },
        {
          title: "9. O Partograma — O GPS Clínico do Partógrafo",
          text: "Gráfego clínico obrigatório para fiscalizar preventivamente o progresso de dilatação e descida em relação ao tempo. Ajuda na identificação de distócias críticas:\n• Fase Ativa Prolongada: dilatação cervical persistente mas excessivamente lenta (< 1 cm por hora).\n• Parada Secundária da Dilatação: cessação da dilatação cervical por 2 horas ou mais em duas aferições consecutivas (indica risco grave de desproporção céfalo-pélvica - DCP).\n• Parto Taquitócito: nascimento precipitado ocorrendo em menos de 4 horas."
        },
        {
          title: "10. Core Summary Clínico",
          text: "Para o êxito das avaliações académicas e prática hospitalar:\n• Verdadeiro trabalho de parto exige contrações rítmicas e dilatação ativa progressiva.\n• Atonia uterina pós-parto é a principal causa evitável de morte materna, resolvida profilaticamente com ocitocina profilática imediata.\n• Diagnóstico diferencial de parada da dilatação em partograma exige descartar causas obstrutivas mecânicas (DCP) antes de intervir."
        }
      ];

      sectionsData.forEach((sec) => {
        const titleText = sec.title;
        const bodyText = sec.text;
        
        const splitBody = doc.splitTextToSize(bodyText, 180);
        const estimatedHeight = 6 + splitBody.length * 5 + 6;

        if (y + estimatedHeight > 265) {
          doc.addPage();
          y = 25;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(14, 165, 233); // brand color
        doc.text(titleText, 15, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        doc.text(splitBody, 15, y);
        y += splitBody.length * 5 + 6;
      });

    } else {
      // Standard High-yield Topic guide
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(14, 165, 233);
      doc.text("1. RESUMO CLÍNICO DA REVISÃO EXPRESSA", 15, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const splitSummary = doc.splitTextToSize(topic.summary, 180);
      doc.text(splitSummary, 15, y);
      y += splitSummary.length * 5 + 12;

      // Insight box
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(14, 165, 233);
      doc.text("2. INSIGHT DE ALTO RENDIMENTO DO ESPECIALISTA", 15, y);
      y += 6;

      doc.setFillColor(240, 253, 244); // light green bg
      doc.setDrawColor(74, 222, 128); // green border
      
      const splitInsight = doc.splitTextToSize(topic.insight, 170);
      const boxHeight = splitInsight.length * 5 + 8;
      
      doc.roundedRect(15, y, 180, boxHeight, 2, 2, "DF");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(21, 128, 61); // dark green text
      doc.text(splitInsight, 20, y + 6);
      y += boxHeight + 12;

      // Add pedagogical supplementary pillars specifically written for each topic
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("3. PILARES DIAGNÓSTICOS E CONDUTAS CHAVE para PROVA", 15, y);
      y += 6;

      const getTopicPillars = (id: number) => {
        switch(id) {
          case 2:
            return [
              "Fisiologia da Transição: Na transição cardiorrespiratória fetal imediata, ocorre esvaziamento pulmonar mecânico parcial de fluidos e súbito decréscimo da resistência vascular arterial intrapulmonar.",
              "Algoritmo de Reanimação SBP: Voltado para recém-nascidos flácidos ou com esforço respiratório inadequado na recepção. O primeiro minuto é crucial (Minuto de Ouro) para decolar a Ventilação com Pressão Positiva (VPP).",
              "Critérios de Massagem e Adrenalina: Massagem só é indicada se FC < 60 bpm após VPP totalmente coordenada com oxigênio monitorado. A relação de massagem torácica é de de 3 compressões para 1 ventilação."
            ];
          case 3:
            return [
              "Metabolismo Bilirrubínico: A bilirrubina indireta lipossolúvel circula ligada covalentemente à albumina plasmática. Sua deposição de alto risco nos gânglios da base causa encefalopatia crônica irreversível (Kernicterus).",
              "Diagnóstico da Incompatibilidade ABO/Rh: Investigação através de hemograma, reticulócitos e Coombs direto precoce. Mães tipo O e bebês tipo A ou B frequentemente representam reações hemolíticas ABO discretas.",
              "Fototerapia de Eficiência: Age propiciando fotoisomerização da bilirrubina circulante em moléculas polares hidrossolúveis (lumirrubina) eliminadas sem passagem de conjugação hepática."
            ];
          case 4:
            return [
              "Teste do Pezinho Completo: Recomenda-se realizar o rastreamento entre o 3º e 5º dia de vida para afastar falsos diagnósticos. Identifica hipotireoidismo congênito, fenilcetonúria, hemoglobinopatias e fibrose cística.",
              "Teste do Coraçãozinho Crítico: Medido no MSD e MI com intervalo entre 24-48 horas. Se alterado (SatO2 < 95% ou disparidade ≥ 3% no controle), repetir em 1 hora. Mantendo alteração, pedir ecocardiograma prioritário.",
              "Triagem Sensorial Primária: Teste do Olhinho (Reflexo Vermelho nos primeiros dias de alta) e Teste da Orelhinha (Emissões Otoacústicas Evocadas) para rastreio ativo de surdez congênita."
            ];
          case 5:
            return [
              "Imunoglobulinas Secretoria: O colostro produzido nos primeiros 3 a 5 dias pós-parto destaca-se por altíssimas taxas de IgA Secretora (IgAs), agindo de forma local imunoprotetora no intestino.",
              "Mecânica da Apojadura: Corresponde à descida do volume de leite, dependente da queda brusca dos hormônios placentários. Inicialmente independente de reflexo tátil do bebê.",
              "Prevenção e Tratamento de Mastite: Mastite não exige interrupção do aleitamento, exceto em raras incisões aréolo-mamárias. O esvaziamento regular ativo da mama é a maior arma terapêutica."
            ];
          case 6:
            return [
              "Sinais Clássicos de Barlow e Ortolani: Ortolani atua reduzindo o quadril feto-luxado por meio de movimento rotatório abdutor. Barlow introduz adução mecânica para testar luxabilidade.",
              "Músculo Esternocleidomastoideo na Infância: O torcicolo congênito cursa com retração e fibrose que resultam no aparecimento de nódulo em oliva palpável e indolor.",
              "Uso Recomendado de Pavlik Harness: Em diagnósticos confirmados de DDQ por ultrassom de quadril precoce, o arnês ortopédico de Pavlik mantém o fórnice centrado."
            ];
          case 7:
            return [
              "Teoria Construtivista Piagetiana: O período sensório-motor é marcado pela experimentação mecânica. O desenvolvimento da permanência de objeto ensina que coisas continuam a existir fisicamente no espaço.",
              "Marcos de Puericultura aos 6 Meses: Rolagem ativa nos dois sentidos, controle cervical firme e sustentado, e preensão voluntária coordenada de móbiles.",
              "Reflexos Arcaicos Persistentes: A persistência do assustador Reflexo de Moro ou Tônico-Assimétrico além dos 6 meses levanta suspeitas graves de lesão neuromotora."
            ];
          case 8:
            return [
              "Iniciação de Estágios Puberais: Telarca (Tanner M2) marca início das raparigas e aumento de volume gonadal testicular maior que 4mL (Tanner G2) marca o início biológico dos rapazes.",
              "Dimorfismo de Estirão: Meninas vivenciam o pico de crescimento acelerado bem no início dos sinais M2-M3. Meninos crescem tardiamente no estágio G4 de Tanner.",
              "Impacto da Menarca: A primeira menstruação reflete a terminalidade cíclica do estirão, limitando o crescimento residual futuro das meninas a poucos centímetros."
            ];
          case 9:
            return [
              "Proteção de Sigilo do Menor: O adolescent tem o direito legal de consulta independente dos pais para ISTs e métodos anticoncepcionais se demonstrar discernimento mental.",
              "Quebra Ética de Confidência: O sigilo do médico com o menor extingue-se se houver risco grave e de vida para o paciente, sinais de violência sexual ativa ou negligência familiar manifesta.",
              "Manejo Epidemiológico de Parceiros: A conduta de IST na adolescência exige identificação de contatos de risco de forma empática, confidencial e integrada."
            ];
          default:
            return [];
        }
      };

      const pillars = getTopicPillars(topicId);
      pillars.forEach((pil, pIdx) => {
        if (y + 25 > 270) {
          doc.addPage();
          y = 25;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`${String.fromCharCode(97 + pIdx)}) Pillar de Fixação Acadêmica:`, 15, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        const splitPil = doc.splitTextToSize(pil, 180);
        doc.text(splitPil, 15, y);
        y += splitPil.length * 4.5 + 4;
      });
    }

    applyProfessionalTemplate(doc, topic.title);
    doc.save(`Nexus_Resumo_Topico_${topicId}.pdf`);
  };

  const handleDownloadQuestionsPdf = (topicId: number) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    const topicQuestions = QUESTIONS.filter(q => q.topicId === topicId);
    if (topicQuestions.length === 0) return;

    const doc = new jsPDF();
    
    // Header banner
    doc.setFillColor(15, 23, 42); // slate 900 for questions
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("NEXUS ACADEMY", 15, 20);
    
    doc.setFontSize(10);
    doc.text("CADERNO DE QUESTÕES CLÍNICAS DE ALTÍSSIMO RENDIMENTO - ASE 8", 15, 28);
    
    // Title Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(15, 48, 180, 22, 3, 3, "DF");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(`TÓPICO: ${topic.title.toUpperCase()}`, 20, 58);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Total de Questões Selecionadas: ${topicQuestions.length} questões com gabarito comentado`, 20, 64);

    let y = 80;

    topicQuestions.forEach((q, idx) => {
      // Question header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);

      const headerText = `QUESTÃO ${idx + 1} • ${q.temaPrincipal.toUpperCase()} (${q.nivelDificuldade.toUpperCase()})`;
      const splitEnunciado = doc.splitTextToSize(q.enunciado, 180);
      
      // Calculate height needed for question + options
      let needed = 12 + splitEnunciado.length * 5 + 6;
      q.alternativas.forEach(alt => {
        const splitAlt = doc.splitTextToSize(`( ) ${alt}`, 175);
        needed += splitAlt.length * 4.5 + 2;
      });

      if (y + needed > 265) {
        doc.addPage();
        y = 30;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(14, 165, 233);
      doc.text(headerText, 15, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(splitEnunciado, 15, y);
      y += splitEnunciado.length * 5 + 4;

      // Alternatives
      q.alternativas.forEach((alt, altIdx) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        
        const letter = String.fromCharCode(65 + altIdx);
        const splitAlt = doc.splitTextToSize(`(${letter})  ${alt}`, 175);
        doc.text(splitAlt, 18, y);
        y += splitAlt.length * 4.5 + 2;
      });

      y += 8; // margin between questions
    });

    // Add page break for Explanatory Key/Comments
    doc.addPage();
    y = 30;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(15, y, 180, 18, 2, 2, "DF");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(14, 165, 233);
    doc.text("GABARITO COMENTADO OFICIAL DO ESPECIALISTA", 20, y + 11);
    
    y += 26;

    topicQuestions.forEach((q, idx) => {
      const correctLetter = String.fromCharCode(65 + q.gabarito);
      const gabaritoText = `GABARITO COMENTADO DA QUESTÃO ${idx + 1}: ALTERNATIVA [ ${correctLetter} ]`;
      const splitComment = doc.splitTextToSize(q.comentario, 180);

      const commentHeight = 10 + splitComment.length * 5 + 8;
      
      if (y + commentHeight > 265) {
        doc.addPage();
        y = 30;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(gabaritoText, 15, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(splitComment, 15, y);
      y += splitComment.length * 5 + 10;
    });

    // Apply template
    applyProfessionalTemplate(doc, `Caderno de Questões: ${topic.title}`);
    
    // Save
    doc.save(`Nexus_Questoes_Comentadas_Topico_${topicId}.pdf`);
  };

  const handlePdfExport = () => {
    const doc = new jsPDF();
    
    doc.setFillColor(14, 165, 233); // brand color
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("NEXUS ACADEMY", 15, 20);
    
    doc.setFontSize(10);
    doc.text("Caderno de Questões Auto-Gerado: ASE 8 - QBank tradicional", 15, 28);
    
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(15, 48, 180, 22, 3, 3, "DF");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("CADERNO PERSONALIZADO REVISONAL", 20, 58);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Total de Questões Selecionadas: ${filteredQBankQuestions.length} filtradas pelo painel de estudos`, 20, 64);

    let yOffset = 85;
    filteredQBankQuestions.forEach((q, idx) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(14, 165, 233);
      
      const title = `${idx + 1}. [${q.temaPrincipal} / ${q.topicoEspecifico}] (${q.nivelDificuldade})`;
      const splitText = doc.splitTextToSize(q.enunciado, 180);
      
      let needed = 12 + splitText.length * 5 + 6;
      q.alternativas.forEach(alt => {
        const splitAlt = doc.splitTextToSize(`( ) ${alt}`, 175);
        needed += splitAlt.length * 4.5 + 2;
      });

      if (yOffset + needed > 265) {
        doc.addPage();
        yOffset = 30;
      }

      doc.text(title, 15, yOffset);
      yOffset += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(splitText, 15, yOffset);
      yOffset += splitText.length * 5 + 4;

      q.alternativas.forEach((alt, aIdx) => {
        const letter = String.fromCharCode(65 + aIdx);
        const altText = doc.splitTextToSize(`(${letter}) ${alt}`, 175);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text(altText, 18, yOffset);
        yOffset += altText.length * 4.5 + 2;
      });

      yOffset += 6;
    });

    applyProfessionalTemplate(doc, "Caderno Tradicional QBank (ASE 8)");
    doc.save('Nexus_Banco_de_Questoes_ASE_8.pdf');
  };

  return (
    <div id="m8-training-container" className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 py-4 px-3 sm:px-6 relative overflow-hidden">
      
      {/* Floating XP Gain Alert */}
      <AnimatePresence>
        {showXpAnim && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-12 left-1/2 transform -translate-x-1/2 z-[1000] bg-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-emerald-400 font-extrabold"
          >
            <Trophy size={18} className="animate-bounce" />
            <span>+{lastXpGain} XP NEXUS</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <button 
            id="back-button-main"
            onClick={studyMode === 'selection' ? onBack : () => { setStudyMode('selection'); setSelectedTopicId(null); }}
            className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="p-1 px-2 text-xs bg-emerald-500/10 text-emerald-500 rounded font-black">ASE 8</span>
              Nascimento, Crescimento e Desenvolvimento
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider mt-0.5">
              {studyMode === 'selection' && 'Escolha seu ambiente de estudos médico'}
              {studyMode === 'trilha' && 'Trilha guiada com Revisão Teórica Expressa'}
              {studyMode === 'qbank' && 'Banco de questões unificado (EstratégiaMED style)'}
            </p>
          </div>
        </div>

        {studyMode === 'trilha' && (
          <div className="flex items-center gap-3 bg-neutral-905 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2 px-4 shadow-sm">
            <Trophy className="text-yellow-500 sm:w-5 sm:h-5 w-4 h-4" />
            <div className="text-right">
              <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-widest">XP ACUMULADO</span>
              <p className="text-sm sm:text-base font-black text-neutral-950 dark:text-white leading-none">{xp} XP</p>
            </div>
          </div>
        )}
      </div>

      {/* 1. SELECTION SCREEN */}
      {studyMode === 'selection' && (
        <div id="selection-screen-modes" className="max-w-4xl mx-auto py-8 sm:py-12 px-2 animate-in fade-in duration-300">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight uppercase italic">
              Ambiente de Estudos <span className="text-emerald-500">ASE 8</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mt-2 font-medium">
              Acesse a trilha de aprendizado estruturada para fixação continuada ou monte seu caderno personalizado com filtros finos de residência médica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Mode A: Trilha com Revisão */}
            <div 
              id="mode-card-trilha"
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <Brain size={28} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  Questões com Revisão (Aba Trilha)
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                  Siga uma rota linear estruturada em 9 passos. Revise os principais pontos teóricos e práticos de cada tópico e responda a questões conceituais com comentários detalhados dos nossos professores médicos.
                </p>
                
                {/* Micro Steps Indicator */}
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    <span>Progresso nas Trilha</span>
                    <span>{trilhaCompletedTopics.length} / 9 Tópicos</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${(trilhaCompletedTopics.length / 9) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <button 
                id="btn-start-trilha"
                onClick={() => setStudyMode('trilha')}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Play size={14} fill="currentColor" />
                Iniciar Trilha de Revisão
              </button>
            </div>

            {/* Mode B: Apenas Questões */}
            <div 
              id="mode-card-qbank"
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <ListChecks size={28} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  Apenas Questões (Banco tradicional)
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                  Sinta-se no próprio ambiente do EstratégiaMED. Encontre filtros cirúrgicos detalhados por assunto, grau de importância, dificuldade e faça buscas rápidas em tempo real com cronômetro integrado.
                </p>

                {/* Badges preview list */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-[10px] font-black bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full uppercase tracking-wider">Cronômetro ativo</span>
                  <span className="text-[10px] font-black bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full uppercase tracking-wider">Gabarito detalhado</span>
                  <span className="text-[10px] font-black bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full uppercase tracking-wider">Gerador de PDFs</span>
                </div>
              </div>

              <button 
                id="btn-start-qbank"
                onClick={() => { setStudyMode('qbank'); setIsTimerRunning(true); }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Play size={14} fill="currentColor" />
                Abrir Banco de Questões
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. ENVIRONMENT 1: THE TRILHA GAMEPLAY */}
      {studyMode === 'trilha' && selectedTopicId === null && (
        <div id="trilha-map-mode" className="max-w-3xl mx-auto py-6 animate-in fade-in duration-300">
          
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-10 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 skew-x-12 scale-150 transform origin-top-right"></div>
            <div className="relative z-10">
              <span className="bg-white/10 text-white text-xs font-extrabold uppercase py-1 px-3 rounded-full mb-3 inline-block tracking-widest">Progresso Técnico</span>
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase">Minha Trilha de Fixação</h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-lg font-medium leading-relaxed">
                Complete os 9 passos em sequência para consagrar domínio sobre Nascimento, Crescimento e Puericultura Básica. Cada passo contém revisão teórica + 2 questões comentadas.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <p className="text-xs text-emerald-100 hover:underline">Tópicos Concluídos</p>
                    <p className="text-lg font-black">{trilhaCompletedTopics.length} de 9 ({( (trilhaCompletedTopics.length / 9) * 100).toFixed(0)}%)</p>
                  </div>
                </div>
                {trilhaCompletedTopics.length === 9 && (
                  <div className="bg-white text-emerald-600 font-extrabold text-xs uppercase p-3 rounded-2xl shadow-lg flex items-center gap-2 animate-bounce">
                    <Sparkles size={16} />
                    Trilha de Quadril Concluída!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stepper Vertical Map */}
          <div className="space-y-6 relative before:absolute before:left-7 before:top-2 before:bottom-2 before:w-1 before:bg-neutral-200 dark:before:bg-neutral-800 before:-z-10 pl-1">
            {TOPICS.map((topic, index) => {
              const isCompleted = trilhaCompletedTopics.includes(topic.id);
              const isFirstUncompleted = !isCompleted && (index === 0 || trilhaCompletedTopics.includes(TOPICS[index - 1].id));
              const isLocked = !isCompleted && !isFirstUncompleted && index !== 0;

              return (
                <div 
                  key={topic.id}
                  id={`trilha-node-${topic.id}`}
                  className={`flex items-start gap-4 p-5 sm:p-6 bg-white dark:bg-neutral-900 border rounded-3xl shadow-sm transition-all relative ${
                    isCompleted 
                      ? 'border-emerald-500/50 dark:border-emerald-500/30' 
                      : isFirstUncompleted 
                        ? 'border-neutral-300 dark:border-neutral-700 ring-2 ring-emerald-500/30' 
                        : 'border-neutral-200 dark:border-neutral-800 opacity-60'
                  }`}
                >
                  
                  {/* Step bubble icon/number */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm z-10 transition-colors ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : isFirstUncompleted 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500' 
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : topic.id}
                    </div>
                  </div>

                  {/* Topic content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                        {topic.title}
                      </h3>
                      {isCompleted && (
                        <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full tracking-wider">
                          Completo
                        </span>
                      )}
                      {isFirstUncompleted && (
                        <span className="text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                          Ponto Atual
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed line-clamp-3">
                      {topic.summary}
                    </p>

                    {!isLocked ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button 
                          id={`btn-open-topic-${topic.id}`}
                          onClick={() => {
                            setSelectedTopicId(topic.id);
                            setActiveTopicStep('revision');
                            setTopicQuestionIndex(0);
                          }}
                          className={`py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                            isCompleted 
                              ? 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300' 
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/10'
                          }`}
                        >
                          {isCompleted ? 'Revisar Assunto' : 'Iniciar Revisão'}
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 flex items-center gap-1.5 text-neutral-400 dark:text-neutral-600 text-xs font-bold uppercase tracking-wider">
                        <ShieldAlert size={14} />
                        Tópico bloqueado (Requer passo anterior)
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2.1 TRILHA CURRENT ACTIVE TOPIC PLAYING */}
      {studyMode === 'trilha' && selectedTopicId !== null && (
        <div id="trilha-gameplay-panel" className="max-w-3xl mx-auto py-4 animate-in zoom-in-95 duration-300">
          
          {/* Breadcrumb / Section progress header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl sm:rounded-2xl mb-6 shadow-sm">
            <span className="text-xs font-black uppercase text-neutral-500 dark:text-neutral-400 tracking-wider">
              Tópico {selectedTopicId} de 9: <span className="text-emerald-500">{TOPICS.find(t => t.id === selectedTopicId)?.title}</span>
            </span>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              {activeTopicStep === 'revision' ? (
                <button
                  id="btn-download-revision-pdf"
                  onClick={() => handleDownloadRevisionPdf(selectedTopicId)}
                  className="bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white py-1.5 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <Download size={13} />
                  <span>Resumo PDF</span>
                </button>
              ) : (
                <button
                  id="btn-download-questions-pdf"
                  onClick={() => handleDownloadQuestionsPdf(selectedTopicId)}
                  className="bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white py-1.5 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <Download size={13} />
                  <span>Questões PDF</span>
                </button>
              )}
              <button 
                id="btn-close-gameplay"
                onClick={() => setSelectedTopicId(null)}
                className="text-xs font-bold text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 uppercase tracking-widest bg-slate-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg text-[10px]"
              >
                Voltar
              </button>
            </div>
          </div>

          {/* STEP 1: REVISION THEORETICAL SUMMARY */}
          {activeTopicStep === 'revision' && (
            selectedTopicId === 1 ? (
              <TrabalhoPartoParturicao onStartQuestions={() => setActiveTopicStep('questions')} />
            ) : (
              <div id="revision-theory-card" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen size={24} />
                </div>
                
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white mb-4">
                  Revisão Expressa: <span className="text-emerald-500">{TOPICS.find(t => t.id === selectedTopicId)?.title}</span>
                </h2>
                
                <div className="text-neutral-700 dark:text-neutral-300 space-y-4 leading-relaxed text-sm">
                  <p>{TOPICS.find(t => t.id === selectedTopicId)?.summary}</p>
                  
                  <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-4 rounded-r-2xl mt-6">
                    <p className="text-xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400 tracking-widest mb-1">
                      Insigth de Alto Rendimento
                    </p>
                    <p className="text-xs font-semibold italic text-neutral-600 dark:text-neutral-300">
                      {TOPICS.find(t => t.id === selectedTopicId)?.insight}
                    </p>
                  </div>
                </div>

                <div className="mt-10 border-t border-neutral-200 dark:border-neutral-800 pt-6 flex justify-end">
                  <button 
                    id="btn-go-to-questions"
                    onClick={() => setActiveTopicStep('questions')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-8 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-emerald-500/15"
                  >
                    Ir para Questões de Fixação
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )
          )}

          {/* STEP 2: ACTIVE REVISION QUESTIONS */}
          {activeTopicStep === 'questions' && activeTopicQuestions[topicQuestionIndex] && (
            <div id="revision-questions-card" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl animate-in slide-in-from-right duration-300">
              
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
                    Questão {topicQuestionIndex + 1} de {activeTopicQuestions.length}
                  </span>
                  <span className="text-xs font-extrabold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-2 py-1 rounded">
                    {activeTopicQuestions[topicQuestionIndex].nivelDificuldade}
                  </span>
                </div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                  Importância: <span className="text-emerald-500 font-extrabold">{activeTopicQuestions[topicQuestionIndex].grauImportancia}</span>
                </div>
              </div>

              {/* Enunciado */}
              <p className="text-sm sm:text-base text-neutral-900 dark:text-white font-medium leading-relaxed mb-8">
                {activeTopicQuestions[topicQuestionIndex].enunciado}
              </p>

              {/* alternativas */}
              <div className="space-y-3 mb-8">
                {activeTopicQuestions[topicQuestionIndex].alternativas.map((alt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const qid = activeTopicQuestions[topicQuestionIndex].id;
                  const isAnswered = trilhaRevealed[qid];
                  const isSelected = trilhaAnswers[qid] === idx;
                  const isCorrect = idx === activeTopicQuestions[topicQuestionIndex].gabarito;

                  return (
                    <button 
                      key={idx}
                      id={`alt-${qid}-${idx}`}
                      disabled={isAnswered}
                      onClick={() => handleTrilhaAnswer(qid, idx, activeTopicQuestions[topicQuestionIndex].gabarito)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex gap-3 items-start ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                            : isSelected
                              ? 'bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-300 ring-1 ring-rose-500'
                              : 'bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-400'
                          : 'bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 active:scale-[0.99]'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 border uppercase ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : isSelected
                              ? 'bg-rose-500 border-rose-500 text-white'
                              : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-400'
                          : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:border-emerald-500'
                      }`}>
                        {letter}
                      </span>
                      <span>{alt}</span>
                    </button>
                  );
                })}
              </div>

              {/* feedback comments */}
              {trilhaRevealed[activeTopicQuestions[topicQuestionIndex].id] && (
                <div className="bg-slate-50 dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-bottom-6 duration-300 mb-8 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1 px-2.5 text-[10px] uppercase font-black tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      Gabarito Comentado
                    </span>
                    <span className="text-neutral-400 font-bold">
                      Alternativa Correta: {String.fromCharCode(65 + activeTopicQuestions[topicQuestionIndex].gabarito)}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
                    {activeTopicQuestions[topicQuestionIndex].comentario}
                  </p>
                </div>
              )}

              {/* Next Control */}
              {trilhaRevealed[activeTopicQuestions[topicQuestionIndex].id] && (
                <div className="flex justify-end border-t border-slate-100 dark:border-neutral-800 pt-6">
                  <button 
                    id="btn-next-trilha-step"
                    onClick={handleNextTrilha}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-8 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2"
                  >
                    {topicQuestionIndex + 1 < activeTopicQuestions.length ? 'Próxima Questão' : 'Concluir Tópico'}
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* 3. ENVIRONMENT 2: QBANK PANEL (EstrategiaMED Style) */}
      {studyMode === 'qbank' && (
        <div id="qbank-traditional-panel" className="max-w-7xl mx-auto py-2 animate-in fade-in duration-350">
          
          {/* Simulated Mode Info & Stopwatch */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-3xl mb-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 p-2 px-4 rounded-2xl">
                <Clock className="text-blue-500" size={18} />
                <div>
                  <span className="block text-[8px] text-neutral-400 font-bold uppercase tracking-widest">cronômetro</span>
                  <span className="text-sm font-black font-mono">
                    {Math.floor(seconds / 60).toString().padStart(2, '0')}:{(seconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <button 
                  id="btn-toggle-timer"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="ml-2 text-[10px] font-black uppercase tracking-wider text-neutral-400 hover:text-blue-500"
                >
                  {isTimerRunning ? 'Pausar' : 'Iniciar'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Modo Prova Ativo</span>
              </div>
            </div>

            {/* Stats Summary Counter */}
            <div className="flex items-center gap-6 justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
              <div className="text-center">
                <span className="block text-[8px] text-neutral-400 font-bold tracking-widest uppercase">resolvidas</span>
                <span className="text-sm font-black">{qbankStats.resolved}</span>
              </div>
              <div className="text-center">
                <span className="block text-[8px] text-emerald-500 font-bold tracking-widest uppercase">acertos</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{qbankStats.correct}</span>
              </div>
              <div className="text-center">
                <span className="block text-[8px] text-rose-500 font-bold tracking-widest uppercase">erros</span>
                <span className="text-sm font-black text-rose-600 dark:text-rose-400">{qbankStats.incorrect}</span>
              </div>
              <div className="text-center bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-xl">
                <span className="block text-[8px] font-black tracking-widest uppercase">% Acertos</span>
                <span className="text-xs font-black">
                  {qbankStats.resolved > 0 ? `${((qbankStats.correct / qbankStats.resolved) * 100).toFixed(0)}%` : '0%'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Filter Sidebar Left (Column 4 of 12) */}
            <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-neutral-800">
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                  <Filter size={14} className="text-blue-500" />
                  Painel de Filtros
                </h3>
                <button 
                  id="btn-reset-filters"
                  onClick={resetQbank}
                  className="text-[10px] font-black text-neutral-400 hover:text-rose-500 uppercase tracking-widest flex items-center gap-1"
                >
                  <RefreshCw size={10} />
                  Limpar estatísticas
                </button>
              </div>

              {/* Text Search Box */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-2">Busca textual</label>
                <input 
                  id="filter-search-query"
                  type="text" 
                  placeholder="Buscar termos no enunciado..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs p-3.5 bg-slate-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-neutral-200"
                />
              </div>

              {/* Filter by Topic ID */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-2">Tópicos Clínicos</label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {TOPICS.map(topic => {
                    const isSelected = qbankFilters.topics.includes(topic.id);
                    return (
                      <button 
                        key={topic.id}
                        id={`filter-topic-${topic.id}`}
                        onClick={() => {
                          setQbankFilters(prev => {
                            const found = prev.topics.includes(topic.id);
                            const next = found ? prev.topics.filter(id => id !== topic.id) : [...prev.topics, topic.id];
                            return { ...prev, topics: next };
                          });
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex justify-between items-center ${
                          isSelected 
                            ? 'bg-blue-500/10 border border-blue-500 text-blue-800 dark:text-blue-300' 
                            : 'bg-neutral-50 dark:bg-neutral-950 border border-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <span className="truncate pr-1">{topic.id}. {topic.title}</span>
                        {isSelected && <Check size={12} className="stroke-[3] flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter by Difficulty */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-2">Grau de Dificuldade</label>
                <div className="flex gap-1.5">
                  {['🟢 Fácil', '🟡 Médio', '🔴 Difícil'].map(diff => {
                    const isSelected = qbankFilters.difficulties.includes(diff);
                    return (
                      <button 
                        key={diff}
                        id={`filter-diff-${diff}`}
                        onClick={() => {
                          setQbankFilters(prev => {
                            const found = prev.difficulties.includes(diff);
                            const next = found ? prev.difficulties.filter(d => d !== diff) : [...prev.difficulties, diff];
                            return { ...prev, difficulties: next };
                          });
                        }}
                        className={`flex-1 p-2 rounded-xl text-[10px] font-bold text-center border transition-all ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500 text-white shadow-sm' 
                            : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
                        }`}
                      >
                        {diff.split(' ')[1]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter by Importance */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-2 font-mono">Grau de Importância</label>
                <div className="flex gap-1.5">
                  {['Muito Alto', 'Alto', 'Médio'].map(imp => {
                    const isSelected = qbankFilters.importances.includes(imp);
                    return (
                      <button 
                        key={imp}
                        id={`filter-imp-${imp}`}
                        onClick={() => {
                          setQbankFilters(prev => {
                            const found = prev.importances.includes(imp);
                            const next = found ? prev.importances.filter(i => i !== imp) : [...prev.importances, imp];
                            return { ...prev, importances: next };
                          });
                        }}
                        className={`flex-1 p-2 rounded-xl text-[10px] font-bold text-center border transition-all ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500 text-white shadow-sm' 
                            : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
                        }`}
                      >
                        {imp}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions Box */}
              <div className="pt-2">
                <button 
                  id="btn-export-caderno-pdf"
                  disabled={filteredQBankQuestions.length === 0}
                  onClick={handlePdfExport}
                  className="w-full bg-slate-900 dark:bg-neutral-950 hover:bg-slate-800 dark:hover:bg-neutral-800 text-white py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 border border-neutral-800"
                >
                  <Download size={14} />
                  Exportar Caderno (PDF)
                </button>
              </div>

            </div>

            {/* Questions Feed right (Column 8 of 12) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex justify-between items-center px-2">
                <span className="text-xs font-black uppercase text-neutral-400 tracking-widest">
                  Caderno Técnico: {filteredQBankQuestions.length} questões encontradas
                </span>
              </div>

              {filteredQBankQuestions.length === 0 ? (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-12 text-center shadow-sm">
                  <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">ℹ️</div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-tighter">Nenhuma questão coincide</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
                    Ajuste os filtros de assunto, relevância ou limpe a busca textual para carregar as questões de residência.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredQBankQuestions.map((q, qIndex) => {
                    const isAnswered = qbankRevealed[q.id];
                    const chosenIdx = qbankAnswers[q.id];
                    const isCorrectChoice = chosenIdx === q.gabarito;

                    return (
                      <div 
                        key={q.id}
                        id={`qbank-card-${q.id}`}
                        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-md space-y-5 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700"
                      >
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-neutral-800 pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md uppercase tracking-wider">
                              Questão {qIndex + 1}
                            </span>
                            <span className="text-[10px] font-extrabold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded">
                              {q.nivelDificuldade}
                            </span>
                            <span className="text-[9px] font-black text-neutral-400 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded uppercase">
                              Tópico {q.topicId}
                            </span>
                          </div>
                          
                          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            Importância: <span className="text-red-500 font-extrabold">{q.grauImportancia}</span>
                          </div>
                        </div>

                        {/* Question Text */}
                        <p className="text-sm sm:text-base text-neutral-900 dark:text-white leading-relaxed font-semibold">
                          {q.enunciado}
                        </p>

                        {/* alternativas list */}
                        <div className="space-y-2.5">
                          {q.alternativas.map((alt, altIdx) => {
                            const letter = String.fromCharCode(65 + altIdx);
                            const isThisCorrect = altIdx === q.gabarito;
                            const isChosenByMe = chosenIdx === altIdx;

                            return (
                              <button
                                key={altIdx}
                                id={`qbank-alt-${q.id}-${altIdx}`}
                                disabled={isAnswered}
                                onClick={() => handleQbankAnswerSubmit(q.id, altIdx, q.gabarito)}
                                className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex gap-3 items-start ${
                                  isAnswered
                                    ? isThisCorrect
                                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                                      : isChosenByMe
                                        ? 'bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-300'
                                        : 'bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-400'
                                    : 'bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded font-black text-[10px] flex items-center justify-center shrink-0 border uppercase ${
                                  isAnswered
                                    ? isThisCorrect
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : isChosenByMe
                                        ? 'bg-rose-500 border-rose-500 text-white'
                                        : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-400'
                                    : 'bg-white dark:bg-neutral-800 border-neutral-300 text-neutral-500'
                                }`}>
                                  {letter}
                                </span>
                                <span>{alt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Commentary */}
                        {isAnswered && (
                          <div className="bg-slate-50 dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-bottom duration-300 text-xs sm:text-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 p-1 px-2.5 rounded-lg">
                                Comentário do Especialista
                              </span>
                              <span className="text-neutral-400 font-bold ml-1">
                                Alternativa Fiel: {String.fromCharCode(65 + q.gabarito)}
                              </span>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
                              {q.comentario}
                            </p>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
