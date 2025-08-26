import { useEffect, useState } from "react"
import type { Usuario } from "../../../@types/Usuario"
import { useTheme } from "styled-components"
import { useNavigate } from "react-router-dom"
import { getUsuarios, deleteUsuario } from "../../../services/requests" 
import { 
    Body, 
    Container, 
    Empty, 
    EmptyIcon, 
    EmptyLabel, 
    Header, 
    HeaderInfo, 
    HeaderSearch, 
    HeaderSearchIcon, 
    HeaderSearchInput, 
    HeaderSubtitle, 
    HeaderTitle, 
    Loading, 
    Pagination, 
    PaginationItem,
    ContentArea 
} from "./styles" 
import TextInput from "../../../components/TextInput"
import { Button } from "../../../components/Button"
import Alert from "../../../components/Alert"
import { ScaleLoader } from "react-spinners"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { UsuariosTable } from "../../../components/UsuariosTable"

export const Usuarios = () => {
    const [loadingRequest, setLoadingRequest] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [showAlert, setShowAlert] = useState({ type: "error", message: "", show: false })
    const [usuarios, setUsuarios] = useState<Usuario[]>([]) 
    const [usuariosFiltered, setUsuariosFiltered] = useState<Usuario[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const theme = useTheme()
    const navigate = useNavigate()

    const handleGetUsuarios = async () => {
        setLoadingRequest(true)
        const request = await getUsuarios(currentPage) 
        setLoadingRequest(false)

        if (request.data) {
            if (!searchValue) setUsuariosFiltered(request.data.usuarios.items) 
            setUsuarios(request.data.usuarios.items)
            setTotalPages(request.data.usuarios.pageTotal)
        }

        if (request.error) {
            setShowAlert({ type: "error", message: request.error, show: true })
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const handleSearch = () => {
        setUsuariosFiltered(usuarios.filter(usuario => usuario.nome.toLowerCase().includes(searchValue.toLowerCase())))
    }

    const handleEditUsuario = (id: string) => navigate(`/usuarios/${id}/editar`) 
    const handleDeleteUsuario = async (id: string) => {
       
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) { 
            setLoadingRequest(true)
            await deleteUsuario(id) 
            await handleGetUsuarios()
            setLoadingRequest(false)

            setShowAlert({ type: "success", message: "Usuário excluído com sucesso!", show: true }) 
        }
    }

    useEffect(() => {
        handleGetUsuarios()
    }, [currentPage])

   
    useEffect(() => {
        handleSearch();
    }, [searchValue, usuarios]); 


    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Usuários</HeaderTitle> 
                    <HeaderSubtitle>Consulte e gerencie todos os usuários e filtre sua busca por nome!</HeaderSubtitle> {/* Subtítulo atualizado */}
                </HeaderInfo>

                <HeaderSearch>
                    <HeaderSearchInput>
                        <TextInput
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            placeholder="Pesquisar por..."
                        />
                    </HeaderSearchInput>

                    <Button
                        onClick={handleSearch}
                        borderRadius="rounded"
                    >
                        <HeaderSearchIcon />
                    </Button>
                </HeaderSearch>
            </Header>

            <Alert
                type={showAlert.type}
                title={showAlert.message}
                show={showAlert.show}
                setShow={show => setShowAlert({ ...showAlert, show })}
            />

            {loadingRequest &&
                <Loading>
                    <ScaleLoader color={theme.COLORS.primary} />
                </Loading>
            }

            {!loadingRequest &&
                <Body>
                    <ContentArea>
                        {usuariosFiltered.length === 0 ?
                            <Empty>
                                <EmptyIcon />
                                <EmptyLabel>
                                    Nenhum usuário encontrado 
                                </EmptyLabel>
                            </Empty>
                            :
                            <>
                                <UsuariosTable
                                    data={usuariosFiltered}
                                    onEdit={handleEditUsuario}
                                    onDelete={handleDeleteUsuario}
                                />

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
                            </>
                        }
                    </ContentArea>
                </Body>
            }
        </Container>
    )
}
