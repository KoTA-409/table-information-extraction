import React, { ChangeEvent, FormEvent, useState } from 'react';
import { postNewTemplate } from "../../services/newTemplate";
import SubmitModal from '../Modals/SubmitModal';

interface Kolom {
  type: string;
  value: string;
}

const FormBaru = () => {
  const [namaDokumen, setNamaDokumen] = useState('');
  const [KolomList, setKolomList] = useState<Kolom[]>([{ type: 'string', value: '' }]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNamaDokumen(value);
  };

  const handleKolomChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setKolomList((prevKolomList) => {
      const updatedKolomList = [...prevKolomList];
      updatedKolomList[index][name] = value;
      return updatedKolomList;
    });
  };  

  const addKolom = () => {
    setKolomList((prevKolomList) => [
      ...prevKolomList,
      { type: 'string', value: '' }
    ]);
  };

  const removeKolom = (index: number) => {
    setKolomList((prevKolomList) => {
      const updatedKolomList = [...prevKolomList];
      updatedKolomList.splice(index, 1);
      return updatedKolomList;
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = async () => {
    // Close the submit modal
    setShowSubmitModal(false);
  
    // Create the JSON object
    const jsonPayload = {
      nama_dokumen: namaDokumen,
      jenis_tabel: "Umum",
      daftar_kolom: KolomList.map((Kolom) => ({
        nama_kolom: Kolom.value,
        tipe_data: Kolom.type
      }))
    };
    
    console.log("Form Baru #test")
    console.log(jsonPayload);
    console.log("JSON Type");
    console.log(JSON.stringify(jsonPayload))
    // Send data to the backend
    const response = await postNewTemplate(jsonPayload);
  
    // Handle the response from the backend
    if (response.status === 200) {
      // Success
      console.log('Template submitted successfully!');
      window.location.reload();
    } else {
      // Error
      console.log('Error submitting template');
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
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">List Kolom:</label>
          {KolomList.map((Kolom, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name="value"
                value={Kolom.value}
                onChange={(event) => handleKolomChange(index, event)}
                className="w-1/2 px-4 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                name="type"
                value={Kolom.type}
                onChange={(event) => handleKolomChange(index, event)}
                className="w-1/3 px-4 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="string">Teks</option>
                <option value="int">Angka</option>
              </select>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeKolom(index)}
                  className="px-4 py-2 text-sm text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addKolom}
            className="px-4 py-2 text-sm text-blue-500 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            Tambah Kolom
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
    </>
  );
};

export default FormBaru;