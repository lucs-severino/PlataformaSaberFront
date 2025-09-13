import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { Button } from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { ActionButtons, Body, Container, Form, FormGrid, FormGroup, Header, HeaderInfo, HeaderTitle, Loading } from "./styles";
import { Label } from "../../../components/TextInput/styles";
import { newUsuario } from "../../../services/requests";
import { validateCPF } from "../../../utils/cpfValidator";

export type UsuarioFormData = {
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    tipoPessoa: 'Aluno' | 'Professor' | 'Administracao';
    status: 'Ativo' | 'Desativado';
    especializacao: string;
};

export const CadastrarUsuario = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const [loadingRequest, setLoadingRequest] = useState(false);
    const [showAlert, setShowAlert] = useState({ type: "error", message: "", show: false });

    const [formData, setFormData] = useState<UsuarioFormData>({
        nome: '',
        email: '',
        cpf: '',
        dataNascimento: '',
        tipoPessoa: 'Aluno',
        status: 'Ativo',
        especializacao: ''
    });

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

        setLoadingRequest(true);
        const response = await newUsuario(formData);
        setLoadingRequest(false);

        if (response.data) {
            setShowAlert({
                type: "success",
                message: "Colaborador cadastrado com sucesso!",
                show: true,
            });

            setTimeout(() => navigate("/usuarios"), 1500);
        } else {
            setShowAlert({
                type: "error",
                message: `Erro ao cadastrar: ${response.error}`,
                show: true,
            });
        }
    };

    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Cadastrar</HeaderTitle>
                </HeaderInfo>
                <ActionButtons>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(-1)}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" form="create-user-form" disabled={loadingRequest}>
                        {loadingRequest ? 'Salvando...' : 'Salvar'}
                    </Button>
                </ActionButtons>
            </Header>

            <Alert
                type={showAlert.type}
                title={showAlert.message}
                show={showAlert.show}
                setShow={show => setShowAlert({ ...showAlert, show })}
            />

            <Body>
                {loadingRequest && (
                    <Loading>
                        <ScaleLoader color={theme.COLORS.primary} />
                    </Loading>
                )}
                <Form onSubmit={handleSubmit} id="create-user-form">
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
                                    { label: 'Aluno', value: 'Aluno' },
                                    { label: 'Professor', value: 'Professor' },
                                    { label: 'Administração', value: 'Administracao' },
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
                        {formData.tipoPessoa === 'Professor' && (
                            <FormGroup>
                                <Label>Especialização</Label>
                                <TextInput
                                    name="especializacao"
                                    value={formData.especializacao || ''}
                                    onChange={handleInputChange}
                                    maxLength={30}
                                    placeholder="Digite a especialização"
                                    borderRadius="sm"
                                />
                            </FormGroup>
                        )}

                    </FormGrid>
                </Form>
            </Body>
        </Container>
    );
};