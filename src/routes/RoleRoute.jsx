import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RoleRoute({ children, allowedRoles }) {
    const { token, user } = useContext(AuthContext);

    if (!token) return <Navigate to="/login" />;

    if (!allowedRoles.includes(user?.rol)) {
        return <Navigate to="/" />;
    }

    return children;
}