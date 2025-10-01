import styled, { keyframes } from 'styled-components';
import { musicTheme } from '../../themes/musicTheme';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const pulse = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
`;

export const Container = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, ${musicTheme.COLORS.background} 0%, ${musicTheme.COLORS.backgroundSecondary} 100%);
    padding: ${musicTheme.SPACING.xl};
    animation: ${fadeIn} 0.6s ease-out;

    @media (max-width: ${musicTheme.BREAKPOINTS.md}) {
        padding: ${musicTheme.SPACING.md};
    }
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: ${musicTheme.SPACING['2xl']};
`;

export const HeaderTitle = styled.h1`
    font-size: ${musicTheme.FONT_SIZES['4xl']};
    font-weight: ${musicTheme.FONT_WEIGHTS.bold};
    color: ${musicTheme.COLORS.textColor400};
    margin-bottom: ${musicTheme.SPACING.md};
    background: linear-gradient(135deg, ${musicTheme.COLORS.primary} 0%, ${musicTheme.COLORS.musicalPink} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(220, 38, 38, 0.3);
`;

export const HeaderSubtitle = styled.p`
    font-size: ${musicTheme.FONT_SIZES.lg};
    color: ${musicTheme.COLORS.textColor600};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
`;

export const Body = styled.div`
    max-width: 1400px;
    margin: 0 auto;
`;

export const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: ${musicTheme.SPACING.xl};
    padding: ${musicTheme.SPACING.lg} 0;

    @media (max-width: ${musicTheme.BREAKPOINTS.md}) {
        grid-template-columns: 1fr;
        gap: ${musicTheme.SPACING.lg};
    }
`;

export const VideoCard = styled.div`
    background: ${musicTheme.COLORS.cardBackground};
    border: 1px solid ${musicTheme.COLORS.cardBorder};
    border-radius: ${musicTheme.BORDER_RADIUS.xl};
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: ${musicTheme.SHADOWS.md};
    animation: ${fadeIn} 0.6s ease-out;

    &:hover {
        transform: translateY(-8px);
        box-shadow: ${musicTheme.SHADOWS.xl};
        border-color: ${musicTheme.COLORS.primary};
    }
`;

export const VideoThumbnail = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    transition: transform 0.3s ease;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        transform: scale(1.05);
    }
`;

export const PlayButton = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${musicTheme.COLORS.white};
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    padding: ${musicTheme.SPACING.md};
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);

    &:hover {
        background: rgba(220, 38, 38, 0.8);
        border-color: ${musicTheme.COLORS.primary};
        transform: translate(-50%, -50%) scale(1.1);
        color: ${musicTheme.COLORS.primary};
    }
`;

export const VideoInfo = styled.div`
    padding: ${musicTheme.SPACING.lg};
`;

export const VideoTitle = styled.h3`
    font-size: ${musicTheme.FONT_SIZES.lg};
    font-weight: ${musicTheme.FONT_WEIGHTS.semibold};
    color: ${musicTheme.COLORS.textColor400};
    margin-bottom: ${musicTheme.SPACING.sm};
    line-height: 1.4;
`;

export const VideoDescription = styled.p`
    font-size: ${musicTheme.FONT_SIZES.sm};
    color: ${musicTheme.COLORS.textColor600};
    margin-bottom: ${musicTheme.SPACING.md};
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const VideoMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${musicTheme.FONT_SIZES.xs};
    color: ${musicTheme.COLORS.textColor700};

    span {
        background: ${musicTheme.COLORS.backgroundSecondary};
        padding: ${musicTheme.SPACING.xs} ${musicTheme.SPACING.sm};
        border-radius: ${musicTheme.BORDER_RADIUS.md};
        border: 1px solid ${musicTheme.COLORS.borderColor};
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: ${musicTheme.SPACING.lg};
    backdrop-filter: blur(10px);
    animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
    background: ${musicTheme.COLORS.cardBackground};
    border-radius: ${musicTheme.BORDER_RADIUS.xl};
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: ${musicTheme.SHADOWS.xl};
    border: 1px solid ${musicTheme.COLORS.cardBorder};
    animation: ${slideIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${musicTheme.SPACING.lg};
    border-bottom: 1px solid ${musicTheme.COLORS.borderColor};
    background: ${musicTheme.COLORS.backgroundSecondary};
`;

export const ModalTitle = styled.h2`
    font-size: ${musicTheme.FONT_SIZES.xl};
    font-weight: ${musicTheme.FONT_WEIGHTS.semibold};
    color: ${musicTheme.COLORS.textColor400};
    margin: 0;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${musicTheme.COLORS.textColor600};
    cursor: pointer;
    padding: ${musicTheme.SPACING.sm};
    border-radius: ${musicTheme.BORDER_RADIUS.md};
    transition: all 0.2s ease;

    &:hover {
        background: ${musicTheme.COLORS.backgroundSecondary};
        color: ${musicTheme.COLORS.primary};
    }
`;

export const VideoPlayer = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    background: #000;

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    color: ${musicTheme.COLORS.textColor600};

    p {
        margin-top: ${musicTheme.SPACING.lg};
        font-size: ${musicTheme.FONT_SIZES.lg};
    }
`;

export const LoadingSpinner = styled.div`
    width: 50px;
    height: 50px;
    border: 3px solid ${musicTheme.COLORS.borderColor};
    border-top: 3px solid ${musicTheme.COLORS.primary};
    border-radius: 50%;
    animation: ${pulse} 1s linear infinite;
`;

export const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
`;

export const ErrorMessage = styled.div`
    background: ${musicTheme.COLORS.dangerLight};
    color: ${musicTheme.COLORS.danger};
    padding: ${musicTheme.SPACING.lg};
    border-radius: ${musicTheme.BORDER_RADIUS.lg};
    border: 1px solid ${musicTheme.COLORS.danger};
    font-size: ${musicTheme.FONT_SIZES.lg};
    text-align: center;
`;