import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Tabs,
  TabList,
  Tab,
} from "@mui/joy";

import {
  FaRegThumbsUp,
  FaRegComment,
  FaShare,
} from "react-icons/fa";

const mockPosts = [
  {
    id: 1,
    type: "job",
    user: "Rohith Krishna",
    role: "Frontend Developer • Infosys",
    content: "We are hiring React Developers.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
    time: "2h ago",
  },
  {
    id: 2,
    type: "highlight",
    user: "Anu Thomas",
    role: "Software Engineer • TCS",
    content: "Got promoted to Senior Developer.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    time: "5h ago",
  },
  {
    id: 3,
    type: "event",
    user: "College Admin",
    role: "Placement Cell",
    content: "Job Fair on April 10th.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    time: "1d ago",
  },
  {
    id: 4,
    type: "article",
    user: "Vishnu Raj",
    role: "Backend Developer • Amazon",
    content: "How I cracked my first job.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    time: "2d ago",
  },
];

const ViewAluminiPost = () => {
  const [filter, setFilter] = useState("all");

  const filteredPosts =
    filter === "all"
      ? mockPosts
      : mockPosts.filter((post) => post.type === filter);

  return (
    <Box sx={{ display: "flex", height: "80vh", bgcolor: "#f3f4f6" }}>

      {/*  CENTER FEED */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* STICKY TABS ONLY */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: "#f3f4f6",
            px: 2,
            pt: 2,
            pb: 1,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Tabs value={filter} onChange={(e, val) => setFilter(val)}>
            <TabList>
              <Tab value="all">All</Tab>
              <Tab value="job">Jobs</Tab>
              <Tab value="article">Articles</Tab>
              <Tab value="event">Events</Tab>
              <Tab value="highlight">Highlights</Tab>
            </TabList>
          </Tabs>
        </Box>

        {/* ✅ SCROLLABLE POSTS */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,

            /* 🔥 hide scrollbar */
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              sx={{
                mb: 2,
                borderRadius: "12px",
                "&:hover": { boxShadow: "md" },
              }}
            >
              <CardContent>
                {/* HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ mr: 1 }} />
                  <Box>
                    <Typography level="body-sm">{post.user}</Typography>
                    <Typography level="body-xs" sx={{ opacity: 0.6 }}>
                      {post.role} • {post.time}
                    </Typography>
                  </Box>
                </Box>

                {/* CONTENT */}
                <Typography sx={{ mb: 1 }}>{post.content}</Typography>

                {/* IMAGE */}
                {post.image && (
                  <Box
                    component="img"
                    src={post.image}
                    alt="post"
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      mb: 1,
                    }}
                  />
                )}

                {/* ACTIONS */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    borderTop: "1px solid #eee",
                    pt: 1,
                  }}
                >
                  <Button size="sm" variant="plain" startDecorator={<FaRegThumbsUp />}>
                    Like
                  </Button>

                  <Button size="sm" variant="plain" startDecorator={<FaRegComment />}>
                    Comment
                  </Button>

                  <Button size="sm" variant="plain" startDecorator={<FaShare />}>
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* 🔥 RIGHT PANEL */}
      <Box
        sx={{
          width: "300px",
          p: 2,
          display: { xs: "none", md: "block" },

          position: "sticky",   // 🔥 makes it fixed
          top: 0,               // 🔥 stick to top
          height: "100vh",      // full height
        }}
      >
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography level="title-md">Notifications</Typography>
            <Typography level="body-sm">New job posted</Typography>
            <Typography level="body-sm">Someone liked your post</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography level="title-md">Trending</Typography>
            <Typography level="body-sm">React Jobs</Typography>
            <Typography level="body-sm">AI Articles</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ViewAluminiPost;