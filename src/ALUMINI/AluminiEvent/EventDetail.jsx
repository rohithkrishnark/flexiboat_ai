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

  const handleSubmit = () => {
    const payload = {
      ...formData,
      type: "event",
      status: "upcoming",
      image,
    };

    console.log("Event Data:", payload);
    alert("Event Posted Successfully 🚀");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#eef2f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* HEADER */}
          <Typography level="h3" startDecorator={<EventIcon />} sx={{ mb: 3 }}>
            Create Event / Job Fair
          </Typography>

          {/* IMAGE BANNER */}
          <Box sx={{ mb: 3 }}>
            <Button
              component="label"
              variant="outlined"
              startDecorator={<ImageIcon />}
              fullWidth
              sx={{ height: 150, borderStyle: "dashed" }}
            >
              Upload Event Banner
              <input type="file" hidden onChange={handleImage} />
            </Button>

            {preview && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </Box>
            )}
          </Box>

          {/* GRID FORM */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
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
          <Button
            fullWidth
            size="lg"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Publish Event 🚀
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetail;