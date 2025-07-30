import { describe, it, expect } from './testing'
import { byId, click, count, html } from './testing'

describe('🏹 special attributes', () => {
  it('style and class tests', async () => {
    expect(count('#attr-input-abc')).toBe(1)
    expect(count('#toggle-backgrounds')).toBe(1)
    expect(byId('attr-style-strings').style.backgroundColor).toBe('orange')
    expect(new Array(...byId('attr-class-booleans').classList).includes('background-orange' as any)).toBe(true)
    expect(new Array(...byId('attr-inline-class').classList).includes('background-orange' as any)).toBe(true)

    const dynamicElement = byId('attr-dynamic-inline-class')
    const dynamicClassList = dynamicElement.classList
    expect(new Array(...dynamicClassList).includes('background-orange' as any)).toBe(true)

    click('#toggle-backgrounds')

    expect(byId('attr-style-strings').style.backgroundColor).toBe('')
    expect(new Array(...byId('attr-class-booleans').classList).includes('background-orange' as any)).toBe(false)
    expect(new Array(...byId('attr-inline-class').classList).includes('background-orange' as any)).toBe(false)
    expect(new Array(...byId('attr-dynamic-inline-class').classList).includes('background-orange' as any)).toBe(false)

    // put back
    click('#toggle-backgrounds')

    expect(byId('attr-style-strings').style.backgroundColor).toBe('orange')
    expect(new Array(...byId('attr-class-booleans').classList).includes('background-orange' as any)).toBe(true)
    expect(new Array(...byId('attr-inline-class').classList).includes('background-orange' as any)).toBe(true)
    expect(new Array(...byId('attr-dynamic-inline-class').classList).includes('background-orange' as any)).toBe(true)  
  })

  it('subscribe attributes colors', () => {
    // Test initial background colors
    const bgColorChanger = byId('subscribe-style-dot-bg-color-changer')
    const subscribeBgColor = byId('subscribe-style-bg-color')
    const multipleSubscribeBgColor = byId('multiple-subscribe-bg-color')
    const toggleColorBtn = byId('toggle-color-btn')
    const clearColorBtn = byId('clear-color-btn')

    // Initial state - all should be red/pink
    expect(bgColorChanger.style.backgroundColor).toBe('red')
    expect(subscribeBgColor.style.backgroundColor).toBe('red')
    expect(multipleSubscribeBgColor.style.backgroundColor).toBe('pink')

    // Toggle Color button should show empty initially
    expect(toggleColorBtn.innerText).toBe('Toggle Color ()')

    // Click Toggle Color - should change to red
    toggleColorBtn.click()
    expect(toggleColorBtn.innerText).toBe('Toggle Color (red)')
    
    // Colors should be red/red/green after first toggle
    expect(bgColorChanger.style.backgroundColor).toBe('red')
    expect(subscribeBgColor.style.backgroundColor).toBe('red')
    expect(multipleSubscribeBgColor.style.backgroundColor).toBe('green')

    // Click Toggle Color again - should change to blue
    toggleColorBtn.click()
    expect(toggleColorBtn.innerText).toBe('Toggle Color (blue)')
    
    // Colors should be blue/blue/purple after second toggle
    expect(bgColorChanger.style.backgroundColor).toBe('blue')
    expect(subscribeBgColor.style.backgroundColor).toBe('blue')
    expect(multipleSubscribeBgColor.style.backgroundColor).toBe('purple')

    // Click Clear Color button
    clearColorBtn.click()
    
    // Colors should be empty/empty/pink after clear
    expect(bgColorChanger.style.backgroundColor).toBe('')
    expect(subscribeBgColor.style.backgroundColor).toBe('')
    expect(multipleSubscribeBgColor.style.backgroundColor).toBe('pink')
  })

  it('hide/show attributes affects subscription count', () => {
    const toggleAttributesBtn = byId('toggle-attributes-btn')
    const subscriptionsCount = byId('subscriptions-count')
    
    // Get initial subscription count
    const initialCount = Number(subscriptionsCount.innerText)
    
    // Check button initially says "Hide Attributes"
    expect(toggleAttributesBtn.innerText).toBe('Hide Attributes')
    
    // Click Hide Attributes
    toggleAttributesBtn.click()
    
    // Check button now says "Show Attributes"
    expect(toggleAttributesBtn.innerText).toBe('Show Attributes')
    
    // Check subscriptions decreased by 2
    const afterHideCount = Number(subscriptionsCount.innerText)
    expect(afterHideCount).toBe(initialCount - 2)
    
    // Click Show Attributes
    toggleAttributesBtn.click()
    
    // Check button now says "Hide Attributes" again
    expect(toggleAttributesBtn.innerText).toBe('Hide Attributes')
    
    // Check subscriptions increased by 2 (back to original)
    const afterShowCount = Number(subscriptionsCount.innerText)
    expect(afterShowCount).toBe(initialCount)
  })

  it('style object converts to individual CSS properties', () => {
    const styleObjectTest = byId('style-object-test')
    const toggleBtn = byId('toggle-backgrounds') as HTMLInputElement
    
    // Initial state - checkbox is checked (isOrange = true)
    expect(toggleBtn.checked).toBe(true)
        
    // Check that style object is converted to individual inline style properties
    // The key test is that the object syntax was converted to individual CSS properties
    expect(styleObjectTest.style.backgroundColor).toBe('orange')
    expect(styleObjectTest.style.padding).toBe('10px')
    expect(styleObjectTest.style.border).toBe('2px solid black')
    expect(styleObjectTest.style.borderRadius).toBe('8px')
    expect(styleObjectTest.style.boxShadow).toBe('rgba(0, 0, 0, 0.3) 2px 2px 4px')
    
    // Toggle checkbox off
    toggleBtn.click()
    
    // Check styles changed
    expect(styleObjectTest.style.backgroundColor).toBe('lightgray')
    expect(styleObjectTest.style.padding).toBe('10px')
    expect(styleObjectTest.style.border).toBe('2px solid black')
    expect(styleObjectTest.style.borderRadius).toBe('4px')
    expect(styleObjectTest.style.boxShadow).toBe('none')
    
    // Toggle back on
    toggleBtn.click()
    
    // Check styles reverted
    expect(styleObjectTest.style.backgroundColor).toBe('orange')
    expect(styleObjectTest.style.borderRadius).toBe('8px')
    expect(styleObjectTest.style.boxShadow).toBe('rgba(0, 0, 0, 0.3) 2px 2px 4px')
  })
  
  it('style object with kebab-case properties uses setProperty', () => {
    const stylePropertyTest = byId('style-set-property-test')
    const toggleBtn = byId('toggle-backgrounds') as HTMLInputElement
    
    // Initial state - checkbox is checked (isOrange = true)
    expect(toggleBtn.checked).toBe(true)
    
    // Check that kebab-case properties are set correctly using setProperty
    expect(stylePropertyTest.style.backgroundColor).toBe('red')
    expect(stylePropertyTest.style.color).toBe('white')
    expect(stylePropertyTest.style.padding).toBe('5px')
    expect(stylePropertyTest.style.marginTop).toBe('10px')
    
    // Toggle checkbox off
    toggleBtn.click()
    
    // Check styles changed
    expect(stylePropertyTest.style.backgroundColor).toBe('blue')
    expect(stylePropertyTest.style.color).toBe('white')
    expect(stylePropertyTest.style.padding).toBe('5px')
    expect(stylePropertyTest.style.marginTop).toBe('10px')
    
    // Toggle back on
    toggleBtn.click()
    
    // Check styles reverted
    expect(stylePropertyTest.style.backgroundColor).toBe('red')
  })
})
