import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  TabList,
  Tab,
  Chip,
  IconButton,
} from "@mui/joy";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";

const mockMyPosts = [
  {
    id: 1,
    type: "job",
    title: "React Developer",
    description: "Hiring React devs at Infosys",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    link: "https://company.com/job",
  },
  {
    id: 2,
    type: "event",
    title: "Campus Job Fair",
    description: "April 10th hiring event",
    date: "1 week ago",
    image: "",
    link: "",
  },
];

const MyJobs = () => {
  const [filter, setFilter] = useState("all");

  const filteredData =
    filter === "all"
      ? mockMyPosts
      : mockMyPosts.filter((item) => item.type === filter);

  return (
    <Box sx={{ p: 2, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <Typography level="h4" sx={{ mb: 2 }}>
        My Activity
      </Typography>

      {/* FILTER */}
      <Tabs value={filter} onChange={(e, val) => setFilter(val)} sx={{ mb: 2 }}>
        <TabList>
          <Tab value="all">All</Tab>
          <Tab value="job">Jobs</Tab>
          <Tab value="event">Events</Tab>
          <Tab value="article">Articles</Tab>
          <Tab value="highlight">Highlights</Tab>
        </TabList>
      </Tabs>

      {/* LIST */}
      {filteredData.length === 0 ? (
        <Typography>No data available</Typography>
      ) : (
        filteredData.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 1.5,
              borderRadius: "12px",
              boxShadow: "sm",
              p: 1,
            }}
          >
            <CardContent sx={{ p: 1.5 }}>
              
              {/* TOP ROW */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography level="title-md">{item.title}</Typography>

                <Chip
                  size="sm"
                  variant="soft"
                  color={
                    item.type === "job"
                      ? "primary"
                      : item.type === "event"
                      ? "success"
                      : item.type === "article"
                      ? "warning"
                      : "neutral"
                  }
                >
                  {item.type}
                </Chip>
              </Box>

              {/* IMAGE */}
              {item.image && (
                <Box sx={{ mb: 1 }}>
                  <img
                    src={item.image}
                    alt="post"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}

              {/* DESCRIPTION */}
              <Typography level="body-sm" sx={{ mb: 1 }}>
                {item.description}
              </Typography>

              {/* LINK */}
              {item.link && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <LinkIcon fontSize="small" />
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "13px", color: "#1976d2" }}
                  >
                    {item.link}
                  </a>
                </Box>
              )}

              {/* FOOTER */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography level="body-xs" sx={{ opacity: 0.6 }}>
                  {item.date}
                </Typography>

                {/* ICON ACTIONS */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton size="sm" variant="plain">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="danger">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default MyJobs;