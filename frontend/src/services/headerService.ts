import axios from 'axios'

export const recognizeHeader = async (files) => {
  try {
    if (!files)
      return alert('Tidak ada file yang dipilih');
  
    // Assuming you have an array of File objects called 'fileArray'
    const formData = new FormData();
   
    for (let i = 0; i < files.length; i++) {
      formData.append('file'+i, files[i]);
    }
    
  
    const response = await axios.post('https://ocr.polban.studio/document-types/extract-header', formData);
    const ocrData = response;
    
    return ocrData; 
    // return;
  } catch (error) {
    return error.response;
  }
};
