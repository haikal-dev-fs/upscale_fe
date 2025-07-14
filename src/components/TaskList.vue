<template>
    <div>
        <table class="table table-striped align-middle">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading">
                    <td colspan="5" class="text-center">
                        <span class="spinner-border spinner-border-sm"></span> Loading...
                    </td>
                </tr>
                <tr v-for="(task, i) in tasks" :key="task.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ task.title }}</td>
                    <td>{{ task.description }}</td>
                    <td>
                        <span :class="['badge', task.status === 'done' ? 'bg-success' : 'bg-secondary']">
                            {{ task.status }}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" @click="$emit('edit', task)">Edit</button>
                        <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', task)">Delete</button>
                    </td>
                </tr>
                <tr v-if="!loading && tasks.length === 0">
                    <td colspan="5" class="text-center">No tasks found.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    tasks: { type: Array, default: () => [] },
    loading: Boolean
})
</script>
