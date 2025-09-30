import { type InputHTMLAttributes, useId } from "react";
import { Container, Input, Label, InputWrapper, HelperText, ErrorText, IconWrapper } from "./styles";


type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    borderRadius?: 'sm' | 'md' | 'lg' | 'xl';
    size?: 'sm' | 'md' | 'lg';
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};


const TextInput = ({ 
    label, 
    borderRadius = 'md', 
    size = 'md',
    error,
    helperText,
    leftIcon,
    rightIcon,
    ...rest 
}: Props) => {

    const fallbackId = useId();
    const id = rest.id || fallbackId;

    return (
        <Container>
            {label && <Label htmlFor={id}>{label}</Label>}
            
            <InputWrapper>
                {leftIcon && (
                    <IconWrapper $position="left">
                        {leftIcon}
                    </IconWrapper>
                )}
                
                <Input
                    id={id}
                    $borderRadius={borderRadius}
                    $size={size}
                    $hasLeftIcon={!!leftIcon}
                    $hasRightIcon={!!rightIcon}
                    $hasError={!!error}
                    {...rest}
                />
                
                {rightIcon && (
                    <IconWrapper $position="right">
                        {rightIcon}
                    </IconWrapper>
                )}
            </InputWrapper>
            
            {error && <ErrorText>{error}</ErrorText>}
            {helperText && !error && <HelperText>{helperText}</HelperText>}
        </Container>
    );
};

export default TextInput;
