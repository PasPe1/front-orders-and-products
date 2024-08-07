import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = Cookies.get('refreshToken')

        const response = await axiosInstance.post('auth/refresh', {
          refreshToken,
        })
        const { access_token, refresh_token: newRefreshToken } = response.data

        Cookies.set('accessToken', access_token)
        Cookies.set('refreshToken', newRefreshToken)

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        return axiosInstance(originalRequest)
      }
      catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
