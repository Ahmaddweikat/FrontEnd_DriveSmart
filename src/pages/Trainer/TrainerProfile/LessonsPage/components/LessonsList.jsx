import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import useModal from "../hooks/useModal";
import useFilteredLessons from "../hooks/useFilteredLessons";
import useFeedbackManagement from "../hooks/useFeedbackManagement";
import useLessonCancellation from "../hooks/useLessonCancellation";
import useLessonStyling from "../hooks/useLessonStyling";

const LessonsList = ({
  lessons = [],
  selectedRating,
  closeModal,
  onUpdateLesson,
}) => {
  const { isModalOpen, selectedLesson, openModal, closePanel } = useModal();
  const filteredLessons = useFilteredLessons(lessons, selectedRating);
  
  const {
    selectedRatingState,
    feedback,
    isEditingFeedback,
    setFeedback,
    handleSubmitFeedback,
    handleRating,
    handleEditFeedback,
    resetFeedbackState,
    setIsEditingFeedback
  } = useFeedbackManagement(onUpdateLesson, closeModal, closePanel);

  const {
    cancelReason,
    showCancelModal,
    setCancelReason,
    handleCancelLesson,
    confirmCancellation,
    resetCancellationState
  } = useLessonCancellation(onUpdateLesson);

  const { getLessonStatusStyle, getStatusTextColor } = useLessonStyling();

  const handleOpenModal = (lesson) => {
    openModal(lesson);
    resetFeedbackState(lesson);
  };

  const handleClosePanel = () => {
    closeModal();
    closePanel();
    setIsEditingFeedback(false);
  };

  return (
    <>
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 sm:w-1/3 p-6">
            <h3 className="text-xl font-semibold">Cancel Lesson</h3>
            <textarea
              className="w-full mt-4 p-2 border rounded"
              placeholder="Enter reason for cancellation..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={resetCancellationState}
              >
                Close
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmCancellation}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
              onClick={() => handleOpenModal(lesson)}
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
                <p className="text-black-500 text-sm mt-2">
                  <strong>Status:</strong>{" "}
                  <span className={getStatusTextColor(lesson.status, lesson.date)}>
                    {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                  </span>
                </p>
              </div>

              <div className="absolute bottom-6 right-6 flex space-x-2">
                {lesson.status === "completed" && (
                  <>
                    {lesson.rating > 0 ? (
                      <button
                        onClick={(e) => handleEditFeedback(e, lesson, openModal)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit Feedback
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleEditFeedback(e, lesson, openModal)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Provide Feedback
                      </button>
                    )}
                  </>
                )}

                {lesson.status === "upcoming" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelLesson(lesson);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel Lesson
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 sm:w-1/3 p-6">
            <h3 className="text-2xl font-semibold mb-4">{selectedLesson.title}</h3>
            
            {isEditingFeedback ? (
              <div>
                <h4 className="text-lg font-semibold">
                  {selectedLesson.rating > 0 ? "Edit Feedback" : "Provide Feedback"}
                </h4>
                <textarea
                  className="border rounded w-full p-2"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback here..."
                  required
                ></textarea>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer ${
                        star <= selectedRatingState ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => handleRating(star)}
                    >
                      <FontAwesomeIcon icon={solidStar} />
                    </span>
                  ))}
                </div>
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleSubmitFeedback(selectedLesson)}
                  disabled={!selectedRatingState || !feedback.trim()}
                >
                  {selectedLesson.rating > 0 ? "Update Feedback" : "Submit Feedback"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="text-lg font-semibold mb-2">Lesson Information</h4>
                  <p><strong>Date:</strong> {selectedLesson.date}</p>
                  <p><strong>Duration:</strong> {selectedLesson.duration}</p>
                  <p><strong>Student:</strong> {selectedLesson.student}</p>
                  <p><strong>Car:</strong> {selectedLesson.car}</p>
                  {selectedLesson.status !== "canceled" ? (
                    <p><strong>Note:</strong> {selectedLesson.note}</p>
                  ) : (
                    <p><strong>Reason for Cancellation:</strong> {selectedLesson.reason}</p>
                  )}
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={getStatusTextColor(selectedLesson.status, selectedLesson.date)}>
                      {selectedLesson.status.charAt(0).toUpperCase() + selectedLesson.status.slice(1)}
                    </span>
                  </p>
                </div>

                {selectedLesson.status === "completed" && (
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold mb-2">Feedback</h4>
                    {selectedLesson.rating > 0 ? (
                      <>
                        <div className="flex items-center mb-2">
                          <span className="mr-2"><strong>Rating:</strong></span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={star <= selectedLesson.rating ? "text-yellow-400" : "text-gray-300"}
                            >
                              <FontAwesomeIcon icon={solidStar} />
                            </span>
                          ))}
                        </div>
                        <p><strong>Feedback:</strong> {selectedLesson.feedback}</p>
                        <button
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          onClick={() => setIsEditingFeedback(true)}
                        >
                          Edit Feedback
                        </button>
                      </>
                    ) : (
                      <div>
                        <p className="text-gray-500 mb-2">No feedback provided yet.</p>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          onClick={() => setIsEditingFeedback(true)}
                        >
                          Provide Feedback
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleClosePanel}
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
