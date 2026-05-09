import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Box,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CategoryIcon from "@mui/icons-material/Category";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupsIcon from "@mui/icons-material/Groups";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const drawerWidth = 260;

export default function Sidebar() {
    const { logout, user } = useContext(AuthContext);
    const { toggleTheme, mode } = useContext(ThemeContext);
    const location = useLocation();
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const navItems = [
        { label: "Dashboard", path: "/", icon: <DashboardIcon fontSize="small" /> },
        { label: "Gastos", path: "/gastos", icon: <ReceiptLongIcon fontSize="small" /> },
    ];

    const adminItems = [
        {
            label: "Resumen admin",
            path: "/admin/resumen",
            icon: <AnalyticsIcon fontSize="small" />,
        },
        {
            label: "Gastos por usuario",
            path: "/admin/gastos",
            icon: <GroupsIcon fontSize="small" />,
        },
        {
            label: "Categorías",
            path: "/admin/categorias",
            icon: <CategoryIcon fontSize="small" />,
        },
        {
            label: "Crear admin",
            path: "/admin/crear-admin",
            icon: <AdminPanelSettingsIcon fontSize="small" />,
        },
    ];

    const renderItem = (item) => {
        const active = location.pathname === item.path;

        return (
            <ListItem disablePadding key={item.path} sx={{ mb: 0.5 }}>
                <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                        borderRadius: "12px",
                        px: 2,
                        py: 1.2,
                        gap: 1.5,
                        background: active
                            ? "linear-gradient(135deg, rgba(0,230,118,0.15), rgba(0,191,165,0.08))"
                            : "transparent",
                        border: active
                            ? "1px solid rgba(0,230,118,0.2)"
                            : "1px solid transparent",
                        "&:hover": {
                            background: isDark
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(0,0,0,0.04)",
                        },
                        transition: "all 0.2s ease",
                    }}
                >
                    <Box
                        sx={{
                            color: active
                                ? "#00e676"
                                : isDark
                                    ? "rgba(255,255,255,0.4)"
                                    : "rgba(0,0,0,0.35)",
                            display: "flex",
                        }}
                    >
                        {item.icon}
                    </Box>

                    <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                            sx: {
                                color: active
                                    ? isDark
                                        ? "white"
                                        : "#0d0d1a"
                                    : isDark
                                        ? "rgba(255,255,255,0.55)"
                                        : "rgba(0,0,0,0.5)",
                                fontWeight: active ? 600 : 400,
                                fontSize: "14px",
                                fontFamily: "'DM Sans', sans-serif",
                            },
                        }}
                    />

                    {active && (
                        <Box
                            sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "#00e676",
                                boxShadow: "0 0 8px #00e676",
                            }}
                        />
                    )}
                </ListItemButton>
            </ListItem>
        );
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: isDark
                        ? "linear-gradient(180deg, #0a0a14 0%, #0f0f1a 100%)"
                        : "linear-gradient(180deg, #ffffff 0%, #f5f6ff 100%)",
                    borderRight: isDark
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(0,0,0,0.07)",
                    p: 0,
                    overflow: "hidden",
                },
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 3.5,
                    borderBottom: isDark
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(0,0,0,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <Box
                    sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #00e676, #00bfa5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        boxShadow: "0 4px 20px rgba(0,230,118,0.35)",
                    }}
                >
                    💎
                </Box>

                <Box>
                    <Typography
                        sx={{
                            color: isDark ? "white" : "#0d0d1a",
                            fontWeight: 700,
                            fontSize: "15px",
                            letterSpacing: "0.02em",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Gestion de Gastos
                    </Typography>

                    <Typography
                        sx={{
                            color: isDark
                                ? "rgba(255,255,255,0.35)"
                                : "rgba(0,0,0,0.35)",
                            fontSize: "11px",
                            letterSpacing: "0.05em",
                        }}
                    >
                        {user?.rol === "admin" ? "Administrador" : "Usuario"}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ px: 2, pt: 3, flexGrow: 1 }}>
                <Typography
                    sx={{
                        color: isDark
                            ? "rgba(255,255,255,0.25)"
                            : "rgba(0,0,0,0.3)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        px: 1.5,
                        mb: 1,
                    }}
                >
                    Menú
                </Typography>

                <List disablePadding>
                    {navItems.map(renderItem)}
                </List>

                {user?.rol === "admin" && (
                    <>
                        <Typography
                            sx={{
                                color: isDark
                                    ? "rgba(255,255,255,0.25)"
                                    : "rgba(0,0,0,0.3)",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                px: 1.5,
                                mt: 3,
                                mb: 1,
                            }}
                        >
                            Admin
                        </Typography>

                        <List disablePadding>
                            {adminItems.map(renderItem)}
                        </List>
                    </>
                )}
            </Box>

            <Box
                sx={{
                    px: 2,
                    pb: 3,
                    borderTop: isDark
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(0,0,0,0.07)",
                    pt: 2,
                }}
            >
                <ListItemButton
                    onClick={toggleTheme}
                    sx={{
                        borderRadius: "12px",
                        px: 2,
                        py: 1.2,
                        gap: 1.5,
                        mb: 0.5,
                        "&:hover": {
                            background: isDark
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(0,0,0,0.04)",
                        },
                    }}
                >
                    <Box
                        sx={{
                            color: isDark
                                ? "rgba(255,255,255,0.4)"
                                : "rgba(0,0,0,0.4)",
                            display: "flex",
                        }}
                    >
                        {mode === "dark" ? (
                            <LightModeIcon fontSize="small" />
                        ) : (
                            <DarkModeIcon fontSize="small" />
                        )}
                    </Box>

                    <ListItemText
                        primary={mode === "dark" ? "Modo claro" : "Modo oscuro"}
                        primaryTypographyProps={{
                            sx: {
                                color: isDark
                                    ? "rgba(255,255,255,0.5)"
                                    : "rgba(0,0,0,0.5)",
                                fontSize: "14px",
                                fontFamily: "'DM Sans', sans-serif",
                            },
                        }}
                    />
                </ListItemButton>

                <ListItemButton
                    onClick={logout}
                    sx={{
                        borderRadius: "12px",
                        px: 2,
                        py: 1.2,
                        gap: 1.5,
                        "&:hover": { background: "rgba(255,80,80,0.08)" },
                    }}
                >
                    <Box sx={{ color: "rgba(255,100,100,0.6)", display: "flex" }}>
                        <LogoutIcon fontSize="small" />
                    </Box>

                    <ListItemText
                        primary="Cerrar sesión"
                        primaryTypographyProps={{
                            sx: {
                                color: "rgba(255,100,100,0.7)",
                                fontSize: "14px",
                                fontFamily: "'DM Sans', sans-serif",
                            },
                        }}
                    />
                </ListItemButton>
            </Box>
        </Drawer>
    );
}