import { CTQuestion } from '../../types';

export const P6_QUESTIONS: CTQuestion[] = [
  {
    id: 'm7-p6-q51',
    number: 51,
    temaPrincipal: 'Alterações Estruturais e Risco Reprodutivo',
    topicoEspecifico: 'Translocações Robertsonianas e Síndrome de Down',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Um casal procura aconselhamento genético após o nascimento de um filho com Síndrome de Down. O cariótipo da criança revela 46 cromossomos, com a presença de uma translocação entre os braços longos dos cromossomos 14 e 21. Sobre este cenário, analise as afirmações com base no texto e assinale a correta:',
    alternativas: [
      'O risco de recorrência para este casal é idêntico ao de uma trissomia 21 livre por não disjunção esporádica.',
      'O fenótipo de Down ocorre porque, apesar de o número total de cromossomos ser 46, a dose gênica efetiva do cromossomo 21 é tripla.',
      'Se um dos pais for portador equilibrado desta translocação, ele apresentará 46 cromossomos e fenótipo alterado.',
      'A translocação Robertsoniana envolve a fusão dos braços curtos de cromossomos acrocêntricos, preservando o RNA ribossômico.',
      'O estudo do cariótipo dos pais é dispensável, pois o evento é invariavelmente "de novo" na linhagem germinativa.'
    ],
    gabarito: 1,
    comentario: 'A questão aborda o conceito de dose gênica. Na translocação Robertsoniana t(14;21), o feto possui dois cromossomos 21 normais mais o braço longo do 21 fundido ao 14, totalizando três cópias do material crítico. O portador equilibrado tem 45 cromossomos e é fenotipicamente normal. O risco de recorrência é maior do que na trissomia livre, tornando o cariótipo dos pais obrigatório.'
  },
  {
    id: 'm7-p6-q52',
    number: 52,
    temaPrincipal: 'Mecanismos de Não Disjunção Meiótica',
    topicoEspecifico: 'Diferenciação entre Erros na Meiose I e II',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A não disjunção cromossômica é a base fisiopatológica das aneuploidias. Se ocorrer uma falha na separação dos cromossomos homólogos durante a Meiose I materna para o par 21, qual será a composição dos gametas resultantes e o desfecho genético após a fecundação por um espermatozoide normal?',
    alternativas: [
      'Dois gametas normais (n=23) e dois gametas nulisômicos (n=22).',
      'Dois gametas com 24 cromossomos (contendo cromátides irmãs idênticas) e dois com 22.',
      'Quatro gametas anormais, sendo dois com 24 cromossomos (contendo ambos os homólogos, materno e paterno) e dois com 22.',
      'Formação de um zigoto triploide (3n=69) por falha global do genoma.',
      'Um gameta com 24 cromossomos e três gametas com 22 cromossomos.'
    ],
    gabarito: 2,
    comentario: 'Na não disjunção da Meiose I, os homólogos não se separam, resultando em 100% de gametas anormais: dois com 24 cromossomos e dois com 22. O gameta de 24 cromossomos carrega material biparental (ambos os homólogos). O erro na Meiose II geraria metade dos gametas normais.'
  },
  {
    id: 'm7-p6-q53',
    number: 53,
    temaPrincipal: 'Fenómenos Epigenéticos e Imprinting',
    topicoEspecifico: 'Dissomia Uniparental (UPD) e Síndrome de Angelman',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Síndrome de Angelman e a Síndrome de Prader-Willi ilustram o papel do imprinting genômico na região 15q11-q13. Um paciente apresenta Síndrome de Angelman decorrente de Dissomia Uniparental (UPD). Com base nos mecanismos de resgate e imprinting, assinale a alternativa correta:',
    alternativas: [
      'O paciente possui dois cromossomos 15 de origem materna, resultando em excesso de expressão de UBE3A.',
      'O mecanismo envolve a heterodissomia uniparental materna por erro na meiose I.',
      'A síndrome ocorreu porque o indivíduo possui dois cromossomos 15 de origem paterna, carecendo da expressão materna essencial.',
      'O quadro clínico esperado para este paciente é de hipotonia neonatal, hiperfagia e obesidade progressiva.',
      'A UPD é uma alteração numérica que resulta obrigatoriamente em cariótipo com 47 cromossomos.'
    ],
    gabarito: 2,
    comentario: 'A Síndrome de Angelman ocorre pela ausência de expressão materna. No caso de UPD, isso significa que a criança herdou ambos os cromossomos 15 do pai (UPD paterna). A UPD materna causa Prader-Willi. A UPD mantém o número total de 46 cromossomos.'
  },
  {
    id: 'm7-p6-q54',
    number: 54,
    temaPrincipal: 'Síndromes Cromossômicas Sexuais',
    topicoEspecifico: 'Fisiopatologia de Turner e Klinefelter',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Comparando as síndromes de Turner (45,X) e Klinefelter (47,XXY), qual achado hormonal e antropométrico é um divisor de águas na prática clínica para diferenciá-las?',
    alternativas: [
      'Turner apresenta estatura elevada e hipogonadismo hipogonadotrófico.',
      'Klinefelter apresenta baixa estatura e testosterona elevada.',
      'Ambas cursam com hipogonadismo hipergonadotrófico, mas Turner apresenta baixa estatura enquanto Klinefelter tende à estatura elevada.',
      'Em Turner, o pescoço alado decorre da falha testicular primária.',
      'O mosaicismo é exclusivo da síndrome de Klinefelter, não ocorrendo em Turner.'
    ],
    gabarito: 2,
    comentario: 'Ambas as síndromes apresentam falha gonadal primária, o que eleva FSH/LH por perda de feedback (hipergonadotrófico). Turner é marcada por baixa estatura (haploinsuficiência de SHOX), enquanto Klinefelter apresenta estatura elevada e proporções eunuchoides.'
  },
  {
    id: 'm7-p6-q55',
    number: 55,
    temaPrincipal: 'Fisiopatologia do Abortamento',
    topicoEspecifico: 'Incompetência Istmo-Cervical (IIC) vs Causas Genéticas',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Uma paciente com histórico de três perdas gestacionais no segundo trimestre (18-20 semanas), descritas como expulsões fetais indolores e rápidas, sem sangramento prévio importante, apresenta maior probabilidade fisiopatológica de:',
    alternativas: [
      'Embriofetopatia por aneuploidia autossômica, como a trissomia 16.',
      'Insuficiência de corpo lúteo por produção inadequada de progesterona.',
      'Incompetência Istmo-Cervical (IIC), uma falha mecânica do colo uterino em resistir à pressão intrauterina.',
      'Síndrome do Anticorpo Antifosfolípide (SAAF) causando microtromboses placentárias.',
      'Infecção aguda por Citomegalovírus (CMV) no primeiro trimestre.'
    ],
    gabarito: 2,
    comentario: 'A descrição de perdas indolores no segundo trimestre é o marcador clássico da IIC. Perdas genéticas e insuficiência lútea ocorrem predominantemente no primeiro trimestre.'
  },
  {
    id: 'm7-p6-q56',
    number: 56,
    temaPrincipal: 'Bioética e Legislação Brasileira',
    topicoEspecifico: 'Anencefalia e ADPF 54',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Em relação à interrupção da gestação em casos de anencefalia fetal no Brasil, de acordo com a decisão do STF na ADPF 54 e as normas do CFM, assinale a alternativa correta:',
    alternativas: [
      'A interrupção é permitida apenas após a 20ª semana, quando a viabilidade extrauterina é descartada.',
      'O diagnóstico deve ser realizado por ultrassonografia a partir da 12ª semana, demonstrando ausência de calota craniana e parênquima cerebral.',
      'É obrigatória a obtenção de autorização judicial prévia para cada caso individual.',
      'A anencefalia é classificada pelo STF como um caso de "aborto eugênico" previsto no Código Penal.',
      'O médico que se recusa a realizar o procedimento por convicção moral exerce objeção de consciência absoluta, sem dever de encaminhamento.'
    ],
    gabarito: 1,
    comentario: 'Após a ADPF 54, a interrupção da gestação de anencéfalo não requer alvará judicial. A Resolução CFM 1.989/2012 fixa o diagnóstico por ultrassom a partir da 12ª semana.'
  },
  {
    id: 'm7-p6-q57',
    number: 57,
    temaPrincipal: 'Técnicas de Diagnóstico Citogenético',
    topicoEspecifico: 'Microarray vs Cariótipo Convencional',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Um médico investiga uma criança com deficiência intelectual grave, autismo e pequenos dismorfismos faciais. O cariótipo de 450-550 bandas resultou normal. Qual é a conduta técnica mais adequada e sua justificativa bioética/clínica?',
    alternativas: [
      'Solicitar FISH para o cromossomo 21, pois é o método de maior resolução genômica global.',
      'Solicitar Microarray Cromossômico, capaz de detectar microdeleções e microduplicações submicroscópicas invisíveis ao cariótipo.',
      'Repetir o cariótipo em outro laboratório, pois o cariótipo normal exclui qualquer etiologia cromossômica.',
      'Solicitar Microarray, técnica ideal para identificar translocações equilibradas herdadas dos pais.',
      'Encerrar a investigação genética, uma vez que o cariótipo normal é o padrão-ouro definitivo para síndromes sindrômicas.'
    ],
    gabarito: 1,
    comentario: 'O cariótipo tem limitação de resolução para microalterações. O Microarray é o exame de escolha para atraso do desenvolvimento e autismo com cariótipo normal, pois detecta variações no número de cópias (CNVs) submicroscópicas.'
  },
  {
    id: 'm7-p6-q58',
    number: 58,
    temaPrincipal: 'Alterações Estruturais - Inversões',
    topicoEspecifico: 'Inversão Paracêntrica vs Pericêntrica',
    grauImportancia: 'Média',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Durante a meiose de um portador de inversão equilibrada, a formação do loop de inversão permite o pareamento dos homólogos. Se ocorrer um crossing-over dentro desse loop em uma Inversão Paracêntrica, o resultado provável será:',
    alternativas: [
      'Gametas viáveis com duplicações e deleções parciais, mas com centrômero único.',
      'Formação de um cromossomo dicêntrico e um fragmento acêntrico, resultando em gametas inviáveis.',
      'Produção de descendentes com Síndrome de Down por translocação.',
      'Restauração completa do cariótipo normal em 100% dos gametas.',
      'Formação de um isocromossomo do braço longo.'
    ],
    gabarito: 1,
    comentario: 'Na inversão paracêntrica (que não inclui o centrômero), a recombinação no loop gera estruturas instáveis: o fragmento acêntrico se perde e o dicêntrico se rompe, levando à inviabilidade embrionária.'
  },
  {
    id: 'm7-p6-q59',
    number: 59,
    temaPrincipal: 'Bioética e Ética Profissional',
    topicoEspecifico: 'Sigilo Médico em Casos de Aborto Provocado',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Uma jovem de 19 anos dá entrada na emergência com hemorragia genital grave e sinais de choque séptico. Durante a anamnese, ela confessa ter utilizado métodos inseguros para provocar um aborto. De acordo com o Código de Ética Médica e as Normas do Ministério da Saúde, qual deve ser a conduta do médico?',
    alternativas: [
      'Notificar imediatamente a autoridade policial, pois o aborto provocado é crime e o médico tem dever legal de denúncia.',
      'Estabilizar a paciente e aguardar a presença de um representante legal para realizar qualquer procedimento.',
      'Priorizar a assistência para salvar a vida, manter o sigilo profissional e não denunciar a paciente, tratando-a com dignidade e sem julgamentos morais.',
      'Realizar a curetagem apenas se houver confissão por escrito para fins de prova judicial.',
      'Quebrar o sigilo médico alegando "motivo justo", uma vez que o crime de aborto fere o direito à vida do nascituro.'
    ],
    gabarito: 2,
    comentario: 'A prioridade ética é a saúde e a vida da mulher. O dever de sigilo (Art. 73 CEM) é a regra; a denúncia de paciente por aborto provocado afasta mulheres do sistema e contraria a ética de proteção.'
  },
  {
    id: 'm7-p6-q60',
    number: 60,
    temaPrincipal: 'Síndrome de Patau (Trissomia 13)',
    topicoEspecifico: 'Defeitos de Linha Média e Fenótipo',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Ao examinar um recém-nascido com microcefalia, fenda labiopalatina central, polidactilia pós-axial e holoprosencefalia ao ultrassom transfontanelar, a principal suspeita citogenética é:',
    alternativas: [
      'Trissomia do cromossomo 21 (Síndrome de Down).',
      'Deleção do braço curto do cromossomo 5 (Síndrome de Cri-du-chat).',
      'Trissomia do cromossomo 18 (Síndrome de Edwards).',
      'Trissomia do cromossomo 13 (Síndrome de Patau).',
      'Cariótipo 47,XYY (Síndrome do Super-Macho).'
    ],
    gabarito: 3,
    comentario: 'A Síndrome de Patau é classicamente associada a defeitos de linha média (holoprosencefalia, fendas centrais) e polidactilia.'
  },
  {
    id: 'm7-p6-q61',
    number: 61,
    temaPrincipal: 'Alterações Cromossômicas Estruturais',
    topicoEspecifico: 'Translocações Recíprocas e Segregação Meiótica',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Um homem fenotipicamente normal descobre, após investigação de abortos de repetição de sua parceira, ser portador de uma translocação recíproca equilibrada entre os cromossomos 4 e 20. Sobre a biologia desse rearranjo e suas consequências, assinale a alternativa correta:',
    alternativas: [
      'O portador equilibrado apresenta perda global de material genético, o que justifica a infertilidade.',
      'Durante a prófase I da meiose, os cromossomos envolvidos formam uma estrutura em cruz para permitir o pareamento das regiões homólogas.',
      'Todos os gametas produzidos por esse indivíduo serão desbalanceados, tornando impossível a geração de prole normal.',
      'A translocação recíproca envolve exclusivamente cromossomos acrocêntricos e a perda de seus braços curtos.',
      'O microarray cromossômico é a técnica padrão-ouro para detectar esse tipo de rearranjo no portador equilibrado.'
    ],
    gabarito: 1,
    comentario: 'Para que os segmentos trocados pareiem com seus homólogos normais na meiose, os quatro cromossomos formam uma configuração em cruz. O microarray não detecta rearranjos equilibrados.'
  },
  {
    id: 'm7-p6-q62',
    number: 62,
    temaPrincipal: 'Alterações Estruturais Complexas',
    topicoEspecifico: 'Isocromossomos e Cromossomos em Anel',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Rearrangeamentos estruturais do cromossomo X podem resultar em fenótipos variáveis, frequentemente associados à Síndrome de Turner. Sobre isocromossomos e cromossomos em anel, assinale a alternativa correta:',
    alternativas: [
      'Um isocromossomo do braço longo do X, i(Xq), resulta em trissomia parcial do braço curto e monossomia do braço longo.',
      'O cromossomo em anel surge pela fusão dos braços curtos de dois cromossomos homólogos.',
      'Pacientes com o cariótipo 46,X,i(Xq) apresentam fenótipo de Turner devido à perda funcional de genes críticos no braço curto (p) do X.',
      'Cromossomos em anel são extremamente estáveis durante as divisões mitóticas, não gerando mosaicismo.',
      'O isocromossomo ocorre por uma divisão longitudinal normal do centrômero durante a anáfase.'
    ],
    gabarito: 2,
    comentario: 'Como genes para crescimento e gônadas estão no braço curto (p) do X, sua perda no isocromossomo q gera os estigmas de Turner. O isocromossomo ocorre por divisão transversal anômala.'
  },
  {
    id: 'm7-p6-q63',
    number: 63,
    temaPrincipal: 'Mosaicismo',
    topicoEspecifico: 'Mecanismo de Origem e Impacto Clínico',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O mosaicismo é definido pela presença de duas ou mais linhagens celulares geneticamente distintas em um mesmo indivíduo. Sobre as bases genéticas deste fenômeno, de acordo com o texto, é correto afirmar:',
    alternativas: [
      'O mosaicismo origina-se obrigatoriamente de um erro na meiose I materna.',
      'Decorre tipicamente de um erro mitótico pós-zigótico, onde linhagens celulares diferentes derivam do mesmo zigoto.',
      'O fenótipo de um indivíduo mosaico é sempre mais grave do que o de um indivíduo com a alteração em todas as células.',
      'Se o erro ocorrer nas primeiras divisões do embrião, a fração corporal acometida tende a ser menor.',
      'O mosaicismo é impossível de ser detectado em exames de sangue periférico.'
    ],
    gabarito: 1,
    comentario: 'O mosaicismo surge de erros mitóticos pós-zigóticos, criando linhagens distintas a partir de um início normal ou alterando uma linhagem já alterada.'
  },
  {
    id: 'm7-p6-q64',
    number: 64,
    temaPrincipal: 'Síndromes Cromossômicas Autossômicas',
    topicoEspecifico: 'Síndrome de Edwards (Trissomia 18)',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A Síndrome de Edwards é uma das trissomias autossômicas compatíveis com o nascimento, porém com prognóstico reservado. Qual conjunto de achados clínicos é mais característico para a suspeita imediata desta síndrome no período neonatal?',
    alternativas: [
      'Hipotonia global, prega palmar única e fendas palpebrais oblíquas.',
      'Hipertonia, mãos com dedos sobrepostos, occipício proeminente e pés em "mata-borrão".',
      'Holoprosencefalia, polidactilia e fenda labiopalatina central.',
      'Estatura elevada, testículos pequenos e firmes e ginecomastia.',
      'Choro agudo semelhante ao miado de gato, microcefalia e hipertelorismo.'
    ],
    gabarito: 1,
    comentario: 'A Trissomia 18 (Edwards) diferencia-se pela hipertonia e os marcos morfológicos descritos (dedos sobrepostos, occipício proeminente, pés em mata-borrão).'
  },
  {
    id: 'm7-p6-q65',
    number: 65,
    temaPrincipal: 'Síndromes dos Cromossomos Sexuais',
    topicoEspecifico: 'Síndrome do Triplo X (47,XXX)',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Síndrome do Triplo X apresenta uma variabilidade clínica marcante, sendo frequentemente subdiagnosticada. Sobre a base biológica dessa "suavidade" fenotípica comparada a outras trissomias, assinale a alternativa correta:',
    alternativas: [
      'A ausência de fenótipo deve-se à inativação completa de dois dos três cromossomos X, sem escape gênico.',
      'O mecanismo de compensação de dose envolve a formação de dois corpúsculos de Barr nas células somáticas.',
      'Todas as pacientes com cariótipo 47,XXX apresentam deficiência intelectual grave e infertilidade.',
      'O cromossomo X extra é eliminado do núcleo durante a primeira semana de desenvolvimento (resgate trissômico obrigatório).',
      'A síndrome ocorre exclusivamente por erros mitóticos pós-zigóticos.'
    ],
    gabarito: 1,
    comentario: 'O número de corpúsculos de Barr é sempre X-1. Em 47,XXX, há dois corpúsculos. A inativação é incompleta, o que explica o fenótipo clínico variável.'
  },
  {
    id: 'm7-p6-q66',
    number: 66,
    temaPrincipal: 'Síndromes dos Cromossomos Sexuais',
    topicoEspecifico: 'Síndrome de Klinefelter (47,XXY)',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Um homem de 28 anos procura assistência médica devido a um quadro de infertilidade. Ao exame físico, observa-se estatura elevada com membros longos, ginecomastia e testículos pequenos e firmes. A análise laboratorial revela testosterona reduzida associada a níveis elevados de FSH e LH. Sobre a fisiopatologia desta condição, assinale a alternativa correta:',
    alternativas: [
      'O quadro clínico resulta de um hipogonadismo hipogonadotrófico, com falha na sinalização hipofisária.',
      'A presença do cromossomo X extra interfere na diferenciação e manutenção dos testículos, levando a uma falha testicular primária.',
      'A estatura elevada é causada exclusivamente pela deficiência de testosterona, sem influência de genes do cromossomo X.',
      'O diagnóstico é frequentemente realizado na infância devido a sinais físicos exuberantes e malformações genitais.',
      'A espermatogênese é preservada na maioria dos casos, sendo a infertilidade causada por obstrução dos ductos eferentes.'
    ],
    gabarito: 1,
    comentario: 'O cromossomo X extra causa degeneração dos túbulos seminíferos e das células de Leydig, caracterizando a falha testicular primária (hipogonadismo hipergonadotrófico).'
  },
  {
    id: 'm7-p6-q67',
    number: 67,
    temaPrincipal: 'Alterações Cromossômicas Estruturais',
    topicoEspecifico: 'Síndrome de Cri-du-chat (5p-)',
    grauImportancia: 'Alto',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A Síndrome de Cri-du-chat é um modelo clássico de deleção cromossômica com fenótipo reconhecível no período neonatal. Sobre as características desta síndrome, é correto afirmar:',
    alternativas: [
      'O choro característico de "miado de gato" deve-se estritamente a um atraso cognitivo grave, sem base anatômica.',
      'A gravidade do comprometimento neurológico é independente do tamanho da região deletada no braço curto do cromossomo 5.',
      'O mecanismo fisiopatológico central é a haploinsuficiência decorrente da perda de genes essenciais na região 5p.',
      'A síndrome é causada por um excesso de material genético (duplicação) no cromossomo 5.',
      'O diagnóstico definitivo pode ser feito apenas clinicamente, dispensando a confirmação citogenética.'
    ],
    gabarito: 2,
    comentario: 'A perda de segmentos cromossômicos leva à haploinsuficiência (dose insuficiente de genes essenciais). O choro tem base anatômica na hipoplasia laríngea.'
  },
  {
    id: 'm7-p6-q68',
    number: 68,
    temaPrincipal: 'Alterações Numéricas',
    topicoEspecifico: 'Poliploidias vs. Aneuploidias',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'As poliploidias representam um erro quantitativo global do genoma, diferindo mecanicamente das aneuploidias. Sobre a origem e as características das poliploidias, assinale a alternativa correta:',
    alternativas: [
      'A triploidia (69 cromossomos) resulta mais frequentemente da não disjunção isolada de um par de homólogos na meiose I.',
      'A tetraploidia (92 cromossomos) surge habitualmente por falha na primeira divisão mitótica do zigoto.',
      'Poliploidias são frequentemente compatíveis com a vida longa, apresentando fenótipos brandos como a Síndrome de Down.',
      'A dispermia (fecundação de um ovócito por dois espermatozoides) é a causa principal de monossomias sexuais.',
      'Triploidias de origem materna (digínicas) costumam apresentar placentas grandes e císticas, semelhantes a molas parciais.'
    ],
    gabarito: 1,
    comentario: 'A tetraploidia costuma advir da falha na primeira divisão mitótica do zigoto (endomitose). Triploidias resultam de erros na fertilização (dispermia) ou gametas diploides.'
  },
  {
    id: 'm7-p6-q69',
    number: 69,
    temaPrincipal: 'Citogenética Molecular',
    topicoEspecifico: 'FISH vs. Microarray Cromossômico',
    grauImportancia: 'Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A escolha da técnica citogenética depende da suspeita clínica e da resolução necessária. Sobre as limitações e indicações destas técnicas, de acordo com o texto, é correto afirmar:',
    alternativas: [
      'O microarray cromossômico é a técnica de escolha para detectar translocações equilibradas e inversões silenciosas.',
      'A técnica de FISH (Hibridização in situ Fluorescente) é um método não direcionado, ideal para triagem genômica total.',
      'O microarray detecta variações no número de cópias (CNVs), sendo superior ao cariótipo para identificar microdeleções submicroscópicas.',
      'Um resultado de microarray normal exclui definitivamente qualquer rearranjo cromossômico no genoma do paciente.',
      'O cariótipo convencional possui resolução suficiente para detectar a maioria das microdeleções associadas ao autismo.'
    ],
    gabarito: 2,
    comentario: 'O microarray tem resolução superior para detectar microalterações (CNVs) invisíveis ao microscópio óptico. Ele não detecta rearranjos equilibrados.'
  },
  {
    id: 'm7-p6-q70',
    number: 70,
    temaPrincipal: 'Fisiopatologia do Abortamento',
    topicoEspecifico: 'Fatores Genéticos e Seleção Natural',
    grauImportancia: 'Muito Alto',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Fatores genéticos constituem a causa número um de abortamento espontâneo no primeiro trimestre. Sobre a relação entre aneuploidias e perda gestacional, assinale a alternativa correta:',
    alternativas: [
      'A maioria das trissomias autossômicas identificadas em abortos é compatível com o nascimento se houver suporte médico adequado.',
      'O abortamento precoce de conceptos aneuploides funciona como um mecanismo de "seleção biológica natural" para gestações inviáveis.',
      'A monossomia X (45,X) é uma condição raramente associada ao abortamento, sendo predominantemente encontrada em nascidos vivos.',
      'Erros genéticos no embrião ocorrem principalmente devido a malformações anatômicas do útero materno.',
      'O risco de abortamento por causas genéticas diminui progressivamente com o aumento da idade materna.'
    ],
    gabarito: 1,
    comentario: 'O aborto precoce atua como filtro biológico para embriões geneticamente inviáveis. A maioria das trissomias autossômicas é incompatível com o desenvolvimento fetal sustentado.'
  },
  {
    id: 'm7-p6-q71',
    number: 71,
    temaPrincipal: 'Fisiopatologia do Abortamento',
    topicoEspecifico: 'Insuficiência do Corpo Lúteo e Suporte de Progesterona',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A manutenção da gestação inicial, antes da plena funcionalidade placentária, depende criticamente do suporte hormonal do corpo lúteo. Sobre a insuficiência lútea como causa de abortamento, assinale a alternativa correta:',
    alternativas: [
      'O corpo lúteo produz estrogénio, que é o principal responsável por reduzir a vascularização endometrial e induzir o parto.',
      'A progesterona estabiliza o endométrio, reduz a contratilidade uterina e favorece a decidualização, criando um ambiente receptivo ao embrião.',
      'A deficiência de progesterona é um evento exclusivamente genético, sem relação com a interface materno-embrionária.',
      'Na insuficiência lútea, o trofoblasto é incapaz de iniciar a nidação, mesmo em ambientes estáveis e anti-inflamatórios.',
      'A suplementação de progesterona é indicada para reverter abortamentos causados por aneuploidias autossómicas graves.'
    ],
    gabarito: 1,
    comentario: 'A progesterona é o "eixo de sustentação", estabilizando a decídua e reduzindo a contractilidade. Ela não reverte perdas causadas por aneuploidias.'
  },
  {
    id: 'm7-p6-q72',
    number: 72,
    temaPrincipal: 'Fisiopatologia do Abortamento',
    topicoEspecifico: 'Fatores Anatómicos Uterinos (Útero Septado)',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'As malformações müllerianas são causas importantes de abortamento de repetição. Entre as alterações anatómicas, o útero septado destaca-se pelo seu impacto na implantação. Qual a base fisiopatológica para a perda gestacional nesta condição?',
    alternativas: [
      'O septo causa uma dilatação precoce e indolor do colo uterino no segundo trimestre.',
      'A cavidade uterina torna-se excessivamente grande, impedindo o contacto do blastocisto com o endométrio.',
      'O septo é composto por tecido frequentemente com vascularização inadequada, o que prejudica o suporte sanguíneo se o embrião se implantar sobre ele.',
      'A presença de um septo induz obrigatoriamente a formação de miomas submucosos que distorcem a cavidade.',
      'O útero septado impede a produção de progesterona pelo corpo lúteo, causando falha hormonal.'
    ],
    gabarito: 2,
    comentario: 'O septo é um tecido fibrótico com má vascularização; a implantação sobre ele leva a falha nutricional e aborto.'
  },
  {
    id: 'm7-p6-q73',
    number: 73,
    temaPrincipal: 'Fisiopatologia do Abortamento',
    topicoEspecifico: 'Incompetência Istmo-Cervical (IIC)',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Incompetência Istmo-Cervical (IIC) é uma causa paradigmática de perda gestacional tardia. Sobre as características clínicas e fisiopatológicas que a distinguem do aborto por causas genéticas, assinale a alternativa correta:',
    alternativas: [
      'A IIC manifesta-se tipicamente no primeiro trimestre com sangramento intenso e dores tipo cólica.',
      'Trata-se de uma falha mecânica onde o colo é incapaz de resistir à pressão intrauterina, levando a uma dilatação silenciosa e indolor.',
      'O diagnóstico clínico baseia-se na presença de contrações uterinas efetivas que precedem o apagamento cervical.',
      'A IIC está associada exclusivamente a embriões com aneuploidias graves, como a trissomia 18.',
      'A perda fetal na IIC ocorre geralmente após a ruptura prematura de membranas causada por infecções do grupo TORCH.'
    ],
    gabarito: 1,
    comentario: 'A IIC é uma falha mecânica de contenção cervical que resulta em dilatação progressiva e silenciosa (indolor) no segundo trimestre.'
  },
  {
    id: 'm7-p6-q74',
    number: 74,
    temaPrincipal: 'Fisiopatologia do Abortamento',
    topicoEspecifico: 'Síndrome do Anticorpo Antifosfolípide (SAAF)',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Síndrome do Anticorpo Antifosfolípide (SAAF) é uma trombofilia adquirida com impacto direto na placentação. De que forma a SAAF contribui para a perda gestacional recorrente?',
    alternativas: [
      'Através da indução de malformações da linha média no embrião, como a holoprosencefalia.',
      'Pela inibição total da produção de hCG pelo sinciciotrofoblasto logo após a fecundação.',
      'Ao promover microtromboses, inflamação e falha no remodelamento das artérias espiraladas, resultando em insuficiência placentária.',
      'Por causar uma hipertrofia excessiva do colo uterino, impedindo a descida do feto no parto.',
      'Pela neutralização direta dos hormónios tireoidianos maternos na circulação fetal.'
    ],
    gabarito: 2,
    comentario: 'Os anticorpos causam microtromboses e impedem o remodelamento das artérias espiraladas, levando à insuficiência placentária e morte fetal.'
  },
  {
    id: 'm7-p6-q75',
    number: 75,
    temaPrincipal: 'Bioética',
    topicoEspecifico: 'Princípios da Bioética e Autonomia da Gestante',
    grauImportancia: 'Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'No contexto da obstetrícia e do diagnóstico fetal, a aplicação dos princípios da bioética exige um equilíbrio complexo. Sobre a autonomia da gestante, de acordo com o texto, é correto afirmar:',
    alternativas: [
      'A gestante deve ser tratada como um meio biológico para a preservação da vida fetal, sem direito a recusa de procedimentos.',
      'A autonomia profissional do médico prevalece sobre qualquer escolha da paciente, independentemente dos limites da lei.',
      'A gestante tem o direito de participar das decisões sobre o seu corpo, receber informação adequada e recusar procedimentos diagnósticos invasivos.',
      'O princípio da justiça distributiva determina que apenas pacientes com alto poder aquisitivo devem ter acesso ao diagnóstico genético.',
      'A autonomia da gestante é anulada em casos de anencefalia fetal, conforme determinado pelo STF.'
    ],
    gabarito: 2,
    comentario: 'A autonomia envolve o consentimento informado, o direito ao saber e a participação nas decisões sobre o próprio corpo.'
  },
  {
    id: 'm7-p6-q76',
    number: 76,
    temaPrincipal: 'Legislação Brasileira e Bioética',
    topicoEspecifico: 'Casos de Aborto não Punido e ADPF 54',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O ordenamento jurídico brasileiro prevê situações específicas em que o aborto não é punido. Sobre estas hipóteses e a sua fundamentação, assinale a alternativa correta:',
    alternativas: [
      'O Código Penal permite a interrupção da gestação em qualquer caso de malformação fetal grave, como a Síndrome de Down.',
      'As três hipóteses legais atuais são: risco de vida materno, gravidez resultante de estupro e anencefalia fetal.',
      'A autorização para interrupção em caso de anencefalia está prevista no texto original do Código Penal de 1940.',
      'O aborto em caso de estupro requer obrigatoriamente a apresentação de uma sentença judicial condenatória do agressor.',
      'A decisão da ADPF 54 pelo STF equiparou legalmente a anencefalia a um defeito estético menor, sem impacto na viabilidade.'
    ],
    gabarito: 1,
    comentario: 'As três hipóteses consolidadas são estupro, risco de vida materno (Código Penal) e anencefalia (STF, 2012).'
  },
  {
    id: 'm7-p6-q77',
    number: 77,
    temaPrincipal: 'Bioética e Ética Profissional',
    topicoEspecifico: 'Objeção de Consciência',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A objeção de consciência é um direito do médico, mas possui limites éticos claros. Segundo o Código de Ética Médica (CEM), o médico NÃO pode exercer o direito de objeção de consciência quando:',
    alternativas: [
      'O procedimento solicitado for o aborto em caso de anencefalia, mesmo havendo outro médico disponível.',
      'Suas convicções religiosas forem contrárias à realização de diagnóstico pré-natal invasivo.',
      'Estiver diante de uma situação de urgência ou emergência, ou quando a recusa puder trazer dano à saúde do paciente e não houver outro médico.',
      'A paciente solicitar o encaminhamento para outro serviço após a recusa inicial do profissional.',
      'A interrupção da gestação for permitida por lei mas o médico considerar o ato imoral.'
    ],
    gabarito: 2,
    comentario: 'O CEM veda a recusa em situações de urgência, ausência de outro médico ou quando houver risco de dano à saúde.'
  },
  {
    id: 'm7-p6-q78',
    number: 78,
    temaPrincipal: 'Bioética e Diagnóstico Pré-Natal',
    topicoEspecifico: 'Diagnóstico de Anencefalia (Resolução CFM 1.989/2012)',
    grauImportancia: 'Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Para a interrupção da gestação em casos de anencefalia, o Conselho Federal de Medicina estabeleceu critérios técnicos rigorosos. Qual o requisito fundamental para o diagnóstico inequívoco de anencefalia segundo a norma vigente?',
    alternativas: [
      'Exame de sangue materno detectando ausência de proteínas cerebrais fetais.',
      'Ultrassonografia realizada a partir da 12ª semana, demonstrando ausência de calota craniana e parênquima cerebral.',
      'Ressonância magnética fetal obrigatoriamente assinada por três neurologistas.',
      'Cariótipo fetal demonstrando monossomia do cromossomo 1.',
      'Presença de batimentos cardíacos fetais abaixo de 60 bpm no primeiro trimestre.'
    ],
    gabarito: 1,
    comentario: 'Conforme a Resolução 1.989/2012, o diagnóstico é via ultrassom a partir da 12ª semana, focando na ausência de calota e parênquima cerebral.'
  },
  {
    id: 'm7-p6-q79',
    number: 79,
    temaPrincipal: 'Bioética e Sigilo Médico',
    topicoEspecifico: 'Atendimento pós-abortamento induzido',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Uma paciente com complicações graves decorrentes de um aborto possivelmente provocado procura atendimento hospitalar. Sobre o dever de sigilo e a conduta ética, assinale a alternativa correta:',
    alternativas: [
      'O médico deve denunciar a paciente à polícia imediatamente, pois o dever legal de informar crimes prevalece sobre o sigilo médico.',
      'O sigilo médico deve ser mantido, e o profissional deve priorizar a assistência, estabilização e acolhimento da paciente, sem agir como agente persecutório.',
      'A Norma Técnica do Ministério da Saúde orienta que o médico deve condicionar o tratamento à confissão da paciente.',
      'O sigilo pode ser quebrado livremente se o médico suspeitar que o aborto foi realizado em condições inseguras.',
      'O dever de confidencialidade não se aplica a factos conhecidos em razão do exercício profissional se envolverem actos ilícitos.'
    ],
    gabarito: 1,
    comentario: 'O sigilo médico (Art. 73 CEM) veda a denúncia da paciente assistida. A prioridade é salvar e acolher.'
  },
  {
    id: 'm7-p6-q80',
    number: 80,
    temaPrincipal: 'Políticas Públicas e Saúde Coletiva',
    topicoEspecifico: 'Mortalidade Materna e Aborto Inseguro no Brasil',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O aborto inseguro é reconhecido como um problema de saúde pública relevante no Brasil. Sobre os dados epidemiológicos e as políticas de saúde descritas no texto, assinale a alternativa correta:',
    alternativas: [
      'As complicações do aborto estão entre as dez causas menos frequentes de morte materna no país.',
      'A razão de mortalidade materna no Brasil em 2021 foi de aproximadamente 30 por 100 mil nascidos vivos.',
      'O sistema de saúde deve oferecer uma resposta técnica, acolhedora e universal, visando reduzir a morbimortalidade associada a perdas gestacionais.',
      'A meta nacional para 2030 é erradicar completamente o aborto espontâneo no primeiro trimestre.',
      'O acolhimento pós-abortamento deve ser tardio e moralizante para desencorajar novas práticas induzidas.'
    ],
    gabarito: 2,
    comentario: 'As políticas públicas devem focar na proteção da vida das mulheres e assistência segura e acolhedora. Complicações do aborto estão entre as principais causas de morte materna.'
  }
];
