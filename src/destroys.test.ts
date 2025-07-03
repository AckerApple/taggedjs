import { it, expect } from './testing'
import { html, click, count } from './testing'
import { sleep } from './testing'

it('destroys', async () => {
  expect(count('#destroyCount')).toBe(1)
  expect(count('#toggle-destroys')).toBe(1)
  expect(count('#destroyable-content')).toBe(1)

  let oldDestroyCount = Number( html('#destroyCount') )

  // cause destroy
  click('#toggle-destroys')
  
  let destroyCount = Number( html('#destroyCount') )

  expect(destroyCount).toBe( oldDestroyCount + 2 )
  
  // await sleep(0) // SHOULD NOT NEED!
  
  expect(count('#destroyable-content')).toBe(0)
  oldDestroyCount = destroyCount
  
  // cause restore
  click('#toggle-destroys')
  destroyCount = Number( html('#destroyCount') )

  expect(destroyCount).toBe( oldDestroyCount )
  expect(count('#destroyable-content')).toBe(1)
})
