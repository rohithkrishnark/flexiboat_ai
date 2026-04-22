// import React, { useEffect, useState } from "react";
// import {
//     Box,
//     Typography,
//     Avatar,
//     Chip,
// } from "@mui/material";

// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import InfoIcon from "@mui/icons-material/Info";
// import ChatIcon from "@mui/icons-material/Chat";
// import WorkIcon from "@mui/icons-material/Work";

// import { socket } from "../../Utils/Socket/Socket";
// import { getAuthUser } from "../../constant/Constant";
// import { useFetchAlertNotify } from "../../ADMIN/CommonCode/useQuery";

// const STORAGE_KEY = "student_alerts";

// /* ---------------- ICON + STYLE ---------------- */
// const getAlertStyle = (type) => {
//     switch (type) {
//         case "chat":
//             return {
//                 icon: <ChatIcon />,
//                 color: "#6366f1",
//                 bg: "#eef2ff",
//             };
//         case "post":
//             return {
//                 icon: <WorkIcon />,
//                 color: "#22c55e",
//                 bg: "#f0fdf4",
//             };
//         case "warning":
//             return {
//                 icon: <WarningAmberIcon />,
//                 color: "#f59e0b",
//                 bg: "#fff7ed",
//             };
//         case "success":
//             return {
//                 icon: <CheckCircleIcon />,
//                 color: "#22c55e",
//                 bg: "#f0fdf4",
//             };
//         default:
//             return {
//                 icon: <InfoIcon />,
//                 color: "#3b82f6",
//                 bg: "#eff6ff",
//             };
//     }
// };

// const StudentAlert = () => {

//     const [alerts, setAlerts] = useState([]);


//     const { data: AluminiMessages } = useFetchAlertNotify("alumini");


//     console.log({
//         AluminiMessages
//     });


//     const user = getAuthUser();
//     const userId = user?.user_id || user?.student_id;



//     useEffect(() => {
//         if (!AluminiMessages) return;

//         const formatted = AluminiMessages.map((item) => ({
//             id: item.id,
//             title: item.title,
//             message: item.message,
//             type: item.type || "info",
//             time: new Date(item.created_at).toLocaleString(),
//             unread: item.is_read === 0,
//         }));

//         setAlerts((prev) => {
//             const combined = [...formatted, ...prev];

//             const unique = combined.filter(
//                 (item, index, self) =>
//                     index === self.findIndex((a) => a.id === item.id)
//             );

//             //  unread first + latest
//             unique.sort((a, b) => {
//                 if (a.unread !== b.unread) return b.unread - a.unread;
//                 return b.id - a.id;
//             });

//             saveAlerts(unique);
//             return unique;
//         });
//     }, [AluminiMessages]);

//     /* ---------------- LOAD FROM STORAGE ---------------- */
//     useEffect(() => {
//         const saved = localStorage.getItem(STORAGE_KEY);
//         if (saved) {
//             setAlerts(JSON.parse(saved));
//         }
//     }, []);

//     /* ---------------- SAVE ---------------- */
//     const saveAlerts = (data) => {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//     };

//     /* ---------------- SOCKET ---------------- */


//     useEffect(() => {
//         if (!userId) return;

//         socket.connect();
//         socket.emit("join", userId);

//         //  CHAT MESSAGE
//         socket.on("new-message", (msg) => {
//             if (msg.receiver_id === userId) {
//                 setAlerts((prev) => {
//                     const updated = [
//                         {
//                             id: Date.now(),
//                             title: "New Message",
//                             message: msg.message,
//                             time: "Just now",
//                             type: "chat",
//                             unread: true,
//                         },
//                         ...prev,
//                     ];
//                     saveAlerts(updated);
//                     return updated;
//                 });
//             }
//         });

//         //  NEW POST
//         socket.on("new-post", (data) => {
//             setAlerts((prev) => {
//                 const updated = [
//                     {
//                         id: Date.now(),
//                         title: "New Post",
//                         message: data?.title || "New update",
//                         time: "Just now",
//                         type: "post",
//                         unread: true,
//                     },
//                     ...prev,
//                 ];
//                 saveAlerts(updated);
//                 return updated;
//             });
//         });

