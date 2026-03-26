import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  TextField,
  Button,
  Modal,
  Paper,
} from "@mui/material";

// Mock Data
const mockActivities = [
  {
    id: 1,
    student: "Rohith Krishna",
    title: "Onam Dance",
    caption: "College Onam celebration performance",
    description: "Participated in group dance and secured 2nd prize.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    ],
  },
  {
    id: 2,
    student: "Anjali Nair",
    title: "Tech Fest",
    caption: "Hackathon participation",
    description: "Built a smart AI chatbot in 24 hours.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    ],
  },
];

const ReviewActivity = () => {
  const [scores, setScores] = useState({});
  const [openReject, setOpenReject] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [reason, setReason] = useState("");

  const handleScoreChange = (id, value) => {
    setScores({ ...scores, [id]: value });
  };

  const handleApprove = (id) => {
    console.log({
      activityId: id,
      score: scores[id],
      status: "approved",
    });
  };

  // 🔥 OPEN REJECT MODAL
  const handleRejectClick = (id) => {
    setSelectedId(id);
    setOpenReject(true);
  };

  // 🔥 SUBMIT REJECT
  const handleRejectSubmit = () => {
    if (!reason.trim()) {
      alert("Please enter a reason");
      return;
    }

    console.log({
      activityId: selectedId,
      status: "rejected",
      reason: reason,
    });

    setOpenReject(false);
    setReason("");
  };

  return (
    <Box
      sx={{
        height: "85vh",
        overflowY: "auto",
        p: 2,
        bgcolor: "#f5f7fb",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Typography fontWeight={700} fontSize={18} mb={2}>
        Review Student Activities
      </Typography>

      <Grid container spacing={2}>
        {mockActivities.map((activity) => (
          <Grid item xs={12} md={6} lg={4} key={activity.id}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                {/* HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ mr: 1 }} />
                  <Box>
                    <Typography fontWeight={600}>
                      {activity.student}
                    </Typography>
                    <Typography fontSize={12} color="gray">
                      {activity.title}
                    </Typography>
                  </Box>
                </Box>

                {/* CONTENT */}
                <Typography fontSize={13}>{activity.caption}</Typography>
                <Typography fontSize={12} color="gray" mb={1}>
                  {activity.description}
                </Typography>

                {/* IMAGES */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  {activity.images.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      sx={{
                        width: "100%",
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </Box>

                {/* SCORE */}
                <TextField
                  label="Score"
                  type="number"
                  size="small"
                  fullWidth
                  value={scores[activity.id] || ""}
                  onChange={(e) =>
                    handleScoreChange(activity.id, e.target.value)
                  }
                  sx={{ mb: 1 }}
                />

                {/* ACTIONS */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleApprove(activity.id)}
                    sx={{
                      background:
                        "linear-gradient(45deg, #22c55e, #16a34a)",
                      textTransform: "none",
                    }}
                  >
                    Approve
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => handleRejectClick(activity.id)}
                    sx={{ textTransform: "none" }}
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🔥 REJECT MODAL */}
      <Modal open={openReject} onClose={() => setOpenReject(false)}>
        <Paper
          sx={{
            width: 400,
            p: 3,
            mx: "auto",
            mt: "15%",
            borderRadius: 3,
          }}
        >
          <Typography fontWeight={600} mb={1}>
            Reason for Rejection
          </Typography>

          <TextField
            multiline
            rows={3}
            fullWidth
            placeholder="Enter reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleRejectSubmit}
            >
              Submit
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => setOpenReject(false)}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default ReviewActivity;