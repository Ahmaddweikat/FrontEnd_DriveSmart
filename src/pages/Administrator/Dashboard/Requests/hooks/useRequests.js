import { useState, useEffect } from "react";

const useRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        school: {
          id: 1,
          name: "Al-Noor Driving Academy",
          email: "info@alnoor.com",
          phone: "123-456-7890",
          address: "123 Al-Quds St",
          city: "Nablus",
          description:
            "Premier driving school with over 20 years of experience in driver education. We offer comprehensive courses for all skill levels.",
          website: "www.alnoor.com",
          manager: {
            id: 1,
            firstName: "Mahmoud",
            lastName: "Khalil",
            email: "mahmoud.khalil@alnoor.com",
          },
        },
        status: "pending",
      },
      {
        id: 2,
        school: {
          id: 2,
          name: "Al-Amal Driving School",
          email: "contact@alamal.com",
          phone: "098-765-4321",
          address: "456 Al-Salam Ave",
          city: "Ramallah",
          description:
            "Specializing in defensive driving techniques and advanced driver training. State-certified instructors and modern fleet.",
          website: "www.alamal.com",
          manager: {
            id: 2,
            firstName: "Rania",
            lastName: "Hassan",
            email: "rania.h@alamal.com",
          },
        },
        status: "accepted",
      },
      {
        id: 3,
        school: {
          id: 3,
          name: "Al-Safwa Institute",
          email: "info@safwa.com",
          phone: "111-222-3333",
          address: "789 Al-Nasser Rd",
          city: "Hebron",
          description:
            "Focused on safety-first driving education with personalized learning plans. Offering both theory and practical lessons.",
          website: "www.safwa.com",
          manager: {
            id: 3,
            firstName: "Kareem",
            lastName: "Mansour",
            email: "k.mansour@safwa.com",
          },
        },
        status: "rejected",
      },
      {
        id: 4,
        school: {
          id: 4,
          name: "Al-Mumtaz Academy",
          email: "contact@mumtaz.com",
          phone: "444-555-6666",
          address: "321 Al-Zahra Blvd",
          city: "Jenin",
          description:
            "Luxury driving instruction with focus on high-performance vehicles and defensive driving techniques.",
          website: "www.mumtaz.com",
          manager: {
            id: 4,
            firstName: "Ziad",
            lastName: "Qasim",
            email: "z.qasim@mumtaz.com",
          },
        },
        status: "pending",
      },
      {
        id: 5,
        school: {
          id: 5,
          name: "Al-Maher Drivers School",
          email: "info@maher.com",
          phone: "777-888-9999",
          address: "555 Al-Manara St",
          city: "Tulkarm",
          description:
            "Specialized in urban driving instruction with emphasis on city navigation and parallel parking.",
          website: "www.maher.com",
          manager: {
            id: 5,
            firstName: "Layla",
            lastName: "Othman",
            email: "layla.o@maher.com",
          },
        },
        status: "accepted",
      },
    ];

    // Simulate API call
    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAccept = async (requestId) => {
    try {
      // Simulate API call
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: "accepted" }
            : request
        )
      );
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const handleReject = async (requestId) => {
    try {
      // Simulate API call
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: "rejected" }
            : request
        )
      );
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  return {
    requests,
    loading,
    error,
    handleAccept,
    handleReject,
  };
};

export default useRequests;