//         //  NEW ALERT (ADDED THIS)
//         socket.on("new_alert", (data) => {
//             setAlerts((prev) => {
//                 const updated = [
//                     {
//                         id: data.alert_id || Date.now(),
//                         title: data.title || "Alert",
//                         message: data.message,
//                         time: "Just now",
//                         type: "Admin Alert",
//                         unread: true,
//                     },
//                     ...prev,
//                 ];
//                 saveAlerts(updated);
//                 return updated;
//             });
//         });

//         return () => {
//             socket.off("new-message");
//             socket.off("new-post");
//             socket.off("new_alert");
//         };
//     }, [userId]);


//     /* ---------------- CLICK REMOVE ---------------- */
//     const handleRemove = (id) => {
//         setAlerts((prev) => {
//             const updated = prev.filter((a) => a.id !== id);
//             saveAlerts(updated);
//             return updated;
//         });
//     };

//     return (
//         <Box
//             sx={{
//                 height: "80vh",
//                 overflowY: "auto",
//                 bgcolor: "#f4f6f8",
//                 px: 2,
//                 py: 2,
//                 scrollbarWidth: "none",
//                 "&::-webkit-scrollbar": { display: "none" },
//             }}
//         >
//             {/* 🔥 HEADER */}
//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     mb: 2,
//                 }}
//             >
//                 <NotificationsActiveIcon color="primary" />
//                 <Typography fontWeight={700} fontSize={18}>
//                     Alerts & Notifications
//                 </Typography>
//             </Box>

//             {/* ALERT LIST */}
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//                 {alerts.length === 0 && (
//                     <Typography textAlign="center">No alerts</Typography>
//                 )}

//                 {alerts.map((alert) => {
//                     const style = getAlertStyle(alert.type);

//                     return (
//                         <Box
//                             key={alert.id}
//                             onClick={() => handleRemove(alert.id)}
//                             sx={{
//                                 display: "flex",
//                                 gap: 2,
//                                 p: 2,
//                                 borderRadius: 3,
//                                 bgcolor: "#fff",
//                                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                                 borderLeft: `5px solid ${style.color}`,
//                                 position: "relative",
//                                 transition: "0.2s",
//                                 cursor: "pointer",
//                                 "&:hover": {
//                                     transform: "translateY(-2px)",
//                                 },
//                             }}
//                         >
//                             {/* ICON */}
//                             <Avatar
//                                 sx={{
//                                     bgcolor: style.bg,
//                                     color: style.color,
//                                 }}
//                             >
//                                 {style.icon}
//                             </Avatar>

//                             {/* CONTENT */}
//                             <Box sx={{ flex: 1 }}>
//                                 <Typography fontWeight={600}>{alert.title}</Typography>

//                                 <Typography fontSize={13} color="text.secondary">
//                                     {alert.message}
//                                 </Typography>

//                                 <Box
//                                     sx={{
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         mt: 1,
//                                     }}
//                                 >
//                                     <Typography fontSize={11} color="gray">
//                                         {alert.time}
//                                     </Typography>

//                                     <Chip
//                                         label={alert.type}
//                                         size="small"
//                                         sx={{
//                                             textTransform: "capitalize",
//                                             bgcolor: style.bg,
//                                             color: style.color,
//                                         }}
//                                     />
//                                 </Box>
//                             </Box>

//                             {/* 🔴 Unread Dot */}
//                             {alert.unread && (
//                                 <Box
//                                     sx={{
//                                         width: 10,
//                                         height: 10,
//                                         bgcolor: "#ef4444",
//                                         borderRadius: "50%",
//                                         position: "absolute",
//                                         top: 10,
//                                         right: 10,
//                                     }}
//                                 />
//                             )}
//                         </Box>
//                     );
//                 })}
//             </Box>
//         </Box>
//     );
// };

