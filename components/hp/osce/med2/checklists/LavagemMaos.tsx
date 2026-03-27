import React from 'react';
import InteractiveChecklist, { ChecklistSection } from './InteractiveChecklist';

const LavagemMaos: React.FC = () => {
  const sections: ChecklistSection[] = [
    {
      title: "Passos Iniciais",
      items: [
        { id: "lm_init_1", label: "Apresentar-se ao examinador" },
        { id: "lm_init_2", label: "Explicar brevemente o procedimento" },
        { id: "lm_init_3", label: "Escolher o tamanho da luva" },
        { id: "lm_init_4", label: "Abrir a embalagem externa da luva e despejar o conteúdo sobre a mesa" }
      ]
    },
    {
      title: "Indicações de lavagem",
      items: [
        { id: "lm_ind_1", label: "Antes de tocar o paciente" },
        { id: "lm_ind_2", label: "Antes de realizar procedimento asséptico" },
        { id: "lm_ind_3", label: "Após risco de exposição a fluidos" },
        { id: "lm_ind_4", label: "Após tocar o paciente" },
        { id: "lm_ind_5", label: "Após tocar superfícies próximas" },
        { id: "lm_ind_6", label: "Quando mãos visivelmente sujas" }
      ]
    },
    {
      title: "Lavagem das mãos (Execução)",
      items: [
        { id: "lm_exe_1", label: "Retirar adornos e puxar manga do jaleco" },
        { id: "lm_exe_2", label: "Abrir torneira, molhar mãos e aplicar sabão" },
        { id: "lm_exe_3", label: "Movimentos repetidos 5 a 10 vezes (Total 40-60 seg)" },
        { id: "lm_exe_4", label: "Manter mão acima da cintura" },
        { id: "lm_exe_5", label: "Friccionar palmas" },
        { id: "lm_exe_6", label: "Palma direita contra dorso esquerdo (e vice-versa)" },
        { id: "lm_exe_7", label: "Palmas entre si com dedos entrelaçados" },
        { id: "lm_exe_8", label: "Dorso dos dedos contra palma oposta" },
        { id: "lm_exe_9", label: "Polegar em movimento circular" },
        { id: "lm_exe_10", label: "Polpas digitais e unhas contra palma oposta" },
        { id: "lm_exe_11", label: "Enxaguar no sentido punho para ponta dos dedos" },
        { id: "lm_exe_12", label: "Secar com papel de distal para proximal" },
        { id: "lm_exe_13", label: "Fechar torneira com o papel e desprezar sem abaixar a mão" }
      ]
    },
    {
      title: "Calçamento de luvas Estéreis",
      items: [
        { id: "lm_luva_1", label: "Abrir embalagem interna em superfície limpa" },
        { id: "lm_luva_2", label: "Calçar primeiro mão dominante (manipulando face interna/dobra)" },
        { id: "lm_luva_3", label: "Calçar mão não dominante (manipulando face externa/estéreo com estéreo)" },
        { id: "lm_luva_4", label: "Ajustar dedos e punho; Apresentar mãos ao examinador" }
      ]
    },
    {
      title: "Retirada de luvas Estéreis",
      items: [
        { id: "lm_ret_1", label: "Retirar uma luva puxando externamente (pelo avesso)" },
        { id: "lm_ret_2", label: "Segurar a luva retirada com a outra mão enluvada" },
        { id: "lm_ret_3", label: "Retirar a segunda luva pela face interna" },
        { id: "lm_ret_4", label: "Dizer que deve lavar a mão após o procedimento" }
      ]
    }
  ];

  return (
    <InteractiveChecklist 
      exameId="lavagem_maos"
      title="Lavagem de Mãos e Luvas Estéreis"
      description="Guia interativo para a técnica correta de higienização das mãos e calçamento de luvas."
      category="Procedimento"
      sections={sections}
    />
  );
};

export default LavagemMaos;
