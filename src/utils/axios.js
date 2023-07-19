import axios from 'axios';
import { PATH_AUTH } from '../routes/path';
import { setSession } from './jwt';
import { Config } from '../constants';

export const handleUnauthorizedRequest = (error) => {
    // console.error('Axios Error:', error);
    if (error && (error.status === 401 || error.statusCode === 401)) {
        setSession();
        // push to log in immediately when not auth path, token is not valid
        if (!window.location.pathname.includes('auth')) {
            window.location.replace(PATH_AUTH.login);
        }
    }
};

// This instance handles call to TALEEM service
// const axiosInstance = axios.create({
//     baseURL: Config.apiBaseUrl,
//     timeout: 10000,
// });

// // This instance handles call to tajneed for auth token
// const authInstance = axios.create({
//     baseURL: Config.authApiBaseUrl,
//     timeout: 10000,
// });

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         handleUnauthorizedRequest(error.response || error);
//         return Promise.reject(error.response);
//     },
// );

// authInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         handleUnauthorizedRequest(error.response || error);
//         return Promise.reject(error.response);
//     },
// );

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7020/api/', // Replace with your API base URL
    timeout: 30000,
});

// This instance handles calls to your authentication endpoints
const authInstance = axios.create({
    baseURL: 'https://localhost:7020/api/Auth/', // Replace with your authentication API base URL
    timeout: 30000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        handleUnauthorizedRequest(error.response || error);
        return Promise.reject(error.response);
    },
);

authInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        handleUnauthorizedRequest(error.response || error);
        return Promise.reject(error.response);
    },
);
export { axiosInstance, authInstance };
