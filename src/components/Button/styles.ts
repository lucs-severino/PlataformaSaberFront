import styled, { css } from 'styled-components';


type ButtonElementProps = {
    $size?: 'xs' | 'sm' | 'md' | 'lg';
    $borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | 'rounded';
    $width?: string;
    $variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'; 
};


export const ButtonElement = styled.button<ButtonElementProps>`
    /* Base styles */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.SPACING.sm};
    outline: none;
    border: 1px solid transparent;
    font-weight: ${props => props.theme.FONT_WEIGHTS.semibold};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    position: relative;
    overflow: hidden;

    /* Size variants */
    ${props => {
        switch (props.$size) {
            case 'xs':
                return css`
                    height: 2rem;
                    padding: 0 ${props.theme.SPACING.md};
                    font-size: ${props.theme.FONT_SIZES.xs};
                `;
            case 'sm':
                return css`
                    height: 2.25rem;
                    padding: 0 ${props.theme.SPACING.lg};
                    font-size: ${props.theme.FONT_SIZES.sm};
                `;
            case 'md':
                return css`
                    height: 2.5rem;
                    padding: 0 ${props.theme.SPACING.xl};
                    font-size: ${props.theme.FONT_SIZES.md};
                `;
            case 'lg':
                return css`
                    height: 3rem;
                    padding: 0 ${props.theme.SPACING['2xl']};
                    font-size: ${props.theme.FONT_SIZES.lg};
                `;
            default:
                return css`
                    height: 2.5rem;
                    padding: 0 ${props.theme.SPACING.xl};
                    font-size: ${props.theme.FONT_SIZES.md};
                `;
        }
    }}

    /* Border radius */
    ${props => {
        if (props.$borderRadius === 'rounded') {
            return css`
                border-radius: ${props.theme.BORDER_RADIUS.full};
                width: ${props.$size === 'xs' ? '2rem' : props.$size === 'sm' ? '2.25rem' : props.$size === 'lg' ? '3rem' : '2.5rem'};
                padding: 0;
            `;
        }
        
        const radiusMap = {
            sm: props.theme.BORDER_RADIUS.sm,
            md: props.theme.BORDER_RADIUS.md,
            lg: props.theme.BORDER_RADIUS.lg,
            xl: props.theme.BORDER_RADIUS.xl,
        };
        
        return css`
            border-radius: ${radiusMap[props.$borderRadius || 'md']};
        `;
    }}

    /* Width */
    width: ${props => props.$width};

    /* Variant styles */
    ${props => {
        switch (props.$variant) {
            case 'primary':
                return css`
                    background: linear-gradient(135deg, ${props.theme.COLORS.primary}, ${props.theme.COLORS.primaryHover});
                    color: ${props.theme.COLORS.white};
                    border-color: ${props.theme.COLORS.primary};
                    position: relative;
                    overflow: hidden;

                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                        transition: left 0.5s;
                    }

                    &:hover:not(:disabled) {
                        background: linear-gradient(135deg, ${props.theme.COLORS.primaryHover}, ${props.theme.COLORS.primary});
                        border-color: ${props.theme.COLORS.primaryHover};
                        transform: translateY(-2px);
                        box-shadow: ${props.theme.SHADOWS.lg};
                        
                        &::before {
                            left: 100%;
                        }
                    }

                    &:active:not(:disabled) {
                        transform: translateY(0);
                        box-shadow: ${props.theme.SHADOWS.md};
                    }
                `;
            
            case 'secondary':
                return css`
                    background-color: ${props.theme.COLORS.buttonSecondary};
                    color: ${props.theme.COLORS.textColor500};
                    border-color: ${props.theme.COLORS.borderColor};

                    &:hover:not(:disabled) {
                        background-color: ${props.theme.COLORS.buttonSecondaryHover};
                        border-color: ${props.theme.COLORS.textColor600};
                    }
                `;
            
            case 'outline':
                return css`
                    background-color: transparent;
                    color: ${props.theme.COLORS.primary};
                    border-color: ${props.theme.COLORS.primary};

                    &:hover:not(:disabled) {
                        background-color: ${props.theme.COLORS.primaryLight};
                        color: ${props.theme.COLORS.primaryDark};
                    }
                `;
            
            case 'ghost':
                return css`
                    background-color: transparent;
                    color: ${props.theme.COLORS.textColor500};
                    border-color: transparent;

                    &:hover:not(:disabled) {
                        background-color: ${props.theme.COLORS.borderColorLight};
                        color: ${props.theme.COLORS.textColor400};
                    }
                `;
            
            case 'danger':
                return css`
                    background-color: ${props.theme.COLORS.danger};
                    color: ${props.theme.COLORS.white};
                    border-color: ${props.theme.COLORS.danger};

                    &:hover:not(:disabled) {
                        background-color: #dc2626;
                        border-color: #dc2626;
                        transform: translateY(-1px);
                        box-shadow: ${props.theme.SHADOWS.md};
                    }
                `;
            
            default:
                return css`
                    background-color: ${props.theme.COLORS.primary};
                    color: ${props.theme.COLORS.white};
                    border-color: ${props.theme.COLORS.primary};
                `;
        }
    }}

    /* Disabled state */
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
    }

    /* Focus state */
    &:focus-visible {
        outline: 2px solid ${props => props.theme.COLORS.primary};
        outline-offset: 2px;
    }

    /* Loading state */
    &[data-loading="true"] {
        pointer-events: none;
        opacity: 0.7;
    }
`;