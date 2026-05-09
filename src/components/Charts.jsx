import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#00e676", "#00bfa5", "#40c4ff", "#ffd740", "#ff6d6d"];

export default function Charts({ data }) {

    console.log("DATA EN CHARTS:", data);

    let chartData = [];

    if (Array.isArray(data)) {
        chartData = data.map(item => ({
            name: item.categoria || item.name,
            value: Number(item.total || item.value || 0)
        }));
    } else if (data?.pieChart) {
        chartData = data.pieChart.map(item => ({
            name: item.categoria || item.name,
            value: Number(item.total || item.value || 0)
        }));
    }

    if (!chartData.length) {
        return (
            <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography sx={{ fontSize: "36px" }}>📊</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                    Sin datos para visualizar
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 3 }}>

            <Box sx={{
                flex: 1,
                minWidth: 320,
                height: 340,
                p: 3,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)"
            }}>
                <Typography sx={{ mb: 2, color: "text.secondary", fontWeight: 700 }}>
                    Gastos por categoría
                </Typography>

                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>

            <Box sx={{
                flex: 1,
                minWidth: 320,
                height: 340,
                p: 3,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)"
            }}>
                <Typography sx={{ mb: 2, color: "text.secondary", fontWeight: 700 }}>
                    Distribución
                </Typography>

                <ResponsiveContainer width="100%" height="85%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            innerRadius={45}
                            label
                        >
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Box>

        </Box>
    );
}