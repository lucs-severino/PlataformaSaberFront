import styled, { css } from 'styled-components';


type ButtonElementProps = {
    $size?: 'sm' | 'md';
    $borderRadius?: 'sm' | 'md' | 'rounded';
    $width?: string;
    $variant?: 'primary' | 'secondary'; 
};


export const ButtonElement = styled.button<ButtonElementProps>`
    /* --- Sua lógica de layout e tamanho --- */
    width: ${props => props.$borderRadius === 'rounded' ? (props.$size === 'sm' ? '40px' : '48px') : props.$width};
    height: ${props => props.$borderRadius === 'rounded' ? (props.$size === 'sm' ? '40px' : '48px') : 'auto'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${props => props.$borderRadius !== 'rounded' ? (props.$size === 'sm' ? '8px 16px' : '11px 22px') : '0'};
    outline: none;
    border: 1px solid transparent; // Adicionado para a variante secundária
    border-radius: ${props => props.$borderRadius === 'sm' ? '5px' : props.$borderRadius === 'md' ? '11px' : '50%'};
    font-weight: 600;
    cursor: pointer;
    transition: all .3s;

    /* --- Lógica de cores baseada na prop 'variant' --- */
    ${props => {

        if (props.$variant === 'primary') {
            return css`
                background-color: ${props.theme.COLORS.buttonBackground};
                color: ${props.theme.COLORS.buttonColor};

                &:hover:not(:disabled) {
                    background-color: ${props.theme.COLORS.buttonHover};
                }
            `;
        }
   
        if (props.$variant === 'secondary') {
            return css`
                background-color: transparent;
                color: ${props.theme.COLORS.textColor500};
                border-color: ${props.theme.COLORS.borderColor};

                &:hover:not(:disabled) {
                    background-color: ${props.theme.COLORS.inputPlaceholderColor};
                }
            `;
        }
    }}

    /* Estilo para o estado desabilitado */
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;