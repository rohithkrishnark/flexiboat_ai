import React from "react";
import { Box, Typography, Link } from "@mui/joy";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <Box
            sx={{
                background: "#0b0b0b",
                borderTop: "1px solid #222",
                padding: "50px 10%",
                color: "white"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "40px"
                }}
            >
                {/* Brand */}
                <Box>
                    <Typography
                        level="h3"
                        sx={{
                            color: "#9d4edd",
                            marginBottom: "10px"
                        }}
                    >
                        FlexiBot
                    </Typography>

                    <Typography sx={{ maxWidth: "300px", color: "#aaa" }}>
                        AI powered chatbot platform helping institutions and businesses
                        automate communication and provide instant assistance.
                    </Typography>
                </Box>

                {/* Quick Links */}
                <Box>
                    <Typography level="title-lg" sx={{ marginBottom: "10px"  ,color:'white'}}>
                        Quick Links
                    </Typography>

                    <Typography><Link href="/" sx={{ color: "#aaa" }}>Home</Link></Typography>
                    <Typography><Link href="/about" sx={{ color: "#aaa" }}>About</Link></Typography>
                    <Typography><Link href="/contact" sx={{ color: "#aaa" }}>Contact</Link></Typography>
                </Box>

                {/* Contact */}
                <Box>
                    <Typography level="title-lg" sx={{ marginBottom: "10px" ,color:'white' }}>
                        Contact
                    </Typography>

                    <Typography sx={{ color: "#aaa" }}>
                        Lourdes Matha College of Science and Technology
                    </Typography>

                    <Typography sx={{ color: "#aaa" }}>
                        Email: flexibot.ai@gmail.com
                    </Typography>

                    <Typography sx={{ color: "#aaa" }}>
                        Phone: +91 9876543210
                    </Typography>
                </Box>

                {/* Social */}
                <Box>
                    <Typography level="title-lg" sx={{ marginBottom: "10px" ,color:'white'}}>
                        Follow Us
                    </Typography>

                    <Box sx={{ display: "flex", gap: "15px", fontSize: "22px" }}>
                        <FaGithub style={{ cursor: "pointer" }} />
                        <FaLinkedin style={{ cursor: "pointer" }} />
                        <FaInstagram style={{ cursor: "pointer" }} />
                    </Box>
                </Box>
            </Box>

            {/* Bottom */}
            <Box
                sx={{
                    borderTop: "1px solid #222",
                    marginTop: "40px",
                    paddingTop: "20px",
                    textAlign: "center",
                    color: "#777"
                }}
            >
                <Typography>
                    © {new Date().getFullYear()} FlexiBot. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;