import img from "../../../assets/ChatApp/Images/avatar.jpg";
import img1 from "../../../assets/ChatApp/Images/palestine.jpg";
const initialConversations = [
  {
    id: 1,
    name: "Trainer A",
    avatar: img,
    status: "Online",
    unreadCount: 0,
    messages: [
      {
        sender: "Trainer A",
        text: "Hello , how are?",
        date: "27 July",
        time: "22:37",
        read: true,
      },
      {
        sender: "You",
        text: "Hi , I'm good",
        date: "27 July",
        time: "22:40",
        read: true,
      },
    ],
  },
  {
    id: 2,
    name: "Trainer B",
    avatar: img1,
    status: "Offline",
    unreadCount: 1,
    messages: [
      {
        sender: "Trainer B",
        text: "Your Lesson is at 10 AM",
        date: "7 September",
        time: "13:04",
        read: false,
      },
    ],
  },
  {
    id: 3,
    name: "Trainer C",
    avatar: img,
    status: "Online",
    unreadCount: 0,
    messages: [
      {
        sender: "Trainer A",
        text: "Hello , how are?",
        date: "27 July",
        time: "22:37",
        read: true,
      },
      {
        sender: "You",
        text: "Hi , I'm good",
        date: "27 July",
        time: "22:40",
        read: true,
      },
    ],
  },
  {
    id: 4,
    name: "Trainer D",
    avatar: img,
    status: "Online",
    unreadCount: 0,
    messages: [
      {
        sender: "Trainer A",
        text: "Hello , how are?",
        date: "27 July",
        time: "22:37",
        read: true,
      },
      {
        sender: "You",
        text: "Hi , I'm good",
        date: "27 July",
        time: "22:40",
        read: true,
      },
    ],
  },
];
export default initialConversations;
