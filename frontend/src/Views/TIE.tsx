import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Handler from "../Components/Forms/Handler";
import Header from "../Components/Header";
import { OcrText } from "../Typings/ocrTypings";
import MapInteractionCSS from 'react-map-interaction';

// @ts-ignore
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import SubmitModal from "../Components/Modals/SubmitModal";

const TIE = () => {
  const [imagePath, setImagePath] = useState<string[]>([]);
  const [docsType, setDocsType] = useState("belumPilih");
  const [docsName, setDocsName] = useState("");
  const [ocrText, setOcrText] = useState<OcrText[]>();
  const [idDoc, setIdDoc] = useState("");
  const [headerList, setHeaderList] = useState([]);
  const [skipRows, setSkipRows] = useState<number>(0);
  console.log("header List :")
  console.log(headerList)

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

  const handleSubmit = (state) => {
    if (state) {
      setImagePath([]);
      setDocsType("belumPilih");
      setDocsName("");
      setOcrText([]);
      setIdDoc("");
      setHeaderList([]);
      setSkipRows(0);
      // Additional code here if needed
    }
  };
  


  return (
    <>
      <Header
        imageCallback={handleImage}
        docsTypeCallback={handleDocsType}
        setOcrText={setOcrText}
        setIdDoc={setIdDoc}
        setHeaderList={setHeaderList}
        setSkipRows={setSkipRows}
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
              idDoc={idDoc}
              headerList={headerList}
              setOcrText={setOcrText}
              setIdDoc={setIdDoc}
              submitCallback={handleSubmit}
              skipRows={skipRows}
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
      
    </>
  );
};

export default TIE;
