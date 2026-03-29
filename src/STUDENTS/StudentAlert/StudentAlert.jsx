import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Chip,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import WorkIcon from "@mui/icons-material/Work";

import { socket } from "../../Utils/Socket/Socket";
import { getAuthUser } from "../../constant/Constant";

const STORAGE_KEY = "student_alerts";

/* ---------------- ICON + STYLE ---------------- */
const getAlertStyle = (type) => {
    switch (type) {
        case "chat":
            return {
                icon: <ChatIcon />,
                color: "#6366f1",
                bg: "#eef2ff",
            };
        case "post":
            return {
                icon: <WorkIcon />,
                color: "#22c55e",
                bg: "#f0fdf4",
            };
        case "warning":
            return {
                icon: <WarningAmberIcon />,
                color: "#f59e0b",
                bg: "#fff7ed",
            };
        case "success":
            return {
                icon: <CheckCircleIcon />,
                color: "#22c55e",
                bg: "#f0fdf4",
            };
        default:
            return {
                icon: <InfoIcon />,
                color: "#3b82f6",
                bg: "#eff6ff",
            };
    }
};

const StudentAlert = () => {

    const [alerts, setAlerts] = useState([]);

    const user = getAuthUser();
    const userId = user?.user_id || user?.student_id;

    /* ---------------- LOAD FROM STORAGE ---------------- */
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setAlerts(JSON.parse(saved));
        }
    }, []);

    /* ---------------- SAVE ---------------- */
    const saveAlerts = (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    /* ---------------- SOCKET ---------------- */
    // useEffect(() => {
    //     if (!userId) return;

    //     socket.connect();
    //     socket.emit("join", userId);

    //     // 🔥 CHAT MESSAGE
    //     socket.on("new-message", (msg) => {
    //         if (msg.receiver_id === userId) {
    //             setAlerts((prev) => {
    //                 const updated = [
    //                     {
    //                         id: Date.now(),
    //                         title: "New Message",
    //                         message: msg.message,
    //                         time: "Just now",
    //                         type: "chat",
    //                         unread: true,
    //                     },
    //                     ...prev,
    //                 ];
    //                 saveAlerts(updated);
    //                 return updated;
    //             });
    //         }
    //     });

    //     // 🔥 NEW POST FROM ALUMNI
    //     socket.on("new-post", (data) => {
    //         setAlerts((prev) => {
    //             const updated = [
    //                 {
    //                     id: Date.now(),
    //                     title: "New Post",
    //                     message: data?.title || "New update",
    //                     time: "Just now",
    //                     type: "post",
    //                     unread: true,
    //                 },
    //                 ...prev,
    //             ];
    //             saveAlerts(updated);
    //             return updated;
    //         });
    //     });

    //     return () => {
    //         socket.off("new-message");
    //         socket.off("new-post");
    //     };
    // }, [userId]);


useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit("join", userId);

    // 🔥 CHAT MESSAGE
    socket.on("new-message", (msg) => {
        if (msg.receiver_id === userId) {
            setAlerts((prev) => {
                const updated = [
                    {
                        id: Date.now(),
                        title: "New Message",
                        message: msg.message,
                        time: "Just now",
                        type: "chat",
                        unread: true,
                    },
                    ...prev,
                ];
                saveAlerts(updated);
                return updated;
            });
        }
    });

    // 🔥 NEW POST
    socket.on("new-post", (data) => {
        setAlerts((prev) => {
            const updated = [
                {
                    id: Date.now(),
                    title: "New Post",
                    message: data?.title || "New update",
                    time: "Just now",
                    type: "post",
                    unread: true,
                },
                ...prev,
            ];
            saveAlerts(updated);
            return updated;
        });
    });

    // 🔥 NEW ALERT (ADDED THIS)
    socket.on("new_alert", (data) => {
        setAlerts((prev) => {
            const updated = [
                {
                    id: data.alert_id || Date.now(),
                    title: data.title || "Alert",
                    message: data.message,
                    time: "Just now",
                    type: "Admin Alert",
                    unread: true,
                },
                ...prev,
            ];
            saveAlerts(updated);
            return updated;
        });
    });

    return () => {
        socket.off("new-message");
        socket.off("new-post");
        socket.off("new_alert");
    };
}, [userId]);


    /* ---------------- CLICK REMOVE ---------------- */
    const handleRemove = (id) => {
        setAlerts((prev) => {
            const updated = prev.filter((a) => a.id !== id);
            saveAlerts(updated);
            return updated;
        });
    };

    return (
        <Box
            sx={{
                height: "80vh",
                overflowY: "auto",
                bgcolor: "#f4f6f8",
                px: 2,
                py: 2,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
            }}
        >
            {/* 🔥 HEADER */}
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
                {alerts.length === 0 && (
                    <Typography textAlign="center">No alerts</Typography>
                )}

                {alerts.map((alert) => {
                    const style = getAlertStyle(alert.type);

                    return (
                        <Box
                            key={alert.id}
                            onClick={() => handleRemove(alert.id)}
                            sx={{
                                display: "flex",
                                gap: 2,
                                p: 2,
                                borderRadius: 3,
                                bgcolor: "#fff",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                borderLeft: `5px solid ${style.color}`,
                                position: "relative",
                                transition: "0.2s",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            {/* ICON */}
                            <Avatar
                                sx={{
                                    bgcolor: style.bg,
                                    color: style.color,
                                }}
                            >
                                {style.icon}
                            </Avatar>

                            {/* CONTENT */}
                            <Box sx={{ flex: 1 }}>
                                <Typography fontWeight={600}>{alert.title}</Typography>

                                <Typography fontSize={13} color="text.secondary">
                                    {alert.message}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: 1,
                                    }}
                                >
                                    <Typography fontSize={11} color="gray">
                                        {alert.time}
                                    </Typography>

                                    <Chip
                                        label={alert.type}
                                        size="small"
                                        sx={{
                                            textTransform: "capitalize",
                                            bgcolor: style.bg,
                                            color: style.color,
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* 🔴 Unread Dot */}
                            {alert.unread && (
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        bgcolor: "#ef4444",
                                        borderRadius: "50%",
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                    }}
                                />
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default StudentAlert;