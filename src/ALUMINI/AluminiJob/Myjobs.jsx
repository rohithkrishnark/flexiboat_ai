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
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { errorNotify, getAuthUser, infoNotify, successNotify } from "../../constant/Constant";
import {
  useFetchAlumniFullMediaSingle,
  useFetchSingleAluminiPost,
} from "../../ADMIN/CommonCode/useQuery";
import { axiosLogin } from "../../Axios/axios";
import { BACKEND_API } from "../../constant/Static";

const MyJobs = () => {
  const [filter, setFilter] = useState("all");

  const user = getAuthUser();
  const alum_id = user?.alum_id;

  const { data: alumninPostDetail = [], refetch: refetchAllPostDetail } =
    useFetchSingleAluminiPost(alum_id ?? null);

  const { data: alumninPostMediaDetail = [], refetch: refetchAllPostMediaDetail } =
    useFetchAlumniFullMediaSingle(alum_id ?? null);

  //  Merge Post + Media
  const postsWithMedia =
    alumninPostDetail?.map((post) => {
      const mediaObj = alumninPostMediaDetail?.find(
        (m) => String(m.postId) === String(post.id)
      );

      return {
        ...post,
        media: mediaObj?.media || [],
      };
    }) || [];

  // Filter Data
  const filteredData =
    filter === "all"
      ? postsWithMedia
      : postsWithMedia.filter((item) => item.post_type === filter);


  const HandleDeletePost = async (postid) => {
    if (!postid) return infoNotify("Post Id is Missing")
    try {
      const res = await axiosLogin.post("/alumini/posts/indactive", {
        id: postid
      });
      const { message, success } = res.data ?? {}
      if (success === 0) errorNotify("Error in Deleting")
      successNotify(message)
      refetchAllPostDetail()
      refetchAllPostMediaDetail()
    } catch (error) {
      errorNotify("Error in Deleteing Post Try After Some Times")
    }
  }

  return (
    <Box sx={{ p: 2, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography level="h4" sx={{ mb: 2 }}>
        My Activity
      </Typography>

      {/* FILTER TABS */}
      <Tabs value={filter} onChange={(e, val) => setFilter(val)} sx={{ mb: 2 }}>
        <TabList>
          <Tab value="all">All</Tab>
          <Tab value="job">Jobs</Tab>
          <Tab value="event">Events</Tab>
          <Tab value="article">Articles</Tab>
          <Tab value="highlight">Highlights</Tab>
        </TabList>
      </Tabs>

      {/* LIST - 3 cards per row */}
      {filteredData?.length === 0 ? (
        <Typography>No data available</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {filteredData?.map((item) => (
            <Card
              key={item.id}
              sx={{
                borderRadius: "12px",
                boxShadow: "sm",
                p: 1,
                height: 500,
              }}
            >
              <CardContent sx={{ p: 1.5 }}>

                {/* TOP */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography level="title-md">{item.title}</Typography>

                  <Chip
                    size="sm"
                    variant="soft"
                    color={
                      item.post_type === "job"
                        ? "primary"
                        : item.post_type === "event"
                          ? "success"
                          : item.post_type === "article"
                            ? "warning"
                            : "neutral"
                    }
                  >
                    {item.post_type}
                  </Chip>
                </Box>

                {/* MEDIA */}
                {item.media?.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <img
                      src={`${BACKEND_API}${item.media[0].url}`}
                      alt="post"
                      style={{
                        width: "100%",
                        height: 330,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                )}

                {/* DESCRIPTION */}
                <Typography level="body-sm" sx={{ mb: 1 }}>
                  {item.description}
                </Typography>

                {/* FOOTER */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography level="body-xs" sx={{ opacity: 0.6 }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1 }}>

                    {/* <IconButton size="sm">
                      <EditIcon />
                    </IconButton> */}
                    <IconButton onClick={() => HandleDeletePost(item.id)} size="sm" color="danger">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyJobs;