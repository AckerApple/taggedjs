import { div } from './index.js'
import { checkTagElementValueChange } from './processDesignElementUpdate.function.js'

describe('contentId', () => {
  it('increments by 1 plus attribute value length', () => {
    const element = div.class`ab`('x')

    expect(element.contentId).toBe(3)
  })

  it('accumulates across multiple attributes', () => {
    const element = div.attrs({ class: 'a', id: 'xx' })('x')

    expect(element.contentId).toBe(5)
  })

  it('triggers change detection when contentId differs', () => {
    const oldElement = div.class`a`('x')
    const newElement = div.class`ab`('x')
    const context = { value: oldElement } as any

    expect(checkTagElementValueChange(newElement, context)).toBe(1)
  })
})
