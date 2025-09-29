import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 50px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    gap: 20px;

    @media (max-width: 992px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 25px 20px;
    }
`

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 992px) {
        width: 100%;
        flex-direction: column-reverse;
        align-items: stretch;
        gap: 15px;
    }
`

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
`

export const HeaderTitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.xl};
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 800;
`

export const HeaderSubtitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor500};
`

export const HeaderFilter = styled.div`
    display: flex;
    gap: 14px;
    
    @media (max-width: 992px) {
        width: 100%;
    }

    @media (max-width: 576px) {
        flex-direction: column;
    }
`

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`

export const Body = styled.div`
    flex: 1;
    padding: 40px 50px;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding: 30px 20px;
    }
`
export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;


export const BodyRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
`

export const InformationCard = styled.div<{ $isClickable?: boolean }>`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    padding: 15px;
    border-radius: 10px;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;

    ${({ $isClickable }) => $isClickable && css`
        cursor: pointer;

        &:hover {
            transform: translateY(-5px);
            border-color: ${({ theme }) => theme.COLORS.primary};
        }
    `}
`
export const ChartContainer = styled.div`
    margin-top: 40px;
    padding: 30px;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 10px;
    background-color: ${props => props.theme.COLORS.navbarBackground};
    height: 400px;
`

export const InformationCardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const InformationCardContentValue = styled.span`
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 700;
    font-size: ${props => props.theme.FONT_SIZES.lg};
`

export const InformationCardContentLabel = styled.span`
    color: ${props => props.theme.COLORS.textColor400};
    font-weight: 600;
`