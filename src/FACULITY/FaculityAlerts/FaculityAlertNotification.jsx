import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { socket } from "../../Utils/Socket/Socket";

const STORAGE_KEY = "faculty_alerts";

const getTypeStyle = (type) => {
  switch (type) {
    case "warning":
      return {
        icon: <WarningAmberIcon />,
        color: "#f59e0b",
        bg: "#fff7ed",
      };
    case "success":
      return {
        icon: <CheckCircleOutlineIcon />,
        color: "#22c55e",
        bg: "#ecfdf5",
      };
    default:
      return {
        icon: <InfoOutlinedIcon />,
        color: "#3b82f6",
        bg: "#eff6ff",
      };
  }
};

const FaculityAlertNotification = () => {
  const [alerts, setAlerts] = useState([]);

  // ✅ LOAD FROM LOCALSTORAGE
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAlerts(JSON.parse(stored));
    }
  }, []);

  // ✅ SAVE TO LOCALSTORAGE ON CHANGE
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  }, [alerts]);

  // ✅ SOCKET LISTENER
  useEffect(() => {
    socket.on("new-activity", (data) => {
      const newAlert = {
        id: Date.now(),
        title: data.caption || "New Activity",
        message: data.description || "You have a new update",
        type: "info",
        time: "Just now",
        unread: true,
      };

      setAlerts((prev) => [newAlert, ...prev]);
    });

    return () => {
      socket.off("new-activity");
    };
  }, []);

  // ✅ CLICK = REMOVE ONLY THAT ALERT
  const handleRemove = (id) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
  };

  return (
    <Box
      sx={{
        height: "85vh",
        overflowY: "auto",
        bgcolor: "#f4f6f8",
        p: 2,
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <NotificationsActiveIcon color="primary" />
        <Typography fontWeight={700} fontSize={18}>
          Alerts & Notifications
        </Typography>
      </Box>

      {/* ALERT LIST */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {alerts.map((alert) => {
          const style = getTypeStyle(alert.type);

          return (
            <Box
              key={alert.id}
              onClick={() => handleRemove(alert.id)}   // ✅ CLICK TO REMOVE
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                alignItems: "flex-start",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.01)" },
              }}
            >
              {/* ICON */}
              <Box
                sx={{
                  bgcolor: style.bg,
                  color: style.color,
                  p: 1,
                  borderRadius: 2,
                }}
              >
                {style.icon}
              </Box>

              {/* CONTENT */}
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={600} fontSize={14}>
                  {alert.title}
                </Typography>

                <Typography fontSize={13} color="gray">
                  {alert.message}
                </Typography>

                <Typography fontSize={11} color="gray" mt={0.5}>
                  {alert.time}
                </Typography>
              </Box>

              {/* NEW BADGE */}
              {alert.unread && (
                <Chip label="New" size="small" color="primary" />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default FaculityAlertNotification;