import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${props => props.theme.COLORS.background};
    min-height: 100vh;
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
    background: ${props => props.theme.COLORS.background};
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
`

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

export const HeaderTitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    color: ${props => props.theme.COLORS.textColor400};
    font-weight: 700;
`

export const HeaderSubtitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor400};
`

export const HeaderDeleteAccount = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

export const TabContainer = styled.div`
    display: flex;
    gap: 0;
    padding: 0 24px;
    background: ${props => props.theme.COLORS.background};
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
    padding: 16px 24px;
    cursor: pointer;
    background-color: ${props => props.$isActive ? props.theme.COLORS.primaryBackgroundExtraLight : 'transparent'};
    border: none;
    border-bottom: 3px solid ${props => props.$isActive ? props.theme.COLORS.musicalBlue : 'transparent'};
    font-size: ${props => props.theme.FONT_SIZES.sm};
    font-weight: 600;
    border-radius: 8px 8px 0 0;
    margin-right: 4px;
    
    color: ${props => props.$isActive ? props.theme.COLORS.musicalBlue : props.theme.COLORS.textColor500};
    
    transition: all 0.3s ease-in-out;

    &:hover {
        color: ${props => props.theme.COLORS.musicalBlue};
        background-color: ${props => props.theme.COLORS.primaryBackgroundExtraLight};
    }
`;


export const Body = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 32px 24px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;


export const FormSection = styled.div`
    background: ${props => props.theme.COLORS.background};
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    box-shadow: ${props => props.theme.SHADOWS.md};
    overflow: hidden;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: ${props => props.theme.COLORS.musicalBlue};
    }
`;

export const FormHeader = styled.div`
    padding: 24px 24px 16px 24px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    background: ${props => props.theme.COLORS.primaryBackgroundExtraLight};
`;

export const FormTitle = styled.h3`
    margin: 0;
    font-size: ${props => props.theme.FONT_SIZES.lg};
    color: ${props => props.theme.COLORS.textColor400};
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
        content: '';
        width: 4px;
        height: 20px;
        background: ${props => props.theme.COLORS.musicalBlue};
        border-radius: 2px;
    }
`;

export const FormBody = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px; 
    flex: 1;
`;

export const FormFooter = styled.div`
    padding: 20px 24px;
    border-top: 1px solid ${props => props.theme.COLORS.borderColor};
    display: flex;
    justify-content: flex-end;
    background: ${props => props.theme.COLORS.primaryBackgroundExtraLight};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;