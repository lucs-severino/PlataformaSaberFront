import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: ${props => props.theme.COLORS.background};
    overflow: hidden;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${props => props.theme.SPACING.xl} ${props => props.theme.SPACING.xl} ${props => props.theme.SPACING.lg};
    background: linear-gradient(135deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
    color: white;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }

    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        padding: ${props => props.theme.SPACING.lg} ${props => props.theme.SPACING.md};
    }
`;

export const HeaderTitle = styled.h1`
    font-size: ${props => props.theme.FONT_SIZES['4xl']};
    font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
    margin: 0 0 ${props => props.theme.SPACING.sm} 0;
    background: linear-gradient(135deg, #ffffff, #f8fafc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: titleGlow 3s ease-in-out infinite;
    position: relative;
    z-index: 1;

    @keyframes titleGlow {
        0%, 100% { 
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)); 
        }
        50% { 
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)); 
        }
    }

    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        font-size: ${props => props.theme.FONT_SIZES['3xl']};
    }
`;

export const HeaderSubtitle = styled.p`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
    position: relative;
    z-index: 1;

    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        font-size: ${props => props.theme.FONT_SIZES.md};
    }
`;

export const Body = styled.div`
    flex: 1;
    padding: ${props => props.theme.SPACING.xl};
    overflow-y: auto;
    background: ${props => props.theme.COLORS.background};

    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        padding: ${props => props.theme.SPACING.lg} ${props => props.theme.SPACING.md};
    }
`;

export const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: ${props => props.theme.SPACING.xl};
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: ${props => props.theme.BREAKPOINTS.lg}) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: ${props => props.theme.SPACING.lg};
    }

    @media (max-width: ${props => props.theme.BREAKPOINTS.md}) {
        grid-template-columns: 1fr;
        gap: ${props => props.theme.SPACING.md};
    }
`;

export const VideoCard = styled.div`
    background: ${props => props.theme.COLORS.cardBackground};
    border-radius: ${props => props.theme.BORDER_RADIUS.lg};
    border: 1px solid ${props => props.theme.COLORS.cardBorder};
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
    box-shadow: ${props => props.theme.SHADOWS.md};

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: ${props => props.theme.SHADOWS.xl};

        &::before {
            opacity: 0.05;
        }
    }

    animation: cardSlideIn 0.6s ease-out;
    animation-fill-mode: both;

    @keyframes cardSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.4s; }
    &:nth-child(5) { animation-delay: 0.5s; }
    &:nth-child(6) { animation-delay: 0.6s; }
`;

export const VideoThumbnail = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .play-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .duration {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: ${props => props.theme.BORDER_RADIUS.sm};
        font-size: ${props => props.theme.FONT_SIZES.sm};
        font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
    }

    ${VideoCard}:hover & {
        img {
            transform: scale(1.05);
        }

        .play-overlay {
            opacity: 1;
            transform: scale(1.1);
        }
    }
`;

export const VideoInfo = styled.div`
    padding: ${props => props.theme.SPACING.lg};
    position: relative;
    z-index: 2;
`;

export const VideoTitle = styled.h3`
    font-size: ${props => props.theme.FONT_SIZES.lg};
    font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
    color: ${props => props.theme.COLORS.text};
    margin: 0 0 ${props => props.theme.SPACING.sm} 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const VideoDescription = styled.p`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textSecondary};
    margin: 0 0 ${props => props.theme.SPACING.md} 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const VideoMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.SPACING.xs};

    .meta-item {
        display: flex;
        align-items: center;
        gap: ${props => props.theme.SPACING.xs};
        font-size: ${props => props.theme.FONT_SIZES.sm};
        color: ${props => props.theme.COLORS.textSecondary};
        font-weight: ${props => props.theme.FONT_WEIGHTS.medium};

        svg {
            color: ${props => props.theme.COLORS.primary};
        }
    }
`;

export const Loading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    gap: ${props => props.theme.SPACING.lg};

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid ${props => props.theme.COLORS.cardBorder};
        border-top: 4px solid ${props => props.theme.COLORS.primary};
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    p {
        font-size: ${props => props.theme.FONT_SIZES.lg};
        color: ${props => props.theme.COLORS.textSecondary};
        font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
    }
`;

export const ErrorMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    gap: ${props => props.theme.SPACING.lg};
    text-align: center;

    p {
        font-size: ${props => props.theme.FONT_SIZES.lg};
        color: ${props => props.theme.COLORS.error};
        font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
    }

    button {
        background: ${props => props.theme.COLORS.primary};
        color: white;
        border: none;
        padding: ${props => props.theme.SPACING.md} ${props => props.theme.SPACING.lg};
        border-radius: ${props => props.theme.BORDER_RADIUS.md};
        font-size: ${props => props.theme.FONT_SIZES.md};
        font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background: ${props => props.theme.COLORS.primaryHover};
            transform: translateY(-2px);
        }
    }
`;

