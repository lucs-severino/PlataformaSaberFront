import { useAppSelector } from "../redux/hooks"

export const useTheme = () =>  {
    const { theme } = useAppSelector(state => state.theme)

    return {
        theme,
        // Funções removidas - não são mais necessárias
        handleInitTheme: () => {},
        handleToggleTheme: () => {}
    }
}