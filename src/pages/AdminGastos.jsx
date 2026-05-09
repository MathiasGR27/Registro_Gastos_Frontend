import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import { Box, Typography, Card } from "@mui/material";

export default function AdminGastos() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        api.get("/admin/gastos")
            .then(res => setRows(res.data))
            .catch(err => console.error(err));
    }, []);

    const agrupados = rows.reduce((acc, item) => {
        if (!acc[item.usuario_id]) {
            acc[item.usuario_id] = {
                usuario: item.usuario,
                email: item.email,
                gastos: []
            };
        }

        if (item.gasto_id) {
            acc[item.usuario_id].gastos.push(item);
        }

        return acc;
    }, {});

    return (
        <Layout>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Gastos por usuario
            </Typography>

            {Object.values(agrupados).map(user => (
                <Card key={user.email} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                    <Typography variant="h6">{user.usuario}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                        {user.email}
                    </Typography>

                    {user.gastos.length === 0 ? (
                        <Typography color="text.secondary">
                            Este usuario no tiene gastos.
                        </Typography>
                    ) : (
                        user.gastos.map(g => (
                            <Box key={g.gasto_id} sx={{ mb: 1 }}>
                                <Typography>
                                    {g.descripcion} - ${g.monto}
                                </Typography>
                                <Typography color="text.secondary">
                                    {g.categoria}
                                </Typography>
                            </Box>
                        ))
                    )}
                </Card>
            ))}
        </Layout>
    );
}