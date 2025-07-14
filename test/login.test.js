import { mount } from '@vue/test-utils'
import { testingPinia } from '../vitest.setup'
import Login from '@/views/Login.vue'

describe('Login', () => {
  it('renders', () => {
    const wrapper = mount(Login, {
      global: { plugins: [testingPinia()] },
    })
    expect(wrapper.find('h3').text()).toBe('Login')
  })
})
