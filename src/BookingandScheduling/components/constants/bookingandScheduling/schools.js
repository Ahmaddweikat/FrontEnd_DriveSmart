import dayjs from "dayjs";

function generateTimeSlots(
  startTime = "08:00",
  endTime = "20:00",
  interval = 40
) {
  const slots = [];
  let current = dayjs(startTime, "HH:mm");

  while (current.isBefore(dayjs(endTime, "HH:mm"))) {
    slots.push(current.format("HH:mm A"));
    current = current.add(interval, "minute");
  }
  return slots;
}

const schools = [
  {
    schoolId: 1,
    name: "City Driving School",
    favoriteTheme: "Gold",
    logoUrl: "https://example.com/logos/city-driving-school-logo.png",
    cars: [
      {
        carId: 1,
        model: "Toyota Corolla",
        type: "car",
        timeSlots: generateTimeSlots(),
        availableTimeSlots: generateTimeSlots(),
        assignedTo: "school", // Car is available for general use
      },
      {
        carId: 2,
        model: "Honda Civic",
        type: "taxi",
        timeSlots: generateTimeSlots(),
        availableTimeSlots: generateTimeSlots(),
        assignedTo: 1, // Car is assigned to instructor with instructorId 1
      },
    ],
    instructors: [
      {
        instructorId: 1,
        name: "John Doe",
        experience: 5,
        timeSlots: generateTimeSlots(),
        availableTimeSlots: generateTimeSlots(),
        lessons: [
          {
            studentId: 1,
            carId: 2,
            date: "2024-11-12",
            timeSlot: "09:00 AM",
            lessonStatus: "Pending",
          },
        ],
      },
      {
        instructorId: 2,
        name: "Jane Smith",
        experience: 3,
        timeSlots: generateTimeSlots(),
        availableTimeSlots: generateTimeSlots(),
        lessons: [
          {
            studentId: 2,
            carId: 1,
            date: "2024-11-16",
            timeSlot: "10:00 AM",
            lessonStatus: "Confirmed",
          },
        ],
      },
    ],
  },
  {
    schoolId: 2,
    name: "Advanced Driving Academy",
    logoUrl: "https://example.com/logos/city-driving-school-logo.png",
    favoriteTheme: "Gold",
    cars: [
      {
        carId: 3,
        model: "Ford Focus",
        type: "car",
        timeSlots: generateTimeSlots(),
        availableTimeSlots: generateTimeSlots(),
        assignedTo: "school", // Car is available for general use
      },
      {
        carId: 4,
        model: "Chevrolet Malibu",
        type: "bus",
        timeSlots: generateTimeSlots(),
        availableTimeSlots: generateTimeSlots(),
        assignedTo: 3, // Car is assigned to instructor with instructorId 3
      },
    ],
    instructors: [
      {
        instructorId: 3,
        name: "Alice Johnson",
        experience: 4,
        timeSlots: generateTimeSlots(),
        availableTimeSlots: generateTimeSlots(),
        lessons: [
          {
            studentId: 1,
            carId: 3,
            date: "2024-11-15",
            timeSlot: "01:00 PM",
            lessonStatus: "Confirmed",
          },
        ],
      },
      {
        instructorId: 4,
        name: "Bob Lee",
        experience: 6,
        timeSlots: generateTimeSlots(),
        availableTimeSlots: generateTimeSlots(),
        lessons: [
          {
            studentId: 2,
            carId: 4,
            date: "2024-11-16",
            timeSlot: "02:00 PM",
            lessonStatus: "Pending",
          },
        ],
      },
    ],
  },
];

export { schools };
