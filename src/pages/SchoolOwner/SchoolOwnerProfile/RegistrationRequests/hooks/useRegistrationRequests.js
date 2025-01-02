import { useState, useEffect } from 'react';

const sampleRequests = [
  {
    id: 1,
    status: "pending",
    student: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      licenseType: "Class B"
    },
    files: [
      { name: "ID Card", url: "/sample/id-card.pdf" },
      { name: "Medical Certificate", url: "/sample/medical.pdf" }
    ],
    submissionDate: "2024-12-28"
  },
  {
    id: 2,
    status: "pending",
    student: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      licenseType: "Class A"
    },
    files: [
      { name: "ID Card", url: "/sample/id-card.pdf" },
      { name: "Medical Certificate", url: "/sample/medical.pdf" }
    ],
    submissionDate: "2024-12-29"
  },
  {
    id: 3,
    status: "accepted",
    student: {
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      phone: "+1122334455",
      licenseType: "Class B"
    },
    files: [
      { name: "ID Card", url: "/sample/id-card.pdf" },
      { name: "Medical Certificate", url: "/sample/medical.pdf" }
    ],
    submissionDate: "2024-12-25"
  },
  {
    id: 4,
    status: "rejected",
    student: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+5544332211",
      licenseType: "Class A"
    },
    files: [
      { name: "ID Card", url: "/sample/id-card.pdf" },
      { name: "Medical Certificate", url: "/sample/medical.pdf" }
    ],
    submissionDate: "2024-12-24",
    rejectionReason: "Incomplete documentation"
  },
  {
    id: 5,
    status: "pending",
    student: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1234567890",
      licenseType: "Class B"
    },
    files: [
      { name: "ID Card", url: "/sample/id-card.pdf" },
      { name: "Medical Certificate", url: "/sample/medical.pdf" }
    ],
    submissionDate: "2024-12-30"
  },
  {
    id: 6,
    status: "accepted",
    student: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+9876543210",
      licenseType: "Class A"
    },
    files: [
      { name: "ID Card", url: "/sample/id-card.pdf" },
      { name: "Medical Certificate", url: "/sample/medical.pdf" }
    ],
    submissionDate: "2024-12-27"
  },
  {
    id: 7,
    status: "rejected",
    student: {
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1122334455",
      licenseType: "Class B"
    },
    files: [
      { name: "ID Card", url: "/sample/id-card.pdf" },
      { name: "Medical Certificate", url: "/sample/medical.pdf" }
    ],
    submissionDate: "2024-12-23",
    rejectionReason: "Missing required documents"
  },
  {
    id: 8,
    status: "pending",
    student: {
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      phone: "+5544332211",
      licenseType: "Class A"
    },
    files: [
      { name: "ID Card", url: "/sample/id-card.pdf" },
      { name: "Medical Certificate", url: "/sample/medical.pdf" }
    ],
    submissionDate: "2024-12-31"
  }
];

const useRegistrationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRegistrationRequests = async () => {
    try {
      // Simulating API call with sample data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRequests(sampleRequests);
      setError(null);
    } catch (error) {
      setError('Error fetching requests: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "accepted" }
          : req
      ));
      return true;
    } catch (error) {
      setError('Error accepting request: ' + error.message);
      return false;
    }
  };

  const handleReject = async (requestId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "rejected", rejectionReason: "Request rejected" }
          : req
      ));
      return true;
    } catch (error) {
      setError('Error rejecting request: ' + error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchRegistrationRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    handleAccept,
    handleReject,
    refreshRequests: fetchRegistrationRequests
  };
};

export default useRegistrationRequests;
