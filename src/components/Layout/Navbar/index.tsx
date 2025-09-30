import { useState } from "react"
import { useAuth } from "../../../hooks/auth"
import { Container, Icon, LeftSide, RightSide } from "./styles"
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi"
import { TbLogout } from "react-icons/tb"

export const Navbar = () => {
    const [fullScreenEnabled, setFullScreenEnabled] = useState(false)

    const { handleSignOut } = useAuth()

    const handleToggleFullScreen = async () => {
        let enabled = true

        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen()
        } else if (document.exitFullscreen) {
            await document.exitFullscreen();
            enabled = false
        }

        setFullScreenEnabled(enabled)
    }

    return (
        <Container>
            <LeftSide>
                <Icon onClick={handleToggleFullScreen}>
                    {fullScreenEnabled ?
                        <BiExitFullscreen />
                        :
                        <BiFullscreen />
                    }
                </Icon>
            </LeftSide>

            <RightSide>
                <Icon onClick={handleSignOut}>
                    <TbLogout />
                </Icon>
            </RightSide>
        </Container>
    )
}