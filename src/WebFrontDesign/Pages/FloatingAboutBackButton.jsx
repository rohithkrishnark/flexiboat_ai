import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingAboutBackButton = ({ fallbackPath = "/" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
      navigate(fallbackPath); // fallback if no history
  };

  return (
    <button onClick={handleBack} style={styles.button}>
      ←
    </button>
  );
};

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};

export default FloatingAboutBackButton;