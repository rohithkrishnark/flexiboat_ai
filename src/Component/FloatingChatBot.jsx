import React from "react";
import { Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const FloatingChatBot = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: "75px",
        right: "25px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "linear-gradient(135deg,#6c3df4,#9d4edd)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        zIndex: 9999,

        // 🔥 bounce animation
        animation: "bounce 2s infinite",
        "@keyframes bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },

        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <ChatIcon sx={{ color: "white", fontSize: 30 }} />
    </Box>
  );
};

export default FloatingChatBot;