// 2.A.1 import axios to make HTTP requests to the backend API
import axios from 'axios'
import { CONFIG_API_URL } from '../constants/config'
// 2.A.3 create an axios instance with the base URL of the backend API and default headers
const api = axios.create({
  baseURL: CONFIG_API_URL,
})

export default api
