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
  gap: clamp(20px, 3vw, 30px);
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.COLORS.background};
  padding: clamp(20px, 3vw, 30px);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  transition: all 0.2s ease-in-out;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(16px, 2vw, 24px);

  border: 1px solid ${({ theme }) => theme.COLORS.borderColor || "#71cc3dff"};
  border-radius: 12px;
  padding: clamp(16px, 2vw, 30px);
  background-color: ${({ theme }) => theme.COLORS.background};

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div<{ span?: number }>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  grid-column: span ${({ span }) => span || 1};

  input, select, textarea {
    border: 1px solid ${({ theme }) => theme.COLORS.borderColor || "#ccc"};
    border-radius: 8px;
    padding: 10px 12px;
    font-size: ${({ theme }) => theme.FONT_SIZES.sm};
    color: ${({ theme }) => theme.COLORS.textColor500};
    background-color: ${({ theme }) => theme.COLORS.inputBackground};

    transition: border 0.2s, box-shadow 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.COLORS.primary};
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
      outline: none;
    }
  }
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.textColor500};
  font-size: ${({ theme }) => theme.FONT_SIZES.sm};
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: stretch;

    & > button {
      width: 100%;
    }
  }
`;
