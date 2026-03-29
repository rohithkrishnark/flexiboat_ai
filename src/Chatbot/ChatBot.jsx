import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/joy";
import { axiosLogin, chataxios } from "../Axios/axios";
import { typeMessageReact } from "./CommonCode/Common";
import { getAuthUser } from "../constant/Constant";
import Sidebar from "./Component/Sidebar";
import ChatWindow from "./Component/ChatWindow";
import ChatInput from "./Component/ChatInput";
import { useFetchLatestChat } from "../ADMIN/CommonCode/useQuery";
import FloatingBackButton from "../Component/FloatingBackButton";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);
  const textareaRef = useRef(null);

  const user = getAuthUser();

  //  FETCH LAST 10 CHATS
  const { data: LastFewChats ,refetch:FetchLastMessage} = useFetchLatestChat();

  //  NEW CHAT (CLEAR EVERYTHING)
  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setLoading(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

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
    if (!input.trim() || loading) return;

    const msg = input;

    addMessage(msg, "user");
    setInput("");
    setLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      // loading msg
      setMessages((prev) => [
        ...prev,
        { text: "", sender: "bot", loading: true }
      ]);

      const res = await chataxios.post("/chat", {
        query: msg,
        isLoggedIn: user !== null
      });

      const reply = res.data.response || "No response";

      // replace loading
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          text: "",
          sender: "bot",
          loading: false,
        };
        return updated;
      });

      // typing animation
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
        FetchLastMessage()
      });

    } catch (err) {
      console.error(err);

      let errorMsg = "❌ Something went wrong!";

      if (err?.response?.status === 429) {
        errorMsg = "⚠️ Daily AI limit reached.";
      }

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

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onNewChat={handleNewChat}
        chats={LastFewChats || []}   // ✅ PASS DATA
      />

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
      <FloatingBackButton/>
    </Box>
  );
};

export default ChatBot;