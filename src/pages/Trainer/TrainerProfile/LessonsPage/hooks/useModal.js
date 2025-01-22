import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const openModal = (lesson) => {
      setSelectedLesson(lesson);
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
      setSelectedLesson(null);
  };

  const closePanel = () => {
      setIsModalOpen(false); // Close the modal
      setSelectedLesson(null); // Reset selected lesson if necessary
  };

  return { isModalOpen, selectedLesson, openModal, closeModal, closePanel };
};
export default useModal;
