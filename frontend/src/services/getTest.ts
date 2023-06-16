import axios from "axios";

export const getAllDocument = async () => {
  try {
    const response = await axios.get(`https://ocr.polban.studio/table/648550ab73b1fdad738e225d`);
    
    return response;
  } catch (error) {
    return error.response;
  }
}