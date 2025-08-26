import styled from "styled-components";

export {
  Container,
  Header,
  HeaderInfo,
  HeaderTitle,
  HeaderSubtitle,
  Loading,
  Body,
} from "../../Account/styles";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background-color: ${props => props.theme.COLORS.background};
  padding: 30px;
  border-radius: 8px;
  box-shadow: none;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  border: 8px solid ${(props) => props.theme.COLORS.borderColor || '#1b1010ff'}; 
  border-radius: 8px;
  padding: 30px;


  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
`;

export const FormGroup = styled.div<{ span?: number }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  grid-column: span ${props => props.span || 1};
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${(props) => props.theme.COLORS.textColor500};
  font-size: ${(props) => props.theme.FONT_SIZES.sm};
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;

    & > button {
      width: 100%;
    }
  }
`;
