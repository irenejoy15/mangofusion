// 2.A.1 import axios to make HTTP requests to the backend API
import axios from 'axios'
import { CONFIG_API_URL } from '../constants/config'
import Cookies from 'js-cookie' // If you are using js-cookie to manage cookies
// 2.A.3 create an axios instance with the base URL of the backend API and default headers
const api = axios.create({
  baseURL: CONFIG_API_URL,
})

// For Interceptors, you can add them here if needed, for token handling, error handling, etc.
api.interceptors.request.use(
  (config) => {
    // Example: Add an Authorization header if you have a token
    const token = Cookies.get('token_mango') // Assuming you are using js-cookie to manage cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default api
