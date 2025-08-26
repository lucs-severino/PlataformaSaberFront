import { type InputHTMLAttributes, useId } from "react";
import { Container, Input, Label } from "./styles";


type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    borderRadius?: 'sm' | 'md';
};


const TextInput = ({ label, borderRadius = 'md', ...rest }: Props) => {

    const fallbackId = useId();

    const id = rest.id || fallbackId;

    return (
        <Container>
            {}
            {label && <Label htmlFor={id}>{label}</Label>}

            {
            }
            <Input
                id={id}
                $borderRadius={borderRadius}
                {...rest}
            />
        </Container>
    );
};

export default TextInput;
