import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

// === Overlay do modal ===
export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 0; 
    box-sizing: border-box;

    @media (max-width: 480px) {
        padding: 0 8px;
    }
`;

// === Container do modal ===
export const ModalContainer = styled.div`
    background-color: ${props => props.theme.COLORS.navbarBackground};
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    padding: 24px;
    position: relative;
    box-sizing: border-box;
    max-height: 90vh;
    overflow-y: auto;

    @media (max-width: 768px) {
        width: 95%;
        padding: 16px;
    }

    @media (max-width: 480px) {
        width: 100%;
        margin: auto;          /* garante centralização vertical */
        max-height: 90vh;
        padding: 12px;
    }
`;

// === Botão de fechar ===
export const CloseButton = styled(MdClose)`
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    font-size: 24px;
    color: ${props => props.theme.COLORS.textColor400};

    @media (max-width: 480px) {
        top: 12px;
        right: 12px;
        font-size: 20px;
    }
`;

// === Header do modal ===
export const ModalHeader = styled.h3`
    margin-top: 0;
    margin-bottom: 24px;
    color: ${props => props.theme.COLORS.textColor500};
    font-size: 1.25rem;

    @media (max-width: 480px) {
        font-size: 1.1rem;
        margin-bottom: 16px;
    }
`;

// === Item de detalhe ===
export const DetailItem = styled.p`
    margin: 8px 0;
    color: ${props => props.theme.COLORS.textColor500};
    font-size: ${props => props.theme.FONT_SIZES.sm};
    
    strong {
        font-weight: 700;
        margin-right: 8px;
        color: ${props => props.theme.COLORS.textColor400};
    }

    @media (max-width: 480px) {
        font-size: 0.75rem;
        margin: 6px 0;
    }
`;

// === Motivo de cancelamento ===
export const MotivoCancelamento = styled.div`
    margin-top: 16px;
    padding: 12px;
    border-radius: 4px;
    background-color: rgba(209, 73, 61, 0.1);
    border: 1px solid rgba(209, 73, 61, 0.3);
    color: ${props => props.theme.COLORS.danger};
    font-size: ${props => props.theme.FONT_SIZES.sm};
    
    strong {
        display: block;
        margin-bottom: 4px;
        color: ${props => props.theme.COLORS.danger};
        font-weight: 700;
    }

    @media (max-width: 480px) {
        padding: 8px;
        font-size: 0.75rem;
    }
`;

// === Lista de histórico ===
export const HistoryList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 24px;
    border-top: 1px solid ${props => props.theme.COLORS.borderColor};

    h4 {
        margin-bottom: 0;
        font-size: 1rem;

        @media (max-width: 480px) {
            font-size: 0.95rem;
        }
    }

    @media (max-width: 480px) {
        margin-top: 16px;
    }
`;

export const HistoryItem = styled.li`
    padding: 12px 0;
    font-size: 0.85rem;
    color: ${props => props.theme.COLORS.textColor400};

    &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    }

    @media (max-width: 480px) {
        padding: 8px 0;
        font-size: 0.8rem;
    }
`;
