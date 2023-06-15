import React, { useState, useEffect, useCallback } from "react";
import SubmitModal from "../Modals/SubmitModal";
import { postNewDocument } from '../../services/documentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface NestedJsonFormProps {
  ocrText: {
    "No": number;
    "Nama Materil": string;
    "Jumlah (Angka)": string;
    "Jumlah (Huruf)": string;
    "Jumlah (Satuan)": string;
    Seri?: string[];
    Kelengkapan?: {
      "Nama Materil": string;
      "Jumlah (Angka)": string;
    "Jumlah (Huruf)": string;
    "Jumlah (Satuan)": string;
    }[];
  }[];
  docsType: string;
  idDoc: string;
  submitCallback: any;
  setOcrText:any; 
  setIdDoc:any;
}

const FormKhusus: React.FC<NestedJsonFormProps> = ({
  ocrText,
  docsType,
  idDoc,
  submitCallback,
  setOcrText,
  setIdDoc
}) => {
  const [formData, setFormData] = useState<NestedJsonFormProps["ocrText"]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  console.log(formData);
  console.log(formData["Jumlah"])
  useEffect(() => {
    setFormData(ocrText);
  }, [ocrText]);

  useEffect(() => {
    setFormData([]);
  }, [docsType]);

  const handleTestButtonClick = () => {
    const testData = [
      
    ];
  
    setFormData(testData);
  };
  

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedData = [...formData];
    if (field === "Seri") {
      updatedData[index][field] = value ? (value as string).split(",") : [];
    } else {
      updatedData[index][field] = value;
    }
    setFormData(updatedData);
  };

  const handleNestedChange = (
    parentIndex: number,
    nestedIndex: number,
    field: string,
    value: string | number
  ) => {
    const updatedData = [...formData];
    if (!updatedData[parentIndex].Kelengkapan) {
      updatedData[parentIndex].Kelengkapan = [];
    }
    if (updatedData[parentIndex].Kelengkapan[nestedIndex]) {
      updatedData[parentIndex].Kelengkapan[nestedIndex][field] = value;
    }
    setFormData(updatedData);
  };
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowSubmitModal(true);
    console.log("Submit button clicked");
  };

  const handleConfirmSubmit = async () => {
    // Send
    const response = await postNewDocument(formData, idDoc);

    // Handle the response from the backend
    if (response.status === 200) {
      // Success
      toast.success('Data berhasil di submit!');
      setFormData([]);
      setOcrText([]);
      setIdDoc("");
      submitCallback(true);
      console.log("Data submitted successfully!");
      window.location.reload();
    } else {
      // Error
      const errorMessage = response.error.message || 'Error submitting data';
      toast.error(errorMessage);
    }
  };

  if (!ocrText || ocrText.length === 0) {
      return null; // Render nothing if ocrText is undefined or empty
    }

  return (
    <div>

      <form onSubmit={handleSubmit} className="p-4">
        {formData.map((item, index) => (
          <div key={index} className="flex flex-wrap mb-4">
            <h3 className="w-full text-lg font-bold">Item {index + 1}</h3>
            <div className="w-1/2 pr-2 mt-2">
              <label className="block mb-1 font-medium">No:</label>
              <input
                type="number"
                value={item.No}
                onChange={(e) => handleChange(index, "No", e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="w-1/2 pl-2 mt-2">
              <label className="block mb-1 font-medium">Nama Materil:</label>
              <input
                type="text"
                value={item["Nama Materil"]}
                onChange={(e) => handleChange(index, "Nama Materil", e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="w-1/2 pr-2 mt-2">
              <label className="block mb-1 font-medium">Angka:</label>
              <input
                type="text"
                value={item["Jumlah (Angka)"]}
                onChange={(e) => handleChange(index, "Jumlah (Angka)", e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="w-1/2 pl-2 mt-2">
              <label className="block mb-1 font-medium">Satuan:</label>
              <input
                type="text"
                value={item["Jumlah (Satuan)"]}
                onChange={(e) => handleChange(index, "Jumlah (Satuan)", e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="w-1/2 pl-2 mt-2">
              <label className="block mb-1 font-medium">Huruf:</label>
              <input
                type="text"
                value={item["Jumlah (Huruf)"]}
                onChange={(e) => handleChange(index, "Jumlah (Huruf)", e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            {item.Seri && (
              <div className="w-full mt-2">
                <label className="block mb-1 font-medium">Seri:</label>
                <input
                  type="text"
                  value={item.Seri.join(",")}
                  onChange={(e) => handleChange(index, "Seri", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </div>
            )}
            {item.Kelengkapan && (
              <div className="w-full mt-2">
                <label className="block mb-1 font-medium">Kelengkapan:</label>
                <ul>
                  {item.Kelengkapan.map((nestedItem, nestedIndex) => (
                    <li key={nestedIndex} className="mt-2">
                      <div className="w-1/2 pr-2">
                        <label className="block mb-1 font-medium">Nama Materil:</label>
                        <input
                          type="text"
                          value={nestedItem["Nama Materil"]}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              nestedIndex,
                              "Nama Materil",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <label className="block mb-1 font-medium">Angka:</label>
                        <input
                          type="text"
                          value={nestedItem["Jumlah (Angka)"]}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              nestedIndex,
                              "Jumlah (Angka)",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <label className="block mb-1 font-medium">Satuan:</label>
                        <input
                          type="text"
                          value={nestedItem["Jumlah (Satuan)"]}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              nestedIndex,
                              "Jumlah (Satuan)",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <label className="block mb-1 font-medium">Huruf:</label>
                        <input
                          type="text"
                          value={nestedItem["Jumlah (Huruf)"]}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              nestedIndex,
                              "Jumlah (Huruf)",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setShowSubmitModal(true)}
          className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {showSubmitModal && (
        <SubmitModal
          closeModal={() => setShowSubmitModal(false)}
          handleSubmit={handleConfirmSubmit}
        />
      )}

    </div>
  );
};

export default FormKhusus;