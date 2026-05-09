import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import {
    Box,
    Typography,
    Card,
    Button,
    Chip,
    Avatar,
    IconButton
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function Perfil() {
    const { user, logout } = useContext(AuthContext);
    const [foto, setFoto] = useState(null);

    useEffect(() => {
        const fotoGuardada = localStorage.getItem(`fotoPerfil_${user?.email}`);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (fotoGuardada) setFoto(fotoGuardada);
    }, [user]);

    const cambiarFoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setFoto(reader.result);
            localStorage.setItem(`fotoPerfil_${user?.email}`, reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <Layout>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    mx: "auto",
                }}
            >
                <Box sx={{ mb: 4, textAlign: "center" }}>
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            mb: 0.5,
                        }}
                    >
                        Cuenta
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.primary",
                            fontWeight: 800,
                            fontSize: "32px",
                        }}
                    >
                        Mi Perfil
                    </Typography>

                    <Typography sx={{ color: "text.secondary", mt: 0.8 }}>
                        Administra tu información básica dentro del sistema.
                    </Typography>
                </Box>

                <Card
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: "28px",
                        background: "rgba(255,255,255,0.035)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
                            gap: 4,
                            alignItems: "center",
                        }}
                    >
                        {/* FOTO */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <Avatar
                                    src={foto}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        background: "linear-gradient(135deg, #00e676, #00bfa5)",
                                        color: "#000",
                                        fontWeight: 800,
                                        fontSize: "54px",
                                        border: "4px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    {user?.nombre?.charAt(0)?.toUpperCase() || "U"}
                                </Avatar>

                                <IconButton
                                    component="label"
                                    sx={{
                                        position: "absolute",
                                        right: 4,
                                        bottom: 4,
                                        background: "linear-gradient(135deg, #00e676, #00bfa5)",
                                        color: "#000",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #00ff88, #00d4b1)",
                                        },
                                    }}
                                >
                                    <PhotoCameraIcon fontSize="small" />
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={cambiarFoto}
                                    />
                                </IconButton>
                            </Box>

                            <Typography
                                sx={{
                                    color: "text.primary",
                                    fontWeight: 800,
                                    fontSize: "24px",
                                    textAlign: "center",
                                }}
                            >
                                {user?.nombre || "Usuario"}
                            </Typography>

                            <Chip
                                label={user?.rol === "admin" ? "Administrador" : "Usuario"}
                                size="small"
                                sx={{
                                    background:
                                        user?.rol === "admin"
                                            ? "rgba(255,215,64,0.12)"
                                            : "rgba(0,230,118,0.12)",
                                    color:
                                        user?.rol === "admin"
                                            ? "#ffd740"
                                            : "#00e676",
                                    fontWeight: 700,
                                }}
                            />
                        </Box>

                        {/* INFORMACIÓN */}
                        <Box sx={{ display: "grid", gap: 2 }}>
                            <InfoItem
                                icon={<PersonIcon />}
                                color="#00e676"
                                label="Nombre"
                                value={user?.nombre || "No disponible"}
                            />

                            <InfoItem
                                icon={<EmailIcon />}
                                color="#40c4ff"
                                label="Email"
                                value={user?.email || "No disponible"}
                            />

                            <InfoItem
                                icon={<AdminPanelSettingsIcon />}
                                color="#ffd740"
                                label="Rol"
                                value={user?.rol || "usuario"}
                            />

                            <Button
                                startIcon={<LogoutIcon />}
                                onClick={logout}
                                sx={{
                                    mt: 2,
                                    justifySelf: "flex-start",
                                    borderRadius: "14px",
                                    background: "rgba(255,109,109,0.1)",
                                    color: "#ff6d6d",
                                    fontWeight: 800,
                                    px: 3,
                                    py: 1.2,
                                    "&:hover": {
                                        background: "rgba(255,109,109,0.18)",
                                    },
                                }}
                            >
                                Cerrar sesión
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Layout>
    );
}

function InfoItem({ icon, color, label, value }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2.3,
                borderRadius: "18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <Box
                sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "14px",
                    background: `${color}18`,
                    color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography sx={{ color: "text.secondary", fontSize: "12px" }}>
                    {label}
                </Typography>

                <Typography sx={{ color: "text.primary", fontWeight: 800 }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}