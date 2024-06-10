import { byId, click, html, htmlById, query } from "./elmSelectors"
import { describe, expect, it } from "./expect"
import { expectHTML, expectMatchedHtml, testCounterElements, testDuelCounterElements } from "./expect.html"

describe('props', () => {    
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

  it('letProp', () => {
    // local and outside currently match
    expectMatchedHtml('#propsDebug-🥩-0-display', '#propsDebug-🥩-2-display')
    const propCounter = Number(html('#propsDebug-🥩-0-display'))
    
    const result = (query('#propsDebug-🥩-2-button')[0] as any).onclick()
    expect(result).toBe('no-data-ever')

    // outer should not have changed
    expect(html('#propsDebug-🥩-0-display')).toBe( propCounter.toString() )
    expect(html('#propsDebug-🥩-2-display')).toBe( (propCounter + 1).toString() )      
  })

  it('basics', () => {
    // the number of times the watch counted a change happens to match that increase counter
    const funUpdateValue = byId('propsOneLevelFunUpdate-🥩-display').innerHTML
    const changed = html('#propsDebug-🥩-change-display')
    
    // test that watch runs onInit
    expect(changed).toBe( (Number(funUpdateValue) + 1).toString() )

    const ownerHTML = byId('propsDebug-🥩-0-display').innerHTML
    const parentHTML = byId('propsDebug-🥩-1-display').innerHTML
    const childHTML = byId('propsOneLevelFunUpdate-🥩-display').innerHTML

    const ownerNum = Number(ownerHTML)
    const parentNum = Number(parentHTML)
    const childNum = Number(childHTML)

    expect(parentNum).toBe(childNum)
    expect(ownerNum + 2).toBe(parentNum) // testing of setProp() doesn't change owner

    byId('propsDebug-🥩-1-button').click()
  })

  it('props as functions', () => {
    const syncCounter = Number( htmlById('sync-prop-number-display') )
    // const syncCounter = Number( htmlById('sync-prop-child-display') )
    expectMatchedHtml('#sync-prop-number-display', '#sync-prop-child-display')

    byId('sync-prop-child-button').click()

    expectHTML('#sync-prop-number-display', (syncCounter + 2).toString())
    testCounterElements('#nothing-prop-counter-button', '#nothing-prop-counter-display')
    expectHTML('#sync-prop-number-display', (syncCounter + 2).toString())
    expectMatchedHtml('#sync-prop-counter-display', '#nothing-prop-counter-display')
    
  })
})
