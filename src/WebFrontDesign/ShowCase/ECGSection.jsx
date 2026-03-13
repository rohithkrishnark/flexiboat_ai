import React from "react";
import { Box, Typography } from "@mui/joy";

const ECGSection = () => {
  return (
    <Box
      sx={{
        height: "300px",
        background: "#0b0b0b",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <Typography
        level="h3"
        sx={{
          color: "#a855f7",
          mb: 4,
          letterSpacing: "2px"
        }}
      >
        FLEXIBOT AI ACTIVE
      </Typography>

      <svg
        viewBox="0 0 1000 200"
        width="100%"
        height="120"
        className="ecg"
      >
        <path
          d="M0 100 L150 100 L200 100 L220 40 L240 160 L260 100 L400 100 
             L420 60 L440 150 L460 100 L600 100 
             L620 50 L640 160 L660 100 L1000 100"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="4"
        />
      </svg>

      <style>{`

        .ecg path{
            stroke-dasharray:2000;
            stroke-dashoffset:2000;
            animation:ecgMove 4s linear infinite;
        }

        @keyframes ecgMove{
            to{
                stroke-dashoffset:0;
            }
        }

      `}</style>
    </Box>
  );
};

export default ECGSection;