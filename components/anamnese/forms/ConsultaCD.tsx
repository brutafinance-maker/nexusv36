
import React from 'react';
import AnamneseTemplate from '../AnamneseTemplate';

interface Props {
  onBack: () => void;
}

const ConsultaCD: React.FC<Props> = ({ onBack }) => {
  return <AnamneseTemplate title="Consulta de CD" onBack={onBack} />;
};

export default ConsultaCD;
