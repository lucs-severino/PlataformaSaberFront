import { useEffect, useState, useMemo } from "react";
import { useTheme } from "styled-components";
import { ScaleLoader } from "react-spinners";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

import type { AgendamentoLista, AgendamentoStatus } from "../../../@types/Agendamento";
import { getMockedAgendamentos } from "../../../services/mock";
import { AgendamentosTable } from "../../../components/AgendamentosTable";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import Alert from "../../../components/Alert";

import { 
    Body, 
    Container, 
    Empty, 
    EmptyIcon, 
    EmptyLabel, 
    Header, 
    HeaderInfo, 
    HeaderSubtitle, 
    HeaderTitle, 
    Loading, 
    Pagination, 
    PaginationItem,
    Filters
} from "./styles";

export const Agendamentos = () => {
    const [loading, setLoading] = useState(true);
    const [agendamentos, setAgendamentos] = useState<AgendamentoLista[]>([]);
    const [showAlert, setShowAlert] = useState({ type: "success" as "success"|"error", message: "", show: false });
    
    // Estados para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Estados para os filtros
    const [filters, setFilters] = useState({
        nomeAluno: '',
        nomeProfessor: '',
        status: ''
    });

    const theme = useTheme();

    const statusOptions = [
        { label: "Todos os Status", value: "" },
        { label: "Agendado", value: "Agendado" },
        { label: "Confirmado", value: "Confirmado" },
        { label: "Realizado", value: "Realizado" },
        { label: "Cancelado", value: "Cancelado" },
    ];

    const fetchAgendamentos = async () => {
        setLoading(true);
        const response = await getMockedAgendamentos(currentPage, filters);
        setAgendamentos(response.items);
        setTotalPages(response.pageTotal);
        setLoading(false);
    };

    // Efeito para buscar dados quando a página ou os filtros mudam
    useEffect(() => {
        fetchAgendamentos();
    }, [currentPage, filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name?: string; value: string } }) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name!]: value }));
        setCurrentPage(1); // Reseta para a primeira página ao aplicar um filtro
    };

    // Funções de ação (apenas exibem alertas por enquanto)
    const handleConfirm = (id: string) => {
        setShowAlert({ type: "success", message: `Agendamento #${id} confirmado!`, show: true });
    };
    
    const handleCancel = (id: string) => {
        const motivo = prompt("Por favor, insira o motivo do cancelamento:");
        if (motivo) {
            setShowAlert({ type: "success", message: `Agendamento #${id} cancelado. Motivo: ${motivo}`, show: true });
        }
    };
    
    const handleConclude = (id: string) => {
        setShowAlert({ type: "success", message: `Aula #${id} marcada como realizada!`, show: true });
    };

    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Gerenciar Aulas</HeaderTitle>
                    <HeaderSubtitle>Consulte, filtre e gerencie todas as aulas agendadas.</HeaderSubtitle>
                </HeaderInfo>

                <Filters>
                    <TextInput name="nomeAluno" placeholder="Filtrar por aluno..." onChange={handleFilterChange} />
                    <TextInput name="nomeProfessor" placeholder="Filtrar por professor..." onChange={handleFilterChange} />
                    <SelectInput name="status" options={statusOptions} onChange={handleFilterChange} value={filters.status} />
                </Filters>
            </Header>

            <Alert type={showAlert.type} title={showAlert.message} show={showAlert.show} setShow={show => setShowAlert({ ...showAlert, show })} />

            <Body>
                {loading ? (
                    <Loading>
                        <ScaleLoader color={theme.COLORS.primary} />
                    </Loading>
                ) : agendamentos.length === 0 ? (
                    <Empty>
                        <EmptyIcon />
                        <EmptyLabel>Nenhum agendamento encontrado para os filtros selecionados.</EmptyLabel>
                    </Empty>
                ) : (
                    <>
                        <AgendamentosTable
                            data={agendamentos}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                            onConclude={handleConclude}
                        />

                        {totalPages > 1 && (
                            <Pagination>
                                <PaginationItem $isLeft onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                    <MdOutlineKeyboardArrowLeft size={21} />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem key={index} $active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                        {index + 1}
                                    </PaginationItem>
                                ))}

                                <PaginationItem $isRight onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                    <MdOutlineKeyboardArrowRight size={21} />
                                </PaginationItem>
                            </Pagination>
                        )}
                    </>
                )}
            </Body>
        </Container>
    );
};