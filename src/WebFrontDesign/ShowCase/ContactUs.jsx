import React, { useState } from "react";    
import { Box, Typography, Input, Textarea, Button } from "@mui/joy";
import contactus from "../../assets/contactus.png";
import { successNotify, warningNotify } from "../../constant/Constant";
import { axiosLogin } from "../../Axios/axios";

const ContactUs = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const { name, email, message } = form;

        //  VALIDATION
        if (!name || !email || !message) {
            warningNotify("Name, Email and Message are required");
            return;
        }

        try {
            const res = await axiosLogin.post("/user/contact", form);
            const { message: resMessage, success } = res.data ?? {};
            // FIXED SUCCESS CHECK (backend usually returns true/1, not 0)
            if (success) {
                successNotify(resMessage || "Message sent successfully");
            } else {
                warningNotify(resMessage || "Failed to send message");
                return;
            }

            //  RESET FORM
            setForm({
                name: "",
                email: "",
                mobile: "",
                address: "",
                message: ""
            });

        } catch (err) {
            console.log(err);
            warningNotify("Something went wrong");
        }
    };
    return (
        <Box
            id="contactus"
            sx={{
                minHeight: "100vh",
                background: "#0b0b0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "80px 8%",
                gap: "80px",
                flexWrap: "wrap"
            }}
        >
            {/* LEFT SIDE */}
            <Box sx={{ flex: 1, minWidth: "400px" }}>
                <Typography sx={{ color: "#9d4edd", fontSize: "18px", letterSpacing: "2px", mb: 2 }}>
                    CONTACT FLEXIBOT
                </Typography>

                <Typography level="h1" sx={{ color: "white", fontSize: "52px", mb: 3, lineHeight: 1.2 }}>
                    Let's Build Something <br /> Intelligent Together
                </Typography>

                <Typography sx={{ color: "#aaa", fontSize: "18px", lineHeight: 1.7, maxWidth: "520px", mb: 1 }}>
                    Have questions about FlexiBot or need help integrating AI into your workflow?
                    Our team is ready to assist you.
                </Typography>

                <img
                    src={contactus}
                    alt="contact illustration"
                    style={{
                        width: "200px",
                        maxWidth: "100%",
                        opacity: 0.9
                    }}
                />
            </Box>

            {/* RIGHT SIDE FORM */}
            <Box
                sx={{
                    flex: 1,
                    minWidth: "400px",
                    maxWidth: "500px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}
            >
                <Typography level="h2" sx={{ color: "white", mb: 2 }}>
                    Send us a Message
                </Typography>

                <Input
                    placeholder="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="contactInput"
                />

                <Input
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="contactInput"
                />

                <Input
                    placeholder="Mobile Number"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="contactInput"
                />

                <Input
                    placeholder="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="contactInput"
                />

                <Textarea
                    minRows={4}
                    placeholder="Your Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="contactInput"
                />

                <Button
                    onClick={handleSubmit}
                    sx={{
                        mt: 2,
                        padding: "14px",
                        fontSize: "16px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg,#6c3df4,#9d4edd)",
                        "&:hover": {
                            background: "linear-gradient(135deg,#7b4df5,#b35cff)"
                        }
                    }}
                >
                    Send Message
                </Button>
            </Box>

            {/* STYLE (UNCHANGED) */}
            <style>{`
                .contactInput{
                    background:#0b0b0b !important;
                    border:1px solid #2a2a2a !important;
                    border-radius:10px !important;
                }

                .contactInput input,
                .contactInput textarea{
                    color:white !important;
                }

                .contactInput input::placeholder,
                .contactInput textarea::placeholder{
                    color:#888 !important;
                }

                .contactInput:focus-within{
                    border:1px solid #8b5cf6 !important;
                    box-shadow:0 0 12px rgba(139,92,246,0.5);
                }
            `}</style>
        </Box>
    );
};

export default ContactUs;