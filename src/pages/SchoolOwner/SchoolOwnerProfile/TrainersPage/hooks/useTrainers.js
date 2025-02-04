import { useState, useEffect, useMemo } from "react";

const useTrainers = () => {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Ahmad Khalil",
      email: "AhmadKhalil@example.com",
      phone: "1234567890",
      status: "available",
      studentsCount: 5,
      avatar: "https://example.com/avatar1.jpg",
      joinedDate: "2023-01-15",
      students: [
        {
          id: 1,
          name: "Mohammed Ali",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          gender: "Male",
          licenseType: "Class A",
          phone: "555-123-4567",
          lessonsTaken: 12,
          bloodType: "A+",
        },
        {
          id: 2,
          name: "Fatima Hassan",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
          gender: "Female",
          licenseType: "Class B",
          phone: "098-765-4321",
          lessonsTaken: 8,
          bloodType: "O-",
        },
        {
          id: 3,
          name: "Layla Ibrahim",
          avatar: "https://randomuser.me/api/portraits/women/10.jpg",
          gender: "Female",
          licenseType: "Class B",
          phone: "555-123-4567",
          lessonsTaken: 15,
          bloodType: "B+",
        },
      ],
      availability: [
        {
          id: 1,
          type: "recurring",
          days: ["Monday", "Wednesday", "Friday"],
          time: "9:00 AM",
          carName: "Toyota Camry",
          carImage: "/cars/toyota-camry.jpg",
        },
        {
          id: 2,
          type: "specific",
          specificDate: "2025-01-15",
          time: "2:00 PM",
          carName: "Honda Civic",
          carImage: "/cars/honda-civic.jpg",
        },
        {
          id: 3,
          type: "specific",
          specificDate: "2025-01-20",
          time: "3:30 PM",
          carName: "Honda Civic",
          carImage: "/cars/honda-civic.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Omar Youssef",
      email: "jane.smith@example.com",
      phone: "9876543210",
      status: "busy",
      studentsCount: 3,
      avatar: "https://example.com/avatar2.jpg",
      joinedDate: "2023-02-20",
      students: [
        {
          id: 4,
          name: "Kareem Mahmoud",
          avatar: "https://randomuser.me/api/portraits/men/4.jpg",
          gender: "Male",
          licenseType: "Class B",
          phone: "444-555-6666",
          lessonsTaken: 5,
          bloodType: "AB+",
        },
        {
          id: 5,
          name: "Noor Abdullah",
          avatar: "https://randomuser.me/api/portraits/women/5.jpg",
          gender: "Female",
          licenseType: "Class A",
          phone: "777-888-9999",
          lessonsTaken: 20,
          bloodType: "O+",
        },
        {
          id: 6,
          name: "Zaid Rahman",
          avatar: "https://randomuser.me/api/portraits/men/6.jpg",
          gender: "Male",
          licenseType: "Class B",
          phone: "111-222-3333",
          lessonsTaken: 2,
          bloodType: "A-",
        },
      ],
      availability: [
        {
          id: 4,
          type: "recurring",
          days: ["Tuesday", "Thursday"],
          time: "11:00 AM",
          carName: "Toyota Corolla",
          carImage: "/cars/toyota-corolla.jpg",
        },
        {
          id: 5,
          type: "specific",
          specificDate: "2025-01-25",
          time: "3:30 PM",
          carName: "Mazda 3",
          carImage: "/cars/mazda-3.jpg",
        },
        {
          id: 6,
          type: "specific",
          specificDate: "2025-01-10",
          time: "1:00 PM",
          carName: "Mazda 3",
          carImage: "/cars/mazda-3.jpg",
        },
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const filterTrainers = (searchTerm, statusFilter) => {
    return trainers.filter((trainer) => {
      const matchesSearch =
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        trainer.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  };

  return {
    trainers,
    loading,
    error,
    filterTrainers,
  };
};

export default useTrainers;
