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
})
