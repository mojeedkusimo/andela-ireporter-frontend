import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://mojeedkusimo-andela-ireporter.herokuapp.com/api/"
});
// https://mojeedkusimo-andela-ireporter.herokuapp.com/api/
// http://localhost:5001/api/
export default axiosInstance;