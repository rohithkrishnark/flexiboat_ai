import React from "react";
import { Button } from "@mui/joy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

const ConnectionButton = ({
    isOwner,
    isConnected,
    onFollow,
    onMessage,
}) => {
    if (isOwner) return null;

    return isConnected ? (
        <Button
            variant="outlined"
            color="success"
            startDecorator={<SendRoundedIcon />}
            onClick={onMessage}
            sx={{
                borderRadius: "999px",
                px: 2,
                fontWeight: 600,
                textTransform: "none",
                transition: "0.2s",
                "&:hover": {
                    backgroundColor: "success.softBg",
                    transform: "scale(1.05)",
                },
            }}
        >
            Message
        </Button>
    ) : (
        <Button
            variant="solid"
            startDecorator={<PersonAddAltRoundedIcon />}
            onClick={onFollow}
            sx={{
                borderRadius: "999px",
                px: 2,
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(135deg, #6366f1, #ec4899)",
                color: "white",
                boxShadow: "sm",
                transition: "0.2s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "md",
                },
            }}
        >
            Follow
        </Button>
    );
};

export default ConnectionButton;