import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Handler from "../Components/Forms/Handler";
import Header from "../Components/Header";
import { OcrText } from "../Typings/ocrTypings";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { postNewDocument } from "../services/documentService";
import MapInteractionCSS from 'react-map-interaction';
// import useModal from "../Hooks/useModal";
// import { Toast } from "flowbite-react";
// import useToast from "../Hooks/useToast";
// import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
// @ts-ignore
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import SubmitModal from "../Components/Modals/SubmitModal";

const TIE = () => {
  const [imagePath, setImagePath] = useState<string[]>([]);
  const [docsType, setDocsType] = useState("belumPilih");
  const [docsName, setDocsName] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [finalData, setFinalData] = useState<any>();
  const [ocrText, setOcrText] = useState<OcrText[]>();

  // const [isSuccessToastActive, showSuccessToast] = useToast();
  // const [isErrorToastActive, showErrorToast] = useToast();
  // const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  // const [showSubmitModal, setShowSubmitModal, openSubmitModal] = useModal();

  const handleImage = (img: string[]) => {
    setImagePath(img);
  };

  const handleDocsType = (type: string, name: string) => {
    setDocsType(type);
    if (type === "belumPilih") {
      setDocsName("");
    } else {
      setDocsName(name);
    }
  };

  const handleRevoke = (ev) => {
    URL.revokeObjectURL(ev.target.src);
  };

  // const handleSubmit = (document_name) => {
  //   // Show the confirmation modal
  //   setShowConfirmationModal(true);
  // };

  // const handleConfirmSubmit = async (document_name) => {
  //   // Close the confirmation modal
  //   setShowConfirmationModal(false);

  //   // Perform the actual submission
  //   const response = await postNewDocument(document_name, finalData);

  //   if (response.status === 400) {
  //     setErrorMessage('Error: Duplicate document');
  //     showErrorToast();
  //   } else {
  //     showSuccessToast();
  //   }
  // };

  return (
    <>
      {/* Rest of the code... */}
      <Header
        imageCallback={handleImage}
        docsTypeCallback={handleDocsType}
        setOcrText={setOcrText}
        // submitCallback={handleSubmit}
        docsType={docsType}
      />
      <div className="flex mb-5 ">
        <div className="w-1/2">
          <div className="h-[8vh] mb-6">
            <h1 className="text-gray-800 dark:text-gray-300 text-2xl font-bold ml-5">Formulir</h1>
            <h1 className="text-gray-800 dark:text-gray-300 font-bold underline italic ml-5">*Harap periksa kembali formulir berikut</h1>
          </div>
          <div className="px-5 py-4 border border-primary-border dark:border-gray-700 rounded-l-lg h-[130vh] overflow-y-auto">
            <Handler
              docsType={docsType}
              ocrText={ocrText}
              finalDataSetter={setFinalData}
              // openSubmitModal={openSubmitModal}
            />
          </div>
        </div>
        <div className="w-1/2">
  <h1 className="text-gray-800 dark:text-gray-300 h-[8vh] text-2xl font-bold ml-5 mb-6">{docsName}</h1>
  <div className="px-5 py-4 border border-primary-border dark:border-gray-700 rounded-r-lg h-[130vh] overflow-y-auto">
    {imagePath.length === 0 ? (
      <h2 className="text-2xl text-gray-800 dark:text-gray-300">Gambar belum dipilih</h2>
    ) : (
      <Carousel showThumbs={false}>
        {imagePath.map((path, index) => (
          <div key={index}>
            <img src={path} alt={`Image ${index + 1}`} className="w-full" />
          </div>
        ))}
      </Carousel>
    )}
  </div>
</div>

      </div>
      {/* Confirmation Modal */}
      {/* {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Submission</h2>
            <p className="text-gray-800 mb-6">Are you sure you want to submit the document?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleConfirmSubmit(docsName)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Submit Modal */}
      {/* {showSubmitModal && (
        <SubmitModal
          closeModal={() => setShowSubmitModal(false)}
          handleSubmit={() => handleSubmit(docsName)}
        />
      )} */}

      {/* Rest of the code... */}
    </>
  );
};

export default TIE;
