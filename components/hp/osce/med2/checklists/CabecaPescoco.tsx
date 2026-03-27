import React from 'react';
import InteractiveChecklist, { ChecklistSection } from './InteractiveChecklist';

const CabecaPescoco: React.FC = () => {
  const sections: ChecklistSection[] = [
    {
      title: "Passos Iniciais",
      items: [
        { id: "cp_init_1", label: "Higienizar as mãos" },
        { id: "cp_init_2", label: "Apresentar-se ao paciente" },
        { id: "cp_init_3", label: "Explicar brevemente o exame ao paciente" },
        { id: "cp_init_4", label: "Solicitar a permissão do paciente para realização do exame" },
        { id: "cp_init_5", label: "Posicionar o paciente (orientar a retirada das vestimentas e acomodar na maca ou cadeira)" }
      ]
    },
    {
      title: "Couro cabeludo",
      items: [
        { id: "cp_couro_1", label: "Inspeção e palpação" },
        { id: "cp_couro_2", label: "Ausência de lesões, alopecia, cicatrizes, abaulamentos ou depressões" }
      ]
    },
    {
      title: "Simetria da cabeça e mímica facial",
      items: [
        { id: "cp_face_1", label: "Inspeção de face" },
        { id: "cp_face_2", label: "Solicitar ao paciente que realize o fechar de olhos, o franzimento de testa e um sorriso" },
        { id: "cp_face_3", label: "Face atípica, ausência de macro/microcefalia e mímica facial preservada" }
      ]
    },
    {
      title: "Olhos",
      items: [
        { id: "cp_olhos_1", label: "Implantação e simetria dos olhos normais" },
        { id: "cp_olhos_2", label: "Ausência de pterígio e opacidade do cristalino" },
        { id: "cp_olhos_3", label: "Mucosa normocorada (tracionar pálpebra inferior)" },
        { id: "cp_olhos_4", label: "Ausência de ectropia, entropia, exoftalmia e hematoma periorbital" },
        { id: "cp_olhos_5", label: "Teste de campimetria visual (olhar fixo, oclusão unilateral, 4 quadrantes)" },
        { id: "cp_olhos_6", label: "Movimentação extrínseca dos olhos (movimento de 'H')" },
        { id: "cp_olhos_7", label: "Reflexo Fotomotor Direto (miose bilateral)" },
        { id: "cp_olhos_8", label: "Reflexo Fotomotor Consensual (miose contralateral com barreira)" }
      ]
    },
    {
      title: "Orelhas",
      items: [
        { id: "cp_orelhas_1", label: "Implantação normal e simétrica do pavilhão auricular" },
        { id: "cp_orelhas_2", label: "Ausência de otorreia, otorragia e sinal de Battle" },
        { id: "cp_orelhas_3", label: "Otoscopia (tração para trás e para cima, conduto e membrana íntegros)" }
      ]
    },
    {
      title: "Nariz",
      items: [
        { id: "cp_nariz_1", label: "Implantação e tamanho do nariz normais" },
        { id: "cp_nariz_2", label: "Ausência de epistaxe, rinorreia, rinorragia" },
        { id: "cp_nariz_3", label: "Inspeção interna (extensão da cabeça, elevação do ápice)" },
        { id: "cp_nariz_4", label: "Permeabilidade nasal (obstrução de uma narina e respiração profunda)" }
      ]
    },
    {
      title: "Boca",
      items: [
        { id: "cp_boca_1", label: "Implantação da boca normal e ausência de lábio leporino/lesões" },
        { id: "cp_boca_2", label: "Oroscopia (expor língua, dizer 'ahhh', uso de espátula)" },
        { id: "cp_boca_3", label: "Mucosa bucal/orofaríngea íntegra, normocorada e hidratada" },
        { id: "cp_boca_4", label: "Dentição característica e ausência de cáries/fenda palatina" },
        { id: "cp_boca_5", label: "Motilidade da língua preservada (movimentação vertical/horizontal)" }
      ]
    },
    {
      title: "Pescoço",
      items: [
        { id: "cp_pescoco_1", label: "Implantação e tamanho do pescoço normal" },
        { id: "cp_pescoco_2", label: "Ausência de torcicolo, tremores ou lesões" },
        { id: "cp_pescoco_3", label: "Movimentação passiva e ativa (flexão, extensão e rotação)" }
      ]
    },
    {
      title: "Testes específicos",
      items: [
        { id: "cp_test_1", label: "Palpação de seios ósseos (Frontal, Nasal, Maxilar)" },
        { id: "cp_test_2", label: "Palpação das cadeias linfonodais (Pré/Retro-auriculares, Occiptais, Tonsilar, Cervicais, Submandibulares, Mentonianas, Supraclaviculares)" },
        { id: "cp_test_3", label: "Palpação da Tireoide (incisura, membrana cricotireoidea, cartilagem cricoide)" },
        { id: "cp_test_4", label: "Palpação da clavícula (dedilhamento)" },
        { id: "cp_test_5", label: "Ausculta das carótidas (ausência de sopros)" }
      ]
    },
    {
      title: "Passos Finais",
      items: [
        { id: "cp_end_1", label: "Avisar sobre o fim da avaliação e ausência de alterações" },
        { id: "cp_end_2", label: "Pedir para vestir-se e agradecer a cooperatividade" },
        { id: "cp_end_3", label: "Fazer orientações de saúde (água, alimentação, exercício)" },
        { id: "cp_end_4", label: "Realizar o registro das informações no prontuário" },
        { id: "cp_end_5", label: "Lavar as mãos" }
      ]
    }
  ];

  return (
    <InteractiveChecklist 
      exameId="cabeca_pescoco"
      title="Cabeça e Pescoço"
      description="Guia interativo para o exame físico completo da cabeça e do pescoço."
      category="Exame Físico"
      sections={sections}
    />
  );
};

export default CabecaPescoco;
