import React, { useState } from "react";
import SideBar from "../../../../components/ProfileSideBar/Sidebar";
import TopBar from "../../../../components/ProfileTopBar/TopBar";
import Breadcrumb from "./components/Breadcrumb";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import TestList from "./components/TestList";
import useTests from "./hooks/useTest";
import useSidebarState from "../../../../hooks/useSidebarState";
import useNotificationsState from "../../../../hooks/useNotificationsState";

const Tests = () => {
  const {
    filteredTests,
    setFilter,
    setSelectedFilter,
    totalTestsTaken,
    totalTestsPassed,
    passRate,
  } = useTests();
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationsState();

  const [activePage, setActivePage] = useState("test");
  const [filter, setFilterState] = useState("");
  const [selectedFilter, setSelectedFilterState] = useState("all");
  const { isExpanded, toggleSidebar } = useSidebarState();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar
        isExpanded={isExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          showNotifications={showNotifications}
          notificationList={notificationList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <Breadcrumb />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel />
            <SearchAndFilter
              filter={filter}
              setFilter={setFilter}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <TestList filteredTests={filteredTests} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
