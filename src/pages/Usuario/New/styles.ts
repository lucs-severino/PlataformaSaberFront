import styled from "styled-components";

// Exporta os estilos base do cabeçalho da página de Conta
export {
  Container,
  Loading,
  Body,
  Header,
  HeaderInfo,
  HeaderTitle,
  HeaderSubtitle,
} from "../../Account/styles";

// Adiciona os estilos específicos para o formulário desta página
export const Form = styled.form`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;