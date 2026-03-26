import React from "react";
import { Box } from "@mui/joy";
import "../ChatbotStyle/Style.css";

const TypingComponent = ({ msg }) => {
    if (!msg?.loading) return null; //  IMPORTANT

    return (
        <Box sx={{ display: "flex", gap: "4px", mt: 1 }}>
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
        </Box>
    );
};

export default TypingComponent;