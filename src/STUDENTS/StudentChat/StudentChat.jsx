import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  InputBase,
  IconButton,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";

// Dummy Users (Teacher + Alumni)
const users = [
  {
    id: 1,
    name: "Dr. John (Teacher)",
    lastMsg: "Submit your assignment",
    online: true,
  },
  {
    id: 2,
    name: "Anu (Alumni)",
    lastMsg: "I’ll guide you 👍",
    online: false,
  },
];

// Dummy Messages
const dummyMessages = {
  1: [
    { from: "them", text: "Submit your assignment today." },
    { from: "me", text: "Sure sir 👍" },
  ],
  2: [
    { from: "them", text: "I’ll guide you 👍" },
    { from: "me", text: "Thank you!" },
  ],
};

const StudentChat = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { from: "me", text: input };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
    }));

    setInput("");
  };

  return (
    <Box sx={{ display: "flex", height: "85vh", bgcolor: "#f4f6f8" }}>
      
      {/* 🔥 LEFT SIDEBAR */}
      <Box
        sx={{
          width: "30%",
          bgcolor: "#fff",
          borderRight: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2 }}>
          <Typography fontWeight={700}>Chats</Typography>

          {/* Search */}
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: "#f1f1f1",
              borderRadius: 2,
              px: 1,
            }}
          >
            <SearchIcon fontSize="small" />
            <InputBase placeholder="Search..." sx={{ ml: 1, fontSize: 13 }} />
          </Box>
        </Box>

        {/* Chat List */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {users.map((user) => (
            <Box
              key={user.id}
              onClick={() => setSelectedUser(user)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1.5,
                cursor: "pointer",
                bgcolor:
                  selectedUser?.id === user.id ? "#eef2ff" : "transparent",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar />
                {user.online && (
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: "#22c55e",
                      borderRadius: "50%",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      border: "2px solid #fff",
                    }}
                  />
                )}
              </Box>

              <Box>
                <Typography fontSize={14} fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography fontSize={12} color="gray">
                  {user.lastMsg}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 🔥 RIGHT CHAT AREA */}
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: "#fff",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar />
          <Box>
            <Typography fontWeight={600}>
              {selectedUser?.name}
            </Typography>
            <Typography fontSize={12} color="gray">
              {selectedUser?.online ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {(messages[selectedUser.id] || []).map((msg, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: msg.from === "me" ? "flex-end" : "flex-start",
                bgcolor: msg.from === "me" ? "#6366f1" : "#e5e7eb",
                color: msg.from === "me" ? "#fff" : "#000",
                px: 2,
                py: 1,
                borderRadius: 3,
                maxWidth: "60%",
                fontSize: 13,
              }}
            >
              {msg.text}
            </Box>
          ))}
        </Box>

        {/* Input */}
        <Box
          sx={{
            p: 1,
            bgcolor: "#fff",
            borderTop: "1px solid #eee",
            display: "flex",
            gap: 1,
          }}
        >
          <InputBase
            fullWidth
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{
              bgcolor: "#f1f1f1",
              borderRadius: 2,
              px: 2,
              py: 1,
              fontSize: 14,
            }}
          />

          <IconButton onClick={handleSend} color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentChat;