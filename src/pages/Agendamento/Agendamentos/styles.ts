// src/pages/Agendamento/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
    padding: 30px 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
`;
export const HeaderInfo = styled.div``;
export const HeaderTitle = styled.h1`
    font-size: ${props => props.theme.FONT_SIZES.xl};
    font-weight: 800;
    color: ${props => props.theme.COLORS.textColor500};
`;
export const HeaderSubtitle = styled.p`
    color: ${props => props.theme.COLORS.textColor400};
`;
export const Body = styled.div`
    padding-top: 30px;
`;
export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
`;
export const StatCard = styled.div`
    background-color: ${props => props.theme.COLORS.background};
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    padding: 20px;
`;
export const StatCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.COLORS.textColor400};
`;
export const StatCardTitle = styled.h3`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    font-weight: 600;
`;
export const StatCardContent = styled.div``;
export const StatCardValue = styled.p`
    font-size: 2rem;
    font-weight: 800;
    color: ${props => props.theme.COLORS.primary};
`;
export const StatCardDescription = styled.p`
    font-size: 0.8rem;
    color: ${props => props.theme.COLORS.textColor400};
`;
export const UpcomingClasses = styled.div`
    h2 {
        font-size: ${props => props.theme.FONT_SIZES.lg};
        font-weight: 700;
        margin-bottom: 20px;
        color: ${props => props.theme.COLORS.textColor500};
    }
`;
export const ClassItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    margin-bottom: 10px;
    &:hover {
        background-color: ${props => props.theme.COLORS.tableRowHover};
    }
`;
export const ClassItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    span {
        font-weight: 600;
    }
    small {
        color: ${props => props.theme.COLORS.textColor400};
    }
`;
export const ClassItemDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: ${props => props.theme.FONT_SIZES.sm};
`;
export const Badge = styled.span`
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: ${props => props.theme.COLORS.primaryBackgroundExtraLight};
    color: ${props => props.theme.COLORS.primary};
`;