import styled from 'styled-components';

// --- Estilos copiados de outras páginas para consistência ---

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; /* Adicionado para garantir alinhamento vertical */
    padding: 40px 50px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};

    /* ===== CORREÇÃO PARA SMARTPHONE ===== */
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        padding: 25px 20px;
    }
`;

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HeaderTitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.xl};
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 800;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 50px;
    align-items: center; // Centraliza o formulário na página
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;

    /* ===== CORREÇÃO PARA SMARTPHONE ===== */
    @media (max-width: 768px) {
        width: 100%;
    }
`;

// --- Estilos específicos para esta página (antigo modal) ---

export const Form = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.background}; // Adicionado para garantir o fundo
  border: 1px solid ${props => props.theme.COLORS.borderColor};
`;

export const StepContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
`;

export const Step = styled.div<{ active: boolean }>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => (props.active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor)};
    color: ${props => (props.active ? props.theme.COLORS.white : props.theme.COLORS.textColor400)};
    font-weight: bold;
    transition: background-color 0.3s;
`;

export const StepLine = styled.div<{ active: boolean }>`
    flex: 1;
    max-width: 200px;
    height: 2px;
    background-color: ${props => (props.active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor)};
    margin: 0 10px;
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: ${({ theme }) => theme.COLORS.textColor500};
        font-size: ${({ theme }) => theme.FONT_SIZES.sm};
    }
`;

export const TimeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
`;

export const TimeButton = styled.button<{ active: boolean }>`
    padding: 10px;
    border-radius: 4px;
    border: 1px solid ${props => props.active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor};
    background-color: ${props => props.active ? props.theme.COLORS.primary : 'transparent'};
    color: ${props => props.active ? props.theme.COLORS.white : props.theme.COLORS.textColor500};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: ${props => props.theme.COLORS.primary};
    }
`;

export const Summary = styled.div`
    margin-top: 25px;
    padding: 15px;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    background-color: ${props => props.theme.COLORS.primaryBackgroundExtraLight};

    h4 {
        margin-bottom: 10px;
        font-weight: 700;
        color: ${props => props.theme.COLORS.textColor500};
    }
`;

export const SummaryItem = styled.p`
    display: flex;
    justify-content: space-between;
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor500};
    margin-bottom: 5px;

    span {
        font-weight: 600;
        color: ${props => props.theme.COLORS.textColor400};
    }
`;