import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 24px 32px;
`;

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

// Cards do Dashboard
export const DashboardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 24px;

    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`;

export const Card = styled.div`
    background-color: ${props => props.theme.COLORS.navbarBackground};
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    padding: 24px;
`;

export const CardTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor400};
    font-weight: 600;
`;

export const CardValue = styled.p`
    margin: 0;
    font-size: ${props => props.theme.FONT_SIZES.xl};
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 800;
`;

// Barra de Filtros
export const FilterBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: ${props => props.theme.COLORS.navbarBackground};
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
    }
`;

export const FilterControls = styled.div`
    display: flex;
    gap: 16px;
    align-items: center; /* <<< CORREÇÃO ADICIONADA AQUI */
    
    & > div {
        width: 200px;
    }

    /* Deixa o campo de busca maior que os outros */
    & > div:first-child {
        width: 300px; 
    }

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        align-items: stretch;
        & > div, & > div:first-child {
            width: 100%;
        }
    }
`;

// Estilos para a tabela e paginação
export const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const Empty = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.COLORS.textColor400};
    flex: 1;
    text-align: center;
`;

export const EmptyLabel = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    font-weight: 700;
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: center;
`;

export const PaginationItem = styled.button<{ $active?: boolean, $isRight?: boolean, $isLeft?: boolean }>`
    /* Estilos da paginação (sem alterações) */
`;