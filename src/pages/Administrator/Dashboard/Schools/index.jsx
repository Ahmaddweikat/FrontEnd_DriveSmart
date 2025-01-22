import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchBar from "./components/SearchBar";
import SchoolTable from "./components/SchoolTable";
import SchoolForm from "./components/SchoolForm";
import SchoolDetails from "./components/SchoolDetails";
import { useSchools } from "./hooks/useSchools";

const Schools = () => {
  const [open, setOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const {
    schools,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    cities,
    selectedSchoolDetails,
    viewDetailsOpen,
    handleAddSchool,
    handleUpdateSchool,
    handleDeleteSchool,
    handleViewDetails,
    handleCloseDetails,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    deleteDialogOpen,
    schoolToDelete,
  } = useSchools();

  const handleOpen = (school = null) => {
    setSelectedSchool(school);
    setOpen(true);
    if (school) {
      console.log('Editing School:', {
        id: school.id,
        name: school.name,
        address: school.address,
        city: school.city,
        phone: school.phone,
        email: school.email,
        website: school.website,
        description: school.description,
        managerId: school.managerId,
        logo: school.logo
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSchool(null);
  };

  const handleSubmit = async (data) => {
    if (selectedSchool) {
      console.log('Updating School:', {
        id: selectedSchool.id,
        ...data,
        updatedAt: new Date().toISOString()
      });
      const result = await handleUpdateSchool(selectedSchool.id, data);
      if (result.success) {
        handleClose();
      }
    } else {
      console.log('Adding New School:', {
        ...data,
        createdAt: new Date().toISOString()
      });
      const result = await handleAddSchool(data);
      if (result.success) {
        handleClose();
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const NoSchoolsMessage = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <p style={{ color: '#72b626' }}>
        No schools found matching your search criteria.
      </p>
    </div>
  );

  return (
    <div className="p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" >Schools</h1>
        <div className="space-y-8">
          <div className="space-y-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              cities={cities}
            />
          </div>

          <div className="space-y-4">
            {schools.length > 0 ? (
              <SchoolTable
                schools={schools}
                handleEdit={handleOpen}
                handleDelete={handleDeleteClick}
                handleView={handleViewDetails}
                handleDeleteCancel={handleDeleteCancel}
                handleDeleteConfirm={handleDeleteConfirm}
                deleteDialogOpen={deleteDialogOpen}
                schoolToDelete={schoolToDelete}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            ) : (
              <NoSchoolsMessage />
            )}
          </div>
        </div>

        <SchoolForm
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          initialData={selectedSchool}
        />

        <SchoolDetails
          open={viewDetailsOpen}
          handleClose={handleCloseDetails}
          school={selectedSchoolDetails}
        />
      </div>
    </div>
  );
};

export default Schools;