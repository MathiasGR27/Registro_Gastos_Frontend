import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

export default function DateFilter({ onFilter }) {
    const [inicio, setInicio] = useState(null);
    const [fin, setFin] = useState(null);

    const handleFilter = () => {
        onFilter(
            inicio ? inicio.format("YYYY-MM-DD") : undefined,
            fin ? fin.format("YYYY-MM-DD") : undefined
        );
    };

    const handleClear = () => {
        setInicio(null);
        setFin(null);
        onFilter();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                }}
            >
                {/* HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <CalendarTodayIcon sx={{ color: "#00e676", fontSize: 18 }} />
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: "12px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                        }}
                    >
                        Filtrar por período
                    </Typography>
                </Box>

                {/* INPUTS */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                    
                    <DatePicker
                        label="Desde"
                        value={inicio}
                        onChange={(newValue) => setInicio(newValue)}
                        slotProps={{
                            textField: {
                                size: "small",
                                sx: {
                                    minWidth: 170,
                                    "& .MuiInputBase-root": {
                                        background: "rgba(255,255,255,0.05)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "none",
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "text.secondary",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#00e676",
                                    },
                                },
                            },
                        }}
                    />

                    <DatePicker
                        label="Hasta"
                        value={fin}
                        onChange={(newValue) => setFin(newValue)}
                        slotProps={{
                            textField: {
                                size: "small",
                                sx: {
                                    minWidth: 170,
                                    "& .MuiInputBase-root": {
                                        background: "rgba(255,255,255,0.05)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "none",
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "text.secondary",
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#00e676",
                                    },
                                },
                            },
                        }}
                    />

                    {/* BOTÓN FILTRAR */}
                    <Button
                        variant="contained"
                        onClick={handleFilter}
                        startIcon={<FilterListIcon />}
                        sx={{
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #00e676, #00bfa5)",
                            color: "#000",
                            fontWeight: 700,
                            px: 3,
                            py: 1,
                            boxShadow: "0 4px 20px rgba(0,230,118,0.25)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #00ff85, #00d4b1)",
                            },
                        }}
                    >
                        Filtrar
                    </Button>

                    {/* BOTÓN LIMPIAR */}
                    {(inicio || fin) && (
                        <Button
                            variant="outlined"
                            onClick={handleClear}
                            startIcon={<CloseIcon />}
                            sx={{
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "text.secondary",
                                "&:hover": {
                                    background: "rgba(255,255,255,0.05)",
                                },
                            }}
                        >
                            Limpiar
                        </Button>
                    )}
                </Box>
            </Box>
        </LocalizationProvider>
    );
}