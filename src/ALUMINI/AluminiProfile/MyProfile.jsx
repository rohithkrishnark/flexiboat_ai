import React from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    Card,
    CardContent,
    Divider,
    Chip,
} from "@mui/joy";

const MyProfile = () => {
    return (
        <Box sx={{ bgcolor: "#dedfe0", minHeight: "100vh", color: "#fff" }}>

            {/* COVER IMAGE */}
            <Box
                sx={{
                    height: 200,
                    background:
                        "linear-gradient(90deg, #1E3A8A, #2563EB, #1D4ED8)",
                }}
            />

            {/* PROFILE SECTION */}
            <Box sx={{ px: 4, mt: -8 }}>
                <Avatar
                    src="https://i.pravatar.cc/150?img=12"
                    sx={{ width: 120, height: 120, border: "4px solid #cecfd2" }}
                />

                <Typography level="h3" sx={{ mt: 2 }}>
                    Rohith Krishna
                </Typography>

                <Typography level="body-md" sx={{ color: "#121111" }}>
                    Software Developer at LG Life's Good
                </Typography>

                <Typography level="body-sm" sx={{ color: "#000000", mt: 1 }}>
                    Kerala, India
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <Button color="primary">Connect</Button>
                    <Button variant="outlined">Message</Button>
                </Box>
            </Box>

            {/* MAIN CONTENT */}
            <Box sx={{ display: "flex", gap: 3, px: 4, mt: 4 }}>

                {/* LEFT SECTION */}
                <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 3 }}>

                    {/* ABOUT */}
                    <Card sx={{ bgcolor: "#ecedee" }}>
                        <CardContent>
                            <Typography level="h5">About</Typography>
                            <Typography sx={{ mt: 1, color: "#000000" }}>
                                Passionate software developer with experience in building modern web applications using React, Node.js, and MongoDB. Loves creating scalable and user-friendly products.
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* EXPERIENCE */}
                    <Card sx={{ bgcolor: "#ecedee" }}>
                        <CardContent>
                            <Typography level="h5">Experience</Typography>

                            <Box sx={{ mt: 2 }}>
                                <Typography fontWeight="bold">
                                    Software Developer
                                </Typography>
                                <Typography sx={{ color: "#0e0d0d" }}>
                                    LG Life's Good • Full-time
                                </Typography>
                                <Typography sx={{ color: "#161515", fontSize: 14 }}>
                                    2024 - Present
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography fontWeight="bold">
                                    Intern Developer
                                </Typography>
                                <Typography sx={{ color: "#070707" }}>
                                    Startup XYZ
                                </Typography>
                                <Typography sx={{ color: "#000000", fontSize: 14 }}>
                                    2023 - 2024
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* POSTS */}
                    <Card sx={{ bgcolor: "#ecedee" }}>
                        <CardContent>
                            <Typography level="h5">Posts</Typography>

                            <Box sx={{ mt: 2 }}>
                                <Typography fontWeight="bold">
                                    🚀 Excited to join LG Life's Good!
                                </Typography>
                                <Typography sx={{ color: "#040404", mt: 1 }}>
                                    Looking forward to building amazing products and growing as a developer.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography fontWeight="bold">
                                    💡 Built a Real Estate App
                                </Typography>
                                <Typography sx={{ color: "#0a0a0a", mt: 1 }}>
                                    Created a full-stack MERN application with role-based dashboards.
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* RIGHT SECTION */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>

                    {/* SKILLS */}
                    <Card sx={{ bgcolor: "#ecedee" }}>
                        <CardContent>
                            <Typography level="h5">Skills</Typography>

                            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                                <Chip>React</Chip>
                                <Chip>Node.js</Chip>
                                <Chip>MongoDB</Chip>
                                <Chip>JavaScript</Chip>
                                <Chip>Express</Chip>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* EDUCATION */}
                    <Card sx={{ bgcolor: "#ecedee" }}>
                        <CardContent>
                            <Typography level="h5">Education</Typography>

                            <Typography sx={{ mt: 2 }}>
                                B.Tech in Computer Science
                            </Typography>
                            <Typography sx={{ color: "#000000" }}>
                                Your College Name
                            </Typography>
                            <Typography sx={{ color: "#000000", fontSize: 14 }}>
                                2020 - 2024
                            </Typography>
                        </CardContent>
                    </Card>

                </Box>
            </Box>
        </Box>
    );
};

export default MyProfile;