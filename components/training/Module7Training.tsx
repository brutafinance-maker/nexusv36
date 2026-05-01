
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CTQuestion } from '../../types';
import jsPDF from 'jspdf';
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  BookOpen, 
  Brain, 
  Target, 
  Hash, 
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { P3_QUESTIONS } from './Module7Problema3';
import { P4_QUESTIONS } from './Module7Problema4';
import { P5_QUESTIONS } from './Module7Problema5';
import { P6_QUESTIONS } from './Module7Problema6';

export const TEST_QUESTIONS: CTQuestion[] = [
  {
    id: 'm7-test-1',
    number: 1,
    temaPrincipal: 'Teste',
    topicoEspecifico: 'Teste',
    grauImportancia: 'Teste',
    nivelDificuldade: 'Teste',
    enunciado: 'Esta é uma questão de teste para o Módulo 7. Qual a alternativa correta?',
    alternativas: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
    gabarito: 0
  },
  {
    id: 'm7-test-2',
    number: 2,
    temaPrincipal: 'Teste',
    topicoEspecifico: 'Teste',
    grauImportancia: 'Teste',
    nivelDificuldade: 'Teste',
    enunciado: 'Segunda questão de teste para validar os filtros. Qual a alternativa correta?',
    alternativas: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
    gabarito: 1
  },
  {
    id: 'm7-q1',
    number: 1,
    temaPrincipal: 'Eixo HHG',
    topicoEspecifico: 'Pulsatilidade do GnRH',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'De acordo com o experimento clássico de Knobil (1980), qual é a condição mandatória para que o GnRH estimule a secreção das gonadotrofinas FSH e LH pelos gonadotrofos hipofisários?',
    alternativas: ['Secreção contínua e em altas doses.', 'Secreção pulsátil em intervalos regulares.', 'Presença obrigatória de progesterona em níveis elevados.', 'Inibição total dos neurônios de Kisspeptina.', 'Transporte via circulação sistêmica periférica.'],
    gabarito: 1,
    comentario: `● Por que está certa: O GnRH tem uma meia-vida curtíssima (minutos). Experimentos de Knobil demonstraram que a hipófise apenas responde à estimulação pulsátil.
● Por que as outras estão erradas: A) Secreção contínua causa down-regulation (dessensibilização) dos recetores, bloqueando o eixo (base dos análogos de GnRH). C) Progesterona alta geralmente inibe o eixo. E) O transporte é via sistema porta-hipofisário, não circulação sistêmica.
● Armadilha: Achar que "mais hormona" (contínua) significa "mais estímulo". Na neuroendocrinologia, a frequência é mais importante que a dose.`
  },
  {
    id: 'm7-q2',
    number: 2,
    temaPrincipal: 'Eixo HHG',
    topicoEspecifico: 'Gerador de Pulsos (Neurônios KNDy)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O "pulse generator" do GnRH localiza-se no Núcleo Arqueado (ARC) e é composto pelos neurônios KNDy. Qual das seguintes interações moleculares é responsável pelo término de um pulso de GnRH nesse sistema?',
    alternativas: ['Estímulo da Neurocinina B (NKB) via receptores NK3R.', 'Ativação da Kisspeptina nos neurônios do AVPV.', 'Ação da Dinorfina via receptores opioides KOR nos próprios neurônios KNDy.', 'Feedback positivo do estradiol em altas concentrações.', 'Ligação do GnRH ao seu receptor hipofisário sem cauda C-terminal.'],
    gabarito: 2,
    comentario: `● Por que está certa: Os neurónios KNDy funcionam como um oscilador. A Neurocinina B inicia o pulso e a Dinorfina (um opioide endógeno) termina-o, agindo no recetor KOR para gerar o intervalo entre os pulsos.
● Por que as outras estão erradas: A) NKB estimula. B) Kisspeptina no AVPV media o feedback positivo (pico de LH), não o término do pulso basal. E) O recetor de GnRH humano não tem cauda C-terminal (facto real), mas isso causa uma internalização lenta, não o término do pulso neuronal.
● Conceito: O sistema KNDy é o "maestro" molecular da pulsatilidade.`
  },
  {
    id: 'm7-q3',
    number: 3,
    temaPrincipal: 'Eixo HHG',
    topicoEspecifico: 'Estrutura das Gonadotrofinas',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O FSH, o LH, o TSH e o hCG compartilham uma característica estrutural comum. Assinale a alternativa correta sobre essa semelhança:',
    alternativas: ['Possuem a subunidade beta idêntica, o que confere a especificidade biológica.', 'São proteínas simples sem glicosilação, o que garante meia-vida curta.', 'Possuem a subunidade alfa (α) idêntica, codificada pelo gene CGA.', 'Todas possuem a mesma meia-vida plasmática, variando entre 24 e 36 horas.', 'São secretadas exclusivamente pelo hipotálamo via sistema porta.'],
    gabarito: 2,
    comentario: `● Por que está certa: FSH, LH, TSH e hCG são glicoproteínas diméricas. Todas compartilham a subunidade alfa (α) idêntica.
● Por que as outras estão erradas: A) A subunidade beta (β) é que confere a especificidade. B) São glicosiladas (isso aumenta a meia-vida). D) As meias-vidas variam muito (hCG > 24h, LH ~20min).
● Reforço: É por isso que níveis altíssimos de hCG podem causar hipertiroidismo gestacional (pela semelhança da subunidade alfa e cross-reactivity com o recetor de TSH).`
  },
  {
    id: 'm7-q4',
    number: 4,
    temaPrincipal: 'Eixo HHG',
    topicoEspecifico: 'Receptores de Gonadotrofinas',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Sobre a localização e sinalização dos receptores de gonadotrofinas no testículo, é correto afirmar que:',
    alternativas: ['O receptor de LH (LHCGR) localiza-se exclusivamente nas células de Leydig.', 'O receptor de FSH (FSHR) localiza-se nas células de Leydig e ativa a via da PLC.', 'O FSH age apenas nas células de Sertoli, utilizando a via Gas-AMPc-PKA para induzir a produção de ABP e Inibina B.', 'A testosterona é produzida pelas células de Sertoli sob estímulo direto do FSH.', 'O LHCGR nas células de Leydig inibe a proteína StAR para reduzir a esteroidogênese.'],
    gabarito: 2,
    comentario: `● Por que está certa: O FSH atua exclusivamente nas células de Sertoli (nos túbulos), estimulando a síntese de ABP (Androgen Binding Protein), que mantém a testosterona alta no microambiente tubular.
● Por que as outras estão erradas: A e B) O LH atua nas células de Leydig (interstício). D) Testosterona é produzida na Leydig via LH. E) A proteína StAR é estimulada pelo LH para aumentar a entrada de colesterol na mitocôndria.`
  },
  {
    id: 'm7-q5',
    number: 5,
    temaPrincipal: 'Eixo HHG',
    topicoEspecifico: 'Feedback Positivo do Estradiol',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O pico ovulatório de LH ocorre devido ao feedback positivo do estradiol. Para que esse fenômeno ocorra, quais critérios de concentração e tempo devem ser atingidos pelo estradiol na fase folicular tardia?',
    alternativas: ['> 100 pg/mL por pelo menos 12 horas.', '> 200 pg/mL por mais de 48 horas consecutivas.', 'Queda abrupta de estradiol abaixo de 50 pg/mL por 24 horas.', 'Manutenção de níveis basais de 30 pg/mL durante 14 dias.', 'Pico isolado de 500 pg/mL independente da duração.'],
    gabarito: 1,
    comentario: `● Por que está certa: O feedback positivo é uma exceção biológica. Requer estradiol > 200 pg/mL por um período sustentado (> 48 horas) para converter o sinal inibitório em estimulatório no hipotálamo/hipófise.
● Armadilha: Muitas questões de nível médio não citam o tempo (48h), mas para concursos de alto nível, o critério temporal é obrigatório.`
  },
  {
    id: 'm7-q6',
    number: 6,
    temaPrincipal: 'Eixo HHG',
    topicoEspecifico: 'Síndrome de Kallmann',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Paciente masculino apresenta quadro de hipogonadismo hipogonadotrófico associado à ausência de olfato (anosmia). Com base na embriologia dos neurônios GnRH descrita no material, qual a causa fisiopatológica dessa associação?',
    alternativas: ['Os neurônios GnRH degeneram devido à falta de estímulo olfativo na infância.', 'O GnRH é um hormônio volátil produzido no epitélio olfativo.', 'Falha na migração dos neurônios GnRH da placoda olfativa para o hipotálamo durante o desenvolvimento.', 'Mutação nos receptores de testosterona localizados no bulbo olfativo.', 'Excesso de prolactina que bloqueia a percepção de odores e a pulsatilidade do GnRH.'],
    gabarito: 2,
    comentario: `● Por que está certa: Os neurónios GnRH nascem na placoda olfativa e migram ao longo dos nervos vomeronasais até o hipotálamo. Na Síndrome de Kallmann, essa migração falha, resultando em hipogonadismo e anosmia (falta de olfato).`
  },
  {
    id: 'm7-q7',
    number: 7,
    temaPrincipal: 'Anatomia Masculina',
    topicoEspecifico: 'Termorregulação Testicular',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'Qual estrutura vascular é responsável pelo resfriamento do sangue arterial que chega ao testículo através de um sistema de troca por contracorrente?',
    alternativas: ['Artéria pudenda interna.', 'Veia dorsal profunda do pênis.', 'Plexo pampiniforme.', 'Artéria helicina.', 'Vasos linfáticos do escroto.'],
    gabarito: 2,
    comentario: `● Por que está certa: O plexo pampiniforme é um emaranhado venoso que envolve a artéria testicular. O sangue venoso frio (vindo da periferia do escroto) resfria o sangue arterial quente antes de entrar no testículo.
● Conceito: A espermatogénese requer 2-3°C abaixo da temperatura corporal.`
  },
  {
    id: 'm7-q8',
    number: 8,
    temaPrincipal: 'Anatomia Feminina',
    topicoEspecifico: 'Histologia do Endométrio',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O endométrio é dividido em zona funcional e zona basal. Sobre a zona basal, assinale a alternativa correta:',
    alternativas: ['É a camada que sofre descamação total durante a menstruação.', 'É irrigada pelas arteríolas espiraladas, altamente sensíveis à progesterona.', 'Contém as porções profundas das glândulas e é responsável pela regeneração do endométrio após a fase menstrual.', 'É o local preferencial de implantação do blastocisto.', 'Possui células NK uterinas (uNK) que desaparecem completamente na menopausa.'],
    gabarito: 2,
    comentario: `● Por que está certa: A zona basal não descama. Ela contém as células estaminais e o fundo das glândulas que vão proliferar sob efeito do estrogénio para reconstruir a camada funcional.
● Por que as outras estão erradas: A e B) Referem-se à camada funcional. D) A implantação ocorre na funcional.`
  },
  {
    id: 'm7-q9',
    number: 9,
    temaPrincipal: 'Anatomia Masculina',
    topicoEspecifico: 'Barreira Hematotesticular (BHT)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Barreira Hematotesticular (BHT) é uma estrutura crítica para a proteção das células germinativas haploides. Assinale a alternativa que descreve corretamente sua formação e função:',
    alternativas: ['É formada por junções comunicantes (gap junctions) entre as células de Leydig.', 'É constituída por junções ocludentes (tight junctions) do tipo claudina-11 e ocludina entre células de Sertoli vizinhas.', 'Localiza-se na túnica albugínea, impedindo a entrada de anticorpos no testículo.', 'Divide o epitélio seminífero em compartimento medular e cortical.', 'Sua principal função é impedir a saída de testosterona para a circulação sistêmica.'],
    gabarito: 1,
    comentario: `● Por que está certa: A BHT é formada por Tight Junctions entre células de Sertoli. Isso cria um ambiente imunologicamente privilegiado, impedindo que o sistema imune ataque os espermatozoides (que são "estranhos" por serem haploides).
● Armadilha: Dizer que a barreira é formada por células de Leydig ou que está na túnica albugínea.`
  },
  {
    id: 'm7-q10',
    number: 10,
    temaPrincipal: 'Anatomia Masculina',
    topicoEspecifico: 'Próstata e Zonação de McNeal',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'Qual zona da próstata, segundo a classificação de McNeal, é o sítio de origem da grande maioria (cerca de 75%) dos casos de adenocarcinoma de próstata e é acessível ao toque retal?',
    alternativas: ['Zona de Transição.', 'Zona Central.', 'Zona Periférica.', 'Zona Fibromuscular Anterior.', 'Estroma Periuretral.'],
    gabarito: 2,
    comentario: `● Por que está certa: A Zona Periférica contém a maior parte do tecido glandular e é onde surgem os cancros. A Zona de Transição é onde ocorre a Hiperplasia Benigna da Próstata (HBP).`
  },
  {
    id: 'm7-q11',
    number: 11,
    temaPrincipal: 'Gametogênese Masculina',
    topicoEspecifico: 'Espermatogônias',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Em humanos, as espermatogônias são classificadas em três tipos. Qual delas é considerada a célula-tronco de reserva, sendo resistente a agentes citotóxicos como radioterapia e quimioterapia?',
    alternativas: ['Espermatogônia Tipo A Pálida (Ap).', 'Espermatogônia Tipo B.', 'Espermatogônia Tipo A Escura (Ad).', 'Espermatócito Primário.', 'Gonócito fetal ativo.'],
    gabarito: 2,
    comentario: `● Por que está certa: As Ad (Dark) são as células-tronco quiescentes. As Ap (Pale) são as que entram em divisão ativa para produzir os espermatócitos.`
  },
  {
    id: 'm7-q12',
    number: 12,
    temaPrincipal: 'Gametogênese Masculina',
    topicoEspecifico: 'Meiose I',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Durante a prófase I da meiose masculina, ocorre a inativação do cromossomo sexual (MSCI). Em qual estágio específico da prófase I os cromossomos X e Y formam o "corpo XY" silenciado?',
    alternativas: ['Leptóteno.', 'Zigóteno.', 'Paquíteno.', 'Diplóteno.', 'Diacinese.'],
    gabarito: 2,
    comentario: `● Por que está certa: No Paquíteno, ocorre o crossing-over. Como X e Y são diferentes, eles se condensam num "corpo XY" para evitar recombinações aberrantes e silenciar genes que poderiam interferir na meiose.`
  },
  {
    id: 'm7-q13',
    number: 13,
    temaPrincipal: 'Gametogênese Feminina',
    topicoEspecifico: 'Bloqueios Meióticos',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O ovócito humano passa por dois bloqueios meióticos distintos. Em qual estágio o ovócito permanece bloqueado desde a vida fetal até o momento da retomada meiótica induzida pelo pico de LH na puberdade?',
    alternativas: ['Prófase I (estágio de dictióteno).', 'Metáfase I.', 'Metáfase II.', 'Anáfase II.', 'Telófase I.'],
    gabarito: 0,
    comentario: `● Por que está certa: O primeiro bloqueio é na Prófase I (dictióteno). O segundo bloqueio (ovulação) ocorre na Metáfase II e só termina se houver fecundação.`
  },
  {
    id: 'm7-q14',
    number: 14,
    temaPrincipal: 'Gametogênese Masculina',
    topicoEspecifico: 'Espermiogênese (Fases de Clermont)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A fase de capuz da espermiogênese é caracterizada por qual evento morfológico?',
    alternativas: ['Formação do axonema a partir do centríolo distal.', 'Expansão da vesícula acrossômica sobre os 2/3 anteriores do núcleo.', 'Eliminação do excesso de citoplasma como corpúsculo residual.', 'Divisão meiótica da espermátide redonda em duas células haploides.', 'Migração das mitocôndrias para a peça principal do flagelo.'],
    gabarito: 1,
    comentario: `● Por que está certa: A espermiogênese é metamorfose. Na fase de capuz, o grânulo acrossómico expande-se sobre o núcleo, como um boné.`
  },
  {
    id: 'm7-q15',
    number: 15,
    temaPrincipal: 'Gametogênese Masculina',
    topicoEspecifico: 'Estrutura do Espermatozoide',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O centríolo proximal é uma estrutura do espermatozoide com grande relevância clínica na fertilização. Qual a sua principal função após a fusão dos gametas?',
    alternativas: ['Fornecer energia via fosforilação oxidativa para o zigoto.', 'Participar da formação do primeiro fuso mitótico do embrião.', 'Dissolver a zona pelúcida através de enzimas proteolíticas.', 'Bloquear a entrada de outros espermatozoides (poliespermia).', 'Ativar a retomada da meiose I no ovócito secundário.'],
    gabarito: 1,
    comentario: `● Por que está certa: O ovócito humano não tem centríolo funcional. O centríolo proximal do espermatozoide é o "presente" que organiza o fuso para a primeira divisão do zigoto.
● Armadilha: Achar que as mitocôndrias do espermatozoide entram no zigoto. Elas entram, mas são marcadas com ubiquitina e destruídas; a herança mitocondrial é materna.`
  },
  {
    id: 'm7-q16',
    number: 16,
    temaPrincipal: 'Ciclo Menstrual',
    topicoEspecifico: 'Dinâmica Folicular (Fase Folicular)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O recrutamento folicular ocorre no início da fase folicular devido à "janela de FSH". Como o folículo dominante consegue sobreviver e continuar crescendo enquanto os níveis de FSH declinam na fase folicular média/tardia?',
    alternativas: ['Através da supressão total da aromatase nas células da teca.', 'Por possuir maior densidade de receptores de FSH (FSHR) e indução precoce de receptores de LH (LHCGR) nas células da granulosa.', 'Pela produção massiva de Inibina A, que estimula o FSH hipofisário.', 'Por não depender de estrogênio para a proliferação celular.', 'Devido à redução da vascularização tecal, impedindo a chegada de LH.'],
    gabarito: 1,
    comentario: `● Por que está certa: O folículo dominante é o que tem mais recetores. Mesmo com pouco FSH circulante, ele consegue captar o sinal. Além disso, ele passa a expressar recetores de LH na granulosa, algo que os folículos pequenos não fazem.`
  },
  {
    id: 'm7-q17',
    number: 17,
    temaPrincipal: 'Ciclo Menstrual',
    topicoEspecifico: 'Teoria das Duas Células',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Na esteroidogênese folicular, a produção de estradiol depende da cooperação entre as células da teca e da granulosa. Qual é o papel específico da célula da teca nesse processo?',
    alternativas: ['Converter estradiol em progesterona sob estímulo do FSH.', 'Expressar a aromatase para converter andrógenos em estrogênios.', 'Produzir andrógenos (androstenediona e testosterona) sob estímulo do LH.', 'Secretar o fluido folicular rico em ácido hialurônico.', 'Inibir a síntese de colesterol nas células da granulosa.'],
    gabarito: 2,
    comentario: `● Por que está certa: Teca = LH = Androgénios. Granulosa = FSH = Aromatase = Conversão para Estrogénios. É a cooperação clássica.`
  },
  {
    id: 'm7-q18',
    number: 18,
    temaPrincipal: 'Ciclo Menstrual',
    topicoEspecifico: 'Fase Menstrual (Cascata Molecular)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A queda abrupta de progesterona no final da fase lútea desencadeia a menstruação. Qual o principal mediador lipídico responsável por provocar vasoconstrição intensa nas arteríolas espiraladas e contrações miometriais dolorosas (dismenorreia)?',
    alternativas: ['Prostaciclina (PGI2).', 'Óxido Nítrico (NO).', 'Prostaglandina F2α (PGF2α).', 'Estradiol.', 'Inibina B.'],
    gabarito: 2,
    comentario: `● Por que está certa: A PGF2α é o vilão da menstruação: causa isquemia (vasoconstrição) e dor (contração uterina).`
  },
  {
    id: 'm7-q19',
    number: 19,
    temaPrincipal: 'Ciclo Menstrual',
    topicoEspecifico: 'Janela de Implantação',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A janela de implantação endometrial ocorre geralmente entre os dias 20 e 24 de um ciclo de 28 dias. Qual marcador morfológico apical das células epiteliais é estritamente dependente da progesterona e facilita o contato com o blastocisto?',
    alternativas: ['Cílios vibráteis.', 'Estereocílios.', 'Pinópodes (ou uterodomos).', 'Vacúolos subnucleares de glicogênio.', 'Células NK uterinas.'],
    gabarito: 2,
    comentario: `● Por que está certa: Os pinópodes são projeções que absorvem o fluido uterino, aproximando o blastocisto do endométrio. Surgem apenas na janela de implantação sob efeito da progesterona.`
  },
  {
    id: 'm7-q20',
    number: 20,
    temaPrincipal: 'Ciclo Menstrual',
    topicoEspecifico: 'Fase Secretora (Histologia)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Na fase secretora precoce (dias 16-19), qual é o marco histológico mais precoce e específico da ação progestínica no endométrio?',
    alternativas: ['Glândulas em aspecto de "dente de serra".', 'Surgimento de vacúolos subnucleares de glicogênio nas células epiteliais glandulares.', 'Descamação da camada funcional.', 'Presença de edema estromal maciço e hemorragia.', 'Mitoses abundantes no epitélio de superfície.'],
    gabarito: 1,
    comentario: `● Por que está certa: Os vacúolos subnucleares aparecem no dia 16-17 (logo após a ovulação). É o sinal histológico de que a ovulação ocorreu e a progesterona está agindo.`
  },
  {
    id: 'm7-q21',
    number: 21,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Marcador Biológico (hCG)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'O hormônio gonadotrofina coriônica humana (hCG) é o principal marcador para o diagnóstico laboratorial da gravidez. Sobre sua produção inicial, é correto afirmar que ele é sintetizado por qual estrutura?',
    alternativas: ['Corpo lúteo ovariano.', 'Hipófise anterior da gestante.', 'Sinciciotrofoblasto.', 'Endométrio decidualizado.', 'Citotrofoblasto viloso exclusivamente.'],
    gabarito: 2,
    comentario: `● Por que está certa: O sinciciotrofoblasto é a "fábrica" de hCG. Ele invade o endométrio e lança o hormónio no sangue materno.`
  },
  {
    id: 'm7-q22',
    number: 22,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Cinética do hCG',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Em uma gestação tópica e saudável de início precoce, qual é o tempo médio esperado para que os níveis séricos de beta-hCG dobrem sua concentração (tempo de duplicação)?',
    alternativas: ['A cada 12 a 24 horas.', 'A cada 48 a 72 horas.', 'A cada 7 dias.', 'Uma vez por mês até o segundo trimestre.', 'Apenas após a 12ª semana de gestação.'],
    gabarito: 1,
    comentario: `● Por que está certa: A regra clínica é o dobro a cada 48h. Se não dobrar, suspeita-se de gravidez não evolutiva ou ectópica.`
  },
  {
    id: 'm7-q23',
    number: 23,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Sinais Clínicos (Sinais de Probabilidade)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Durante o exame físico de uma paciente com suspeita de gestação, o médico observa o amolecimento da região do istmo uterino ao toque bimanual. Este achado clínico é conhecido como:',
    alternativas: ['Sinal de Chadwick.', 'Sinal de Goodell.', 'Sinal de Hegar.', 'Sinal de Puzos.', 'Sinal de Hunter.'],
    gabarito: 2,
    comentario: `● Por que está certa: Hegar = istmo mole. Goodell = colo mole. Chadwick = cor azulada da vagina.`
  },
  {
    id: 'm7-q24',
    number: 24,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Ultrassonografia Obstétrica',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Na ultrassonografia transvaginal, a presença de uma estrutura anecoica intrauterina com halo hiperecogênico (sinal do duplo anel decidual) é compatível com o saco gestacional. Qual é o nível de "zona discriminatória" de beta-hCG sérico (UI/L) a partir do qual se espera obrigatoriamente a visualização do saco gestacional via transvaginal?',
    alternativas: ['50 a 100 UI/L.', '500 a 800 UI/L.', '1.500 a 2.000 UI/L.', '5.000 a 10.000 UI/L.', 'Acima de 20.000 UI/L.'],
    gabarito: 2,
    comentario: `● Por que está certa: Valor de corte clássico de 1.500 a 2.000 UI/L. Abaixo disso, o saco pode ser pequeno demais para a resolução do aparelho.`
  },
  {
    id: 'm7-q25',
    number: 25,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Sinais de Certeza (Positivos)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'Dentre os sinais e sintomas de gravidez, quais são considerados sinais de certeza (positivos), que confirmam o diagnóstico sem necessidade de exames laboratoriais se presentes?',
    alternativas: ['Atraso menstrual e náuseas matinais.', 'Aumento do volume abdominal e sinal de Nobis-Hofstätter.', 'Percepção de movimentos fetais pelo examinador e ausculta dos batimentos cardiofetais (BCF).', 'Cloasma gravídico e linha nigra.', 'Teste urinário positivo e polaciúria.'],
    gabarito: 2,
    comentario: `● Por que está certa: Sinais de certeza são aqueles onde o examinador "vê ou ouve" o feto. Os outros (náuseas, atraso) podem ocorrer em outras patologias.`
  },
  {
    id: 'm7-q26',
    number: 26,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Formas Moleculares do hCG',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O hCG não é uma molécula única, mas um conjunto de isoformas. Qual variante molecular do hCG é predominantemente produzida durante o primeiro trimestre (especialmente na fase de invasão citotrofoblástica) e possui relevância no diagnóstico de Doença Trofoblástica Gestacional (DTG)?',
    alternativas: ['hCG intacto (dimérico).', 'hCG hiperglicosilado (hCG-H).', 'Subunidade alfa livre.', 'Fragmento do núcleo beta urinário (beta-core).', 'hCG sulfatado de origem hipofisária.'],
    gabarito: 1,
    comentario: `● Por que está certa: O hCG-H (hiperglicosilado) é marcador de invasão. Níveis anormais estão ligados a neoplasias trofoblásticas.`
  },
  {
    id: 'm7-q27',
    number: 27,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'NIPT (DNA Fetal Livre)',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O Teste Pré-Natal Não Invasivo (NIPT) analisa fragmentos de DNA fetal livre (cfDNA) na circulação materna. Sobre esse método, assinale a alternativa correta:',
    alternativas: ['Pode ser realizado de forma confiável a partir da 5ª semana de gestação.', 'O DNA analisado provém exclusivamente das células sanguíneas do feto (eritrócitos nucleados).', 'O DNA fetal livre tem origem principalmente na apoptose de células do trofoblasto (placenta).', 'É um exame diagnóstico definitivo, substituindo a amniocentese para cariótipo.', 'Não sofre influência do Índice de Massa Corporal (IMC) da gestante.'],
    gabarito: 2,
    comentario: `● Por que está certa: O DNA fetal livre (cfDNA) circulante no plasma materno não provém diretamente da circulação fetal, mas sim da apoptose de células do trofoblasto (placenta). Por isso, o termo mais preciso seria "DNA placentário livre".
● Por que as outras estão erradas: A) Confiável a partir da 9ª-10ª semana. B) Vem da placenta, não de eritrócitos. D) É um teste de rastreio (screening), não diagnóstico; resultados positivos devem ser confirmados por amniocentese ou biópsia de vilo corial.
● Reforço: O IMC elevado da gestante diminui a "fração fetal" (proporção de DNA fetal em relação ao materno), podendo invalidar o teste.`
  },
  {
    id: 'm7-q28',
    number: 28,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Diagnóstico Diferencial (Pseudociese)',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Uma paciente apresenta todos os sinais presuntivos de gravidez (amenorreia, galactorreia, aumento abdominal), mas os testes de hCG sérico e a ultrassonografia são repetidamente negativos. O diagnóstico mais provável e a conduta adequada são:',
    alternativas: ['Gravidez ectópica abdominal; laparoscopia imediata.', 'Mola hidatiforme completa; curetagem uterina.', 'Pseudociese (gravidez psicológica); suporte psicológico/psiquiátrico.', 'Tumor produtor de hCG na glândula pineal; ressonância de crânio.', 'Síndrome dos Ovários Policísticos; uso de metformina.'],
    gabarito: 2,
    comentario: `● Por que está certa: A Pseudociese é um distúrbio psicossomático onde a paciente acredita estar grávida, desenvolvendo sinais físicos reais (amenorreia, aumento abdominal, galactorreia por aumento de prolactina), mas sem evidência biológica de embrião.
● Armadilha: Não confundir com gravidez ectópica ou mola; nestas, o hCG sérico estaria positivo.`
  },
  {
    id: 'm7-q29',
    number: 29,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Marcadores Ultrassonográficos de Vitalidade',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Qual é o primeiro parâmetro ultrassonográfico de vitalidade embrionária a ser identificado em uma gestação inicial e qual a sua frequência cardíaca média esperada por volta da 6ª-7ª semana?',
    alternativas: ['Movimentação de membros; 100 bpm.', 'Batimentos Cardioembrionários; 120 a 160 bpm.', 'Presença de vesícula vitelina; zero bpm.', 'Fluxo no ducto venoso; 80 bpm.', 'Reação decidual; 140 bpm.'],
    gabarito: 1,
    comentario: `● Por que está certa: O Batimento Cardioembrionário (BCE) é o primeiro sinal definitivo de vitalidade. Na 6ª-7ª semana, a frequência cardíaca é alta, geralmente entre 120 e 160 bpm.
● Conceito: Uma frequência cardíaca embrionária abaixo de 80-100 bpm nesta fase (bradicardia embrionária) é um sinal de mau prognóstico.`
  },
  {
    id: 'm7-q30',
    number: 30,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Integração com Patologia (Ectópica)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Uma paciente com dor pélvica e beta-hCG de 3.500 UI/L realiza USG transvaginal que revela útero vazio com endométrio de 18mm e uma massa anexial à direita com sinal do "anel de fogo" ao Doppler. Qual a interpretação correta deste quadro?',
    alternativas: ['Gestação anembrionada.', 'Provável gestação ectópica íntegra; o anel de fogo representa a vascularização do corpo lúteo ou do trofoblasto ectópico.', 'Abortamento completo recente.', 'Doença inflamatória pélvica aguda com abscesso tubo-ovariano.', 'Gestação múltipla em fase muito inicial.'],
    gabarito: 1,
    comentario: `● Por que está certa: Com um beta-hCG de 3.500 UI/L (acima da zona discriminatória) e útero vazio, o diagnóstico é Ectópica até prova em contrário. O "anel de fogo" ao Doppler representa a hipervascularização trofoblástica na tuba ou no corpo lúteo ipsilateral.`
  },
  {
    id: 'm7-q37',
    number: 37,
    temaPrincipal: 'Hormônios Esteroides',
    topicoEspecifico: 'Esteroidogênese (Molécula Precursora)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'Todos os hormônios esteroides sexuais (andrógenos, estrógenos e progestágenos) derivam de uma única molécula precursora comum de 27 carbonos. Qual é essa molécula?',
    alternativas: ['Glicose.', 'Colesterol.', 'Tirosina.', 'Ácido araquidônico.', 'Albumina.'],
    gabarito: 1,
    comentario: `● Por que está certa: O Colesterol é o "pai" de todos os esteroides. A primeira etapa (passo limitante) é a conversão do colesterol em pregnenolona pela enzima P450scc na mitocôndria.`
  },
  {
    id: 'm7-q38',
    number: 38,
    temaPrincipal: 'Hormônios Esteroides',
    topicoEspecifico: 'Enzima Chave (Aromatase)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A conversão de testosterona em estradiol e de androstenediona em estrona é catalisada por qual complexo enzimático, essencial para a função ovariana e o desenvolvimento folicular?',
    alternativas: ['5-alfa-redutase.', '17-beta-hidroxiesteroide desidrogenase (17β-HSD).', 'Aromatase (CYP19A1).', '21-hidroxilase.', 'Colesterol desmolase (P450scc).'],
    gabarito: 2,
    comentario: `● Por que está certa: A Aromatase é a enzima exclusiva que "aromatiza" o anel A dos androgénios, transformando-os em estrogénios. É o alvo de medicamentos para cancro da mama.`
  },
  {
    id: 'm7-q39',
    number: 39,
    temaPrincipal: 'Diferenciação Sexual',
    topicoEspecifico: 'Determinação do Sexo Gonadal',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O gene SRY, localizado no braço curto do cromossomo Y, codifica uma proteína (Fator de Determinação Testicular) que induz a gônada indiferenciada a se tornar um testículo. Na ausência do gene SRY ou de sua expressão, a gônada indiferenciada se desenvolve em:',
    alternativas: ['Testículo rudimentar.', 'Ovário.', 'Ovotestis.', 'Útero.', 'Glândula adrenal.'],
    gabarito: 1,
    comentario: `● Por que está certa: O desenvolvimento feminino é considerado o "padrão básico". Sem o sinal do SRY para formar testículos (e consequentemente sem testosterona e AMH), a gônada indiferenciada torna-se um ovário.`
  },
  {
    id: 'm7-q40',
    number: 40,
    temaPrincipal: 'Diferenciação Sexual',
    topicoEspecifico: 'Hormônio Anti-Mülleriano (AMH)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Durante o desenvolvimento do trato reprodutor masculino, qual a função do Hormônio Anti-Mülleriano (AMH), secretado pelas células de Sertoli fetais?',
    alternativas: ['Estimular o desenvolvimento dos ductos de Wolff em epidídimo e ducto deferente.', 'Induzir a regressão dos ductos de Müller, impedindo a formação de útero e tubas uterinas.', 'Promover a descida dos testículos para o escroto.', 'Virilizar a genitália externa masculina.', 'Estimular as células de Leydig a produzirem testosterona.'],
    gabarito: 1,
    comentario: `● Por que está certa: O AMH tem uma única função crítica: "matar" os ductos de Müller (precursores do útero/tubas). Sem AMH, mesmo um homem XY teria útero (Síndrome dos Ductos de Müller Persistentes).`
  },
  {
    id: 'm7-q41',
    number: 41,
    temaPrincipal: 'Ciclo Menstrual',
    topicoEspecifico: 'Luteólise e Resgate Lúteo',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Na ausência de gravidez, o corpo lúteo regride após cerca de 14 dias. Contudo, na presença de um embrião, o hCG atua para manter a produção de progesterona. Qual é o mecanismo molecular exato pelo qual o hCG "resgata" o corpo lúteo?',
    alternativas: ['O hCG liga-se aos receptores de FSH, induzindo nova foliculogénese.', 'O hCG possui elevada afinidade pelo receptor de LH (LHCGR), mimetizando a ação do LH com uma meia-vida muito superior, mantendo a esteroidogénese lútea.', 'O hCG inibe diretamente a produção de Prostaglandina F2α (PGF2α) no endométrio.', 'O hCG converte o corpo lúteo em corpo albicans precocemente para acelerar a próxima ovulação.', 'O hCG estimula a glândula suprarrenal a produzir progesterona em substituição ao ovário.'],
    gabarito: 1,
    comentario: `● Por que está certa: O hCG e o LH partilham o mesmo recetor (LHCGR). Como o hCG tem uma cadeia lateral de hidratos de carbono muito maior, ele sobrevive mais tempo e mantém o corpo lúteo vivo além dos 14 dias habituais.`
  },
  {
    id: 'm7-q42',
    number: 42,
    temaPrincipal: 'Eixo HHG',
    topicoEspecifico: 'Inibinas e Activinas',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Durante a fase folicular, as células da granulosa produzem glicoproteínas que regulam seletivamente o FSH. Assinale a alternativa que descreve corretamente a função da Inibina B e da Activina:',
    alternativas: ['A Inibina B estimula a secreção de FSH, enquanto a Activina a inibe.', 'Ambas inibem o GnRH hipotalâmico por feedback negativo clássico.', 'A Activina estimula a síntese e secreção de FSH e a proliferação das células da granulosa; a Inibina B inibe seletivamente o FSH.', 'A Inibina B é o marcador de reserva ovariana produzido pelo corpo lúteo na fase secretora.', 'A Inibina B induz o pico de LH ao sensibilizar os gonadotrofos.'],
    gabarito: 2,
    comentario: `● Por que está certa: A Activina e a Inibina pertencem à superfamília TGF-beta. A Activina potencializa o FSH, enquanto a Inibina B (produzida na fase folicular) faz o feedback negativo fino do FSH.`
  },
  {
    id: 'm7-q43',
    number: 43,
    temaPrincipal: 'Ciclo Menstrual',
    topicoEspecifico: 'Muco Cervical (Índice de Billings)',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'Sob influência de altos níveis de estradiol na fase pré-ovulatória, o muco cervical sofre transformações que facilitam a penetração espermática. Qual característica descreve o muco no período periovulatório?',
    alternativas: ['Espesso, opaco e com baixa elasticidade.', 'Presença de leucócitos abundantes e pH ácido.', 'Fluido, transparente, filante (elevada elasticidade) e com padrão de "folha de samambaia" à cristalização.', 'Presença de tampão mucoso insolúvel.', 'Ausência total de muco devido à ação da progesterona.'],
    gabarito: 2,
    comentario: `● Por que está certa: O estradiol induz a produção de muco tipo E (estrogénico). Ele é rico em cloreto de sódio, o que gera a cristalização em samambaia e alta filância (capacidade de esticar).`
  },
  {
    id: 'm7-q44',
    number: 44,
    temaPrincipal: 'Ciclo Menstrual',
    topicoEspecifico: 'Temperatura Basal Corporal',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟢 Fácil',
    enunciado: 'A progesterona exerce um efeito termogénico no centro termorregulador hipotalâmico. Qual é a variação esperada na temperatura basal após a ovulação?',
    alternativas: ['Queda de 1,0°C mantida até a menstruação.', 'Elevação discreta de 0,3°C a 0,5°C durante a fase lútea.', 'Oscilações erráticas sem padrão definido.', 'Aumento de 2,0°C apenas no dia exato da ovulação.', 'A temperatura permanece constante, sendo a febre o único sinal de ovulação.'],
    gabarito: 1,
    comentario: `● Por que está certa: A progesterona atua no centro termorregulador. O aumento é discreto (0,3-0,5°C) mas persistente por toda a fase lútea.`
  },
  {
    id: 'm7-q48',
    number: 48,
    temaPrincipal: 'Gametogénese Masculina',
    topicoEspecifico: 'Células de Sertoli (Função Nutritiva)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'As células de Sertoli são fundamentais para o sucesso da espermatogénese. Entre suas funções, destaca-se a produção de uma proteína que concentra a testosterona no interior dos túbulos seminíferos. Qual é essa proteína?',
    alternativas: ['Inibina A.', 'Proteína Ligadora de Andrógenos (ABP).', 'Transferrina.', 'Aromatase.', 'Hormona Anti-Mülleriana.'],
    gabarito: 1,
    comentario: `● Por que está certa: A ABP "prende" a testosterona dentro do túbulo seminífero. Sem ela, a testosterona escaparia para o sangue e a concentração intratubular seria insuficiente para a espermatogénese.`
  },
  {
    id: 'm7-q49',
    number: 49,
    temaPrincipal: 'Gametogénese Feminina',
    topicoEspecifico: 'Atresia Folicular',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A vasta maioria dos folículos primordiais presentes no ovário ao nascimento nunca chegará à ovulação, sofrendo um processo de morte celular programada. Este fenómeno é conhecido como:',
    alternativas: ['Menopausa precoce.', 'Atresia folicular.', 'Luteinização.', 'Decidualização.', 'Capacitação.'],
    gabarito: 1,
    comentario: `● Por que está certa: A Atresia é uma apoptose massiva. Começa no 5º mês de vida fetal (pico de 7 milhões de folículos) e continua até a menopausa.`
  },
  {
    id: 'm7-q50',
    number: 50,
    temaPrincipal: 'Gametogénese Masculina',
    topicoEspecifico: 'Ciclo do Epitélio Seminífero',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O tempo necessário para que uma espermatogónia complete todo o processo de diferenciação até se tornar um espermatozoide maduro (espermatogénese total) em humanos é de aproximadamente:',
    alternativas: ['7 dias.', '28 dias.', '74 dias (± 4-5 dias).', '9 meses.', '24 horas.'],
    gabarito: 2,
    comentario: `● Por que está certa: O ciclo completo dura cerca de 74 dias. Isso explica por que tratamentos para infertilidade masculina levam pelo menos 3 meses para mostrar resultados no espermograma.`
  },
  {
    id: 'm7-q51',
    number: 51,
    temaPrincipal: 'Diagnóstico de Gravidez',
    topicoEspecifico: 'Pseudo-hCG (Fenómeno de Gancho / Hook Effect)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Uma paciente com sintomas exuberantes de gravidez e útero muito aumentado para a idade gestacional (suspeita de mola hidatidiforme) apresenta um teste de hCG urinário negativo. O médico solicita a diluição da amostra de soro e o resultado torna-se fortemente positivo. Como se chama este artefacto laboratorial?',
    alternativas: ['Falso positivo por anticorpos heterófilos.', 'Efeito Gancho (Hook Effect), onde o excesso de antigénio satura os anticorpos de captura e deteção.', 'Reação cruzada com TSH.', 'Degradação enzimática do hCG.', 'Mutação no gene CGA.'],
    gabarito: 1,
    comentario: `● Por que está certa: O Efeito Gancho é uma falha técnica por excesso de antigénio. É uma pegadinha clássica em provas de residência médica e laboratório.`
  },
  {
    id: 'm7-q52',
    number: 52,
    temaPrincipal: 'Anatomia e Histologia',
    topicoEspecifico: 'Epitélio das Tubas Uterinas',
    grauImportancia: 'Médio',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O epitélio da mucosa das tubas uterinas (trompas de Falópio) é composto por dois tipos principais de células. Quais são e qual sua função na reprodução?',
    alternativas: ['Células escamosas e células basais; proteção mecânica.', 'Células ciliadas (transporte do óvulo/embrião) e células não ciliadas/secretoras (nutrição e capacitação).', 'Células parietais e células principais; secreção de HCl.', 'Células caliciformes e enterócitos; absorção de nutrientes.', 'Células de Leydig e células de Sertoli; produção hormonal.'],
    gabarito: 1,
    comentario: `● Por que está certa: As células ciliadas batem em direção ao útero (transporte), e as secretoras (peg cells) fornecem o fluido rico em nutrientes para o embrião durante sua jornada de 3-4 dias pela tuba.`
  },
  {
    id: 'm7-q53',
    number: 53,
    temaPrincipal: 'Diferenciação Sexual',
    topicoEspecifico: 'Síndrome de Insensibilidade aos Andrógenos (SIA)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Indivíduo com cariótipo 46,XY apresenta fenótipo feminino, vagina curta em fundo cego, ausência de útero e gónadas (testículos) intra-abdominais. Os níveis de testosterona são de padrão masculino. Qual a falha fisiológica básica?',
    alternativas: ['Ausência do gene SRY.', 'Deficiência na enzima 5-alfa-redutase.', 'Mutação no recetor de andrógenos, impedindo a ação da testosterona e DHT nos tecidos alvo.', 'Produção excessiva de estrogénio pelas adrenais.', 'Persistência dos ductos de Müller por falta de AMH.'],
    gabarito: 2,
    comentario: `● Por que está certa: Na SIA (antigamente chamada de Feminilização Testicular), o corpo produz testosterona, mas o recetor é "surdo". O fenótipo é feminino porque o corpo converte a testosterona em estrogénio (aromatização periférica), mas não há útero porque o AMH (que não depende do recetor de androgênio) funcionou normalmente.`
  }
];

