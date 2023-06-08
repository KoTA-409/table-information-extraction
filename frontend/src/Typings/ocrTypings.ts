export interface OcrText {
  text: string
}

export interface OcrFormProps {
  ocrText: OcrText[] | undefined
  finalDataSetter?: any
  openSubmitModal: any
}