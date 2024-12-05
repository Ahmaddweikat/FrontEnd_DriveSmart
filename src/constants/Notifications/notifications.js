import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const notifications = [
  {
    id: 1,
    type: 'booking',
    message: 'Lesson Confirmed: Your lesson with Trainer Alex Smith is confirmed for tomorrow at 2:00 PM',
    time: '5 minutes ago',
    read: false,
    icon: <CheckCircleIcon />,
    color: 'green'
  },
  {
    id: 2,
    type: 'booking',
    message: 'Lesson Canceled: Your lesson with Trainer Sarah Johnson for today at 3:00 PM has been canceled',
    time: '10 minutes ago',
    read: false,
    icon: <CancelIcon />,
    color: 'red'
  },
  {
    id: 3,
    type: 'student',
    message: 'New Student Registration: Welcome Mike Smith! Please complete your profile',
    time: '1 hour ago',
    read: false,
    icon: <PersonAddIcon />,
    color: 'blue'
  },
  {
    id: 4,
    type: 'review',
    message: 'New Review: Your last lesson with Trainer David Brown has been reviewed',
    time: '2 hours ago',
    read: true,
    icon: <StarIcon />,
    color: 'yellow'
  },
  {
    id: 5,
    type: 'booking',
    message: 'Upcoming Lesson: Reminder - You have a lesson tomorrow with Trainer Lisa White at 10:00 AM',
    time: '3 hours ago',
    read: true,
    icon: <EventIcon />,
    color: 'blue'
  }
];