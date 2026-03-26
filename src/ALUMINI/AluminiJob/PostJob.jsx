import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  Textarea,
  Button,
  Card,
  Tabs,
  TabList,
  Tab,
  IconButton,
} from "@mui/joy";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";

const PostJob = () => {
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePost = () => {
    const finalData = {
      ...postData,
      type: tab,
      file,
    };

    console.log("POST DATA 👉", finalData);

    alert("Post submitted!");

    setPostData({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      eventDate: "",
    });
    setFile(null);
  };

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#eef2f6",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          height: "100%",
          p: 3,
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* HEADER */}
        <Typography level="h3">Create Post</Typography>

        {/* TABS WITH ICONS */}
        <Tabs value={tab} onChange={(e, val) => setTab(val)}>
          <TabList>
            <Tab><WorkIcon /> Job</Tab>
            <Tab><ArticleIcon /> Article</Tab>
            <Tab><EventIcon /> Event</Tab>
            <Tab><StarIcon /> Highlight</Tab>
          </TabList>
        </Tabs>

        {/* FORM AREA */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* JOB */}
            {tab === 0 && (
              <>
                <Input
                  placeholder="Job Title"
                  value={postData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                <Input
                  placeholder="Company"
                  value={postData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                />
                <Input
                  placeholder="Location"
                  value={postData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                <Input
                  placeholder="Salary"
                  value={postData.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                />
              </>
            )}

            {/* ARTICLE */}
            {tab === 1 && (
              <Input
                placeholder="Article Title"
                value={postData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            )}

            {/* EVENT */}
            {tab === 2 && (
              <>
                <Input
                  placeholder="Event Name"
                  value={postData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                <Input
                  type="date"
                  value={postData.eventDate}
                  onChange={(e) => handleChange("eventDate", e.target.value)}
                />
                <Input
                  placeholder="Location"
                  value={postData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </>
            )}

            {/* FILE UPLOAD */}
            <Button
              component="label"
              variant="outlined"
              startDecorator={<AttachFileIcon />}
            >
              Upload File
              <input hidden type="file" onChange={handleFileChange} />
            </Button>

            {file && (
              <Typography level="body2">
                📎 {file.name}
              </Typography>
            )}
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Textarea
              minRows={12}
              placeholder="Write your post content..."
              value={postData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              sx={{ height: "100%" }}
            />
          </Box>
        </Box>

        {/* FOOTER */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="lg" onClick={handlePost}>
            Post
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default PostJob;