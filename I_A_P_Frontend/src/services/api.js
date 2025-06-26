import axios from 'axios';

const API = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const submitApplication = (data) => {
    //backend se ayega
return API.post('/api/applications/submit', data);
};



export default API;