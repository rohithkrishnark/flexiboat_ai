import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";

import { getAuthUser, successNotify, warningNotify } from "../../constant/Constant";
import { axiosLogin } from "../../Axios/axios";

const PostJob = () => {
  const [tab, setTab] = useState(0);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState("");

  const user = getAuthUser();
  const alum_id = user?.alum_id;
  const alum_name = user?.alum_name;



  const [postData, setPostData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    eventDate: "",
  });

  const handleChange = (field, value) => {
    setPostData({ ...postData, [field]: value });
  };

  // 📸 MEDIA UPLOAD
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image")) setMediaType("image");
    else if (file.type.startsWith("video")) setMediaType("video");

    setMediaPreview(URL.createObjectURL(file));
    setMediaFile(file);
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setMediaFile(null);
    setMediaType("");
  };

  //  POST
  const handlePost = async () => {
    try {
      const types = ["job", "article", "event", "highlight"];
      const post_type = types[tab];

      //  VALIDATION BASED ON TAB
      if (post_type === "job") {
        if (!postData.title || !postData.company || !postData.location) {
          return warningNotify("Please fill all job fields");
        }
      }

      if (post_type === "article") {
        if (!postData.title || !postData.description) {
          return warningNotify("Article needs title & description");
        }
      }

      if (post_type === "event") {
        if (!postData.title || !postData.eventDate || !postData.location) {
          return warningNotify("Event requires name, date & location");
        }
      }

      if (post_type === "highlight") {
        if (!postData.description && !mediaFile) {
          return warningNotify("Add description or media for highlight");
        }
      }

      //  API CALL
      const res = await axiosLogin.post("/alumini/posts/create", {
        user_id: alum_id,
        post_type,
        title: postData.title,
        description: postData.description,
        company: postData.company,
        location: postData.location,
        salary: postData.salary,
        event_date: post_type === "event" ? postData.eventDate : null,
        alum_name:alum_name
      });

      if (res.data.success) {
        const postId = res.data?.data?.postId;

        // Upload Media
        if (mediaFile) {
          const formData = new FormData();
          formData.append("media", mediaFile);
          formData.append("postId", postId);
          formData.append("user_id", alum_id);
          formData.append("type", post_type);

          await axiosLogin.post("/alumini/posts/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        successNotify("Posted successfully ");

        // RESET
        setPostData({
          title: "",
          company: "",
          location: "",
          salary: "",
          description: "",
          eventDate: "",
        });

        handleRemoveMedia();
      }

    } catch (err) {
      warningNotify("Error posting");
    } finally {
      setPostData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        eventDate: "",
      });

    }
  };

  return (
    <Box sx={container}>
      <Box sx={card}>

        {/* HEADER */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar />
          <Typography fontWeight={600}>Create Post</Typography>
        </Box>

        {/* TABS */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab icon={<WorkIcon />} label="Job" />
          <Tab icon={<ArticleIcon />} label="Article" />
          <Tab icon={<EventIcon />} label="Event" />
          <Tab icon={<StarIcon />} label="Highlight" />
        </Tabs>

        {/* INPUTS */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

          <TextField
            placeholder="Title"
            value={postData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
          />

          {tab === 0 && (
            <>
              <TextField placeholder="Company" onChange={(e) => handleChange("company", e.target.value)} />
              {/* <TextField placeholder="Location" onChange={(e) => handleChange("location", e.target.value)} /> */}
              <TextField placeholder="Salary" onChange={(e) => handleChange("salary", e.target.value)} />
            </>
          )}


          {(tab === 0 || tab === 2) && (
            <>
              <TextField placeholder="Location" onChange={(e) => handleChange("location", e.target.value)} />
            </>
          )}

          {tab === 2 && (
            <TextField
              type="date"
              onChange={(e) => handleChange("eventDate", e.target.value)}
            />
          )}

          <TextField
            multiline
            rows={3}
            placeholder="Write description..."
            value={postData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Box>

        {/* MEDIA PREVIEW */}
        {mediaPreview && (
          <Box sx={{ position: "relative" }}>
            {mediaType === "image" ? (
              <img src={mediaPreview} style={previewStyle} />
            ) : (
              <video src={mediaPreview} controls style={previewStyle} />
            )}

            <IconButton onClick={handleRemoveMedia} sx={closeBtn}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* ACTIONS */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button component="label" startIcon={<ImageIcon />} sx={uploadBtn}>
              Image
              <input hidden type="file" accept="image/*" onChange={handleMediaUpload} />
            </Button>

            <Button component="label" startIcon={<VideoLibraryIcon />} sx={uploadBtn}>
              Video
              <input hidden type="file" accept="video/*" onChange={handleMediaUpload} />
            </Button>
          </Box>

          <Button sx={postBtn} onClick={handlePost}>
            Post
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

/* STYLES */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "#f4f6fb",
};

const card = {
  width: "500px",
  bgcolor: "#fff",
  p: 3,
  borderRadius: 4,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const previewStyle = {
  width: "100%",
  maxHeight: "200px",
  objectFit: "cover",
  borderRadius: "12px",
};

const closeBtn = {
  position: "absolute",
  top: 10,
  right: 10,
  bgcolor: "#000",
  color: "#fff",
};

const uploadBtn = {
  borderRadius: "20px",
  textTransform: "none",
  border: "1px solid #ddd",
};

const postBtn = {
  borderRadius: "20px",
  px: 4,
  fontWeight: 600,
  textTransform: "none",
  background: "linear-gradient(45deg, #6366f1, #ec4899)",
  color: "#fff",
};

export default PostJob;