import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { postNewTemplate } from "../../services/newTemplate";
import SubmitModal from '../Modals/SubmitModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlertModal from "../Modals/AlertModalBase";

const FormBaru = ({ headerList, submitCallback, skipRows }) => {
  const [namaDokumen, setNamaDokumen] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [headers, setHeaders] = useState<{ idx: number; nama_kolom: string; tipe_data: string }[]>([]);
  const [showTypeAlertModal, setShowTypeAlertModal] = useState(false);
  const [showDuplicateDocumentNameAlertModal, setShowDuplicateDocumentNameAlertModal] = useState(false);

  console.log("headers")
  console.log(headers)

  useEffect(() => {
    if (headerList) {
      const filteredHeaderList = headerList.filter(header => header !== null && header !== undefined);
      setHeaders(
        filteredHeaderList.map((header, index) => ({ idx: index, nama_kolom: header, tipe_data: '' }))
      );
    }
  }, [headerList]);

  const handleChange = (index, e) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index].nama_kolom = e.target.value;
    setHeaders(updatedHeaders);
  };

  const handleDropdownChange = (index, e) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index].tipe_data = e.target.value;
    setHeaders(updatedHeaders);
  };

  const handleAddHeader = () => {
    const updatedHeaders = [...headers, { idx: headers.length, nama_kolom: '', tipe_data: '' }];
    setHeaders(updatedHeaders);
  };

  const handleHapusHeader = (index) => {
    const updatedHeaders = headers.filter(header => header.idx !== index);
    setHeaders(updatedHeaders);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = async () => {
    // Close the submit modal
    setShowSubmitModal(false);
  
    // Check if any header has an empty type
    const hasEmptyType = headers.some((header) => header.tipe_data === '');
    if (hasEmptyType) {
      // Display the alert modal
      setShowTypeAlertModal(true);
      return;
    }
  
    try {
      // Create the JSON object
      const jsonPayload = {
        nama_dokumen: namaDokumen,
        jenis_tabel: "Umum",
        skiprows: skipRows,
        daftar_kolom: headers
      };
  
      // Send data to the backend
      const response = await postNewTemplate(jsonPayload);
  
      // Check for "DuplicateDocumentName" error
      if (response.data?.error === "Document name already exist!") {
        setShowDuplicateDocumentNameAlertModal(true);
        console.error('Error submitting template:');
        toast.error('Error submitting template');
      } else {
        console.log('Template berhasil di submit!');
        toast.success('Template berhasil di submit!', {
          autoClose: 2000,
          onClose: () => {
            submitCallback(true);
            window.location.reload();
          }
        });
  
        // Clear form data
        setNamaDokumen('');
        setHeaders([]);
  
        // Callback function after successful submission
        if (submitCallback && typeof submitCallback === 'function') {
          submitCallback();
        }
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error submitting template:', error);
      toast.error('Error submitting template');
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="namaDokumen" className="block mb-2 font-medium">Nama Dokumen:</label>
          <input
            type="text"
            id="namaDokumen"
            name="namaDokumen"
            value={namaDokumen}
            onChange={(e) => setNamaDokumen(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Header list container */}
        <div className="mb-4">
          {headers.map((header, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={header.nama_kolom}
                onChange={(e) => handleChange(index, e)}
                className="w-2/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={header.tipe_data}
                onChange={(e) => handleDropdownChange(index, e)}
                className="w-1/3 ml-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Tipe Data</option>
                <option value="string">Teks</option>
                <option value="int">Angka</option>
              </select>
              <button
                type="button"
                onClick={() => handleHapusHeader(header.idx)}
                className="ml-2 px-4 py-2 text-sm font-medium text-red-500 bg-transparent border border-red-500 rounded focus:outline-none hover:bg-red-100"
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddHeader}
            className="px-4 py-2 text-sm font-medium text-green-500 bg-transparent border border-green-500 rounded focus:outline-none hover:bg-green-100"
          >
            Add Header
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Add the submit modal */}
      {showSubmitModal && (
        <SubmitModal
          closeModal={() => setShowSubmitModal(false)}
          handleSubmit={handleConfirmSubmit}
        />
      )}
        <AlertModal
          show={showTypeAlertModal}
          onHide={() => setShowTypeAlertModal(false)}
          textConfirmation="Silahkan pilih tipe data terlebih dahulu!"
          btnYes="Ok"
        />
        <AlertModal
          show={showDuplicateDocumentNameAlertModal}
          onHide={() => setShowDuplicateDocumentNameAlertModal(false)}
          textConfirmation="Nama Dokumen sudah tersedia sebagai pilihan."
          btnYes="Ok"
        />
    </>
  );
};

export default FormBaru;
