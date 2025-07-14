import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import Login from '@/views/Login.vue'

describe('Login', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders', () => {
    const wrapper = mount(Login, {
      global: {},
    })
    expect(wrapper.find('h3').text()).toBe('Login')
  })
})
