import SchoolIcon from '@mui/icons-material/School';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import img2 from "../../../../assets/BookingAndScheduling/type/images/learning.jpg";
import img3 from "../../../../assets/BookingAndScheduling/type/images/practial.jpeg";
import img4 from "../../../../assets/BookingAndScheduling/type/images/revision.png";

export const lessons = [
    
    {
      title: "Practical Lesson",
      description: "Hands-on driving experience to master vehicle control, road safety, and real-world driving scenarios.",
      image: img3,
      icon: DriveEtaIcon,
      price: "90",
      type: "practical"
    },
    {
      title: "Revision Lesson",
      description: "Comprehensive review session to reinforce your driving skills and prepare for your driving test.",
      image: img4,
      icon: AutoStoriesIcon,
      price: "60",
      type: "revision"
    }
  ];