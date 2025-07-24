import { describe, it, expect, beforeEach } from './testing'
import { byId, elmCount } from './testing'
export const fxTime = 160

describe('⠇ array testing', () => {
  beforeEach(async () => {
    // Debug: Check if arrays section is actually visible
    const arraySection = document.querySelector('#arrays')
    if (!arraySection) {
      console.log('❌ Arrays section not found, checking checkbox state...')
      const checkbox = document.querySelector('#section_arrays') as HTMLInputElement
      console.log('Checkbox found:', !!checkbox, 'Checked:', checkbox?.checked)
      
      // Try to find the fieldset containing arrays
      const fieldsets = document.querySelectorAll('fieldset')
      fieldsets.forEach((fs, i) => {
        if (fs.textContent?.includes('signal array test')) {
          console.log(`✅ Found arrays fieldset at index ${i}`)
        }
      })
    }
    
    // Wait a bit more for arrays component to fully render
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  it('signal array count and items', () => {
    const signalArrayCount = byId('signal-array-count')
    const initialCount = Number(signalArrayCount.innerText)
    
    // Check initial array items match count
    for (let i = 0; i < initialCount; i++) {
      expect(elmCount(`#signal-array-item-${i}`)).toBe(1)
    }
    
    // Check no extra items exist
    expect(elmCount(`#signal-array-item-${initialCount}`)).toBe(0)
  })

  it('push signal array button', () => {
    const signalArrayCount = byId('signal-array-count')
    const initialCount = Number(signalArrayCount.innerText)
    const pushBtn = byId('push-signal-array-btn')
    
    // Click push button
    pushBtn.click()
    
    // Check count increased
    const newCount = Number(signalArrayCount.innerText)
    expect(newCount).toBe(initialCount + 1)
    
    // Check new item exists
    expect(elmCount(`#signal-array-item-${initialCount}`)).toBe(1)
    
    // Click again
    pushBtn.click()
    
    // Check count increased again
    expect(Number(signalArrayCount.innerText)).toBe(initialCount + 2)
    expect(elmCount(`#signal-array-item-${initialCount + 1}`)).toBe(1)
  })

  it('arrays counter display matches item counter displays', () => {
    const counterDisplay = byId('arrays-counter-display')
    const counterValue = Number(counterDisplay.innerText)
    
    // Check that each signal array item counter display matches the main counter
    const signalArrayCount = byId('signal-array-count')
    const arrayLength = Number(signalArrayCount.innerText)
    
    for (let i = 0; i < arrayLength; i++) {
      const itemCounter = byId(`signal-array-item-counter-display-${i}`)
      expect(itemCounter).toBeDefined()
      expect(Number(itemCounter.innerText)).toBe(counterValue)
    }
    
    // Click a counter button to increment
    const counterButton = document.querySelector('#signal-array-increase-counter') as HTMLButtonElement
    counterButton.click()
    
    // Verify all counters updated
    const newCounterValue = Number(counterDisplay.innerText)
    expect(newCounterValue).toBe(counterValue + 1)
    
    for (let i = 0; i < arrayLength; i++) {
      const itemCounter = byId(`signal-array-item-counter-display-${i}`)
      expect(Number(itemCounter.innerText)).toBe(newCounterValue)
    }
  })

  it('signal array item delete button with animation', async () => {
    const signalArrayCount = byId('signal-array-count')
    const initialCount = Number(signalArrayCount.innerText)
    
    // Ensure we have at least one item to delete
    if (initialCount === 0) {
      byId('push-signal-array-btn').click()
    }
    
    const currentCount = Number(signalArrayCount.innerText)
    const indexToDelete = 0
console.log('aa')
    // Verify item exists before deletion
    expect(elmCount(`#signal-array-item-${indexToDelete}`)).toBe(1)
    
    // Click delete button
    const deleteBtn = byId(`signal-array-item-delete-btn-${indexToDelete}`)
    deleteBtn.click()

    // Wait for animation to complete
    await delay(fxTime)

    // Check count decreased
    expect(Number(signalArrayCount.innerText)).toBe(currentCount - 1)

    // Check item no longer exists
    expect(elmCount(`#signal-array-item-${currentCount - 1}`)).toBe(0)

    // If there are remaining items, check they've been re-indexed
    const newCount = Number(signalArrayCount.innerText)
    for (let i = 0; i < newCount; i++) {
      const count = elmCount(`#signal-array-item-${i}`)
      expect(count).toBe(1, `Expected only one #signal-array-item-${i} but got ${count}`)
    }
  })

  it('array basics', () => {
    expect(elmCount('#array-test-push-item')).toBe(1)
    
    const buttons = document.querySelectorAll('#score-data-0-1-outside-button')
    expect(buttons.length).toBe(0) // Did not expect scoring button 0-1 to be present
    const insideCount = elmCount('#score-data-0-1-inside-button')
    expect(insideCount).toBe(0)

    // add player 0
    byId('array-test-push-item').click()
    expect(elmCount('#score-data-0-1-inside-button')).toBe(1,'score data inside button bad')
    expect(elmCount('#score-data-0-1-outside-button')).toBe(1,'score data outside button bad')

    const insideElm = byId('score-data-0-1-inside-button')
    const insideDisplay = byId('score-data-0-1-inside-display')
    let indexValue = insideDisplay.innerText
    const outsideElm = byId('score-data-0-1-outside-button')
    const outsideDisplay = byId('score-data-0-1-outside-display')
    const outsideValue = outsideDisplay.innerText
    expect(indexValue).toBe(outsideValue)

    // score for player 0
    insideElm.click()
    expect(insideDisplay.innerText).toBe(outsideDisplay.innerText)
    expect(insideDisplay).toBe(byId('score-data-0-1-inside-display')) // test element #score-data-0-1-inside-display was not redrawn
    expect(indexValue).toBe((Number(insideDisplay.innerText) - 1).toString())
    expect(indexValue).toBe((Number(outsideDisplay.innerText) - 1).toString())

    // score for player 0
    outsideElm.click()
    expect(insideDisplay.innerText).toBe(outsideDisplay.innerText)
    expect(indexValue).toBe((Number(insideDisplay.innerText) - 2).toString())
    expect(indexValue).toBe((Number(outsideDisplay.innerText) - 2).toString())
  })

  it('🗑️ deletes', async () => {
    expect(elmCount('#player-remove-promise-btn-0')).toBe(0)
    expect(elmCount('#player-edit-btn-0')).toBe(1)

    // start edit move
    const x = (byId('player-edit-btn-0') as any)._click()
    expect(x).toBe('no-data-ever')

    expect(elmCount('#player-remove-promise-btn-0')).toBe(1)

    // remove player 1
    const result = await (byId('player-remove-promise-btn-0') as any)._click()
    expect(result).toBe('promise-no-data-ever')
    
    await delay(fxTime) // animation
    await result

    expect(elmCount('#player-remove-promise-btn-0')).toBe(0)
    expect(elmCount('#player-edit-btn-0')).toBe(0)
  })

  it('add then deletes', async () => {        
    // add player 1
    byId('array-test-push-item').click()
    expect(elmCount('#score-data-0-1-inside-button')).toBe(1)
    expect(elmCount('#score-data-0-1-outside-button')).toBe(1)

    // add player 2
    byId('array-test-push-item').click()
    expect(elmCount('#score-data-0-1-inside-button')).toBe(2)
    expect(elmCount('#score-data-0-1-outside-button')).toBe(2)

    // edit player 1
    byId('player-edit-btn-0').click()

    const result = await (byId('player-remove-promise-btn-0') as any).click()
    expect(result).toBe('promise-no-data-ever')
    await delay(fxTime - 10) // animation

    expect(elmCount('#score-data-0-1-inside-button')).toBe(1)
    expect(elmCount('#score-data-0-1-outside-button')).toBe(1)

    // edit who is now player 1 who was player 2
    byId('player-edit-btn-0').click()

    const result2 = await (byId('player-remove-promise-btn-0') as any).click()
    expect(result2).toBe('promise-no-data-ever')
    
    await delay(fxTime + 25) // animation

    expect(elmCount('#score-data-0-1-inside-button')).toBe(0)
    expect(elmCount('#score-data-0-1-outside-button')).toBe(0)
  })
})

function delay(time: number) {
  return new Promise((res) => setTimeout(res, time))
}
