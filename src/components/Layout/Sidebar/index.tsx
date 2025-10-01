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
    { label: 'Dashboard', url: '/', icon: <MdOutlineDashboard /> },
    { label: 'Agendamento', url: '/agendamento', icon: <MdOutlineCalendarToday /> },
    { label: 'Nova Aula', url: '/agendamento/novo', icon: <MdAddCircleOutline /> },
    { label: 'Colaboradores', url: '/Usuarios', icon: <MdOutlineListAlt /> },
    { label: 'Cadastrar', url: '/Usuarios/Cadastrar', icon: <MdPersonAdd /> },
    { label: 'Vídeos', url: '/videos', icon: <MdPlayCircleOutline /> },
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
                {menuItems.map((item, key) => (
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
                            </UserName>
                        )}
                    </User>
                </Link>
            </Footer>
        </Container>
    );
}