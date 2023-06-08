import axios from 'axios'

export const recognizeText = async (file, document_name: string ) => {
  try {
    if (!file)
      return alert('Tidak ada file yang dipilih');
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', document_name);
  
    const response = await axios.post('https://ocr.polban.studio/table', formData);
  
    const ocrData = response.data;
    
    return ocrData.data;
  } catch (error) {
    return error.response;
  }
};
