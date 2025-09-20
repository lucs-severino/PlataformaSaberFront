import styled from "styled-components";

// Exporta os estilos base do cabeçalho
export {
  Container,
  Header,
  HeaderInfo,
  HeaderTitle,
  HeaderSubtitle,
  Loading,
  Body,
} from "../../Account/styles";

// Adiciona e exporta os mesmos estilos de formulário da página de Cadastro
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vw, 30px);
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(16px, 2vw, 24px);

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
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.textColor500};
  font-size: ${({ theme }) => theme.FONT_SIZES.sm};
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end; /* Alinha os botões à direita */
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: row; /* Mantém os botões lado a lado no mobile */
    justify-content: stretch;

    & > button {
      width: 100%;
    }
  }
`;