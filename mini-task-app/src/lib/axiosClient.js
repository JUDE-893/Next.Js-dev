import axios from 'axios';



// initializing the client
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response?.data?.reason === "TokenExpiredError") window.location.replace(`/login?reason=${error.response?.data?.message}`)
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient;
