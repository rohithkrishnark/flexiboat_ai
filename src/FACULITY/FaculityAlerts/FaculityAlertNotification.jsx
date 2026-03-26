import React from "react";
import {
  Box,
  Typography,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// 🔥 Dummy Alerts
const alerts = [
  {
    id: 1,
    title: "New Assignment Submitted",
    message: "Rahul Krishna submitted Assignment 3.",
    type: "info",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Evaluation Pending",
    message: "You have 12 submissions pending for review.",
    type: "warning",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "System Update",
    message: "Portal will be down for maintenance tonight.",
    type: "success",
    time: "Yesterday",
    unread: false,
  },
];

// 🔥 ICON + COLOR BASED ON TYPE
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
  return (
    <Box
      sx={{
        height: "85vh",
        overflowY: "auto",
        bgcolor: "#f4f6f8",
        p: 2,

        // hide scrollbar
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
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
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                alignItems: "flex-start",
                position: "relative",
                transition: "0.2s",

                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              {/* LEFT ICON */}
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

              {/* STATUS */}
              {alert.unread && (
                <Chip
                  label="New"
                  size="small"
                  color="primary"
                  sx={{ height: 20, fontSize: 10 }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default FaculityAlertNotification;