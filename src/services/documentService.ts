import axios from "axios";

export const postNewDocument = async (document_name: string, body: any) => {
  try {
    const response = await axios.post(`http://localhost:8001/api/document?document_name=${document_name}`, body);
    
    return response;
  } catch (error) {
    return error.response;
  }
}