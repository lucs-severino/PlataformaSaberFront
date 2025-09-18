import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { ScaleLoader } from "react-spinners";
import { MdOutlineSearch } from "react-icons/md";
import { 
    getAgendamentos, 
    getDashboardAgendamentos, 
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
    DashboardContainer, Card, CardTitle, CardValue, FilterBar, FilterControls
} from "./styles";
import TextInput from "../../../components/TextInput";
import type { AgendamentoDetalhe, AgendamentoLista, DashboardData } from "../../../@types/Agendamento";
import { DetalheAgendamentoModal } from "../../../components/DetalheAgendamentoModal";
import { CancelarAgendamentoModal } from "../../../components/CancelarAgendamentoModal";

export const Agendamentos = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [agendamentos, setAgendamentos] = useState<AgendamentoLista[]>([]);
    const [showAlert, setShowAlert] = useState({ type: "success" as "success" | "error", message: "", show: false });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const [inputValues, setInputValues] = useState({ status: '', data: '', nome: '' });
    const [activeFilters, setActiveFilters] = useState({ status: '', data: '', nome: '' });
    
    const [selectedAgendamento, setSelectedAgendamento] = useState<AgendamentoDetalhe | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState<string | null>(null);

    const theme = useTheme();

    const statusOptions = [
        { label: "Todos os Status", value: "" },
        { label: "Agendado", value: "Agendado" },
        { label: "Confirmado", value: "Confirmado" },
        { label: "Cancelado", value: "Cancelado" },
    ];

    const fetchData = async () => {
        setLoading(true);
        const [dashboardResponse, agendamentosResponse] = await Promise.all([
            getDashboardAgendamentos(),
            getAgendamentos(currentPage, activeFilters) 
        ]);
        
        if (dashboardResponse.data) setDashboardData(dashboardResponse.data);
        if (agendamentosResponse.data) {
            setAgendamentos(agendamentosResponse.data.items);
            setTotalPages(agendamentosResponse.data.pageTotal);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, activeFilters]);

    const handleInputChange = (e: { target: { name?: string; value: string } }) => {
        const { name, value } = e.target;
        setInputValues(prev => ({ ...prev, [name!]: value }));
    };

    const handleSearch = () => {
        setActiveFilters(inputValues);
        setCurrentPage(1);
    };
    const handleConfirm = async (id: string) => {
        const response = await confirmarAgendamento(id);
        if (response.error) {
            setShowAlert({ type: "error", message: response.error, show: true });
        } else {
            setShowAlert({ type: "success", message: "Agendamento confirmado com sucesso!", show: true });
            fetchData(); 
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
            fetchData();
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

    if (loading) {
        return <Loading><ScaleLoader color={theme.COLORS.primary} /></Loading>;
    }

    return (
        <Container>
            <Alert type={showAlert.type} title={showAlert.message} show={showAlert.show} setShow={show => setShowAlert({ ...showAlert, show })} />
            <FilterBar>
                <FilterControls>
                    <TextInput name="nome" placeholder="Buscar por aluno ou professor..." onChange={handleInputChange} value={inputValues.nome} />
                    <SelectInput name="status" options={statusOptions} onChange={handleInputChange} value={inputValues.status} />
                    <TextInput type="date" name="data" onChange={handleInputChange} value={inputValues.data} />
                </FilterControls>
                <Button onClick={handleSearch}>
                    <MdOutlineSearch size={20} /> Buscar
                </Button>
            </FilterBar>

            <Body>
                {agendamentos.length === 0 ? (
                    <Empty><EmptyLabel>Nenhum agendamento encontrado.</EmptyLabel></Empty>
                ) : (
                    <>
                        <AgendamentosTable 
                            data={agendamentos} 
                            onConfirm={handleConfirm} 
                            onCancel={handleOpenCancelModal}
                            onViewDetails={handleViewDetails}
                        />
                    </>
                )}
            </Body>

            {isModalOpen && (
                <DetalheAgendamentoModal 
                    agendamento={selectedAgendamento}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            
            {agendamentoParaCancelar && (
                <CancelarAgendamentoModal 
                    onClose={() => setAgendamentoParaCancelar(null)}
                    onConfirm={handleConfirmCancel}
                />
            )}
        </Container>
    );
};