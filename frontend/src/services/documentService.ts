import axios from "axios";

export const postNewDocument = async (body: any, id: string) => {
  try {
    const response = await axios.put(`https://ocr.polban.studio/table/${id}`, body);
    
    return response;
  } catch (error) {
    return error.response;
  }
}