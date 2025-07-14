<template>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>Hello, {{ user?.name }}</h4>
            <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
        </div>

        <MotivationCard />

        <TaskForm @added="fetchTasks" />
        <TaskList :tasks="tasks" @updated="fetchTasks" @removed="fetchTasks" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/services/api'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
import MotivationCard from '@/components/MotivationCard.vue'
import { useUserStore } from '@/stores/user'
const tasks = ref([])
const user = useUserStore()

async function fetchTasks() {
    const { data } = await api.get('/tasks')
    tasks.value = data.data ?? data
}

function logout() {
    user.logout()
    location.reload()
}

onMounted(async () => {
    await user.fetchMe()
    fetchTasks()
})
</script>