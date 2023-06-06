import React from "react";

const SubmitModal = ({ closeModal, handleSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Submit Document</h2>
        <p className="text-gray-800 mb-6">Please review the information before submitting the document.</p>
        
        {/* Render your form or additional information here */}
        
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
