import React, { useState } from "react";
import SideBar from "../../../../components/ProfileSideBar/Sidebar";
import TopBar from "../../../../components/ProfileTopBar/TopBar";
import Breadcrumb from "./components/Breadcrumb";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import TestList from "./components/TestList";
import useNotifications from "../../../../hooks/useNotificationsState";
import useTests from "./hooks/useTest";
import useSidebar from "../../../../hooks/useSidebarState";
import useMessages from "./hooks/useMessages";
import { notifications } from "../../../../HomePage/constants/Notifications/notifications";
import { messages } from "../../../../HomePage/constants/Message/messages";

const Tests = () => {
  const {
    filteredTests,
    setFilter,
    setSelectedRating,
    setSelectedFilter,
    totalTestsTaken,
    totalTestsPassed,
    passRate,
  } = useTests();

  const [filter, setFilterState] = useState(""); // Search filter state
  const [selectedFilter, setSelectedFilterState] = useState("all"); // Status filter state

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <Breadcrumb />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel
              totalTestsTaken={totalTestsTaken}
              totalTestsPassed={totalTestsPassed}
              passRate={passRate}
            />
            <SearchAndFilter
              filter={filter}
              setFilter={setFilterState}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilterState}
              setSelectedRating={setSelectedRating}
            />
            <TestList filteredTests={filteredTests} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
