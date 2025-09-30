import { useEffect } from "react";
import { useAuth } from "./hooks/auth";
import { ThemeProvider } from "styled-components";
import { musicTheme } from "./themes/musicTheme";
import { MainRoutes } from "./routes";

const App = () => {
    const {handleAutenticateUser} = useAuth()

    useEffect(() => {
        // Authenticate user using token saved in local storage
        handleAutenticateUser()
    }, []) 

    return (
        <ThemeProvider theme={musicTheme}>
            <MainRoutes/>
        </ThemeProvider>
    )
}

export default App;