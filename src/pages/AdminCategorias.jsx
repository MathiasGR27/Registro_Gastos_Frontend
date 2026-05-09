import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import { Box, TextField, Button, Typography, Card } from "@mui/material";

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");

    const load = async () => {
        const res = await api.get("/categorias");
        setCategorias(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/categorias", { nombre });
        setNombre("");
        load();
    };

    return (
        <Layout>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Categorías
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                    label="Nueva categoría"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

                <Button type="submit" variant="contained">
                    Crear
                </Button>
            </Box>

            {categorias.map(cat => (
                <Card key={cat.id} sx={{ p: 2, mb: 1 }}>
                    {cat.nombre}
                </Card>
            ))}
        </Layout>
    );
}