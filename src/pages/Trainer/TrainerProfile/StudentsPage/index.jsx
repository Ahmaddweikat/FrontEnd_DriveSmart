import React, { useState } from "react";
import ProfilePanel from "./components/ProfilePanel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import StudentTable from "./components/StudentTable";
import StudentListHeader from "./components/StudentListHeader";

const students = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    gender: "Male",
    licenseType: "Class A",
    contactNumber: "123-456-7890",
    lessonsTaken: 12,
    bloodType: "A+",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    gender: "Female",
    licenseType: "Class B",
    contactNumber: "098-765-4321",
    lessonsTaken: 8,
    bloodType: "O-",
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    gender: "Female",
    licenseType: "Class B",
    contactNumber: "555-123-4567",
    lessonsTaken: 15,
    bloodType: "B+",
  },
  {
    id: 4,
    name: "Michael Johnson",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    gender: "Male",
    licenseType: "Class A",
    contactNumber: "777-888-9999",
    lessonsTaken: 10,
    bloodType: "AB-",
  },
  {
    id: 5,
    name: "Sarah Wilson",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    gender: "Female",
    licenseType: "Class B",
    contactNumber: "444-555-6666",
    lessonsTaken: 6,
    bloodType: "O+",
  },
];

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const trainerStats = {
    totalLicenses: 3,
    activeLicenses: 2,
    totalStudents: 25,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Search Bar and Header */}
          <StudentListHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Table */}
          <StudentTable currentStudents={currentStudents} />

          {/* Pagination Controls */}
          <div className="flex flex-col items-center space-y-4 mt-6">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
                color="primary"
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
