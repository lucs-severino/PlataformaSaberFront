import { useState } from 'react';
import { Button } from '../Button';
import { 
    Overlay, 
    ModalContainer, 
    CloseButton, 
    ModalHeader, 
    Form, 
    TextArea, 
    ModalFooter,
    Label // Importe o novo Label
} from './styles';

type Props = {
    onClose: () => void;
    onConfirm: (motivo: string) => void;
};

export const CancelarAgendamentoModal = ({ onClose, onConfirm }: Props) => {
    const [motivo, setMotivo] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (motivo.trim()) {
            onConfirm(motivo);
        }
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose} />
                <ModalHeader>Cancelar Agendamento</ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <Label htmlFor="motivo">Por favor, insira o motivo do cancelamento:</Label>
                    <TextArea
                        id="motivo"
                        value={motivo}
                        onChange={e => setMotivo(e.target.value)}
                        required
                        placeholder="Digite aqui..."
                    />
                    <ModalFooter>
                        <Button type="button" variant="secondary" onClick={onClose}>Fechar</Button>
                        <Button type="submit">Confirmar Cancelamento</Button>
                    </ModalFooter>
                </Form>
            </ModalContainer>
        </Overlay>
    );
};