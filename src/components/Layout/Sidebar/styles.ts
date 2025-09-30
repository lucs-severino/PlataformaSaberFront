import styled from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'
import { Button } from '../../Button';

// Container do Sidebar
export const Container = styled.div<{ $expanded: boolean }>`
    /* --- Estilos Base (Desktop) --- */
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${props => props.$expanded ? '280px' : '80px'};
    flex-shrink: 0;
    background: linear-gradient(180deg, ${props => props.theme.COLORS.sidebarBackground} 0%, #0F172A 100%);
    border-right: 1px solid ${props => props.theme.COLORS.sidebarBorderColor};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1001;
    box-shadow: ${props => props.theme.SHADOWS.lg};

    /* --- Estilos para Mobile (Sobrescreve o base) --- */
    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        position: fixed;
        height: 100%;
        width: 280px;
        left: ${props => props.$expanded ? '0' : '-100%'}; 
        transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: ${props => props.theme.SHADOWS.xl};
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
    padding: ${props => props.theme.SPACING.lg};
    min-height: 4rem;
    border-bottom: 1px solid ${props => props.theme.COLORS.sidebarBorderColor};
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
`;

export const HeaderLogo = styled.img<{ $expanded: boolean }>`
    width: 200px;
    height: auto;
    display: ${props => (props.$expanded ? "block" : "none")};
    transition: opacity 0.3s ease;
    filter: brightness(1.1);
`;

export const SchoolNameLogo = styled.div`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
    background: linear-gradient(135deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    line-height: 1.2;
    transition: all 0.3s ease;
    animation: textGlow 3s ease-in-out infinite;
    
    @keyframes textGlow {
        0%, 100% { filter: drop-shadow(0 0 5px rgba(220, 38, 38, 0.3)); }
        50% { filter: drop-shadow(0 0 15px rgba(220, 38, 38, 0.5)); }
    }
    
    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3));
    }
`;

export const SidebarToggleButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: ${props => props.theme.COLORS.sidebarColor};
    
    &:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
    }
`;

// Navegação e seus itens
export const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.SPACING.xs};
    padding: ${props => props.theme.SPACING.md};
    flex: 1;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 4px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
    }
`;

export const NavigationItem = styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    padding: ${props => props.theme.SPACING.md} ${props => props.theme.SPACING.lg};
    gap: ${props => props.theme.SPACING.md};
    border-radius: ${props => props.theme.BORDER_RADIUS.lg};
    cursor: pointer;
    overflow: hidden;
    color: ${props => props.theme.COLORS.sidebarColor};
    background: ${props => props.$isActive 
        ? `linear-gradient(135deg, ${props.theme.COLORS.primary}20, ${props.theme.COLORS.primary}10)`
        : 'transparent'
    };
    border: 1px solid ${props => props.$isActive 
        ? `${props.theme.COLORS.primary}30`
        : 'transparent'
    };
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    animation: navItemSlide 0.4s ease-out;

    @keyframes navItemSlide {
        0% {
            opacity: 0;
            transform: translateX(-20px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: ${props => props.$isActive ? props.theme.COLORS.primary : 'transparent'};
        border-radius: 0 2px 2px 0;
        transition: all 0.3s ease;
        transform: scaleY(${props => props.$isActive ? 1 : 0});
        transform-origin: center;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    &:hover {
        background: ${props => props.$isActive 
            ? `linear-gradient(135deg, ${props.theme.COLORS.primary}30, ${props.theme.COLORS.primary}20)`
            : 'rgba(255, 255, 255, 0.1)'
        };
        transform: translateX(4px) scale(1.02);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        
        &::after {
            opacity: 1;
        }
    }
`;

export const NavigationItemIcon = styled.div`
    display: flex;
    font-size: ${props => props.theme.FONT_SIZES.xl};
    min-width: 24px;
    justify-content: center;
`;

export const NavigationItemLabel = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.md};
    font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
    white-space: nowrap;
    overflow: hidden;
    transition: opacity 0.2s ease;
`;

// Rodapé e informações do usuário
export const Footer = styled.div`
    border-top: 1px solid ${props => props.theme.COLORS.sidebarBorderColor};
    margin: ${props => props.theme.SPACING.md};
    background: rgba(255, 255, 255, 0.05);
    border-radius: ${props => props.theme.BORDER_RADIUS.lg};
    backdrop-filter: blur(10px);
`;

export const User = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.SPACING.md};
    padding: ${props => props.theme.SPACING.lg};
    cursor: pointer;
    border-radius: ${props => props.theme.BORDER_RADIUS.lg};
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;

export const UserAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 40px;
    border-radius: ${props => props.theme.BORDER_RADIUS.full};
    text-transform: uppercase;
    background: linear-gradient(135deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.primaryHover});
    color: ${props => props.theme.COLORS.white};
    font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
    font-size: ${props => props.theme.FONT_SIZES.sm};
    box-shadow: ${props => props.theme.SHADOWS.sm};
`;

export const UserName = styled.div`
    flex: 1;
    color: ${props => props.theme.COLORS.sidebarColor};
    font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
    font-size: ${props => props.theme.FONT_SIZES.sm};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;