import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CancelServiceModal = ({ show, handleClose, handleConfirm }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);

  const reasonsList = [
    "Change of plans",
    "Service not needed anymore",
    "Inconvenient timing",
    "Other",
  ];

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = () => {
    handleConfirm(selectedReasons);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Cancel Service</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <p className="text-gray-600 mb-4">Please select your reasons for cancellation:</p>
        <div className="space-y-3 mb-6">
          {reasonsList.map((reason) => (
            <div key={reason} className="flex items-center">
              <input
                type="checkbox"
                id={reason}
                checked={selectedReasons.includes(reason)}
                onChange={() => toggleReason(reason)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
              />
              <label htmlFor={reason} className="ml-3 text-gray-700">
                {reason}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            onClick={handleSubmit}
            disabled={selectedReasons.length === 0}
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelServiceModal;