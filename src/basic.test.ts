import { byId } from "./elmSelectors"
import { expect, it } from "./expect"

it('elements exists', () => {
  expect(byId('h1-app')).toBeDefined()
  const toggleTest = byId('toggle-test')
  expect(toggleTest).toBeDefined()
  expect(toggleTest.innerText).toBe('toggle test')    
})

it('toggle test', () => {
  const toggleTest = byId('toggle-test')
  toggleTest.click()
  expect(toggleTest.innerText).toBe('toggle test true')
  toggleTest.click()
  expect(toggleTest.innerText).toBe('toggle test')
  
  const propsTextarea = byId('props-debug-textarea') as HTMLTextAreaElement
  expect(propsTextarea.value.replace(/\s/g,'')).toBe(`{"test":33,"x":"y"}`)
})
