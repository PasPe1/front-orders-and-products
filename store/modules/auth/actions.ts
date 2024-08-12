import Cookies from 'js-cookie'
import { toast } from 'vue3-toastify'
import axiosInstance from '@/src/services/api'
import type { ICommit, IResponse, IUser } from '~/store/types'

const authActions = {
  async login({ commit }: ICommit, user: { email: string, password: string }) {
    const router = useRouter()

    try {
      commit('loadingAuth')
      const response = await axiosInstance.post('auth/login', user)

      if (response.data.access_token) {
        Cookies.set('user', JSON.stringify(response.data))
        Cookies.set('accessToken', response.data.refresh_token)
        Cookies.set('refreshToken', response.data.access_token)
      }
      commit('loginSuccess', response.data)
      router.push('/')
      return response.data
    }
    catch (error) {
      commit('loginFailure')
      toast.error('Login error!')
      throw error
    }
  },
  async logout({ commit }: ICommit, userId: number) {
    const router = useRouter()

    try {
      commit('loadingAuth')
      await axiosInstance.post('auth/logout', { id: userId })

      Cookies.remove('user')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      commit('logoutSuccess')
      router.push('/login')
    }
    catch (error) {
      commit('logoutFailure')
      toast.error('Logout error!')
      throw error
    }
  },
  async register({ commit }: ICommit, user: IUser) {
    const router = useRouter()

    try {
      commit('loadingAuth')
      const response: IResponse = await axiosInstance.post('auth/register', user)
      if (response.data.access_token) {
        Cookies.set('user', JSON.stringify(response.data))
        Cookies.set('accessToken', response.data.refresh_token)
        Cookies.set('refreshToken', response.data.access_token)
      }
      commit('registerSuccess', response.data)
      router.push('/')
    }
    catch (error) {
      commit('registerFailure')
      toast.error('Register error!')
      throw error
    }
  },
}

export default authActions
