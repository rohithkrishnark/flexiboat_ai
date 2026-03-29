import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  Textarea,
  Button,
  Card,
  CardContent,
  Select,
  Option,
} from "@mui/joy";

import ImageIcon from "@mui/icons-material/Image";
import EventIcon from "@mui/icons-material/Event";

import {
  axiosLogin,
} from "../../Axios/axios";

import {
  errorNotify,
  getAuthUser,
  successNotify,
  warningNotify,
} from "../../constant/Constant";

const EventDetail = () => {
  const [formData, setFormData] = useState({
    eventType: "",
    title: "",
    description: "",
    company: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    registrationLink: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const user = getAuthUser();
  const alum_id = user?.alum_id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!formData.eventType) return alert("Please select event type");
    if (!formData.title.trim()) return alert("Title is required");
    if (!formData.description.trim()) return alert("Description is required");
    if (!formData.company.trim()) return alert("Company name is required");
    if (!formData.date) return alert("Please select event date");
    if (!formData.startTime || !formData.endTime)
      return alert("Start and End time are required");
    if (formData.startTime >= formData.endTime)
      return alert("End time must be greater than start time");
    if (!formData.location) return alert("Please select location");

    const payload = {
      user_id: user?.alum_id,
      event_type: formData.eventType,
      title: formData.title,
      description: formData.description,
      company: formData.company,
      event_date: formData.date,
      start_time: formData.startTime,
      end_time: formData.endTime,
      location: formData.location,
      registration_link: formData.registrationLink,
      status: "upcoming",
    };

    try {
      const res = await axiosLogin.post("/alumini/events/create", payload);
      const data = (await res.data) ?? {};

      if (data.success !== 1) {
        return errorNotify(data.message || "Failed to create event");
      }

      const eventId = data.eventId;

      if (image) {
        const formDataImg = new FormData();
        formDataImg.append("media", image);
        formDataImg.append("eventId", eventId);
        formDataImg.append("user_id", alum_id);

        await axiosLogin.post("/alumini/event/upload", formDataImg, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      successNotify("Event created successfully 🚀");

      setFormData({
        eventType: "",
        title: "",
        description: "",
        company: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        registrationLink: "",
      });

      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      warningNotify("Something went wrong!");
    }
  };

  return (
    <Box sx={container}>
      <Card sx={card}>

        {/* HEADER */}
        <Box sx={header}>
          <Box sx={iconWrap}>
            <EventIcon sx={{ color: "#fff" }} />
          </Box>

          <Box>
            <Typography sx={title}>Create Event</Typography>
            <Typography sx={subTitle}>
              Job fairs • Webinars • Workshops • Mentorship
            </Typography>
          </Box>
        </Box>

        {/* IMAGE UPLOAD */}
        <Box sx={uploadBox}>
          <Button component="label" sx={uploadBtn}>
            <ImageIcon />
            Upload Event Banner
            <input type="file" hidden onChange={handleImage} />
          </Button>

          {preview && (
            <Box sx={previewBox}>
              <img src={preview} style={previewStyle} />
            </Box>
          )}
        </Box>

        {/* FORM */}
        <Box sx={grid}>
          <Select
            placeholder="Event Type"
            value={formData.eventType}
            onChange={(e, val) => handleSelect("eventType", val)}
          >
            <Option value="Job Fair">Job Fair</Option>
            <Option value="Hiring Drive">Hiring Drive</Option>
            <Option value="Webinar">Webinar</Option>
            <Option value="Workshop">Workshop</Option>
            <Option value="Mentorship">Mentorship</Option>
          </Select>

          <Input
            placeholder="Company Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />

          <Input
            placeholder="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <Select
            placeholder="Location"
            value={formData.location}
            onChange={(e, val) => handleSelect("location", val)}
          >
            <Option value="Online">Online</Option>
            <Option value="Offline">Offline</Option>
          </Select>

          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
            <Input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </Box>

          <Input
            placeholder="Registration Link"
            name="registrationLink"
            value={formData.registrationLink}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <Textarea
            placeholder="Write event description..."
            name="description"
            value={formData.description}
            onChange={handleChange}
            minRows={4}
            sx={{ gridColumn: "span 2" }}
          />
        </Box>

        {/* SUBMIT */}
        <Button sx={submitBtn} fullWidth onClick={handleSubmit}>
          Publish Event 🚀
        </Button>

      </Card>
    </Box>
  );
};

export default EventDetail;

/* ---------------- STYLES (ONLY UI UPGRADE) ---------------- */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #eef2f6, #f7f8fc)",
  p: 2,
};

const card = {
  width: "100%",
  maxWidth: 900,
  p: 3,
  borderRadius: "22px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  backdropFilter: "blur(10px)",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const iconWrap = {
  width: 45,
  height: 45,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(45deg, #6366f1, #ec4899)",
};

const title = {
  fontSize: 20,
  fontWeight: 700,
};

const subTitle = {
  fontSize: 12,
  color: "gray",
};

const uploadBox = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

const uploadBtn = {
  borderRadius: "12px",
  textTransform: "none",
  border: "1px dashed #bbb",
  py: 2,
  display: "flex",
  gap: 1,
};

const previewBox = {
  borderRadius: "14px",
  overflow: "hidden",
};

const previewStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 2,
};

const submitBtn = {
  borderRadius: "14px",
  py: 1.5,
  fontWeight: 600,
  textTransform: "none",
  background: "linear-gradient(45deg, #6366f1, #ec4899)",
  color: "#fff",
};