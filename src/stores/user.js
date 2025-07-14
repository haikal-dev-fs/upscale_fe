import { defineStore } from 'pinia'
import api from '@/services/api'

export const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  actions: {
    async login(payload) {
      const { data } = await api.post('/auth/login', payload)
      localStorage.setItem('token', data.token)
      await this.fetchMe()
    },
    async register(p) {
      const { data } = await api.post('/auth/register', p)
      localStorage.setItem('token', data.token)
      await this.fetchMe()
    },
    async fetchMe() {
      const { data } = await api.get('/auth/me')
      this.user = data
    },
    logout() {
      localStorage.removeItem('token')
      this.user = null
    },
  },
})
