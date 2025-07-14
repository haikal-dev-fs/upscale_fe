<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Todo Dashboard</a>
                <div class="d-flex align-items-center ms-auto">
                    <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
                </div>
            </div>
        </nav>

        <!-- Quote Card -->
        <div class="container mb-4">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card text-center">
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>{{ quote.quote }}</p>
                                <footer class="blockquote-footer">{{ quote.author }}</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Task Section -->
        <div class="container">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h4>My Tasks</h4>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal"
                    @click="openAddTask">Add Task</button>
            </div>
            <TaskList :tasks="tasks" :loading="loadingTasks" @edit="openEditTask" @delete="deleteTask" />
        </div>

        <!-- Task Modal -->
        <TaskForm :show="showTaskModal" :isEdit="isEdit" :initial="selectedTask" :loading="loadingTaskAction"
            :error="taskError" modalId="taskModal" @submit="handleTaskSubmit" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import TaskList from '@/components/TaskList.vue'
import TaskForm from '@/components/TaskForm.vue'

const router = useRouter()
const userStore = useUserStore()

const quote = ref({ content: 'Loading...', author: '' })
const tasks = ref([])
const loadingTasks = ref(false)
const loadingTaskAction = ref(false)
const taskError = ref('')
const showTaskModal = ref(false)
const isEdit = ref(false)
const selectedTask = ref(null)

function logout() {
    userStore.logout()
    router.push('/login')
}

async function fetchQuote() {
    try {
        const { data } = await api.get('/quote')
        quote.value = data[0] || { content: 'No quote available.', author: '' }
    } catch {
        quote.value = { content: 'Failed to load quote.', author: '' }
    }
}

async function fetchTasks() {
    loadingTasks.value = true
    try {
        const { data } = await api.get('/tasks')
        tasks.value = data.data || []
    } catch {
        tasks.value = []
    } finally {
        loadingTasks.value = false
    }
}

function openAddTask() {
    isEdit.value = false
    selectedTask.value = null
    showTaskModal.value = true
}

function openEditTask(task) {
    isEdit.value = true
    selectedTask.value = task
    showTaskModal.value = true
}

async function handleTaskSubmit(task) {
    loadingTaskAction.value = true
    taskError.value = ''
    try {
        if (isEdit.value && selectedTask.value) {
            await api.patch(`/tasks/${selectedTask.value.id}`, task)
        } else {
            await api.post('/tasks', task)
        }
        showTaskModal.value = false
        fetchTasks()
    } catch (e) {
        taskError.value = e?.response?.data?.message || 'Failed to save task.'
    } finally {
        loadingTaskAction.value = false
    }
}

async function deleteTask(task) {
    if (!confirm('Delete this task?')) return
    loadingTaskAction.value = true
    try {
        await api.delete(`/tasks/${task.id}`)
        fetchTasks()
    } catch { }
    loadingTaskAction.value = false
}

onMounted(() => {
    fetchQuote()
    fetchTasks()
})
</script>