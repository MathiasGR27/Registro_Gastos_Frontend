import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import {Box,TextField,Button,Typography,Card,Chip} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [editando, setEditando] = useState(null);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        const res = await api.get("/categorias");
        setCategorias(res.data);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        load();
    }, []);

    const limpiar = () => {
        setNombre("");
        setEditando(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            alert("Escribe el nombre de la categoría");
            return;
        }

        setLoading(true);

        try {
            if (editando) {
                await api.put(`/categorias/${editando.id}`, { nombre });
            } else {
                await api.post("/categorias", { nombre });
            }

            limpiar();
            await load();
        } catch (err) {
            console.error(err);
            alert("Error al guardar la categoría");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (categoria) => {
        setEditando(categoria);
        setNombre(categoria.nombre);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const confirmar = confirm("¿Seguro que deseas eliminar esta categoría?");
        if (!confirmar) return;

        try {
            await api.delete(`/categorias/${id}`);
            await load();
        } catch (err) {
            console.error(err);
            alert("No se puede eliminar esta categoría porque puede estar asociada a gastos.");
        }
    };

    return (
        <Layout>
            <Box sx={{ mb: 4 }}>
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
                        fontWeight: 700,
                        fontSize: "28px",
                    }}
                >
                    Gestión de Categorías
                </Typography>

                <Typography sx={{ color: "text.secondary", mt: 0.8 }}>
                    Crea, edita o elimina categorías disponibles para registrar gastos.
                </Typography>
            </Box>

            <Card
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: "22px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        mb: 2,
                    }}
                >
                    {editando ? "Editar categoría" : "Nueva categoría"}
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        label="Nombre de categoría"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        size="small"
                        sx={{ minWidth: 280 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={editando ? <SaveIcon /> : <AddIcon />}
                        sx={{
                            borderRadius: "12px",
                            background: editando
                                ? "linear-gradient(135deg, #ffd740, #ffb300)"
                                : "linear-gradient(135deg, #00e676, #00bfa5)",
                            color: "#000",
                            fontWeight: 700,
                            height: "40px",
                        }}
                    >
                        {loading ? "Guardando..." : editando ? "Actualizar" : "Crear"}
                    </Button>

                    {editando && (
                        <Button
                            variant="outlined"
                            onClick={limpiar}
                            startIcon={<CloseIcon />}
                            sx={{
                                borderRadius: "12px",
                                color: "text.secondary",
                                height: "40px",
                            }}
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>
            </Card>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    },
                    gap: 2,
                }}
            >
                {categorias.map((cat) => (
                    <Card
                        key={cat.id}
                        sx={{
                            p: 2.5,
                            borderRadius: "20px",
                            background: "rgba(255,255,255,0.035)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                border: "1px solid rgba(0,230,118,0.25)",
                            },
                        }}
                    >
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Box
                                sx={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "14px",
                                    background: "rgba(0,230,118,0.09)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#00e676",
                                }}
                            >
                                <CategoryIcon />
                            </Box>

                            <Chip
                                label={`ID ${cat.id}`}
                                size="small"
                                sx={{
                                    background: "rgba(255,255,255,0.06)",
                                    color: "text.secondary",
                                    fontSize: "11px",
                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                color: "text.primary",
                                fontWeight: 700,
                                fontSize: "18px",
                                mb: 0.5,
                            }}
                        >
                            {cat.nombre}
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontSize: "13px",
                                mb: 2.5,
                            }}
                        >
                            Categoría disponible para gastos
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                fullWidth
                                onClick={() => handleEdit(cat)}
                                startIcon={<EditIcon />}
                                sx={{
                                    borderRadius: "12px",
                                    color: "#ffd740",
                                    background: "rgba(255,215,64,0.08)",
                                    fontWeight: 700,
                                    "&:hover": {
                                        background: "rgba(255,215,64,0.16)",
                                    },
                                }}
                            >
                                Editar
                            </Button>

                            <Button
                                fullWidth
                                onClick={() => handleDelete(cat.id)}
                                startIcon={<DeleteIcon />}
                                sx={{
                                    borderRadius: "12px",
                                    color: "#ff6d6d",
                                    background: "rgba(255,109,109,0.08)",
                                    fontWeight: 700,
                                    "&:hover": {
                                        background: "rgba(255,109,109,0.16)",
                                    },
                                }}
                            >
                                Eliminar
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>

            {categorias.length === 0 && (
                <Box
                    sx={{
                        py: 6,
                        mt: 2,
                        borderRadius: "20px",
                        border: "1px dashed rgba(255,255,255,0.1)",
                        textAlign: "center",
                    }}
                >
                    <Typography sx={{ fontSize: "36px" }}>🏷️</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        No hay categorías registradas
                    </Typography>
                </Box>
            )}
        </Layout>
    );
}