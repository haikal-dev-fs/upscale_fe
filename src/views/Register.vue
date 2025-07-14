<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input v-model="form.name" type="text" class="form-control" required>
                            </div>
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
                                Register
                            </button>
                            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
                            <div v-if="success" class="alert alert-success mt-3">Registration successful! Please login.
                            </div>
                        </form>
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

const form = ref({ name: '', email: '', password: '' })
const loading = ref(false)
const error = ref('')
const success = ref(false)
const router = useRouter()

async function register() {
    loading.value = true
    error.value = ''
    success.value = false
    try {
        await api.post('/auth/register', form.value)
        success.value = true
        setTimeout(() => router.push('/login'), 1500)
    } catch (e) {
        error.value = e?.response?.data?.message || 'Registration failed.'
    } finally {
        loading.value = false
    }
}
</script>