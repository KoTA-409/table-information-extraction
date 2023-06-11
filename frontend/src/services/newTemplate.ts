import axios from "axios";

export const postNewTemplate = async ( body: any) => {
  try {
    const response = await axios.post(`https://ocr.polban.studio/document-types`, body);
    
    return response;
  } catch (error) {
    return error.response;
  }
}