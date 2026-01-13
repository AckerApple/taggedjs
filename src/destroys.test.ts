import { it, expect } from './testing'
import { html, click, count } from './testing'
import { sleep } from './testing'

it('destroys', async () => {
  expect(count('#destroyCount')).toBe(1)
  expect(count('#destroyTagCount')).toBe(1)
  expect(count('#toggle-destroys')).toBe(1)
  expect(count('#toggle-tag-destroys')).toBe(1)

  const desCount0 = count('#destroyable-content')
  expect(desCount0).toBe(1, `Expected #destroyable-content to be defined`)
  const desTagCount0 = count('#destroyable-tag-content')
  expect(desTagCount0).toBe(1, `Expected #destroyable-tag-content to be defined`)

  let oldDestroyCount = Number( html('#destroyCount') )

  // cause destroy
  click('#toggle-destroys')
  
  let destroyCount = Number( html('#destroyCount') )
  const updatedCount = oldDestroyCount + 1
  expect(destroyCount).toBe(updatedCount, `Expected #destroyCount.innerHTML to be ${updatedCount} but it is ${destroyCount}`)
  
  // await sleep(0) // SHOULD NOT NEED!
  
  const dContentCount = count('#destroyable-content')
  expect(dContentCount).toBe(0, `Expected #destroyable-content to not exist`)
  oldDestroyCount = destroyCount
  
  // cause restore
  click('#toggle-destroys')
  destroyCount = Number( html('#destroyCount') )

  expect(destroyCount).toBe( oldDestroyCount )
  expect(count('#destroyable-content')).toBe(1)

  let oldDestroyTagCount = Number( html('#destroyTagCount') )

  // cause tag destroy
  click('#toggle-tag-destroys')

  let destroyTagCount = Number( html('#destroyTagCount') )
  const updatedTagCount = oldDestroyTagCount + 1
  expect(destroyTagCount).toBe(updatedTagCount, `Expected #destroyTagCount.innerHTML to be ${updatedTagCount} but it is ${destroyTagCount}`)
  expect(count('#destroyable-tag-content')).toBe(0, `Expected #destroyable-tag-content to not exist`)
  oldDestroyTagCount = destroyTagCount

  // cause tag restore
  click('#toggle-tag-destroys')
  destroyTagCount = Number( html('#destroyTagCount') )

  expect(destroyTagCount).toBe( oldDestroyTagCount )
  expect(count('#destroyable-tag-content')).toBe(1)
})
