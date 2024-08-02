import router from '@/router'
import axiosInstance from '@/services/api'

const authActions = {
  async login({ commit }: any, user: { email: any; password: any }) {
    try {
      commit('loading')
      const response = await axiosInstance.post('auth/login', user)

      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('accessToken', response.data.access_token)
        localStorage.setItem('refreshToken', response.data.refresh_token)
      }

      commit('loginSuccess', response.data)
      router.push('/products')
      return response.data
    } catch (e) {
      console.log('error', e)
      commit('loginFailure')
    }
  },
  async logout({ commit }: any, userId: number) {
    try {
      commit('loading')
      await axiosInstance.post('auth/logout', { id: userId })

      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      commit('logoutSuccess')
      router.push('/login')
    } catch (e) {
      console.log(e)
      commit('logoutFailure')
    }
  },
  async register({ commit }: any, user: { username: string; email: string; password: string }) {
    try {
      commit('loading')
      const response: any = await axiosInstance.post('auth/register', user)
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('accessToken', response.data.access_token)
        localStorage.setItem('refreshToken', response.data.refresh_token)
      }
      commit('registerSuccess', response.data)
      router.push('/products')
    } catch (e) {
      console.log(e)
      commit('registerFailure')
    }
  }
}

export default authActions
