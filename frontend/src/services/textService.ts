import axios from 'axios'

export const recognizeText = async (files, document_name: string ) => {
  try {
    console.log("debug")
    if (!files)
      return alert('Tidak ada file yang dipilih');
  
    // Assuming you have an array of File objects called 'fileArray'
    const formData = new FormData();
    console.log("debug #2")
    console.log(files)
   
    for (let i = 0; i < files.length; i++) {
      formData.append('file'+i, files[i]);
      console.log("debug #3")
    }

    console.log("test ocr")
    // console.log(images);
    // formData.append('file', images);
    formData.append('document_type', document_name);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  
    const response = await axios.post('https://ocr.polban.studio/table', formData);
  
    const ocrData = response["data"];
    
    return ocrData; 
    // return;
  } catch (error) {
    return error.response;
  }
};
