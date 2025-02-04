import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import SmileRating from "./SmileRating";
import useRatingFeedback from "../hooks/useRatingFeedback";
import useModal from "../hooks/useModal";
import useFilteredLessons from "../hooks/useFilteredLessons";
import { Avatar } from "@mui/material";

const LessonsList = ({ lessons = [], selectedRating }) => {
  const {
    rating,
    feedback,
    showFeedback,
    handleRatingChange,
    setFeedback,
    resetFeedback,
  } = useRatingFeedback();
  const { isModalOpen, selectedLesson, openModal, closeModal } = useModal();
  const filteredLessons = useFilteredLessons(lessons, selectedRating);

  const handleFeedbackSubmit = () => {
    alert("Feedback submitted:", feedback);
    closeModal();
  };

  const handleOpenModal = (lesson) => {
    openModal(lesson);
    resetFeedback();
  };

  return (
    <>
      <div className="space-y-4">
        {filteredLessons.length === 0 ? (
          <p>No lessons available with the selected rating.</p>
        ) : (
          filteredLessons.map((lesson, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
              onClick={() => handleOpenModal(lesson)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{lesson.title}</h3>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Date: {lesson.date} | Duration: {lesson.duration}
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center">
                  <Avatar src={lesson.trainerImage} alt={lesson.instructor} />
                  <div className="ml-2">
                    <p className="text-sm font-medium">{lesson.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar src={lesson.carImage} alt={lesson.car} />
                  <div className="ml-2">
                    <p className="text-sm font-medium">{lesson.car}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 sm:w-1/3 p-6">
            <h3 className="text-2xl font-semibold">{selectedLesson.title}</h3>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <Avatar
                  src={selectedLesson.trainerImage}
                  alt={selectedLesson.instructor}
                />
                <div className="ml-2">
                  <p className="text-sm font-medium">
                    {selectedLesson.instructor}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar
                  src={selectedLesson.carImage}
                  alt={selectedLesson.car}
                />
                <div className="ml-2">
                  <p className="text-sm font-medium">{selectedLesson.car}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              <strong>Date:</strong> {selectedLesson.date}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              <strong>Duration:</strong> {selectedLesson.duration}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              <strong>Note:</strong> {selectedLesson.note}
            </p>

            {selectedLesson.rating !== null && selectedLesson.rating >= 1 && (
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <p className="text-gray-500 text-sm">
                    <strong>Rating trainer:</strong>
                  </p>
                  <div className="flex space-x-1">
                    <SmileRating onRatingChange={handleRatingChange} />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  *This rating and feedback will be visible to the school owner
                  only.
                </p>
              </div>
            )}

            {showFeedback && (
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                  placeholder="Enter your feedback for why the lesson was neutral or less"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            )}

            <div className="mt-4 flex justify-end gap-x-2">
              {(rating > 0 || feedback.trim() !== "") && (
                <button
                  onClick={handleFeedbackSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Submit Feedback
                </button>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LessonsList;
