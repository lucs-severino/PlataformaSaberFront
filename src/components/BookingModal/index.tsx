// src/components/BookingModal/index.tsx
import { useState } from 'react';
import { Button } from '../Button';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import type { Aluno, Professor } from '../../@types/Agendamento';
import { FormGroup, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalTitle, Step, StepContainer, StepLine, Summary, SummaryItem, TimeButton, TimeGrid } from './styles';

// Mock de dados para o modal
const alunos: Aluno[] = [
    { id: '1', nome: "Ana Silva", email: "ana@email.com" },
    { id: '2', nome: "Carlos Oliveira", email: "carlos@email.com" },
    { id: '3', nome: "Beatriz Lima", email: "beatriz@email.com" },
];

const professores: Professor[] = [
    { id: '1', nome: "Prof. João Santos", disciplina: "Matemática", disponivel: true },
    { id: '2', nome: "Prof. Maria Costa", disciplina: "Física", disponivel: true },
    { id: '3', nome: "Prof. Pedro Alves", disciplina: "Química", disponivel: false },
];

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"];

interface BookingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
    const [step, setStep] = useState(1);
    const [selectedAluno, setSelectedAluno] = useState('');
    const [selectedProfessor, setSelectedProfessor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const resetForm = () => {
        setStep(1);
        setSelectedAluno('');
        setSelectedProfessor('');
        setSelectedDate('');
        setSelectedTime('');
    };

    const handleClose = () => {
        resetForm();
        onOpenChange(false);
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleConfirm = () => {
        console.log("Agendamento Confirmado:", {
            aluno: alunos.find(a => a.id === selectedAluno)?.nome,
            professor: professores.find(p => p.id === selectedProfessor)?.nome,
            data: selectedDate,
            hora: selectedTime
        });
        handleClose();
    };

    const isStepComplete = (currentStep: number) => {
        switch (currentStep) {
            case 1: return !!selectedAluno;
            case 2: return !!selectedProfessor;
            case 3: return !!selectedDate && !!selectedTime;
            default: return false;
        }
    }

    if (!open) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Agendar Nova Aula</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <StepContainer>
                        <Step active={step >= 1}>1</Step>
                        <StepLine active={step > 1} />
                        <Step active={step >= 2}>2</Step>
                        <StepLine active={step > 2} />
                        <Step active={step >= 3}>3</Step>
                    </StepContainer>

                    {step === 1 && (
                        <FormGroup>
                           <SelectInput
                                label="Selecione o Aluno"
                                options={alunos.map(a => ({ label: `${a.nome} (${a.email})`, value: a.id }))}
                                value={selectedAluno}
                                onChange={e => setSelectedAluno(e.target.value)}
                            />
                        </FormGroup>
                    )}
                    {step === 2 && (
                         <FormGroup>
                            <SelectInput
                                label="Selecione o Professor"
                                options={professores.filter(p => p.disponivel).map(p => ({ label: `${p.nome} - ${p.disciplina}`, value: p.id }))}
                                value={selectedProfessor}
                                onChange={e => setSelectedProfessor(e.target.value)}
                            />
                        </FormGroup>
                    )}
                    {step === 3 && (
                        <>
                            <FormGroup>
                                <TextInput
                                    label="Data da Aula"
                                    type="date"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                    borderRadius="sm"
                                />
                            </FormGroup>
                             <FormGroup>
                                <label>Horário</label>
                                <TimeGrid>
                                    {timeSlots.map(time => (
                                        <TimeButton key={time} active={selectedTime === time} onClick={() => setSelectedTime(time)}>
                                            {time}
                                        </TimeButton>
                                    ))}
                                </TimeGrid>
                            </FormGroup>
                        </>
                    )}

                    {step === 3 && isStepComplete(3) && (
                        <Summary>
                            <h4>Resumo do Agendamento</h4>
                            <SummaryItem><span>Aluno:</span> {alunos.find(a => a.id === selectedAluno)?.nome}</SummaryItem>
                            <SummaryItem><span>Professor:</span> {professores.find(p => p.id === selectedProfessor)?.nome}</SummaryItem>
                            <SummaryItem><span>Data:</span> {new Date(selectedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</SummaryItem>
                            <SummaryItem><span>Hora:</span> {selectedTime}</SummaryItem>
                        </Summary>
                    )}

                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={step === 1 ? handleClose : handleBack}>
                        {step === 1 ? 'Cancelar' : 'Voltar'}
                    </Button>
                    <Button onClick={step === 3 ? handleConfirm : handleNext} disabled={!isStepComplete(step)}>
                        {step === 3 ? 'Confirmar' : 'Próximo'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};