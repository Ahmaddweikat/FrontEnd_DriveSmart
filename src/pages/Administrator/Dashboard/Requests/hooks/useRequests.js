import { useState, useEffect } from 'react';

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
          name: "Drive Master Academy",
          email: "info@drivemaster.com",
          phone: "123-456-7890",
          address: "123 Drive St",
          city: "New York",
          description: "Premier driving school with over 20 years of experience in driver education. We offer comprehensive courses for all skill levels.",
          website: "www.drivemaster.com",
          manager: {
            id: 1,
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@drivemaster.com"
          }
        },
        status: "pending",
        submissionDate: "2024-01-15T10:30:00",
        message: "Request for school registration approval"
      },
      {
        id: 2,
        school: {
          id: 2,
          name: "Pro Drivers School",
          email: "contact@prodrivers.com",
          phone: "098-765-4321",
          address: "456 Pro Ave",
          city: "Los Angeles",
          description: "Specializing in defensive driving techniques and advanced driver training. State-certified instructors and modern fleet.",
          website: "www.prodrivers.com",
          manager: {
            id: 2,
            firstName: "Sarah",
            lastName: "Johnson",
            email: "sarah.j@prodrivers.com"
          }
        },
        status: "accepted",
        submissionDate: "2024-01-14T15:45:00",
        message: "Request for school registration approval"
      },
      {
        id: 3,
        school: {
          id: 3,
          name: "Safe Drive Institute",
          email: "info@safedrive.com",
          phone: "111-222-3333",
          address: "789 Safe Rd",
          city: "Chicago",
          description: "Focused on safety-first driving education with personalized learning plans. Offering both theory and practical lessons.",
          website: "www.safedrive.com",
          manager: {
            id: 3,
            firstName: "Michael",
            lastName: "Brown",
            email: "m.brown@safedrive.com"
          }
        },
        status: "rejected",
        submissionDate: "2024-01-13T09:15:00",
        message: "Request for school registration approval"
      },
      {
        id: 4,
        school: {
          id: 4,
          name: "Elite Driving Academy",
          email: "contact@elitedriving.com",
          phone: "444-555-6666",
          address: "321 Elite Blvd",
          city: "Miami",
          description: "Luxury driving instruction with focus on high-performance vehicles and defensive driving techniques.",
          website: "www.elitedriving.com",
          manager: {
            id: 4,
            firstName: "David",
            lastName: "Wilson",
            email: "d.wilson@elitedriving.com"
          }
        },
        status: "pending",
        submissionDate: "2024-01-16T08:20:00",
        message: "Request for school registration approval"
      },
      {
        id: 5,
        school: {
          id: 5,
          name: "City Drivers School",
          email: "info@citydrivers.com",
          phone: "777-888-9999",
          address: "555 Urban St",
          city: "Boston",
          description: "Specialized in urban driving instruction with emphasis on city navigation and parallel parking.",
          website: "www.citydrivers.com",
          manager: {
            id: 5,
            firstName: "Emily",
            lastName: "Davis",
            email: "emily.d@citydrivers.com"
          }
        },
        status: "accepted",
        submissionDate: "2024-01-12T14:30:00",
        message: "Request for school registration approval"
      }
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
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId
            ? { ...request, status: 'accepted' }
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
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId
            ? { ...request, status: 'rejected' }
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
    handleReject
  };
};

export default useRequests;
