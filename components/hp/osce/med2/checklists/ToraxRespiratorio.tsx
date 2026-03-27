import React from 'react';
import InteractiveChecklist, { ChecklistSection } from './InteractiveChecklist';

const ToraxRespiratorio: React.FC = () => {
  const sections: ChecklistSection[] = [
    {
      title: "Passos Iniciais",
      items: [
        { id: "tr_init_1", label: "Higienizar as mãos" },
        { id: "tr_init_2", label: "Apresentar-se ao paciente" },
        { id: "tr_init_3", label: "Explicar brevemente o exame ao paciente" },
        { id: "tr_init_4", label: "Solicitar a permissão do paciente para realização do exame" },
        { id: "tr_init_5", label: "Posicionar o paciente (orientar a retirada das vestimentas e acomodar na maca ou cadeira)" }
      ]
    },
    {
      title: "Inspeção Estática",
      items: [
        { id: "tr_ins_est_1", label: "Observar globalmente o tórax anterior e posterior" },
        { id: "tr_ins_est_2", label: "Tórax atípico (diâmetro L-L = 2x o A-P)" },
        { id: "tr_ins_est_3", label: "Pele normocorada/hidratada, ausência de cicatrizes e pelos característicos" },
        { id: "tr_ins_est_4", label: "Ausência de abaulamentos e retrações na parede torácica" }
      ]
    },
    {
      title: "Inspeção Dinâmica",
      items: [
        { id: "tr_ins_din_1", label: "Observar a dinâmica respiratória por um minuto" },
        { id: "tr_ins_din_2", label: "Ritmo fisiológico (ausência de Biot, Cheynes-Stokes, etc.)" },
        { id: "tr_ins_din_3", label: "Frequência respiratória (Eupneico: 16-20 irpm)" },
        { id: "tr_ins_din_4", label: "Tipo respiratório (Toraco-abdominal em homens/crianças; Costal-superior em mulheres)" },
        { id: "tr_ins_din_5", label: "Amplitude fisiológica, sem uso de musculatura acessória ou tiragens" }
      ]
    },
    {
      title: "Palpação",
      items: [
        { id: "tr_palp_1", label: "Sensibilidade: dedilhamento ou mão espalmada (sem pontos dolorosos)" },
        { id: "tr_palp_2", label: "Elasticidade: compressões bimanuais (L-L e A-P em ápices e bases)" },
        { id: "tr_palp_3", label: "Expansibilidade (Manobra de Ruault): prega cutânea com polegares em ápices e bases" },
        { id: "tr_palp_4", label: "Frêmito toracovocal (FTV): pedir para dizer '33' e palpar com região hipotenar" },
        { id: "tr_palp_5", label: "Seguir esquema de escadinha grega (3 pares anterior, 4 pares posterior)" }
      ]
    },
    {
      title: "Percussão",
      items: [
        { id: "tr_perc_1", label: "Técnica plexímetro-plexor seguindo esquema de escadinha grega" },
        { id: "tr_perc_2", label: "Som claro pulmonar na área de parênquima" },
        { id: "tr_perc_3", label: "Submaciço em zonas de transição e maciço em áreas cardíaca/hepática" }
      ]
    },
    {
      title: "Ausculta",
      items: [
        { id: "tr_ausc_1", label: "Higienizar, aquecer e usar o diafragma do estetoscópio" },
        { id: "tr_ausc_2", label: "Pedir para expirar com lábios entreabertos e abraçar-se para ausculta posterior" },
        { id: "tr_ausc_3", label: "Posicionar nos espaços intercostais (mesmos focos da percussão)" },
        { id: "tr_ausc_4", label: "Identificar: Som traqueal, brônquico, broncovesicular e murmúrio vesicular" },
        { id: "tr_ausc_5", label: "Ruídos adventícios ausentes" }
      ]
    },
    {
      title: "Passos Finais",
      items: [
        { id: "tr_end_1", label: "Avisar sobre o fim da avaliação e ausência de alterações" },
        { id: "tr_end_2", label: "Pedir para vestir-se e agradecer a cooperatividade" },
        { id: "tr_end_3", label: "Fazer orientações de saúde" },
        { id: "tr_end_4", label: "Realizar o registro das informações no prontuário" },
        { id: "tr_end_5", label: "Lavar as mãos" }
      ]
    }
  ];

  return (
    <InteractiveChecklist 
      exameId="torax_respiratorio"
      title="Tórax Respiratório"
      description="Guia interativo para o exame físico respiratório."
      category="Exame Físico"
      sections={sections}
    />
  );
};

export default ToraxRespiratorio;
