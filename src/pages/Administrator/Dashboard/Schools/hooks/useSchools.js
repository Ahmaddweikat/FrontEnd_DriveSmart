import { useState, useEffect } from "react";
import { schoolSchema } from "../schema/schoolSchema";

export const useSchools = () => {
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSchoolDetails, setSelectedSchoolDetails] = useState(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  useEffect(() => {
    const mockSchools = [
      {
        id: 1,
        name: "Elite Driving Academy",
        address: "123 Main Street",
        city: "New York",
        description: "Premier driving school with experienced instructors. Our comprehensive curriculum covers defensive driving, traffic laws, and hands-on practice with modern vehicles.",
        phone: "123-456-7890",
        website: "www.elitedriving.com",
        email: "info@elitedriving.com",
        manager: {
          id: 1,
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@elitedriving.com"
        },
        logo: "https://example.com/elite-logo.png",
      },
      {
        id: 2,
        name: "Safe Drive School",
        address: "456 Oak Avenue",
        city: "Los Angeles",
        description: "Comprehensive driving education for all skill levels. Specializing in defensive driving techniques and road safety awareness programs.",
        phone: "234-567-8901",
        website: "www.safedrive.com",
        email: "contact@safedrive.com",
        manager: {
          id: 2,
          firstName: "Sarah",
          lastName: "Johnson",
          email: "sarah.j@safedrive.com"
        },
        logo: "https://example.com/safe-logo.png",
      },
      {
        id: 3,
        name: "Pro Drivers Academy",
        address: "789 Pine Road",
        city: "Chicago",
        description: "Professional driving instruction with certified trainers. Offering personalized learning plans and advanced driving courses for experienced drivers.",
        phone: "345-678-9012",
        website: "www.prodrivers.com",
        email: "info@prodrivers.com",
        manager: {
          id: 3,
          firstName: "Michael",
          lastName: "Brown",
          email: "m.brown@prodrivers.com"
        },
        logo: "https://example.com/pro-logo.png",
      },
      {
        id: 4,
        name: "Master Driving School",
        address: "321 Elm Street",
        city: "Houston",
        description: "Master the art of safe driving with our expert instructors. State-certified training programs with high success rates.",
        phone: "456-789-0123",
        website: "www.masterdrive.com",
        email: "info@masterdrive.com",
        manager: {
          id: 4,
          firstName: "Emily",
          lastName: "Davis",
          email: "emily.d@masterdrive.com"
        },
        logo: "https://example.com/master-logo.png",
      },
      {
        id: 5,
        name: "City Drivers Institute",
        address: "555 Urban Street",
        city: "Boston",
        description: "Specialized in urban driving instruction with emphasis on city navigation and parallel parking. Featuring simulator training and real-world practice.",
        phone: "567-890-1234",
        website: "www.citydrivers.com",
        email: "info@citydrivers.com",
        manager: {
          id: 5,
          firstName: "David",
          lastName: "Wilson",
          email: "d.wilson@citydrivers.com"
        },
        logo: "https://example.com/city-logo.png",
      }
    ];
    setSchools(mockSchools);
    setTotalPages(Math.ceil(mockSchools.length / 10)); // Assuming 10 items per page
  }, []);

  const handleAddSchool = async (data) => {
    try {
      const validatedData = schoolSchema.parse(data);
      setSchools((prev) => [
        ...prev,
        { ...validatedData, id: Math.max(...prev.map((s) => s.id)) + 1 },
      ]);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const handleUpdateSchool = async (id, data) => {
    try {
      const validatedData = schoolSchema.parse(data);
      setSchools((prev) =>
        prev.map((school) =>
          school.id === id
            ? {
                ...school, // Keep existing data including manager
                ...validatedData, // Update with new data
                id, // Ensure ID stays the same
                manager: school.manager // Explicitly preserve manager data
              }
            : school
        )
      );
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const handleDeleteClick = (school) => {
    setSchoolToDelete(school);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSchoolToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (schoolToDelete) {
      setSchools((prev) => prev.filter((school) => school.id !== schoolToDelete.id));
      setDeleteDialogOpen(false);
      setSchoolToDelete(null);
    }
  };

  const handleViewDetails = (school) => {
    setSelectedSchoolDetails(school);
    setViewDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setViewDetailsOpen(false);
    setSelectedSchoolDetails(null);
  };

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || school.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const cities = [...new Set(schools.map(school => school.city))];

  return {
    schools: filteredSchools,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    isLoading,
    error,
    cities,
    selectedSchoolDetails,
    viewDetailsOpen,
    deleteDialogOpen,
    schoolToDelete,
    handleAddSchool,
    handleUpdateSchool,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleViewDetails,
    handleCloseDetails,
  };
};
