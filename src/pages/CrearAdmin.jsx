import { useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function CrearAdmin() {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/admin/usuarios/admin", form);
        alert("Admin creado correctamente");

        setForm({
            nombre: "",
            email: "",
            password: ""
        });
    };

    return (
        <Layout>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Crear nuevo administrador
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2, maxWidth: 400 }}>
                <TextField
                    label="Nombre"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                />

                <TextField
                    label="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <TextField
                    label="Contraseña"
                    type="password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <Button type="submit" variant="contained">
                    Crear admin
                </Button>
            </Box>
        </Layout>
    );
}