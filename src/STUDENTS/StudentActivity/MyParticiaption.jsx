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
import CloseIcon from "@mui/icons-material/Close";
import { getAuthUser, successNotify, warningNotify } from "../../constant/Constant";
import { axiosLogin } from "../../Axios/axios";
import GlobalLoader from "../../Component/GlobalLoader";

const MyParticipation = () => {
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null); // store file
  const [mediaPreview, setMediaPreview] = useState(null); // preview image
  const [loading, setLoading] = useState(false);

  const user = getAuthUser();
  const std_id = user?.user_id;
  const maxCaptionLength = 100;
  const maxDescLength = 500;

  // Handle single image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setMediaFile(null);
    setMediaPreview(null);
  };

  // Submit
  const handlePost = async () => {
    if (!caption && !description && !mediaFile) {
      alert("Add activity details!");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create activity
      const createResponse = await axiosLogin.post("/student/activity/create", {
        caption,
        description,
        student_id: std_id
      });

      if (createResponse.data.success) {
        const activityId = createResponse.data.data.activityId;

        // Step 2: Upload media if exists
        if (mediaFile) {
          const formData = new FormData();
          formData.append("media", mediaFile);
          formData.append("activity_id", activityId);
          formData.append("student_id", std_id);

          await axiosLogin.post("/student/activity/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        }

        successNotify("Activity created successfully!");
        setCaption("");
        setDescription("");
        setMediaFile(null);
        setMediaPreview(null);

      } else {
        warningNotify("Failed to create activity");
      }

    } catch (err) {
      console.error(err);
      warningNotify("Something went wrong");
    } finally {
      setLoading(false);
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
      {loading && <GlobalLoader text="Posting Activity Please Wait..." />}
      <Box
        sx={{
          width: "550px",
          bgcolor: "#fff",
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
          <Typography fontWeight={600}>Add My Activity</Typography>
        </Box>

        {/* CAPTION */}
        <Box sx={boxStyle}>
          <Typography fontSize={12} color="gray">Caption</Typography>
          <TextField
            placeholder="Short title..."
            value={caption}
            onChange={(e) => {
              if (e.target.value.length <= maxCaptionLength) setCaption(e.target.value);
            }}
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
          />
          <Typography fontSize={11} textAlign="right" color="gray">
            {caption.length}/{maxCaptionLength}
          </Typography>
        </Box>

        {/* DESCRIPTION */}
        <Box sx={boxStyle}>
          <Typography fontSize={12} color="gray">Description</Typography>
          <TextField
            placeholder="Describe your activity..."
            multiline
            rows={3}
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= maxDescLength) setDescription(e.target.value);
            }}
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
          />
          <Typography fontSize={11} textAlign="right" color="gray">
            {description.length}/{maxDescLength}
          </Typography>
        </Box>

        {/* IMAGE PREVIEW */}
        {mediaPreview && (
          <Box sx={{ position: "relative", width: '100%', height: 100 }}>
            <img
              src={mediaPreview}
              alt="preview"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
            />
            <IconButton
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                bgcolor: "#000",
                color: "#fff",
                width: 24,
                height: 24,
              }}
            >
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        )}

        {/* ACTIONS */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button component="label" startIcon={<ImageIcon />} sx={btnStyle}>
            Add Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>

          <Button variant="contained" onClick={handlePost} sx={gradientBtn}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// Styles
const boxStyle = { bgcolor: "#f9fafb", borderRadius: 2, p: 1, border: "1px solid #eee" };
const btnStyle = { textTransform: "none", color: "#555", border: "1px solid #ddd", borderRadius: "20px", px: 2 };
const gradientBtn = { borderRadius: "20px", px: 4, textTransform: "none", fontWeight: 600, background: "linear-gradient(45deg, #6366f1, #ec4899)", boxShadow: "0 4px 15px rgba(99,102,241,0.3)" };

export default MyParticipation;