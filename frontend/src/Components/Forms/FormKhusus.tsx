import React, { useState, useEffect } from "react";
import SubmitModal from "../Modals/SubmitModal";
import { postNewDocument } from '../../services/documentService';

interface FormKhususProps {
  ocrText: Record<string, any>;
  finalDataSetter: (dataForm: Record<string, any>) => void;
  docsType?: string;
  idDoc?: string;
}

const FormKhusus = ({
  ocrText,
  finalDataSetter,
  docsType,
  idDoc,
}: FormKhususProps) => {
  const [dataForm, setData] = useState<Record<string, any>>({});
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    setData(ocrText);
  }, [ocrText]);

  useEffect(() => {
    // Reset dataForm to an empty object when docsType changes
    setData({});
  }, [docsType]);

  const handleTestButtonClick = () => {
    const testData = [
        [
            {
                "No": 1,
                "Nama Materil": "RIGDMRBase Station",
                "Jumlah": 10,
                "Satuan": "Unit",
                "Seri": [
                    "511TWT1238",
                    "511TWT1150511TWT1236511TWT1110",
                    "511TWT1389511TWT1378.511TWT1286",
                    "511TWT1306511TWT3475511TWT1286"
                ],
                "Kelengkapan": [
                    { "Nama Materil": "a.PowerSuplay", "Jumlah": 10, "Satuan": "Unit" },
                    { "Nama Materil": "b.KabelRG8", "Jumlah": 300, "Satuan": "Meter" },
                    {
                        "Nama Materil": "c.KonektorN-maleRG8",
                        "Jumlah": 20,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "d.MountingAntena Omni TelexHygain",
                        "Jumlah": 10,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "e.AntenaOmni Telexhygain400-470Mhz",
                        "Jumlah": 10,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "f.DoubleClampAntenaOmni",
                        "Jumlah": 20,
                        "Satuan": "Unit"
                    },
                    { "Nama Materil": "g.Microphone", "Jumlah": 10, "Satuan": "Unit" }
                ]
            },
            {
                "No": 2,
                "Nama Materil": "Radio HFSSBMotorolaVertex1700/SwitchAle",
                "Jumlah": 4,
                "Satuan": "Unit",
                "Seri": ["819Q770096.819Q770095", "819Q770093819Q770094"],
                "Kelengkapan": [
                    {
                        "Nama Materil": "a.RTVCPowerSupplay40A",
                        "Jumlah": 4,
                        "Satuan": "Unit"
                    },
                    { "Nama Materil": "b.Hand Microphone", "Jumlah": 4, "Satuan": "Unit" },
                    { "Nama Materil": "c.Kabel Power", "Jumlah": 4, "Satuan": "Unit" },
                    {
                        "Nama Materil": "d.TiangAntenaTelescopic6meter",
                        "Jumlah": 8,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "e.Tali SelingAntena Telescopis",
                        "Jumlah": 8,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "f. Tatakan Tiang Telescopis",
                        "Jumlah": 8,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "g.Antena HF Dipole Broadband",
                        "Jumlah": 4,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "h.AntenaOmni Broadband",
                        "Jumlah": 4,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "KableFeederRG830meterdegankonector",
                        "Jumlah": 8,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "j.Coaxial CSW-210G",
                        "Jumlah": 4,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "k.Coaxial AntenaSwitchCSW210dgnJumper",
                        "Jumlah": 4,
                        "Satuan": "Unit"
                    },
                    {
                        "Nama Materil": "L.LightingAreesterSP-1000",
                        "Jumlah": 4,
                        "Satuan": "Unit"
                    },
                    { "Nama Materil": "m.KonektorSP1000", "Jumlah": 1, "Satuan": "Rol" }
                ]
            },
            {
                "No": 3,
                "Nama Materil": "SolarCell Arjuna",
                "Jumlah": 12,
                "Satuan": "Unit"
            }
        ]
        
    ];      


    setData(testData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    setData((prevDataForm) => ({
      ...prevDataForm,
      [name]: value,
    }));
  };
  
  const renderData = (dataForm: Record<string, any> | undefined | null) => {
    if (!dataForm) {
      return null;
    }

    return Object.keys(dataForm).map((key, index) => {
      const value = dataForm[key];
      const valueType = typeof value;

      if (key === "Seri" && Array.isArray(value)) {
        return (
          <div key={index} className="mb-4 flex items-center">
            <label className="block w-32">{key}:</label>
            <input
              type="text"
              name={key}
              value={value.join(", ")}
              onChange={handleChange}
              className="px-3 py-2 border rounded bg-gray-100 flex-grow"
            />
          </div>
        );
      }

      if (valueType === "object" && value !== null) {
        return (
          <div key={index} className="mb-4">
            <p className="font-bold">{key}: </p>
            <div className="ml-4">{renderData(value)}</div>
          </div>
        );
      }

      return (
        <div key={index} className="mb-4 flex items-center">
          <label className="w-32">{key}:</label>
          <input
            type="text"
            name={key}
            value={value || ""}
            onChange={handleChange}
            className="px-3 py-2 border rounded bg-gray-100 flex-grow"
          />
        </div>
      );
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowSubmitModal(true);
    console.log("Submit button clicked");
  };

  const handleConfirmSubmit = async () => {
    // Send formValues to the backend
    console.log("data form");
    console.log(dataForm);
    console.log(" form data");
    console.log(formValues);
    const response = await postNewDocument(formValues, idDoc);

    // Handle the response from the backend
    if (response.status === 200) {
      // Success
      console.log("Data submitted successfully!");
    } else {
      // Error
      console.log("Error submitting data");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          type="button"
          onClick={handleTestButtonClick}
          className="px-4 py-2 text-sm text-green-500 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          Test
        </button>
      </div>

      <div>{renderData(dataForm)}</div>

      <button
        type="button"
        onClick={() => setShowSubmitModal(true)}
        className="px-4 py-2 text-sm text-blue-500 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        Submit
      </button>

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
