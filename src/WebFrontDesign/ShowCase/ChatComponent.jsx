import React from "react";
import { Box, Typography, Button } from "@mui/joy";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import '../../App.css'
import chatbot from '../../assets/chatbot.gif'
import { useNavigate } from "react-router-dom";
const ChatComponent = () => {

    const navigate = useNavigate()

    return (
        <Box
            id="chat"
            sx={{
                height: "100vh",
                background: "#0b0b0b",
                position: "relative",
                overflow: "hidden",
                color: "white"
            }}
        >

            {/* Outer Messages */}
            <Box className="msg msg1">Admission details for B.Tech?</Box>
            <Box className="msg msg2">Departments at Lourdes Matha?</Box>
            <Box className="msg msg3">Placement statistics</Box>
            <Box className="msg msg4">Faculty information</Box>
            <Box className="msg msg5">Campus facilities</Box>
            <Box className="msg msg6">Research programs</Box>
            <Box className="msg msg7">Scholarship availability</Box>
            <Box className="msg msg8">Student activities</Box>
            <Box className="msg msg9">Upcoming college events</Box>
            <Box className="msg msg10">Hostel accommodation</Box>

            {/* Near Chat Messages */}
            <Box className="msgNear near1">Welcome to Lourdes Matha College</Box>
            <Box className="msgNear near2">How can I assist you?</Box>
            <Box className="msgNear near3">Ask about courses or admissions</Box>
            <Box className="msgNear near4">Placement details available</Box>

            {/* Center Bot */}
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2
                }}
            >
                {/* <Box
                    sx={{
                        width: 130,
                        height: 130,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#4facfe,#00f2fe)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 0 50px rgba(0,200,255,0.7)",
                        animation: "botFloat 3s ease-in-out infinite"
                    }}
                >
                    <SmartToyIcon
                        sx={{
                            fontSize: 65,
                            animation: "botPulse 2s ease-in-out infinite"
                        }}
                    />


                </Box> */}

                <Box
                    sx={{
                        width: 140,
                        height: 140,
                        borderRadius: "50%",
                        // background: "linear-gradient(135deg,#4facfe,#00f2fe)",
                        background: 'white',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 0 60px rgba(0,200,255,0.7)",
                        animation: "botFloat 3s ease-in-out infinite"
                    }}
                >
                    <img
                        src={chatbot}
                        alt="FlexiBot"
                        style={{
                            width: "85px",
                            height: "85px",
                            animation: "botPulse 2s ease-in-out infinite"
                        }}
                    />
                </Box>

                <Typography level="h2" sx={{ mt: 5 }}>
                    Try our Chat Assistant
                </Typography>

                <Button
                    onClick={() => navigate('/chat')}
                    sx={{
                        mt: 2,
                        px: 4,
                        py: 1.5,
                        fontSize: 16,
                        borderRadius: 30
                    }}
                >
                    Start Chat
                </Button>
            </Box>

            <style>{`

        .msg, .msgNear{
            position:absolute;
            background:#1e1e1e;
            padding:12px 18px;
            border-radius:20px;
            font-size:14px;
            white-space:nowrap;
            box-shadow:0 10px 30px rgba(0,0,0,0.4);
        }

        /* WhatsApp tail */
        .msg::after, .msgNear::after{
            content:"";
            position:absolute;
            bottom:-6px;
            left:18px;
            width:12px;
            height:12px;
            background:#1e1e1e;
            transform:rotate(45deg);
        }

        /* Outer messages */
        .msg1{ top:10%; left:20%; }
        .msg2{ top:60%; left:15%; }
        .msg3{ top:12%; right:20%; }
        .msg4{ top:22%; right:25%; }
        .msg5{ bottom:25%; left:30%; }
        .msg6{ bottom:30%; right:10%; }
        .msg7{ bottom:15%; right:25%; }
        .msg8{ top:40%; left:5%; }
        .msg9{ top:45%; right:5%; }
        .msg10{ bottom:10%; left:40%; }

        /* Near messages */
        .near1{ top:25%; left:25%; }
        .near2{ top:20%; right:38%; }
        .near3{ top:45%; left:30%; }
        .near4{ top:50%; right:36%; }

      `}</style>

        </Box>
    );
};

export default ChatComponent;