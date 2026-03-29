import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FloatingBackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); //  go to previous page
  };

  return (
    <IconButton
      onClick={handleBack}
      sx={{
        position: "fixed",
        bottom: 120,
        right: 30,
        zIndex: 9999,

        width: 55,
        height: 55,
        borderRadius: "50%",

        background: "linear-gradient(135deg, #6366f1, #3b82f6)",
        color: "#fff",

        boxShadow: "0 10px 25px rgba(0,0,0,0.4)",

        transition: "all 0.3s ease",

        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
        },

        "&:active": {
          transform: "scale(0.95)",
        },
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default memo(FloatingBackButton);