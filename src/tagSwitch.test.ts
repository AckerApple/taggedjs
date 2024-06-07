import { byId, elmCount } from "./elmSelectors"
import { describe, expect, it } from "./expect"
import { expectElmCount } from "./expect.html"

describe('tagSwitching', () => {
  it('0', () => {
    expect(elmCount('#select-tag-above')).toBe(1, 'Expected select-tag-above element to be defined')
    expect(elmCount('#tag-switch-dropdown')).toBe(1, 'Expected one #tag-switch-dropdown')
    expect(elmCount('#tagSwitch-1-hello')).toBe(2, 'Expected two #tagSwitch-1-hello elements')
    expect(elmCount('#tagSwitch-2-hello')).toBe(0)
    expect(elmCount('#tagSwitch-3-hello')).toBe(0)
  })

  it('1', () => {
    const dropdown = byId('tag-switch-dropdown') as HTMLSelectElement
    dropdown.value = "1"

    ;(dropdown as any).onchange({target:dropdown})
    expectElmCount('#tagSwitch-1-hello', 5)
    expect(elmCount('#tagSwitch-2-hello')).toBe(0)
    expect(elmCount('#tagSwitch-3-hello')).toBe(0)
    expect(elmCount('#select-tag-above')).toBe(0)
  })

  it('2', () => {
    const dropdown = byId('tag-switch-dropdown') as HTMLSelectElement

    dropdown.value = "2"
    ;(dropdown as any).onchange({target:dropdown})

    expectElmCount('#tagSwitch-1-hello', 2)
    expectElmCount('#tagSwitch-2-hello', 4)
    expect(elmCount('#tagSwitch-3-hello')).toBe(0)
    expect(elmCount('#select-tag-above')).toBe(0)
  })

  it('3', () => {
    const dropdown = byId('tag-switch-dropdown') as HTMLSelectElement
    dropdown.value = "3"
    ;(dropdown as any).onchange({target:dropdown})

    expect(elmCount('#tagSwitch-1-hello')).toBe(0,'Expected no hello 1s')
    expect(elmCount('#tagSwitch-2-hello')).toBe(0)
    expectElmCount('#tagSwitch-3-hello', 7)
    expect(elmCount('#select-tag-above')).toBe(0)
  })

  it('4', () => {  
    const dropdown = byId('tag-switch-dropdown') as HTMLSelectElement
    dropdown.value = ""
    ;(dropdown as any).onchange({target:dropdown})

    expectElmCount('#select-tag-above',1)
    expectElmCount('#tag-switch-dropdown',1)
    expectElmCount('#tagSwitch-1-hello',2)
    expectElmCount('#tagSwitch-2-hello',0)
    expectElmCount('#tagSwitch-3-hello',0)
  })
})
