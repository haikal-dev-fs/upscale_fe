import axios from 'axios'
import { useUserStore } from '@/stores/user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ganti sesuai backend
})

api.interceptors.request.use((config) => {
  // Pinia store hanya bisa diakses dalam setup atau action, jadi gunakan localStorage fallback
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
