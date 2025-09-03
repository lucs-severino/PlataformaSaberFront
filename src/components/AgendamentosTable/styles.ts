import styled from "styled-components";
import { MdCheck, MdClose } from "react-icons/md";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  font-size: ${props => props.theme.FONT_SIZES.sm};
`;

export const TableHead = styled.thead`
  color: ${props => props.theme.COLORS.textColor400};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TableHeadCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  & > td {
    border-top: 1px solid ${props => props.theme.COLORS.borderColor};
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    padding: 16px;
    background-color: ${props => props.theme.COLORS.navbarBackground};
  }
`;

export const TableCell = styled.td`
  padding: 16px;
  vertical-align: middle;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-top: none;

    &:before {
      content: attr(data-label);
      font-weight: 600;
      color: ${props => props.theme.COLORS.textColor400};
    }
  }
`;

// Estilos para as colunas com avatar e texto
export const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.COLORS.primaryBackgroundExtraLight};
  color: ${props => props.theme.COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  text-transform: uppercase;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: 600;
  color: ${props => props.theme.COLORS.textColor500};
`;

export const UserEmail = styled.span`
  color: ${props => props.theme.COLORS.textColor400};
`;

// Estilo para a coluna "Aula"
export const AulaInfo = styled(UserInfo)``;
export const Disciplina = styled(UserName)``;
export const Descricao = styled(UserEmail)``;

// Estilo para o Status
const statusColors = {
  Pendente: { bg: '#FEF3C7', text: '#92400E' },
  Confirmado: { bg: '#DBEAFE', text: '#1E40AF' },
  Realizado: { bg: '#D1FAE5', text: '#065F46' },
  Cancelado: { bg: '#FCE7F3', text: '#9D174D' },
};

export const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.8rem;
  background-color: ${props => statusColors[props.status as keyof typeof statusColors]?.bg || '#E5E7EB'};
  color: ${props => statusColors[props.status as keyof typeof statusColors]?.text || '#374151'};
`;

// Estilo para as Ações
export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.COLORS.tableRowHover};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const ConfirmIcon = styled(ActionIcon)`
  color: ${props => props.theme.COLORS.success};
`;
export const CancelIcon = styled(ActionIcon)`
  color: ${props => props.theme.COLORS.danger};
`;