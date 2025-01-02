import React, { useState, useMemo } from "react";
import RequestsList from "./components/RequestsList";
import SearchAndFilter from "./components/SearchAndFilter";
import { Box, Tabs, Tab, CircularProgress, Typography } from "@mui/material";
import useRegistrationRequests from "./hooks/useRegistrationRequests";

const RegistrationRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);
  const itemsPerPage = 10;

  const {
    requests,
    loading,
    error,
    handleAccept,
    handleReject,
  } = useRegistrationRequests();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getTabCounts = () => {
    return {
      pending: requests.filter(r => r.status === "pending").length,
      accepted: requests.filter(r => r.status === "accepted").length,
      rejected: requests.filter(r => r.status === "rejected").length,
    };
  };

  const filteredAndSortedRequests = useMemo(() => {
    return requests.filter(request => {
      const matchesSearch = 
        request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab = 
        (currentTab === 0 && request.status === "pending") ||
        (currentTab === 1 && request.status === "accepted") ||
        (currentTab === 2 && request.status === "rejected");

      const matchesDate = 
        !dateFilter || 
        request.submissionDate.split('T')[0] === dateFilter;

      return matchesSearch && matchesTab && matchesDate;
    });
  }, [requests, searchTerm, currentTab, dateFilter]);

  const displayedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedRequests, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedRequests.length / itemsPerPage);
  const tabCounts = getTabCounts();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              color: '#1a1a1a',
              mb: 4
            }}
          >
            School Requests
          </Typography>

          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
          
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
              <Tab label={`Pending (${tabCounts.pending})`} />
              <Tab label={`Accepted (${tabCounts.accepted})`} />
              <Tab label={`Rejected (${tabCounts.rejected})`} />
            </Tabs>
          </Box>

          <RequestsList
            requests={displayedRequests}
            onAccept={handleAccept}
            onReject={handleReject}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationRequests;