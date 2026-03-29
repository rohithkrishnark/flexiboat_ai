import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  Tabs,
  Tab,
  Modal,
  IconButton,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { getAuthUser } from "../../constant/Constant";
import { useFetchSingleStudentMedia, useFetchSingleStudentPost } from "../../ADMIN/CommonCode/useQuery";
import { BACKEND_IMAGE } from "../../constant/Static";

const StudentViewPost = () => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Entire post
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0); // Track which media inside post

  const user = getAuthUser();
  const std_id = user?.user_id;

  // Fetch student posts & media
  const { data: StudentPostDetail } = useFetchSingleStudentPost(std_id ?? null);
  const { data: StudentMedia } = useFetchSingleStudentMedia(std_id ?? null);

  // Combine posts with their media
  const postsWithMedia = StudentPostDetail?.map((post) => {
    const mediaForPost = StudentMedia?.find((p) => p.id === post.id)?.media || [];
    return { ...post, media: mediaForPost };
  }) || [];

  const handleOpen = (post, mediaIndex = 0) => {
    setSelectedPost(post);
    setSelectedMediaIndex(mediaIndex);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
    setSelectedMediaIndex(0);
  };

  // Filter media based on tab
  const filteredMedia = postsWithMedia.flatMap((post) =>
    post.media
      ?.filter((m) =>
        tab === 0 ? m.type === "image" : tab === 1 ? m.type === "video" : true
      )
      ?.map((m, index) => ({ ...m, postId: post.id, post, mediaIndex: index }))
  ) || [];

  return (
    <>
      {/* MAIN GRID */}
      <Box
        sx={{
          height: "80vh",
          overflowY: "auto",
          bgcolor: "#f4f6f8",
          px: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="fullWidth"
          sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2 }}
        >
          <Tab label="Photos" />
          <Tab label="Videos" />
          <Tab label="All" />
        </Tabs>

        {/* Grid of media */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
          {filteredMedia.map((media) => (
            <Card
              key={`${media.postId}-${media?.filename}-${media.mediaIndex}`}
              onClick={() => handleOpen(media.post, media.mediaIndex)}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {media?.type === "video" ? (
                <video
                  src={`${BACKEND_IMAGE}${media?.path}`}
                  style={{ height: 120, width: "100%", objectFit: "cover" }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <CardMedia
                  component="img"
                  image={`${BACKEND_IMAGE}${media.path}`}
                  sx={{ height: 120, objectFit: "cover" }}
                />
              )}
            </Card>
          ))}
        </Box>
      </Box>

      {/* MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: "100%", height: "100%" }}>
          {selectedPost ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "75%",
                height: "75%",
                bgcolor: "#fff",
                borderRadius: 3,
                display: "flex",
                overflow: "hidden",
              }}
            >
              {/* LEFT: Media */}
              <Box sx={{ width: "60%", bgcolor: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selectedPost.media?.[selectedMediaIndex]?.type === "video" ? (
                  <video
                    src={`${BACKEND_IMAGE}${selectedPost.media[selectedMediaIndex]?.path}`}
                    controls
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <img
                    src={`${BACKEND_IMAGE}${selectedPost.media?.[selectedMediaIndex]?.path}`}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                )}
              </Box>

              {/* RIGHT: Post Details */}
              <Box sx={{ width: "40%", display: "flex", flexDirection: "column", height: "100%" }}>
                {/* HEADER */}
                <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar />
                    <Box>
                      <Typography fontWeight={600}>Student</Typography>
                      <Typography fontSize={12} color="gray">
                        {new Date(selectedPost.created_at).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                </Box>

                {/* CONTENT */}
                <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
                  <Typography fontWeight={600} mb={1}>{selectedPost.caption || "No caption"}</Typography>
                  <Typography fontSize={14}>{selectedPost.description || "No description"}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography fontSize={13}>💬 Comments coming soon...</Typography>
                </Box>

                {/* ACTIONS */}
                <Box sx={{ p: 1, borderTop: "1px solid #eee", display: "flex", gap: 1 }}>
                  <IconButton><FavoriteBorderIcon /></IconButton>
                  <IconButton><ChatBubbleOutlineIcon /></IconButton>
                </Box>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Modal>
    </>
  );
};

export default StudentViewPost;