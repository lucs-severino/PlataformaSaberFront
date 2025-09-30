import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { ButtonElement } from "./styles";

// O tipo Props permanece o mesmo, está correto.
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | 'rounded';
    width?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    fullWidth?: boolean;
};

// A correção está aqui dentro.
export const Button = ({ 
    children, 
    size = 'md', 
    borderRadius = 'md', 
    width = 'auto',
    variant = 'primary',
    fullWidth = false,
    ...rest 
}: Props) => {
    return (
        <ButtonElement
            $size={size}
            $borderRadius={borderRadius}
            $width={fullWidth ? '100%' : width}
            $variant={variant}
            {...rest}
        >
            {children}
        </ButtonElement>
    );
};
