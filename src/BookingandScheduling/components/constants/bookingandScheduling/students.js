// Student.js

const students = [
  {
    studentId: 1,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phoneNumber: "123-456-7890",
    licenseType: "Standard", // Type of license student is pursuing
    schoolId: 1, // The school the student belongs to
    bookedLessons: [
      {
        schoolId: 1,
        instructorId: 1,
        carId: 2,
        date: "2024-11-12",
        timeSlot: "09:00 AM",
        lessonStatus: "Pending", // Lesson status (Pending or Confirmed)
      },
      {
        schoolId: 2,
        instructorId: 4,
        carId: 4,
        date: "2024-11-15",
        timeSlot: "01:00 PM",
        lessonStatus: "Confirmed",
      },
    ],
    preferences: {
      carType: "car",
      instructorExperience: 3,
    },
  },
  {
    studentId: 2,
    name: "Bob Green",
    email: "bob.green@example.com",
    phoneNumber: "987-654-3210",
    licenseType: "Commercial", // Type of license
    schoolId: 2, // The school the student belongs to
    bookedLessons: [
      {
        schoolId: 1,
        instructorId: 2,
        carId: 1,
        date: "2024-11-16",
        timeSlot: "10:00 AM",
        lessonStatus: "Confirmed", // Lesson status
      },
    ],
    preferences: {
      carType: "bus",
      instructorExperience: 5,
    },
  },
];

export { students };
