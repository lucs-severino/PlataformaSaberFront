import { MdSearch } from 'react-icons/md';
import { TbTableOff } from 'react-icons/tb';
import styled from 'styled-components';

// ... (Nenhuma mudança até a seção dos cards de estatísticas)
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 40px 0;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 50px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    flex-shrink: 0;

    @media (max-width: 992px) {
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
    }

    @media (max-width: 768px) {
        padding: 20px 20px;
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

    @media (max-width: 768px) {
        font-size: ${props => props.theme.FONT_SIZES.lg};
    }
`;

export const HeaderSubtitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor500};
`;

export const FilterWrapper = styled.div`
    @media (max-width: 992px) {
        width: 100%;
    }
`;

export const FilterToggleButton = styled.button`
    display: none;

    @media (max-width: 992px) {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 10px 16px;
        background-color: ${props => props.theme.COLORS.navbarBackground};
        border: 1px solid ${props => props.theme.COLORS.borderColor};
        border-radius: 8px;
        font-size: ${props => props.theme.FONT_SIZES.md};
        color: ${props => props.theme.COLORS.textColor500};
        font-weight: 600;
        cursor: pointer;

        span {
            flex: 1;
            text-align: left;
        }
    }
`;

export const FilterContent = styled.div<{ $isVisible: boolean }>`
    display: block;

    @media (max-width: 992px) {
        display: ${props => props.$isVisible ? 'block' : 'none'};
        margin-top: ${props => props.$isVisible ? '15px' : '0'};
    }
`;

export const HeaderSearch = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    min-width: 450px;

    & > div:first-of-type {
        width: 200px;
        flex-shrink: 0;
    }

    @media (max-width: 992px) {
        min-width: 100%;
    }

    @media (max-width: 576px) {
        flex-direction: column;
        align-items: stretch;

        & > div:first-of-type {
            width: 100%;
        }
    }
`;

export const HeaderSearchInput = styled.div`
    flex: 1;
`;

export const HeaderSearchIcon = styled(MdSearch)`
    font-size: ${props => props.theme.FONT_SIZES.md};
`;

export const Body = styled.div`
    flex: 1;
    overflow-y: auto;
`;

export const ContentArea = styled.div`
    padding: 30px 50px 60px 50px;

    @media (max-width: 768px) {
        padding: 20px 20px 40px 20px;
    }
`;

/* ===== ÁREA CORRIGIDA ===== */
export const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Largura mínima ainda menor */
    gap: 15px; /* Espaçamento entre cards diminuído */
    margin-bottom: 30px;
`;

export const StatCard = styled.div`
    background-color: ${props => props.theme.COLORS.navbarBackground};
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    padding: 12px 16px; /* Padding vertical diminuído */
`;

export const StatCardTitle = styled.h3`
    margin: 0 0 10px 0;
    font-size: ${props => props.theme.FONT_SIZES.sm}; /* Título menor */
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 600;
`;

export const StatCardRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StatCardLabel = styled.span`
    color: ${props => props.theme.COLORS.textColor400};
    font-size: 0.8rem; /* Labels um pouco menores */
`;

export const StatCardValue = styled.span<{ color?: string }>`
    font-weight: 700;
    font-size: ${props => props.theme.FONT_SIZES.md}; /* Valor numérico menor */
    color: ${props => props.color || props.theme.COLORS.textColor500};
`;
/* ===== FIM DA ÁREA CORRIGIDA ===== */


export const Empty = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.COLORS.textColor400};
    padding: 40px 0;
`;

export const EmptyLabel = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    font-weight: 700;
`;

export const EmptyIcon = styled(TbTableOff)`
    font-size: ${props => props.theme.FONT_SIZES.xxl};
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    flex-wrap: wrap; 
    gap: 5px; 
`;

export const PaginationItem = styled.button<{ $active?: boolean, $isRight?: boolean, $isLeft?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    min-width: 45px;
    padding: 0 10px;
    background-color: ${props => props.$active ? props.theme.COLORS.primary : 'transparent'};
    color: ${props => props.$active ? props.theme.COLORS.buttonColor : props.theme.COLORS.textColor400};
    border: 1px solid ${props => props.$active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor};
    border-radius: ${props => props.$isLeft ? '5px 0 0 5px' : props.$isRight ? '0 5px 5px 0' : '0px'};
    outline: none;
    transition: all .2s;
    cursor: pointer;

    &:hover:not(:disabled) {
        background-color: ${props => props.theme.COLORS.primaryHover};
        color: ${props => props.theme.COLORS.buttonColor};
        border-color: ${props => props.theme.COLORS.primaryHover};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;