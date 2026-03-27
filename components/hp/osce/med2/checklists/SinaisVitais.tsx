import React from 'react';
import InteractiveChecklist, { ChecklistSection } from './InteractiveChecklist';

const SinaisVitais: React.FC = () => {
  const sections: ChecklistSection[] = [
    {
      title: "Temperatura",
      items: [
        { id: "sv_temp_1", label: "Higienizar termômetro e secar axila se necessário" },
        { id: "sv_temp_2", label: "Posicionar termômetro e aguardar apito (Normal: 36-37,2°C)" }
      ]
    },
    {
      title: "Pulso",
      items: [
        { id: "sv_puls_1", label: "Palpar artéria radial (polpas do 2º e 3º dedo)" },
        { id: "sv_puls_2", label: "Avaliar: Frequência (60-100 bpm), Ritmo, Amplitude e Tensão" }
      ]
    },
    {
      title: "Frequência Respiratória",
      items: [
        { id: "sv_resp_1", label: "Contar por 1 minuto sem avisar o paciente (Eupneico: 16-20 irpm)" }
      ]
    },
    {
      title: "Pressão Arterial",
      items: [
        { id: "sv_pa_1", label: "Certificar repouso (5 min), bexiga vazia e ausência de exercícios/café/fumo (30 min)" },
        { id: "sv_pa_2", label: "Braço na altura do coração, livre de roupas e manguito adequado" },
        { id: "sv_pa_3", label: "Palpar artéria braquial e radial" },
        { id: "sv_pa_4", label: "Estimar PAS (insuflar até sumir pulso radial e somar 20-30 mmHg)" },
        { id: "sv_pa_5", label: "Auscultar artéria braquial (diafragma) e desinsuflar lentamente (2 mmHg/seg)" },
        { id: "sv_pa_6", label: "Identificar Fases de Korotkoff (Fase I: PAS; Fase V: PAD)" }
      ]
    },
    {
      title: "Oximetria e Dor",
      items: [
        { id: "sv_oxi_1", label: "Oximetria de pulso (Normal: >94%)" },
        { id: "sv_dor_1", label: "Avaliar Dor (Escala Visual Analógica de 0 a 10)" }
      ]
    }
  ];

  return (
    <InteractiveChecklist 
      exameId="sinais_vitais"
      title="Sinais Vitais"
      description="Guia interativo para aferição dos parâmetros vitais."
      category="Avaliação"
      sections={sections}
    />
  );
};

export default SinaisVitais;
