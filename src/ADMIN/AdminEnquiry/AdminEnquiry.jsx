import React, { memo } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Divider,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";

import { useFetchAllEnqiury } from "../CommonCode/useQuery";
import GlobalLoader from "../../Component/GlobalLoader";

const AdminEnquiry = () => {
  const {
    data: filtered = [],
    isLoading,
    error,
  } = useFetchAllEnqiury();

  if (isLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <GlobalLoader text="Fetching Please Wait....!" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={5}>
        Failed to load enquiries
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f7f9",
      }}
    >
      {/* 🔝 Sticky Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#f5f7f9",
          px: 3,
          pt: 3,
          pb: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Enquiry Messages
        </Typography>
      </Box>

      {/* 📜 Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          pb: 3,

          // ❌ Hide scrollbar
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome
          },
        }}
      >
        {/* 📋 LIST */}
        <Box display="flex" flexDirection="column" gap={2}>
          {filtered?.map((item) => (
            <Card
              key={item?.id}
              sx={{
                p: 2,
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              {/*  Top Section */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#1976d2" }}>
                    {item?.name?.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography fontWeight="600">
                      {item?.name}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      {new Date(item?.created_at).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/*  Info Row */}
              <Box display="flex" flexWrap="wrap" gap={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon fontSize="small" color="primary" />
                  <Typography variant="body2">{item?.email}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon fontSize="small" color="primary" />
                  <Typography variant="body2">{item?.mobile}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon fontSize="small" color="primary" />
                  <Typography variant="body2">
                    {item?.address}
                  </Typography>
                </Box>
              </Box>

              {/*  Message Box */}
              <Box
                mt={2}
                p={2}
                sx={{
                  background: "#f1f5f9",
                  borderRadius: "8px",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={1}
                >
                  <MessageIcon fontSize="small" color="primary" />
                  <Typography fontWeight="500">
                    Message
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {item?.message}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        {/*  No Data */}
        {filtered?.length === 0 && (
          <Typography mt={5} textAlign="center" color="gray">
            No enquiries found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default memo(AdminEnquiry);