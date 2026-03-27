
import React, { useState, useEffect } from 'react';

interface Props {
  onBack: () => void;
}

const ConsultaPreNatal: React.FC<Props> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showEvolution, setShowEvolution] = useState(false);
  const [formData, setFormData] = useState<any>({
    // Step 1: Identificação
    nome: '', nome_social: '', dnasc: '', idade: '', naturalidade: '', nacionalidade: '',
    cpf: '', rg: '', sus: '', estado_civil: '', raca: '', escolaridade: '',
    profissao: '', renda: '', endereco: '', tel1: '', tel2: '', email: '',
    acompanhante: '', parentesco: '', data_consulta: new Date().toISOString().split('T')[0], profissional: '',
    
    // Step 2: Gestação Atual
    dum: '', dpp: '', ig: '', ig_usg: '', data_usg: '', ig_usg_val: '',
    planejada: '', tipo_gestacao: '', rep_assistida: '', metodo_contra: [], queixas: '',
    
    // Step 3: História Obstétrica
    g: '', p: '', a: '', v: '', tipo_parto: [], intercorrencias_obs: [], det_gest: '',
    
    // Step 4: História Clínica
    doencas_cronicas: [], outras_doencas: '', cirurgias: [], det_cirurgia: '',
    transfusao: '', alergias: '', medicamentos: [{ nome: '', dose: '', freq: '', ind: '' }],
    
    // Step 5: Hábitos / Saúde Mental
    tabagismo: '', alcool: '', drogas: [], atividade_fisica: '', alimentacao: '', suplementos: '',
    psiq: [], sintomas_psiq: '', rede_apoio: '', violencia: '',
    
    // Step 6: Exame Físico
    peso_pre: '', peso_atual: '', altura: '', imc_pre: '',
    pa: '', fc: '', temp: '', spo2: '', estado_geral: '', mucosas: '', edema: '', ausculta: '',
    au: '', situacao_fetal: '', apresentacao: '', bcf: '', mov_fetais: '', tonus: '', contracoes: '', obs_obst: '',
    
    // Step 7: Exames e Conduta
    exames_res: '', exames_sol: '', vacinas: '', encaminhamentos: '', conduta: '', obs_gerais: ''
  });

  const steps = [
    "Identificação", "Gestação Atual", "Hist. Obstétrica",
    "Antecedentes", "Hábitos / Saúde Mental", "Exame Físico", "Condutas"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: string, value: string) => {
    setFormData((prev: any) => {
      const current = prev[id] || [];
      if (current.includes(value)) {
        return { ...prev, [id]: current.filter((v: string) => v !== value) };
      } else {
        return { ...prev, [id]: [...current, value] };
      }
    });
  };

  const addMed = () => {
    setFormData((prev: any) => ({
      ...prev,
      medicamentos: [...prev.medicamentos, { nome: '', dose: '', freq: '', ind: '' }]
    }));
  };

  const handleMedChange = (index: number, field: string, value: string) => {
    const newMeds = [...formData.medicamentos];
    newMeds[index][field] = value;
    setFormData((prev: any) => ({ ...prev, medicamentos: newMeds }));
  };

  useEffect(() => {
    const p = parseFloat(formData.peso_pre);
    const h = parseFloat(formData.altura);
    if (p && h && h > 0) {
      const imc = (p / (h * h)).toFixed(1);
      if (formData.imc_pre !== imc) {
        setFormData((prev: any) => ({ ...prev, imc_pre: imc }));
      }
    }
  }, [formData.peso_pre, formData.altura]);

  const fmtDate = (d: string) => {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  };

  const generateEvolution = () => {
    const blocks: { title: string, content: string, highlight?: boolean }[] = [];

    // IDENTIFICAÇÃO E MOTIVO
    let ident = '';
    if (formData.nome) {
      ident += `Paciente **${formData.nome}**, ${formData.idade || '–'} anos, comparece para consulta de acompanhamento de pré-natal. `;
      if (formData.acompanhante) ident += `Encontra-se acompanhada por ${formData.acompanhante} (${formData.parentesco || 'responsável'}). `;
    }
    if (formData.queixas) {
      ident += `Refere como queixa principal: ${formData.queixas}. `;
    } else {
      ident += `Nega queixas agudas no momento, referindo boa tolerância gestacional. `;
    }
    if (ident) blocks.push({ title: 'IDENTIFICAÇÃO E MOTIVO DA CONSULTA', content: ident });

    // HISTÓRICO GESTACIONAL E OBSTÉTRICO
    let gest = '';
    if (formData.dum) {
      gest += `Gestante com DUM em ${fmtDate(formData.dum)} e DPP para ${fmtDate(formData.dpp)}. `;
      if (formData.ig) gest += `Idade gestacional atual de ${formData.ig}. `;
      if (formData.ig_usg === 'Sim' && formData.ig_usg_val) gest += `IG confirmada por ultrassonografia realizada em ${fmtDate(formData.data_usg)} (${formData.ig_usg_val}). `;
    }
    
    const gParts = [];
    if (formData.g) gParts.push(`G${formData.g}`);
    if (formData.p) gParts.push(`P${formData.p}`);
    if (formData.a) gParts.push(`A${formData.a}`);
    if (formData.v) gParts.push(`V${formData.v}`);
    if (gParts.length) gest += `Histórico obstétrico prévio: **${gParts.join(' ')}**. `;
    
    if (formData.tipo_parto.length) gest += `Partos anteriores via ${formData.tipo_parto.join(', ')}. `;
    const interObs = formData.intercorrencias_obs.filter((x:any) => x !== 'Nenhuma');
    if (interObs.length) gest += `Relata intercorrências em gestações anteriores, incluindo ${interObs.join(', ')}. `;
    if (formData.det_gest) gest += `${formData.det_gest}. `;
    
    if (gest) blocks.push({ title: 'HISTÓRICO GESTACIONAL E OBSTÉTRICO', content: gest });

    // ANTECEDENTES E HÁBITOS
    let ante = '';
    const doencas = formData.doencas_cronicas.filter((x:any) => x !== 'Nenhuma');
    if (doencas.length) ante += `Apresenta como antecedentes patológicos: **${doencas.join(', ')}**. `;
    else ante += `Nega comorbidades prévias conhecidas. `;
    
    if (formData.cirurgias.length && !formData.cirurgias.includes('Nenhuma')) ante += `Relata histórico cirúrgico de ${formData.cirurgias.join(', ')}. `;
    if (formData.alergias) ante += `Refere alergia a **${formData.alergias}**. `;
    
    const meds = formData.medicamentos.filter((m:any) => m.nome).map((m:any) => `${m.nome} ${m.dose || ''}`).join(', ');
    if (meds) ante += `Em uso regular de ${meds}. `;
    
    if (formData.tabagismo || formData.alcool) {
      ante += `Quanto aos hábitos de vida, relata: tabagismo (${formData.tabagismo || 'não informado'}), etilismo (${formData.alcool || 'não informado'}). `;
    }
    
    if (ante) blocks.push({ title: 'ANTECEDENTES E HÁBITOS', content: ante });

    // EXAME FÍSICO E OBSTÉTRICO
    let ef = '';
    if (formData.pa || formData.fc || formData.peso_atual) {
      ef += `Ao exame físico, apresenta-se em ${formData.estado_geral || 'bom estado geral'}, mucosas ${formData.mucosas?.toLowerCase() || 'coradas'}. `;
      ef += `Sinais vitais: PA ${formData.pa || '–'} mmHg, FC ${formData.fc || '–'} bpm, Tax ${formData.temp || '–'} °C, SpO2 ${formData.spo2 || '–'}%. `;
      ef += `Peso atual de ${formData.peso_atual || '–'} kg (IMC pré-gestacional: ${formData.imc_pre || '–'} kg/m²). `;
    }
    
    let eo = '';
    if (formData.au || formData.bcf) {
      eo += `Ao exame obstétrico: Altura uterina de ${formData.au || '–'} cm. `;
      eo += `Feto em situação ${formData.situacao_fetal?.toLowerCase() || 'longitudinal'}, apresentação ${formData.apresentacao?.toLowerCase() || 'cefálica'}. `;
      eo += `Batimentos cardiofetais (BCF) presentes, rítmicos, em ${formData.bcf || '–'} bpm. `;
      eo += `Movimentos fetais ${formData.mov_fetais?.toLowerCase() || 'presentes'}. `;
      eo += `Tônus uterino ${formData.tonus?.toLowerCase() || 'normal'}, contrações ${formData.contracoes?.toLowerCase() || 'ausentes'}. `;
    }
    
    const isObsHighlight = formData.mov_fetais === 'Ausentes' || formData.mov_fetais === 'Reduzidos' || formData.contracoes === 'Presentes – regulares' || (formData.pa && parseFloat(formData.pa.split('/')[0]) >= 140);
    if (ef || eo) blocks.push({ title: 'EXAME FÍSICO E OBSTÉTRICO', content: ef + eo, highlight: isObsHighlight });

    // CONDUTA E PLANEJAMENTO
    let cond = '';
    if (formData.exames_res) cond += `Análise de exames: ${formData.exames_res}. `;
    if (formData.exames_sol) cond += `Solicitados nesta data: ${formData.exames_sol}. `;
    if (formData.vacinas) cond += `Vacinação: ${formData.vacinas}. `;
    if (formData.conduta) cond += `Conduta: ${formData.conduta}. `;
    if (formData.encaminhamentos) cond += `Encaminhamentos: ${formData.encaminhamentos}. `;
    
    if (cond) blocks.push({ title: 'CONDUTA E PLANEJAMENTO', content: cond });

    return blocks;
  };

  const evolutionBlocks = generateEvolution();

  if (showEvolution) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-neutral-50 -mx-4 px-4 md:-mx-8 md:px-8 min-h-screen text-neutral-900 w-auto anamnese-container">
        <div className="max-w-4xl mx-auto py-6">
          <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xl evolution-card">
            <div className="bg-neutral-100 p-8 flex justify-between items-center border-b border-neutral-200">
              <div>
                <h2 className="text-2xl font-black text-neutral-900 tracking-tight italic uppercase">Evolução do Prontuário</h2>
                <p className="text-neutral-500 text-xs mt-1 uppercase tracking-widest">Registro Clínico • Pré-Natal</p>
              </div>
              <div className="text-right">
                <p className="text-neutral-900 font-mono text-sm">{fmtDate(formData.data_consulta)}</p>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-1">{formData.profissional}</p>
              </div>
            </div>
            
            <div className="p-10 space-y-8 bg-white">
              <div className="prose prose-neutral max-w-none">
                <div className="text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap font-serif">
                  {evolutionBlocks.map((block, i) => (
                    <div key={i} className="mb-6">
                      <span className="font-bold text-nexus-blue uppercase text-[10px] tracking-widest block mb-1 no-print">{block.title}</span>
                      <p className={`${block.highlight ? 'bg-rose-50 p-3 rounded-lg border-l-2 border-rose-500' : ''}`}>
                        {block.content.split('**').map((part, idx) => idx % 2 === 1 ? <strong key={idx} className="font-bold">{part}</strong> : part)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-100 flex flex-wrap gap-4 justify-center bg-neutral-50 no-print">
              <button 
                onClick={() => {
                  const text = evolutionBlocks.map(b => `[${b.title}]\n${b.content}`).join('\n\n');
                  navigator.clipboard.writeText(text);
                }}
                className="px-6 py-3 bg-nexus-blue/10 text-nexus-blue rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-nexus-blue hover:text-white transition-all"
              >
                📋 Copiar Texto
              </button>
              <button 
                onClick={() => window.print()}
                className="px-6 py-3 bg-white border border-neutral-200 text-neutral-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-50 transition-all"
              >
                🖨️ Imprimir
              </button>
              <button 
                onClick={() => setShowEvolution(false)}
                className="px-6 py-3 border border-rose-500 text-rose-500 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all"
              >
                ↺ Editar Dados
              </button>
              <button 
                onClick={onBack}
                className="px-6 py-3 bg-neutral-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderField = (label: string, id: string, type: string = "text", placeholder: string = "", options?: string[]) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">{label}</label>
      {type === "select" ? (
        <select 
          id={id} 
          value={formData[id]} 
          onChange={handleInputChange}
          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all text-neutral-900"
        >
          <option value="">Selecionar...</option>
          {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          id={id} 
          value={formData[id]} 
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all text-neutral-900"
        />
      )}
    </div>
  );

  const renderRadioGroup = (label: string, id: string, options: string[]) => (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => handleRadioChange(id, opt)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
              formData[id] === opt 
                ? 'bg-nexus-blue text-white border-nexus-blue shadow-md shadow-nexus-blue/20' 
                : 'bg-white text-neutral-500 border-neutral-200 hover:border-nexus-blue/50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const renderCheckboxGroup = (label: string, id: string, options: string[]) => (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => handleCheckboxChange(id, opt)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
              formData[id]?.includes(opt)
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20' 
                : 'bg-white text-neutral-500 border-neutral-200 hover:border-emerald-500/50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-neutral-50 -mx-4 px-4 md:-mx-8 md:px-8 min-h-screen text-neutral-900 w-auto">
      <div className="max-w-5xl mx-auto py-6">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-nexus-blue/10 text-nexus-blue rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 bg-nexus-blue rounded-full animate-pulse"></span>
            Modelo Digital
          </div>
          <h2 className="text-4xl font-black text-neutral-900 tracking-tight italic uppercase">
            Consulta de Pré-Natal
          </h2>
          <p className="text-neutral-500 text-sm mt-2 max-w-lg mx-auto">
            Preencha os dados da consulta para gerar automaticamente a evolução clínica estruturada.
          </p>
        </header>

        {/* Progress Steps */}
        <div className="mb-12 overflow-x-auto pb-4 no-print">
          <div className="flex gap-2 min-w-max">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i + 1)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  currentStep === i + 1 
                    ? 'bg-nexus-blue text-white border-nexus-blue shadow-lg shadow-nexus-blue/20' 
                    : 'bg-white text-neutral-400 border-neutral-200 hover:border-nexus-blue/30'
                }`}
              >
                {i + 1}. {step}
              </button>
            ))}
          </div>
          <div className="h-1 w-full bg-neutral-200 mt-6 rounded-full overflow-hidden">
            <div 
              className="h-full bg-nexus-blue transition-all duration-500" 
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
        {/* Step 1: Identificação */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Nome Completo", "nome", "text", "Nome da paciente")}
              {renderField("Nome Social", "nome_social", "text", "Se houver")}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {renderField("Data de Nascimento", "dnasc", "date")}
              {renderField("Idade", "idade", "number", "anos")}
              {renderField("Naturalidade", "naturalidade", "text", "Cidade / UF")}
              {renderField("Nacionalidade", "nacionalidade", "text", "Brasileira")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderField("CPF", "cpf", "text", "000.000.000-00")}
              {renderField("RG", "rg", "text", "Número")}
              {renderField("Cartão SUS", "sus", "text", "Número CNS")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderField("Estado Civil", "estado_civil", "select", "", ["Solteira", "Casada", "União estável", "Divorciada", "Viúva"])}
              {renderField("Raça / Cor", "raca", "select", "", ["Branca", "Parda", "Preta", "Amarela", "Indígena"])}
              {renderField("Escolaridade", "escolaridade", "select", "", ["Fundamental incompleto", "Fundamental completo", "Médio incompleto", "Médio completo", "Superior incompleto", "Superior completo", "Pós-graduação"])}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Profissão", "profissao")}
              {renderField("Renda Familiar", "renda", "select", "", ["Menos de 1 SM", "1 SM", "1 a 2 SM", "2 a 5 SM", "Acima de 5 SM"])}
            </div>
            {renderField("Endereço Completo", "endereco")}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderField("Telefone Principal", "tel1")}
              {renderField("WhatsApp / Outro", "tel2")}
              {renderField("E-mail", "email", "email")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Acompanhante", "acompanhante")}
              {renderField("Parentesco", "parentesco")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Data da Consulta", "data_consulta", "date")}
              {renderField("Profissional Responsável", "profissional", "text", "Nome e CRM/COREN")}
            </div>
          </div>
        )}

        {/* Step 2: Gestação Atual */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderField("DUM", "dum", "date")}
              {renderField("DPP", "dpp", "date")}
              {renderField("IG na 1ª Consulta", "ig", "text", "Ex: 12 sem e 3 dias")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {renderRadioGroup("IG confirmada por USG?", "ig_usg", ["Sim", "Não"])}
              {renderField("Data da USG", "data_usg", "date")}
              {renderField("IG pela USG", "ig_usg_val", "text", "Ex: 11 sem e 5 dias")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderRadioGroup("Gestação Planejada?", "planejada", ["Sim", "Não", "Não informada"])}
              {renderRadioGroup("Tipo de Gestação", "tipo_gestacao", ["Única", "Gemelar", "Triplos+"])}
              {renderRadioGroup("Reprodução Assistida?", "rep_assistida", ["Não", "Indução", "FIV/ICSI", "Outro"])}
            </div>
            {renderCheckboxGroup("Método Contraceptivo Anterior", "metodo_contra", ["Não usava", "ACO", "Injetável", "DIU", "Preservativo", "Laqueadura", "Outro"])}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Queixas / Sintomas Atuais</label>
              <textarea 
                id="queixas" 
                value={formData.queixas} 
                onChange={handleInputChange}
                className="w-full bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all dark:text-white min-h-[120px]"
                placeholder="Descreva os principais sintomas..."
              />
            </div>
          </div>
        )}

        {/* Step 3: História Obstétrica */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {renderField("Gestações (G)", "g", "number", "0")}
              {renderField("Partos (P)", "p", "number", "0")}
              {renderField("Abortos (A)", "a", "number", "0")}
              {renderField("Filhos Vivos (V)", "v", "number", "0")}
            </div>
            {renderCheckboxGroup("Tipos de Partos Anteriores", "tipo_parto", ["Normal", "Cesáreo", "Fórceps", "Vácuo"])}
            {renderCheckboxGroup("Intercorrências Obstétricas Anteriores", "intercorrencias_obs", ["Pré-eclâmpsia", "Eclâmpsia", "Diabetes gestacional", "Hemorragia", "Parto prematuro", "Placenta prévia", "RCIU", "Isoimunização Rh", "ITU de repetição", "RPM", "Nenhuma"])}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Detalhes de Gestações Anteriores</label>
              <textarea 
                id="det_gest" 
                value={formData.det_gest} 
                onChange={handleInputChange}
                className="w-full bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all dark:text-white min-h-[120px]"
                placeholder="Pesos dos RNs, complicações..."
              />
            </div>
          </div>
        )}

        {/* Step 4: História Clínica */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            {renderCheckboxGroup("Doenças Crônicas Pré-existentes", "doencas_cronicas", ["HAS", "Diabetes", "Cardiopatia", "Nefropatia", "Asma/DPOC", "Epilepsia", "Hipotireoidismo", "Hipertireoidismo", "Anemia falciforme", "LES", "SAF", "HIV/AIDS", "Hepatite B/C", "Tuberculose", "Nenhuma"])}
            {renderField("Outras Doenças / Especificar", "outras_doencas")}
            {renderCheckboxGroup("Cirurgias Anteriores", "cirurgias", ["Cesariana prévia", "Miomectomia", "Bariátrica", "Apendicectomia", "Cardíaca", "Nenhuma", "Outra"])}
            {renderField("Detalhes Cirúrgicos", "det_cirurgia")}
            {renderRadioGroup("Transfusões Sanguíneas Anteriores?", "transfusao", ["Não", "Sim"])}
            {renderField("Alergias", "alergias", "text", "Medicamentos, alimentos, etc.")}
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Medicamentos em Uso</label>
                <button onClick={addMed} className="text-[10px] font-black text-nexus-blue uppercase tracking-widest hover:underline">+ Adicionar</button>
              </div>
              <div className="space-y-3">
                {formData.medicamentos.map((med: any, i: number) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-neutral-50 dark:bg-nexus-surface rounded-2xl border border-neutral-100 dark:border-nexus-border">
                    <input 
                      placeholder="Medicamento" 
                      value={med.nome} 
                      onChange={(e) => handleMedChange(i, 'nome', e.target.value)}
                      className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-lg px-3 py-2 text-xs outline-none focus:border-nexus-blue dark:text-white"
                    />
                    <input 
                      placeholder="Dose" 
                      value={med.dose} 
                      onChange={(e) => handleMedChange(i, 'dose', e.target.value)}
                      className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-lg px-3 py-2 text-xs outline-none focus:border-nexus-blue dark:text-white"
                    />
                    <input 
                      placeholder="Freq." 
                      value={med.freq} 
                      onChange={(e) => handleMedChange(i, 'freq', e.target.value)}
                      className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-lg px-3 py-2 text-xs outline-none focus:border-nexus-blue dark:text-white"
                    />
                    <input 
                      placeholder="Indicação" 
                      value={med.ind} 
                      onChange={(e) => handleMedChange(i, 'ind', e.target.value)}
                      className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-lg px-3 py-2 text-xs outline-none focus:border-nexus-blue dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Hábitos / Saúde Mental */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderRadioGroup("Tabagismo", "tabagismo", ["Nunca fumou", "Ex-tabagista", "Parou na gestação", "Ativa"])}
              {renderRadioGroup("Consumo de Álcool", "alcool", ["Não consome", "Consumia – parou", "Eventual", "Regular"])}
            </div>
            {renderCheckboxGroup("Uso de Drogas Ilícitas", "drogas", ["Não", "Maconha", "Cocaína/Crack", "Outras"])}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderRadioGroup("Atividade Física", "atividade_fisica", ["Sedentária", "Leve", "Moderada", "Intensa"])}
              {renderRadioGroup("Alimentação", "alimentacao", ["Equilibrada", "Vegetariana", "Com restrições", "Dieta especial"])}
            </div>
            {renderField("Suplementos em Uso", "suplementos", "text", "Ex: sulfato ferroso, ácido fólico")}
            
            <div className="pt-8 border-t border-neutral-100 dark:border-nexus-border">
              <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                Saúde Mental
              </h4>
              <div className="space-y-8">
                {renderCheckboxGroup("Diagnóstico Psiquiátrico Prévio", "psiq", ["Nenhum", "Depressão", "Ansiedade", "Bipolar", "Esquizofrenia", "TOC", "TEPT", "Outro"])}
                {renderRadioGroup("Sintomas Atuais (Rastreio)", "sintomas_psiq", ["Ausentes", "Leves", "Moderados", "Graves"])}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {renderRadioGroup("Rede de Apoio", "rede_apoio", ["Boa", "Parcial", "Insuficiente", "Ausente"])}
                  {renderRadioGroup("Violência / Vulnerabilidade", "violencia", ["Não relatada", "Suspeita", "Confirmada", "Encaminhada"])}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Exame Físico */}
        {currentStep === 6 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {renderField("Peso Pré-gest. (kg)", "peso_pre", "number")}
              {renderField("Peso Atual (kg)", "peso_atual", "number")}
              {renderField("Altura (m)", "altura", "number")}
              {renderField("IMC Pré-gest.", "imc_pre", "text", "Calculado")}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {renderField("PA (mmHg)", "pa", "text", "120/80")}
              {renderField("FC (bpm)", "fc", "number")}
              {renderField("Temp (°C)", "temp", "number")}
              {renderField("SpO2 (%)", "spo2", "number")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderRadioGroup("Estado Geral", "estado_geral", ["BEG", "REG", "MEG"])}
              {renderRadioGroup("Coloração de Mucosas", "mucosas", ["Coradas", "Hipocoradas +", "Hipocoradas ++", "Ictéricas", "Cianóticas"])}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderRadioGroup("Edema", "edema", ["Ausente", "MMII +", "MMII ++", "Generalizado"])}
              {renderRadioGroup("Ausculta Cardiorrespiratória", "ausculta", ["Normal", "Alterada"])}
            </div>
            
            <div className="pt-8 border-t border-neutral-100 dark:border-nexus-border">
              <h4 className="text-xs font-black text-nexus-blue uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-nexus-blue rounded-full"></span>
                Exame Obstétrico
              </h4>
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {renderField("AU (cm)", "au", "number")}
                  {renderField("Situação Fetal", "situacao_fetal", "select", "", ["Longitudinal", "Transversa", "Oblíqua"])}
                  {renderField("Apresentação", "apresentacao", "select", "", ["Cefálica", "Pélvica", "Córmica"])}
                  {renderField("BCF (bpm)", "bcf", "number")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {renderRadioGroup("Movimentos Fetais", "mov_fetais", ["Presentes", "Reduzidos", "Ausentes"])}
                  {renderRadioGroup("Tônus Uterino", "tonus", ["Normal", "Aumentado", "Diminuído"])}
                  {renderRadioGroup("Contrações?", "contracoes", ["Ausentes", "Irregulares", "Regulares"])}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Observações do Exame Obstétrico</label>
                  <textarea 
                    id="obs_obst" 
                    value={formData.obs_obst} 
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all dark:text-white min-h-[100px]"
                    placeholder="Achados relevantes, toque vaginal..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Exames e Conduta */}
        {currentStep === 7 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Resultados de Exames Relevantes</label>
              <textarea 
                id="exames_res" 
                value={formData.exames_res} 
                onChange={handleInputChange}
                className="w-full bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all dark:text-white min-h-[100px]"
                placeholder="Ex: Hb 10,2, GJ 96, sorologias..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Exames Solicitados Nesta Consulta</label>
              <textarea 
                id="exames_sol" 
                value={formData.exames_sol} 
                onChange={handleInputChange}
                className="w-full bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all dark:text-white min-h-[100px]"
                placeholder="Ex: Hemograma, glicemia, USG..."
              />
            </div>
            {renderField("Vacinas Aplicadas / Atualizadas", "vacinas")}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Encaminhamentos Realizados</label>
              <textarea 
                id="encaminhamentos" 
                value={formData.encaminhamentos} 
                onChange={handleInputChange}
                className="w-full bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all dark:text-white min-h-[100px]"
                placeholder="Ex: Nutricionista, Alto Risco..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Conduta e Prescrição</label>
              <textarea 
                id="conduta" 
                value={formData.conduta} 
                onChange={handleInputChange}
                className="w-full bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all dark:text-white min-h-[120px]"
                placeholder="Prescrições e orientações..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-label uppercase tracking-widest ml-1">Observações Gerais</label>
              <textarea 
                id="obs_gerais" 
                value={formData.obs_gerais} 
                onChange={handleInputChange}
                className="w-full bg-neutral-50 dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue outline-none transition-all dark:text-white min-h-[100px]"
                placeholder="Outras informações..."
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-nexus-border flex justify-between items-center">
          <button 
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${
              currentStep === 1 
                ? 'opacity-0 pointer-events-none' 
                : 'bg-neutral-100 dark:bg-nexus-surface text-neutral-500 dark:text-nexus-text-sec hover:bg-neutral-200 dark:hover:bg-nexus-hover'
            }`}
          >
            ← Anterior
          </button>
          
          {currentStep < steps.length ? (
            <button 
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-8 py-4 bg-nexus-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-nexus-blue/20 flex items-center gap-3"
            >
              Próximo Passo
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          ) : (
            <button 
              onClick={() => setShowEvolution(true)}
              className="px-8 py-4 bg-gradient-to-br from-nexus-blue to-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-nexus-blue/20 flex items-center gap-3"
            >
              ✦ Gerar Evolução
            </button>
          )}
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-neutral-100 dark:border-nexus-border text-center">
        <p className="text-[10px] font-bold text-neutral-400 dark:text-nexus-text-sec uppercase tracking-[0.3em]">
          NexusBQ • Guia de Consulta Clínica
        </p>
      </footer>
    </div>
  </div>
  );
};

export default ConsultaPreNatal;
