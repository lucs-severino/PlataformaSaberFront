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

const formatDateSafe = (dateString: string, formatPattern: string) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Data inválida";
        return format(date, formatPattern);
    } catch (error) {
        console.error("Erro ao formatar data:", dateString, error);
        return "Data inválida";
    }
};

export const DetalheAgendamentoModal = ({ agendamento, onClose }: Props) => {
    if (!agendamento) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose} />
                <ModalHeader>Detalhes da Aula de {agendamento.disciplina || 'Indefinida'}</ModalHeader>

                <DetailItem><strong>Aluno:</strong> {agendamento.aluno?.nome || 'Não informado'}</DetailItem>
                <DetailItem><strong>Professor:</strong> {agendamento.professor?.nome || 'Não informado'}</DetailItem>
                <DetailItem><strong>Data/Hora:</strong> {formatDateSafe(agendamento.dataHora, "dd/MM/yyyy 'às' HH:mm")}</DetailItem>
                <DetailItem><strong>Status:</strong> {agendamento.status}</DetailItem>
                <DetailItem><strong>Agendado por:</strong> {agendamento.agendadoPor}</DetailItem>
                <DetailItem><strong>Data do Agendamento:</strong> {formatDateSafe(agendamento.dataCriacao, "dd/MM/yyyy 'às' HH:mm")}</DetailItem>

                {agendamento.status === 'Cancelado' && agendamento.motivoCancelamento && (
                    <MotivoCancelamento>
                        <strong>Motivo do Cancelamento:</strong> {agendamento.motivoCancelamento}
                    </MotivoCancelamento>
                )}

                <HistoryList>
                    <h4>Histórico de Status</h4>
                    {agendamento.historico?.map((item, index) => (
                        <HistoryItem key={index}>
                            <strong>{item.status}:</strong> {formatDateSafe(item.data, "dd/MM/yyyy")} por {item.responsavel}
                            {item.motivo && ` - Motivo: ${item.motivo}`}
                        </HistoryItem>
                    ))}
                </HistoryList>
            </ModalContainer>
        </Overlay>
    );
};