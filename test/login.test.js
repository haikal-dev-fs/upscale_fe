import { mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login', () => {
  it('renders', () => {
    const wrapper = mount(Login, {
      global: {},
    })
    expect(wrapper.find('h3').text()).toBe('Login')
  })
})
