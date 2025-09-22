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
    padding: 16px 24px; // menor que antes
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    min-height: 60px;
`

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

export const HeaderTitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.lg}; // menor que xl
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 700;
`

export const HeaderSubtitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    color: ${props => props.theme.COLORS.textColor400};
`

export const HeaderDeleteAccount = styled.div``

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px 24px; // antes 30px 50px
`

export const Footer = styled.div`
    padding: 10px 24px;
    display: flex;
    justify-content: flex-end;
`
