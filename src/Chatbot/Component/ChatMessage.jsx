import React from "react";
import { Box, Typography } from "@mui/joy";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import ReactMarkdown from "react-markdown";
import TypingComponent from "./TypingComponent";

const ChatMessage = ({ msg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        p: 1.5,
        borderRadius: "12px",
        bgcolor: msg.sender === "user" ? "#282A2C" : "transparent",
      }}
    >
      <Box>
        {msg.sender === "user" ? (
          <PersonIcon sx={{ color: "#A8C7FA" }} />
        ) : (
          <SmartToyIcon
            sx={{
              background:
                "linear-gradient(135deg, #4285f4, #d96570)",
              borderRadius: "50%",
              color: "#fff",
              p: "4px",
            }}
          />
        )}
      </Box>

      <Box>
        <Typography
          level="body-sm"
          sx={{
            fontWeight: "lg",
            ...(msg.sender === "bot"
              ? {
                  background:
                    "linear-gradient(90deg, #4285f4, #9b72cb, #d96570)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }
              : { color: "#A8C7FA" }),
          }}
        >
          {msg.sender === "user" ? "You" : "FLEXIBOT"}
        </Typography>

        <Box sx={{ color: "#E3E3E3" }}>
          {msg.loading ? (
            <TypingComponent msg={msg} />
          ) : (
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;