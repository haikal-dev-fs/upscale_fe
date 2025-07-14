import { defineStore } from 'pinia'
import api from '@/services/api'

export const useUserStore = defineStore('user', {
  state: () => ({ user: null, token: localStorage.getItem('token') || null }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(payload) {
      const { data } = await api.post('/auth/login', payload)
      localStorage.setItem('token', data.token)
      this.token = data.token
      await this.fetchMe()
    },
    async register(p) {
      const { data } = await api.post('/auth/register', p)
      localStorage.setItem('token', data.token)
      this.token = data.token
      await this.fetchMe()
    },
    async fetchMe() {
      const { data } = await api.get('/auth/me')
      this.user = data
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      localStorage.removeItem('token')
      this.token = null
      this.user = null
    },
  },
})
