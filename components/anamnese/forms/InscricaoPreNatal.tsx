
import React from 'react';
import AnamneseTemplate from '../AnamneseTemplate';

interface Props {
  onBack: () => void;
}

const InscricaoPreNatal: React.FC<Props> = ({ onBack }) => {
  return <AnamneseTemplate title="Inscrição de Pré-Natal" onBack={onBack} />;
};

export default InscricaoPreNatal;
