import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 12px 24px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    flex-shrink: 0;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, ${props => props.theme.COLORS.primary}, transparent);
        opacity: 0.3;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 8px 16px;
    }
`;

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const HeaderTitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 600;

    @media (max-width: 480px) {
        font-size: ${props => props.theme.FONT_SIZES.md};
    }
`;

export const Body = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 30px 20px;
    overflow-y: auto;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const Form = styled.div`
  width: 100%;
  max-width: 550px; /* << Diminuímos ainda mais a largura máxima */
  padding: 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.navbarBackground};
  border: 1px solid ${props => props.theme.COLORS.borderColor};
  box-sizing: border-box;
  height: fit-content;

  @media (max-width: 480px) {
      padding: 20px;
  }
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
    max-width: 120px; /* Linha ainda menor */
    height: 2px;
    background-color: ${props => (props.active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor)};
    margin: 0 10px;

    @media (max-width: 480px) {
        max-width: 50px;
    }
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

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 4px;
        align-items: flex-start;
    }
`;