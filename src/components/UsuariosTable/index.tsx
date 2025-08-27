import { useTheme } from "styled-components"
import type { Usuario } from "../../@types/Usuario"
import { format } from "date-fns";
import { 
    ActionBtn, 
    Actions, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeadCell, 
    TableRow, 
    TableWrapper, 
    EditIcon, 
    DeleteIcon 
} from "./styles"; 
type Props = {
    data: Usuario[],
    onEdit: (id: string) => void,
}

export const UsuariosTable = ({ data, onEdit }: Props) => {
    const theme = useTheme()

    return (
        <TableWrapper> {/* Envolve a tabela com o TableWrapper */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Nome</TableHeadCell>
                        <TableHeadCell>E-mail</TableHeadCell>
                        <TableHeadCell>CPF</TableHeadCell>
                        <TableHeadCell>Data de Nasc.</TableHeadCell>
                        <TableHeadCell>Cadastro</TableHeadCell>
                        <TableHeadCell>Tipo</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell style={{ width: 1 }}>Ações</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(usuario => (
                        <TableRow key={usuario.id}>
                             <TableCell data-label="Nome">
                                {usuario.nome}
                            </TableCell>
                            <TableCell data-label="E-mail">
                                {usuario.email}
                            </TableCell>
                            <TableCell data-label="CPF">
                                {usuario.cpf}
                            </TableCell>
                            <TableCell data-label="Data de Nasc.">
                                {format(new Date(usuario.dataNascimento), 'dd/MM/yyyy')}
                            </TableCell>
                            <TableCell data-label="Cadastro">
                                {format(new Date(usuario.dataCadastro), 'dd/MM/yyyy HH:mm:ss')} {/* Adicionado HH:mm:ss para o cadastro */}
                            </TableCell>
                             <TableCell data-label="Tipo">
                                {usuario.tipoPessoa}
                            </TableCell>
                            <TableCell data-label="Status">
                                {usuario.status}
                            </TableCell>
                            <TableCell data-label="Ações">
                                <Actions>
                                    <ActionBtn $variant="warning" onClick={() => onEdit(usuario.id)}>
                                        <EditIcon />
                                    </ActionBtn>
                                </Actions>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    )
}
