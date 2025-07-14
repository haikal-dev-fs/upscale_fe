<template>
    <div class="container mt-5 col-md-4">
        <h3 class="mb-3">Login</h3>
        <form @submit.prevent="submit">
            <input v-model="email" class="form-control mb-2" placeholder="Email" />
            <input v-model="password" type="password" class="form-control mb-3" placeholder="Password" />
            <button class="btn btn-primary w-100">Login</button>
            <p class="text-danger mt-2">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

async function submit() {
    try {
        await userStore.login({ email: email.value, password: password.value })
        router.push('/')
    } catch (e) {
        error.value = 'Invalid credentials'
    }
}
</script>