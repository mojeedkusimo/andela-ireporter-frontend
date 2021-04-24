import axios from 'axios';
require('dotenv').config();

const axiosInstance = axios.create({
    baseURL: "https://mojeedkusimo-andela-ireporter.herokuapp.com/api/"
});
// https://mojeedkusimo-andela-ireporter.herokuapp.com/api/
// http://localhost:5001/api/
// || process.env.SERVER_API_URL
// process.env.LOCAL_API_URL 
export default axiosInstance;