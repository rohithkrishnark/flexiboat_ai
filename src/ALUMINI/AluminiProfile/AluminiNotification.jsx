import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  TabList,
  Tab,
  Chip,
  IconButton,
} from "@mui/joy";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";

// MOCK DATA
const mockNotifications = [
  {
    id: 1,
    type: "job",
    message: "Rohith posted a job at Infosys",
    time: "2m ago",
    isRead: false,
  },
  {
    id: 2,
    type: "event",
    message: "New event: Job Fair 2026",
    time: "1h ago",
    isRead: false,
  },
  {
    id: 3,
    type: "network",
    message: "Anjali sent a request",
    time: "3h ago",
    isRead: true,
  },
  {
    id: 4,
    type: "chat",
    message: "You got a new message",
    time: "Yesterday",
    isRead: true,
  },
];

const getIcon = (type) => {
  switch (type) {
    case "job":
      return <WorkIcon fontSize="small" />;
    case "event":
      return <EventIcon fontSize="small" />;
    case "network":
      return <GroupIcon fontSize="small" />;
    case "chat":
      return <ChatIcon fontSize="small" />;
    default:
      return null;
  }
};

const AluminiNotification = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const filteredData =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f7f9fb",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "#fff",
          p: 2,
          borderBottom: "1px solid #eee",
          zIndex: 10,
        }}
      >
        <Typography level="title-lg">
          Notifications
        </Typography>

        <Tabs
          value={filter}
          onChange={(e, val) => setFilter(val)}
          sx={{ mt: 1 }}
        >
          <TabList>
            <Tab value="all">All</Tab>
            <Tab value="job">Jobs</Tab>
            <Tab value="event">Events</Tab>
            <Tab value="network">Network</Tab>
            <Tab value="chat">Chat</Tab>
          </TabList>
        </Tabs>
      </Box>

      {/* LIST */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1,

          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {filteredData.map((item) => (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              p: 1.5,
              m: 1,
              borderRadius: 3,
              bgcolor: "#fff",
              boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
              alignItems: "center",
              position: "relative",
              transition: "0.2s",

              "&:hover": {
                transform: "translateY(-2px)",
                bgcolor: "#f9fafb",
              },
            }}
          >
            {/* 🔴 UNREAD DOT */}
            {!item.isRead && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#6366f1",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 12,
                  left: 12,
                }}
              />
            )}

            {/* 🔥 ICON */}
            <Box
              sx={{
                bgcolor: "#eef2ff",
                p: 1.2,
                borderRadius: 2,
                display: "flex",
                color: "#6366f1",
              }}
            >
              {getIcon(item.type)}
            </Box>

            {/* 📄 CONTENT */}
            <Box sx={{ flex: 1 }}>
              <Typography
                level="body-sm"
                sx={{
                  fontWeight: item.isRead ? 400 : 600,
                }}
              >
                {item.message}
              </Typography>

              <Typography level="body-xs" sx={{ color: "gray", mt: 0.3 }}>
                {item.time}
              </Typography>
            </Box>

            {/* 🏷 TYPE */}
            <Chip
              size="sm"
              variant="soft"
              sx={{
                textTransform: "capitalize",
                bgcolor: "#f1f5f9",
              }}
            >
              {item.type}
            </Chip>

            {/* ✅ MARK READ */}
            {!item.isRead && (
              <IconButton size="sm" onClick={() => markAsRead(item.id)}>
                <CheckCircleIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AluminiNotification;