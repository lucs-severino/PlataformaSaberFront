import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { 
    BodyContent, 
    Container, 
    Content, 
    NavbarContent, 
    Overlay, 
    MobileMenuIcon 
} from "./styles";

export const Layout = () => {
    // Estado para controlar a expansão do sidebar
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(window.innerWidth > 768);
    // Estado para saber se estamos em visualização mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleToggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

    useEffect(() => {
        const handleResize = () => {
            const currentIsMobile = window.innerWidth <= 768;
            
            if (currentIsMobile !== isMobile) {
                setIsMobile(currentIsMobile);
                if (currentIsMobile) {
                    setIsSidebarExpanded(false);
                } else {
                    setIsSidebarExpanded(true);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    return (
        <AuthMiddleware>
            <Container>
                <Sidebar
                    isExpanded={isSidebarExpanded}
                    handleToggleExpand={handleToggleSidebar}
                    isMobile={isMobile} 
                />
                
                <Overlay 
                    $show={isMobile && isSidebarExpanded} 
                    onClick={handleToggleSidebar}
                />

                <Content>
                    <NavbarContent>
                        <MobileMenuIcon onClick={handleToggleSidebar} />
                        <Navbar />
                    </NavbarContent>

                    <BodyContent>
                        <Outlet />
                    </BodyContent>
                </Content>
            </Container>
        </AuthMiddleware>
    );
};