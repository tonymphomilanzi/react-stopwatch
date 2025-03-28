import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl text-center">
        <h2 className="text-2xl text-black font-bold mb-4">Time's Up!</h2>
        <p className="text-lg mb-4 text-black">Your countdown timer has finished.</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
