import styled from 'styled-components';
// Reutiliza os estilos base do outro modal para manter a consistência
export { Overlay, CloseButton, ModalHeader } from '../DetalheAgendamentoModal/styles';

export const ModalContainer = styled.div`
    background-color: ${props => props.theme.COLORS.navbarBackground};
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    border-radius: 8px;
    width: 90%;
    /* --- CORREÇÃO AQUI: Deixa o modal mais estreito --- */
    max-width: 450px; 
    padding: 24px;
    position: relative;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 8px; 
`;

export const Label = styled.label`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor500};
    font-weight: 600;
`;

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 120px;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.COLORS.borderColor};
    background-color: ${props => props.theme.COLORS.background};
    color: ${props => props.theme.COLORS.textColor500};
    font-family: inherit;
    resize: vertical;
    box-sizing: border-box;

    &:focus {
        border-color: ${props => props.theme.COLORS.primary};
        outline: none;
    }
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
`;