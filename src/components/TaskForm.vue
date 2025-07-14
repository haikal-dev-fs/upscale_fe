<template>
    <div class="modal fade" tabindex="-1" :id="modalId" aria-labelledby="taskModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="taskModalLabel">{{ isEdit ? 'Edit Task' : 'Add Task' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submit">
                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <input v-model="form.title" type="text" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea v-model="form.description" class="form-control"></textarea>
                        </div>
                        <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                            {{ isEdit ? 'Update' : 'Add' }} Task
                        </button>
                        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps({
    show: Boolean,
    isEdit: Boolean,
    initial: Object,
    loading: Boolean,
    error: String,
    modalId: { type: String, default: 'taskModal' }
})
const emit = defineEmits(['submit'])

const form = ref({ title: '', description: '' })
let modalInstance = null

onMounted(() => {
    const modalEl = document.getElementById(props.modalId)
    if (modalEl) {
        modalInstance = Modal.getOrCreateInstance(modalEl)
        modalEl.addEventListener('hidden.bs.modal', () => {
            emit('close')
        })
    }
})

watch(() => props.show, (val) => {
    if (!modalInstance) {
        const modalEl = document.getElementById(props.modalId)
        if (modalEl) {
            modalInstance = Modal.getOrCreateInstance(modalEl)
        }
    }
    if (modalInstance) {
        if (val) modalInstance.show()
        else modalInstance.hide()
    }
})

watch(() => props.initial, (val) => {
    if (val) form.value = { ...val }
    else form.value = { title: '', description: '' }
}, { immediate: true })

function submit() {
    emit('submit', { ...form.value })
}
</script>
