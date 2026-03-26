import React from "react";
import { Box } from "@mui/joy";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";

const ChatWindow = ({ messages, chatRef }) => {
  return (
    <Box
      ref={chatRef}
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {messages.length === 0 && <EmptyState />}

      {messages.map((msg, i) => (
        <ChatMessage key={i} msg={msg} />
      ))}
    </Box>
  );
};

export default ChatWindow;