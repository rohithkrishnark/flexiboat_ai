import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Tabs,
  Tab,
  Modal,
  Paper,
  Chip,
} from "@mui/material";

import {
  errorNotify,
  getAuthUser,
  successNotify,
} from "../../constant/Constant";

import {
  useFetchAllAcitivtyMediaDetail,
  useFetchAllStudtentAcitivty,
} from "../../ADMIN/CommonCode/useQuery";

import { BACKEND_IMAGE } from "../../constant/Static";
import { axiosLogin } from "../../Axios/axios";

const ReviewActivity = () => {
  const [scores, setScores] = useState({});
  const [tab, setTab] = useState(0);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);

  const user = getAuthUser();
  const depId = user?.fac_dep_id;
  const loggeduser = user?.fac_id;

  const { data: ActivityDetail, refetch } =
    useFetchAllStudtentAcitivty(depId);

  const { data: ActivityMediaDetail } =
    useFetchAllAcitivtyMediaDetail();

  const activityDetails = ActivityDetail || [];
  const activityMedia = ActivityMediaDetail || [];

  // MERGE DATA
  const mergedActivities = useMemo(() => {
    return activityDetails.map((post) => {
      const match = activityMedia.find(
        (m) =>
          Number(m.postId) === Number(post.id) &&
          Number(m.stdId) === Number(post.student_id)
      );

      return {
        ...post,
        media: match?.media || [],
      };
    });
  }, [activityDetails, activityMedia]);

  // FILTERS
  const pending = mergedActivities.filter((a) => !a.given_staff);

  const approved = mergedActivities.filter(
    (a) =>
      Number(a.given_staff) === Number(loggeduser) &&
      Number(a.rejected) === 0
  );

  const rejected = mergedActivities.filter(
    (a) => Number(a.rejected) === 1
  );

  const getData = () => {
    if (tab === 0) return pending;
    if (tab === 1) return approved;
    return rejected;
  };

  // SCORE
  const handleScoreChange = (id, value) => {
    setScores((p) => ({ ...p, [id]: value }));
  };

  // APPROVE
  const handleApprove = async (activity) => {
    try {
      const res = await axiosLogin.post(
        "/student/activity/givescore",
        {
          score: scores[activity.id],
          user_id: loggeduser,
          activity_id: activity.id,
        }
      );

      if (res?.data?.success === 0)
        return errorNotify("Error in scoring");

      successNotify("Approved successfully");
      refetch();
      setScores({});
    } catch (err) {
      errorNotify("Error");
    }
  };

  // OPEN REJECT
  const openRejectModal = (activity) => {
    setSelectedActivity(activity);
    setRejectOpen(true);
  };

  // SUBMIT REJECT
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      return errorNotify("Enter reject reason");
    }

    try {
      const res = await axiosLogin.post(
        "/student/activity/reject",
        {
          activity_id: selectedActivity.id,
          reject_reason: rejectReason,
          user_id: loggeduser,
        }
      );

      if (res?.data?.success === 0)
        return errorNotify("Reject failed");

      successNotify("Rejected successfully");
      setRejectOpen(false);
      setRejectReason("");
      refetch();
    } catch (err) {
      errorNotify("Error rejecting");
    }
  };

  // BUTTON STYLE
  const approveBtn = {
    background: "linear-gradient(45deg,#22c55e,#16a34a)",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
  };

  const rejectBtn = {
    border: "1px solid #ef4444",
    color: "#ef4444",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
  };

  return (
    <Box sx={{ height: "85vh", overflowY: "auto", p: 2 ,boxShadow:'lg'}}>
      <Typography fontWeight={700} fontSize={18} mb={2}>
        Review Student Activities
      </Typography>

      {/* TABS */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Pending" />
        <Tab label="Approved" />
        <Tab label="Rejected" />
      </Tabs>

      {/* CARDS */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
        {getData().map((activity) => (
          <Box
            key={activity.id}
            sx={{ flex: "0 0 calc(33.333% - 16px)" }}
          >
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                {/* HEADER */}
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Avatar sx={{ mr: 1 }}>
                    {activity.std_name?.[0]}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>
                      {activity.std_name}
                    </Typography>
                    <Typography fontSize={12}>Activity</Typography>
                  </Box>
                </Box>

                {/* TEXT */}
                <Typography>{activity.caption}</Typography>
                <Typography fontSize={12} color="gray">
                  {activity.description}
                </Typography>

                {/* MEDIA */}
                {activity.media?.map((m, i) => (
                  <img
                    key={i}
                    src={`${BACKEND_IMAGE}${m.url}`}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginTop: 8,
                    }}
                  />
                ))}

                {/* APPROVED CHIP */}
                {activity?.given_staff && !activity?.rejected && (
                  <Chip
                    label={`${activity.activity_score} Mark`}
                    color="success"
                    sx={{ mt: 1 }}
                  />
                )}

                {/* REJECTED BOX (FIXED HERE) */}
                {activity.rejected === 1 && (
                  <Box
                    sx={{
                      mt: 1,
                      p: 1.5,
                      bgcolor: "#fee2e2",
                      borderRadius: 2,
                    }}
                  >
                    <Typography fontSize={12} fontWeight={700} color="error">
                      Rejected
                    </Typography>

                    <Typography fontSize={12}>
                      <b>Reason:</b> {activity.reason || "No reason provided"}
                    </Typography>

                    <Typography fontSize={11} color="gray">
                      By Staff ID: {activity.scoregive_staff}
                    </Typography>
                  </Box>
                )}

                {/* SCORE INPUT */}
                {!activity.given_staff && !activity.rejected && (
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Score"
                    value={scores[activity.id] || ""}
                    onChange={(e) =>
                      handleScoreChange(activity.id, e.target.value)
                    }
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>

              {/* ACTIONS */}
              {!activity.given_staff && !activity.rejected && (
                <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                  <Button
                    fullWidth
                    sx={approveBtn}
                    onClick={() => handleApprove(activity)}
                  >
                    Approve
                  </Button>

                  <Button
                    fullWidth
                    sx={rejectBtn}
                    onClick={() => openRejectModal(activity)}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </Card>
          </Box>
        ))}
      </Box>

      {/* REJECT MODAL */}
      <Modal open={rejectOpen} onClose={() => setRejectOpen(false)}>
        <Paper sx={{ width: 400, p: 3, mx: "auto", mt: "15%" }}>
          <Typography fontWeight={600}>Reject Reason</Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button sx={rejectBtn} fullWidth onClick={handleReject}>
              Submit
            </Button>

            <Button fullWidth onClick={() => setRejectOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default ReviewActivity;