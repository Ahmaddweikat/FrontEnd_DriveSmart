import React from "react";
import CoursesList from "./components/CoursesList.jsx";
import ProfilePanel from "./components/ProfilePanel.jsx";
import SearchAndFilter from "./components/SearchAndFilter.jsx";
import { courses } from "./constant/courses.js";
import useCourseFilter from "./hooks/useCourseFilter.js";

const CoursesPage = () => {
  const { setFilter, selectedFilter, setSelectedFilter, applyFilter } =
    useCourseFilter();
  const filteredCourses = applyFilter(courses);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel totalCourses={courses.length} />
            <SearchAndFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              setFilter={setFilter}
            />
            <CoursesList
              courses={filteredCourses}
              filter={selectedFilter}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
