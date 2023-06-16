import React, { Suspense } from "react";
import { OcrText } from "../../Typings/ocrTypings";
const FormBaru = React.lazy(() => import("../Forms/FormBaru"));
const FormBase = React.lazy(() => import("../Forms/FormBase"));
const FormKhusus = React.lazy(() => import("../Forms/FormKhusus"))
// const FormPenyerahanBarang = React.lazy(() => import("../PenyerahanBarang/FormPenyerahanBarang"));
// const FormPermohonanDukungan = React.lazy(() => import("../PermohonanDukungan/FormPermohonanDukungan"));
// const FormKebutuhanAset = React.lazy(() => import("../KebutuhanAset/FormKebutuhanAset"));


const FormHandler = ({ docsType, ocrText, idDoc, headerList, setOcrText, setIdDoc, submitCallback, skipRows }) => {
  const suspenseText = <h2 className="text-2xl text-gray-800 dark:text-gray-300">Loading ...</h2>
  switch (docsType) {
    case "dokumenBaru":
        return (
            <Suspense fallback={suspenseText}>
            <FormBaru headerList={headerList} submitCallback={submitCallback} skipRows={skipRows}/>
            </Suspense>
        )
    case "belumPilih":
        return <h2 className="text-2xl text-gray-800 dark:text-gray-300">Jenis dokumen belum dipilih</h2>

    case "surat_penyerahan_barang":
      return (
        <Suspense fallback={suspenseText}>
          <FormKhusus ocrText={ocrText} docsType={docsType} idDoc={idDoc} setOcrText={setOcrText} setIdDoc={setIdDoc} submitCallback={submitCallback} />
        </Suspense>
      )
      
    default:
        return (
            <Suspense fallback={suspenseText}>
              <FormBase ocrText={ocrText} docsType={docsType} idDoc={idDoc} setOcrText={setOcrText} setIdDoc={setIdDoc} submitCallback={submitCallback}/>
            </Suspense>
          )
  }
}

export default FormHandler;