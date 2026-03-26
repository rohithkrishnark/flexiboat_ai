import React from "react";
import { Box, Typography } from "@mui/joy";

const EmptyState = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography
        level="h2"
        sx={{
          background: "linear-gradient(90deg, #4285f4, #d96570)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Hello, Student
      </Typography>

      <Typography level="body-md" sx={{ color: "#C4C7C5" }}>
        How can I help with your studies today?
      </Typography>
    </Box>
  );
};

export default EmptyState;