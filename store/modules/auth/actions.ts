import Cookies from 'js-cookie'
import axiosInstance from '@/src/services/api'
import type { ICommit, IResponse, IUser } from '~/store/types'

const authActions = {
  async login({ commit }: ICommit, user: { email: string, password: string }) {
    const router = useRouter()

    try {
      commit('loading')
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
    catch (e) {
      console.log('error', e)
      commit('loginFailure')
    }
  },
  async logout({ commit }: ICommit, userId: number) {
    const router = useRouter()

    try {
      commit('loading')
      await axiosInstance.post('auth/logout', { id: userId })

      Cookies.remove('user')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      commit('logoutSuccess')
      router.push('/login')
    }
    catch (e) {
      console.log(e)
      commit('logoutFailure')
    }
  },
  async register({ commit }: ICommit, user: IUser) {
    const router = useRouter()

    try {
      commit('loading')
      const response: IResponse = await axiosInstance.post('auth/register', user)
      if (response.data.access_token) {
        Cookies.set('user', JSON.stringify(response.data))
        Cookies.set('accessToken', response.data.refresh_token)
        Cookies.set('refreshToken', response.data.access_token)
      }
      commit('registerSuccess', response.data)
      router.push('/')
    }
    catch (e) {
      console.log(e)
      commit('registerFailure')
    }
  },
}

export default authActions
