import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  Avatar,
  IconButton,
} from "@mui/joy";

import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";

const users = [
  { id: 1, name: "Anu Thomas", last: "See you soon", online: true },
  { id: 2, name: "Vishnu Raj", last: "Okay bro", online: false },
  { id: 3, name: "Rahul (Student)", last: "Thanks!", online: true },
];

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState([
    { text: "Hello!", sender: "me" },
    { text: "Hi 👋", sender: "other" },
  ]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "me" }]);
    setInput("");
  };

  // 🔥 FILTER USERS
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", height: "85vh", bgcolor: "#f4f6f8" }}>

      {/* 🔥 LEFT PANEL */}
      <Box
        sx={{
          width: "280px",
          bgcolor: "#fff",
          borderRight: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2 }}>
          <Typography fontWeight={700}>Chats</Typography>

          {/* 🔥 SEARCH BAR */}
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: "#f1f1f1",
              borderRadius: "20px",
              px: 1,
            }}
          >
            <SearchIcon fontSize="small" />
            <Input
              placeholder="Search chats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="plain"
              sx={{ ml: 1, fontSize: 13 }}
            />
          </Box>
        </Box>

        {/* USER LIST */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {filteredUsers.map((user) => (
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
                  selectedUser.id === user.id ? "#eef2ff" : "transparent",
                "&:hover": { bgcolor: "#f5f5f5" },
                transition: "0.2s",
              }}
            >
              {/* Avatar */}
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

              {/* Name */}
              <Box sx={{ flex: 1 }}>
                <Typography fontSize={14} fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography fontSize={12} color="neutral.500">
                  {user.last}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 🔥 RIGHT PANEL */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 2,
            bgcolor: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          <Avatar />
          <Box>
            <Typography fontWeight={600}>
              {selectedUser.name}
            </Typography>
            <Typography fontSize={12} color="neutral.500">
              {selectedUser.online ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>

        {/* MESSAGES */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor: "#f9fafb",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent:
                  msg.sender === "me" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  bgcolor:
                    msg.sender === "me" ? "#6366f1" : "#e5e7eb",
                  color: msg.sender === "me" ? "#fff" : "#000",
                  px: 2,
                  py: 1,
                  borderRadius: "12px",
                  maxWidth: "60%",
                  fontSize: "13px",
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))}
        </Box>

        {/* INPUT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: "#fff",
            borderTop: "1px solid #eee",
            gap: 1,
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            sx={{
              flex: 1,
              bgcolor: "#f1f1f1",
              borderRadius: "20px",
              px: 2,
            }}
          />

          <IconButton
            onClick={handleSend}
            sx={{
              bgcolor: "#6366f1",
              color: "#fff",
              "&:hover": { bgcolor: "#4f46e5" },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;