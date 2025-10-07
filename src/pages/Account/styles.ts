import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
    background: white;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, ${props => props.theme.COLORS.primary}, transparent);
        opacity: 0.4;
    }
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
    background: linear-gradient(135deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
    background: white;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
    padding: 16px 24px;
    cursor: pointer;
    background-color: ${props => props.$isActive ? props.theme.COLORS.primaryBackgroundExtraLight : 'transparent'};
    border: none;
    border-bottom: 3px solid ${props => props.$isActive ? props.theme.COLORS.primary : 'transparent'};
    font-size: ${props => props.theme.FONT_SIZES.sm};
    font-weight: 600;
    border-radius: 8px 8px 0 0;
    margin-right: 4px;
    
    color: ${props => props.$isActive ? props.theme.COLORS.primary : props.theme.COLORS.textColor500};
    
    transition: all 0.3s ease-in-out;

    &:hover {
        color: ${props => props.theme.COLORS.primary};
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
    background: white;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
    }
`;

export const FormHeader = styled.div`
    padding: 24px 24px 16px 24px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    background: linear-gradient(135deg, ${props => props.theme.COLORS.primaryBackgroundExtraLight}, white);
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
        background: linear-gradient(135deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
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
    background: linear-gradient(135deg, ${props => props.theme.COLORS.primaryBackgroundExtraLight}, white);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;