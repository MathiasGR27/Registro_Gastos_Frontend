import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProviderCustom } from "./context/ThemeContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Gastos from "./pages/Gastos";
import AdminGastos from "./pages/AdminGastos";
import AdminCategorias from "./pages/AdminCategorias";
import CrearAdmin from "./pages/CrearAdmin";
import AdminResumen from "./pages/AdminResumen";
import Perfil from "./pages/Perfil";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
    return (
        <ThemeProviderCustom>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />

                        <Route path="/gastos" element={
                            <PrivateRoute>
                                <Gastos />
                            </PrivateRoute>
                        } />

                        <Route path="/admin/gastos" element={
                            <RoleRoute allowedRoles={["admin"]}>
                                <AdminGastos />
                            </RoleRoute>
                        } />

                        <Route path="/admin/categorias" element={
                            <RoleRoute allowedRoles={["admin"]}>
                                <AdminCategorias />
                            </RoleRoute>
                        } />

                        <Route path="/admin/crear-admin" element={
                            <RoleRoute allowedRoles={["admin"]}>
                                <CrearAdmin />
                            </RoleRoute>
                        } />
                        <Route path="/admin/resumen" element={
                            <RoleRoute allowedRoles={["admin"]}>
                                <AdminResumen />
                            </RoleRoute>
                        } />
                        <Route path="/perfil" element={
                            <PrivateRoute>
                                <Perfil />
                            </PrivateRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProviderCustom>
    );
}

export default App;