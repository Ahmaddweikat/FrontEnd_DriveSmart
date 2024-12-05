import React from "react";

const SuccessModal = ({
  isOpen,
  message,
  onClose,
  buttonText = "Close",
  onButtonClick = onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-modal-enter">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Success</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onButtonClick}
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
