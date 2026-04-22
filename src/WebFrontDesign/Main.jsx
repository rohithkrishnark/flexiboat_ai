import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/joy";
// import Navbar from "./Component/Navbar";
import ai from "../../src/assets/newai.gif";
import brain from "../../src/assets/newbrain.png";
import loutmatha from "../../src/assets/loutmatha.png";


function Main() {


    const texts = [
        "Get instant answers, in-depth academic guidance, and concept explanations powered by advanced AI, designed to support learning.",

        "Upload your academic documents, notes, or study materials and receive smart summaries, insights, and explanations within seconds.",

        "Ask questions, explore complex topics, clarify doubts, and accelerate your learning journey with an intelligent academic assistant.",

        "FlexiBot acts as your personal academic companion, helping you study smarter, stay organized, and achieve better academic results.",
    ];

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % texts.length);
                setFade(true);
            }, 500);

        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleNavScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
            });
        }
    };




    return (
        <Box id="home" sx={{ height: "100vh", bgcolor: "#000000" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: { xs: 2, md: 8 },
                    py: { xs: 6, md: 10 },
                    flexDirection: { xs: "column", md: "row" },
                    gap: 5,
                    height: '60vh'
                }}
            >
                {/* LEFT SIDE */}
                <Box sx={{ maxWidth: 600 }}>

                    <Typography
                        level="body-sm"
                        sx={{
                            color: "#7c8cff",
                            fontWeight: 600,
                            mb: 1,
                            letterSpacing: 1,
                        }}
                    >
                        Academic Assistant
                    </Typography>

                    <Typography
                        level="h1"
                        sx={{
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            fontWeight: 700,
                            color: "white",
                            lineHeight: 1.2,
                        }}
                    >
                        Smart learning
                        <br />
                        powered by{" "}
                        <span style={{ color: "#6c7cff" }}>FLEXIBOT</span>
                    </Typography>

                    {/* TEXT ROTATION */}
                    <Typography
                        level="body-lg"
                        sx={{
                            mt: 3,
                            color: "#cfcfd4",
                            minHeight: 80,
                            opacity: fade ? 1 : 0,
                            transition: "opacity 0.5s ease",
                        }}
                    >
                        {texts[index]}
                    </Typography>

                    <Button
                        onClick={(e) => handleNavScroll(e, "chat")}
                        size="lg"
                        sx={{
                            mt: 4,
                            bgcolor: "#6c7cff",
                            "&:hover": { bgcolor: "#5a6bff" },
                        }}
                    >
                        Explore More
                    </Button>

                </Box>

                {/* RIGHT SIDE */}
                <Box>
                    <img
                        src={loutmatha}
                        alt="loutmatha"
                        style={{
                            width: "100%",
                            maxWidth: "100%",
                        }}
                    />
                </Box>
            </Box>

            {/* FEATURES SECTION */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr 1fr",
                    },
                    gap: 4,
                    px: { xs: 2, md: 8 },
                    pb: 8,
                }}
            >
                <Card
                    sx={{
                        bgcolor: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(108,124,255,0.4)",
                        color: "white",
                        borderRadius: "16px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-8px)",
                            border: "1px solid #6c7cff",
                            boxShadow: "0px 10px 40px rgba(108,124,255,0.25)",
                        },
                    }}
                >
                    <CardContent>
                        <Typography
                            level="title-lg"
                            sx={{ color: "#6c7cff", mb: 1 }}
                        >
                            Academic Knowledge Base
                        </Typography>

                        <Typography level="body-md" sx={{ color: "#cfcfd4" }}>
                            Store and organize academic materials, lecture notes,
                            research documents, and institutional policies in a
                            centralized AI-powered knowledge system that is easy
                            to search and access.
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        bgcolor: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(108,124,255,0.4)",
                        color: "white",
                        borderRadius: "16px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-8px)",
                            border: "1px solid #6c7cff",
                            boxShadow: "0px 10px 40px rgba(108,124,255,0.25)",
                        },
                    }}
                >
                    <CardContent>
                        <Typography
                            level="title-lg"
                            sx={{ color: "#6c7cff", mb: 1 }}
                        >
                            Intelligent Document Processing
                        </Typography>

                        <Typography level="body-md" sx={{ color: "#cfcfd4" }}>
                            Upload notes, reports, PDFs, or academic resources.
                            FlexiBot automatically analyzes the content and
                            provides summaries, insights, and contextual
                            explanations to support deeper understanding.
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        bgcolor: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(108,124,255,0.4)",
                        color: "white",
                        borderRadius: "16px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-8px)",
                            border: "1px solid #6c7cff",
                            boxShadow: "0px 10px 40px rgba(108,124,255,0.25)",
                        },
                    }}
                >
                    <CardContent>
                        <Typography
                            level="title-lg"
                            sx={{ color: "#6c7cff", mb: 1 }}
                        >
                            AI Academic Assistant
                        </Typography>

                        <Typography level="body-md" sx={{ color: "#cfcfd4" }}>
                            Ask questions about subjects, concepts, policies,
                            or academic procedures. FlexiBot responds instantly
                            with accurate explanations and contextual knowledge
                            from your uploaded academic data.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default Main;