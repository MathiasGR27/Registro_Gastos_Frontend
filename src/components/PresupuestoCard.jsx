import { useEffect, useState } from "react";
import api from "../api/api";
import {
    Box,
    Typography,
    TextField,
    Button,
    LinearProgress,
    Alert
} from "@mui/material";

export default function PresupuestoCard({ alerta, reload }) {
    const [limite, setLimite] = useState("");

    useEffect(() => {
        api.get("/presupuestos/actual")
            .then(res => {
                if (res.data) {
                    setLimite(res.data.limite_mensual);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const guardar = async () => {
        if (!limite || Number(limite) <= 0) {
            alert("Ingresa un límite válido");
            return;
        }

        await api.post("/presupuestos", {
            limite_mensual: Number(limite)
        });

        await reload();
    };

    const porcentaje = alerta?.porcentaje || 0;
    const valorBarra = porcentaje > 100 ? 100 : porcentaje;

    return (
        <Box
            sx={{
                p: 3,
                mb: 4,
                borderRadius: "20px",
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
                Presupuesto mensual
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <TextField
                    label="Límite mensual"
                    type="number"
                    size="small"
                    value={limite}
                    onChange={(e) => setLimite(e.target.value)}
                />

                <Button
                    variant="contained"
                    onClick={guardar}
                    sx={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #00e676, #00bfa5)",
                        color: "#000",
                        fontWeight: 700,
                    }}
                >
                    Guardar límite
                </Button>
            </Box>

            {alerta?.configurado && (
                <>
                    <Typography sx={{ color: "text.primary", mb: 1 }}>
                        Gastado: ${Number(alerta.total).toLocaleString()} / Límite: ${Number(alerta.limite).toLocaleString()}
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={valorBarra}
                        sx={{
                            height: 10,
                            borderRadius: 10,
                            mb: 2,
                        }}
                    />

                    <Alert severity={alerta.superado ? "error" : "success"}>
                        {alerta.mensaje} ({alerta.porcentaje}%)
                    </Alert>
                </>
            )}

            {!alerta?.configurado && (
                <Alert severity="info">
                    Configura tu presupuesto mensual para recibir alertas.
                </Alert>
            )}
        </Box>
    );
}