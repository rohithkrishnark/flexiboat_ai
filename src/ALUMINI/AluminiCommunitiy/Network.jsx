import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Input,
    Avatar,
    Button,
} from "@mui/joy";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";

const mockUsers = [
    {
        id: 1,
        name: "Rohith Krishna",
        company: "Infosys",
        role: "Software Engineer",
        connected: false,
    },
    {
        id: 2,
        name: "Anjali Nair",
        company: "TCS",
        role: "Frontend Developer",
        connected: false,
    },
    {
        id: 3,
        name: "Arjun Menon",
        company: "Wipro",
        role: "Backend Developer",
        connected: false,
    },
    {
        id: 4,
        name: "Meera Pillai",
        company: "Google",
        role: "UI Engineer",
        connected: false,
    },
    {
        id: 4,
        name: "Meera Pillai",
        company: "Google",
        role: "UI Engineer",
        connected: false,
    },
    {
        id: 4,
        name: "Meera Pillai",
        company: "Google",
        role: "UI Engineer",
        connected: false,
    },
    {
        id: 4,
        name: "Meera Pillai",
        company: "Google",
        role: "UI Engineer",
        connected: false,
    },
    {
        id: 4,
        name: "Meera Pillai",
        company: "Google",
        role: "UI Engineer",
        connected: false,
    },
    {
        id: 4,
        name: "Meera Pillai",
        company: "Google",
        role: "UI Engineer",
        connected: false,
    },
];

const Network = () => {
    const [users, setUsers] = useState(mockUsers);
    const [search, setSearch] = useState("");

    // CONNECT / DISCONNECT
    const handleConnect = (id) => {
        const updated = users.map((user) =>
            user.id === id ? { ...user, connected: !user.connected } : user
        );
        setUsers(updated);
    };

    // SEARCH FILTER
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box
            sx={{
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#f4f6f8",
            }}
        >
            {/* 🔥 STICKY HEADER */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    bgcolor: "#f4f6f8",
                    p: 2,
                    borderBottom: "1px solid #e0e0e0",
                    backdropFilter: "blur(8px)",
                }}
            >
                <Typography level="h3" sx={{ mb: 1 }}>
                    My Network
                </Typography>

                <Input
                    startDecorator={<SearchIcon />}
                    placeholder="Search people..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ maxWidth: 400 }}
                />
            </Box>

            {/*  SCROLLABLE USER LIST */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,

                    /*  Hide scrollbar */
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE & Edge
                    "&::-webkit-scrollbar": {
                        display: "none", // Chrome, Safari
                    },
                }}
            >
                {filteredUsers.length === 0 ? (
                    <Typography>No users found</Typography>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(240px, 1fr))",
                            gap: 2,
                        }}
                    >
                        {filteredUsers.map((user) => (
                            <Card
                                key={user.id}
                                sx={{
                                    borderRadius: "14px",
                                    boxShadow: "sm",
                                    textAlign: "center",
                                    p: 2,
                                    transition: "0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "md",
                                    },
                                }}
                            >
                                <CardContent>
                                    {/* AVATAR */}
                                    <Avatar sx={{ mx: "auto", mb: 1 }} />

                                    {/* NAME */}
                                    <Typography level="title-md">
                                        {user.name}
                                    </Typography>

                                    {/* ROLE */}
                                    <Typography
                                        level="body-sm"
                                        sx={{ opacity: 0.7 }}
                                    >
                                        {user.role} @ {user.company}
                                    </Typography>

                                    {/* BUTTON */}
                                    <Button
                                        size="sm"
                                        startDecorator={
                                            user.connected ? (
                                                <CheckIcon />
                                            ) : (
                                                <PersonAddIcon />
                                            )
                                        }
                                        variant={user.connected ? "soft" : "solid"}
                                        sx={{ mt: 2 }}
                                        onClick={() => handleConnect(user.id)}
                                    >
                                        {user.connected ? "Connected" : "Connect"}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Network;