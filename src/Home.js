import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import "./Home.css";
import About from "./WebFrontDesign/About";
import Footer from "./WebFrontDesign/Footer";
import Main from "./WebFrontDesign/Main";
import ChatComponent from "./WebFrontDesign/ShowCase/ChatComponent";
import ContactUs from "./WebFrontDesign/ShowCase/ContactUs";
import ECGSection from "./WebFrontDesign/ShowCase/ECGSection";
import HorizontalScrollingAi from "./WebFrontDesign/ShowCase/HorizontalScrollingAi";
import { useNavigate } from "react-router-dom";
import { Box, Card, Input, Button, Typography } from "@mui/joy";
import { axiosLogin } from "./Axios/axios";
import { getAuthUser } from "./constant/Constant";
import FloatingChatBot from "./Component/FloatingChatBot";

function Home() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginMessage, setLoginMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // ✅ SAFE USER
  const user = getAuthUser();
  
  // ======================================================
  // 🚀 AUTO REDIRECT ON LOAD (FIXED)
  // ======================================================
  useEffect(() => {
    if (!user || !user.role) return;

    let redirectPath = null;

    switch (user.role) {
      case "student":
        redirectPath = "/students";
        break;
      case "fac":
        redirectPath = "/faculity";
        break;
      case "alumni":
        redirectPath = "/alumini";
        break;
      case "admin":
        redirectPath = "/admin";
        break;
      default:
        return;
    }

    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  // ================= SECRET TRIGGER =================
  useEffect(() => {
    let keys = [];
    let timer;

    const handleKey = (e) => {
      if (!e.key) return;

      const key = e.key.toLowerCase();
      keys.push(key);

      clearTimeout(timer);
      timer = setTimeout(() => {
        keys = [];
      }, 1200);

      if (keys.slice(-3).join("") === "aaa") {
        setShowAdminModal(true);
        keys = [];
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ================= ADMIN LOGIN =================
  const hanldelogin = async () => {
    try {
      setLoading(true);

      if (!username || !password) {
        setLoginMessage("Username and Password required");
        setMessageType("error");
        return;
      }

      const response = await axiosLogin.post("/training/login", {
        username,
        password,
      });

      const { message, success, role } = response.data ?? {};

      if (success === 0) {
        setLoginMessage("Error in inserting data");
        setMessageType("error");
        return;
      }

      if (success === 2) {
        setLoginMessage("Username or password not matched");
        setMessageType("error");
        return;
      }

      setLoginMessage(message);
      setMessageType("success");

      // ✅ STORE SAFE OBJECT
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          loggedIn: true,
          role: role || "admin",
        }),
      );

      setTimeout(() => {
        setShowAdminModal(false);
        setUsername("");
        setPassword("");
        setLoginMessage("");
        setMessageType("");

        navigate("/admin");
      }, 800);
    } catch (error) {
      setLoginMessage("Error in Login API");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent">
      <Navbar />

      <div className="page-content">
        <Main />
        <HorizontalScrollingAi />
        <ECGSection />
        <About />
        <ChatComponent />
        <ContactUs />
        <Footer />
      </div>
      <FloatingChatBot onClick={() => navigate("/chat")} />

      {/* ================= ADMIN MODAL ================= */}
      {showAdminModal && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
          }}
        >
          <Card
            sx={{
              width: 380,
              p: 3,
              borderRadius: 4,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              color: "#fff",
            }}
          >
            <Typography
              level="h4"
              sx={{ fontWeight: 800, textAlign: "center" }}
            >
              🔐 Admin Access
            </Typography>

            <Input
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                mt: 2,
                bgcolor: "rgba(255,255,255,0.08)",
                "& input": { color: "#fff" },
              }}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mt: 2,
                bgcolor: "rgba(255,255,255,0.08)",
                "& input": { color: "#fff" },
              }}
            />

            <Button fullWidth sx={{ mt: 2 }} onClick={hanldelogin}>
              Secure Login
            </Button>

            <Typography
              sx={{
                mt: 2,
                textAlign: "center",
                color:
                  messageType === "success"
                    ? "#22c55e"
                    : messageType === "error"
                      ? "#ef4444"
                      : "#facc15",
              }}
            >
              {loginMessage}
            </Typography>

            <Button
              fullWidth
              variant="plain"
              sx={{ mt: 1 }}
              onClick={() => setShowAdminModal(false)}
            >
              Cancel
            </Button>
          </Card>
        </Box>
      )}
    </div>
  );
}

export default Home;
