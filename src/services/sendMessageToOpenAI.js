import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const sendMessageToOpenAI = async () => {
  // const { message } = req.body;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: "What is 3 * 7 equal to ?",
          },
        ],
      },
      {
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    console.log({ aiResponse });
    // res.json({ response: aiResponse });
  } catch (error) {
    console.error(
      "Error sending message to OpenAI:",
      error.response?.data || error.message
    );

    // if (error.response) {
    //   res.status(error.response.status).json({ error: error.response.data });
    // } else {
    //   res.status(500).json({ error: "An unexpected error occurred." });
    // }
  }
};

sendMessageToOpenAI();

// import axios from "axios";

// const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// export const sendMessageToOpenAI = async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await axios.post(
//       OPENAI_API_URL,
//       {
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: message }],
//       },
//       {
//         headers: {
//           Authorization: "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",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const aiResponse = response.data.choices[0].message.content;
//     res.json({ response: aiResponse });
//   } catch (error) {
//     console.error(
//       "Error sending message to OpenAI:",
//       error.response?.data || error.message
//     );

//     if (error.response) {
//       res.status(error.response.status).json({ error: error.response.data });
//     } else {
//       res.status(500).json({ error: "An unexpected error occurred." });
//     }
//   }
// };