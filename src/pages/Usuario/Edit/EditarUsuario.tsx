import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { getUsuario, updateUsuario } from "../../../services/requests";

import { Button } from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { ActionButtons, Body, Container, Form, FormGrid, FormGroup, Header, HeaderInfo, HeaderTitle, Loading } from "./styles";
import { Label } from "../../../components/TextInput/styles";
import { validateCPF } from "../../../utils/cpfValidator";

export type UsuarioFormData = {
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    tipoPessoa: 'Aluno' | 'Professor' | 'Administracao';
    status: 'Ativo' | 'Desativado';
};

export const EditarUsuario = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const theme = useTheme();

    const [loadingRequest, setLoadingRequest] = useState(true);
    const [showAlert, setShowAlert] = useState({ type: "error", message: "", show: false });

    const [formData, setFormData] = useState<UsuarioFormData>({
        nome: '',
        email: '',
        cpf: '',
        dataNascimento: '',
        tipoPessoa: 'Aluno',
        status: 'Ativo'
    });

    const handleGetUsuario = async () => {
        if (!id) return;
        setLoadingRequest(true);
        const response = await getUsuario(id);
        setLoadingRequest(false);

        if (response.data) {
            const userData = response.data;

            const newFormData: UsuarioFormData = {
                nome: userData.nome,
                email: userData.email,
                cpf: userData.cpf,
                dataNascimento: new Date(userData.dataNascimento).toISOString().split('T')[0],
                status: userData.status as UsuarioFormData['status'],
                tipoPessoa: userData.tipoPessoa as UsuarioFormData['tipoPessoa']
            };

            setFormData(newFormData);

        } else if (response.error) {
            setShowAlert({ type: "error", message: `Erro ao buscar usuário: ${response.error}`, show: true });
        }
    };

    useEffect(() => {
        handleGetUsuario();
    }, [id]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name?: string; value: string } }
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name!]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateCPF(formData.cpf)) {
            setShowAlert({ type: "error", message: "O CPF informado é inválido.", show: true });
            return;
        }

        if (!id) return;

        setLoadingRequest(true);
        const response = await updateUsuario(id, formData);
        setLoadingRequest(false);

        if (response.data) {
            setShowAlert({ type: "success", message: "Usuário atualizado com sucesso!", show: true });
            setTimeout(() => navigate('/usuarios'), 1500);
        } else {
            setShowAlert({ type: "error", message: `Erro ao atualizar: ${response.error}`, show: true });
        }
    };

    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Editar Usuário</HeaderTitle>
                </HeaderInfo>
                <ActionButtons>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(-1)}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" form="edit-user-form">
                        Salvar Alterações
                    </Button>
                </ActionButtons>
            </Header>

            <Alert
                type={showAlert.type}
                title={showAlert.message}
                show={showAlert.show}
                setShow={show => setShowAlert({ ...showAlert, show })}
            />

            {loadingRequest ? (
                <Loading>
                    <ScaleLoader color={theme.COLORS.primary} />
                </Loading>
            ) : (
                <Body>
                    <Form onSubmit={handleSubmit} id="edit-user-form">
                        <FormGrid>
                            <FormGroup>
                                <Label>Nome Completo</Label>
                                <TextInput name="nome" value={formData.nome} onChange={handleInputChange} required borderRadius="sm" />
                            </FormGroup>
                            <FormGroup>
                                <Label>E-mail</Label>
                                <TextInput name="email" type="email" value={formData.email} onChange={handleInputChange} borderRadius="sm" required />
                            </FormGroup>
                            <FormGroup>
                                <Label>CPF</Label>
                                <TextInput name="cpf" value={formData.cpf} onChange={handleInputChange} required borderRadius="sm" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Data de Nascimento</Label>
                                <TextInput name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleInputChange} required borderRadius="sm" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Tipo</Label>
                                <SelectInput
                                    name="tipoPessoa"
                                    value={formData.tipoPessoa}
                                    onChange={handleInputChange}
                                    options={[
                                        { label: 'Professor', value: 'Professor' },
                                        { label: 'Administração', value: 'Administracao' },
                                        { label: 'Aluno', value: 'Aluno' },
                                    ]}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Status</Label>
                                <SelectInput
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    options={[
                                        { label: 'Ativo', value: 'Ativo' },
                                        { label: 'Desativado', value: 'Desativado' },
                                    ]}
                                />
                            </FormGroup>
                        </FormGrid>
                    </Form>
                </Body>
            )}
        </Container>
    );
};