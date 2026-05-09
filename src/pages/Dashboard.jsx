import { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import { Grid, Box, Typography, Skeleton } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PresupuestoCard from "../components/PresupuestoCard";
import Layout from "../components/Layout";
import DateFilter from "../components/DateFilter";
import Charts from "../components/Charts";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";

function StatCard({ icon, label, value, accent, sub }) {
    return (
        <Box
            sx={{
                p: 3,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                position: "relative",
                overflow: "hidden",
                transition: "border 0.2s, transform 0.2s",
                "&:hover": {
                    border: `1px solid ${accent}30`,
                    transform: "translateY(-2px)",
                },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${accent}14 0%, transparent 70%)`,
                    pointerEvents: "none",
                }}
            />

            <Box sx={{ mb: 2 }}>
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "12px",
                        background: `${accent}14`,
                        border: `1px solid ${accent}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: accent,
                    }}
                >
                    {icon}
                </Box>
            </Box>

            <Typography
                sx={{
                    color: "text.secondary",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    mb: 0.5,
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    color: "text.primary",
                    fontWeight: 700,
                    fontSize: "28px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                }}
            >
                {value}
            </Typography>

            {sub && (
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: "12px",
                        mt: 0.5,
                    }}
                >
                    {sub}
                </Typography>
            )}
        </Box>
    );
}

const exportarPDF = async () => {
    try {
        const res = await api.get("/gastos/export/pdf", {
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "reporte-gastos.pdf");

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Error exportando PDF:", error);
        alert("No se pudo exportar el PDF");
    }
};

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async (inicio, fin) => {
        setLoading(true);

        try {
            let url = "/gastos/mis-gastos";

            if (inicio && fin) {
                url += `?inicio=${inicio}&fin=${fin}`;
            }

            const res = await api.get(url);
            setData(res.data);
        } catch (err) {
            console.error("Error cargando dashboard:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        load();
    }, [load]);

    const hayDatos = data?.gastos?.length > 0;

    const total =
        data?.plugins?.find((p) => p.plugin === "totales")?.result?.total || 0;

    const graficos =
        data?.plugins?.find((p) => p.plugin === "graficos")?.result || {
            pieChart: [],
            lineChart: [],
        };

    const promedio = hayDatos ? (total / data.gastos.length).toFixed(2) : 0;

    const alertaPresupuesto =
    data?.plugins?.find((p) => p.plugin === "presupuesto")?.result || null;

    return (
        <Layout>
            <Box sx={{ mb: 5 }}>
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                    }}
                >
                    Panel principal
                </Typography>

                <Typography
                    sx={{
                        color: "text.primary",
                        fontWeight: 700,
                        fontSize: "28px",
                    }}
                >
                    Dashboard Financiero
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>

    <Button
        startIcon={<DownloadIcon />}
    onClick={exportarPDF}
     sx={{
            borderRadius: "14px",
            background:
                "linear-gradient(135deg,#00e676,#00bfa5)",
            color: "#000",
            fontWeight: 700,
            px: 3,
            py: 1.2,
            boxShadow:
                "0 4px 20px rgba(0,230,118,0.25)",

            "&:hover": {
                background:
                    "linear-gradient(135deg,#00ff88,#00d4b1)",
            }
        }}
        variant="contained"
    >
        Exportar PDF
    </Button>

</Box>

            <DateFilter onFilter={load} />

            <PresupuestoCard
                alerta={alertaPresupuesto}
                reload={load}
            />

            {loading && (
                <Grid container spacing={3}>
                    {[1, 2, 3].map((i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Skeleton
                                variant="rounded"
                                height={140}
                                sx={{
                                    borderRadius: "20px",
                                    bgcolor: "rgba(255,255,255,0.05)",
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {!loading && !hayDatos && data && (
                <Box
                    sx={{
                        py: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1.5,
                        borderRadius: "20px",
                        border: "1px dashed rgba(255,255,255,0.08)",
                    }}
                >
                    <Typography sx={{ fontSize: "40px" }}>🔍</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Sin datos en este período
                    </Typography>
                </Box>
            )}

            {!loading && hayDatos && (
                <>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={4}>
                            <StatCard
                                icon={<TrendingDownIcon fontSize="small" />}
                                label="Total gastado"
                                value={`$${Number(total).toLocaleString()}`}
                                accent="#00e676"
                                sub="en el período seleccionado"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <StatCard
                                icon={<ReceiptLongIcon fontSize="small" />}
                                label="N° de gastos"
                                value={data.gastos.length}
                                accent="#40c4ff"
                                sub="transacciones registradas"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <StatCard
                                icon={<ShowChartIcon fontSize="small" />}
                                label="Promedio"
                                value={`$${Number(promedio).toLocaleString()}`}
                                accent="#ffd740"
                                sub="por transacción"
                            />
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: "20px",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                mb: 0.5,
                            }}
                        >
                            Análisis
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.primary",
                                fontWeight: 600,
                                fontSize: "16px",
                                mb: 1,
                            }}
                        >
                            Distribución de gastos
                        </Typography>

                        {graficos?.pieChart?.length > 0 ? (
                            <Charts data={graficos} />
                        ) : (
                            <Box
                                sx={{
                                    py: 6,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    color: "text.secondary",
                                }}
                            >
                                <Typography sx={{ fontSize: "40px" }}>📊</Typography>
                                <Typography>No hay datos para graficar</Typography>
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Layout>
    );
}