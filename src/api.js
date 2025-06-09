import axios from "axios";

const API  = import.meta.env.VITE_API_URL;

export const uploadPDF = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API}/pdf/upload`, formData, {
        headers: {"Content-Type": "multipart/form-data"},
    });
}

export const askQuestion = (s3_key, question) => {
    const formData = new FormData();
    formData.append("s3_key", s3_key);
    formData.append("question", question);
    
    return axios.post(`${API}/question_answer/ask`, formData);
};