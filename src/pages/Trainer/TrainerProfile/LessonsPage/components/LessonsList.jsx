import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import useFilteredLessons from "../hooks/useFilteredLessons";
import useLessonStyling from "../hooks/useLessonStyling";
import { useNavigate } from "react-router-dom";

const LessonsList = ({
  lessons = [],
  selectedRating,
}) => {
  const navigate = useNavigate();
  const filteredLessons = useFilteredLessons(lessons, selectedRating);
  const { getLessonStatusStyle } = useLessonStyling();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'canceled':
        return 'bg-red-500';
      case 'out of date':
        return 'bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const handleLessonClick = (lesson) => {
    const formattedTitle = lesson.title.replace(/\s+/g, '');
    navigate(`/trainer/lessons/${formattedTitle}`);
  };

  return (
    <div className="space-y-4 w-full max-w-7xl mx-auto">
      {filteredLessons.length === 0 ? (
        <p>No lessons available with the selected rating.</p>
      ) : (
        filteredLessons.map((lesson, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer relative ${getLessonStatusStyle(
              lesson.status,
              lesson.date
            )}`}
            onClick={() => handleLessonClick(lesson)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{lesson.title}</h3>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`transition-transform duration-300 transform ${
                      i < lesson.rating
                        ? "scale-110 text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={i < lesson.rating ? solidStar : regularStar}
                    />
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Date: {lesson.date} | Duration: {lesson.duration}
            </p>
            <div className="mt-4">
              <p className="text-black-700 font-small">
                <strong>Student:</strong> {lesson.student}
              </p>
              {lesson.status !== "canceled" ? (
                <p className="text-black-500 text-sm mt-2">
                  <strong>Note:</strong> {lesson.note}
                </p>
              ) : (
                <p className="text-black text-sm mt-2">
                  <strong>Reason for Cancellation:</strong> {lesson.reason}
                </p>
              )}
              <div className="flex items-center mt-2">
                <span className={`${getStatusColor(lesson.status)} text-white text-sm px-3 py-1 rounded-full`}>
                  {lesson.status}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LessonsList;