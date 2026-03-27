
import React from 'react';
import AnamneseTemplate from '../AnamneseTemplate';

interface Props {
  onBack: () => void;
}

const InscricaoCD: React.FC<Props> = ({ onBack }) => {
  return <AnamneseTemplate title="Inscrição de CD" onBack={onBack} />;
};

export default InscricaoCD;
