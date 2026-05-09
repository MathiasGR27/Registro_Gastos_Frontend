import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import {
    Box,
    Typography,
    Card,
    Skeleton
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const COLORS = ["#00e676", "#40c4ff", "#ffd740", "#ff6d6d", "#ab47bc"];

function StatCard({ icon, label, value, accent }) {
    return (
        <Card
            sx={{
                p: 3,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "14px",
                    background: `${accent}18`,
                    color: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                }}
            >
                {icon}
            </Box>

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
                {label}
            </Typography>

            <Typography
                sx={{
                    color: "text.primary",
                    fontWeight: 800,
                    fontSize: "28px",
                }}
            >
                {value}
            </Typography>
        </Card>
    );
}

export default function AdminResumen() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);

        try {
            const res = await api.get("/admin/gastos");
            setRows(res.data);
        } catch (err) {
            console.error("Error cargando resumen admin:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        load();
    }, []);

    const usuariosMap = rows.reduce((acc, row) => {
        if (!acc[row.usuario_id]) {
            acc[row.usuario_id] = {
                usuario_id: row.usuario_id,
                usuario: row.usuario,
                email: row.email,
                total: 0,
                cantidad: 0,
                gastos: []
            };
        }

        if (row.gasto_id) {
            const monto = Number(row.monto);
            acc[row.usuario_id].total += monto;
            acc[row.usuario_id].cantidad += 1;
            acc[row.usuario_id].gastos.push(row);
        }

        return acc;
    }, {});

    const usuarios = Object.values(usuariosMap);

    const totalGeneral = usuarios.reduce((acc, user) => acc + user.total, 0);
    const totalRegistros = usuarios.reduce((acc, user) => acc + user.cantidad, 0);

    const usuarioMayor = usuarios.reduce((max, user) => {
        if (!max || user.total > max.total) return user;
        return max;
    }, null);

    const chartData = usuarios.map((user) => ({
        usuario: user.usuario,
        total: user.total
    }));

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
                    Panel administrativo
                </Typography>

                <Typography
                    sx={{
                        color: "text.primary",
                        fontWeight: 800,
                        fontSize: "30px",
                    }}
                >
                    Resumen general
                </Typography>

                <Typography sx={{ color: "text.secondary", mt: 0.8 }}>
                    Visualiza los gastos registrados por todos los usuarios.
                </Typography>
            </Box>

            {loading ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(4, 1fr)",
                        },
                        gap: 2,
                    }}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton
                            key={i}
                            variant="rounded"
                            height={140}
                            sx={{ borderRadius: "20px" }}
                        />
                    ))}
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                                lg: "repeat(4, 1fr)",
                            },
                            gap: 2,
                            mb: 4,
                        }}
                    >
                        <StatCard
                            icon={<PaidIcon />}
                            label="Total general"
                            value={`$${totalGeneral.toLocaleString()}`}
                            accent="#00e676"
                        />

                        <StatCard
                            icon={<GroupsIcon />}
                            label="Usuarios"
                            value={usuarios.length}
                            accent="#40c4ff"
                        />

                        <StatCard
                            icon={<ReceiptLongIcon />}
                            label="Registros"
                            value={totalRegistros}
                            accent="#ffd740"
                        />

                        <StatCard
                            icon={<EmojiEventsIcon />}
                            label="Mayor gastador"
                            value={usuarioMayor ? usuarioMayor.usuario : "N/A"}
                            accent="#ff6d6d"
                        />
                    </Box>

                    <Card
                        sx={{
                            p: 3,
                            mb: 4,
                            borderRadius: "22px",
                            background: "rgba(255,255,255,0.035)",
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
                                mb: 1,
                            }}
                        >
                            Comparativa
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.primary",
                                fontWeight: 700,
                                fontSize: "18px",
                                mb: 3,
                            }}
                        >
                            Total gastado por usuario
                        </Typography>

                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="usuario" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" radius={[10, 10, 0, 0]}>
                                        {chartData.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <Typography sx={{ color: "text.secondary" }}>
                                No hay datos para graficar.
                            </Typography>
                        )}
                    </Card>

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
                        Usuarios registrados
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(2, 1fr)",
                                xl: "repeat(3, 1fr)",
                            },
                            gap: 2,
                        }}
                    >
                        {usuarios.map((user) => (
                            <Card
                                key={user.usuario_id}
                                sx={{
                                    p: 2.5,
                                    borderRadius: "20px",
                                    background: "rgba(255,255,255,0.035)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "text.primary",
                                        fontWeight: 700,
                                        fontSize: "18px",
                                    }}
                                >
                                    {user.usuario}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "13px",
                                        mb: 2,
                                    }}
                                >
                                    {user.email}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        mb: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: "11px",
                                            }}
                                        >
                                            Total
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#00e676",
                                                fontWeight: 800,
                                                fontSize: "20px",
                                            }}
                                        >
                                            ${user.total.toLocaleString()}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: "11px",
                                                textAlign: "right",
                                            }}
                                        >
                                            Gastos
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "text.primary",
                                                fontWeight: 800,
                                                fontSize: "20px",
                                                textAlign: "right",
                                            }}
                                        >
                                            {user.cantidad}
                                        </Typography>
                                    </Box>
                                </Box>

                                {user.gastos.length === 0 ? (
                                    <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>
                                        Este usuario no tiene gastos registrados.
                                    </Typography>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                        }}
                                    >
                                        {user.gastos.slice(0, 3).map((g) => (
                                            <Box
                                                key={g.gasto_id}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    borderTop: "1px solid rgba(255,255,255,0.06)",
                                                    pt: 1,
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            color: "text.primary",
                                                            fontSize: "13px",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {g.descripcion || "Sin descripción"}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontSize: "11px",
                                                        }}
                                                    >
                                                        {g.categoria}
                                                    </Typography>
                                                </Box>

                                                <Typography
                                                    sx={{
                                                        color: "#ff6d6d",
                                                        fontWeight: 700,
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    -${Number(g.monto).toLocaleString()}
                                                </Typography>
                                            </Box>
                                        ))}

                                        {user.gastos.length > 3 && (
                                            <Typography
                                                sx={{
                                                    color: "text.secondary",
                                                    fontSize: "12px",
                                                    mt: 1,
                                                }}
                                            >
                                                +{user.gastos.length - 3} gastos más
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            </Card>
                        ))}
                    </Box>
                </>
            )}
        </Layout>
    );
}