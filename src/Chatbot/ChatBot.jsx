import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  // Typography,
  // IconButton,
  // Button,
  // Textarea,
  // Sheet,
} from "@mui/joy";

// import MenuIcon from "@mui/icons-material/Menu";
// import SendIcon from "@mui/icons-material/Send";
// import AddIcon from "@mui/icons-material/Add";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import PersonIcon from "@mui/icons-material/Person";
// import TypingComponent from "./Component/TypingComponent";
// import ReactMarkdown from "react-markdown";

import { axiosLogin, chataxios } from "../Axios/axios";
import { typeMessageReact } from "./CommonCode/Common";
import { getAuthUser } from "../constant/Constant";
import Sidebar from "./Component/Sidebar";
import ChatWindow from "./Component/ChatWindow";
import ChatInput from "./Component/ChatInput";

const user = getAuthUser();

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const textareaRef = useRef(null);

  // auto scroll
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // textarea resize
  const handleInput = (e) => {
    setInput(e.target.value);

    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return; //  prevent double send

    const msg = input;

    addMessage(msg, "user");
    setInput("");
    setLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      //  add loading message
      setMessages((prev) => [
        ...prev,
        { text: "", sender: "bot", loading: true }
      ]);

      const res = await chataxios.post("/chat", {
        query: msg,
      });

      const reply = res.data.response || "No response";

      //  replace loading → start typing
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          text: "",
          sender: "bot",
          loading: false,
        };
        return updated;
      });

      //  typing animation
      typeMessageReact(setMessages, reply, async () => {
        try {
          await axiosLogin.post("/chat/insert", {
            user_id: user?.logged_id || null,
            query: msg,
            response: reply,
          });
        } catch (err) {
          console.error("DB save error:", err);
        }

        setLoading(false);
      });

    } catch (err) {
      console.error(err);

      let errorMsg = "❌ Something went wrong!";

      if (err?.response?.status === 429) {
        errorMsg = "⚠️ Daily AI limit reached. Try again later.";
      }

      //  replace loading message (NOT add new one)
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          text: errorMsg,
          sender: "bot",
          loading: false,
        };
        return updated;
      });

      setLoading(false);
    }
  };
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#131314" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow messages={messages} chatRef={chatRef} />

        <ChatInput
          input={input}
          loading={loading}
          handleInput={handleInput}
          sendMessage={sendMessage}
          textareaRef={textareaRef}
        />
      </Box>
    </Box>
  );
};

export default ChatBot;