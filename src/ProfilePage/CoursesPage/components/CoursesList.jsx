import React, { useState } from "react";

const CoursesList = ({ courses, filter, selectedFilter }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  // Function to filter courses
  const filteredCourses = courses.filter((course) => {
    const scoreCondition = selectedRating
      ? course.score >= selectedRating * 6
      : true;

    // Add filter condition based on selectedFilter state
    let difficultyCondition = true;
    if (selectedFilter === "beginner") {
      difficultyCondition = course.difficult === 1; // Beginner tests
    } else if (selectedFilter === "intermediate") {
      difficultyCondition = course.difficult === 2; // Intermediate tests
    } else if (selectedFilter === "advanced") {
      difficultyCondition = course.difficult === 3; // Advanced tests
    }

    // Search filter condition
    const searchCondition = filter
      ? course.title.toLowerCase().includes(filter.toLowerCase()) ||
        course.description.toLowerCase().includes(filter.toLowerCase())
      : true;

    return scoreCondition && difficultyCondition && searchCondition;
  });

  const totalCourses = filteredCourses.length;

  return (
    <>
      {/* Courses List */}
      <div className="space-y-4">
        {totalCourses > 0 ? (
          filteredCourses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{course.title}</h3>

                {/* Difficulty Indicator with Filled Circle */}
                <div className="flex items-center space-x-2">
                  {course.difficult === 1 && (
                    <div className="flex items-center justify-center border-2 border-yellow-500 bg-yellow-500 text-white rounded-full w-20 h-15">
                      <span className="text-sm font-semibold">Beginner</span>
                    </div>
                  )}
                  {course.difficult === 2 && (
                    <div className="flex items-center justify-center border-2 border-blue-500 bg-blue-500 text-white rounded-full w-22 h-15">
                      <span className="text-sm font-semibold">
                        Intermediate
                      </span>
                    </div>
                  )}
                  {course.difficult === 3 && (
                    <div className="flex items-center justify-center border-2 border-red-500 bg-red-500 text-white rounded-full w-20 h-15">
                      <span className="text-sm font-semibold">Advanced</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description with Margin */}
              <p className="text-black-500 mt-1 text-sm">
                <strong>Description:</strong> {course.description}
              </p>

              {/* Price with Margin */}
              <p className="text-black-600 mt-10 font-sm">
                <strong>Price:</strong> {course.price}
              </p>

              {/* Vehicle Type with Margin */}
              <p className="text-black-600 mt-2">
                <strong>Vehicle Type:</strong> {course.typeofvichle}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center">
            No courses found matching your criteria.
          </p>
        )}
      </div>
    </>
  );
};

export default CoursesList;
