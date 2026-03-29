import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ collapsed, setCollapsed, onNewChat, chats }) => {

    const truncate = (text, max = 55) => {
        if (!text) return "";
        return text.length > max ? text.slice(0, max) + "..." : text;
    };

    return (
        <Box
            sx={{
                width: collapsed ? 70 : 260,
                bgcolor: "#202123",
                color: "#fff",
                p: 2,
                transition: "0.3s",
                display: "flex",
                flexDirection: "column",

                overflowY: "auto",

                // 🔥 HIDE SCROLLBAR
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >

            {/* 🔥 TOGGLE BUTTON (RESTORED) */}
            <IconButton
                onClick={() => setCollapsed(!collapsed)}
                sx={{
                    mb: 2,
                    color: "#fff",
                    alignSelf: collapsed ? "center" : "flex-start"
                }}
            >
                <MenuIcon />
            </IconButton>

            {/* NEW CHAT BUTTON */}
            {!collapsed && (
                <Button
                    onClick={onNewChat}
                    sx={{
                        mb: 2,
                        bgcolor: "#2f2f2f",
                        "&:hover": { bgcolor: "#3f3f3f" }
                    }}
                >
                    ➕ New Chat
                </Button>
            )}

            {/* CHAT LIST */}
            {!collapsed && (
                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {chats?.map((chat) => (
                        <Box
                            key={chat.id}
                            sx={{
                                p: 1.2,
                                mb: 1,
                                borderRadius: 2,
                                cursor: "pointer",
                                "&:hover": { bgcolor: "#2a2b32" }
                            }}
                        >
                             <Typography
                                    level="h2"
                                    sx={{
                                      background: "linear-gradient(90deg, #4285f4, #d96570)",
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      fontSize:12
                                    }}
                                  >
                                   {truncate(chat.query)}
                                  </Typography>
                            <Typography fontSize={13} fontWeight={600}>
                                
                            </Typography>

                            <Typography fontSize={11} color="gray">
                                {truncate(chat.response)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Sidebar;