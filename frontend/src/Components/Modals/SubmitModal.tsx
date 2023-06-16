import React from 'react';

interface SubmitModalProps {
  closeModal: () => void;
  handleSubmit: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ closeModal, handleSubmit }) => {
  const handleConfirm = () => {
    handleSubmit();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 bg-gray-900">
      <div className="relative mx-auto max-w-2xl">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none" style={{ zIndex: 3 }}>
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
            <h3 className="text-lg font-semibold">Konfirmasi Submit</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-gray-500"
              onClick={closeModal}
            >
              <span>×</span>
            </button>
          </div>
          <div className="relative p-6">
            <p className="my-4 text-gray-600">Apakah anda yakin untuk melakukan Submit?</p>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b">
            <button
              className="px-4 py-2 text-sm text-gray-500 bg-transparent border border-gray-500 rounded hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-gray-500 focus:border-gray-500 mr-2"
              onClick={closeModal}
            >
              Tidak
            </button>
            <button
              className="px-4 py-2 text-sm text-green-500 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              onClick={handleConfirm}
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
