import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${props => props.theme.COLORS.background};
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.theme.SPACING.md} ${props => props.theme.SPACING.lg};
    background: ${props => props.theme.COLORS.background};
    border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};
    gap: ${props => props.theme.SPACING.md};
`

    @media (max-width: ${props => props.theme.BREAKPOINTS.lg}) {
        flex-direction: column;
        align-items: flex-start;
        padding: ${props => props.theme.SPACING.sm} ${props => props.theme.SPACING.md};
    }
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
        padding: ${props => props.theme.SPACING.xs} ${props => props.theme.SPACING.sm};
    }
`

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.SPACING.lg};

    @media (max-width: ${props => props.theme.BREAKPOINTS.lg}) {
        width: 100%;
        flex-direction: column-reverse;
        align-items: stretch;
        gap: ${props => props.theme.SPACING.md};
    }
`

export const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

export const HeaderTitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.xl};
    background: linear-gradient(135deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
`

export const HeaderSubtitle = styled.span`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.textColor600};
    font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
`

export const HeaderFilter = styled.div`
    display: flex;
    gap: ${props => props.theme.SPACING.md};
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.lg}) {
        width: 100%;
    }

    @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
        flex-direction: column;
    }
`

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 400px;
`

export const Body = styled.div`
    flex: 1;
    padding: ${props => props.theme.SPACING['2xl']} ${props => props.theme.SPACING['3xl']};
    overflow-y: auto;

    @media (max-width: ${props => props.theme.BREAKPOINTS.lg}) {
        padding: ${props => props.theme.SPACING.xl} ${props => props.theme.SPACING.lg};
    }
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
        padding: ${props => props.theme.SPACING.lg} ${props => props.theme.SPACING.md};
    }
`

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
`;

export const BodyRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${props => props.theme.SPACING.md};
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
        grid-template-columns: 1fr;
        gap: ${props => props.theme.SPACING.md};
    }
`

export const InformationCard = styled.div<{ $isClickable?: boolean }>`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.SPACING.md};
    width: 100%;
    background: ${props => props.theme.COLORS.cardBackground};
    border: 1px solid ${props => props.theme.COLORS.cardBorder};
    padding: ${props => props.theme.SPACING.md};
    border-radius: ${props => props.theme.BORDER_RADIUS.lg};
    box-sizing: border-box;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${props => props.theme.SHADOWS.sm};
    position: relative;
    overflow: hidden;
    animation: cardSlideIn 0.6s ease-out;

    @keyframes cardSlideIn {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
        opacity: 0;
        transition: all 0.3s ease;
        transform: scaleX(0);
        transform-origin: left;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(37, 99, 235, 0.05));
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    ${({ $isClickable }) => $isClickable && css`
        cursor: pointer;

        &:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: ${({ theme }) => theme.SHADOWS.xl};
            border-color: ${({ theme }) => theme.COLORS.primary};
            
            &::before {
                opacity: 1;
                transform: scaleX(1);
            }
            
            &::after {
                opacity: 1;
            }
        }
    `}
`

export const ChartContainer = styled.div`
    margin-top: ${props => props.theme.SPACING['2xl']};
    padding: ${props => props.theme.SPACING['2xl']};
    background: ${props => props.theme.COLORS.cardBackground};
    border: 1px solid ${props => props.theme.COLORS.cardBorder};
    border-radius: ${props => props.theme.BORDER_RADIUS.xl};
    box-shadow: ${props => props.theme.SHADOWS.md};
    min-height: 400px;
    position: relative;
    animation: chartSlideIn 0.8s ease-out 0.2s both;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.theme.SHADOWS.lg};
    }
    
    @keyframes chartSlideIn {
        0% {
            opacity: 0;
            transform: translateY(40px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
        border-radius: ${props => props.theme.BORDER_RADIUS.xl} ${props => props.theme.BORDER_RADIUS.xl} 0 0;
        animation: shimmer 3s ease-in-out infinite;
    }
    
    @keyframes shimmer {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
`

export const InformationCardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.SPACING.xs};
    flex: 1;
`

export const InformationCardContentValue = styled.span`
    color: ${props => props.theme.COLORS.textColor400};
    font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
    font-size: ${props => props.theme.FONT_SIZES.xl};
    line-height: 1.2;
`

export const InformationCardContentLabel = styled.span`
    color: ${props => props.theme.COLORS.textColor600};
    font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
    font-size: ${props => props.theme.FONT_SIZES.xs};
    text-transform: uppercase;
    letter-spacing: 0.3px;
`

export const VideoSection = styled.div`
    margin-top: ${props => props.theme.SPACING['2xl']};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${props => props.theme.SPACING.xl};
    
    @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
        grid-template-columns: 1fr;
        gap: ${props => props.theme.SPACING.lg};
    }
`

export const VideoCard = styled.div`
    background: ${props => props.theme.COLORS.cardBackground};
    border: 1px solid ${props => props.theme.COLORS.cardBorder};
    border-radius: ${props => props.theme.BORDER_RADIUS.xl};
    padding: ${props => props.theme.SPACING.xl};
    box-shadow: ${props => props.theme.SHADOWS.md};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    animation: videoCardSlideIn 0.6s ease-out;
    
    @keyframes videoCardSlideIn {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
        opacity: 0;
        transition: all 0.3s ease;
        transform: scaleX(0);
        transform-origin: left;
    }
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: ${props => props.theme.SHADOWS.lg};
        border-color: ${props => props.theme.COLORS.primary};
        
        &::before {
            opacity: 1;
            transform: scaleX(1);
        }
    }
`

export const VideoTitle = styled.h3`
    color: ${props => props.theme.COLORS.textColor400};
    font-size: ${props => props.theme.FONT_SIZES.lg};
    font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
    margin-bottom: ${props => props.theme.SPACING.md};
    line-height: 1.3;
`

export const VideoLink = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${props => props.theme.COLORS.primary}, ${props => props.theme.COLORS.musicalPink});
    color: white;
    text-decoration: none;
    padding: ${props => props.theme.SPACING.md} ${props => props.theme.SPACING.lg};
    border-radius: ${props => props.theme.BORDER_RADIUS.md};
    font-weight: ${props => props.theme.FONT_WEIGHTS.semibold};
    font-size: ${props => props.theme.FONT_SIZES.sm};
    transition: all 0.3s ease;
    box-shadow: ${props => props.theme.SHADOWS.sm};
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.theme.SHADOWS.md};
        background: linear-gradient(135deg, ${props => props.theme.COLORS.primaryDark}, ${props => props.theme.COLORS.musicalPinkDark || props.theme.COLORS.primaryDark});
    }
    
    &:active {
        transform: translateY(0);
    }
`