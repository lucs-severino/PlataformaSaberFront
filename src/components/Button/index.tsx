import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { ButtonElement } from "./styles";

// O tipo Props permanece o mesmo, está correto.
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    size?: 'sm' | 'md';
    borderRadius?: 'sm' | 'md' | 'rounded';
    width?: string;
    variant?: 'primary' | 'secondary';
};

// A correção está aqui dentro.
export const Button = ({ 
    children, 
    size = 'sm', 
    borderRadius = 'sm', 
    width = 'auto',
    variant = 'primary',
    ...rest 
}: Props) => {
    return (
        <ButtonElement
            // CORREÇÃO: Adicione o cifrão ($) ao passar as props
            // para o styled-component.
            $size={size}
            $borderRadius={borderRadius}
            $width={width}
            $variant={variant}
            {...rest} // Passa props como type, onClick, disabled, etc.
        >
            {children}
        </ButtonElement>
    );
};
