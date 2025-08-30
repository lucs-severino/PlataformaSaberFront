import styled from "styled-components";
import { GiHamburgerMenu } from 'react-icons/gi';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; /* Previne quebras de layout com flexbox */
`;

export const NavbarContent = styled.div`
    height: 70px;
    background-color: ${props => props.theme.COLORS.navbarBackground};
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    
    /* Alinha o ícone do menu e o conteúdo da navbar */
    display: flex;
    align-items: center;
    padding: 0 20px;
`;

export const BodyContent = styled.div`
    height: calc(100vh - 70px);
    background-color: ${props => props.theme.COLORS.background};
    overflow: auto; /* Permite scroll apenas no conteúdo */
`;

export const Overlay = styled.div<{ $show: boolean }>`
    display: ${props => props.$show ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000; /* Fica abaixo do Sidebar, mas acima do resto */
`;

export const MobileMenuIcon = styled(GiHamburgerMenu)`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    color: ${props => props.theme.COLORS.textColor400};
    cursor: pointer;
    
    /* Escondido em telas grandes */
    display: none;

    /* Visível apenas em telas de celular */
    @media (max-width: 768px) {
        display: block;
    }
`;