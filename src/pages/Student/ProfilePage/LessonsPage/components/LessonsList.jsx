import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const LessonsList = ({ lessons = [], selectedRating }) => {
  // Filter lessons based on the selected rating
  const filteredLessons = lessons.filter((lesson) =>
    selectedRating ? lesson.rating === selectedRating : true
  );

  return (
    <>
      {/* Lessons List */}
      <div className="space-y-4">
        {filteredLessons.length === 0 ? (
          <p>No lessons available with the selected rating.</p> // Handle case if no lessons match the filter
        ) : (
          filteredLessons.map((lesson, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{lesson.title}</h3>

                {/* Rating Stars on the Same Line as Title */}
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={i < lesson.rating ? solidStar : regularStar}
                      className="h-4 w-4 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Date and Duration in Light Font */}
              <p className="text-gray-500 text-sm mt-1">
                Date: {lesson.date} | Duration: {lesson.duration}
              </p>

              <div className="flex justify-between items-start mt-10">
                <div>
                  <p className="text-black-700 font-small">
                    <strong>Instructor:</strong> {lesson.instructor}
                  </p>

                  <p className="text-black-500 text-sm mt-2">
                    <strong>Note: </strong> {lesson.note}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LessonsList;
