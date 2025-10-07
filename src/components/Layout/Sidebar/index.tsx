import { useAppSelector } from "../../../redux/hooks";
import { Link, useLocation } from "react-router-dom";
import {
    Container,
    SidebarToggleButton,
    Footer,
    Header,
    HeaderLogo,
    SchoolNameLogo,
    Navigation,
    NavigationItem,
    NavigationItemIcon,
    NavigationItemLabel,
    User,
    UserAvatar,
    UserName
} from "./styles";
import {
    MdOutlineDashboard,
    MdOutlineListAlt,
    MdPersonAdd,
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
    MdOutlineCalendarToday,
    MdAddCircleOutline,
    MdPlayCircleOutline
} from "react-icons/md";

const menuItems = [
    { label: 'Dashboard', url: '/', icon: <MdOutlineDashboard />, allowedRoles: ['Administracao'] },
    { label: 'Agendamento', url: '/agendamento', icon: <MdOutlineCalendarToday />, allowedRoles: ['Administracao', 'Professor', 'Aluno'] },
    { label: 'Nova Aula', url: '/agendamento/novo', icon: <MdAddCircleOutline />, allowedRoles: ['Administracao', 'Professor', 'Aluno'] },
    { label: 'Colaboradores', url: '/Usuarios', icon: <MdOutlineListAlt />, allowedRoles: ['Administracao'] },
    { label: 'Cadastrar', url: '/Usuarios/Cadastrar', icon: <MdPersonAdd />, allowedRoles: ['Administracao'] },
    { label: 'Vídeos', url: '/videos', icon: <MdPlayCircleOutline />, allowedRoles: ['Administracao', 'Professor', 'Aluno'] },
];

interface SidebarProps {
    isExpanded: boolean;
    handleToggleExpand: () => void;
    isMobile: boolean;
}

export const Sidebar = ({ isExpanded, handleToggleExpand, isMobile }: SidebarProps) => {
    const auth = useAppSelector(state => state.auth);
    const { pathname } = useLocation();

    // Função para fechar o menu no mobile ao clicar em um link
    const handleLinkClick = () => {
        if (isMobile) {
            handleToggleExpand();
        }
    };

    return (
        <Container $expanded={isExpanded}>
            <Header>
                {isExpanded && (
                    <Link to='/'>
                        <SchoolNameLogo>
                            Convergência Musical
                        </SchoolNameLogo>
                    </Link>
                )}
                <SidebarToggleButton onClick={handleToggleExpand} borderRadius="rounded">
                    {isExpanded ? <MdOutlineKeyboardArrowLeft size={24} /> : <MdOutlineKeyboardArrowRight size={24} />}
                </SidebarToggleButton>
            </Header>

            <Navigation>
                {menuItems
                    .filter(item => item.allowedRoles.includes(auth.user?.tipoPessoa || ''))
                    .map((item, key) => (
                        <Link to={item.url} key={key} onClick={handleLinkClick}>
                            <NavigationItem $isActive={pathname === item.url}>
                                <NavigationItemIcon>
                                    {item.icon}
                                </NavigationItemIcon>
                                {isExpanded && (
                                    <NavigationItemLabel>
                                        {item.label}
                                    </NavigationItemLabel>
                                )}
                            </NavigationItem>
                        </Link>
                    ))}
            </Navigation>

            <Footer>
                <Link to='/account' onClick={handleLinkClick}>
                    <User>
                        <UserAvatar>
                            {auth.user?.name.slice(0, 2)}
                        </UserAvatar>
                        {isExpanded && (
                            <UserName>
                                {auth.user?.name}
                                <span style={{ fontSize: '12px', color: '#666', display: 'block', marginTop: '2px' }}>
                                    Perfil: {auth.user?.tipoPessoa || 'Não identificado'}
                                </span>
                            </UserName>
                        )}
                    </User>
                </Link>
            </Footer>
        </Container>
    );
}