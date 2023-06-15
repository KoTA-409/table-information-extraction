import React, { useState, useEffect } from 'react';
import { postNewDocument } from '../../services/documentService';
import SubmitModal from "../Modals/SubmitModal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TableItem {
  [key: string]: string | number | null;
}

interface FormValues {
  tabel: TableItem[];
}

const initialFormValue: FormValues = {
  tabel: [],
};

const FormBase = ({ ocrText, docsType, idDoc, setOcrText, setIdDoc, submitCallback }) => {
  const [formData, setFormData] = useState<FormValues>(initialFormValue);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    setFormData(initialFormValue);
  }, [docsType]);

  useEffect(() => {
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
    const response = await postNewDocument(formData["tabel"], idDoc);

    if (response.status === 200) {
      // Success
      toast.success('Data berhasil di submit!', {
        onClose: () => {
          setFormData(initialFormValue);
          setOcrText([]);
          setIdDoc("");
          submitCallback(true);
          window.location.reload();
        }
      });
    } else {
      // Error
      const errorMessage = response.error.message || 'Error submitting data';
      toast.error(errorMessage);
    }
  };

  const getKeys = () => {
    const keys = Object.keys(formData.tabel[0] || {});
    return keys;
  };

  const getHeader = () => {
    const keys = getKeys();
    return (
      <tr>
        {keys.map((key) => (
          <th key={key} className="min-w-min">
            <div className="min-w-min">{key}</div>
          </th>
        ))}
        <th className="w-auto">Actions</th>
      </tr>
    );
  };

  const getRowsData = () => {
    const keys = getKeys();
    return formData.tabel.map((item, index) => (
      <tr key={index}>
        {keys.map((key) => (
          <td key={key} className="min-w-min">
            <input
              type="text"
              value={item[key] || ''}
              onChange={(e) => handleChange(index, key, e.target.value)}
            />
          </td>
        ))}
        <td className="w-auto">
          <button
            onClick={() => removeTableRow(index)}
            type="button"
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
      // Your test data here
    ];

    setFormData({
      tabel: FormData,
    });
  };

  if (!ocrText || ocrText.length === 0) {
    return null;
  }

  return (
    <>
     {/* <ToastContainer /> */}
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
    </>
  );
};

export default FormBase;
