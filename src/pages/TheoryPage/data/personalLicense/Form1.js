import optionAImage from "../../../../assets/Questions/Images/a.png";
import optionBImage from "../../../../assets/Questions/Images/b.png";
import optionCImage from "../../../../assets/Questions/Images/c.png";
import optionDImage from "../../../../assets/Questions/Images/d.png";
import optionD7Image from "../../../../assets/Questions/Images/dimage.png";

export const questions = [
  {
    id: 1,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/question1.png"),
    options: [
      "Junction on the left.",
      "Stop line on the road surface.",
      "No right turn.",
      "Junction on the right.",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "What is the sign that allows parking next to the sidewalk with a parking card:",
    image: null,
    options: [
      <img
        src={optionAImage}
        alt="Option A"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionBImage}
        alt="Option B"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionCImage}
        alt="Option C"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionDImage}
        alt="Option D"
        // style={{ width: "120px", height: "50px" }}
      />,
    ],
    correctAnswer: 2, // Index of the correct answer (0-based)
  },
  {
    id: 3,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q3.png"),
    options: [
      "The pedestrian crossing is about 150 metres away.",
      "Pedestrian only.",
      "No pedestrians allowed.",
      "Children nearby.",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q4.png"),
    options: [
      "Entry of mechanical vehicles is prohibited.",
      "It is forbidden to stop or stop except to implement a legal order.",
      "Private courtyard entrance.",
      "It is prohibited to park vehicles on the side where the sign is installed.",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What does the sign end with?",
    image: require("../../../../assets/Questions/Images/Q7.png"),
    options: [
      "The end of a narrow road or a nearby intersection.",
      "Only the nearest intersection.",
      "All answers are correct.",
      <div className="flex items-center">
        <span>The Sign</span>
        <img
          src={optionD7Image}
          alt="Option D"
          // style={{ width: "120px", height: "50px" }}
        />
      </div>,
    ],
    correctAnswer: 0,
  },
  {
    id: 1,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/question1.png"),
    options: [
      "Junction on the left.",
      "Stop line on the road surface.",
      "No right turn.",
      "Junction on the right.",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "What is the sign that allows parking next to the sidewalk with a parking card:",
    image: null,
    options: [
      <img
        src={optionAImage}
        alt="Option A"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionBImage}
        alt="Option B"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionCImage}
        alt="Option C"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionDImage}
        alt="Option D"
        // style={{ width: "120px", height: "50px" }}
      />,
    ],
    correctAnswer: 2, // Index of the correct answer (0-based)
  },
  {
    id: 3,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q3.png"),
    options: [
      "The pedestrian crossing is about 150 metres away.",
      "Pedestrian only.",
      "No pedestrians allowed.",
      "Children nearby.",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q4.png"),
    options: [
      "Entry of mechanical vehicles is prohibited.",
      "It is forbidden to stop or stop except to implement a legal order.",
      "Private courtyard entrance.",
      "It is prohibited to park vehicles on the side where the sign is installed.",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What does the sign end with?",
    image: require("../../../../assets/Questions/Images/Q7.png"),
    options: [
      "The end of a narrow road or a nearby intersection.",
      "Only the nearest intersection.",
      "All answers are correct.",
      <div className="flex items-center">
        <span>The Sign</span>
        <img
          src={optionD7Image}
          alt="Option D"
          // style={{ width: "120px", height: "50px" }}
        />
      </div>,
    ],
    correctAnswer: 0,
  },
  {
    id: 1,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/question1.png"),
    options: [
      "Junction on the left.",
      "Stop line on the road surface.",
      "No right turn.",
      "Junction on the right.",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "What is the sign that allows parking next to the sidewalk with a parking card:",
    image: null,
    options: [
      <img
        src={optionAImage}
        alt="Option A"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionBImage}
        alt="Option B"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionCImage}
        alt="Option C"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionDImage}
        alt="Option D"
        // style={{ width: "120px", height: "50px" }}
      />,
    ],
    correctAnswer: 2, // Index of the correct answer (0-based)
  },
  {
    id: 3,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q3.png"),
    options: [
      "The pedestrian crossing is about 150 metres away.",
      "Pedestrian only.",
      "No pedestrians allowed.",
      "Children nearby.",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q4.png"),
    options: [
      "Entry of mechanical vehicles is prohibited.",
      "It is forbidden to stop or stop except to implement a legal order.",
      "Private courtyard entrance.",
      "It is prohibited to park vehicles on the side where the sign is installed.",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What does the sign end with?",
    image: require("../../../../assets/Questions/Images/Q7.png"),
    options: [
      "The end of a narrow road or a nearby intersection.",
      "Only the nearest intersection.",
      "All answers are correct.",
      <div className="flex items-center">
        <span>The Sign</span>
        <img
          src={optionD7Image}
          alt="Option D"
          // style={{ width: "120px", height: "50px" }}
        />
      </div>,
    ],
    correctAnswer: 0,
  },
  {
    id: 1,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/question1.png"),
    options: [
      "Junction on the left.",
      "Stop line on the road surface.",
      "No right turn.",
      "Junction on the right.",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "What is the sign that allows parking next to the sidewalk with a parking card:",
    image: null,
    options: [
      <img
        src={optionAImage}
        alt="Option A"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionBImage}
        alt="Option B"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionCImage}
        alt="Option C"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionDImage}
        alt="Option D"
        // style={{ width: "120px", height: "50px" }}
      />,
    ],
    correctAnswer: 2, // Index of the correct answer (0-based)
  },
  {
    id: 3,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q3.png"),
    options: [
      "The pedestrian crossing is about 150 metres away.",
      "Pedestrian only.",
      "No pedestrians allowed.",
      "Children nearby.",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q4.png"),
    options: [
      "Entry of mechanical vehicles is prohibited.",
      "It is forbidden to stop or stop except to implement a legal order.",
      "Private courtyard entrance.",
      "It is prohibited to park vehicles on the side where the sign is installed.",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What does the sign end with?",
    image: require("../../../../assets/Questions/Images/Q7.png"),
    options: [
      "The end of a narrow road or a nearby intersection.",
      "Only the nearest intersection.",
      "All answers are correct.",
      <div className="flex items-center">
        <span>The Sign</span>
        <img
          src={optionD7Image}
          alt="Option D"
          // style={{ width: "120px", height: "50px" }}
        />
      </div>,
    ],
    correctAnswer: 0,
  },
  {
    id: 1,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/question1.png"),
    options: [
      "Junction on the left.",
      "Stop line on the road surface.",
      "No right turn.",
      "Junction on the right.",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "What is the sign that allows parking next to the sidewalk with a parking card:",
    image: null,
    options: [
      <img
        src={optionAImage}
        alt="Option A"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionBImage}
        alt="Option B"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionCImage}
        alt="Option C"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionDImage}
        alt="Option D"
        // style={{ width: "120px", height: "50px" }}
      />,
    ],
    correctAnswer: 2, // Index of the correct answer (0-based)
  },
  {
    id: 3,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q3.png"),
    options: [
      "The pedestrian crossing is about 150 metres away.",
      "Pedestrian only.",
      "No pedestrians allowed.",
      "Children nearby.",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q4.png"),
    options: [
      "Entry of mechanical vehicles is prohibited.",
      "It is forbidden to stop or stop except to implement a legal order.",
      "Private courtyard entrance.",
      "It is prohibited to park vehicles on the side where the sign is installed.",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What does the sign end with?",
    image: require("../../../../assets/Questions/Images/Q7.png"),
    options: [
      "The end of a narrow road or a nearby intersection.",
      "Only the nearest intersection.",
      "All answers are correct.",
      <div className="flex items-center">
        <span>The Sign</span>
        <img
          src={optionD7Image}
          alt="Option D"
          // style={{ width: "120px", height: "50px" }}
        />
      </div>,
    ],
    correctAnswer: 0,
  },
  {
    id: 1,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/question1.png"),
    options: [
      "Junction on the left.",
      "Stop line on the road surface.",
      "No right turn.",
      "Junction on the right.",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "What is the sign that allows parking next to the sidewalk with a parking card:",
    image: null,
    options: [
      <img
        src={optionAImage}
        alt="Option A"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionBImage}
        alt="Option B"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionCImage}
        alt="Option C"
        // style={{ width: "120px", height: "50px" }}
      />,
      <img
        src={optionDImage}
        alt="Option D"
        // style={{ width: "120px", height: "50px" }}
      />,
    ],
    correctAnswer: 2, // Index of the correct answer (0-based)
  },
  {
    id: 3,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q3.png"),
    options: [
      "The pedestrian crossing is about 150 metres away.",
      "Pedestrian only.",
      "No pedestrians allowed.",
      "Children nearby.",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "What does the sign mean?",
    image: require("../../../../assets/Questions/Images/Q4.png"),
    options: [
      "Entry of mechanical vehicles is prohibited.",
      "It is forbidden to stop or stop except to implement a legal order.",
      "Private courtyard entrance.",
      "It is prohibited to park vehicles on the side where the sign is installed.",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What does the sign end with?",
    image: require("../../../../assets/Questions/Images/Q7.png"),
    options: [
      "The end of a narrow road or a nearby intersection.",
      "Only the nearest intersection.",
      "All answers are correct.",
      <div className="flex items-center">
        <span>The Sign</span>
        <img
          src={optionD7Image}
          alt="Option D"
          // style={{ width: "120px", height: "50px" }}
        />
      </div>,
    ],
    correctAnswer: 0,
  },
  
  
];
