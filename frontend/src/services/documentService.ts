import axios from "axios";

export const postNewDocument = async (body: any, id: any) => {
  try {
    console.log("inside document Service");
    console.log(body)
    const response = await axios.put(`https://ocr.polban.studio/table/${id}`, body);
    
    return response;
  } catch (error) {
    return error.response;
  }
}