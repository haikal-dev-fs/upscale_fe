import { vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

/**
 * Global helper to mount Pinia with spy‑able actions.
 * Call in each test file or inside beforeEach.
 */
export function testingPinia() {
  // make every action a vitest spy
  return createTestingPinia({
    createSpy: vi.fn,
    stubActions: false, // if you want real actions to run, keep false
  })
}

