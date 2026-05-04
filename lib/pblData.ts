
export const PBL_BASICO_TITLES = [
  'Introdução ao Estudo da Medicina',
  'Proliferação e Crescimento Celular',
  'Funções Biológicas 1',
  'Funções Biológicas 2',
  'Metabolismo e Nutrição',
  'Mecanismo de Agressão e Defesa',
  'Concepção e Gestação',
  'Nascimento e Desenvolvimento',
  'Vida Adulta e Envelhecimento',
  'Percepção e Emoções',
  'Febre e Infecção',
  'Fadiga e Anemias'
];

export const PBL_CLINICO_TITLES = [
  'Disúria e Edema',
  'Perda de Sangue',
  'Mente e Comportamento',
  'Cardiologia e Pneumologia',
  'Gastroenterologia',
  'Endocrinologia',
  'Infectologia Clínica',
  'Ginecologia e Obstetrícia',
  'Pediatria Clínica',
  'Cirurgia e Urgência',
  'Medicina da Família',
  'Ética e Propedêutica Avançada'
];

export const generatePBLModules = () => {
  const meds = [];
  for (let i = 1; i <= 8; i++) {
    const titles = i <= 4 ? PBL_BASICO_TITLES : PBL_CLINICO_TITLES;
    const startIdx = (i <= 4 ? (i - 1) * 3 : (i - 5) * 3);
    
    meds.push({
      name: `MED ${i}`,
      modules: [
        { id: (i - 1) * 3 + 1, title: `ASE ${(i - 1) * 3 + 1} — ${titles[startIdx]}` },
        { id: (i - 1) * 3 + 2, title: `ASE ${(i - 1) * 3 + 2} — ${titles[startIdx + 1]}` },
        { id: (i - 1) * 3 + 3, title: `ASE ${(i - 1) * 3 + 3} — ${titles[startIdx + 2]}` }
      ]
    });
  }
  return meds;
};
