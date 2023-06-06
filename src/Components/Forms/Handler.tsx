import React, { Suspense } from "react";
import { OcrText } from "../../Typings/ocrTypings";
const FormBaru = React.lazy(() => import("../Forms/FormBaru"));
const FormBase = React.lazy(() => import("../Forms/FormBase"))
// const FormPenyerahanBarang = React.lazy(() => import("../PenyerahanBarang/FormPenyerahanBarang"));
// const FormPermohonanDukungan = React.lazy(() => import("../PermohonanDukungan/FormPermohonanDukungan"));
// const FormKebutuhanAset = React.lazy(() => import("../KebutuhanAset/FormKebutuhanAset"));

interface Props {
  docsType?: string
  ocrText: OcrText[] | undefined
  finalDataSetter: any
}

const FormHandler = ({ docsType, ocrText, finalDataSetter }: Props) => {
  const suspenseText = <h2 className="text-2xl text-gray-800 dark:text-gray-300">Loading ...</h2>
  switch (docsType) {
    case "dokumenBaru":
        return (
            <Suspense fallback={suspenseText}>
            <FormBaru />
            </Suspense>
        )
    case "belumPilih":
        return <h2 className="text-2xl text-gray-800 dark:text-gray-300">Jenis dokumen belum dipilih</h2>
      
    default:
        return (
            <Suspense fallback={suspenseText}>
              <FormBase finalDataSetter={finalDataSetter} docsType={docsType} />
            </Suspense>
          )
  }
}

export default FormHandler;