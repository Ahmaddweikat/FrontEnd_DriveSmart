const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// POST route for handling chat messages
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4o-mini", // Use the correct model identifier
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use the key from environment variables
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error sending message to OpenAI:", error);
    res.status(500).json({
      error: error.response?.data?.error?.message || "An error occurred while processing your request.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
