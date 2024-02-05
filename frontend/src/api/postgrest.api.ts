import axios from 'axios';

const API_URL = `${process.env.REACT_APP_DB_API_SERVER}`


export const getApi = async (endpoint:string) => {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
}

export const postApi = async (endpoint:string, data:object) => {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
}

export const deleteApi = async (endpoint:string) => {
    const response = await axios.delete(`${API_URL}${endpoint}`);
    return response.data;
}