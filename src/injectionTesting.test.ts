import { it, expect, describe, afterEach, beforeEach } from './testing'
import { byId } from './testing'

describe('Injection Test', () => {
  // Helper function to get all items
  const getItems = () => {
    const items = []
    for (let i = 0; i < 10; i++) {
      const item = byId(`injection-test-item-${i}`)
      if (item) items.push(item)
    }
    return items
  }

  // Helper function to get all checkboxes
  const getCheckboxes = () => {
    const items = getItems()
    return items.map(item => item.querySelector('input[type="checkbox"]') as HTMLInputElement)
  }

  // Helper function to get checked items count
  const getCheckedCount = () => {
    const checkboxes = getCheckboxes()
    return checkboxes.filter(cb => cb?.checked).length
  }

  // Helper function to reset all checkboxes to unchecked state
  const resetCheckboxes = () => {
    const items = getItems()
    const checkboxes = getCheckboxes()
    
    // Click on items that are checked to uncheck them
    checkboxes.forEach((checkbox, index) => {
      if (checkbox?.checked) {
        items[index].click()
      }
    })
  }

  // Ensure clean state before and after each test
  beforeEach(() => {
    resetCheckboxes()
  })
  
  afterEach(() => {
    resetCheckboxes()
  })

  it('should have injection testing section with all items unchecked initially', () => {
    const injectionTestingWrap = byId('injection-testing-wrap-host')
    expect(injectionTestingWrap).toBeDefined()
    
    // Check that we have 10 items
    const items = getItems()
    expect(items.length).toBe(10)
    
    // Check all checkboxes are unchecked initially
    const checkboxes = getCheckboxes()
    checkboxes.forEach(checkbox => {
      expect(checkbox?.checked).toBe(false)
    })
  })

  it('should select individual items when clicked', () => {
    const items = getItems()
    const checkboxes = getCheckboxes()
    
    // Initially no items selected
    expect(getCheckedCount()).toBe(0)
    
    // Click first item
    items[0].click()
    expect(checkboxes[0].checked).toBe(true, 'first checkbox should be checked')
    expect(getCheckedCount()).toBe(1)
    
    // Click third item
    items[2].click()
    expect(checkboxes[2].checked).toBe(true, 'third checkbox expected checked')
    expect(getCheckedCount()).toBe(2)
    
    // Click fifth item
    items[4].click()
    expect(checkboxes[4].checked).toBe(true, 'fifth checkbox expected checked')
    expect(getCheckedCount()).toBe(3)
  })

  it('should deselect items when clicked again', () => {
    expect(getCheckedCount()).toBe(0)
    const items = getItems()
    const checkboxes = getCheckboxes()
    
    // Select a few items first
    items[1].click()
    items[3].click()
    items[5].click()
    expect(getCheckedCount()).toBe(3)
    
    // Deselect item 3
    items[3].click()
    expect(checkboxes[3].checked).toBe(false)
    expect(getCheckedCount()).toBe(2)
    
    // Deselect item 1
    items[1].click()
    expect(checkboxes[1].checked).toBe(false)
    expect(getCheckedCount()).toBe(1)
    
    // Deselect item 5
    items[5].click()
    expect(checkboxes[5].checked).toBe(false)
    expect(getCheckedCount()).toBe(0)
  })

  it('should select multiple items when clicking on different items', () => {
    const items = getItems()
    const checkboxes = getCheckboxes()
    
    // Select items 0, 2, 4, 6, 8
    items[0].click()
    items[2].click()
    items[4].click()
    items[6].click()
    items[8].click()
    
    expect(checkboxes[0].checked).toBe(true)
    expect(checkboxes[1].checked).toBe(false)
    expect(checkboxes[2].checked).toBe(true)
    expect(checkboxes[3].checked).toBe(false)
    expect(checkboxes[4].checked).toBe(true)
    expect(checkboxes[5].checked).toBe(false)
    expect(checkboxes[6].checked).toBe(true)
    expect(checkboxes[7].checked).toBe(false)
    expect(checkboxes[8].checked).toBe(true)
    expect(checkboxes[9].checked).toBe(false)
    
    expect(getCheckedCount()).toBe(5)
  })

  it('should toggle selection state correctly', () => {
    const items = getItems()
    const checkboxes = getCheckboxes()
    
    // Click item 0 multiple times
    items[0].click()
    expect(checkboxes[0].checked).toBe(true)
    
    items[0].click()
    expect(checkboxes[0].checked).toBe(false)
    
    items[0].click()
    expect(checkboxes[0].checked).toBe(true)
    
    items[0].click()
    expect(checkboxes[0].checked).toBe(false)
  })

  it('should maintain selection state across multiple operations', () => {
    const items = getItems()
    const checkboxes = getCheckboxes()
    
    // Select some items
    items[1].click()
    items[2].click()
    items[3].click()
    expect(getCheckedCount()).toBe(3)
    
    // Add more selections
    items[7].click()
    items[9].click()
    expect(getCheckedCount()).toBe(5)
    
    // Remove some selections
    items[2].click()
    items[7].click()
    expect(getCheckedCount()).toBe(3)
    
    // Verify correct items are still selected
    expect(checkboxes[1].checked).toBe(true)
    expect(checkboxes[2].checked).toBe(false)
    expect(checkboxes[3].checked).toBe(true)
    expect(checkboxes[7].checked).toBe(false)
    expect(checkboxes[9].checked).toBe(true)
  })

  it('should restore to original unchecked state after test', () => {
    const items = getItems()
    const checkboxes = getCheckboxes()
    
    // Select all items
    items.forEach(item => item.click())
    expect(getCheckedCount()).toBe(10)
    
    // Reset
    resetCheckboxes()
    
    // Verify all are unchecked
    checkboxes.forEach(checkbox => {
      expect(checkbox?.checked).toBe(false)
    })
    expect(getCheckedCount()).toBe(0)
  })

  it('should handle rapid clicking without issues', () => {
    const items = getItems()
    const checkboxes = getCheckboxes()
    
    // Rapidly click the same item
    for (let i = 0; i < 10; i++) {
      items[0].click()
    }
    
    // Should be unchecked (even number of clicks)
    expect(checkboxes[0].checked).toBe(false)
    
    // One more click
    items[0].click()
    
    // Should be checked (odd number of clicks)
    expect(checkboxes[0].checked).toBe(true)
  })

  it('should update visual indicators when items are selected', () => {
    const items = getItems()
    
    // Click to select item 0
    items[0].click()
    
    // Check that the style has changed (green background for selected)
    const item0Style = items[0].getAttribute('style') || ''
    expect(item0Style.includes('background: rgb(76, 175, 80)')).toBe(true)
    expect(item0Style.includes('border: 3px solid rgb(51, 51, 51)')).toBe(true)
    
    // Check unselected item has blue background
    const item1Style = items[1].getAttribute('style') || ''
    expect(item1Style.includes('background: rgb(33, 150, 243)')).toBe(true)
    expect(item1Style.includes('border: 1px solid rgb(153, 153, 153)')).toBe(true)
  })
})