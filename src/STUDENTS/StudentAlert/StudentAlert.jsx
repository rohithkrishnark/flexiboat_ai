import React from "react";
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

// Dummy Alerts Data
const alerts = [
    {
        id: 1,
        title: "New Activity Added",
        message: "Onam Dance Event has been added. Participate now!",
        time: "2h ago",
        type: "info",
        unread: true,
    },
    {
        id: 2,
        title: "Submission Deadline",
        message: "Assignment 3 deadline is tomorrow!",
        time: "5h ago",
        type: "warning",
        unread: true,
    },
    {
        id: 3,
        title: "Points Credited",
        message: "You earned 20 points for Hackathon 🎉",
        time: "1d ago",
        type: "success",
        unread: false,
    },
    {
        id: 4,
        title: "Profile Updated",
        message: "Your profile details were successfully updated.",
        time: "2d ago",
        type: "info",
        unread: false,
    },
];

// Icon + Color mapping
const getAlertStyle = (type) => {
    switch (type) {
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
    return (
        <Box
            sx={{
                height: "80vh",
                overflowY: "auto",
                bgcolor: "#f4f6f8",
                px: 2,
                py: 2,

                // Hide scrollbar
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
                {alerts.map((alert) => {
                    const style = getAlertStyle(alert.type);

                    return (
                        <Box
                            key={alert.id}
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