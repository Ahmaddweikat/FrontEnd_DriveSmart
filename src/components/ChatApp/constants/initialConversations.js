import img from "../../../assets/ChatApp/Images/avatar.jpg";
import img1 from "../../../assets/ChatApp/Images/palestine.jpg";
const initialConversations = [
  {
    id: 1,
    name: "Trainer A",
    avatar: img,
    status: "Online",
    messages: [
      {
        sender: "Trainer A",
        text: "Hello , how are?",
        date: "27 July",
        time: "22:37",
      },
      {
        sender: "You",
        text: "Hi , I'm good",
        date: "27 July",
        time: "22:40",
      },
    ],
  },
  {
    id: 2,
    name: "Trainer B",
    avatar: img1,
    status: "Offline",
    messages: [
      {
        sender: "Trainer B",
        text: "Your Lesson is at 10 AM",
        date: "7 September",
        time: "13:04",
      },
    ],
  },
];
export default initialConversations;
