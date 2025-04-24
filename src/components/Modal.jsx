import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose}></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded shadow-lg w-full max-w-md mx-4 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
