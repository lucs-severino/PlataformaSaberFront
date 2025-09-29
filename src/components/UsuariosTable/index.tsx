import type { Usuario } from "../../@types/Usuario";
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
} from "./styles";

type Props = {
  data: Usuario[];
  onEdit: (id: string) => void;
};

export const UsuariosTable = ({ data, onEdit }: Props) => {

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>E-mail</TableHeadCell>
            <TableHeadCell>CPF</TableHeadCell>
            <TableHeadCell>Cadastro</TableHeadCell>
            <TableHeadCell>Tipo</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell style={{ width: 1 }}>Ações</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell data-label="Nome">{usuario.nome}</TableCell>
              <TableCell data-label="E-mail">{usuario.email}</TableCell>
              <TableCell data-label="CPF">{usuario.cpf}</TableCell>
              <TableCell data-label="Cadastro">
                {format(new Date(usuario.dataCadastro), "dd/MM/yyyy HH:mm:ss")}
              </TableCell>
              <TableCell data-label="Tipo">{usuario.tipoPessoa}</TableCell>
              <TableCell data-label="Status">{usuario.status}</TableCell>
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
  );
};