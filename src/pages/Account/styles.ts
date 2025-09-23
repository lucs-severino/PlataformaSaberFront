import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    min-height: 60px;
`

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

export const HeaderTitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 700;
`

export const HeaderSubtitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    color: ${props => props.theme.COLORS.textColor400};
`

export const HeaderDeleteAccount = styled.div``

export const TabContainer = styled.div`
    display: flex;
    gap: 8px;
    padding: 0 24px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
    padding: 12px 18px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    font-size: ${props => props.theme.FONT_SIZES.sm};
    font-weight: 600;
    
    color: ${props => props.$isActive ? props.theme.COLORS.primary : props.theme.COLORS.textColor400};
    border-bottom-color: ${props => props.$isActive ? props.theme.COLORS.primary : 'transparent'};
    
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${props => props.theme.COLORS.primary};
    }
`;


export const Body = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex; // Alterado de 'grid' para 'flex'
    justify-content: center; // Centraliza o card horizontalmente
    align-items: flex-start; // Alinha o card no topo
`;


export const FormSection = styled.div`
    background-color: ${props => props.theme.COLORS.navbarBackground};
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px; // Largura máxima do card
`;

export const FormHeader = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
`;

export const FormTitle = styled.h3`
    margin: 0;
    font-size: ${props => props.theme.FONT_SIZES.md};
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 600;
`;

export const FormBody = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px; 
    flex: 1;
`;

export const FormFooter = styled.div`
    padding: 16px 20px;
    border-top: 1px solid ${props => props.theme.COLORS.borderColor};
    display: flex;
    justify-content: flex-end;
    background-color: ${props => props.theme.COLORS.primaryBackgroundExtraLight};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;