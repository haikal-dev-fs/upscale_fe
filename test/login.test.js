import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import { createTestingPinia } from '@pinia/testing'

vi.mock('@/services/api', () => ({
  default: { post: vi.fn(() => Promise.resolve({ data: { token: 'abc' } })) },
}))

describe('Login', () => {
  it('renders', () => {
    const wrapper = mount(Login, { global: { plugins: [createTestingPinia()] } })
    expect(wrapper.find('h3').text()).toBe('Login')
  })
})
