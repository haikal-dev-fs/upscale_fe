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

        <!-- User Info -->
        <div class="container mb-3">
            <div class="alert alert-info d-flex align-items-center" v-if="userStore.user">
                <div>
                    <strong>Logged in as: </strong>
                    <span>{{ userStore.user.name || 'User' }}</span>
                    <span v-if="userStore.user.email">&lt;{{ userStore.user.email }}&gt;</span>
                </div>
            </div>
            <div class="alert alert-secondary" v-else>
                Loading user info...
            </div>
        </div>

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
            <div class="mb-3">
                <label for="statusFilter" class="form-label me-2">Filter Status:</label>
                <select id="statusFilter" v-model="statusFilter" class="form-select w-auto d-inline-block"
                    @change="handleFilterChange">
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <TaskList :tasks="tasks" :loading="loadingTasks" @edit="openEditTask" @delete="deleteTask"
                @done="setTaskDone" />
            <nav v-if="lastPage > 1">
                <ul class="pagination justify-content-center mt-3">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="goToPage(currentPage - 1)"
                            :disabled="currentPage === 1">Previous</button>
                    </li>
                    <li v-for="page in lastPage" :key="page" class="page-item"
                        :class="{ active: currentPage === page }">
                        <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === lastPage }">
                        <button class="page-link" @click="goToPage(currentPage + 1)"
                            :disabled="currentPage === lastPage">Next</button>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Task Modal -->
        <TaskForm :show="showTaskModal" :isEdit="isEdit" :initial="selectedTask" :loading="loadingTaskAction"
            :error="taskError" modalId="taskModal" @submit="handleTaskSubmit" @close="showTaskModal = false" />
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
const statusFilter = ref("")

const currentPage = ref(1)
const lastPage = ref(1)
const total = ref(0)

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

function handleFilterChange() {
    currentPage.value = 1
    fetchTasks()
}

function goToPage(page) {
    if (page < 1 || page > lastPage.value) return
    currentPage.value = page
    fetchTasks()
}

async function fetchTasks() {
    loadingTasks.value = true
    try {
        const params = {}
        if (statusFilter.value) params.status = statusFilter.value
        params.page = currentPage.value
        const { data } = await api.get('/tasks', { params })
        tasks.value = data.data || []
        currentPage.value = data.current_page || 1
        lastPage.value = data.last_page || 1
        total.value = data.total || 0
    } catch {
        tasks.value = []
        lastPage.value = 1
        total.value = 0
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

async function setTaskDone(task) {
    loadingTaskAction.value = true
    try {
        await api.patch(`/tasks/${task.id}`, { status: 'done' })
        fetchTasks()
    } catch (e) {
        taskError.value = e?.response?.data?.message || 'Failed to set done.'
    } finally {
        loadingTaskAction.value = false
    }
}

onMounted(() => {
    fetchQuote()
    fetchTasks()
    if (!userStore.user) userStore.fetchMe()
})
</script>