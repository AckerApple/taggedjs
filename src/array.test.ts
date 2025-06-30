import { byId, elmCount } from "./testing/elmSelectors"
import { describe, expect, it } from "./testing/expect"

const fxTime = 160

describe('⠇ array testing', () => {
  it('array basics', () => {
    expect(elmCount('#array-test-push-item')).toBe(1)
    
    const buttons = document.querySelectorAll('#score-data-0-1-outside-button')
    expect(buttons.length).toBe(0, 'Did not expect scoring button 0-1 to be present')
    const insideCount = elmCount('#score-data-0-1-inside-button')
    expect(insideCount).toBe(0)
    
    // add player 0
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

    // score for player 0
    insideElm.click()
    expect(insideDisplay.innerText).toBe(outsideDisplay.innerText)
    expect(insideDisplay).toBe(byId('score-data-0-1-inside-display'), 'test element #score-data-0-1-inside-display was not redrawn')
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
