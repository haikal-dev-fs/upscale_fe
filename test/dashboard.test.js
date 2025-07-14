import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Dashboard from '@/views/Dashboard.vue'
import api from '@/services/api'

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    patch: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('Dashboard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    api.get.mockReset()
    api.get.mockResolvedValue({ data: { data: [], current_page: 1, last_page: 1, total: 0 } })
  })

  it('renders dashboard and filter', async () => {
    const wrapper = mount(Dashboard, { global: { stubs: ['router-link'] } })
    await flushPromises()
    expect(wrapper.text()).toContain('My Tasks')
    expect(wrapper.find('select#statusFilter').exists()).toBe(true)
  })

  it('changes filter status and fetches tasks', async () => {
    const wrapper = mount(Dashboard, { global: { stubs: ['router-link'] } })
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

  it('shows pagination if lastPage > 1', async () => {
    api.get.mockResolvedValueOnce({ data: { data: [], current_page: 1, last_page: 3, total: 30 } })
    const wrapper = mount(Dashboard, { global: { stubs: ['router-link'] } })
    await flushPromises()
    expect(wrapper.find('.pagination').exists()).toBe(true)
    // Simulate go to page 2
    await wrapper.findAll('.page-link')[1].trigger('click')
    expect(wrapper.vm.currentPage).toBe(2)
  })
})
