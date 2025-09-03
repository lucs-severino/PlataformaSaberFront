import { format } from 'date-fns';
import { MdCheck, MdClose, MdDoneAll } from 'react-icons/md';
import type { AgendamentoLista } from '../../@types/Agendamento';
import { ActionBtn, Actions, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TableWrapper } from './styles';

type Props = {
    data: AgendamentoLista[];
    onConfirm: (id: string) => void;
    onCancel: (id: string) => void;
    onConclude: (id: string) => void;
};

export const AgendamentosTable = ({ data, onConfirm, onCancel, onConclude }: Props) => {
    return (
        <TableWrapper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Aluno</TableHeadCell>
                        <TableHeadCell>Professor</TableHeadCell>
                        <TableHeadCell>Data e Hora</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell style={{ width: 1 }}>Ações</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(agendamento => (
                        <TableRow key={agendamento.id}>
                            <TableCell data-label="Aluno">{agendamento.nomeAluno}</TableCell>
                            <TableCell data-label="Professor">{agendamento.nomeProfessor}</TableCell>
                            <TableCell data-label="Data e Hora">{format(new Date(agendamento.dataHora), "dd/MM/yyyy 'às' HH:mm")}</TableCell>
                            <TableCell data-label="Status">{agendamento.status}</TableCell>
                            <TableCell data-label="Ações">
                                <Actions>
                                    <ActionBtn $variant="success" title="Confirmar" onClick={() => onConfirm(agendamento.id)} disabled={agendamento.status !== 'Agendado'}> <MdCheck /> </ActionBtn>
                                    <ActionBtn $variant="danger" title="Cancelar" onClick={() => onCancel(agendamento.id)} disabled={['Cancelado', 'Realizado'].includes(agendamento.status)}> <MdClose /> </ActionBtn>
                                    <ActionBtn $variant="primary" title="Marcar como Realizada" onClick={() => onConclude(agendamento.id)} disabled={agendamento.status !== 'Confirmado'}> <MdDoneAll /> </ActionBtn>
                                </Actions>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
};