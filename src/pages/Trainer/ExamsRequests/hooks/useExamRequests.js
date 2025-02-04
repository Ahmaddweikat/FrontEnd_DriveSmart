import { useState, useEffect, useMemo } from "react";

const mockTheoreticalRequests = [
  {
    id: 13,
    name: "Ahmad Dweikat",
    email: "ahmad@gmail.com",
    avatar: "/avatars/1.jpg",
    licenseType: "B",
    successRate: 96,
    status: "pending",
  },
  {
    id: 1,
    name: "Omar Al-Nasser",
    email: "omar.nasser@example.com",
    avatar: "/avatars/1.jpg",
    licenseType: "B",
    successRate: 85,
    status: "pending",
  },
  {
    id: 2,
    name: "Reem Al-Khatib",
    email: "reem.khatib@example.com",
    avatar: "/avatars/2.jpg",
    licenseType: "A",
    successRate: 92,
    status: "pending",
  },
  {
    id: 3,
    name: "Malik Al-Sayed",
    email: "malik.sayed@example.com",
    avatar: "/avatars/3.jpg",
    licenseType: "B",
    successRate: 78,
    status: "accepted",
  },
  {
    id: 4,
    name: "Nada Al-Masri",
    email: "nada.masri@example.com",
    avatar: "/avatars/4.jpg",
    licenseType: "C",
    successRate: 88,
    status: "rejected",
  },
  {
    id: 5,
    name: "Tariq Al-Zaid",
    email: "tariq.zaid@example.com",
    avatar: "/avatars/5.jpg",
    licenseType: "B",
    successRate: 95,
    status: "pending",
  },
  {
    id: 6,
    name: "Amira Khalil",
    email: "amira.khalil@example.com",
    avatar: "/avatars/6.jpg",
    licenseType: "A",
    successRate: 82,
    status: "accepted",
  },
  {
    id: 7,
    name: "Zaid Al-Qasem",
    email: "zaid.qasem@example.com",
    avatar: "/avatars/7.jpg",
    licenseType: "B",
    successRate: 75,
    status: "pending",
  },
  {
    id: 8,
    name: "Leila Al-Saadi",
    email: "leila.saadi@example.com",
    avatar: "/avatars/8.jpg",
    licenseType: "C",
    successRate: 90,
    status: "rejected",
  },
];

const mockPracticalRequests = [
  {
    id: 1,
    name: "Omar Qasem",
    email: "omar@gmail.com",
    avatar: "/avatars/1.jpg",
    licenseType: "B",
    lessonsTaken: 20,
    status: "pending",
  },
  {
    id: 2,
    name: "Reem Al-Khatib",
    email: "reem.khatib@example.com",
    avatar: "/avatars/2.jpg",
    licenseType: "A",
    lessonsTaken: 18,
    status: "pending",
  },
  {
    id: 3,
    name: "Malik Al-Sayed",
    email: "malik.sayed@example.com",
    avatar: "/avatars/3.jpg",
    licenseType: "B",
    lessonsTaken: 25,
    status: "accepted",
  },
  {
    id: 4,
    name: "Nada Al-Masri",
    email: "nada.masri@example.com",
    avatar: "/avatars/4.jpg",
    licenseType: "C",
    lessonsTaken: 15,
    status: "rejected",
  },
  {
    id: 5,
    name: "Tariq Al-Zaid",
    email: "tariq.zaid@example.com",
    avatar: "/avatars/5.jpg",
    licenseType: "B",
    lessonsTaken: 20,
    status: "pending",
  },
  {
    id: 6,
    name: "Amira Khalil",
    email: "amira.khalil@example.com",
    avatar: "/avatars/6.jpg",
    licenseType: "A",
    lessonsTaken: 23,
    status: "accepted",
  },
  {
    id: 7,
    name: "Zaid Al-Qasem",
    email: "zaid.qasem@example.com",
    avatar: "/avatars/7.jpg",
    licenseType: "B",
    lessonsTaken: 16,
    status: "pending",
  },
  {
    id: 8,
    name: "Leila Al-Saadi",
    email: "leila.saadi@example.com",
    avatar: "/avatars/8.jpg",
    licenseType: "C",
    lessonsTaken: 21,
    status: "rejected",
  },
];

const ITEMS_PER_PAGE = 5;

