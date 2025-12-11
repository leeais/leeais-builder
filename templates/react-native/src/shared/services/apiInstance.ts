import axios from 'axios';

// const API_BASE_URL = 'https://api.yourdomain.com';

const apiInstance = axios.create({
  // baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(
  async (config) => {
    // const token = await AsyncStorage.getItem('userToken');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      // await AsyncStorage.setItem('userToken', newAccessToken);
      apiInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      return apiInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  return 'new_access_token';
};

export default apiInstance;
