import React from "react";
import { Box, IconButton, Textarea, Typography } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({
    input,
    loading,
    handleInput,
    sendMessage,
    textareaRef,
}) => {
    return (
        <Box sx={{ p: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#1E1F20",
                    borderRadius: "30px",
                    p: "8px 12px",
                    border: "1px solid #3c4043",
                }}
            >
                <Textarea
                    minRows={1}
                    maxRows={5}
                    placeholder="Ask anything..."
                    value={input}
                    disabled={loading}
                    onChange={handleInput}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    variant="plain"
                    sx={{
                        flex: 1,
                        bgcolor: "transparent",
                        color: "#E3E3E3",
                        fontSize: "14px",

                        "--Textarea-focusedHighlight": "transparent",
                        "--Textarea-hoverBg": "transparent",

                        border: "none",
                        boxShadow: "none",

                        "&:hover": {
                            backgroundColor: "transparent",
                        },

                        "&:before": { display: "none" },
                        "&:after": { display: "none" },

                        "& textarea": {
                            color: "#E3E3E3",                 // 🔥 FIX
                            WebkitTextFillColor: "#E3E3E3",   // 🔥 FIX
                            resize: "none",
                            outline: "none",
                            boxShadow: "none",
                        },
                    }}
                    ref={textareaRef}
                />

                <IconButton
                    disabled={!input.trim() || loading}
                    onClick={sendMessage}
                    sx={{
                        bgcolor: loading
                            ? "#444"
                            : input.trim()
                                ? "#A8C7FA"
                                : "transparent",
                        color: loading
                            ? "#999"
                            : input.trim()
                                ? "#000"
                                : "#C4C7C5",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        transition: "0.3s",
                        "&:hover": {
                            bgcolor: loading ? "#444" : "#8ab4f8",
                        },
                    }}
                >
                    {loading ? (
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                border: "2px solid #999",
                                borderTop: "2px solid transparent",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                    ) : (
                        <SendIcon />
                    )}
                </IconButton>
            </Box>

            <Typography level="body-xs" sx={{ mt: 1, textAlign: "center" }}>
                FLEXIBOT can make mistakes.
            </Typography>

            {/* spinner animation */}
            <style>
                {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
            </style>
        </Box>

    );
};

export default ChatInput;