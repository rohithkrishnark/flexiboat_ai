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
import { errorNotify, getAuthUser, successNotify } from "../../constant/Constant";
import { useFetchAlertNotify } from "../../ADMIN/CommonCode/useQuery";
import { axiosLogin } from "../../Axios/axios";

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

  const user = getAuthUser();


  const { data: FaculityNotification } = useFetchAlertNotify("faculty");




  //  LOAD FROM LOCALSTORAGE
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAlerts(JSON.parse(stored));
      }
    } catch (err) {
      console.error("LocalStorage parse error", err);
    }
  }, []);
  //  SAVE TO LOCALSTORAGE ON CHANGE
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  }, [alerts]);


  useEffect(() => {
    if (!FaculityNotification) return;

    const formattedApiAlerts = FaculityNotification.map((item) => ({
      id: item.id,
      title: item.title,
      message: item.message,
      type: item.type || "info",
      time: new Date(item.created_at).toLocaleString(),
      unread: item.is_read === 0,
    }));

    setAlerts((prev) => {
      // Merge API + existing alerts
      const combined = [...formattedApiAlerts, ...prev];

      // Remove duplicates (based on id)
      const unique = combined.filter(
        (item, index, self) =>
          index === self.findIndex((a) => a.id === item.id)
      );

      // Sort latest first
      unique.sort((a, b) => b.id - a.id);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));

      return unique;
    });
  }, [FaculityNotification]);



  useEffect(() => {
    if (!user) return;

    socket.connect();
    socket.emit("join", user.fac_id);

    const handleNewAlert = (data) => {
      const newAlert = {
        id: data.id || Date.now(),
        title: data.title || "New Alert",
        message: data.message || "You have a new update",
        type: data.type || "info",
        time: "Just now",
        unread: true,
      };

      setAlerts((prev) => {
        const updated = [newAlert, ...prev];

        const unique = updated.filter(
          (item, index, self) =>
            index === self.findIndex((a) => a.id === item.id)
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));

        return unique;
      });
    };

    socket.on("new_alert", handleNewAlert);

    return () => {
      socket.off("new_alert", handleNewAlert);
      socket.disconnect();
    };
  }, [user]);
  //  CLICK = REMOVE ONLY THAT ALERT
  const handleRead = async (id) => {
    const alert = alerts?.find((a) => a.id === id);

    // If no alert found → do nothing
    if (!alert) return;

    // If NO valid DB id → remove directly (socket/local alert)
    if (!alert.id || isNaN(alert.id)) {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
      return;
    }

    // Already read → skip API
    if (!alert.unread) return;

    try {
      const response = await axiosLogin.put(`/alertnotify/${id}/read`);
      const { message, success } = response.data ?? {};

      if (!success) {
        return errorNotify("Error in Acknowledging");
      }

      //  Mark as read
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, unread: false } : a
        )
      );

      successNotify(message || "Marked as read");
    } catch (error) {
      console.error("Error in Acknowledging", error);
      errorNotify("Error in Acknowledging");
    }
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
        {alerts
          ?.sort((a, b) => b.unread - a.unread)
          ?.map((alert) => {
            const style = getTypeStyle(alert.type);

            return (
              <Box
                key={alert.id}
                onClick={() => handleRead(alert.id)}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  borderRadius: 3,
                  bgcolor: alert.unread ? "#fff" : "#f1f5f9", // ✅ dim background
                  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                  alignItems: "flex-start",
                  cursor: "pointer",
                  transition: "0.2s",
                  opacity: alert.unread ? 1 : 0.7, // ✅ fade effect
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
                  <Typography
                    fontWeight={alert.unread ? 600 : 400}
                    fontSize={14}
                  >
                    {alert?.title}
                  </Typography>
                  <Typography fontSize={13} color="gray">
                    {alert?.message}
                  </Typography>

                  <Typography fontSize={11} color="gray" mt={0.5}>
                    {alert?.time}
                  </Typography>
                </Box>

                {/* NEW BADGE */}
                {alert.unread && (
                  <Chip
                    label={alert.unread ? "New" : "Read"}
                    size="small"
                    color={alert.unread ? "primary" : "default"}
                    variant={alert.unread ? "filled" : "outlined"} // ✅ different style
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