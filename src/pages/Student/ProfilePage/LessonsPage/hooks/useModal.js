import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLesson(null);
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    selectedLesson,
    openModal,
    closeModal,
  };
};

export default useModal;
