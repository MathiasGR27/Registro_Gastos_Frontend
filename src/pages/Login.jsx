import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import {
    TextField,
    Button,
    Box,
    Typography,
    InputAdornment,
    IconButton
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Login() {
    const { login } = useContext(AuthContext);
    const { mode, toggleTheme } = useContext(ThemeContext);

    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);

    const fieldSx = {
        "& .MuiInputBase-root": {
            background: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.04)",
            borderRadius: "14px",
            color: "text.primary",
            border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.12)",
            "&:hover": {
                border: "1px solid rgba(0,230,118,0.35)"
            },
            "&.Mui-focused": {
                border: "1px solid rgba(0,230,118,0.7)"
            },
            transition: "border 0.2s",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
        "& .MuiInputLabel-root": {
            color: "text.secondary"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#00e676"
        },
        "& input": {
            color: "text.primary"
        }
    };

    const iconColor = isDark
        ? "rgba(255,255,255,0.35)"
        : "rgba(0,0,0,0.45)";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(form);
            navigate("/");
        } catch {
            setError("Email o contraseña incorrectos");
        }

        setLoading(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: isDark
                    ? "linear-gradient(135deg, #080810 0%, #0d0d1a 100%)"
                    : "linear-gradient(135deg, #f0f2f8 0%, #ffffff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "600px",
                    height: "600px",
                    background: isDark
                        ? "radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 65%)"
                        : "radial-gradient(circle, rgba(0,230,118,0.15) 0%, transparent 65%)",
                    pointerEvents: "none",
                },
            }}
        >
            <IconButton
                onClick={toggleTheme}
                sx={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    color: "text.primary",
                    background: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.06)",
                    zIndex: 10,
                    "&:hover": {
                        background: isDark
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                    }
                }}
            >
                {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    mx: "auto",
                    px: 3,
                    position: "relative",
                    zIndex: 1
                }}
            >
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "18px",
                            background: "linear-gradient(135deg, #00e676, #00bfa5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "26px",
                            mx: "auto",
                            mb: 2,
                            boxShadow: isDark
                                ? "0 8px 32px rgba(0,230,118,0.35)"
                                : "0 8px 32px rgba(0,230,118,0.22)",
                        }}
                    >
                        💎
                    </Box>

                    <Typography
                        sx={{
                            color: "text.primary",
                            fontWeight: 700,
                            fontSize: "24px",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        Bienvenido de vuelta
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: "14px",
                            mt: 0.5
                        }}
                    >
                        Ingresa tu cuenta para continuar
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: 4,
                        borderRadius: "24px",
                        background: isDark
                            ? "rgba(255,255,255,0.03)"
                            : "#ffffff",
                        border: isDark
                            ? "1px solid rgba(255,255,255,0.08)"
                            : "1px solid rgba(0,0,0,0.08)",
                        backdropFilter: "blur(20px)",
                        boxShadow: isDark
                            ? "none"
                            : "0 12px 40px rgba(0,0,0,0.08)",
                        position: "relative",
                    }}
                >
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon
                                        sx={{
                                            color: iconColor,
                                            fontSize: 18
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={fieldSx}
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        type={showPwd ? "text" : "password"}
                        margin="normal"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon
                                        sx={{
                                            color: iconColor,
                                            fontSize: 18
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPwd(!showPwd)}
                                        edge="end"
                                        sx={{ color: iconColor }}
                                    >
                                        {showPwd
                                            ? <VisibilityOffIcon fontSize="small" />
                                            : <VisibilityIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={fieldSx}
                    />

                    {error && (
                        <Box
                            sx={{
                                mt: 2,
                                px: 2,
                                py: 1.5,
                                borderRadius: "10px",
                                background: "rgba(255,80,80,0.08)",
                                border: "1px solid rgba(255,80,80,0.2)",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#ff6d6d",
                                    fontSize: "13px"
                                }}
                            >
                                ⚠️ {error}
                            </Typography>
                        </Box>
                    )}

                    <Button
                        fullWidth
                        type="submit"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: "14px",
                            background: "linear-gradient(135deg, #00e676, #00bfa5)",
                            color: "#000",
                            fontWeight: 700,
                            fontSize: "15px",
                            boxShadow: isDark
                                ? "0 6px 24px rgba(0,230,118,0.3)"
                                : "0 6px 24px rgba(0,230,118,0.18)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #00ff85, #00d4b1)",
                            },
                            "&:disabled": {
                                background: isDark
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(0,0,0,0.08)",
                                color: "text.secondary"
                            },
                        }}
                    >
                        {loading ? "Ingresando..." : "Ingresar"}
                    </Button>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        mt: 3,
                        color: "text.secondary",
                        fontSize: "13px"
                    }}
                >
                    ¿No tienes cuenta?{" "}
                    <Box
                        component={Link}
                        to="/register"
                        sx={{
                            color: "#00c853",
                            textDecoration: "none",
                            fontWeight: 600,
                            "&:hover": {
                                textDecoration: "underline"
                            },
                        }}
                    >
                        Crear cuenta
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
}