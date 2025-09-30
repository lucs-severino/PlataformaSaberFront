import styled from "styled-components";

// === Responsividade da Tabela ===
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${props => props.theme.COLORS.cardBackground};
  border-radius: ${props => props.theme.BORDER_RADIUS.xl};
  box-shadow: ${props => props.theme.SHADOWS.md};
  border: 1px solid ${props => props.theme.COLORS.cardBorder};
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.COLORS.borderColorLight};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.COLORS.borderColor};
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme.COLORS.textColor600};
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${props => props.theme.COLORS.cardBackground};

  @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
    display: block;
    border: 0;
  }
`;

export const TableHead = styled.thead`
  background: linear-gradient(135deg, ${props => props.theme.COLORS.tableHeaderBackground}, ${props => props.theme.COLORS.primaryBackgroundExtraLight});
  
  @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
    display: none; 
  }
`;

export const TableBody = styled.tbody`
  @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
    display: block;
    width: 100%;
  }
`;

export const TableRow = styled.tr`
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid ${props => props.theme.COLORS.tableRowBorder};
  position: relative;

  &:hover {
    background: ${props => props.theme.COLORS.tableRowHover};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.SHADOWS.sm};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
    display: block;
    margin-bottom: ${props => props.theme.SPACING.lg};
    border: 1px solid ${props => props.theme.COLORS.cardBorder};
    border-radius: ${props => props.theme.BORDER_RADIUS.lg};
    padding: ${props => props.theme.SPACING.lg};
    box-shadow: ${props => props.theme.SHADOWS.sm};
    background: ${props => props.theme.COLORS.cardBackground};

    &:hover {
      background: ${props => props.theme.COLORS.tableRowHover};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.SHADOWS.md};
    }
  }
`;


export const TableHeadCell = styled.th`
  padding: ${props => props.theme.SPACING.lg};
  text-align: left;
  font-weight: ${props => props.theme.FONT_WEIGHTS.semibold};
  font-size: ${props => props.theme.FONT_SIZES.sm};
  color: ${props => props.theme.COLORS.textColor500};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${props => props.theme.COLORS.primary};
  position: relative;
  
  &:first-child {
    border-top-left-radius: ${props => props.theme.BORDER_RADIUS.xl};
  }
  
  &:last-child {
    border-top-right-radius: ${props => props.theme.BORDER_RADIUS.xl};
  }
`;

export const TableCell = styled.td<{ "data-label"?: string }>`
  padding: ${props => props.theme.SPACING.lg};
  text-align: left;
  vertical-align: middle;
  font-size: ${props => props.theme.FONT_SIZES.sm};
  color: ${props => props.theme.COLORS.textColor500};

  @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
    display: block;
    text-align: left;
    padding: ${props => props.theme.SPACING.sm} 0;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColorLight};

    &:last-child {
      border-bottom: none;
    }

    &::before {
      display: block;
      content: attr(data-label);
      font-weight: ${props => props.theme.FONT_WEIGHTS.semibold};
      color: ${props => props.theme.COLORS.textColor600};
      margin-bottom: ${props => props.theme.SPACING.xs};
      font-size: ${props => props.theme.FONT_SIZES.xs};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
`;

// === Células personalizadas ===
export const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.SPACING.md};
`;

export const Avatar = styled.div<{ $type?: 'aluno' | 'professor' }>`
  width: 44px;
  height: 44px;
  border-radius: ${props => props.theme.BORDER_RADIUS.full};
  background: ${props => props.$type === 'professor' 
    ? `linear-gradient(135deg, ${props.theme.COLORS.success}, ${props.theme.COLORS.successLight})`
    : `linear-gradient(135deg, ${props.theme.COLORS.primary}, ${props.theme.COLORS.primaryHover})`
  };
  color: ${props => props.theme.COLORS.white};
  font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
  font-size: ${props => props.theme.FONT_SIZES.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.SHADOWS.sm};
  border: 2px solid ${props => props.theme.COLORS.white};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.SPACING.xs};
`;

export const UserName = styled.span`
  font-weight: ${props => props.theme.FONT_WEIGHTS.semibold};
  font-size: ${props => props.theme.FONT_SIZES.sm};
  color: ${props => props.theme.COLORS.textColor400};
`;

export const UserEmail = styled.span`
  font-size: ${props => props.theme.FONT_SIZES.xs};
  color: ${props => props.theme.COLORS.textColor600};
  font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
`;

// Estilo para a coluna "Aula"
export const AulaInfo = styled(UserInfo)``;
export const Disciplina = styled(UserName)``;
export const Descricao = styled(UserEmail)``;

// Estilo para o Status
const statusColors = {
  Pendente: { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
  Confirmado: { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' },
  Realizado: { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
  Cancelado: { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' },
};

export const StatusBadge = styled.span<{ $status: string }>`
  padding: ${props => props.theme.SPACING.xs} ${props => props.theme.SPACING.md};
  border-radius: ${props => props.theme.BORDER_RADIUS.full};
  font-weight: ${props => props.theme.FONT_WEIGHTS.semibold};
  font-size: ${props => props.theme.FONT_SIZES.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid ${props => statusColors[props.$status as keyof typeof statusColors]?.border || '#E5E7EB'};
  background-color: ${props => statusColors[props.$status as keyof typeof statusColors]?.bg || '#F3F4F6'};
  color: ${props => statusColors[props.$status as keyof typeof statusColors]?.text || '#374151'};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.SPACING.xs};
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${props => statusColors[props.$status as keyof typeof statusColors]?.border || '#9CA3AF'};
  }
`;

// Estilo para as Ações
export const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.SPACING.sm};
  align-items: center;
`;

export const ActionIcon = styled.button`
  background: ${props => props.theme.COLORS.borderColorLight};
  border: 1px solid ${props => props.theme.COLORS.borderColor};
  cursor: pointer;
  padding: ${props => props.theme.SPACING.sm};
  border-radius: ${props => props.theme.BORDER_RADIUS.md};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: ${props => props.theme.FONT_SIZES.sm};

  &:hover {
    background: ${props => props.theme.COLORS.tableRowHover};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.SHADOWS.sm};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ConfirmIcon = styled(ActionIcon)`
  color: ${props => props.theme.COLORS.success};
  border-color: ${props => props.theme.COLORS.success};
  
  &:hover {
    background: ${props => props.theme.COLORS.successLight};
    border-color: ${props => props.theme.COLORS.success};
  }
`;

export const CancelIcon = styled(ActionIcon)`
  color: ${props => props.theme.COLORS.danger};
  border-color: ${props => props.theme.COLORS.danger};
  
  &:hover {
    background: ${props => props.theme.COLORS.dangerLight};
    border-color: ${props => props.theme.COLORS.danger};
  }
`;