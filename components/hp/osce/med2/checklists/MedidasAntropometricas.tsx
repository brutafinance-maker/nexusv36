import React from 'react';
import InteractiveChecklist, { ChecklistSection } from './InteractiveChecklist';

const MedidasAntropometricas: React.FC = () => {
  const sections: ChecklistSection[] = [
    {
      title: "Passos Iniciais",
      items: [
        { id: "ma_init_1", label: "Higienizar mãos, apresentar-se, explicar o exame e solicitar permissão" },
        { id: "ma_init_2", label: "Orientar retirada de objetos (chaves, carteiras, bonés, calçados)" }
      ]
    },
    {
      title: "Altura",
      items: [
        { id: "ma_alt_1", label: "Haste milimetrada: paciente sem sapatos, ereto, queixo paralelo ao solo (Plano de Frankfurt)" },
        { id: "ma_alt_2", label: "Realizar registro da altura" }
      ]
    },
    {
      title: "Peso",
      items: [
        { id: "ma_peso_1", label: "Destravar balança e verificar calibração" },
        { id: "ma_peso_2", label: "Paciente descalço, mínimo de roupa, de costas para os cursores no centro da plataforma" },
        { id: "ma_peso_3", label: "Mover cursor maior (quilos) e menor (gramas) até nivelar agulha e fiel" },
        { id: "ma_peso_4", label: "Travar, descer paciente, ler e registrar" }
      ]
    },
    {
      title: "Circunferências",
      items: [
        { id: "ma_circ_1", label: "Cintura: Higienizar fita; Palpar rebordo costal e espinha ilíaca anterossuperior; Medir no ponto médio" },
        { id: "ma_circ_2", label: "Quadril: Nível do trocanter maior ou ápice da proeminência glútea (Subtrair 1-2cm pela roupa)" }
      ]
    },
    {
      title: "Índices",
      items: [
        { id: "ma_ind_1", label: "Cálculo do IMC (Peso / Altura²)" },
        { id: "ma_ind_2", label: "Relação Cintura/Quadril (Divisão das medidas)" }
      ]
    }
  ];

  return (
    <InteractiveChecklist 
      exameId="medidas_antropometricas"
      title="Medidas Antropométricas"
      description="Guia interativo para aferição de peso, altura e circunferências."
      category="Avaliação"
      sections={sections}
    />
  );
};

export default MedidasAntropometricas;
