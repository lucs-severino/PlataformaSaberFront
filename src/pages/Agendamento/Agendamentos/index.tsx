import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { ScaleLoader } from "react-spinners";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineSearch } from "react-icons/md";
import {
    getAgendamentos,
    getAgendamentoDetalhes,
    confirmarAgendamento,
    cancelarAgendamento
} from "../../../services/requests";
import { AgendamentosTable } from "../../../components/AgendamentosTable";
import SelectInput from "../../../components/SelectInput";
import Alert from "../../../components/Alert";
import { Button } from "../../../components/Button";
import {
    Body, Container, Loading, Empty, EmptyLabel,
    FilterBar, FilterControls, TabContainer, TabButton, Pagination, PaginationItem
} from "./styles";
import TextInput from "../../../components/TextInput";
import type { AgendamentoDetalhe, AgendamentoLista } from "../../../@types/Agendamento";
import { DetalheAgendamentoModal } from "../../../components/DetalheAgendamentoModal";
import { CancelarAgendamentoModal } from "../../../components/CancelarAgendamentoModal";

export const Agendamentos = () => {
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState({ type: "success" as "success" | "error", message: "", show: false });

    const [agendamentos, setAgendamentos] = useState<AgendamentoLista[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeView, setActiveView] = useState<'futuras' | 'passadas'>('futuras');

    const [inputValues, setInputValues] = useState({ status: '', data: '', nome: '' });
    const [activeFilters, setActiveFilters] = useState({ status: '', data: '', nome: '' });

    const [selectedAgendamento, setSelectedAgendamento] = useState<AgendamentoDetalhe | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState<string | null>(null);

    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const statusOptions = [
        { label: "Todos os Status", value: "" },
        { label: "Agendado", value: "Agendado" },
        { label: "Confirmado", value: "Confirmado" },
        { label: "Cancelado", value: "Cancelado" },
    ];

    // Função de busca centralizada e otimizada com useCallback
    const fetchData = useCallback(async (filters: typeof activeFilters, page: number, view: typeof activeView) => {
        setLoading(true);
        const response = await getAgendamentos(page, filters, view);

        if (response.data) {
            setAgendamentos(response.data.items);
            setTotalPages(response.data.pageTotal);
        } else {
            setAgendamentos([]);
            setTotalPages(1);
        }
        setLoading(false);
    }, []); // Sem dependências, pois os parâmetros são passados diretamente

    // Efeito principal que orquestra a busca de dados
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const statusFromUrl = params.get('status');

        if (statusFromUrl) {
            const validStatus = statusOptions.some(option => option.value === statusFromUrl);
            if (validStatus) {
                const newFilters = { ...activeFilters, status: statusFromUrl };
                // Atualiza ambos os estados de filtro
                setInputValues(newFilters);
                setActiveFilters(newFilters);
                // Reseta a página e limpa a URL
                setCurrentPage(1);
                navigate(location.pathname, { replace: true });
                // A busca será acionada pelo useEffect abaixo quando 'activeFilters' for atualizado
            }
        } else {
            // Se não houver filtro na URL, busca com os filtros atuais
            fetchData(activeFilters, currentPage, activeView);
        }
    }, [location.search]); // Reage apenas a mudanças na URL

    // Efeito secundário que reage a mudanças nos filtros, página ou aba
    useEffect(() => {
        // Evita a busca inicial se a URL estiver sendo processada
        const params = new URLSearchParams(location.search);
        if (!params.get('status')) {
            fetchData(activeFilters, currentPage, activeView);
        }
    }, [activeFilters, currentPage, activeView, fetchData]);

    
    const handleTabChange = (view: 'futuras' | 'passadas') => {
        setActiveView(view);
        setCurrentPage(1);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setActiveFilters(inputValues);
    };
    
    // As funções de manipulação de agendamento permanecem as mesmas
    const handleConfirm = async (id: string) => {
        const response = await confirmarAgendamento(id);
        if (response.error) {
            setShowAlert({ type: "error", message: response.error, show: true });
        } else {
            setShowAlert({ type: "success", message: "Agendamento confirmado com sucesso!", show: true });
            fetchData(activeFilters, currentPage, activeView);
        }
    };
    
    const handleOpenCancelModal = (id: string) => {
        setAgendamentoParaCancelar(id);
    };

    const handleConfirmCancel = async (motivo: string) => {
        if (!agendamentoParaCancelar) return;
        
        const response = await cancelarAgendamento(agendamentoParaCancelar, motivo);
        if (response.error) {
            setShowAlert({ type: "error", message: response.error, show: true });
        } else {
            setShowAlert({ type: "success", message: "Agendamento cancelado com sucesso!", show: true });
            setAgendamentoParaCancelar(null);
            fetchData(activeFilters, currentPage, activeView);
        }
    };

    const handleViewDetails = async (id: string) => {
        const response = await getAgendamentoDetalhes(id);
        if (response.data) {
            setSelectedAgendamento(response.data);
            setIsModalOpen(true);
        } else {
            setShowAlert({ type: "error", message: response.error || "Não foi possível carregar os detalhes.", show: true });
        }
    };
    
    const handleInputChange = (e: { target: { name?: string; value: string } }) => {
        const { name, value } = e.target;
        setInputValues(prev => ({ ...prev, [name!]: value }));
    };

    return (
        <Container>
            <Alert type={showAlert.type} title={showAlert.message} show={showAlert.show} setShow={show => setShowAlert({ ...showAlert, show })} />
            
            <FilterBar>
                <FilterControls>
                    <TextInput name="nome" placeholder="Buscar por aluno ou professor..." onChange={handleInputChange} value={inputValues.nome} />
                    <SelectInput name="status" options={statusOptions} onChange={handleInputChange} value={inputValues.status} />
                    <TextInput type="date" name="data" onChange={handleInputChange} value={inputValues.data} />
                </FilterControls>
                <Button onClick={handleSearch}><MdOutlineSearch size={20} /> Buscar</Button>
            </FilterBar>

            <Body>
                <TabContainer>
                    <TabButton onClick={() => handleTabChange('futuras')} $isActive={activeView === 'futuras'}>Próximas Aulas</TabButton>
                    <TabButton onClick={() => handleTabChange('passadas')} $isActive={activeView === 'passadas'}>Aulas Anteriores</TabButton>
                </TabContainer>

                {loading ? <Loading><ScaleLoader color={theme.COLORS.primary} /></Loading> :
                    agendamentos.length > 0 ? (
                        <>
                            <AgendamentosTable data={agendamentos} onConfirm={handleConfirm} onCancel={handleOpenCancelModal} onViewDetails={handleViewDetails} />
                            {totalPages > 1 && (
                                <Pagination>
                                    <PaginationItem onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><MdOutlineKeyboardArrowLeft size={21} /></PaginationItem>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <PaginationItem key={index} $active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                            {index + 1}
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}><MdOutlineKeyboardArrowRight size={21} /></PaginationItem>
                                </Pagination>
                            )}
                        </>
                    ) : (
                        <Empty><EmptyLabel>Nenhum agendamento encontrado para esta visualização.</EmptyLabel></Empty>
                    )
                }
            </Body>

            {isModalOpen && <DetalheAgendamentoModal agendamento={selectedAgendamento} onClose={() => setIsModalOpen(false)} />}
            {agendamentoParaCancelar && <CancelarAgendamentoModal onClose={() => setAgendamentoParaCancelar(null)} onConfirm={handleConfirmCancel} />}
        </Container>
    );
};