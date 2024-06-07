import { byId, elmCount } from "./elmSelectors"
import { describe, expect, it } from "./expect"


describe('array testing', () => {
  it('array basics', () => {
    expect(elmCount('#array-test-push-item')).toBe(1)
    const insideCount = elmCount('#score-data-0-1-inside-button')
    expect(insideCount).toBe(0)
    expect(elmCount('#score-data-0-1-outside-button')).toBe(0)
    byId('array-test-push-item').click()
    expect(elmCount('#score-data-0-1-inside-button')).toBe(1)
    expect(elmCount('#score-data-0-1-outside-button')).toBe(1)
    
    const insideElm = byId('score-data-0-1-inside-button')
    const insideDisplay = byId('score-data-0-1-inside-display')
    let indexValue = insideDisplay.innerText
    const outsideElm = byId('score-data-0-1-outside-button')
    const outsideDisplay = byId('score-data-0-1-outside-display')
    const outsideValue = outsideDisplay.innerText
    expect(indexValue).toBe(outsideValue)

    insideElm.click()
    expect(insideDisplay.innerText).toBe(outsideDisplay.innerText)
    expect(indexValue).toBe((Number(insideDisplay.innerText) - 1).toString())
    expect(indexValue).toBe((Number(outsideDisplay.innerText) - 1).toString())

    outsideElm.click()
    expect(insideDisplay.innerText).toBe(outsideDisplay.innerText)
    expect(indexValue).toBe((Number(insideDisplay.innerText) - 2).toString())
    expect(indexValue).toBe((Number(outsideDisplay.innerText) - 2).toString())
  })

  it('🗑️ deletes', async () => {
    expect(elmCount('#player-remove-promise-btn-0')).toBe(0)
    expect(elmCount('#player-edit-btn-0')).toBe(1)

    await (byId('player-edit-btn-0') as any).onclick()

    expect(elmCount('#player-remove-promise-btn-0')).toBe(1)

    await (byId('player-remove-promise-btn-0') as any).onclick()
    await delay(1000) // animation

    expect(elmCount('#player-remove-promise-btn-0')).toBe(0)
    expect(elmCount('#player-edit-btn-0')).toBe(0)
  })
})

function delay(time: number) {
  return new Promise((res) => setTimeout(res, time))
}
