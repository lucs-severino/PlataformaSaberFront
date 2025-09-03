import { MdSearch } from 'react-icons/md';
import { TbTableOff } from 'react-icons/tb';
import styled from 'styled-components';

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
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 40px 50px;
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};

    @media (max-width: 992px) {
        flex-direction: column;
        gap: 20px;
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
`;

export const HeaderSubtitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor500};
`;

export const Filters = styled.div`
    display: flex;
    gap: 15px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
    }
`;

export const Body = styled.div`
    padding: 30px 50px 60px 50px;
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
       padding: 20px 20px 40px 20px;
    }
`;

export const Empty = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.COLORS.textColor400};
    flex: 1;
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
    margin-top: 20px;
    justify-content: center;
    
    @media (max-width: 768px) {
        flex-wrap: wrap; 
        gap: 5px; 
    }
`;

export const PaginationItem = styled.button<{ $active?: boolean, $isRight?: boolean, $isLeft?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    width: 50px;
    background-color: ${props => props.$active ? props.theme.COLORS.primary : 'transparent'};
    color: ${props => props.$active ? props.theme.COLORS.buttonColor : props.theme.COLORS.textColor400};
    border: 1px solid ${props => props.$active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor};
    border-radius: ${props => props.$isLeft ? '5px 0 0 5px' : props.$isRight ? '0 5px 5px 0' : '0px'};
    outline: none;
    transition: all .2s;
    cursor: pointer;

    &:hover:not(:disabled) {
        background-color: ${props => props.theme.COLORS.buttonHover};
        color: ${props => props.theme.COLORS.buttonColor};
        border-color: ${props => props.theme.COLORS.buttonHover};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;