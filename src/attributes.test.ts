import { describe, it, expect } from './testing'
import { byId, click, count, html } from './testing'
describe('🏹 special attributes', () => {
  it('style and class tests', async () => {
    expect(count('#attr-input-abc')).toBe(1)
    expect(count('#toggle-backgrounds')).toBe(1)

    expect(byId('attr-style-strings').style.backgroundColor).toBe('orange')
    expect(new Array(...byId('attr-class-booleans').classList).includes('background-orange' as any)).toBe(true)
    expect(new Array(...byId('attr-inline-class').classList).includes('background-orange' as any)).toBe(true)
    expect(new Array(...byId('attr-dynamic-inline-class').classList).includes('background-orange' as any)).toBe(true)
    
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
})
