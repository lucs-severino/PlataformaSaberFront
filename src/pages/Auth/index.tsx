import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { Card, CardBody, CardFooter, CardHeader, CardSubTitle, CardTitle, Container, Wrapper, LogoContainer, SchoolName, SchoolSubtitle } from "./styles"
import Alert from "../../components/Alert"
import TextInput from "../../components/TextInput"
import { Button } from "../../components/Button"

type Props = {
    type: 'signin' | 'signup'
}

export const Auth = ({ type }: Props) => {
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [showAlert, setShowAlert] = useState({ type: 'error', message: "", show: false })
    const [isLoading, setIsLoading] = useState(false)

    const { handleSignIn, handleSignUp } = useAuth()
    const { user } = useAppSelector(state => state.auth)

    const navigate = useNavigate()

    const handleOnClick = async () => {
        // Remover espaços em branco dos campos antes de processar
        const [name, email, password] = [
            nameInput.trim(), 
            emailInput.trim(), 
            passwordInput.trim()
        ]

        if ((type == 'signup' && !name) || !email || !password) {
            setShowAlert({ type: 'error', message: 'Preencha todos os campos!', show: true })
            return;
        }

        try {
            setIsLoading(true)
            setShowAlert({ type: 'error', message: '', show: false })
            
            const request = await (type == 'signin' ? handleSignIn({ email, password }) : handleSignUp({ name, email, password }))

            if (request != true) {
                setShowAlert({ type: 'error', message: request, show: true })
                return;
            }

            // Redirect user after authentication based on profile
            const redirectPath = user?.tipoPessoa === 'Administracao' ? '/' : '/agendamento'
            navigate(redirectPath)
        } catch (error) {
            setShowAlert({ type: 'error', message: 'Erro inesperado. Tente novamente.', show: true })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setShowAlert({ type: 'error', message: '', show: false })
    }, [type]) 

    return (
        <Wrapper>
            <Container>
                <Alert
                    type={showAlert.type}
                    show={showAlert.show}
                    setShow={show => setShowAlert({ ...showAlert, show })}
                    title={showAlert.message}
                />

                <Card>
                    <CardHeader>
                        <LogoContainer>
                            <SchoolName>Convergência Musical</SchoolName>
                            <SchoolSubtitle>Escola de Música</SchoolSubtitle>
                        </LogoContainer>
                        <CardTitle>
                            {type == 'signin' ? 'Bem-vindo de volta!' : 'Junte-se à nossa escola!'}
                        </CardTitle>
                        <CardSubTitle>
                            {type == 'signin' 
                                ? 'Entre na sua conta e continue sua jornada musical' 
                                : 'Crie sua conta e comece sua aventura musical conosco'
                            }
                        </CardSubTitle>
                    </CardHeader>

                    <CardBody>
                        {type == 'signup' &&
                            <TextInput
                                value={nameInput}
                                placeholder="Digite seu nome completo"
                                onChange={e => setNameInput(e.target.value)}
                                borderRadius="sm"
                            />
                        }

                        <TextInput
                            value={emailInput}
                            placeholder="Digite seu email"
                            onChange={e => setEmailInput(e.target.value)}
                            borderRadius="sm"
                        />

                        <TextInput
                            type="password"   
                            value={passwordInput}
                            placeholder="Digite sua senha"
                            onChange={e => setPasswordInput(e.target.value)}
                            borderRadius="sm"
                        />
                    </CardBody>

                    <CardFooter>
                        <Button onClick={handleOnClick} size="md" disabled={isLoading}>
                            {isLoading 
                                ? '⏳ Carregando...' 
                                : (type == 'signin' ? '🎵 Entrar' : '🎼 Registrar-se')
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </Container>
        </Wrapper>
    )
}