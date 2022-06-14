import axios, { AxiosInstance } from 'axios';

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create();

const accessToken = localStorage.getItem('accessToken');
axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

export default axiosInstance;
