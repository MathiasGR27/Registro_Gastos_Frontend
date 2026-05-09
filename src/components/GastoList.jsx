import { Box, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const CATEGORY_COLORS = {
    default: { bg: "rgba(0,230,118,0.08)", color: "#00e676" },
    comida: { bg: "rgba(255,183,77,0.1)", color: "#ffb74d" },
    transporte: { bg: "rgba(64,196,255,0.1)", color: "#40c4ff" },
    salud: { bg: "rgba(255,109,109,0.1)", color: "#ff6d6d" },
    entretenimiento: { bg: "rgba(171,71,188,0.1)", color: "#ab47bc" },
};

function getCategoryStyle(name) {
    const key = name?.toLowerCase();
    return CATEGORY_COLORS[key] || CATEGORY_COLORS.default;
}

export default function GastoList({ gastos }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    if (!gastos || gastos.length === 0) {
        return (
            <Box
                sx={{
                    py: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                    borderRadius: "16px",
                    border: isDark ? "1px dashed rgba(255,255,255,0.08)" : "1px dashed rgba(0,0,0,0.1)",
                }}
            >
                <Typography sx={{ fontSize: "36px" }}>🧾</Typography>
                <Typography sx={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
                    No hay gastos registrados
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {gastos.map((g) => {
                const style = getCategoryStyle(g.categoria);
                return (
                    <Box
                        key={g.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2.5,
                            py: 2,
                            borderRadius: "14px",
                            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                background: isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.04)",
                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.12)",
                                transform: "translateY(-1px)",
                            },
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "12px",
                                    background: style.bg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <TrendingDownIcon sx={{ color: style.color, fontSize: 18 }} />
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        color: isDark ? "rgba(255,255,255,0.85)" : "#0d0d1a",
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                >
                                    {g.descripcion || "Sin descripción"}
                                </Typography>

                                {g.categoria && (
                                    <Chip
                                        label={g.categoria}
                                        size="small"
                                        sx={{
                                            mt: 0.4,
                                            height: "20px",
                                            background: style.bg,
                                            color: style.color,
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            letterSpacing: "0.04em",
                                            border: `1px solid ${style.color}30`,
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>

                        <Typography
                            sx={{
                                color: "#ff6d6d",
                                fontWeight: 700,
                                fontSize: "16px",
                                fontFamily: "'DM Sans', sans-serif",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            -${Number(g.monto).toLocaleString()}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
}