import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import axios from 'axios';
import img from "./../../../assets/ChatBot/chatbot.png";

const ChatInterface = ({ open, setOpen }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to the bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Create user message object
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
    };

    // Add user message to chat history
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage(""); // Clear input field after updating chat history
    setIsLoading(true);

    try {
      // Send user message to OpenAI
      const aiResponseText = await sendMessageToOpenAI({ message: trimmedMessage });

      // Create AI response object
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiResponseText,
      };

      // Update chat history with AI response
      setChatHistory((prev) => [...prev, aiResponse]);
    } catch (error) {
      // Handle errors gracefully
      const errorMessage = {
        id: Date.now() + 2,
        role: "assistant",
        content: error.message || "Sorry, I couldn't process your request.",
      };

      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageToOpenAI = async ({ message }) => {
    const SERVER_API_URL = "http://localhost:3001/api/chat"; // Your backend URL
    try {
      const response = await axios.post(
        SERVER_API_URL,
        { message },
        {
          headers: {

            "Content-Type": "application/json",
          },
          withCredentials: true, // Optional if you need credentials (like cookies)
        }
      );

      console.log(response.data); // Log the response to check the result
      return response.data.response;
    } catch (error) {
      console.error("Server Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || "Failed to get response from server");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "80px",
        right: open ? 0 : "-400px",
        width: "330px",
        height: "calc(100% - 80px)",
        backgroundColor: "#FFFFFF",
        boxShadow: "-2px 0 28px rgba(0,0,0,0.12)",
        transition: "right 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid rgba(0,0,0,0.08)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          background: "linear-gradient(135deg, #4CAF50, #2E7D32)", 
          borderBottom: "2px solid #4CAF50", 
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "#E8F5E9",
            border: "2px solid #4CAF50",
          }}
          src={img}
          alt="Smart Drive Support"
        />
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "white",
            }}
          >
            DRIVE MASTER BOT
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: "blue",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "blue",
                display: "inline-block",
              }}
            />
            Available
          </Typography>
        </Box>
        <IconButton 
          onClick={() => setOpen(false)}
          sx={{ 
            color: "white",
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {chatHistory.map((chat) => (
          <Box
            key={chat.id}
            sx={{
              alignSelf: chat.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              backgroundColor: chat.role === "user" ? "#E8F5E9" : "#fff",
              p: 1.5,
              borderRadius: chat.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              wordBreak: "break-word",
              fontSize: "0.9rem",
              lineHeight: 1.5,
              position: "relative",
              '&::after': chat.role === "user" ? {
                content: '""',
                position: "absolute",
                bottom: 0,
                right: "-4px",
                width: "8px",
                height: "8px",
                backgroundColor: "#E8F5E9",
                transform: "rotate(45deg)",
              } : {},
            }}
          >
            <Typography variant="body2">{chat.content}</Typography>
          </Box>
        ))}
        {isLoading && (
          <Box
            sx={{
              alignSelf: "flex-start",
              backgroundColor: "#fff",
              p: 1.5,
              borderRadius: "18px 18px 18px 4px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#64748b" }}>Typing</Typography>
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              {[1, 2, 3].map((dot) => (
                <Box
                  key={dot}
                  sx={{
                    width: 4,
                    height: 4,
                    backgroundColor: "#64748b",
                    borderRadius: "50%",
                    animation: "bounce 1.4s infinite ease-in-out",
                    animationDelay: `${(dot - 1) * 0.16}s`,
                    "@keyframes bounce": {
                      "0%, 80%, 100%": { transform: "scale(0)" },
                      "40%": { transform: "scale(1)" },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
        <div ref={chatEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          p: 3,
          backgroundColor: "#fff",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            inputProps={{
              maxLength: 200,
              style: { 
                fontSize: "0.9rem",
                padding: "10px 14px",
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 30,
                backgroundColor: "#f8f9fa",
                "& fieldset": { 
                  border: "1px solid rgba(0,0,0,0.08)",
                  transition: "border-color 0.2s",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0,0,0,0.15)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "1px",
                },
              },
            }}
          />

          <IconButton
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            sx={{
              p: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              "&:hover": { 
                backgroundColor: "#388E3C" 
              },
              "&.Mui-disabled": {
                backgroundColor: "#e0e0e0",
                color: "#bdbdbd",
              },
              transition: "all 0.2s",
            }}
          >
            <Send sx={{ 
              transform: "rotate(-45deg)",
              fontSize: "1.2rem",
              
            }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInterface;
