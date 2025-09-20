import { useEffect, useState } from "react";
import type { Usuario, UsuarioStats } from "../../../@types/Usuario";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUsuarios, getUsuariosStats } from "../../../services/requests";
import { 
    Body, Container, Empty, EmptyIcon, EmptyLabel, Header, HeaderInfo, 
    HeaderSearch, HeaderSearchIcon, HeaderSearchInput, HeaderSubtitle, 
    HeaderTitle, Loading, Pagination, PaginationItem, ContentArea,
    FilterWrapper, FilterToggleButton, FilterContent 
} from "./styles";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import { Button } from "../../../components/Button";
import Alert from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdFilterList, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { UsuariosTable } from "../../../components/UsuariosTable";
import { StatsContainer, StatCard, StatCardTitle, StatCardRow, StatCardLabel, StatCardValue } from "./styles";

export const Usuarios = () => {
    // Bloco correto de estados
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [showAlert, setShowAlert] = useState({ type: "error" as "success" | "error", message: "", show: false });
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [stats, setStats] = useState<UsuarioStats | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeSearch, setActiveSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [activeTypeFilter, setActiveTypeFilter] = useState('');
    const [filtersVisible, setFiltersVisible] = useState(false);

    // ===== REMOVA O BLOCO DUPLICADO ABAIXO =====
    // const [loadingStats, setLoadingStats] = useState(true);
    // const [loadingTable, setLoadingTable] = useState(true);
    // const [searchValue, setSearchValue] = useState('');
    // ... e assim por diante
    // ===== FIM DO BLOCO A SER REMOVIDO =====

    const theme = useTheme();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchStats = async () => {
            setLoadingStats(true);
            const statsResponse = await getUsuariosStats();
            if (statsResponse.data) {
                setStats(statsResponse.data);
            } else if (statsResponse.error) {
                setShowAlert({ type: "error", message: statsResponse.error, show: true });
            }
            setLoadingStats(false);
        };
        fetchStats();
    }, []);

    useEffect(() => {
        const fetchUserList = async () => {
            setLoadingTable(true);
            const usersResponse = await getUsuarios(currentPage, activeSearch, activeTypeFilter);
            
            if (usersResponse.data) {
                setUsuarios(usersResponse.data.usuarios.items);
                setTotalPages(usersResponse.data.usuarios.pageTotal);
            } else if (usersResponse.error) {
                setShowAlert({ type: "error", message: usersResponse.error, show: true });
            }
            setLoadingTable(false);
        };
        fetchUserList();
    }, [currentPage, activeSearch, activeTypeFilter]);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setActiveSearch(searchValue);
        setActiveTypeFilter(typeFilter);
    };

    const handleEditUsuario = (id: string) => navigate(`/usuarios/${id}/editar`);

    const tipoOptions = [
        { label: "Todos os Tipos", value: "" },
        { label: "Aluno", value: "Aluno" },
        { label: "Professor", value: "Professor" },
        { label: "Administração", value: "Administracao" }
    ];

    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Colaboradores</HeaderTitle>
                    <HeaderSubtitle>Consulte e gerencie todos os Colaboradores e filtre sua busca!</HeaderSubtitle>
                </HeaderInfo>

                <FilterWrapper>
                    <FilterToggleButton onClick={() => setFiltersVisible(!filtersVisible)}>
                        <MdFilterList size={20} />
                        <span>Filtros</span>
                        {filtersVisible ? <MdOutlineKeyboardArrowUp size={22}/> : <MdOutlineKeyboardArrowRight size={22} />}
                    </FilterToggleButton>
                    
                    <FilterContent $isVisible={filtersVisible}>
                        <HeaderSearch>
                            <SelectInput
                                options={tipoOptions}
                                value={typeFilter}
                                onChange={e => setTypeFilter(e.target.value)}
                            />
                            <HeaderSearchInput>
                                <TextInput
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder="Pesquisar por nome..."
                                />
                            </HeaderSearchInput>
                            <Button onClick={handleSearch} borderRadius="rounded">
                                <HeaderSearchIcon />
                            </Button>
                        </HeaderSearch>
                    </FilterContent>
                </FilterWrapper>
            </Header>

            <Alert
                type={showAlert.type}
                title={showAlert.message}
                show={showAlert.show}
                setShow={show => setShowAlert({ ...showAlert, show })}
            />
            
            <Body>
                <ContentArea>
                    {loadingStats ? (
                        <Loading>
                            <ScaleLoader color={theme.COLORS.primary} />
                        </Loading>
                    ) : (
                        stats && (
                            <StatsContainer>
                                <StatCard>
                                    <StatCardTitle>Alunos</StatCardTitle>
                                    <StatCardRow>
                                        <StatCardLabel>Ativos:</StatCardLabel>
                                        <StatCardValue color={theme.COLORS.success}>{stats.alunos.ativos}</StatCardValue>
                                    </StatCardRow>
                                    <StatCardRow>
                                        <StatCardLabel>Desativados:</StatCardLabel>
                                        <StatCardValue color={theme.COLORS.danger}>{stats.alunos.desativados}</StatCardValue>
                                    </StatCardRow>
                                </StatCard>
                                <StatCard>
                                    <StatCardTitle>Professores</StatCardTitle>
                                    <StatCardRow>
                                        <StatCardLabel>Ativos:</StatCardLabel>
                                        <StatCardValue color={theme.COLORS.success}>{stats.professores.ativos}</StatCardValue>
                                    </StatCardRow>
                                    <StatCardRow>
                                        <StatCardLabel>Desativados:</StatCardLabel>
                                        <StatCardValue color={theme.COLORS.danger}>{stats.professores.desativados}</StatCardValue>
                                    </StatCardRow>
                                </StatCard>
                                <StatCard>
                                    <StatCardTitle>Administração</StatCardTitle>
                                    <StatCardRow>
                                        <StatCardLabel>Ativos:</StatCardLabel>
                                        <StatCardValue color={theme.COLORS.success}>{stats.administracao.ativos}</StatCardValue>
                                    </StatCardRow>
                                    <StatCardRow>
                                        <StatCardLabel>Desativados:</StatCardLabel>
                                        <StatCardValue color={theme.COLORS.danger}>{stats.administracao.desativados}</StatCardValue>
                                    </StatCardRow>
                                </StatCard>
                            </StatsContainer>
                        )
                    )}

                    {loadingTable ? (
                        !loadingStats && <Loading><ScaleLoader color={theme.COLORS.primary} /></Loading>
                    ) : (
                        usuarios.length === 0 ? (
                            <Empty>
                                <EmptyIcon />
                                <EmptyLabel>Nenhum usuário encontrado</EmptyLabel>
                            </Empty>
                        ) : (
                            <>
                                <UsuariosTable data={usuarios} onEdit={handleEditUsuario} />
                                {totalPages > 1 && (
                                    <Pagination>
                                        <PaginationItem $isLeft onClick={handlePreviousPage} disabled={currentPage === 1}>
                                            <MdOutlineKeyboardArrowLeft size={21} />
                                        </PaginationItem>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <PaginationItem
                                                key={index}
                                                $active={index + 1 === currentPage}
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {index + 1}
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem $isRight onClick={handleNextPage} disabled={currentPage === totalPages}>
                                            <MdOutlineKeyboardArrowRight size={21} />
                                        </PaginationItem>
                                    </Pagination>
                                )}
                            </>
                        )
                    )}
                </ContentArea>
            </Body>
        </Container>
    );
};