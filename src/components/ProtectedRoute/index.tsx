import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAppSelector(state => state.auth);
    
    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    
    if (!allowedRoles.includes(user.tipoPessoa)) {
        return <Navigate to="/agendamento" replace />;
    }
    
    return <>{children}</>;
};





