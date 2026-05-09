import { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
    const [mode, setMode] = useState(
        localStorage.getItem("theme") || "dark"
    );

    const toggleTheme = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("theme", newMode);
    };

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
                ...(mode === "dark"
                    ? {
                        background: {
                            default: "#080810",
                            paper: "#0f0f1a",
                        },
                        text: {
                            primary: "rgba(255,255,255,0.92)",
                            secondary: "rgba(255,255,255,0.55)",
                        },
                    }
                    : {
                        background: {
                            default: "#f0f2f8",
                            paper: "#ffffff",
                        },
                        text: {
                            primary: "#0d0d1a",
                            secondary: "#555577",
                        },
                    }),
            },

            typography: {
                fontFamily: "'DM Sans', sans-serif",
            },

            components: {
                MuiTypography: {
                    styleOverrides: {
                        root: ({ theme }) => ({
                            color: theme.palette.text.primary,
                        }),
                    },
                },
            },
        }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};