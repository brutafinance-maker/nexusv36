import React from 'react';
import InteractiveChecklist, { ChecklistSection } from './InteractiveChecklist';

const AbdomeFisiologico: React.FC = () => {
  const sections: ChecklistSection[] = [
    {
      title: "Passos Iniciais",
      items: [
        { id: "af_init_1", label: "Higienizar as mãos" },
        { id: "af_init_2", label: "Apresentar-se ao paciente" },
        { id: "af_init_3", label: "Explicar brevemente o exame ao paciente" },
        { id: "af_init_4", label: "Solicitar a permissão do paciente para realização do exame" },
        { id: "af_init_5", label: "Posicionar o paciente (orientar a retirada das vestimentas e acomodar na maca)" }
      ]
    },
    {
      title: "Inspeção",
      items: [
        { id: "af_insp_1", label: "Observar frontal e tangencial o abdome e sua divisão em quatro quadrantes (QSD, QID, QSE, QIE)" },
        { id: "af_insp_2", label: "Abdome atípico, ausência de movimentos peristálticos visíveis e pulsação epigástrica" },
        { id: "af_insp_3", label: "Pele normocorada/hidratada e pelos distribuídos característicos" },
        { id: "af_insp_4", label: "Ausência de abaulamentos, retrações e cicatriz umbilical normal" },
        { id: "af_insp_5", label: "Sem equimose nos flancos ou periumbilical" },
        { id: "af_insp_6", label: "Ausência de circulação colateral (porta ou veia cava inferior)" },
        { id: "af_insp_7", label: "Ausência de herniações e diástase abdominal (Manobra de Valsalva e Smith-Bates)" }
      ]
    },
    {
      title: "Ausculta",
      items: [
        { id: "af_ausc_1", label: "Higienizar, aquecer e usar o diafragma do estetoscópio" },
        { id: "af_ausc_2", label: "Posicionar o aparelho em cada quadrante (1 a 2 min)" },
        { id: "af_ausc_3", label: "Auscultar contornando o abdômen na forma de espiral/caracol" },
        { id: "af_ausc_4", label: "Ausculta da aorta abdominal (epigástro) e artérias renais (3cm lateral)" },
        { id: "af_ausc_5", label: "Ruídos hidroaéreos normoativos (5-34/min) e ausência de sopros" }
      ]
    },
    {
      title: "Percussão",
      items: [
        { id: "af_perc_1", label: "Técnica plexímetro-plexor (digitodigital)" },
        { id: "af_perc_2", label: "Perguntar ao paciente a presença de pontos dolorosos" },
        { id: "af_perc_3", label: "Percutir os quatro quadrantes" },
        { id: "af_perc_4", label: "Som timpânico (timpanismo) universalmente presente" }
      ]
    },
    {
      title: "Hepatimetria e Traube",
      items: [
        { id: "af_hep_1", label: "Delimitar lobo direito (percussão crânio-caudal e caudal-cranial na LHC)" },
        { id: "af_hep_2", label: "Delimitar lobo esquerdo (linha mediana abaixo do xifoide)" },
        { id: "af_hep_3", label: "Som maciço/submaciço (Lobo esquerdo 4-8cm; Lobo direito 6-12cm)" },
        { id: "af_traube_1", label: "Percussão do espaço de traube (abaixo do 6º EIC esquerdo)" },
        { id: "af_traube_2", label: "Som timpânico na região" }
      ]
    },
    {
      title: "Palpação",
      items: [
        { id: "af_palp_1", label: "Palpação superficial (mão espalmada nos 4 quadrantes)" },
        { id: "af_palp_2", label: "Palpação profunda (bimanual, movimentos de garra)" },
        { id: "af_palp_3", label: "Parede íntegra, ausência de dor, pulsações, hérnias, massas ou diástase" },
        { id: "af_palp_4", label: "Palpação do fígado (Manobra de Mathieu ou Lemos-Torres)" },
        { id: "af_palp_5", label: "Borda hepática fina, lisa, fibroelástica e sem dor" }
      ]
    },
    {
      title: "Manobras Especiais",
      items: [
        { id: "af_man_1", label: "Ponto Cístico/Biliar (Sinal de Murphy negativo)" },
        { id: "af_man_2", label: "Ponto Apendicular/Mc Burney (Sinal de Blumberg negativo)" },
        { id: "af_man_3", label: "Ponto esplênico (Sem massas palpáveis)" },
        { id: "af_man_4", label: "Punho percussão indireta renal (Sinal de Giordano negativo)" }
      ]
    },
    {
      title: "Passos Finais",
      items: [
        { id: "af_end_1", label: "Avisar sobre o fim da avaliação e ausência de alterações" },
        { id: "af_end_2", label: "Pedir para vestir-se e agradecer a cooperatividade" },
        { id: "af_end_3", label: "Fazer orientações de saúde" },
        { id: "af_end_4", label: "Realizar o registro das informações no prontuário" },
        { id: "af_end_5", label: "Lavar as mãos" }
      ]
    }
  ];

  return (
    <InteractiveChecklist 
      exameId="abdome_fisiologico"
      title="Abdome Fisiológico"
      description="Guia interativo para o exame físico do abdome."
      category="Exame Físico"
      sections={sections}
    />
  );
};

export default AbdomeFisiologico;
