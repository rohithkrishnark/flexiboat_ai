import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Avatar, InputBase, IconButton } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

import { getAuthUser } from "../../constant/Constant";
import {
  useFetchMessages,
  useFetchChatUsers,
} from "../../ADMIN/CommonCode/useQuery";

import { axiosLogin } from "../../Axios/axios";
import { socket } from "../../Utils/Socket/Socket";

const StudentChat = () => {
  const user = getAuthUser();
  const userId = user?.user_id || user?.alum_id;

  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const passedUser = location.state?.user;

  // ✅ FETCH USERS
  const { data: Users = [], refetch: refetchUsers } =
    useFetchChatUsers(userId);

  // ✅ FILTER USERS
  const filteredUsers = useMemo(() => {
    return (Users || []).filter((u) =>
      (u?.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [Users, search]);

  //  SELECT USER FROM NAVIGATION
useEffect(() => {
  //  priority 1 → navigation user
  if (passedUser && !selectedUser) {
    setSelectedUser(passedUser);
    return;
  }

  //  priority 2 → first user
  if (!selectedUser && Users.length > 0) {
    setSelectedUser(Users[0]);
  }
}, [passedUser, Users]);

  //  SOCKET JOIN
  useEffect(() => {
    if (!userId) return;
    socket.emit("join", userId);
  }, [userId]);

  //  FETCH MESSAGES
  const { data: messagesData = [] } = useFetchMessages({
    user1: userId,
    user2: selectedUser?.id,
    user1_type: user?.role,
    user2_type: selectedUser?.type,
  });

  // ✅ SET MESSAGES FROM API
  useEffect(() => {
    if (!selectedUser?.id) return;

    setMessages(
      (messagesData || []).map((m) => ({
        text: m.message,
        sender: m.sender_id === userId ? "me" : "other",
      }))
    );
  }, [messagesData, selectedUser?.id]);

  // ✅ SOCKET LISTENER (NO DUPLICATE)
  useEffect(() => {
    const handler = (msg) => {
      // ✅ ONLY RECEIVE FROM OTHERS
      if (msg.receiver_id === userId) {
        setMessages((prev) => [
          ...prev,
          {
            text: msg.message,
            sender: "other",
          },
        ]);
      }

      refetchUsers(); // update sidebar last message
    };

    socket.on("new-message", handler);

    return () => socket.off("new-message", handler);
  }, [userId]);

  // ✅ SEND MESSAGE (OPTIMISTIC UI)
  const handleSend = async () => {
    if (!input.trim() || !selectedUser) return;

    const newMsg = {
      text: input,
      sender: "me",
    };

    // 🔥 instant UI update
    setMessages((prev) => [...prev, newMsg]);

    await axiosLogin.post("/chat/send-message", {
      user1_id: userId,
      user1_type: user?.role,
      user2_id: selectedUser.id,
      user2_type: selectedUser.type,

      sender_id: userId,
      sender_type: user?.role,
      receiver_id: selectedUser.id,
      receiver_type: selectedUser.type,

      message: input,
    });

    setInput("");
    refetchUsers();
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
        {/* HEADER */}
        <Box sx={{ p: 2 }}>
          <Typography fontWeight={700}>Chats</Typography>

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
            <InputBase
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ ml: 1, fontSize: 13 }}
            />
          </Box>
        </Box>

        {/* USER LIST */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {filteredUsers.map((u) => (
            <Box
              key={u.id}
              onClick={() => setSelectedUser(u)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1.5,
                cursor: "pointer",
                bgcolor:
                  selectedUser?.id === u.id ? "#eef2ff" : "transparent",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <Avatar>
                {u.name?.charAt(0)?.toUpperCase()}
              </Avatar>

              <Box>
                <Typography fontSize={14} fontWeight={600}>
                  {u.name}
                </Typography>

                <Typography fontSize={12} color="gray">
                  {u.last_message || "Start conversation"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 🔥 RIGHT CHAT */}
      <Box sx={{ width: "70%", display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
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
          <Avatar>
            {selectedUser?.name?.charAt(0)}
          </Avatar>

          <Typography fontWeight={600}>
            {selectedUser?.name || "Select Chat"}
          </Typography>
        </Box>

        {/* MESSAGES */}
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
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                bgcolor: msg.sender === "me" ? "#6366f1" : "#e5e7eb",
                color: msg.sender === "me" ? "#fff" : "#000",
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

        {/* INPUT */}
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