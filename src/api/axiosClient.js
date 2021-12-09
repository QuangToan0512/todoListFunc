import axios from "axios";
import { BASE_URL } from "../constants/config";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})

export default axiosClient