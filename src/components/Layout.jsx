import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                background: isDark
                    ? "linear-gradient(135deg, #080810 0%, #0d0d1a 50%, #080810 100%)"
                    : "linear-gradient(135deg, #f0f2f8 0%, #e8eaf6 50%, #f0f2f8 100%)",
            }}
        >
            <Sidebar />

            <Box
                sx={{
                    flexGrow: 1,
                    px: { xs: 2, md: 4 },
                    py: { xs: 3, md: 4 },
                    minHeight: "100vh",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}