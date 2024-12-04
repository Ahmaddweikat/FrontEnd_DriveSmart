export const chatSchema = {
  id: Number,
  name: String,
  avatar: String,
  status: String,
  messages: [
    {
      id: Number,
      text: String,
      sender: String,
      date: Date,
      time: String,
      isUser: Boolean,
    },
  ],
};
