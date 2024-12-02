import React, { useState } from "react";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import TestList from "./components/TestList";
import useTests from "./hooks/useTest";

const TestPage = () => {
  const { filteredTests, setFilter, setSelectedFilter } = useTests();

  const [filter] = useState("");
  const [selectedFilter] = useState("all");

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
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

export default TestPage;
