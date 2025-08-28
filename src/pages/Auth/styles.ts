import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Wrapper = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
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
  background-color: ${({ theme }) => theme.COLORS.background || "#fff"};
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`

export const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZES.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.COLORS.textColor400};
`

export const CardSubTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.md};
  font-weight: 400;
  color: ${({ theme }) => theme.COLORS.textColor500};
  margin-top: 4px;
`

export const CardBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    input {
    width: 100%;         
    box-sizing: border-box;
  }
`

export const CardFooter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

export const Link = styled(LinkRouter)`
    font-size: ${props => props.theme.FONT_SIZES.sm};
    color: ${props => props.theme.COLORS.primary}
`
