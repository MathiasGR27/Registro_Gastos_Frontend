import { useState, useEffect } from "react";
import api from "../api/api";
import { TextField, Button, Box, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

export default function GastoForm({ reload }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const fieldSx = {
        "& .MuiInputBase-root": {
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            borderRadius: "12px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#0d0d1a",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
            "&:hover": { border: "1px solid rgba(0,230,118,0.25)" },
            "&.Mui-focused": { border: "1px solid rgba(0,230,118,0.5)" },
            transition: "border 0.2s",
        },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "& .MuiInputLabel-root": {
            color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)",
            fontSize: "13px",
            fontFamily: "'DM Sans', sans-serif",
        },
        "& .MuiInputLabel-root.Mui-focused": { color: "#00e676" },
        "& .MuiSelect-icon": { color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" },
    };

    const menuPaperSx = {
        PaperProps: {
            sx: {
                background: isDark ? "#12121f" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
                borderRadius: "12px",
                "& .MuiMenuItem-root": {
                    color: isDark ? "rgba(255,255,255,0.7)" : "#0d0d1a",
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    "&:hover": { background: "rgba(0,230,118,0.08)", color: "#00c853" },
                },
            },
        },
    };
    const [form, setForm] = useState({
    categoria_id: "",
    monto: "",
    descripcion: ""
    });
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/categorias").then((res) => setCategorias(res.data));
    }, []);

    const handleSubmit = async () => {
        if (!form.categoria_id || !form.monto) return;
        setLoading(true);
        await api.post("/gastos", form);
        setForm({ ...form, categoria_id: "", monto: "", descripcion: "" });
        setLoading(false);
        reload();
    };

    return (
        <Box
            sx={{
                p: 3,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                mb: 4,
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    borderRadius: "20px 20px 0 0",
                    background: "linear-gradient(90deg, transparent, rgba(0,230,118,0.5), transparent)",
                },
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.08)",
            }}
        >
            <Typography
                sx={{
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    mb: 2.5,
                    fontFamily: "'DM Sans', sans-serif",
                }}
            >
                Nuevo gasto
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "flex-end" }}>
                <TextField
                    select
                    size="small"
                    label="Categoría"
                    value={form.categoria_id}
                    onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
                    sx={{ ...fieldSx, minWidth: 160 }}
                    SelectProps={{ MenuProps: menuPaperSx }}
                >
                    {categorias.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                            {c.nombre}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Monto"
                    size="small"
                    type="number"
                    value={form.monto}
                    onChange={(e) => setForm({ ...form, monto: e.target.value })}
                    sx={{ ...fieldSx, minWidth: 130 }}
                />

                <TextField
                    label="Descripción"
                    size="small"
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    sx={{ ...fieldSx, minWidth: 200, flexGrow: 1 }}
                />

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #00e676, #00bfa5)",
                        color: "#000",
                        fontWeight: 700,
                        fontSize: "13px",
                        px: 3,
                        py: 1,
                        height: "40px",
                        boxShadow: "0 4px 20px rgba(0,230,118,0.25)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #00ff85, #00d4b1)",
                            boxShadow: "0 6px 25px rgba(0,230,118,0.4)",
                        },
                        fontFamily: "'DM Sans', sans-serif",
                        whiteSpace: "nowrap",
                    }}
                >
                    {loading ? "Guardando..." : "Guardar"}
                </Button>
            </Box>
        </Box>
    );
}