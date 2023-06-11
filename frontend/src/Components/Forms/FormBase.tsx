import React, { useState, useEffect, ChangeEvent } from 'react';
import { postNewDocument } from '../../services/documentService';
import { getAllDocument } from '../../services/getTest';
import SubmitModal from "../Modals/SubmitModal";


interface TableItem {
  [key: string]: string | number | null;
}

interface FormValues {
  tabel: TableItem[];
}

const initialFormValue: FormValues = {
  tabel: [],
};

const FormBase = ({ ocrText, finalDataSetter, docsType, idDoc }) => {
  const [formData, setFormData] = useState<FormValues>(initialFormValue);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    setFormData(initialFormValue);
  }, [docsType]);

  useEffect(() => {
    console.log("in form base")
    console.log(ocrText)
    if (ocrText) {
      const updatedTable = ocrText.map((textItem) => {
        const tableItem: TableItem = {};
        Object.keys(textItem).forEach((key) => {
          tableItem[key] = textItem[key];
        });
        return tableItem;
      });

      setFormData({
        tabel: updatedTable,
      });
    }
  }, [ocrText]);

  const handleChange = (
    idx: number,
    key: keyof TableItem,
    value: string | number | null
  ) => {
    const updatedTable = formData.tabel.map((item, itemIdx) => {
      if (itemIdx === idx) {
        return {
          ...item,
          [key]: value,
        };
      }
      return item;
    });

    setFormData({
      tabel: updatedTable,
    });
  };

  const addNewTableRow = () => {
    const newItem: TableItem = {};
    formData.tabel.forEach((item) => {
      Object.keys(item).forEach((key) => {
        newItem[key] = null;
      });
    });

    setFormData({
      tabel: [...formData.tabel, newItem],
    });
  };

  const removeTableRow = (idx: number) => {
    const updatedTable = formData.tabel.filter((_, itemIdx) => itemIdx !== idx);

    setFormData({
      tabel: updatedTable,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = async () => {
    // Send data to backend
    const response = await postNewDocument(finalDataSetter, idDoc);
  
    // Handle the response from the backend
    if (response.status === 200) {
      // Success
      console.log('Data submitted successfully!');
    } else {
      // Error
      console.log('Error submitting data');
    }
  };
  

  const getKeys = () => {
    // Return the list of headings based on the keys in the JSON
    const keys = Object.keys(formData.tabel[0] || {});
    return keys;
  };

  const getHeader = () => {
    // Return the header component of the table
    const keys = getKeys();
    return (
      <tr>
        {keys.map((key) => (
          <th key={key} className="min-w-50">
            <div className="min-w-min">{key}</div>
          </th>
        ))}
        <th>Actions</th>
      </tr>
    );
  };

  const getRowsData = () => {
    // Return the body part of the table
    const keys = getKeys();
    return formData.tabel.map((item, index) => (
      <tr key={index}>
        {keys.map((key) => (
          <td key={key} className="min-w-50">
            <input
              type="text"
              value={item[key] || ''}
              onChange={(e) => handleChange(index, key, e.target.value)}
            />
          </td>
        ))}
        <td>
          <button
            onClick={() => removeTableRow(index)}
            className="px-4 py-2 text-sm text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          >
            Hapus
          </button>
        </td>
      </tr>
    ));
  };

  const handleTestButtonClick = async () => {
    const FormData = [
      {
        "No": 1,
        "Jenis Materiil": "Radio AM/SSB",
        "Satuan": "Set",
        "Indeks OPS": 4,
        "Kebut OPS": 6,
        "Nyata": 0,
        "Terdukung": 6,
        "Kurang": 0,
        "Keterangan": null
      },
      {
        "No": 2,
        "Jenis Materiil": "Radio Rig",
        "Satuan": "Set",
        "Indeks OPS": 0,
        "Kebut OPS": 5,
        "Nyata": 0,
        "Terdukung": 0,
        "Kurang": 5,
        "Keterangan": null
      },
      {
        "No": 3,
        "Jenis Materiil": "Radio PRC-1077",
        "Satuan": "Set",
        "Indeks OPS": 14,
        "Kebut OPS": 0,
        "Nyata": 0,
        "Terdukung": 0,
        "Kurang": 0,
        "Keterangan": null
      },
      {
        "No": 4,
        "Jenis Materiil": "Radio HT UHF",
        "Satuan": "Set",
        "Indeks OPS": 60,
        "Kebut OPS": 40,
        "Nyata": 20,
        "Terdukung": 20,
        "Kurang": 0,
        "Keterangan": null
      },
      {
        "No": 5,
        "Jenis Materiil": "Repeater UHF",
        "Satuan": "Set",
        "Indeks OPS": 1,
        "Kebut OPS": 2,
        "Nyata": 0,
        "Terdukung": 2,
        "Kurang": 0,
        "Keterangan": null
      }
    ]
    
    setFormData({
      tabel: FormData,
    });
    // try {
    //   const testData = await getAllDocument();
    //   console.log(testData["data"]["data_ekstraksi"]); 
    //   setFormData({
    //     tabel: testData,
    //   });
    // } catch (error) {
    //   console.error('Error retrieving test data:', error);
    // }
  };

  // if (!ocrText || ocrText.length === 0) {
  //   return null; // Render nothing if ocrText is undefined or empty
  // }
  
  return (
    <form
      id="formBase"
      onSubmit={handleSubmit}
      className="text-gray-900 dark:text-gray-300"
    >
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-min">
            <thead>{getHeader()}</thead>
            <tbody>{getRowsData()}</tbody>
          </table>
        </div>
        <div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={addNewTableRow}
              className="px-4 py-2 text-sm text-blue-500 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              Tambah Baris
            </button>
            <button
              type="button"
              onClick={handleTestButtonClick}
              className="px-4 py-2 text-sm text-green-500 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              Test
            </button>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {showSubmitModal && (
        <SubmitModal closeModal={() => setShowSubmitModal(false)} handleSubmit={handleConfirmSubmit} />
      )}

    </form>
  );
};

export default FormBase;
