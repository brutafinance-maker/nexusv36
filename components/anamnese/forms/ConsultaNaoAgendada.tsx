
import React from 'react';
import AnamneseTemplate from '../AnamneseTemplate';

interface Props {
  onBack: () => void;
}

const ConsultaNaoAgendada: React.FC<Props> = ({ onBack }) => {
  return <AnamneseTemplate title="Consulta não agendada (demanda espontânea)" onBack={onBack} />;
};

export default ConsultaNaoAgendada;
