import styled from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'
import { Button } from '../../Button';

// Container do Sidebar
export const Container = styled.div<{ $expanded: boolean }>`
    /* --- Estilos Base (Desktop) --- */
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${props => props.$expanded ? '300px' : '80px'};
    flex-shrink: 0;
    background-color: ${props => props.theme.COLORS.sidebarBackground};
    border-right: 1px solid ${props => props.theme.COLORS.sidebarBorderColor};
    transition: width 0.3s ease;
    z-index: 1001;

    /* --- Estilos para Mobile (Sobrescreve o base) --- */
    @media (max-width: 768px) {
        position: absolute;
        height: 100%;
        width: 80%;
        left: ${props => props.$expanded ? '0' : '-100%'}; 
        transition: left 0.3s ease;
    }
`;

export const Link = styled(LinkRouter)`
    text-decoration: none;
`;

// Cabeçalho do Sidebar
export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px 20px;
    height: 44px;
    overflow: hidden;
`;

export const HeaderLogo = styled.img<{ $expanded: boolean }>`
    width: 220px;
    height: auto;
    display: ${props => (props.$expanded ? "block" : "none")};
`;

export const SidebarToggleButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Navegação e seus itens
export const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px;
    flex: 1;
`;

export const NavigationItem = styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    padding: 14px 20px;
    gap: 14px;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    color: ${props => props.theme.COLORS.sidebarColor};
    background-color: ${props => props.$isActive ? props.theme.COLORS.sidebarBackgroundHover : 'transparent'};

    &:hover {
        background-color: ${props => props.theme.COLORS.sidebarBackgroundHover};
    }
`;

export const NavigationItemIcon = styled.div`
    display: flex;
    font-size: ${props => props.theme.FONT_SIZES.xl};
`;

export const NavigationItemLabel = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.md};
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
`;

// Rodapé e informações do usuário
export const Footer = styled.div`
    border-top: 1px solid ${props => props.theme.COLORS.sidebarBorderColor};
    margin: 10px;
`;

export const User = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 10px;
    cursor: pointer;
`;

export const UserAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 38px;
    min-height: 38px;
    border-radius: 50%;
    text-transform: uppercase;
    background-color: ${props => props.theme.COLORS.primary};
    color: ${props => props.theme.COLORS.sidebarColor};
    font-weight: 700;
`;

export const UserName = styled.div`
    flex: 1;
    color: ${props => props.theme.COLORS.sidebarColor};
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;