export const useExamRequests = () => {
  const [theoreticalRequestsRaw, setTheoreticalRequestsRaw] = useState(
    mockTheoreticalRequests
  );
  const [practicalRequestsRaw, setPracticalRequestsRaw] = useState(
    mockPracticalRequests
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [licenseFilter, setLicenseFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [theoreticalTab, setTheoreticalTab] = useState("pending");
  const [practicalTab, setPracticalTab] = useState("pending");

  const licenseTypes = ["A", "B", "C", "D"];

  useEffect(() => {
    // Reset page when changing tabs or filters
    setCurrentPage(1);
  }, [theoreticalTab, practicalTab, searchQuery, licenseFilter]);

  useEffect(() => {
    // Fetch initial data
    // fetchExamRequests();
  }, []);

  const fetchExamRequests = async () => {
    try {
      // Replace with actual API calls
      // const theoretical = await examRequestsApi.getTheoreticalRequests();
      // const practical = await examRequestsApi.getPracticalRequests();
      // Temporary mock data
      // setTheoreticalRequestsRaw(theoretical);
      // setPracticalRequestsRaw(practical);
    } catch (error) {
      console.error("Error fetching exam requests:", error);
    }
  };

  const filterRequests = (requests, status) => {
    return requests.filter((request) => {
      const matchesSearch =
        request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLicense =
        licenseFilter === "all" || request.licenseType === licenseFilter;
      const matchesStatus = request.status === status;

      return matchesSearch && matchesLicense && matchesStatus;
    });
  };

  const paginateRequests = (requests) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return requests.slice(startIndex, endIndex);
  };

  const getTheoreticalRequestsByStatus = (status) => {
    const filtered = filterRequests(theoreticalRequestsRaw, status);
    return paginateRequests(filtered);
  };

  const getPracticalRequestsByStatus = (status) => {
    const filtered = filterRequests(practicalRequestsRaw, status);
    return paginateRequests(filtered);
  };

  const theoreticalRequests = useMemo(
    () => getTheoreticalRequestsByStatus(theoreticalTab),
    [
      theoreticalRequestsRaw,
      searchQuery,
      licenseFilter,
      currentPage,
      theoreticalTab,
    ]
  );

  const practicalRequests = useMemo(
    () => getPracticalRequestsByStatus(practicalTab),
    [
      practicalRequestsRaw,
      searchQuery,
      licenseFilter,
      currentPage,
      practicalTab,
    ]
  );

  const getTotalPages = (requests, status) => {
    const filtered = filterRequests(requests, status);
    return Math.ceil(filtered.length / ITEMS_PER_PAGE);
  };

  const totalTheoreticalPages = getTotalPages(
    theoreticalRequestsRaw,
    theoreticalTab
  );
  const totalPracticalPages = getTotalPages(practicalRequestsRaw, practicalTab);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const updateRequestStatus = (requests, id, newStatus) => {
    return requests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request
    );
  };

  const handleTheoreticalApprove = async (request) => {
    try {
      // await examRequestsApi.approveTheoreticalRequest(request.id);
      setTheoreticalRequestsRaw((prev) =>
        updateRequestStatus(prev, request.id, "accepted")
      );
    } catch (error) {
      console.error("Error approving theoretical request:", error);
    }
  };

  const handleTheoreticalReject = async (request) => {
    try {
      // await examRequestsApi.rejectTheoreticalRequest(request.id);
      setTheoreticalRequestsRaw((prev) =>
        updateRequestStatus(prev, request.id, "rejected")
      );
    } catch (error) {
      console.error("Error rejecting theoretical request:", error);
    }
  };

  const handlePracticalApprove = async (request) => {
    try {
      // await examRequestsApi.approvePracticalRequest(request.id);
      setPracticalRequestsRaw((prev) =>
        updateRequestStatus(prev, request.id, "accepted")
      );
    } catch (error) {
      console.error("Error approving practical request:", error);
    }
  };

  const handlePracticalReject = async (request) => {
    try {
      // await examRequestsApi.rejectPracticalRequest(request.id);
      setPracticalRequestsRaw((prev) =>
        updateRequestStatus(prev, request.id, "rejected")
      );
    } catch (error) {
      console.error("Error rejecting practical request:", error);
    }
  };

  return {
    theoreticalRequests,
    practicalRequests,
    handleTheoreticalApprove,
    handleTheoreticalReject,
    handlePracticalApprove,
    handlePracticalReject,
    searchQuery,
    setSearchQuery,
    licenseFilter,
    setLicenseFilter,
    licenseTypes,
    currentPage,
    handlePageChange,
    totalTheoreticalPages,
    totalPracticalPages,
    theoreticalTab,
    setTheoreticalTab,
    practicalTab,
    setPracticalTab,
    getTheoreticalRequestsByStatus,
    getPracticalRequestsByStatus,
  };
};