// export default StudentAlert;


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
import { getAuthUser, errorNotify, successNotify } from "../../constant/Constant";
import { useFetchAlertNotify } from "../../ADMIN/CommonCode/useQuery";
import { axiosLogin } from "../../Axios/axios";

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

    const { data: AluminiMessages } = useFetchAlertNotify("alumini");

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

    /* ---------------- 🔥 MERGE API ALERTS ---------------- */
    useEffect(() => {
        if (!AluminiMessages) return;

        const formatted = AluminiMessages.map((item) => ({
            id: item.id,
            title: item.title,
            message: item.message,
            type: item.type || "info",
            time: new Date(item.created_at).toLocaleString(),
            unread: item.is_read === 0,
        }));

        setAlerts((prev) => {
            const combined = [...formatted, ...prev];

            const unique = combined.filter(
                (item, index, self) =>
                    index === self.findIndex((a) => a.id === item.id)
            );

            unique.sort((a, b) => {
                if (a.unread !== b.unread) return b.unread - a.unread;
                return b.id - a.id;
            });

            saveAlerts(unique);
            return unique;
        });
    }, [AluminiMessages]);

    /* ---------------- SOCKET ---------------- */
    useEffect(() => {
        if (!userId) return;

        socket.connect();
        socket.emit("join", userId);

        // CHAT
        socket.on("new-message", (msg) => {
            if (msg.receiver_id === userId) {
                setAlerts((prev) => {
                    const updated = [
                        {
                            id: Date.now(),
                            isTemp: true,
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

        // POST
        socket.on("new-post", (data) => {
            setAlerts((prev) => {
                const updated = [
                    {
                        id: Date.now(),
                        isTemp: true,
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

        // ADMIN ALERT
        socket.on("new_alert", (data) => {
            setAlerts((prev) => {
                const updated = [
                    {
                        id: data.id || Date.now(),
                        isTemp: !data.id,
                        title: data.title || "Alert",
                        message: data.message,
                        time: "Just now",
                        type: data.type || "info",
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

    /* ----------------  MARK AS READ ---------------- */
    const handleRead = async (id) => {
        const alert = alerts.find((a) => a.id === id);
        if (!alert) return;

        // TEMP → remove only
        if (alert.isTemp) {
            const updated = alerts.filter((a) => a.id !== id);
            setAlerts(updated);
            saveAlerts(updated);
            return;
        }

        // already read
        if (!alert.unread) return;

        try {
            const res = await axiosLogin.put(`/alertnotify/${id}/read`);
            const { success } = res.data ?? {};

            if (!success) return errorNotify("Error");

            const updated = alerts.map((a) =>
                a.id === id ? { ...a, unread: false } : a
            );

            setAlerts(updated);
            saveAlerts(updated);

            successNotify("Marked as read");
        } catch (err) {
            console.error(err);
            errorNotify("Error");
        }
    };

    /* ---------------- OLD REMOVE (kept) ---------------- */
    // const handleRemove = (id) => {
    //     setAlerts((prev) => {
    //         const updated = prev.filter((a) => a.id !== id);
    //         saveAlerts(updated);
    //         return updated;
    //     });
    // };

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
            {/* HEADER */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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

                {[...alerts]
                    .sort((a, b) => {
                        if (a.unread !== b.unread) return b.unread - a.unread;
                        return b.id - a.id;
                    })
                    .map((alert) => {
                        const style = getAlertStyle(alert.type);

                        return (
                            <Box
                                key={alert.id}
                                onClick={() => handleRead(alert.id)}
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 3,
                                    bgcolor: alert.unread ? "#fff" : "#f1f5f9",
                                    opacity: alert.unread ? 1 : 0.7,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                    borderLeft: `5px solid ${style.color}`,
                                    position: "relative",
                                    transition: "0.2s",
                                    cursor: alert.unread ? "pointer" : "default",
                                }}
                            >
                                <Avatar sx={{ bgcolor: style.bg, color: style.color }}>
                                    {style.icon}
                                </Avatar>

                                <Box sx={{ flex: 1 }}>
                                    <Typography fontWeight={alert.unread ? 600 : 400}>
                                        {alert.title}
                                    </Typography>

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
                                            label={alert.unread ? "New" : "Read"}
                                            size="small"
                                            color={alert.unread ? "primary" : "default"}
                                            variant={alert.unread ? "filled" : "outlined"}
                                        />
                                    </Box>
                                </Box>

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