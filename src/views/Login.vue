<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input v-model="form.email" type="email" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input v-model="form.password" type="password" class="form-control" required>
                            </div>
                            <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                                <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                                Login
                            </button>
                            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
                        </form>
                        <div class="mt-3 text-center">
                            <router-link to="/register">Don't have an account? Register</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

async function login() {
    loading.value = true
    error.value = ''
    try {
        const { data } = await api.post('/auth/login', form.value)
        console.log(data);
        userStore.setToken(data.token)
        router.push('/')
    } catch (e) {
        error.value = e?.response?.data?.message || 'Login failed.'
    } finally {
        loading.value = false
    }
}
</script>