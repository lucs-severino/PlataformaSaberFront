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
    padding: 40px 0;
`;

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
    align-items: center;
    
    & > div {
        width: 200px;
    }

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
    padding: 40px 0;
`;

export const EmptyLabel = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    font-weight: 700;
`;

export const TabContainer = styled.div`
    display: flex;
    gap: 8px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    margin-bottom: 24px;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
    padding: 10px 20px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    font-size: 1rem;
    font-weight: 600;
    
    color: ${props => props.$isActive ? props.theme.COLORS.primary : props.theme.COLORS.textColor400};
    border-bottom-color: ${props => props.$isActive ? props.theme.COLORS.primary : 'transparent'};
    
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${props => props.theme.COLORS.primary};
    }
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    flex-wrap: wrap; 
    gap: 5px; 
`;

export const PaginationItem = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    min-width: 45px;
    padding: 0 10px;
    background-color: ${props => props.$active ? props.theme.COLORS.primary : 'transparent'};
    color: ${props => props.$active ? props.theme.COLORS.buttonColor : props.theme.COLORS.textColor400};
    border: 1px solid ${props => props.$active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor};
    border-radius: 4px;
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