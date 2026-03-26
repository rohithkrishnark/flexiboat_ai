import React, { useState } from "react";
import {
    Box,
    Typography,
    Input,
    Avatar,
    IconButton,
} from "@mui/joy";

import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";

// 👨‍🎓 Students List
const students = [
    { id: 1, name: "Rahul Krishna", last: "Submitted assignment", online: true },
    { id: 2, name: "Anu Thomas", last: "Thank you sir", online: true },
    { id: 3, name: "Vishnu Raj", last: "Will update soon", online: false },
];

const FacultyChat = () => {
    const [selectedUser, setSelectedUser] = useState(students[0]);
    const [messages, setMessages] = useState([
        { text: "Good morning sir", sender: "other" },
        { text: "Good morning 👍", sender: "me" },
    ]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages([...messages, { text: input, sender: "me" }]);
        setInput("");
    };

    // 🔍 Search filter
    const filteredStudents = students.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ display: "flex", height: "85vh", bgcolor: "#f4f6f8" }}>

            {/* 🔥 LEFT PANEL (STUDENT LIST) */}
            <Box
                sx={{
                    width: "280px",
                    bgcolor: "#fff",
                    borderRight: "1px solid #eee",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header */}
                <Box sx={{ p: 2 }}>
                    <Typography fontWeight={700}>Students</Typography>

                    {/* 🔍 Search */}
                    <Box
                        sx={{
                            mt: 1,
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "#f1f1f1",
                            borderRadius: "20px",
                            px: 1,
                        }}
                    >
                        <SearchIcon fontSize="small" />
                        <Input
                            placeholder="Search student..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            variant="plain"
                            sx={{ ml: 1, fontSize: 13, background: 'none', border: 'none' }}
                        />
                    </Box>
                </Box>

                {/* Student List */}
                <Box sx={{ flex: 1, overflowY: "auto" }}>
                    {filteredStudents.map((user) => (
                        <Box
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                p: 1.5,
                                cursor: "pointer",
                                bgcolor:
                                    selectedUser.id === user.id ? "#eef2ff" : "transparent",
                                "&:hover": { bgcolor: "#f5f5f5" },
                            }}
                        >
                            {/* Avatar */}
                            <Box sx={{ position: "relative" }}>
                                <Avatar />
                                {user.online && (
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            bgcolor: "#22c55e",
                                            borderRadius: "50%",
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            border: "2px solid #fff",
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Info */}
                            <Box sx={{ flex: 1 }}>
                                <Typography fontSize={14} fontWeight={600}>
                                    {user.name}
                                </Typography>
                                <Typography fontSize={12} color="neutral.500">
                                    {user.last}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* 🔥 RIGHT PANEL (CHAT AREA) */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 2,
                        bgcolor: "#fff",
                        borderBottom: "1px solid #eee",
                    }}
                >
                    <Avatar />
                    <Box>
                        <Typography fontWeight={600}>
                            {selectedUser.name}
                        </Typography>
                        <Typography fontSize={12} color="neutral.500">
                            {selectedUser.online ? "Online" : "Offline"}
                        </Typography>
                    </Box>
                </Box>

                {/* Messages */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        bgcolor: "#f9fafb",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {messages.map((msg, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                justifyContent:
                                    msg.sender === "me" ? "flex-end" : "flex-start",
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor:
                                        msg.sender === "me" ? "#6366f1" : "#e5e7eb",
                                    color: msg.sender === "me" ? "#fff" : "#000",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "12px",
                                    maxWidth: "60%",
                                    fontSize: "13px",
                                }}
                            >
                                {msg.text}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Input */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1.5,
                        bgcolor: "#fff",
                        borderTop: "1px solid #eee",
                        gap: 1,
                    }}
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Reply to student..."
                        sx={{
                            flex: 1,
                            bgcolor: "#f1f1f1",
                            borderRadius: "20px",
                            px: 2,
                        }}
                    />

                    <IconButton
                        onClick={handleSend}
                        sx={{
                            bgcolor: "#6366f1",
                            color: "#fff",
                            "&:hover": { bgcolor: "#4f46e5" },
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default FacultyChat;