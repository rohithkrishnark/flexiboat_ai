import React, { useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    TextField,
    IconButton,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { getAuthUser, successNotify, warningNotify } from "../../constant/Constant";
import { axiosLogin } from "../../Axios/axios";
import GlobalLoader from "../../Component/GlobalLoader";
import { useQueryClient } from "@tanstack/react-query";

const StudentPost = () => {
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState("");
    const [loading, setLoading] = useState(false)
    const [mediaFile, setMediaFile] = useState(null); // store file
    const [mediaPreview, setMediaPreview] = useState(null); // store preview URL

    const queryClient = useQueryClient();

    const user = getAuthUser();
    const std_id = user?.user_id

    const maxCaptionLength = 100;
    const maxDescLength = 500;

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type.startsWith("image")) {
            setMediaType("image");
        } else if (file.type.startsWith("video")) {
            setMediaType("video");
        }

        setMedia(URL.createObjectURL(file));
        setMediaFile(file); // <--- keep actual file
        setMediaPreview(URL.createObjectURL(file)); // <--- for preview only
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        setMediaType("");
    };


    const handlePost = async () => {
        if (!caption && !description && !media) {
            alert("Add something to post!");
            return;
        }

        try {
            setLoading(true)
            // Step 1: Create post without media
            const createResponse = await axiosLogin.post("/student/create", {
                caption,
                description,
                std_id,
            });

            if (createResponse.data.success) {
                const postId = createResponse.data.data.postId;

                console.log({ postId });


                // Step 2: Upload media if available
                if (mediaFile) {
                    const formData = new FormData();
                    formData.append("media", mediaFile); // actual file
                    formData.append("postId", postId);
                    formData.append("std_id", std_id); // pass student id

                    await axiosLogin.post("/student/upload", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }
                successNotify("Post created successfully!");
                queryClient.invalidateQueries({ queryKey: ["studentmedia"] })
                setCaption("");
                setDescription("");
                setMedia(null);
                setMediaPreview(null)
                setMediaFile(null)
            } else {
                warningNotify("Failed to create post");
            }
        } catch (err) {
            console.error(err);
            warningNotify("Something went wrong");
        } finally {
            setLoading(false)
        }
    };


    return (
        <Box
            sx={{
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f5f7fb",
            }}
        >
            {loading && <GlobalLoader text="Posting Please Wait..." />}
            <Box
                sx={{
                    width: "520px",
                    bgcolor: "#ffffff",
                    borderRadius: 4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {/* HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar />
                    <Typography fontWeight={600} fontSize={16}>
                        Create Post
                    </Typography>
                </Box>

                {/* CAPTION */}
                <Box sx={boxStyle}>
                    <Typography fontSize={12} color="gray">Caption</Typography>

                    <TextField
                        placeholder="Short caption..."
                        value={caption}
                        onChange={(e) => {
                            if (e.target.value.length <= maxCaptionLength) {
                                setCaption(e.target.value);
                            }
                        }}
                        fullWidth
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                    />

                    <Typography fontSize={11} color="gray" textAlign="right">
                        {caption.length}/{maxCaptionLength}
                    </Typography>
                </Box>

                {/* DESCRIPTION */}
                <Box sx={boxStyle}>
                    <Typography fontSize={12} color="gray">Description</Typography>

                    <TextField
                        placeholder="Write detailed description..."
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => {
                            if (e.target.value.length <= maxDescLength) {
                                setDescription(e.target.value);
                            }
                        }}
                        fullWidth
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <IconButton size="small">
                            <InsertEmoticonIcon fontSize="small" />
                        </IconButton>

                        <Typography fontSize={11} color="gray">
                            {description.length}/{maxDescLength}
                        </Typography>
                    </Box>
                </Box>

                {/* MEDIA */}
                {mediaPreview && (
                    <Box sx={{ position: "relative" }}>
                        {mediaType === "image" ? (
                            <img
                                src={mediaPreview}
                                alt="preview"
                                style={{ width: "100%", borderRadius: "12px", maxHeight: "170px", objectFit: "contain" }}
                            />
                        ) : (
                            <video
                                src={mediaPreview}
                                controls
                                style={{ width: "100%", borderRadius: "12px", maxHeight: "170px", objectFit: "contain" }}
                            />
                        )}

                        <IconButton
                            onClick={() => { setMediaPreview(null); setMediaFile(null); setMediaType(""); }}
                            sx={{ position: "absolute", top: 10, right: 10, bgcolor: "#000", color: "#fff" }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}

                {/* ACTIONS */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button component="label" startIcon={<ImageIcon />} sx={btnStyle}>
                            Image
                            <input type="file" hidden accept="image/*" onChange={handleMediaUpload} />
                        </Button>

                        <Button component="label" startIcon={<VideoLibraryIcon />} sx={btnStyle}>
                            Video
                            <input type="file" hidden accept="video/*" onChange={handleMediaUpload} />
                        </Button>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handlePost}
                        sx={gradientBtn}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

// Styles
const boxStyle = {
    bgcolor: "#f9fafb",
    borderRadius: 2,
    p: 1,
    border: "1px solid #eee",
};

const btnStyle = {
    textTransform: "none",
    color: "#555",
    border: "1px solid #ddd",
    borderRadius: "20px",
    px: 2,
};

const gradientBtn = {
    borderRadius: "20px",
    px: 4,
    textTransform: "none",
    fontWeight: 600,
    background: "linear-gradient(45deg, #6366f1, #ec4899)",
    boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
};

export default StudentPost;