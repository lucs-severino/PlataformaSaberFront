import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 50px;
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

export const BodyRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;

    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`

export const InformationCard = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    width: 100%;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    padding: 35px 30px;
    border-radius: 10px;
    box-sizing: border-box;
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