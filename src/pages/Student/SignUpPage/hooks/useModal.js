import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const openModal = (image) => {
    setImageSrc(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageSrc(null);
  };

  return { isModalOpen, imageSrc, openModal, closeModal };
};

export default useModal;
