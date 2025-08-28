import { it, expect } from './testing'
import { byId } from './testing'
it('elements exists', () => {
  expect(byId('h1-app')).toBeDefined()
  const toggleTest = byId('toggle-test')
  expect(toggleTest).toBeDefined()
  expect(toggleTest.innerText).toBe('toggle test')    
})

it('toggle test', () => {
  const toggleTest = byId('toggle-test')
  
  expect(toggleTest.innerText).toBe('toggle test')
  
  toggleTest.click()
  
  // after click now true
  expect(toggleTest.innerText).toBe('toggle test true')
  
  toggleTest.click()
  
  // after click now false
  expect(toggleTest.innerText).toBe('toggle test')
})
