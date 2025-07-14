import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import Login from '@/views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('Login', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    })
    await router.isReady()
    expect(wrapper.text()).toMatch(/login/i)
  })
})
