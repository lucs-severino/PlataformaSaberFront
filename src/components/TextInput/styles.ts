import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.SPACING.sm};
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${props => props.theme.FONT_SIZES.sm};
  font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
  color: ${props => props.theme.COLORS.textColor500};
  margin-bottom: ${props => props.theme.SPACING.xs};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.COLORS.textColor600};
  font-size: ${props => props.theme.FONT_SIZES.lg};
  z-index: 1;
  
  ${props => props.$position === 'left' && css`
    left: ${props.theme.SPACING.md};
  `}
  
  ${props => props.$position === 'right' && css`
    right: ${props.theme.SPACING.md};
  `}
`;

export const Input = styled.input<{ 
  $borderRadius?: "sm" | "md" | "lg" | "xl";
  $size?: "sm" | "md" | "lg";
  $hasLeftIcon?: boolean;
  $hasRightIcon?: boolean;
  $hasError?: boolean;
}>`
  width: 100%;
  background-color: ${props => props.theme.COLORS.inputBackground};
  color: ${props => props.theme.COLORS.inputColor};
  border: 1px solid ${props => props.$hasError ? props.theme.COLORS.danger : props.theme.COLORS.inputBorderColor};
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  
  /* Size variants */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`
          height: 2rem;
          padding: 0 ${props.theme.SPACING.md};
          font-size: ${props.theme.FONT_SIZES.sm};
        `;
      case 'md':
        return css`
          height: 2.5rem;
          padding: 0 ${props.theme.SPACING.lg};
          font-size: ${props.theme.FONT_SIZES.md};
        `;
      case 'lg':
        return css`
          height: 3rem;
          padding: 0 ${props.theme.SPACING.xl};
          font-size: ${props.theme.FONT_SIZES.lg};
        `;
      default:
        return css`
          height: 2.5rem;
          padding: 0 ${props.theme.SPACING.lg};
          font-size: ${props.theme.FONT_SIZES.md};
        `;
    }
  }}

  /* Border radius */
  ${props => {
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

  /* Icon padding adjustments */
  ${props => props.$hasLeftIcon && css`
    padding-left: 2.5rem;
  `}
  
  ${props => props.$hasRightIcon && css`
    padding-right: 2.5rem;
  `}

  &::placeholder {
    color: ${props => props.theme.COLORS.inputPlaceholderColor};
    font-weight: ${props => props.theme.FONT_WEIGHTS.normal};
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.COLORS.inputBackgroundHover};
    border-color: ${props => props.$hasError ? props.theme.COLORS.danger : props.theme.COLORS.textColor600};
  }

  &:focus {
    border-color: ${props => props.$hasError ? props.theme.COLORS.danger : props.theme.COLORS.inputBorderColorFocus};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? props.theme.COLORS.dangerLight : props.theme.COLORS.primaryLight};
  }

  &:disabled {
    background-color: ${props => props.theme.COLORS.borderColorLight};
    color: ${props => props.theme.COLORS.textColor600};
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Date input specific styles */
  &::-webkit-datetime-edit {
    color: ${props => props.theme.COLORS.inputPlaceholderColor};
  }

  &[type="date"]:valid {
    color: ${props => props.theme.COLORS.inputColor};
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    filter: invert(0.5);

    &:hover {
      opacity: 1;
    }
  }

  /* Autofill styles */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${props => props.theme.COLORS.inputColor} !important;
    box-shadow: 0 0 0px 1000px ${props => props.theme.COLORS.inputBackground} inset !important;
    transition: background-color 0s ease-in-out 0s !important;
  }
`;

export const HelperText = styled.span`
  font-size: ${props => props.theme.FONT_SIZES.xs};
  color: ${props => props.theme.COLORS.textColor600};
  margin-top: ${props => props.theme.SPACING.xs};
`;

export const ErrorText = styled.span`
  font-size: ${props => props.theme.FONT_SIZES.xs};
  color: ${props => props.theme.COLORS.danger};
  margin-top: ${props => props.theme.SPACING.xs};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.SPACING.xs};
  
  &::before {
    content: "⚠";
    font-size: ${props => props.theme.FONT_SIZES.sm};
  }
`;
