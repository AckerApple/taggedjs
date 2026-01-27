import { renderTagElement } from '../render/renderTagElement.function.js'
import { tagElement } from './tagElement.js'
import { TagMaker } from './TagMaker.type.js'

jest.mock('../render/renderTagElement.function.js', () => ({
  renderTagElement: jest.fn(),
}))

describe('tagElement', () => {
  it('clears existing content before mounting', () => {
    const element = { innerHTML: '<div>old</div>' } as unknown as HTMLElement
    const app = (() => (() => null)) as unknown as TagMaker
    const renderTagElementMock = renderTagElement as jest.Mock
    let capturedInnerHTML = 'not-set'

    renderTagElementMock.mockImplementation((...args: unknown[]) => {
      capturedInnerHTML = (args[4] as HTMLElement).innerHTML
      return { support: {}, tags: [], ValueTypes: {} }
    })

    tagElement(app, element)

    expect(renderTagElementMock).toHaveBeenCalledTimes(1)
    expect(capturedInnerHTML).toBe('')
    expect(element.innerHTML).toBe('')
  })
})
