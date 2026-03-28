import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  TabList,
  Tab,
  Chip,
  Button,
} from "@mui/joy";

import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";

import { getAuthUser } from "../../constant/Constant";
import { socket } from "../../Utils/Socket/Socket";

const STORAGE_KEY = "alumni_notifications";

/* ---------------- ICON ---------------- */
const getIcon = (type) => {
  switch (type) {
    case "job":
      return <WorkIcon fontSize="small" />;
    case "event":
      return <EventIcon fontSize="small" />;
    case "network":
    case "follow":
      return <GroupIcon fontSize="small" />;
    case "chat":
      return <ChatIcon fontSize="small" />;
    case "post":
      return <WorkIcon fontSize="small" />;
    default:
      return <WorkIcon fontSize="small" />;
  }
};

const AluminiNotification = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [followRequests, setFollowRequests] = useState([]);

  const user = getAuthUser();
  const alum_id = user?.alum_id;

  /* ---------------- LOAD FROM LOCAL STORAGE ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotifications(parsed.notifications || []);
      setFollowRequests(parsed.followRequests || []);
    }
  }, []);

  /* ---------------- SAVE TO LOCAL STORAGE ---------------- */
  const saveToStorage = (noti, follow) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        notifications: noti,
        followRequests: follow,
      })
    );
  };

  /* ---------------- SOCKET ---------------- */
  useEffect(() => {
    if (!alum_id) return;

    socket.connect();
    socket.emit("join", alum_id);

    /* FOLLOW */
    socket.on("new-connection", (data) => {
      if (Number(data.receiver_id) === Number(alum_id)) {
        setFollowRequests((prev) => {
          const updated = [
            {
              id: Date.now(),
              type: "follow",
              sender_id: data.sender_id,
              message: `Some One followed you`,
              time: "Just now",
              isRead: false,
            },
            ...prev,
          ];

          saveToStorage(notifications, updated);
          return updated;
        });
      }
    });

    /* NEW POST */
    socket.on("new-post", (data) => {
      setNotifications((prev) => {
        const updated = [
          {
            id: Date.now(),
            type: data.post_type,
            alum_name: data?.alum_name || `User ${data.user_id}`,
            message: data?.title,
            time: "Just now",
            isRead: false,
          },
          ...prev,
        ];

        saveToStorage(updated, followRequests);
        return updated;
      });
    });

    return () => {
      socket.off("new-post");
      socket.off("new-connection");
    };
  }, [alum_id, notifications, followRequests]);

  /* ---------------- CLICK = REMOVE + SAVE ---------------- */
  const handleClick = (id, type) => {
    if (type === "follow") {
      setFollowRequests((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        saveToStorage(notifications, updated);
        return updated;
      });
    } else {
      setNotifications((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        saveToStorage(updated, followRequests);
        return updated;
      });
    }
  };

  /* ---------------- FILTER ---------------- */
  const filteredData =
    filter === "all"
      ? [...followRequests, ...notifications]
      : filter === "follow"
        ? followRequests
        : notifications.filter((n) => n.type === filter);

  /* ---------------- UI ---------------- */
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f7f9fb" }}>

      {/* HEADER */}
      <Box sx={{ position: "sticky", top: 0, bgcolor: "#fff", p: 2 }}>
        <Typography level="title-lg">Notifications</Typography>

        <Tabs value={filter} onChange={(e, val) => setFilter(val)} sx={{ mt: 1 }}>
          <TabList>
            <Tab value="all">All</Tab>
            <Tab value="job">Jobs</Tab>
            <Tab value="event">Events</Tab>
            <Tab value="network">Network</Tab>
            <Tab value="chat">Chat</Tab>
            <Tab value="post">Posts</Tab>
            <Tab value="follow">Follow</Tab>
          </TabList>
        </Tabs>
      </Box>

      {/* LIST */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 1 }}>

        {filteredData.length === 0 && (
          <Typography sx={{ textAlign: "center", mt: 4 }}>
            No notifications
          </Typography>
        )}

        {filteredData.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleClick(item.id, item.type)}  // ✅ CLICK TO REMOVE
            sx={{
              display: "flex",
              gap: 2,
              p: 1.5,
              m: 1,
              borderRadius: 3,
              bgcolor: "#fff",
              boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {/* ICON */}
            <Box sx={{ bgcolor: "#eef2ff", p: 1.2, borderRadius: 2, display: "flex" }}>
              {getIcon(item.type)}
            </Box>

            {/* CONTENT */}
            <Box sx={{ flex: 1 }}>
              <Typography level="body-sm" fontWeight={600}>
                {item.message}
              </Typography>

              <Typography level="body-xs" sx={{ color: "gray" }}>
                {item.alum_name}
              </Typography>
            </Box>

            {/* TYPE */}
            <Chip size="sm">{item.type}</Chip>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AluminiNotification;