import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import styled from "styled-components";

// Contêiner principal, se necessário para altura
export const Container = styled.div`
    height: 100%;
`;

// Wrapper para habilitar a rolagem horizontal em telas menores
export const TableWrapper = styled.div`
    width: 100%; // Garante que o wrapper ocupa toda a largura disponível
    overflow-x: auto; // Habilita a rolagem horizontal se o conteúdo for maior que a tela
    -webkit-overflow-scrolling: touch; // Melhora a rolagem em dispositivos iOS
    border-radius: 8px; // Aplica o border-radius no wrapper para consistência
    border: 1px solid ${props => props.theme.COLORS.tableHeaderBorderColor}; // Borda para o wrapper

    /* Remove a borda da tabela se o wrapper já tiver uma */
    & > table {
        border: none;
    }

    @media (max-width: 768px) {
        // Estilos específicos para telas menores (opcional, já tratado por overflow-x)
    }
`;

export const Table = styled.table`
    width: 100%;
    border-spacing: 0;
`;

export const TableHead = styled.thead`
    background-color: ${props => props.theme.COLORS.tableHeaderBackground};
    color: ${props => props.theme.COLORS.textColor500};

    @media (max-width: 768px) {
        display: none; // Esconde o cabeçalho original em telas pequenas
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
        background-color: ${props => props.theme.COLORS.tableRowHover};
    }

    @media (max-width: 768px) {
        display: block;
        border-bottom: 2px solid ${props => props.theme.COLORS.primary};
        margin-bottom: 20px;

        &:last-of-type {
            margin-bottom: 0;
        }
    }
`;

export const TableCell = styled.td`
    padding: 10px 20px;
    color: ${props => props.theme.COLORS.textColor500};

    &:not(:last-child) {
        border-right: 1px solid ${props => props.theme.COLORS.tableHeaderBorderColor};
    }

 @media (max-width: 768px) {
        display: block;
        text-align: right; 
        position: relative;
        padding: 12px 15px 12px 50%;
        box-sizing: border-box;
        border-right: none !important; 
        border-bottom: 1px solid ${props => props.theme.COLORS.borderColor};

        &:before {
            content: attr(data-label); 
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 15px;
            width: calc(50% - 30px);
            text-align: left;
            font-weight: bold;
        }

        &:last-child {
            border-bottom: 0;
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
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid transparent;
    background-color: ${props => props.$variant === 'warning' ? props.theme.COLORS.warning : props.theme.COLORS.danger};
    color: ${props => props.theme.COLORS.white};
    transition: all .3s;
    outline: none;
    cursor: pointer;
    display: flex; /* Para centralizar os ícones */
    align-items: center;
    justify-content: center;

    &:hover {
        border-color: ${props => props.$variant === 'warning' ? props.theme.COLORS.warning : props.theme.COLORS.danger};
        background-color: transparent;
        color:  ${props => props.$variant === 'warning' ? props.theme.COLORS.warning : props.theme.COLORS.danger};
    }
`;

export const EditIcon = styled(MdOutlineEdit)`
    font-size: ${props => props.theme.FONT_SIZES.lg};
`;

export const DeleteIcon = styled(MdOutlineDeleteForever)`
    font-size: ${props => props.theme.FONT_SIZES.lg};
`;