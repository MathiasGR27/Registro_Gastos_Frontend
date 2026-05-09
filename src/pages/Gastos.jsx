import { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import { Box, Typography, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Layout from "../components/Layout";
import GastoForm from "../components/GastoForm";
import GastoList from "../components/GastoList";

export default function Gastos() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [gastoEditando, setGastoEditando] = useState(null);

    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const subtle = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)";
    const title = isDark ? "rgba(255,255,255,0.92)" : "#0d0d1a";
    const sectionLbl = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)";
    const countColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)";
    const skeletonBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)";

    const load = useCallback(async () => {
        setLoading(true);

        try {
            const res = await api.get("/gastos/mis-gastos");
            setData(res.data);
        } catch (err) {
            console.error("Error cargando gastos:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        load();
    }, [load]);

    const handleEdit = (gasto) => {
        setGastoEditando(gasto);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setGastoEditando(null);
    };

    const handleDelete = async (id) => {
        const confirmar = confirm("¿Seguro que deseas eliminar este gasto?");

        if (!confirmar) return;

        try {
            await api.delete(`/gastos/${id}`);
            await load();
        } catch (err) {
            console.error("Error eliminando gasto:", err);
        }
    };

    const gastos = data?.gastos || [];
    const total = gastos.reduce((acc, g) => acc + Number(g.monto), 0);

    return (
        <Layout>
            <Box sx={{ mb: 5 }}>
                <Typography
                    sx={{
                        color: subtle,
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontFamily: "'DM Sans', sans-serif",
                        mb: 0.5,
                    }}
                >
                    Registro
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            color: title,
                            fontWeight: 700,
                            fontSize: "28px",
                            letterSpacing: "-0.02em",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Mis Gastos
                    </Typography>

                    {!loading && gastos.length > 0 && (
                        <Box
                            sx={{
                                px: 2.5,
                                py: 1,
                                borderRadius: "12px",
                                background: "rgba(255,109,109,0.08)",
                                border: "1px solid rgba(255,109,109,0.2)",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#ff6d6d",
                                    fontWeight: 700,
                                    fontSize: "18px",
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                -${total.toLocaleString()}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "rgba(255,109,109,0.5)",
                                    fontSize: "10px",
                                    textAlign: "right",
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                total
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            <GastoForm
                reload={load}
                gastoEditando={gastoEditando}
                cancelarEdicion={handleCancelEdit}
            />

            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography
                        sx={{
                            color: sectionLbl,
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Historial
                    </Typography>

                    {!loading && (
                        <Typography
                            sx={{
                                color: countColor,
                                fontSize: "12px",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            {gastos.length} {gastos.length === 1 ? "registro" : "registros"}
                        </Typography>
                    )}
                </Box>

                {loading ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton
                                key={i}
                                variant="rounded"
                                height={68}
                                sx={{
                                    borderRadius: "14px",
                                    bgcolor: skeletonBg,
                                }}
                            />
                        ))}
                    </Box>
                ) : (
                    <GastoList
                        gastos={gastos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </Box>
        </Layout>
    );
}