const ALL_M7_QUESTIONS = [
  ...TEST_QUESTIONS.map(q => ({ ...q, origem: 'Geral' })),
  ...P3_QUESTIONS.map(q => ({ ...q, origem: 'Problema 3' })),
  ...P4_QUESTIONS.map(q => ({ ...q, origem: 'Problema 4' })),
  ...P5_QUESTIONS.map(q => ({ ...q, origem: 'Problema 5' })),
  ...P6_QUESTIONS.map(q => ({ ...q, origem: 'Problema 6' }))
];

interface Module7TrainingProps {
  onBack: () => void;
  hideHeader?: boolean;
  onAnswer?: (isCorrect: boolean) => void;
}

const Module7Training: React.FC<Module7TrainingProps> = ({ onBack, hideHeader = false, onAnswer }) => {
  const [isStudyStarted, setIsStudyStarted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [quantity, setQuantity] = useState<number>(10);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('tema');
  const [filters, setFilters] = useState({
    origens: [] as string[],
    temas: [] as string[],
    topicos: [] as string[],
    importancias: [] as string[],
    dificuldades: [] as string[]
  });
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [generatedQuestions, setGeneratedQuestions] = useState<CTQuestion[]>([]);
  
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Opções dinâmicas baseadas nas questões
  const options = useMemo(() => {
    const availableOrigens = Array.from(new Set(ALL_M7_QUESTIONS.map(q => q.origem || 'Geral')));
    const availableTemas = Array.from(new Set(
      ALL_M7_QUESTIONS
        .filter(q => filters.origens.length === 0 || filters.origens.includes(q.origem || 'Geral'))
        .map(q => q.temaPrincipal)
    ));
    
    // Tópicos dependentes dos temas selecionados
    const availableTopicos = filters.temas.length > 0
      ? Array.from(new Set(
          ALL_M7_QUESTIONS
            .filter(q => filters.temas.includes(q.temaPrincipal))
            .map(q => q.topicoEspecifico)
        ))
      : [];

    return {
      origens: availableOrigens,
      temas: availableTemas,
      topicos: availableTopicos,
      importancias: Array.from(new Set(ALL_M7_QUESTIONS.map(q => q.grauImportancia))),
      dificuldades: Array.from(new Set(ALL_M7_QUESTIONS.map(q => q.nivelDificuldade)))
    };
  }, [filters.origens, filters.temas]);

  // Efeito para limpar tópicos órfãos quando os temas mudam
  useEffect(() => {
    if (filters.temas.length === 0) {
      if (filters.topicos.length > 0) {
        setFilters(prev => ({ ...prev, topicos: [] }));
      }
      return;
    }

    const validTopicosForSelectedTemas = new Set(
      ALL_M7_QUESTIONS
        .filter(q => filters.temas.includes(q.temaPrincipal))
        .map(q => q.topicoEspecifico)
    );

    const filteredTopicos = filters.topicos.filter(t => validTopicosForSelectedTemas.has(t));
    
    if (filteredTopicos.length !== filters.topicos.length) {
      setFilters(prev => ({
        ...prev,
        topicos: filteredTopicos
      }));
    }
  }, [filters.temas, filters.topicos.length]);

  const handleStartStudy = () => {
    const matching = ALL_M7_QUESTIONS.filter(q => {
      const matchOrigem = filters.origens.length === 0 || filters.origens.includes(q.origem || 'Geral');
      const matchTema = filters.temas.length === 0 || filters.temas.includes(q.temaPrincipal);
      const matchTopico = filters.topicos.length === 0 || filters.topicos.includes(q.topicoEspecifico);
      const matchImportancia = filters.importancias.length === 0 || filters.importancias.includes(q.grauImportancia);
      const matchDificuldade = filters.dificuldades.length === 0 || filters.dificuldades.includes(q.nivelDificuldade);
      return matchOrigem && matchTema && matchTopico && matchImportancia && matchDificuldade;
    });

    // Shuffle
    const shuffled = [...matching].sort(() => Math.random() - 0.5);
    // Slice
    const selected = shuffled.slice(0, quantity);
    
    setGeneratedQuestions(selected);
    setIsStudyStarted(true);
  };

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const handleAnswer = (questionId: string, index: number) => {
    if (showResults[questionId]) return;
    const question = generatedQuestions.find(q => q.id === questionId);
    const isCorrect = question?.gabarito === index;
    
    setSelectedAnswers(prev => ({ ...prev, [questionId]: index }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
    
    if (onAnswer) {
      onAnswer(isCorrect);
    }
  };

  const scrollToQuestion = (id: string) => {
    const element = questionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const moduleName = "ASE 7 — Concepção, Formação do Ser Humano e Gestação";
    const date = new Date().toLocaleDateString('pt-BR');
    const primaryColor = [14, 165, 233]; // Nexus Blue (Sky 500)
    const textColor = [38, 38, 38]; // Neutral 800
    const secTextColor = [115, 115, 115]; // Neutral 500
    const borderColor = [229, 229, 229]; // Neutral 200

    const addHeader = (pdf: jsPDF) => {
      // Header Background
      pdf.setFillColor(248, 250, 252); // Slate 50
      pdf.rect(0, 0, 210, 40, 'F');
      
      // Accent Line
      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.rect(0, 38, 210, 2, 'F');

      // Brand
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text("NEXUS", 20, 20);

      // Module Info
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
      const splitTitle = pdf.splitTextToSize(moduleName, 120);
      pdf.text(splitTitle, 20, 30);

      // Date
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(secTextColor[0], secTextColor[1], secTextColor[2]);
      pdf.text(`Data de geração: ${date}`, 190, 20, { align: "right" });
    };

    const addFooter = (pdf: jsPDF, pageNum: number, totalPages: number) => {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(secTextColor[0], secTextColor[1], secTextColor[2]);
      
      // Line
      pdf.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
      pdf.line(20, 285, 190, 285);

      pdf.text(`Página ${pageNum} de ${totalPages}`, 105, 290, { align: "center" });
      pdf.text("NEXUS — Centro de Treinamento", 20, 290);
    };

    const addWatermark = (pdf: jsPDF) => {
      pdf.saveGraphicsState();
      pdf.setTextColor(220, 220, 220);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(100);
      const gState = new (pdf as any).GState({ opacity: 0.08 });
      pdf.setGState(gState);
      pdf.text("NEXUS", 105, 160, { align: "center", angle: 45 });
      pdf.restoreGraphicsState();
    };

    let y = 55;
    const margin = 20;
    const contentWidth = 170;

    generatedQuestions.forEach((q, index) => {
      // Calculate height needed for this question block
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      const enunciadoLines = doc.splitTextToSize(`${index + 1}. ${q.enunciado}`, contentWidth);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const metaText = `Tema: ${q.temaPrincipal} | Tópico: ${q.topicoEspecifico}`;
      
      let questionHeight = (enunciadoLines.length * 6) + 12; // Enunciado + Meta + Spacing
      
      const altLinesArray: string[][] = q.alternativas.map((alt, altIdx) => {
        const letter = String.fromCharCode(65 + altIdx);
        return doc.splitTextToSize(`${letter}) ${alt}`, contentWidth - 10);
      });
      
      altLinesArray.forEach(lines => {
        questionHeight += (lines.length * 5) + 2;
      });

      // Page break check
      if (y + questionHeight > 275) {
        doc.addPage();
        y = 55;
      }

      // Draw Question Block
      // Metadata
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(metaText.toUpperCase(), margin, y);
      y += 5;

      // Enunciado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(enunciadoLines, margin, y);
      y += (enunciadoLines.length * 6) + 4;

      // Alternatives
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      
      altLinesArray.forEach((lines, altIdx) => {
        doc.text(lines, margin + 5, y);
        y += (lines.length * 5) + 2;
      });

      y += 12; // Space between questions
    });

    // Add Header, Footer and Watermark to all pages
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addHeader(doc);
      addWatermark(doc);
      addFooter(doc, i, totalPages);
    }

    doc.save(`Nexus_CT_ASE7_${date.replace(/\//g, '-')}.pdf`);
  };

  const isAnyFilterSelected = 
    filters.origens.length > 0 ||
    filters.temas.length > 0 || 
    filters.topicos.length > 0 || 
    filters.importancias.length > 0 || 
    filters.dificuldades.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {!hideHeader && (
        <>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-500 dark:text-nexus-text-sec hover:text-nexus-blue transition-colors mb-6 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
            <span className="text-sm font-semibold uppercase tracking-widest">Voltar ao Centro de Treinamento</span>
          </button>

          <header className="mb-8">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-nexus-text-title mb-2">
              ASE 7 — Concepção, Formação do Ser Humano e Gestação
            </h1>
            <p className="text-sm text-neutral-500 dark:text-nexus-text-sec">
              Treinamento focado em embriologia, fisiologia obstétrica e desenvolvimento fetal.
            </p>
          </header>
        </>
      )}

      {!isStudyStarted ? (
        <div className="max-w-4xl animate-in zoom-in-95 duration-300">
          <div className="bg-white dark:bg-nexus-card rounded-3xl border border-neutral-200 dark:border-nexus-border shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-neutral-100 dark:border-nexus-border/50 bg-neutral-50/30 dark:bg-nexus-surface/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-nexus-blue/10 rounded-xl flex items-center justify-center text-nexus-blue">
                  <Filter size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-nexus-text-title">Filtros de Questões</h2>
                  <p className="text-[10px] text-neutral-500 dark:text-nexus-text-sec uppercase font-bold tracking-widest">Personalize seu treinamento</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setFilters({ origens: [], temas: [], topicos: [], importancias: [], dificuldades: [] })}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-nexus-blue transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>

            <div className="divide-y divide-neutral-100 dark:divide-nexus-border/30">
              {/* ORIGEM DA QUESTÃO */}
              <div className="filter-group">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'origem' ? null : 'origem')}
                  className="w-full p-6 flex items-center justify-between hover:bg-neutral-50/50 dark:hover:bg-nexus-surface/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${filters.origens.length > 0 ? 'bg-nexus-blue text-white' : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-400'}`}>
                      <Target size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-nexus-text-title">Origem da Questão</span>
                      <span className="block text-[10px] text-neutral-500 dark:text-nexus-text-sec">
                        {filters.origens.length > 0 ? `${filters.origens.length} selecionada(s)` : 'Todas as origens'}
                      </span>
                    </div>
                  </div>
                  {activeAccordion === 'origem' ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'origem' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 flex flex-wrap gap-2">
                        {options.origens.map(origem => (
                          <button
                            key={origem}
                            onClick={() => toggleFilter('origens', origem)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              filters.origens.includes(origem)
                                ? 'bg-nexus-blue text-white border-nexus-blue shadow-lg shadow-nexus-blue/20'
                                : 'bg-neutral-50 dark:bg-nexus-surface text-neutral-500 dark:text-nexus-text-sec border-neutral-200 dark:border-nexus-border hover:border-nexus-blue/50'
                            }`}
                          >
                            {origem}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TEMA PRINCIPAL */}
              <div className="filter-group">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'tema' ? null : 'tema')}
                  className="w-full p-6 flex items-center justify-between hover:bg-neutral-50/50 dark:hover:bg-nexus-surface/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${filters.temas.length > 0 ? 'bg-nexus-blue text-white' : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-400'}`}>
                      <BookOpen size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-nexus-text-title">Tema Principal</span>
                      <span className="block text-[10px] text-neutral-500 dark:text-nexus-text-sec">
                        {filters.temas.length > 0 ? `${filters.temas.length} selecionado(s)` : 'Todos os temas'}
                      </span>
                    </div>
                  </div>
                  {activeAccordion === 'tema' ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'tema' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 flex flex-wrap gap-2">
                        {options.temas.map(tema => (
                          <button
                            key={tema}
                            onClick={() => toggleFilter('temas', tema)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              filters.temas.includes(tema)
                                ? 'bg-nexus-blue text-white border-nexus-blue shadow-lg shadow-nexus-blue/20'
                                : 'bg-neutral-50 dark:bg-nexus-surface text-neutral-500 dark:text-nexus-text-sec border-neutral-200 dark:border-nexus-border hover:border-nexus-blue/50'
                            }`}
                          >
                            {tema}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TÓPICO ESPECÍFICO */}
              <div className="filter-group">
                <button 
                  onClick={() => {
                    if (filters.temas.length > 0) {
                      setActiveAccordion(activeAccordion === 'topico' ? null : 'topico');
                    }
                  }}
                  disabled={filters.temas.length === 0}
                  className={`w-full p-6 flex items-center justify-between transition-colors ${filters.temas.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-50/50 dark:hover:bg-nexus-surface/5'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${filters.topicos.length > 0 ? 'bg-nexus-blue text-white' : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-400'}`}>
                      <Filter size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-nexus-text-title">Tópico Específico</span>
                      <span className="block text-[10px] text-neutral-500 dark:text-nexus-text-sec">
                        {filters.temas.length === 0 
                          ? 'Selecione um tema primeiro' 
                          : (filters.topicos.length > 0 ? `${filters.topicos.length} selecionado(s)` : 'Todos os tópicos')}
                      </span>
                    </div>
                  </div>
                  {activeAccordion === 'topico' ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'topico' && filters.temas.length > 0 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 flex flex-wrap gap-2">
                        {options.topicos.length > 0 ? options.topicos.map(topico => (
                          <button
                            key={topico}
                            onClick={() => toggleFilter('topicos', topico)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              filters.topicos.includes(topico)
                                ? 'bg-nexus-blue text-white border-nexus-blue shadow-lg shadow-nexus-blue/20'
                                : 'bg-neutral-50 dark:bg-nexus-surface text-neutral-500 dark:text-nexus-text-sec border-neutral-200 dark:border-nexus-border hover:border-nexus-blue/50'
                            }`}
                          >
                            {topico}
                          </button>
                        )) : (
                          <p className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label italic">Nenhum tópico encontrado para os temas selecionados.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* GRAU DE IMPORTÂNCIA */}
              <div className="filter-group">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'importancia' ? null : 'importancia')}
                  className="w-full p-6 flex items-center justify-between hover:bg-neutral-50/50 dark:hover:bg-nexus-surface/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${filters.importancias.length > 0 ? 'bg-nexus-blue text-white' : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-400'}`}>
                      <Target size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-nexus-text-title">Grau de Importância</span>
                      <span className="block text-[10px] text-neutral-500 dark:text-nexus-text-sec">
                        {filters.importancias.length > 0 ? `${filters.importancias.length} selecionado(s)` : 'Todas as importâncias'}
                      </span>
                    </div>
                  </div>
                  {activeAccordion === 'importancia' ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'importancia' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 flex flex-wrap gap-2">
                        {options.importancias.map(imp => (
                          <button
                            key={imp}
                            onClick={() => toggleFilter('importancias', imp)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              filters.importancias.includes(imp)
                                ? 'bg-nexus-blue text-white border-nexus-blue shadow-lg shadow-nexus-blue/20'
                                : 'bg-neutral-50 dark:bg-nexus-surface text-neutral-500 dark:text-nexus-text-sec border-neutral-200 dark:border-nexus-border hover:border-nexus-blue/50'
                            }`}
                          >
                            {imp}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* NÍVEL DE DIFICULDADE */}
              <div className="filter-group">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'dificuldade' ? null : 'dificuldade')}
                  className="w-full p-6 flex items-center justify-between hover:bg-neutral-50/50 dark:hover:bg-nexus-surface/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${filters.dificuldades.length > 0 ? 'bg-nexus-blue text-white' : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-400'}`}>
                      <Brain size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-nexus-text-title">Nível de Dificuldade</span>
                      <span className="block text-[10px] text-neutral-500 dark:text-nexus-text-sec">
                        {filters.dificuldades.length > 0 ? `${filters.dificuldades.length} selecionado(s)` : 'Todas as dificuldades'}
                      </span>
                    </div>
                  </div>
                  {activeAccordion === 'dificuldade' ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'dificuldade' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 flex flex-wrap gap-2">
                        {options.dificuldades.map(dif => (
                          <button
                            key={dif}
                            onClick={() => toggleFilter('dificuldades', dif)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              filters.dificuldades.includes(dif)
                                ? 'bg-nexus-blue text-white border-nexus-blue shadow-lg shadow-nexus-blue/20'
                                : 'bg-neutral-50 dark:bg-nexus-surface text-neutral-500 dark:text-nexus-text-sec border-neutral-200 dark:border-nexus-border hover:border-nexus-blue/50'
                            }`}
                          >
                            {dif}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* QUANTIDADE */}
              <div className="filter-group">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'quantidade' ? null : 'quantidade')}
                  className="w-full p-6 flex items-center justify-between hover:bg-neutral-50/50 dark:hover:bg-nexus-surface/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${quantity > 0 ? 'bg-nexus-blue text-white' : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-400'}`}>
                      <Hash size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-nexus-text-title">Quantidade de Questões</span>
                      <span className="block text-[10px] text-neutral-500 dark:text-nexus-text-sec">
                        {quantity} questões selecionadas
                      </span>
                    </div>
                  </div>
                  {activeAccordion === 'quantidade' ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'quantidade' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <div className="flex items-center gap-4">
                          <input 
                            type="range" 
                            min="1"
                            max="100"
                            step="5"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="flex-grow accent-nexus-blue"
                          />
                          <div className="w-16 h-10 bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl flex items-center justify-center font-bold text-sm text-neutral-900 dark:text-nexus-text-main">
                            {quantity}
                          </div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">1 questão</span>
                          <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">100 questões</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartStudy}
            disabled={!isAnyFilterSelected || quantity <= 0}
            className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
              isAnyFilterSelected && quantity > 0
                ? 'bg-nexus-blue text-white hover:bg-blue-600 shadow-xl shadow-nexus-blue/20 active:scale-[0.98]'
                : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-400 dark:text-nexus-text-label cursor-not-allowed'
            }`}
          >
            <Play size={18} fill="currentColor" />
            Gerar Lista de Questões
          </button>
          
          {!isAnyFilterSelected && (
            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest">
              <AlertCircle size={12} />
              Selecione pelo menos um tema para começar
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-8 relative">
          {/* CONTEÚDO PRINCIPAL */}
          <div className={`flex-grow space-y-8 transition-all duration-500 ${isSidebarOpen ? 'mr-0 lg:mr-72' : 'mr-0'}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-nexus-card p-4 rounded-2xl border border-neutral-200 dark:border-nexus-border shadow-sm max-w-3xl gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-nexus-blue/10 rounded-xl flex items-center justify-center text-nexus-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-nexus-text-title">Estudo em Andamento</h3>
                  <p className="text-[10px] text-neutral-500 dark:text-nexus-text-sec uppercase font-bold tracking-widest">
                    {generatedQuestions.length} questões geradas
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button 
                  onClick={generatePDF}
                  className="flex-1 md:flex-none px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Baixar Lista em PDF
                </button>
                <button 
                  onClick={() => {
                    setIsStudyStarted(false);
                    setSelectedAnswers({});
                    setShowResults({});
                    setGeneratedQuestions([]);
                  }}
                  className="flex-1 md:flex-none px-4 py-2 bg-neutral-100 dark:bg-nexus-surface text-neutral-600 dark:text-nexus-text-main rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 dark:hover:bg-nexus-hover transition-colors"
                >
                  Alterar Filtros
                </button>
              </div>
            </div>

            <div className="space-y-6 max-w-3xl">
              {generatedQuestions.length > 0 ? generatedQuestions.map((q, idx) => (
                <div 
                  key={q.id} 
                  ref={el => questionRefs.current[q.id] = el}
                  className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  <div className="p-6 border-b border-neutral-100 dark:border-nexus-border/50 bg-neutral-50/50 dark:bg-nexus-surface/30">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-nexus-blue/10 text-nexus-blue rounded text-[9px] font-bold uppercase tracking-widest">Questão {idx + 1}</span>
                      <span className="px-2 py-1 bg-neutral-200 dark:bg-nexus-surface text-neutral-500 dark:text-nexus-text-sec rounded text-[9px] font-bold uppercase tracking-widest">Tema: {q.temaPrincipal}</span>
                      <span className="px-2 py-1 bg-neutral-200 dark:bg-nexus-surface text-neutral-500 dark:text-nexus-text-sec rounded text-[9px] font-bold uppercase tracking-widest">Tópico: {q.topicoEspecifico}</span>
                    </div>
                    <p className="text-neutral-900 dark:text-nexus-text-main text-sm font-medium leading-relaxed">
                      {q.enunciado}
                    </p>
                  </div>
                  <div className="p-6 space-y-3">
                    {q.alternativas.map((alt, altIdx) => {
                      const isSelected = selectedAnswers[q.id] === altIdx;
                      const isCorrect = q.gabarito === altIdx;
                      const showResult = showResults[q.id];
                      
                      let bgColor = 'bg-neutral-50 dark:bg-nexus-surface hover:bg-neutral-100 dark:hover:bg-nexus-hover';
                      let borderColor = 'border-neutral-200 dark:border-nexus-border';
                      let textColor = 'text-neutral-700 dark:text-nexus-text-main';

                      if (showResult) {
                        if (isCorrect) {
                          bgColor = 'bg-emerald-500/10';
                          borderColor = 'border-emerald-500/50';
                          textColor = 'text-emerald-500';
                        } else if (isSelected) {
                          bgColor = 'bg-rose-500/10';
                          borderColor = 'border-rose-500/50';
                          textColor = 'text-rose-500';
                        }
                      }

                      return (
                        <button
                          key={altIdx}
                          onClick={() => handleAnswer(q.id, altIdx)}
                          disabled={showResult}
                          className={`w-full text-left p-4 rounded-xl border ${borderColor} ${bgColor} ${textColor} transition-all flex items-center gap-4 group`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${showResult && isCorrect ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-nexus-card border-neutral-200 dark:border-nexus-border group-hover:border-nexus-blue transition-colors'}`}>
                            {String.fromCharCode(65 + altIdx)}
                          </div>
                          <span className="text-sm font-medium">{alt}</span>
                        </button>
                      );
                    })}
                  </div>
                  {showResults[q.id] && (
                    <>
                      <div className={`p-4 text-center text-xs font-bold uppercase tracking-widest ${selectedAnswers[q.id] === q.gabarito ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        {selectedAnswers[q.id] === q.gabarito ? 'Resposta Correta! ✨' : 'Resposta Incorreta. Tente revisar o conteúdo.'}
                      </div>
                      {q.comentario && (
                        <div className="p-6 bg-neutral-50 dark:bg-nexus-surface/50 border-t border-neutral-100 dark:border-nexus-border/30">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-nexus-blue mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            Gabarito Comentado
                          </h4>
                          <div className="text-xs text-neutral-600 dark:text-nexus-text-sec leading-relaxed space-y-2 whitespace-pre-line">
                            {q.comentario}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )) : (
                <div className="py-20 text-center bg-white dark:bg-nexus-card rounded-3xl border border-dashed border-neutral-200 dark:border-nexus-border">
                  <p className="text-neutral-400 dark:text-nexus-text-label text-sm font-medium">Nenhuma questão encontrada com os filtros selecionados.</p>
                  <button 
                    onClick={() => setIsStudyStarted(false)}
                    className="mt-4 text-nexus-blue text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                    Voltar e ajustar filtros
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SLIDEBOX LATERAL */}
          <aside 
            className={`fixed top-24 right-4 bottom-4 w-64 bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-3xl shadow-2xl transition-all duration-500 z-40 flex flex-col overflow-hidden ${
              isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
            } hidden lg:flex`}
          >
            <div className="p-6 border-b border-neutral-100 dark:border-nexus-border/50 flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-widest text-neutral-900 dark:text-nexus-text-title">Navegação</h4>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 hover:bg-neutral-100 dark:hover:bg-nexus-surface rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6">
              <div className="grid grid-cols-4 gap-2">
                {generatedQuestions.map((q, idx) => {
                  const isAnswered = showResults[q.id];
                  const isCorrect = selectedAnswers[q.id] === q.gabarito;
                  
                  let statusColor = 'bg-neutral-50 dark:bg-nexus-surface text-neutral-400 dark:text-nexus-text-sec border-neutral-200 dark:border-nexus-border';
                  if (isAnswered) {
                    statusColor = isCorrect 
                      ? 'bg-emerald-500 text-white border-emerald-500' 
                      : 'bg-rose-500 text-white border-rose-500';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => scrollToQuestion(q.id)}
                      className={`aspect-square rounded-xl border flex items-center justify-center text-[10px] font-bold transition-all hover:scale-110 active:scale-95 ${statusColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-6 border-t border-neutral-100 dark:border-nexus-border/50 bg-neutral-50/30 dark:bg-nexus-surface/30">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[9px] font-bold text-neutral-500 dark:text-nexus-text-sec uppercase tracking-widest">Correto</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="text-[9px] font-bold text-neutral-500 dark:text-nexus-text-sec uppercase tracking-widest">Incorreto</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-neutral-200 dark:bg-nexus-surface border border-neutral-300 dark:border-nexus-border"></div>
                <span className="text-[9px] font-bold text-neutral-500 dark:text-nexus-text-sec uppercase tracking-widest">Pendente</span>
              </div>
            </div>
          </aside>

          {/* BOTÃO FLUTUANTE PARA ABRIR SIDEBAR */}
          {!isSidebarOpen && isStudyStarted && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="fixed bottom-8 right-8 w-14 h-14 bg-nexus-blue text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 hidden lg:flex animate-in zoom-in duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12H3"/><path d="M21 6H3"/><path d="M21 18H3"/></svg>
            </button>
          )}

          {/* VERSÃO MOBILE DO SIDEBAR (BARRA INFERIOR) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-nexus-card border-t border-neutral-200 dark:border-nexus-border p-4 z-50 flex gap-2 overflow-x-auto no-scrollbar">
            {generatedQuestions.map((q, idx) => {
              const isAnswered = showResults[q.id];
              const isCorrect = selectedAnswers[q.id] === q.gabarito;
              
              let statusColor = 'bg-neutral-50 dark:bg-nexus-surface text-neutral-400 dark:text-nexus-text-sec border-neutral-200 dark:border-nexus-border';
              if (isAnswered) {
                statusColor = isCorrect 
                  ? 'bg-emerald-500 text-white border-emerald-500' 
                  : 'bg-rose-500 text-white border-rose-500';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id)}
                  className={`min-w-[40px] h-10 rounded-xl border flex items-center justify-center text-[10px] font-bold transition-all ${statusColor}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Module7Training;
