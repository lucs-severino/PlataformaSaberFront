import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import styled from "styled-components";

// Contêiner principal, se necessário para altura
export const Container = styled.div`
    height: 100%;
`;

// Wrapper para habilitar a rolagem horizontal em telas menores
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.COLORS.tableHeaderBorderColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Sombra sutil para a tabela
  @media (max-width: 768px) {
    overflow-x: scroll;
    border-radius: 5px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  font-size: ${(props) => props.theme.FONT_SIZES.md}; 
  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.FONT_SIZES.sm}; 
  }
`;

export const TableHead = styled.thead`
    background-color: ${props => props.theme.COLORS.tableHeaderBackground};
    color: ${props => props.theme.COLORS.textColor500};

    @media (max-width: 768px) {
        display: none; 
    }
`;

export const TableBody = styled.tbody``;

export const TableHeadCell = styled.th`
    padding: 14px 20px;
    text-align: left;
    border-right: 1px solid ${props => props.theme.COLORS.tableHeaderBorderColor};
    border-bottom: 1px solid ${props => props.theme.COLORS.tableHeaderBorderColor};
    white-space: nowrap; /* Evita que o texto do cabeçalho quebre */

    &:first-child {
        border-top-left-radius: 8px;
    }

    &:last-child {
        border-top-right-radius: 8px;
        border-right: none; /* Remove a borda direita da última célula do cabeçalho */
    }
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.COLORS.tableRowHover};
    transform: scale(1.02); // Efeito de expansão na linha ao passar o mouse
    transition: transform 0.2s ease-in-out;
  }
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 15px;
    border-bottom: 1px solid ${(props) => props.theme.COLORS.borderColor};
    padding: 10px;
    background-color: ${(props) => props.theme.COLORS.background};
  }
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  color: ${(props) => props.theme.COLORS.textColor500};
  text-align: left;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.tableHeaderBorderColor};
  &:not(:last-child) {
    border-right: 1px solid ${(props) => props.theme.COLORS.tableHeaderBorderColor};
  }
  &:first-child {
    font-weight: bold; // Destaque para a primeira célula
  }
  @media (max-width: 768px) {
    display: block;
    text-align: right;
    padding: 10px 20px;
    position: relative;
    box-sizing: border-box;
    &:before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      font-weight: bold;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

export const Actions = styled.div`
    display: flex;
    gap: 10px;

    @media (max-width: 768px) {
        justify-content: flex-end; // Alinha os botões à direita da célula
    }
`;

export const ActionBtn = styled.button<{ $variant: string }>`
  padding: 6px 10px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.$variant === "warning"
      ? props.theme.COLORS.warning
      : props.theme.COLORS.danger};
  color: ${(props) => props.theme.COLORS.white};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) =>
      props.$variant === "warning"
        ? props.theme.COLORS.warning
        : props.theme.COLORS.warning};
    border-color: ${(props) =>
      props.$variant === "warning"
        ? props.theme.COLORS.warning
        : props.theme.COLORS.danger};
  }
`;

export const EditIcon = styled(MdOutlineEdit)`
  font-size: ${(props) => props.theme.FONT_SIZES.lg};
`;

export const DeleteIcon = styled(MdOutlineDeleteForever)`
    font-size: ${props => props.theme.FONT_SIZES.lg};
`;