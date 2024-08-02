import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },(error) => {
    return Promise.reject(error);
  })

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');

          const response = await axiosInstance.post('auth/refresh', {
            refreshToken,
          });
          const { access_token, refresh_token: newRefreshToken } = response.data;

          localStorage.setItem('accessToken', access_token);
          localStorage.setItem('refreshToken', newRefreshToken);

          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {

          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance