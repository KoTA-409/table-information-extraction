import axios from "axios";

export const getAllDocument = async () => {
  try {
    const response = await axios.get(`https://ocr.polban.studio/table/647d8d12857d45593e8c296c`);
    
    return response;
  } catch (error) {
    return error.response;
  }
}