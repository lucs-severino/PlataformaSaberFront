import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Wrapper = styled.div`
  background: linear-gradient(135deg, #1F2937, #374151);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
`
export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`
export const Card = styled.div`
  width: 100%;
  max-width: 480px;
  background: rgba(248, 250, 252, 0.95);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.BORDER_RADIUS.xl};
  padding: ${props => props.theme.SPACING['2xl']};
  box-shadow: 
    ${props => props.theme.SHADOWS.lg},
    0 0 0 1px rgba(248, 250, 252, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.SPACING.xl};
  position: relative;
  z-index: 10;
  border: 1px solid rgba(248, 250, 252, 0.3);
  animation: cardEntrance 0.6s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes cardEntrance {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #DC2626, #EF4444);
    border-radius: ${props => props.theme.BORDER_RADIUS.xl} ${props => props.theme.BORDER_RADIUS.xl} 0 0;
    animation: shimmer 2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      ${props => props.theme.SHADOWS.xl},
      0 0 0 1px rgba(248, 250, 252, 0.3);
  }

  @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
    padding: ${props => props.theme.SPACING.xl} ${props => props.theme.SPACING.lg};
    margin: ${props => props.theme.SPACING.md};
  }
`

export const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

export const CardTitle = styled.h2`
  font-size: ${props => props.theme.FONT_SIZES['2xl']};
  font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
  color: ${props => props.theme.COLORS.textColor400};
  text-align: center;
  margin: 0;
  line-height: 1.3;
  animation: titleEntrance 0.6s ease-out 0.4s both;
  transition: all 0.3s ease;
  
  @keyframes titleEntrance {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    color: ${props => props.theme.COLORS.primary};
    transform: translateY(-2px);
  }
  
  @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
    font-size: ${props => props.theme.FONT_SIZES.xl};
  }
`

export const CardSubTitle = styled.p`
  font-size: ${props => props.theme.FONT_SIZES.lg};
  font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
  color: ${props => props.theme.COLORS.textColor600};
  text-align: center;
  margin: ${props => props.theme.SPACING.sm} 0 0 0;
  line-height: 1.5;
  max-width: 400px;
  animation: subtitleEntrance 0.6s ease-out 0.6s both;
  transition: all 0.3s ease;
  
  @keyframes subtitleEntrance {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    color: ${props => props.theme.COLORS.textColor500};
    transform: translateY(-1px);
  }
  
  @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
    font-size: ${props => props.theme.FONT_SIZES.md};
  }
`

export const CardBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.SPACING.lg};
    animation: bodyEntrance 0.6s ease-out 0.8s both;

    @keyframes bodyEntrance {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    input {
        width: 100%;         
        box-sizing: border-box;
        transition: all 0.3s ease;
        
        &:focus {
            transform: scale(1.02);
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
    }
`

export const CardFooter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.SPACING.lg};
    margin-top: ${props => props.theme.SPACING.md};
    animation: footerEntrance 0.6s ease-out 1s both;

    @keyframes footerEntrance {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
`

export const Link = styled(LinkRouter)`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.primary}
`

export const LogoContainer = styled.div`
  margin-bottom: ${props => props.theme.SPACING.lg};
  text-align: center;
  animation: logoEntrance 0.8s ease-out 0.2s both;

  @keyframes logoEntrance {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const SchoolName = styled.h1`
  font-size: ${props => props.theme.FONT_SIZES['4xl']};
  font-weight: ${props => props.theme.FONT_WEIGHTS.bold};
  background: linear-gradient(135deg, #DC2626, #EF4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.2;
  animation: textGlow 3s ease-in-out infinite;
  transition: all 0.3s ease;
  
  @keyframes textGlow {
    0%, 100% { filter: drop-shadow(0 0 5px rgba(220, 38, 38, 0.3)); }
    50% { filter: drop-shadow(0 0 15px rgba(220, 38, 38, 0.5)); }
  }
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3));
  }
  
  @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
    font-size: ${props => props.theme.FONT_SIZES['3xl']};
  }
`

export const SchoolSubtitle = styled.p`
  font-size: ${props => props.theme.FONT_SIZES.lg};
  font-weight: ${props => props.theme.FONT_WEIGHTS.medium};
  color: ${props => props.theme.COLORS.textColor600};
  margin: ${props => props.theme.SPACING.xs} 0 0 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: ${props => props.theme.BREAKPOINTS.sm}) {
    font-size: ${props => props.theme.FONT_SIZES.md};
  }
`

