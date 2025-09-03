import { format } from 'date-fns';
import { 
    Overlay, 
    ModalContainer, 
    CloseButton, 
    ModalHeader, 
    DetailItem, 
    HistoryList, 
    HistoryItem,
    MotivoCancelamento
} from './styles';
import type { AgendamentoDetalhe } from '../../@types/Agendamento';

type Props = {
    agendamento: AgendamentoDetalhe | null;
    onClose: () => void;
};

export const DetalheAgendamentoModal = ({ agendamento, onClose }: Props) => {
    if (!agendamento) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose} />
                <ModalHeader>Detalhes da Aula de {agendamento.disciplina}</ModalHeader>

                {/* --- Detalhes Principais --- */}
                <DetailItem><strong>Aluno:</strong> {agendamento.aluno.nome}</DetailItem>
                <DetailItem><strong>Professor:</strong> {agendamento.professor.nome}</DetailItem>
                <DetailItem><strong>Data/Hora:</strong> {format(new Date(agendamento.dataHora), "dd/MM/yyyy 'às' HH:mm")}</DetailItem>
                <DetailItem><strong>Status:</strong> {agendamento.status}</DetailItem>
                <DetailItem><strong>Agendado por:</strong> {agendamento.agendadoPor}</DetailItem>
                <DetailItem><strong>Data do Agendamento:</strong> {format(new Date(agendamento.dataCriacao), "dd/MM/yyyy 'às' HH:mm")}</DetailItem>

                {/* --- Motivo do Cancelamento (se houver) --- */}
                {agendamento.status === 'Cancelado' && agendamento.motivoCancelamento && (
                    <MotivoCancelamento>
                        <strong>Motivo do Cancelamento:</strong> {agendamento.motivoCancelamento}
                    </MotivoCancelamento>
                )}

                {/* --- Histórico de Status --- */}
                <HistoryList>
                    <h4>Histórico de Status</h4>
                    {agendamento.historico.map((item, index) => (
                        <HistoryItem key={index}>
                            <strong>{item.status}:</strong> {format(new Date(item.data), "dd/MM/yyyy")} por {item.responsavel}
                            {item.motivo && ` - Motivo: ${item.motivo}`}
                        </HistoryItem>
                    ))}
                </HistoryList>
            </ModalContainer>
        </Overlay>
    );
};