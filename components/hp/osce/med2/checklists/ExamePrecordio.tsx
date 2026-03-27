import React from 'react';
import InteractiveChecklist, { ChecklistSection } from './InteractiveChecklist';

const ExamePrecordio: React.FC = () => {
  const sections: ChecklistSection[] = [
    {
      title: "Passos Iniciais",
      items: [
        { id: "ep_init_1", label: "Higienizar as mãos" },
        { id: "ep_init_2", label: "Apresentar-se ao paciente" },
        { id: "ep_init_3", label: "Explicar brevemente o exame ao paciente" },
        { id: "ep_init_4", label: "Solicitar a permissão do paciente para realização do exame" },
        { id: "ep_init_5", label: "Posicionar o paciente (orientar a retirada das vestimentas e acomodar na maca)" }
      ]
    },
    {
      title: "Inspeção",
      items: [
        { id: "ep_insp_1", label: "Observar a região precordial na posição tangencial e frontal" },
        { id: "ep_insp_2", label: "Ausência de abaulamentos ou depressões na região do precórdio" },
        { id: "ep_insp_3", label: "Ausência de pulsação epigástrica, levantamento em massa ou movimento em Báscula" },
        { id: "ep_insp_4", label: "Ausência de turgência jugular com cabeceira a 45°" },
        { id: "ep_insp_5", label: "Ausência de pulsação visível no ictus cordis" }
      ]
    },
    {
      title: "Palpação",
      items: [
        { id: "ep_palp_1", label: "Localizar o ictus cordis (5º EIC na LHC) com as mãos espalmadas" },
        { id: "ep_palp_2", label: "Avaliar extensão (2 polpas), amplitude e intensidade do ictus" },
        { id: "ep_palp_3", label: "Investigar mobilidade do ictus (decúbito lateral esquerdo, deslocamento de 2cm)" },
        { id: "ep_palp_4", label: "Palpação dos focos cardíacos (região hipotenar): Aórtico, Pulmonar, Aórtico acessório, Tricúspide, Mitral" },
        { id: "ep_palp_5", label: "Ausência de frêmitos cardíacos" }
      ]
    },
    {
      title: "Ausculta",
      items: [
        { id: "ep_ausc_1", label: "Higienizar, aquecer e usar o diafragma do estetoscópio" },
        { id: "ep_ausc_2", label: "Posicionar o aparelho nos focos: Aórtico, Pulmonar, Tricúspide, Aórtico acessório, Mitral" },
        { id: "ep_ausc_3", label: "Bulhas cardíacas rítmicas, normofonéticas em 2 tempos, sem sopros" }
      ]
    },
    {
      title: "Passos Finais",
      items: [
        { id: "ep_end_1", label: "Avisar sobre o fim da avaliação e ausência de alterações" },
        { id: "ep_end_2", label: "Pedir para vestir-se e agradecer a cooperatividade" },
        { id: "ep_end_3", label: "Fazer orientações de saúde" },
        { id: "ep_end_4", label: "Realizar o registro das informações no prontuário" },
        { id: "ep_end_5", label: "Lavar as mãos" }
      ]
    }
  ];

  return (
    <InteractiveChecklist 
      exameId="exame_precordio"
      title="Exame do Precórdio"
      description="Guia interativo para o exame físico cardiovascular."
      category="Exame Físico"
      sections={sections}
    />
  );
};

export default ExamePrecordio;
