import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    Body, Container, Header, HeaderDeleteAccount, HeaderInfo,
    HeaderTitle, Loading, FormSection, FormHeader,
    FormTitle, FormBody, FormFooter,
    TabContainer, TabButton
} from "./styles";
import Alert from "../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";
import { updateUser, updatePassword, deleteUser } from "../../services/requests";
import { setUser } from "../../redux/slices/authSlice";
import { Button } from "../../components/Button";
import TextInput from "../../components/TextInput";

type ActiveView = 'profile' | 'password';

export const Account = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const { handleSignOut } = useAuth();
    const theme = useTheme();

    const [activeView, setActiveView] = useState<ActiveView>('profile');
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [nameValue, setNameValue] = useState(user?.name || '');
    const [emailValue, setEmailValue] = useState(user?.email || '');
    const [showAlert, setShowAlert] = useState({ type: "error" as "success" | "error", message: "", show: false });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdateAccount = async () => {
        setLoadingRequest(true);
        const request = await updateUser(nameValue, emailValue);
        setLoadingRequest(false);
        if (request.error) {
            setShowAlert({ type: "error", message: request.error, show: true });
        } else if (request.data) {
            // Mapear os dados do usuário para o formato esperado pelo Redux
            const updatedUser = {
                id: request.data.user.id,
                name: request.data.user.nome,
                email: request.data.user.email,
                cpf: request.data.user.cpf,
                dataNascimento: request.data.user.dataNascimento
            };
            dispatch(setUser(updatedUser));
            setShowAlert({ type: "success", message: "Informações alteradas com sucesso!", show: true });
        }
    };

    const handleUpdatePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setShowAlert({ type: "error", message: "Preencha todos os campos de senha.", show: true });
            return;
        }
        if (newPassword !== confirmPassword) {
            setShowAlert({ type: "error", message: "As novas senhas não coincidem.", show: true });
            return;
        }
        setLoadingRequest(true);
        const request = await updatePassword(currentPassword, newPassword);
        setLoadingRequest(false);
        if (request.error) {
            setShowAlert({ type: "error", message: request.error, show: true });
        } else if (request.data) {
            setShowAlert({ type: "success", message: "Senha alterada com sucesso!", show: true });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Tem certeza que deseja desativar sua conta? Esta ação não pode ser desfeita.")) {
            setLoadingRequest(true);

            const response = await deleteUser(); 
            
            setLoadingRequest(false);

            if (response.error) {
                setShowAlert({ type: 'error', message: `Erro ao desativar conta: ${response.error}`, show: true });
            } else {
                handleSignOut();
            }
        }
    };

    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Minha conta</HeaderTitle>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>
                        Perfil: {user?.tipoPessoa || 'Não identificado'}
                    </p>
                </HeaderInfo>
                <HeaderDeleteAccount>
                    <Button 
                        onClick={handleDeleteAccount} 
                        width="140px" 
                        size="md"
                        style={{
                            background: '#DC2626',
                            border: 'none',
                            color: 'white',
                            fontWeight: '600'
                        }}
                    >
                        Desativar Conta
                    </Button>
                </HeaderDeleteAccount>
            </Header>

            <TabContainer>
                <TabButton $isActive={activeView === 'profile'} onClick={() => setActiveView('profile')}>
                    Dados Pessoais
                </TabButton>
                <TabButton $isActive={activeView === 'password'} onClick={() => setActiveView('password')}>
                    Alterar Senha
                </TabButton>
            </TabContainer>

            <Alert
                type={showAlert.type}
                title={showAlert.message}
                show={showAlert.show}
                setShow={show => setShowAlert({ ...showAlert, show })}
            />

            {loadingRequest &&
                <Loading>
                    <ScaleLoader color={theme.COLORS.primary} />
                </Loading>
            }

            {!loadingRequest &&
                <Body>
                    {activeView === 'profile' ? (
                        <FormSection>
                            <FormHeader>
                                <FormTitle>Dados Pessoais</FormTitle>
                            </FormHeader>
                            <FormBody>
                                <TextInput
                                    label="Seu nome"
                                    placeholder="Ex: João da silva"
                                    value={nameValue}
                                    onChange={e => setNameValue(e.target.value)}
                                    borderRadius="sm"
                                />
                                <TextInput
                                    label="Seu email"
                                    placeholder="Ex: joao190@gmail.com"
                                    value={emailValue}
                                    onChange={e => setEmailValue(e.target.value)}
                                    borderRadius="sm"
                                />
                            </FormBody>
                            <FormFooter>
                                <Button onClick={handleUpdateAccount} size="md" width="110px">
                                    Salvar Dados
                                </Button>
                            </FormFooter>
                        </FormSection>
                    ) : (
                        <FormSection>
                            <FormHeader>
                                <FormTitle>Alterar Senha</FormTitle>
                            </FormHeader>
                            <FormBody>
                                <TextInput
                                    label="Senha Atual"
                                    type="password"
                                    placeholder="Digite sua senha atual"
                                    value={currentPassword}
                                    onChange={e => setCurrentPassword(e.target.value)}
                                    borderRadius="sm"
                                />
                                <TextInput
                                    label="Nova Senha"
                                    type="password"
                                    placeholder="Digite sua nova senha"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    borderRadius="sm"
                                />
                                <TextInput
                                    label="Confirmar Nova Senha"
                                    type="password"
                                    placeholder="Confirme sua nova senha"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    borderRadius="sm"
                                />
                            </FormBody>
                            <FormFooter>
                                <Button onClick={handleUpdatePassword} size="md" width="160px">
                                    Alterar Senha
                                </Button>
                            </FormFooter>
                        </FormSection>
                    )}
                </Body>
            }
        </Container>
    )
}