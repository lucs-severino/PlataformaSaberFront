// src/components/BookingModal/styles.ts
import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: ${props => props.theme.COLORS.background};
    padding: 25px;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
`;

export const ModalHeader = styled.div`
    margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    font-weight: 700;
    color: ${props => props.theme.COLORS.textColor500};
`;

export const ModalBody = styled.div`
    margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 20px;
    border-top: 1px solid ${props => props.theme.COLORS.borderColor};
`;

export const StepContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
`;

export const Step = styled.div<{ active: boolean }>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => (props.active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor)};
    color: ${props => (props.active ? props.theme.COLORS.white : props.theme.COLORS.textColor400)};
    font-weight: bold;
    transition: background-color 0.3s;
`;

export const StepLine = styled.div<{ active: boolean }>`
    flex: 1;
    height: 2px;
    background-color: ${props => (props.active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor)};
    margin: 0 10px;
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: ${({ theme }) => theme.COLORS.textColor500};
        font-size: ${({ theme }) => theme.FONT_SIZES.sm};
    }
`;

export const TimeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
`;

export const TimeButton = styled.button<{ active: boolean }>`
    padding: 10px;
    border-radius: 4px;
    border: 1px solid ${props => props.active ? props.theme.COLORS.primary : props.theme.COLORS.borderColor};
    background-color: ${props => props.active ? props.theme.COLORS.primary : 'transparent'};
    color: ${props => props.active ? props.theme.COLORS.white : props.theme.COLORS.textColor500};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: ${props => props.theme.COLORS.primary};
    }
`;

export const Summary = styled.div`
    margin-top: 25px;
    padding: 15px;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    background-color: ${props => props.theme.COLORS.primaryBackgroundExtraLight};

    h4 {
        margin-bottom: 10px;
        font-weight: 700;
        color: ${props => props.theme.COLORS.textColor500};
    }
`;

export const SummaryItem = styled.p`
    display: flex;
    justify-content: space-between;
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor500};
    margin-bottom: 5px;

    span {
        font-weight: 600;
        color: ${props => props.theme.COLORS.textColor400};
    }
`;