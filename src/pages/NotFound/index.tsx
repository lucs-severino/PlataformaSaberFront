import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { Container, Icon } from "./styles"
import { useAppSelector } from "../../redux/hooks"
import { getRedirectPathByProfile } from "../../utils/redirectByProfile"

export const NotFound = () => {
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.auth)

    const handleOnClick = () => navigate(getRedirectPathByProfile(user))

    return (
        <Container>
            <Icon />

            <Button onClick={handleOnClick} size="md" width="160px">
                Voltar à página inicial
            </Button>
        </Container>
    )
}