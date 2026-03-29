import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Input, IconButton, Avatar } from "@mui/joy";

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

const ChatPage = () => {
  const user = getAuthUser();
  const userId = user?.alum_id || user?.student_id;

  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);

  const { data: Users = [] ,refetch:fechChatuser} = useFetchChatUsers(userId);

  const location = useLocation();
  const passedUser = location.state?.user;

  // ✅ stable users
  const chatUsers = Users || [];

  // ✅ filter only here (IMPORTANT)
  const filteredUsers = useMemo(() => {
    return chatUsers.filter((u) =>
      (u.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [chatUsers, search]);

  // ======================
  // AUTO SELECT (FIXED)
  // ======================
  useEffect(() => {
    if (passedUser) {
      setSelectedUser(passedUser);
      return;
    }

    if (!selectedUser && chatUsers.length > 0) {
      setSelectedUser(chatUsers[0]);
    }
  }, [passedUser, chatUsers]);

  // ======================
  // SOCKET JOIN
  // ======================
  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    }
  }, [userId]);

  // ======================
  // RESET CHAT
  // ======================
  useEffect(() => {
    setMessages([]);
  }, [selectedUser?.id, selectedUser?.type]);

  // ======================
  // FETCH MESSAGES
  // ======================
  const { data: messagesData = [], refetch } = useFetchMessages({
    user1: userId,
    user2: selectedUser?.id,
    user1_type: user?.role,
    user2_type: selectedUser?.type,
  });

  useEffect(() => {
    if (selectedUser?.id) {
      refetch();
    }
  }, [selectedUser?.id]);

  useEffect(() => {
    if (!messagesData) return;

    setMessages(
      messagesData.map((m) => ({
        id: m.id,
        text: m.message,
        sender: m.sender_id === userId ? "me" : "other",
      }))
    );
  }, [messagesData]);

  // ======================
  // REALTIME
  // ======================
  useEffect(() => {
    const handler = (msg) => {
      if (
        msg.sender_id === userId ||
        msg.receiver_id === userId
      ) {
        setMessages((prev) => [
          ...prev,
          {
            text: msg.message,
            sender: msg.sender_id === userId ? "me" : "other",
          },
        ]);
      }

      refetch();
    };

    socket.on("new-message", handler);
    return () => socket.off("new-message", handler);
  }, [userId]);

  // ======================
  // SEND MESSAGE
  // ======================
  const handleSend = async () => {
    if (!input.trim() || !selectedUser) return;

    const payload = {
      user1_id: userId,
      user1_type: user?.role,
      user2_id: selectedUser.id,
      user2_type: selectedUser.type,

      sender_id: userId,
      sender_type: user?.role,
      receiver_id: selectedUser.id,
      receiver_type: selectedUser.type,

      message: input,
    };

    await axiosLogin.post("/chat/send-message", payload);
    fechChatuser()
    setInput("");
  };

  return (
    <Box sx={{ display: "flex", height: "85vh", bgcolor: "#f4f6f8" }}>
      
      {/* ================= LEFT SIDEBAR ================= */}
      <Box sx={{ width: 300, bgcolor: "#fff", borderRight: "1px solid #eee" }}>
        
        <Box sx={{ p: 2 }}>
          <Typography fontWeight={700}>Chats</Typography>

          <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
            <SearchIcon />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              sx={{ ml: 1 }}
            />
          </Box>
        </Box>

        {/* USERS */}
        {filteredUsers.map((u) => (
          <Box
            key={`${u.type}-${u.id}`}
            onClick={() => setSelectedUser(u)}
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              p: 1.5,
              cursor: "pointer",
              borderBottom: "1px solid #f1f1f1",
              bgcolor:
                selectedUser?.id === u.id &&
                selectedUser?.type === u.type
                  ? "#eef2ff"
                  : "transparent",
            }}
          >
            {/* AVATAR */}
            <Avatar sx={{ bgcolor: "#6366f1" }}>
              {u.name?.charAt(0)}
            </Avatar>

            {/* NAME + LAST MESSAGE */}
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={600}>
                {u.name}
              </Typography>

              <Typography
                level="body-xs"
                sx={{
                  color: "#6b7280",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {u.last_message || "Start conversation"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* ================= RIGHT CHAT ================= */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
        <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
          <Typography fontWeight={600}>
            {selectedUser?.name || "Select Chat"}
          </Typography>
        </Box>

        {/* MESSAGES */}
        <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent:
                  msg.sender === "me" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: msg.sender === "me" ? "#6366f1" : "#e5e7eb",
                  color: msg.sender === "me" ? "#fff" : "#000",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "60%",
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))}
        </Box>

        {/* INPUT */}
        <Box sx={{ display: "flex", p: 1.5, gap: 1, bgcolor: "#fff" }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type message..."
            sx={{ flex: 1 }}
          />

          <IconButton
            onClick={handleSend}
            sx={{ bgcolor: "#6366f1", color: "#fff" }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;