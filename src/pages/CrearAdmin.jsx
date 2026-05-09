import { useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    InputAdornment,
    Alert
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

export default function CrearAdmin() {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const fieldSx = {
        "& .MuiInputBase-root": {
            background: "rgba(255,255,255,0.04)",
            borderRadius: "14px",
            color: "text.primary",
            border: "1px solid rgba(255,255,255,0.08)",
            "&:hover": {
                border: "1px solid rgba(255,215,64,0.35)"
            },
            "&.Mui-focused": {
                border: "1px solid rgba(255,215,64,0.7)"
            },
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
        "& .MuiInputLabel-root": {
            color: "text.secondary"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#ffd740"
        },
        "& input": {
            color: "text.primary"
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");

        if (!form.nombre || !form.email || !form.password) {
            setError("Completa todos los campos");
            return;
        }

        setLoading(true);

        try {
            await api.post("/admin/usuarios/admin", form);

            setMensaje("Administrador creado correctamente");

            setForm({
                nombre: "",
                email: "",
                password: ""
            });
        } catch (err) {
            console.error(err);
            setError("No se pudo crear el administrador");
        } finally {
            setLoading(false);
        }
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
                        Administración
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.primary",
                            fontWeight: 800,
                            fontSize: "32px",
                        }}
                    >
                        Crear Administrador
                    </Typography>

                    <Typography sx={{ color: "text.secondary", mt: 0.8 }}>
                        Registra una nueva cuenta con permisos administrativos.
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
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                                textAlign: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: "36px",
                                    background: "linear-gradient(135deg, #ffd740, #ffb300)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#000",
                                    boxShadow: "0 10px 35px rgba(255,215,64,0.22)",
                                }}
                            >
                                <AdminPanelSettingsIcon sx={{ fontSize: 80 }} />
                            </Box>

                            <Typography
                                sx={{
                                    color: "text.primary",
                                    fontWeight: 800,
                                    fontSize: "22px",
                                }}
                            >
                                Nuevo Admin
                            </Typography>

                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: "14px",
                                    maxWidth: 220,
                                }}
                            >
                                Este usuario podrá gestionar categorías, usuarios y reportes.
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: "grid",
                                gap: 2,
                            }}
                        >
                            {mensaje && (
                                <Alert severity="success">
                                    {mensaje}
                                </Alert>
                            )}

                            {error && (
                                <Alert severity="error">
                                    {error}
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                label="Nombre completo"
                                value={form.nombre}
                                onChange={(e) =>
                                    setForm({ ...form, nombre: e.target.value })
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: "text.secondary" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={fieldSx}
                            />

                            <TextField
                                fullWidth
                                label="Correo electrónico"
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: "text.secondary" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={fieldSx}
                            />

                            <TextField
                                fullWidth
                                label="Contraseña"
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={{ color: "text.secondary" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={fieldSx}
                            />

                            <Button
                                type="submit"
                                disabled={loading}
                                startIcon={<AddModeratorIcon />}
                                sx={{
                                    mt: 1,
                                    py: 1.5,
                                    borderRadius: "14px",
                                    background: "linear-gradient(135deg, #ffd740, #ffb300)",
                                    color: "#000",
                                    fontWeight: 800,
                                    fontSize: "15px",
                                    boxShadow: "0 6px 24px rgba(255,215,64,0.22)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #ffe066, #ffc107)",
                                    },
                                    "&:disabled": {
                                        opacity: 0.6,
                                        color: "#000",
                                    },
                                }}
                            >
                                {loading ? "Creando administrador..." : "Crear administrador"}
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Layout>
    );
}