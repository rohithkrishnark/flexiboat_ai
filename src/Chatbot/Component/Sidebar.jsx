import React from "react";
import { Box, Typography, IconButton, Button, Sheet } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = ({ collapsed, setCollapsed }) => {
    return (
        <Sheet
            sx={{
                width: collapsed ? 70 : 260,
                bgcolor: "#1E1F20",
                p: 1,
                transition: "0.3s",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton onClick={() => setCollapsed(!collapsed)}>
                    <MenuIcon />
                </IconButton>

                {!collapsed && (
                    <Typography
                        level="title-md"
                        sx={{
                            ml: 1,
                            background:
                                "linear-gradient(135deg, #4285f4, #9b72cb, #d96570)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 600,
                        }}
                    >
                        FLEXIBOT
                    </Typography>
                )}
            </Box>

            <Button startDecorator={<AddIcon />} sx={{ mb: 2 }} fullWidth={!collapsed}>
                {!collapsed && "New Chat"}
            </Button>

            {!collapsed && (
                <>
                    <Typography level="body-xs" sx={{ mb: 1, color: "#C4C7C5" }}>
                        Recent
                    </Typography>

                    <Box sx={{ flex: 1 }}>
                        <Typography level="body-sm" sx={{ color: "#E3E3E3" }}>
                            Welcome to FLEXIBOT
                        </Typography>
                    </Box>
                </>
            )}
        </Sheet>
    );
};

export default Sidebar;