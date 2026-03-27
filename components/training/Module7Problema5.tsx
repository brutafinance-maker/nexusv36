import { CTQuestion } from '../../types';

export const P5_QUESTIONS: CTQuestion[] = [
  {
    id: 'm7-p5-q31',
    number: 31,
    temaPrincipal: 'Gemelaridade e Diagnóstico Ultrassonográfico',
    topicoEspecifico: 'Corionicidade e Sinais de Rastreamento',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Uma gestante de 12 semanas realiza ultrassonografia de primeiro trimestre. O examinador identifica dois fetos do sexo feminino, com uma membrana divisória fina inserindo-se na placenta em um ângulo de 90°, sem extensão de tecido placentário entre as membranas. Com base nos conceitos da Apostila 4, qual o diagnóstico de corionicidade e o sinal correspondente?',
    alternativas: [
      'Dicoriônica-diamniótica (DC-DA); Sinal do Lambda.',
      'Monocoriônica-diamniótica (MC-DA); Sinal do T.',
      'Monocoriônica-monoamniótica (MC-MA); Ausência de membrana.',
      'Dicoriônica-diamniótica (DC-DA); Sinal do T.',
      'Monocoriônica-diamniótica (MC-DA); Sinal do Lambda.'
    ],
    gabarito: 1,
    comentario: 'O sinal descrito (membrana fina, ângulo de 90°, sem tecido entre as lâminas) é o Sinal do T, patognomônico de gestações monocoriônicas-diamnióticas. O Sinal do Lambda (ou Twin Peak) indicaria dicorionicidade por apresentar uma cunha de tecido placentário entre os âmnios.'
  },
  {
    id: 'm7-p5-q32',
    number: 32,
    temaPrincipal: 'Complicações da Monocorionicidade',
    topicoEspecifico: 'Síndrome de Transfusão Feto-Fetal (STFF)',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Síndrome de Transfusão Feto-Fetal (STFF) é regida pelo desequilíbrio das anastomoses vasculares placentárias. Sobre a fisiopatologia e o estadiamento desta condição, assinale a alternativa correta:',
    alternativas: [
      'As anastomoses arterioarteriais (AA) são as principais responsáveis pelo fluxo unidirecional que causa a síndrome.',
      'O gêmeo doador apresenta hipervolemia, poliúria e risco de insuficiência cardíaca de alto débito.',
      'O Estágio III de Quintero é definido pela ausência de visualização da bexiga do gêmeo doador.',
      'As anastomoses arteriovenosas (AV) são profundas, unidirecionais e o motor da patologia quando descompensadas.',
      'A amniodrenagem é o tratamento de escolha definitivo, pois elimina as conexões vasculares.'
    ],
    gabarito: 3,
    comentario: 'As anastomoses AV são as responsáveis pela STFF. As AA são protetoras por serem bidirecionais e superficiais. O doador é o feto hipovolêmico e oligúrico. O Estágio III é Doppler alterado; a bexiga não visualizada define o Estágio II. O tratamento padrão-ouro é a fotocoagulação a laser.'
  },
  {
    id: 'm7-p5-q33',
    number: 33,
    temaPrincipal: 'Classificação Patogênica de Malformações',
    topicoEspecifico: 'Malformação vs. Disrupção vs. Deformação',
    grauImportancia: 'Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Diferenciar o mecanismo de origem de uma anomalia é vital para o aconselhamento genético. Relacione o evento clínico com sua categoria patogênica conforme a Apostila 3:\n\nI. Pé torto congênito por compressão devido a oligoâmnio severo.\nII. Amputação de falanges por bridas amnióticas.\nIII. Cardiopatia congênita por mutação em gene de septação.\n\nAs categorias são, respectivamente:',
    alternativas: [
      'I-Disrupção; II-Deformação; III-Malformação.',
      'I-Malformação; II-Disrupção; III-Displasia.',
      'I-Deformação; II-Disrupção; III-Malformação.',
      'I-Displasia; II-Deformação; III-Disrupção.',
      'I-Deformação; II-Malformação; III-Disrupção.'
    ],
    gabarito: 2,
    comentario: 'I é Deformação (força mecânica externa em tecido normal). II é Disrupção (destruição de estrutura normal por fator externo). III é Malformação (defeito intrínseco do desenvolvimento).'
  },
  {
    id: 'm7-p5-q34',
    number: 34,
    temaPrincipal: 'Erros Inatos do Metabolismo (EIM)',
    topicoEspecifico: 'Galactosemia Clássica e Fenilcetonúria',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Um recém-nascido, após 48 horas de vida e início da amamentação, apresenta icterícia colestática, hepatomegalia e evolui com sepse grave. A equipe suspeita de um EIM. Com base na Apostila 3, qual a hipótese mais provável e qual o agente infeccioso classicamente associado a essa condição?',
    alternativas: [
      'Fenilcetonúria; Staphylococcus aureus.',
      'Galactosemia Clássica; Escherichia coli.',
      'Doença de Pompe; Streptococcus agalactiae.',
      'Leucinose; Listeria monocytogenes.',
      'Galactosemia Clássica; Pseudomonas aeruginosa.'
    ],
    gabarito: 1,
    comentario: 'A Galactosemia Clássica manifesta-se logo após a ingestão de leite com icterícia e insuficiência hepática. A sepse por E. coli é uma complicação clássica, pois a galactose acumulada inibe a função dos neutrófilos.'
  },
  {
    id: 'm7-p5-q35',
    number: 35,
    temaPrincipal: 'Teratologia Médica',
    topicoEspecifico: 'Talidomida e Período Crítico',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A tragédia da talidomida consolidou os princípios da teratologia moderna. Sobre este agente e seus efeitos descritos na Apostila 1, assinale a alternativa correta:',
    alternativas: [
      'A talidomida causa focomelia apenas se ingerida por mais de 30 dias consecutivos.',
      'O período crítico de sensibilidade máxima é entre a 8ª e a 12ª semana gestacional.',
      'O mecanismo envolve a ligação ao cereblon, interferindo no desenvolvimento dos membros e na angiogênese.',
      'No Brasil, seu uso é proibido para qualquer finalidade clínica desde 1961.',
      'A talidomida atua induzindo mutações permanentes no DNA das células germinativas maternas.'
    ],
    gabarito: 2,
    comentario: 'A talidomida liga-se ao cereblon. O período crítico é curtíssimo (20-36 dias pós-fecundação), e uma dose única pode ser suficiente. No Brasil, ainda é usada para hanseníase sob controle rigoroso. Ela é teratogênica (afeta o feto), não necessariamente mutagênica germinativa.'
  },
  {
    id: 'm7-p5-q36',
    number: 36,
    temaPrincipal: 'Fenômenos Epigenéticos',
    topicoEspecifico: 'Imprinting Genômico (Prader-Willi e Angelman)',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A região 15q11-q13 é o exemplo clássico de imprinting genômico. Se um indivíduo herda uma deleção nesta região proveniente do alelo materno, qual síndrome ele desenvolverá e qual a característica comportamental marcante?',
    alternativas: [
      'Síndrome de Prader-Willi; Hiperfagia compulsiva.',
      'Síndrome de Angelman; Comportamento feliz com risos frequentes ("anjo feliz").',
      'Síndrome de Smith-Magenis; Inversão do ciclo da melatonina.',
      'Síndrome de Angelman; Hiperfagia e obesidade.',
      'Síndrome de Prader-Willi; Hipotonia neonatal grave.'
    ],
    gabarito: 1,
    comentario: 'A inativação ou deleção do alelo materno (onde o gene UBE3A é expresso) causa a Síndrome de Angelman. Prader-Willi decorre da deleção do alelo paterno.'
  },
  {
    id: 'm7-p5-q37',
    number: 37,
    temaPrincipal: 'Teratologia Infecciosa',
    topicoEspecifico: 'Toxoplasmose e Tríade/Tétrade',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Na diferenciação diagnóstica por neuroimagem entre Toxoplasmose Congênita e Citomegalovírus (CMV), o padrão de calcificações intracranianas é um divisor de águas. De acordo com a Apostila 1, como se apresentam essas calcificações?',
    alternativas: [
      'Toxoplasmose: periventriculares; CMV: difusas pelo parênquima.',
      'Toxoplasmose: apenas no cerebelo; CMV: corticais.',
      'Toxoplasmose: difusas; CMV: periventriculares.',
      'Ambas apresentam padrão periventricular idêntico.',
      'Ambas apresentam padrão difuso, diferenciando-se apenas pela presença de catarata.'
    ],
    gabarito: 2,
    comentario: 'A Toxoplasmose apresenta calcificações difusas. O CMV apresenta tropismo pelas células periventriculares, gerando calcificações periventriculares.'
  },
  {
    id: 'm7-p5-q38',
    number: 38,
    temaPrincipal: 'Gemelaridade Monozigótica',
    topicoEspecifico: 'Cronologia da Divisão Embrionária',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'Se a divisão espontânea do embrioblasto ocorrer entre o 8º e o 12º dia pós-fecundação (após a formação do âmnio), qual será a configuração dos anexos embrionários?',
    alternativas: [
      'Dicoriônica-diamniótica (DC-DA).',
      'Monocoriônica-diamniótica (MC-DA).',
      'Monocoriônica-monoamniótica (MC-MA).',
      'Gêmeos conjuntos (siameses).',
      'Feto papiráceo.'
    ],
    gabarito: 2,
    comentario: 'Divisão entre 8-12 dias ocorre após o âmnio estar formado, resultando em ambos os fetos em um único saco (MC-MA). Divisão após o 13º dia gera gêmeos conjuntos.'
  },
  {
    id: 'm7-p5-q39',
    number: 39,
    temaPrincipal: 'Princípios da Teratogênese',
    topicoEspecifico: 'Lei do "Tudo ou Nada"',
    grauImportancia: 'Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'O período pré-embrionário (0 a 2 semanas após a fecundação) é regido pela lei do "tudo ou nada". Isso significa que a exposição a um teratógeno neste período:',
    alternativas: [
      'Causará obrigatoriamente fenda palatina ou microcefalia.',
      'Levará a malformações estruturais leves se a dose for baixa.',
      'Resultará em morte embrionária ou em desenvolvimento normal (recuperação).',
      'É o período de maior risco para malformações cardíacas conotruncais.',
      'Não tem qualquer efeito, pois a placenta ainda não está formada.'
    ],
    gabarito: 2,
    comentario: 'No estágio pré-implantação, o embrião ou morre por dano massivo ou as células totipotentes restantes compensam o dano, permitindo desenvolvimento normal. Malformações estruturais graves surgem no período de organogênese (3-8 semanas).'
  },
  {
    id: 'm7-p5-q40',
    number: 40,
    temaPrincipal: 'Epidemiologia e Reprodução Assistida',
    topicoEspecifico: 'Impacto da FIV na Gemelaridade',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'As Técnicas de Reprodução Assistida (TRA) alteraram a epidemiologia da gemelaridade. Sobre esse impacto, analise as afirmações da Apostila 4 e escolha a correta:',
    alternativas: [
      'A FIV aumenta apenas a taxa de gêmeos dizigóticos devido à transferência de múltiplos embriões.',
      'A FIV triplica a taxa de gêmeos monozigóticos (de 4:1000 para ~12:1000) por fatores como a micromanipulação da zona pelúcida.',
      'A gemelaridade monozigótica é um evento puramente genético e não sofre influência de fatores externos como o cultivo em laboratório.',
      'Gêmeos têm o mesmo risco de mortalidade neonatal que gestações únicas (singletons).',
      'A raça negra africana tem a menor taxa de gemelaridade espontânea do mundo.'
    ],
    gabarito: 1,
    comentario: 'A FIV aumenta a taxa de MZ em 2 a 3 vezes. Fatores como a eclosão assistida (hatching) e cultura prolongada até blastocisto facilitam a divisão do embrião. O risco de morte neonatal em gêmeos é 7 vezes maior que em singletons. A raça negra africana (Iorubá) tem a maior taxa mundial.'
  },
  {
    id: 'm7-p5-q41',
    number: 41,
    temaPrincipal: 'Gemelaridade e Complicações Vasculares',
    topicoEspecifico: 'Sequência TRAP (Gêmeo Acárdico)',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Sequência de Perfusão Arterial Reversa (TRAP), também conhecida como gêmeo acárdico, é uma complicação rara e exclusiva de gestações monocoriônicas. Sobre a fisiopatologia e as repercussões para os conceptos envolvidos, assinale a alternativa correta:',
    alternativas: [
      'O gêmeo acárdico desenvolve estruturas cefálicas normais, mas carece de membros inferiores devido à hipóxia.',
      'O gêmeo "bomba" sustenta a circulação de ambos os corpos, o que o predispõe à insuficiência cardíaca de alto débito e risco de morte intrauterina de aproximadamente 50% sem tratamento.',
      'A perfusão no gêmeo acárdico ocorre de forma anterógrada através de uma anastomose venovenosa superficial.',
      'O gêmeo acárdico é considerado viável após o nascimento se houver intervenção cirúrgica imediata para implante de marcapasso.',
      'O tratamento de escolha é a amniodrenagem seriada para reduzir a sobrecarga volêmica no gêmeo bomba.'
    ],
    gabarito: 1,
    comentario: 'O gêmeo "bomba" (com coração normal) precisa bombear sangue para si e para o gêmeo acéfalo/acárdico, levando à exaustão cardíaca. A perfusão é reversa (retrógrada) via uma anastomose arterioarterial (AA).'
  },
  {
    id: 'm7-p5-q42',
    number: 42,
    temaPrincipal: 'Tipos de Malformações Congênitas',
    topicoEspecifico: 'Terminologia Morfológica (Agenesia, Aplasia e Hipoplasia)',
    grauImportancia: 'Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A correta nomenclatura das anomalias estruturais é fundamental para a descrição diagnóstica. Com base nos conceitos da Apostila 3, identifique a alternativa que define corretamente os termos morfológicos:',
    alternativas: [
      'Aplasia refere-se ao desenvolvimento incompleto de um órgão, resultando em tamanho menor, mas com arquitetura preservada.',
      'Agenesia é a ausência completa de um órgão ou estrutura decorrente da falha no surgimento do seu primórdio embrionário.',
      'Hipoplasia ocorre quando o primórdio se inicia, mas não se desenvolve, embora elementos de suporte possam estar presentes.',
      'A síndrome de Potter (agenesia renal bilateral) é um exemplo de hipoplasia orgânica compatível com a vida.',
      'A microcefalia verdadeira é classificada como uma aplasia do sistema nervoso central.'
    ],
    gabarito: 1,
    comentario: 'A Agenesia é a falha completa de formação do primórdio (ex: não surge o broto uretérico). Aplasia é quando o primórdio inicia mas não se desenvolve. Hipoplasia é o desenvolvimento incompleto (tamanho menor).'
  },
  {
    id: 'm7-p5-q43',
    number: 43,
    temaPrincipal: 'Erros Inatos do Metabolismo (EIM)',
    topicoEspecifico: 'Fenilcetonúria (PKU) Materna',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Mulheres com fenilcetonúria (PKU) que não mantêm controle dietético rigoroso antes e durante a gestação apresentam alto risco de ter filhos com a chamada embriofetopatia por PKU materna. Sobre essa condição, é correto afirmar:',
    alternativas: [
      'O feto herdará obrigatoriamente a PKU da mãe, independentemente do genótipo paterno.',
      'Os altos níveis de fenilalanina materna atravessam a placenta e atuam como um teratógeno potente, causando microcefalia, cardiopatia congênita e deficiência intelectual no feto.',
      'O tratamento do recém-nascido com dieta isenta de fenilalanina reverte as malformações estruturais adquiridas intraútero.',
      'A PKU materna afeta apenas o metabolismo hepático fetal, sem causar danos ao neurodesenvolvimento.',
      'O teste do pezinho (triagem neonatal) é suficiente para prevenir as lenções da PKU materna no feto.'
    ],
    gabarito: 1,
    comentario: 'Este é um caso de teratogênese metabólica: a fenilalanina alta no sangue da mãe é tóxica para o desenvolvimento dos órgãos fetais, causando microcefalia e DI.'
  },
  {
    id: 'm7-p5-q44',
    number: 44,
    temaPrincipal: 'Teratogênese Biológica',
    topicoEspecifico: 'Síndrome do Zika Vírus Congênita',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'O surto de microcefalia no Brasil (2015-2016) revelou o potencial teratogênico do Zika Vírus. Sobre as características desta síndrome infecciosa congênita, assinale a alternativa correta:',
    alternativas: [
      'O Zika vírus causa malformações apenas se a infecção ocorrer nas primeiras 2 semanas de gestação (lei do tudo ou nada).',
      'A síndrome é caracterizada por microcefalia grave, calcificações intracranianas (frequentemente subcorticais), artrogripose e lesões oculares.',
      'Ao contrário do CMV, o Zika vírus não atravessa a barreira placentária, infectando o feto apenas durante o parto.',
      'As calcificações intracranianas no Zika vírus seguem o padrão periventricular idêntico ao da toxoplasmose.',
      'O principal mecanismo de ação do vírus é a supressão da apoptose neuronal, levando à megalencefalia.'
    ],
    gabarito: 1,
    comentario: 'Além da microcefalia, a artrogripose (contraturas articulares) e calcificações cerebrais são marcas da síndrome congênita. O vírus causa morte de células progenitoras neurais.'
  },
  {
    id: 'm7-p5-q45',
    number: 45,
    temaPrincipal: 'Sistema Respiratório e Malformações',
    topicoEspecifico: 'Hérnia Diafragmática Congênita (HDC)',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Hérnia Diafragmática Congênita (HDC) é um defeito estrutural com graves repercussões funcionais. De acordo com a Apostila 3, a principal causa de mortalidade neonatal nesses pacientes é:',
    alternativas: [
      'A obstrução intestinal causada pela herniação das alças para o tórax.',
      'A falha na septação cardíaca frequentemente associada ao defeito.',
      'A hipoplasia pulmonar bilateral e a hipertensão pulmonar persistente resultantes da compressão mecânica intrauterina.',
      'A ausência de inervação do diafragma pelo nervo frênico.',
      'A infecção pulmonar recorrente devida à agenesia de macrófagos alveolares.'
    ],
    gabarito: 2,
    comentario: 'As vísceras no tórax impedem o crescimento dos pulmões (hipoplasia). Ao nascer, o bebê não consegue realizar trocas gasosas e apresenta hipertensão pulmonar.'
  },
  {
    id: 'm7-p5-q46',
    number: 46,
    temaPrincipal: 'Fenómenos Especiais da Gemelaridade',
    topicoEspecifico: 'Síndrome do Gêmeo Evanescente (Vanishing Twin) e NIPT',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'Em cerca de 20-30% das gestações gemelares diagnosticadas precocemente, ocorre a regressão espontânea de um dos sacos gestacionais. Sobre as implicações clínicas deste fenómeno, assinale a alternativa correta:',
    alternativas: [
      'O gémeo sobrevivente é frequentemente afetado por sequelas neurológicas graves em gestações dicoriónicas.',
      'A causa mais comum da regressão é a Síndrome de Transfusão Feto-Fetal (STFF) aguda de primeiro trimestre.',
      'O DNA do embrião que regrediu pode permanecer na circulação materna, podendo causar resultados falso-positivos em testes de rastreio pré-natal não invasivo (NIPT).',
      'O fenómeno do gémeo evanescente ocorre exclusivamente em gestações resultantes de técnicas de reprodução assistida.',
      'A reabsorção do embrião regredido causa obrigatoriamente hemorragia materna grave e parto prematuro imediato do sobrevivente.'
    ],
    gabarito: 2,
    comentario: 'O DNA livre do gémeo que parou de se desenvolver permanece na circulação materna e pode ser detetado no NIPT, levando a falsos positivos.'
  },
  {
    id: 'm7-p5-q47',
    number: 47,
    temaPrincipal: 'Malformações Estruturais do Sistema Digestivo',
    topicoEspecifico: 'Atresia Duodenal e Correlação Genética',
    grauImportancia: 'Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A atresia duodenal é uma obstrução total do lúmen do duodeno que se manifesta frequentemente ao ultrassom pré-natal. Sobre esta malformação, de acordo com a Apostila 3, assinale a alternativa correta:',
    alternativas: [
      'É caracterizada pelo "sinal da bolha única" no estômago, sem dilatação do duodeno.',
      'Decorre de um acidente vascular isquémico focal durante o período fetal tardio.',
      'Está fortemente associada à Trissomia 21 (Síndrome de Down), ocorrendo em aproximadamente 30% dos casos.',
      'A causa embriológica primária é o excesso de apoptose durante a formação do divertículo hepático.',
      'Manifesta-se no recém-nascido exclusivamente através de vómitos em jato não biliosos.'
    ],
    gabarito: 2,
    comentario: 'Cerca de 30% dos fetos com atresia duodenal têm Trissomia 21. O sinal clássico é o de "dupla bolha" (estômago e duodeno dilatados).'
  },
  {
    id: 'm7-p5-q48',
    number: 48,
    temaPrincipal: 'Malformações Metabólicas (EIM)',
    topicoEspecifico: 'Glicogenose Tipo II (Doença de Pompe)',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A Doença de Pompe é uma glicogenose que se distingue das demais por ser também uma doença de depósito lisossómico. Sobre a sua forma infantil clássica, assinale a alternativa correta:',
    alternativas: [
      'Caracteriza-se por hipoglicemia grave e hepatomegalia gigante, sem envolvimento muscular.',
      'É causada pela deficiência da enzima glicose-6-fosfatase no retículo endoplasmático.',
      'Apresenta-se com cardiomiopatia hipertrófica grave, hipotonia severa e insuficiência respiratória, sendo frequentemente letal antes do primeiro ano de vida se não for tratada.',
      'O tratamento baseia-se exclusivamente no uso de amido de milho cru como fonte de glicose lenta.',
      'É uma doença de herança ligada ao cromossoma X, afetando apenas indivíduos do sexo masculino.'
    ],
    gabarito: 2,
    comentario: 'Sendo uma deficiência lisossómica, o glicogénio acumula-se nos lisossomas de todos os tecidos, afetando gravemente o coração e os músculos esqueléticos (cardiomiopatia hipertrófica).'
  },
  {
    id: 'm7-p5-q49',
    number: 49,
    temaPrincipal: 'Teratogênese Química',
    topicoEspecifico: 'Síndrome Fetal da Varfarina',
    grauImportancia: 'Alta',
    nivelDificuldade: '🔴 Difícil',
    enunciado: 'A varfarina é um anticoagulante oral que pode causar uma embriopatia característica quando administrada durante a gestação. As principais malformações estruturais associadas a este agente são:',
    alternativas: [
      'Focomelia e amélia dos membros superiores.',
      'Hipoplasia nasal e calcificações epifisárias pontilhadas (condrodisplasia pontilhada).',
      'Microtia, anotia e defeitos cardíacos conotruncais.',
      'Espinha bífida e anencefalia por inibição da diidrofolato redutase.',
      'Catarata bilateral, surdez e persistência do canal arterial.'
    ],
    gabarito: 1,
    comentario: 'A varfarina interfere na carboxilação de proteínas ósseas, levando a calcificações anormais (pontilhadas) e hipoplasia do osso nasal.'
  },
  {
    id: 'm7-p5-q50',
    number: 50,
    temaPrincipal: 'Aberrações Cromossómicas Numéricas',
    topicoEspecifico: 'Síndrome de Turner (45,X)',
    grauImportancia: 'Muito Alta',
    nivelDificuldade: '🟡 Médio',
    enunciado: 'A Síndrome de Turner é a única monossomia viável em humanos. Sobre o fenótipo e as complicações clínicas desta condição, assinale a alternativa correta:',
    alternativas: [
      'Caracteriza-se por estatura elevada, ginecomastia e azoospermia.',
      'Apresenta-se clinicamente com pescoço alado, baixa estatura, disgenesia gonadal e cardiopatias como a coarctação da aorta.',
      'Ocorre exclusivamente devido à não-disjunção meiótica materna associada à idade avançada.',
      'A maioria dos fetos com cariótipo 45,X sobrevive até ao nascimento, apresentando baixa taxa de abortamento espontâneo.',
      'É frequentemente diagnosticada apenas na vida adulta devido à infertilidade em homens fenotípicos.'
    ],
    gabarito: 1,
    comentario: 'São marcos clássicos do fenótipo feminino Turner: linfedema fetal que gera o pescoço alado, falência ovariana precoce (disgenesia) e baixa estatura. A monossomia X tem letalidade intrauterina altíssima (~99%).'
  }
];
