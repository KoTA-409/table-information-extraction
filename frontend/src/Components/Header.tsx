import React, { useState, useEffect } from "react";
import Select from "react-select";
import AlertModal from "./Modals/AlertModalBase";
import ConfirmationModal from "./Modals/ConfirmationModal";
import { recognizeText } from '../services/textService';
import { recognizeHeader } from "../services/headerService";

const Header = ({ imageCallback, docsTypeCallback, setOcrText, docsType, setIdDoc, setHeaderList, setSkipRows }) => {
  const [file, setFile] = useState<Blob[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSubmitAlertModal, setShowSubmitAlertModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDuplicateImageModal, setShowDuplicateImageModal] = useState(false);
  const [docsTypeOptions, setDocsTypeOptions] = useState([
    { value: "belumPilih", label: "Belum Memilih" },
    { value: "dokumenBaru", label: "Menambah Jenis Dokumen Baru" },
  ]);
  const [selectedDocsType, setSelectedDocsType] = useState("belumPilih");

  useEffect(() => {
    // Make API call to fetch options from the backend
    const fetchDocsTypeOptions = async () => {
      try {
        const response = await fetch(`https://ocr.polban.studio/document-types/all`);
        const data = await response.json();
        console.log(data)
        const transformedOptions = data.map(option => ({
          value: option.nama_dokumen.toLowerCase().replace(/\s/g, "_"),
          label: option.nama_dokumen
        }));
        setDocsTypeOptions(prevOptions => [...prevOptions, ...transformedOptions]);
      } catch (error) {
        console.error("Error fetching docs type options:", error);
      }
    };

    fetchDocsTypeOptions();
  }, []);

  const renderEkstraksiHeaderButton = () => {
    if (docsType === "dokumenBaru" || selectedDocsType === "dokumenBaru") {
      return (
        <button id="header-btn" className="h-[35px] bg-blue-500 rounded px-3 text-white hover:bg-blue-700" onClick={handleHeaderExtraction}>
          Ekstraksi Header
        </button>
      );
    } else {
      return (
        <button id="scan-btn" className="h-[35px] bg-blue-500 rounded px-3 text-white hover:bg-blue-700" onClick={handleRecognizeText}>
          Mulai Ekstraksi
        </button>
      );
    }
  };

  // Fungsi untuk meng-handle perubahan file gambar
  const handleFileChange = (ev) => {
    setFile(ev.target.files);
    let images: any = [];
    for (let i = 0; i < ev.target.files.length; i++) {
      images.push(URL.createObjectURL(ev.target.files[i]))
    }
    imageCallback(images);
  }

  // Fungsi untuk mencari file
  const browseFile = () => {
    const browseBtn = document.getElementById("file") as HTMLInputElement;
    browseBtn.click();
  };

  // Fungsi untuk memilih jenis dokumen
  const handleDocsType = (selectedOption) => {
    setSelectedDocsType(selectedOption);
    const docsType = selectedOption.value;
    const docsName = selectedOption.label;
    docsTypeCallback(docsType, docsName);
    console.log(docsType);
    return docsType;
  }

  // Fungsi untuk mereset state form
  const resetState = (ev) => {
    const types = document.getElementById("docsType") as HTMLSelectElement;
    setFile([]);
    imageCallback([]);
    setIsLoading(false);
    types.selectedIndex = 0;
    setSelectedDocsType("belumPilih");
    docsTypeCallback("belumPilih", "");
    setOcrText([]);
    setIdDoc("");
  }

  // Fungsi untuk memulai pemindaian teks
  const handleRecognizeText = async () => {
    const selectedOption = selectedDocsType;
    const document_type = handleDocsType(selectedOption);
    const scanBtn = document.getElementById("scan-btn") as HTMLButtonElement;
    if (file.length !== 0 && docsType !== "belumPilih") {
      scanBtn.disabled = true;
      setIsLoading(true);
      try {
        const result = await recognizeText(file, document_type);
        setIsLoading(false);
        scanBtn.disabled = false;
        if (result.data["error"] && result.data["error"] === "Image has been extracted!") {
          setShowDuplicateImageModal(true);
        } else {
          setOcrText(result.data["data_ekstraksi"]);
          setIdDoc(result.data["_id"]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsLoading(false);
      handleOpenAlertModal();
    }
  }

  const handleHeaderExtraction = async () => {
    const headerBtn = document.getElementById("header-btn") as HTMLButtonElement;
  
    if (file.length !== 0 && docsType !== "belumPilih") {
      headerBtn.disabled = true;
      setIsLoading(true);
      try {
        const result = await recognizeHeader(file);
        setIsLoading(false);
        console.log("result")
        console.log(result)
        headerBtn.disabled = false;
        setHeaderList(result.data["header_list"])
         setSkipRows(result.data["skiprows"])
        // setHeaderList(['NO URUT', 'NAMADAN KODEMATERIL', 'SATUAN', 'BANYAKNYA - ANGKA', 'BANYAKNYA - HURUF', 'HARGA - JUMLAH (Rp)', 'HARGA - KET'])
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsLoading(false);
      handleOpenAlertModal();
    }
  };
  

  // Fungsi untuk membuka modal peringatan
  const handleOpenAlertModal = () => {
    setShowAlertModal(true);
  }
  

  return (
    <div className="pt-8 px-4 pb-5">
      {/* Bagian judul */}
      <h1 className="text-2xl mb-4 text-gray-900 dark:text-gray-300">Table Information Extraction</h1>
      <div className="flex justify-between">
        <div className="flex items-end">
          {/* Form untuk memilih jenis dokumen */}
          <form className="mr-5">
            <label className="block text-gray-900 dark:text-gray-300">Jenis Dokumen</label>
            {/* Komponen Select untuk memilih jenis dokumen */}
            <Select
              id="docsType"
              options={docsTypeOptions}
              value={selectedDocsType}
              onChange={handleDocsType}
              placeholder="Belum dipilih"
              className="w-56 min-w-[200px] text-base"
              classNamePrefix="react-select"
              isSearchable={false}
              styles={{
                option: (provided) => ({
                  ...provided,
                  fontSize: "12px",
                  height: "fit-content"
                }),
              }}
            />
          </form>
          {/* Input file untuk memilih gambar */}
          <form>
            <input
            className="hidden"
            type="file"
            id="file"
            accept=".png, .jpg, .jpeg"
            multiple
            onChange={handleFileChange}
          />
          </form>
          
          {/* Tombol "Pilih Gambar" */}
          <input className="h-[35px] mr-3 bg-blue-500 rounded px-3 text-white cursor-pointer hover:bg-blue-700" type="button"
            value="+ Pilih Gambar"
            onClick={browseFile} />
          {/* Tombol Reset */}
          <button id="reset-btn" className="h-[35px] mr-3 bg-red-600 rounded px-3 text-white hover:bg-red-700" onClick={() => setShowResetModal(true)}>
            Reset
          </button>
          {/* Tombol "Mulai Scan" */}
          {renderEkstraksiHeaderButton()}

          {/* Loading indicator */}
          {isLoading &&
            <div id="loading" className="text-base ml-4 mt-2 italic self-end">
              {/* Pesan loading */}
              <p className="mr-2 inline text-gray-900 dark:text-gray-300">Sedang mengkonversi ...</p>
              {/* Animasi loading */}
              <svg
                className="inline w-4 h-4 text-black animate-spin dark:text-gray-600 fih-[48px] fill-primary-main dark:fill-primary-main"
                viewBox="0 0 100 101"
                fill="none"
              >
                {/* Detail animasi loading */}
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          }
        </div>
      </div>
      {/* Modal konfirmasi reset */}
      <ConfirmationModal
        state={{ getter: showResetModal, setter: setShowResetModal }}
        handleConfirm={resetState}
        textConfirmation='melakukan reset dari awal?'
        btnYes='Ya'
      />
      {/* // Modal peringatan saat submit */}
      <AlertModal show={showSubmitAlertModal} onHide={() => setShowSubmitAlertModal(false)} textConfirmation='Silahkan pilih jenis dokumen terlebih dahulu.' btnYes='Ok' />

      {/* // Modal peringatan saat tidak memilih jenis dokumen dan gambar */}
      <AlertModal show={showAlertModal} onHide={() => setShowAlertModal(false)} textConfirmation='Silahkan pilih jenis dokumen dan gambar terlebih dahulu.' btnYes='Ok' />

      {/* // Modal peringatan saat gambar sudah pernah disubmit */}
      <AlertModal show={showDuplicateImageModal} onHide={() => setShowDuplicateImageModal(false)} textConfirmation='Gambar sudah pernah diekstrak.' btnYes='Ok' />
    </div>
  );  
}

export default Header;
