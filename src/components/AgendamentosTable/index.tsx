import { format } from 'date-fns';
import {
    ActionIcon,
    Actions,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    TableWrapper,
    UserCell,
    Avatar,
    UserInfo,
    UserName,
    UserEmail,
    AulaInfo,
    Disciplina,
    Descricao,
    StatusBadge,
    ConfirmIcon,
    CancelIcon
} from './styles';
import { MdCheck, MdClose, MdVisibility } from 'react-icons/md';
import type { AgendamentoLista } from '../../@types/Agendamento';

type Props = {
    data: AgendamentoLista[];
    onConfirm: (id: string) => void;
    onCancel: (id: string) => void;
    onViewDetails: (id: string) => void;
};

const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2);
};

export const AgendamentosTable = ({ data, onConfirm, onCancel, onViewDetails }: Props) => {
    return (
        <TableWrapper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Aluno</TableHeadCell>
                        <TableHeadCell>Professor</TableHeadCell>
                        <TableHeadCell>Data/Hora</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell>Ações</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(agendamento => (
                        <TableRow key={agendamento.id}>
                            <TableCell data-label="Aluno">
                                <UserCell>
                                    <Avatar>{getInitials(agendamento.aluno.nome)}</Avatar>
                                    <UserInfo>
                                        <UserName>{agendamento.aluno.nome}</UserName>
                                        <UserEmail>{agendamento.aluno.email}</UserEmail>
                                    </UserInfo>
                                </UserCell>
                            </TableCell>
                            <TableCell data-label="Professor">
                                <UserCell>
                                    <Avatar>{getInitials(agendamento.professor.nome)}</Avatar>
                                    <UserInfo>
                                        <UserName>{agendamento.professor.nome}</UserName>
                                        <UserEmail>{agendamento.professor.email}</UserEmail>
                                    </UserInfo>
                                </UserCell>
                            </TableCell>
                            <TableCell data-label="Data/Hora">
                                {format(new Date(agendamento.dataHora), "dd/MM/yyyy, HH:mm")}
                            </TableCell>
                            <TableCell data-label="Status">
                                <StatusBadge $status={agendamento.status}>{agendamento.status}</StatusBadge>
                            </TableCell>
                            <TableCell data-label="Ações">
                                <Actions>
                                    <ActionIcon title="Ver Detalhes" onClick={() => onViewDetails(agendamento.id)}>
                                        <MdVisibility size={25} />
                                    </ActionIcon>
                                    <ConfirmIcon
                                        title="Confirmar"
                                        onClick={() => onConfirm(agendamento.id)}
                                        disabled={agendamento.status !== 'Agendado'}
                                    >
                                        <MdCheck size={25} />
                                    </ConfirmIcon>
                                    <CancelIcon
                                        title="Cancelar"
                                        onClick={() => onCancel(agendamento.id)}
                                        disabled={agendamento.status === 'Cancelado' || agendamento.status === 'Realizado'}
                                    >
                                        <MdClose size={25} />
                                    </CancelIcon>
                                </Actions>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
};
