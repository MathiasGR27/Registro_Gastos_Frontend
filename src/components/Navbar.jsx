import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Navbar() {

    const { logout } = useContext(AuthContext);
    const { mode, toggleTheme } = useContext(ThemeContext);

    return (
        <AppBar position="static" sx={{ mb: 3 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Control de Gastos
                </Typography>

                <Button color="inherit" component={Link} to="/">
                    Dashboard
                </Button>

                <Button color="inherit" component={Link} to="/gastos">
                    Gastos
                </Button>

                <IconButton color="inherit" onClick={toggleTheme}>
                    {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>

                <Button color="inherit" onClick={logout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}