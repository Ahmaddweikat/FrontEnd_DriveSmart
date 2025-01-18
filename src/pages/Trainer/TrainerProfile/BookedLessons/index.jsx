import React, { useState } from "react";
import { useBookedLessons } from "./hooks/useBookedLessons";
import SearchBar from "./components/SearchBar";
import LessonsTable from "./components/LessonsTable";
import { Tabs, Tab, Box } from '@mui/material';

const BookingLessons = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    pendingLessons,
    acceptedLessons,
    declinedLessons,
    currentPage,
    handlePageChange,
    searchQuery,
    setSearchQuery,
    daysFilter,
    setDaysFilter,
    handleStatusChange,
    uniqueDays
  } = useBookedLessons();
 
  const NoLessonsMessage = ({ day }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <p className="text-gray-500">
        {day === 'all' 
          ? 'No lessons found matching your search criteria.'
          : `No lessons scheduled for ${day}.`}
      </p>
    </div>
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );

  return (
    <div className="p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Booked Lessons</h1>
        <div className="space-y-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            daysFilter={daysFilter}
            setDaysFilter={setDaysFilter}
            uniqueDays={uniqueDays}
          />
          
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label={`Pending (${pendingLessons.length})`} />
                <Tab label={`Accepted (${acceptedLessons.length})`} />
                <Tab label={`Declined (${declinedLessons.length})`} />
              </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
              {pendingLessons.length > 0 ? (
                <LessonsTable 
                  lessons={pendingLessons}
                  handleStatusChange={handleStatusChange}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  showActions={true}
                />
              ) : (
                <NoLessonsMessage day={daysFilter} />
              )}
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              {acceptedLessons.length > 0 ? (
                <LessonsTable 
                  lessons={acceptedLessons}
                  handleStatusChange={handleStatusChange}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  showActions={false}
                />
              ) : (
                <NoLessonsMessage day={daysFilter} />
              )}
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              {declinedLessons.length > 0 ? (
                <LessonsTable 
                  lessons={declinedLessons}
                  handleStatusChange={handleStatusChange}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  showActions={false}
                />
              ) : (
                <NoLessonsMessage day={daysFilter} />
              )}
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default BookingLessons;
