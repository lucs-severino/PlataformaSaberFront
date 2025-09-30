import styled from "styled-components";
import { GiHamburgerMenu } from 'react-icons/gi';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
    background-color: ${props => props.theme.COLORS.background};
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    transition: margin-left 0.3s ease;
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        margin-left: 0;
    }
`;

export const NavbarContent = styled.div`
    height: 4rem;
    background-color: ${props => props.theme.COLORS.navbarBackground};
    border-bottom: 1px solid ${props => props.theme.COLORS.navbarBorder};
    backdrop-filter: blur(8px);
    position: sticky;
    top: 0;
    z-index: 100;
    
    display: flex;
    align-items: center;
    padding: 0 ${props => props.theme.SPACING.lg};
    gap: ${props => props.theme.SPACING.md};
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
        padding: 0 ${props => props.theme.SPACING.md};
    }
`;

export const BodyContent = styled.div`
    flex: 1;
    background-color: ${props => props.theme.COLORS.background};
    overflow: auto;
    padding: ${props => props.theme.SPACING.lg};
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        padding: ${props => props.theme.SPACING.md};
    }
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
        padding: ${props => props.theme.SPACING.sm};
    }
`;

export const Overlay = styled.div<{ $show: boolean }>`
    display: ${props => props.$show ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 1000;
    animation: ${props => props.$show ? 'fadeIn' : 'fadeOut'} 0.3s ease;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;

export const MobileMenuIcon = styled(GiHamburgerMenu)`
    font-size: ${props => props.theme.FONT_SIZES.xl};
    color: ${props => props.theme.COLORS.textColor400};
    cursor: pointer;
    padding: ${props => props.theme.SPACING.sm};
    border-radius: ${props => props.theme.BORDER_RADIUS.md};
    transition: all 0.2s ease;
    
    &:hover {
        background-color: ${props => props.theme.COLORS.navbarBackgroundHover};
        color: ${props => props.theme.COLORS.textColor500};
    }
    
    display: none;

    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        display: block;
    }
`;