import { useState, useEffect } from "react";
import api from "../api/api";
import { TextField, Button, Box, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function GastoForm({ reload, gastoEditando, cancelarEdicion }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [form, setForm] = useState({
        categoria_id: "",
        monto: "",
        descripcion: "",
    });

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/categorias")
            .then((res) => setCategorias(res.data))
            .catch((err) => console.error("Error cargando categorías:", err));
    }, []);

    useEffect(() => {
        if (gastoEditando) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({
                categoria_id: gastoEditando.categoria_id || "",
                monto: gastoEditando.monto || "",
                descripcion: gastoEditando.descripcion || "",
            });
        } else {
            setForm({
                categoria_id: "",
                monto: "",
                descripcion: "",
            });
        }
    }, [gastoEditando]);

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
        "& .MuiSelect-icon": {
            color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
        },
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
                    "&:hover": {
                        background: "rgba(0,230,118,0.08)",
                        color: "#00c853",
                    },
                },
            },
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.categoria_id || !form.monto) {
            alert("Selecciona una categoría y escribe un monto");
            return;
        }

        setLoading(true);

        try {
            if (gastoEditando) {
                await api.put(`/gastos/${gastoEditando.id}`, form);
            } else {
                await api.post("/gastos", form);
            }

            setForm({
                categoria_id: "",
                monto: "",
                descripcion: "",
            });

            if (cancelarEdicion) cancelarEdicion();

            await reload();
        } catch (err) {
            console.error("Error guardando gasto:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 3,
                borderRadius: "20px",
                mb: 4,
                position: "relative",
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.08)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    borderRadius: "20px 20px 0 0",
                    background: gastoEditando
                        ? "linear-gradient(90deg, transparent, rgba(255,215,64,0.6), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(0,230,118,0.5), transparent)",
                },
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
                {gastoEditando ? "Editar gasto" : "Nuevo gasto"}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                }}
            >
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
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={gastoEditando ? <SaveIcon /> : <AddIcon />}
                    sx={{
                        borderRadius: "12px",
                        background: gastoEditando
                            ? "linear-gradient(135deg, #ffd740, #ffb300)"
                            : "linear-gradient(135deg, #00e676, #00bfa5)",
                        color: "#000",
                        fontWeight: 700,
                        fontSize: "13px",
                        px: 3,
                        py: 1,
                        height: "40px",
                        fontFamily: "'DM Sans', sans-serif",
                        whiteSpace: "nowrap",
                    }}
                >
                    {loading
                        ? "Guardando..."
                        : gastoEditando
                            ? "Actualizar"
                            : "Guardar"}
                </Button>

                {gastoEditando && (
                    <Button
                        variant="outlined"
                        onClick={cancelarEdicion}
                        startIcon={<CloseIcon />}
                        sx={{
                            borderRadius: "12px",
                            height: "40px",
                            color: "text.secondary",
                            border: isDark
                                ? "1px solid rgba(255,255,255,0.15)"
                                : "1px solid rgba(0,0,0,0.15)",
                        }}
                    >
                        Cancelar
                    </Button>
                )}
            </Box>
        </Box>
    );
}