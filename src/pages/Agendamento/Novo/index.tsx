import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { debounce } from 'lodash';

import { Button } from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import Alert from '../../../components/Alert';
import type { Usuario, ApiProfessor } from '../../../@types/Usuario';

import {
    ActionButtons,
    Body,
    Container,
    Form,
    FormGroup,
    Header,
    HeaderInfo,
    HeaderTitle,
    Step,
    StepContainer,
    StepLine,
    Summary,
    SummaryItem,
    TimeButton,
    TimeGrid
} from './styles';
import { criarAgendamento, getAlunos, getProfessores } from '../../../services/requests';

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"];
const agendamentosExistentes = [
    { professorId: '1', data: '2025-09-10', hora: '09:00' },
];

export const NovoAgendamento = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [alunos, setAlunos] = useState<Usuario[]>([]);
    const [loadingAlunos, setLoadingAlunos] = useState(false);
    const [alunoSearch, setAlunoSearch] = useState("");
    const [alunoPage, setAlunoPage] = useState(1);
    const [hasMoreAlunos, setHasMoreAlunos] = useState(true);

    const [professores, setProfessores] = useState<ApiProfessor[]>([]);
    const [loadingProfessores, setLoadingProfessores] = useState(false);
    const [professorSearch, setProfessorSearch] = useState("");
    const [professorPage, setProfessorPage] = useState(1);
    const [hasMoreProfessores, setHasMoreProfessores] = useState(true);

    const [selectedAluno, setSelectedAluno] = useState<{ label: string; value: string } | null>(null);
    const [selectedProfessor, setSelectedProfessor] = useState<{ label: string; value: string } | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    
    const [showAlert, setShowAlert] = useState({ type: "success" as "success" | "error", message: "", show: false });

    const today = new Date().toISOString().split('T')[0];

    const loadAlunos = async (page: number, search: string) => {
        if (!hasMoreAlunos && page > 1) return; setLoadingAlunos(true);
        const response = await getAlunos(page, search);
        if (response.data?.alunos.items) {
            const { items, pageTotal, curPage } = response.data.alunos;
            setAlunos(prev => (page === 1 ? items : [...prev, ...items]));
            setHasMoreAlunos(curPage < pageTotal);
        } else { console.error("Erro ao buscar alunos:", response.error); }
        setLoadingAlunos(false);
    };
    const debouncedLoadAlunos = useCallback(debounce((search: string) => { setAlunoPage(1); setHasMoreAlunos(true); loadAlunos(1, search); }, 500), []);

    const loadProfessores = async (page: number, search: string) => {
        if (!hasMoreProfessores && page > 1) return; setLoadingProfessores(true);
        const response = await getProfessores(page, search);
        if (response.data?.professores.items) {
            const { items, pageTotal, curPage } = response.data.professores;
            setProfessores(prev => (page === 1 ? items : [...prev, ...items]));
            setHasMoreProfessores(curPage < pageTotal);
        } else { console.error("Erro ao buscar professores:", response.error); }
        setLoadingProfessores(false);
    };
    const debouncedLoadProfessores = useCallback(debounce((search: string) => { setProfessorPage(1); setHasMoreProfessores(true); loadProfessores(1, search); }, 500), []);

    useEffect(() => { loadAlunos(1, ""); loadProfessores(1, ""); }, []);

    // --- Handlers para eventos ---
    const handleAlunoInputChange = (inputValue: string) => { setAlunoSearch(inputValue); debouncedLoadAlunos(inputValue); };
    const handleAlunoMenuScrollToBottom = () => { if (!loadingAlunos && hasMoreAlunos) { const nextPage = alunoPage + 1; setAlunoPage(nextPage); loadAlunos(nextPage, alunoSearch); } };
    const handleProfessorInputChange = (inputValue: string) => { setProfessorSearch(inputValue); debouncedLoadProfessores(inputValue); };
    const handleProfessorMenuScrollToBottom = () => { if (!loadingProfessores && hasMoreProfessores) { const nextPage = professorPage + 1; setProfessorPage(nextPage); loadProfessores(nextPage, professorSearch); } };
    
    const handleBack = () => setStep(step - 1);
    
    // --- FUNÇÃO handleConfirm ATUALIZADA ---
    const handleConfirm = async () => {
        // 1. Garante que todos os dados foram selecionados
        if (!selectedAluno || !selectedProfessor || !selectedDate || !selectedTime) {
            setShowAlert({
                type: "error",
                message: "Todos os campos do resumo devem ser preenchidos.",
                show: true
            });
            return;
        }

        // 2. Monta o objeto de dados para enviar à API
        const agendamentoData = {
            alunoId: selectedAluno.value,
            professorId: selectedProfessor.value,
            data: selectedDate,
            hora: selectedTime
        };

        // 3. Chama a função da API para criar o agendamento
        const response = await criarAgendamento(agendamentoData);

        // 4. Trata a resposta da API
        if (response.error) {
            // Se o backend retornar um erro (ex: horário ocupado), exibe o alerta de erro
            setShowAlert({ type: "error", message: response.error, show: true });
        } else {
            // Se for sucesso, exibe o alerta de sucesso e redireciona o usuário
            setShowAlert({ type: "success", message: "Aula agendada com sucesso!", show: true });
            setTimeout(() => {
                navigate('/agendamento');
            }, 1500);
        }
    };
    
    const handleNext = () => {
        if (step === 3 && (!selectedDate || selectedDate < today)) {
            setShowAlert({ type: 'error', message: 'A data do agendamento não pode ser anterior ao dia de hoje.', show: true });
            return;
        }
        setStep(step + 1);
    };

    const isStepComplete = (currentStep: number) => {
        switch (currentStep) {
            case 1: return !!selectedAluno;
            case 2: return !!selectedProfessor;
            case 3: return !!selectedDate;
            case 4: return !!selectedTime;
            default: return false;
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => { setSelectedDate(e.target.value); setSelectedTime(''); };
    
    const alunoOptions = alunos.map(a => ({ label: `${a.nome} (${a.email})`, value: a.id.toString() }));
    const professorOptions = professores.map(p => ({ label: `${p.nome} (${p.email})`, value: p.id.toString() }));

    const availableTimeSlots = useMemo(() => {
        if (!selectedDate || !selectedProfessor) return [];
        return timeSlots.filter(time => !agendamentosExistentes.some(a => a.data === selectedDate && a.hora === time && a.professorId === selectedProfessor.value));
    }, [selectedDate, selectedProfessor]);

    return (
        <Container>
            <Alert type={showAlert.type} title={showAlert.message} show={showAlert.show} setShow={show => setShowAlert({ ...showAlert, show })} />
            <Header>
                <HeaderInfo><HeaderTitle>Agendar Nova Aula</HeaderTitle></HeaderInfo>
                <ActionButtons>
                    <Button variant="secondary" onClick={handleBack} disabled={step === 1}>Voltar</Button>
                    <Button onClick={step === 4 ? handleConfirm : handleNext} disabled={!isStepComplete(step)}>
                        {step === 4 ? 'Confirmar' : 'Próximo'}
                    </Button>
                </ActionButtons>
            </Header>
            <Body>
                <Form>
                    <StepContainer>
                        <Step active={step >= 1}>1</Step><StepLine active={step > 1} />
                        <Step active={step >= 2}>2</Step><StepLine active={step > 2} />
                        <Step active={step >= 3}>3</Step><StepLine active={step > 3} />
                        <Step active={step >= 4}>4</Step>
                    </StepContainer>

                    {step === 1 && (
                        <FormGroup>
                            <label>Selecione o Aluno</label>
                            <Select options={alunoOptions} value={selectedAluno} onChange={setSelectedAluno} onInputChange={handleAlunoInputChange} onMenuScrollToBottom={handleAlunoMenuScrollToBottom} isLoading={loadingAlunos} placeholder="Digite para pesquisar..." loadingMessage={() => "Carregando mais..."} noOptionsMessage={() => "Nenhum aluno encontrado"} isClearable />
                        </FormGroup>
                    )}

                    {step === 2 && (
                        <FormGroup>
                            <label>Selecione o Professor</label>
                            <Select options={professorOptions} value={selectedProfessor} onChange={setSelectedProfessor} onInputChange={handleProfessorInputChange} onMenuScrollToBottom={handleProfessorMenuScrollToBottom} isLoading={loadingProfessores} placeholder="Digite para pesquisar..." loadingMessage={() => "Carregando mais..."} noOptionsMessage={() => "Nenhum professor encontrado"} isClearable />
                        </FormGroup>
                    )}

                    {step === 3 && (
                        <FormGroup>
                            <TextInput label="Data da Aula" type="date" value={selectedDate} onChange={handleDateChange} borderRadius="sm" min={today} />
                        </FormGroup>
                    )}
                    
                    {step === 4 && (
                        <>
                            <FormGroup>
                                <label>Horário</label>
                                <TimeGrid>
                                    {availableTimeSlots.map(time => (<TimeButton key={time} active={selectedTime === time} onClick={() => setSelectedTime(time)}>{time}</TimeButton>))}
                                </TimeGrid>
                                {selectedDate && availableTimeSlots.length === 0 && <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Nenhum horário disponível para esta data.</p>}
                            </FormGroup>

                            {isStepComplete(4) && (
                                <Summary>
                                    <h4>Resumo do Agendamento</h4>
                                    <SummaryItem><span>Aluno:</span> {selectedAluno?.label.split(' (')[0]}</SummaryItem>
                                    <SummaryItem><span>Professor:</span> {selectedProfessor?.label.split(' (')[0]}</SummaryItem>
                                    <SummaryItem><span>Data:</span> {new Date(selectedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</SummaryItem>
                                    <SummaryItem><span>Hora:</span> {selectedTime}</SummaryItem>
                                </Summary>
                            )}
                        </>
                    )}
                </Form>
            </Body>
        </Container>
    );
};