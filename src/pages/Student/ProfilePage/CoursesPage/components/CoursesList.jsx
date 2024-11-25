import React from "react";

const CoursesList = ({ courses }) => {
  return (
    <>
      <div className="space-y-4">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 relative"
            >
              {/* Difficulty Tag */}
              <div className="absolute top-2 right-2">
                {course.difficult === 1 && (
                  <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Beginner
                  </span>
                )}
                {course.difficult === 2 && (
                  <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Intermediate
                  </span>
                )}
                {course.difficult === 3 && (
                  <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Advanced
                  </span>
                )}
              </div>

              {/* Course Details */}
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-500 mt-2">{course.description}</p>
              <p className="text-gray-700 mt-2">
                <strong>Price:</strong> {course.price}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Vehicle Type:</strong> {course.typeofvichle}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No courses found matching your criteria.
          </p>
        )}
      </div>
    </>
  );
};

export default CoursesList;
