import axios from "axios";

export const postNewTemplate = async (document_name: string, body: any) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/document?document_name=${document_name}`, body);
    
    return response;
  } catch (error) {
    return error.response;
  }
}