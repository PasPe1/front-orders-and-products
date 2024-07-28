import router from '@/router';
import axiosInstance from '@/services/api';

const authActions = {
  async login({ commit }: any, user: { email: any; password: any }) {
    try {
        commit('loading')
        const response = await axiosInstance.post('auth/signIn', {
            email: user.email,
            password: user.password
          })
          if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
            localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))
          }

          commit('loginSuccess', response.data)
          router.push('/main');
          return response.data
    } catch(e) {
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
        router.push('/sign-in');
  } catch(e) {
      console.log(e);
      commit('logoutFailure')
  }
  },
  register({ commit }: any, user: { username: any; email: any; password: any; }) {
    try {
        commit('loading')
        const response: any = axiosInstance.post('auth/signUp', user)

          if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
            localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))
          }
          commit('registerSuccess', response)
          router.push('/main');
    } catch(e) {
        console.log(e);
        commit('registerFailure')
    }
  }
}

export default authActions
