import { describe, it, expect, changeElm } from './testing'
import { testDuelCounterElements } from './testing'

describe('🫴 providers', () => {
  it('basics', () => {
    testDuelCounterElements(
      ['#increase-provider-🍌-0-button', '#increase-provider-🍌-0-display'],
      ['#increase-provider-🍌-1-button', '#increase-provider-🍌-1-display'],
    )

    testDuelCounterElements(
      ['#increase-provider-upper-🌹-0-button', '#increase-provider-upper-🌹-0-display'],
      ['#increase-provider-upper-🌹-1-button', '#increase-provider-upper-🌹-1-display'],
    )

    testDuelCounterElements(
      ['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'],
      ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display'],
    )
  })

  it('inner outer debug', () => {
    testDuelCounterElements(
      ['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'],
      ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display'],
    )

    // change a counter in the parent element
    testDuelCounterElements(
      ['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'],
      ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display'],
    )

    // now ensure that this inner tag still operates correctly even though parent just rendered but i did not from that change
    testDuelCounterElements(
      ['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'],
      ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display'],
    )
  })

  describe('host attributes', () => {
    it('parent has red border', () => {
      const parentElement = document.getElementById('in-cycle-parent')
      expect(parentElement).toBeDefined()
      
      if (parentElement) {
        const styles = window.getComputedStyle(parentElement)
        // Check for red in RGB format (browsers typically return rgb/rgba)
        const hasRed = styles.borderColor.includes('rgb(255, 0, 0)') || 
                      styles.borderColor.includes('red')
        expect(hasRed).toBe(true)
        expect(styles.borderWidth).toBe('2px')
        expect(styles.borderStyle).toBe('solid')
      }
    })

    it('child has green border', () => {
      const childElement = document.getElementById('in-cycle-child')
      expect(childElement).toBeDefined()
      
      if (childElement) {
        const styles = window.getComputedStyle(childElement)
        // Check for green in RGB format
        const hasGreen = styles.borderColor.includes('rgb(0, 128, 0)') || 
                        styles.borderColor.includes('green')
        expect(hasGreen).toBe(true)
        expect(styles.borderWidth).toBe('2px')
        expect(styles.borderStyle).toBe('solid')
      }
    })

    it('child has correct innerHTML', () => {
      const childElement = document.getElementById('in-cycle-child')
      expect(childElement).toBeDefined()
      
      if (childElement) {
        expect(childElement.innerHTML.trim()).toBe('wonderful - parent(red)')
      }
    })

    it('parent contains child element', () => {
      const parentElement = document.getElementById('in-cycle-parent')
      const childElement = document.getElementById('in-cycle-child')
      
      expect(parentElement).toBeDefined()
      expect(childElement).toBeDefined()
      
      if (parentElement && childElement) {
        expect(parentElement.contains(childElement)).toBe(true)
      }
    })

    it('parent color changes when select is changed', async () => {
      const parentColorSelect = document.getElementById('parent-color-select') as HTMLSelectElement
      const parentElement = document.getElementById('in-cycle-parent')
      
      expect(parentColorSelect).toBeDefined()
      expect(parentElement).toBeDefined()
      
      if (parentColorSelect && parentElement) {
        // Change to blue
        parentColorSelect.value = 'blue'
        parentColorSelect.dispatchEvent(new Event('change', { bubbles: true }))
        changeElm(parentColorSelect)
        
        const styles = window.getComputedStyle(parentElement)
        const hasBlue = styles.borderColor.includes('blue') || 
                        styles.borderColor.includes('rgb(0, 0, 255)')
        expect(hasBlue).toBe(true, `in-cycle-parent should be blue not ${styles.borderColor}`)
      }
    })

    it('child color changes when select is changed', async () => {
      const childColorSelect = document.getElementById('child-color-select') as HTMLSelectElement
      const childElement = document.getElementById('in-cycle-child')
      
      expect(childColorSelect).toBeDefined()
      expect(childElement).toBeDefined()
      
      if (childColorSelect && childElement) {
        // Change to purple
        childColorSelect.value = 'purple'
        childColorSelect.dispatchEvent(new Event('change', { bubbles: true }))

        const styles = window.getComputedStyle(childElement)
        const hasPurple = styles.borderColor.includes('purple') || 
                          styles.borderColor.includes('rgb(128, 0, 128)')
        expect(hasPurple).toBe(true)
      }
    })

    it('child2 has correct innerHTML and green border', () => {
      const child2Element = document.getElementById('in-cycle-child-2')
      expect(child2Element).toBeDefined()
      
      if (child2Element) {
        expect((child2Element.textContent as string).trim().replace(/\n(\s+)/g,' ')).toBe('wonderful too part 2')
        
        const styles = window.getComputedStyle(child2Element)
        const hasGreen = styles.borderColor.includes('rgb(0, 128, 0)') || 
                        styles.borderColor.includes('green')
        expect(hasGreen).toBe(true)
        expect(styles.borderWidth).toBe('2px')
        expect(styles.borderStyle).toBe('solid')
      }
    })

    it('child2 color changes when select is changed', async () => {
      const child2ColorSelect = document.getElementById('child-color-select-2') as HTMLSelectElement
      const child2Element = document.getElementById('in-cycle-child-2')
      
      expect(child2ColorSelect).toBeDefined()
      expect(child2Element).toBeDefined()
      
      if (child2ColorSelect && child2Element) {
        // Change to orange
        child2ColorSelect.value = 'orange'
        child2ColorSelect.dispatchEvent(new Event('change', { bubbles: true }))

        const styles = window.getComputedStyle(child2Element)
        const hasOrange = styles.borderColor.includes('orange') || 
                         styles.borderColor.includes('rgb(255, 165, 0)')
        expect(hasOrange).toBe(true, `in-cycle-child-2 should be orange not ${styles.borderColor}`)
      }
    })
  })
})  
