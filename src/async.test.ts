import { describe, it, expect } from './testing'
import { byId, htmlById, sleep } from './testing'

describe('⏳ async', () => {
  it('promise tag updates after toggle', async () => {
    const togglePromise = byId('toggle-promise-test') as HTMLButtonElement
    expect(togglePromise).toBeDefined()
    togglePromise.click()
    await sleep(350)
    expect(htmlById('tag-promise-test')).toBe('count 1')
  })
})
