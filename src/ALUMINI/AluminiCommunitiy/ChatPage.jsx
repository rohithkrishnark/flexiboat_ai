import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Input, IconButton } from "@mui/joy";

import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";

import { getAuthUser } from "../../constant/Constant";
import {
  useFetchAllAlumini,
  useFetchMyConnections,
  useFetchMessages,
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

  // ======================
  // FETCH USERS
  // ======================
  const { data: AllAluminiDetail = [] } = useFetchAllAlumini();

  const { data: myConnections = [] } = useFetchMyConnections({
    user_id: userId,
    user_type: user?.role,
  });

  // ======================
  // CONNECTED USERS
  // ======================
  const connectedIds = useMemo(() => {
    return new Set(
      myConnections.map((c) =>
        Number(c.receiver_id === userId ? c.sender_id : c.receiver_id)
      )
    );
  }, [myConnections, userId]);

  const chatUsers = useMemo(() => {
    return AllAluminiDetail.filter((u) =>
      connectedIds.has(Number(u.alum_id))
    ).map((u) => ({
      id: u.alum_id,
      name: u.alum_name,
      type: "alumni",
      lastMessage: "",
    }));
  }, [AllAluminiDetail, connectedIds]);

  // auto select first user
  useEffect(() => {
    if (chatUsers.length > 0 && !selectedUser) {
      setSelectedUser(chatUsers[0]);
    }
  }, [chatUsers]);

  // ======================
  // SOCKET JOIN
  // ======================
  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    }
  }, [userId]);

  // ======================
  // RESET CHAT ON USER CHANGE
  // ======================
  useEffect(() => {
    setMessages([]); // 🔥 important fix
  }, [selectedUser?.id]);

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
        conversation_id: m.conversation_id,
      }))
    );
  }, [messagesData, selectedUser?.id]);

  // ======================
  // REALTIME SOCKET
  // ======================
  useEffect(() => {
    const handler = (msg) => {
      console.log("🔥 realtime:", msg);

      if (
        msg.sender_id === userId ||
        msg.receiver_id === userId
      ) {
        setMessages((prev) => [
          ...prev,
          {
            text: msg.message,
            sender: msg.sender_id === userId ? "me" : "other",
            conversation_id: msg.conversation_id,
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

    setInput("");
  };

  // ======================
  // SEARCH
  // ======================
  const filteredUsers = chatUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", height: "85vh", bgcolor: "#f4f6f8" }}>
      
      {/* LEFT SIDEBAR */}
      <Box sx={{ width: 280, bgcolor: "#fff", borderRight: "1px solid #eee" }}>
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

        {filteredUsers.map((u) => (
          <Box
            key={u.id}
            onClick={() => setSelectedUser(u)}
            sx={{
              p: 1.5,
              cursor: "pointer",
              bgcolor: selectedUser?.id === u.id ? "#eef2ff" : "",
            }}
          >
            <Typography fontWeight={600}>{u.name}</Typography>
          </Box>
        ))}
      </Box>

      {/* RIGHT CHAT */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
        <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
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
        <Box sx={{ display: "flex", p: 1.5, gap: 1 }}>
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