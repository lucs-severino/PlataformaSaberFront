import styled from "styled-components";

// === Responsividade da Tabela ===
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
    border: 0;
  }
`;

export const TableHead = styled.thead`
  @media (max-width: 768px) {
    display: none; 
  }
`;

export const TableBody = styled.tbody`
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

export const TableRow = styled.tr`
  transition: background 0.2s ease;
  border: 1px solid #ddd;   
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: ${(props) => props.theme.COLORS.tableRowHover};
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #ddd;        /* linha separando os cards */
    border-radius: 12px;
    padding: 0.75rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); /* leve sombra para destacar */
    background-color: #fff;

    &:hover {
      background-color: ${(props) => props.theme.COLORS.tableRowHover};
    }
  }
`;


export const TableHeadCell = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
  background: #f5f5f5;
`;

export const TableCell = styled.td<{ "data-label"?: string }>`
  padding: 12px;
  text-align: left;
  vertical-align: top;

  @media (max-width: 768px) {
    display: block;
    text-align: left;
    padding: 8px 0;

    &::before {
      display: block;
      content: attr(data-label);
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }
  }
`;

// === Células personalizadas ===
export const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div<{ $type?: 'aluno' | 'professor' }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$type === 'professor' ? props.theme.COLORS.success : props.theme.COLORS.primary};
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: 600;
`;

export const UserEmail = styled.span`
  font-size: 0.85rem;
  color: #666;
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

export const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.8rem;
  background-color: ${props => statusColors[props.$status as keyof typeof statusColors]?.bg || '#E5E7EB'};
  color: ${props => statusColors[props.$status as keyof typeof statusColors]?.text || '#374151'};
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