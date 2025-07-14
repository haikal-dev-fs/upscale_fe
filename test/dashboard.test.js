import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Dashboard from '@/views/Dashboard.vue'
import api from '@/services/api'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn((url, config) => {
      if (url === '/auth/me') return Promise.resolve({ data: { name: 'Test User' } })
      if (url === '/quote')
        return Promise.resolve({ data: [{ quote: 'Test Quote', author: 'Author' }] })
      // /tasks or others
      return Promise.resolve({ data: { data: [], current_page: 1, last_page: 1, total: 0 } })
    }),
    patch: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('Dashboard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    api.get.mockClear()
    api.patch.mockClear()
    api.post.mockClear()
    api.delete.mockClear()
  })

  it('renders dashboard and filter', async () => {
    const wrapper = mount(Dashboard, { global: { plugins: [router], stubs: ['router-link'] } })
    await flushPromises()
    expect(wrapper.text()).toContain('My Tasks')
    expect(wrapper.find('select#statusFilter').exists()).toBe(true)
  })

  it('changes filter status and fetches tasks', async () => {
    const wrapper = mount(Dashboard, { global: { plugins: [router], stubs: ['router-link'] } })
    await flushPromises()
    api.get.mockResolvedValueOnce({
      data: {
        data: [{ id: 1, title: 'Task', status: 'done' }],
        current_page: 1,
        last_page: 1,
        total: 1,
      },
    })
    await wrapper.find('select#statusFilter').setValue('done')
    await flushPromises()
    expect(api.get).toHaveBeenCalledWith(
      '/tasks',
      expect.objectContaining({ params: expect.objectContaining({ status: 'done' }) }),
    )
  })
})
