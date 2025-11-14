import { describe, it, expect } from './testing'
import { byId, html, htmlById, query } from './testing'
import { expectHTML, expectMatchedHtml, testCounterElements, testDuelCounterElements } from './testing'

describe('🧳 props', () => {    
  it('json', () => {
    const propsTextarea = byId('props-debug-textarea') as HTMLTextAreaElement
    expect(propsTextarea.value.replace(/\s/g,'')).toBe(`{"test":33,"x":"y"}`)
  })

  it('test duels', () => {
    testDuelCounterElements(
      ['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'],
      ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
    )
  })

  it('child prop communications', () => {
    testDuelCounterElements(
      ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
      ['#propsOneLevelFunUpdate-🥩-button', '#propsOneLevelFunUpdate-🥩-display'],
    )
  })

  it('basics', () => {
    const ownerHTML = byId('propsDebug-🥩-0-display').innerHTML
    const parentHTML = byId('propsDebug-🥩-1-display').innerHTML
    const childHTML = byId('propsOneLevelFunUpdate-🥩-display').innerHTML

    const ownerNum = Number(ownerHTML)
    const parentNum = Number(parentHTML)
    const childNum = Number(childHTML)

    expect(parentNum).toBe(childNum)
    expect(ownerNum).toBe(parentNum, `Expected ${ownerNum} to be ${parentNum}`) // testing of setProp() doesn't change owner
    // expect(ownerNum + 2).toBe(parentNum, `Parent should be 2 less than ${ownerNum + 2} but it is ${parentNum}`) // testing of setProp() doesn't change owner
  })

  it('letProp', () => {
    // local and outside currently match
    expectMatchedHtml('#propsDebug-🥩-0-display', '#propsDebug-🥩-let-prop-display')
    const propCounter = Number(html('#propsDebug-🥩-0-display'))
    
    // click let button
    const result = (query('#propsDebugLet-🥩-2-button')[0] as any)._click()
    expect(result).toBe('no-data-ever')

    // outer should not have changed
    const displayAfterClick = html('#propsDebug-🥩-0-display')
    expect(displayAfterClick).toBe( propCounter.toString(), `Expected ${displayAfterClick} to still be ${propCounter.toString()} ... propCounter and display mismatched`)
    
    const letPropDisplay = html('#propsDebug-🥩-let-prop-display')
    const newString = (propCounter + 1).toString()
    expect(letPropDisplay).toBe(
      newString, `Expected #propsDebug-🥩-let-prop-display to be ${newString}`
    )

    // end of test put all in sync
    byId('propsDebug-🥩-1-button').click()
  })

  it('change count', () => {
    // the number of times the watch counted a change happens to match that increase counter
    // const funUpdateValue = html('#propsOneLevelFunUpdate-🥩-display')
    const oldValue = Number(html('#propsDebug-🥩-change-count-display'))

    byId('propsDebug-🥩-0-button').click()

    const newValue = Number(html('#propsDebug-🥩-change-count-display'))
    expect(newValue).toBe( oldValue + 1 )
  })

  it('props as functions', () => {
    const syncCounter = Number( htmlById('sync-prop-number-display') )
    // const syncCounter = Number( htmlById('sync-prop-child-display') )
    expectMatchedHtml('#sync-prop-number-display', '#sync-prop-child-display')

    byId('sync-prop-child-button').click()

    expectHTML('#sync-prop-number-display', (syncCounter + 1).toString())
    testCounterElements('#nothing-prop-counter-button', '#nothing-prop-counter-display')
    
    byId('sync-prop-child-button').click()
    
    expectHTML('#sync-prop-number-display', (syncCounter + 2).toString())
    expectMatchedHtml('#sync-prop-counter-display', '#nothing-prop-counter-display')
    
    expectHTML('#sync-prop-number-display', (syncCounter + 2).toString())
  })
})
