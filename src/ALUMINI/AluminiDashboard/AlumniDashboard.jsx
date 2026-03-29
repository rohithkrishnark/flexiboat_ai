import React, { useState, useMemo, memo } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Input,
  Tabs,
  TabList,
  Tab,
  Chip,
} from "@mui/joy";

import {
  FaRegThumbsUp,
  FaRegComment,
  FaShare,
} from "react-icons/fa";

import {
  useFectchAllAlumini,
  useFectchAllAluminiEventDetail,
  useFectchAllAluminiPostDetail,
  useFetchAllAluminiEvenMedialDetail,
} from "../../ADMIN/CommonCode/useQuery";

import { BACKEND_IMAGE } from "../../constant/Static";
import { useNavigate } from "react-router-dom";

const AlumniDashboard = () => {
  const [filter, setFilter] = useState("all");

  const { data: fetchAllPostFiles } = useFectchAllAluminiPostDetail(); // media
  const { data: fechAllPostDetail } = useFectchAllAlumini(); // posts

  const { data: fechAllEventDetail } = useFectchAllAluminiEventDetail(); // events
  const { data: fechAllEventMediaDetail } = useFetchAllAluminiEvenMedialDetail(); // event media

  const navigate = useNavigate();

  const posts = fechAllPostDetail || [];
  const postMedia = fetchAllPostFiles || [];

  const events = fechAllEventDetail || [];
  const eventMedia = fechAllEventMediaDetail || [];

  // ✅ MERGE POSTS
  const mergedPosts = useMemo(() => {
    return posts.map((post) => {
      const match = postMedia.find(
        (m) =>
          Number(m.postId) === Number(post.id) &&
          Number(m.alumId) === Number(post.alum_id)
      );

      return {
        ...post,
        type: "post",
        media: match?.media || [],
      };
    });
  }, [posts, postMedia]);

  // ✅ MERGE EVENTS
  const mergedEvents = useMemo(() => {
    return events.map((event) => {
      const match = eventMedia.find(
        (m) =>
          Number(m.postId) === Number(event.id) &&
          Number(m.alumId) === Number(event.user_id)
      );

      return {
        ...event,
        type: "event",
        post_type: "event", // for filter
        alum_id: event.user_id,
        media: match?.media || [],
      };
    });
  }, [events, eventMedia]);

  // ✅ COMBINE BOTH
  const allFeed = [...mergedPosts, ...mergedEvents];

  // ✅ FILTER
  const filteredPosts =
    filter === "all"
      ? allFeed
      : allFeed.filter((p) => p.post_type === filter);

  const handleOpen = (id) => {
    navigate(`/common/aluminiglobal/${id}`);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#eef2f7" }}>
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>

        {/* CREATE */}
        <Card sx={{ mb: 2, borderRadius: "16px" }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Avatar />
              <Input placeholder="Share something..." sx={{ flex: 1 }} />
            </Box>
          </CardContent>
        </Card>

        {/* FILTER */}
        <Tabs value={filter} onChange={(e, v) => setFilter(v)} sx={{ mb: 2 }}>
          <TabList>
            <Tab value="all">All</Tab>
            <Tab value="job">Jobs</Tab>
            <Tab value="article">Articles</Tab>
            <Tab value="event">Events</Tab>
            <Tab value="highlight">Highlights</Tab>
          </TabList>
        </Tabs>

        {/* FEED */}
        {filteredPosts.map((item) => (
          <Card key={item.id} sx={{ mb: 2, borderRadius: "16px" }}>
            <CardContent>

              {/* HEADER */}
              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <Avatar
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpen(item.alum_id)}
                >
                  {item.alum_name?.[0] || "A"}
                </Avatar>

                <Box>
                  <Typography fontWeight="bold">
                    {item.alum_name || "Unknown"}
                  </Typography>
                  <Typography level="body-xs">
                    {item.alum_company_designation || ""}
                  </Typography>
                </Box>
              </Box>

              {/* TYPE */}
              <Chip size="sm" sx={{ mb: 1 }}>
                {item.post_type}
              </Chip>

              {/* TITLE */}
              <Typography fontWeight="lg">{item.title}</Typography>

              {/* DESC */}
              <Typography level="body-sm" sx={{ mb: 1 }}>
                {item.description}
              </Typography>

              {/* EVENT EXTRA */}
              {item.type === "event" && (
                <Typography level="body-xs" sx={{ mb: 1 }}>
                  📅 {new Date(item.event_date).toDateString()}
                </Typography>
              )}

              {/* MEDIA */}
              {item.media?.length > 0 && (
                <Box sx={{ display: "grid", gap: 1 }}>
                  {item.media.map((m) => (
                    <img
                      key={m.id}
                      src={`${BACKEND_IMAGE}${m.url}`}
                      alt=""
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* ACTIONS */}
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  mt: 1,
                }}
              >
                <FaRegThumbsUp />
                <FaRegComment />
                <FaShare />
              </Box> */}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default memo(AlumniDashboard);