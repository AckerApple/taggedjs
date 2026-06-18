import { div, noElement, span } from './index.js'
import { elementVarToHtmlString } from './elementVarToHtmlString.function.js'
import { tag } from '../TagJsTags/tag.function.js'

describe('elementVarToHtmlString', () => {
  it('renders div.class`test`("hello world")', () => {
    const element = div.class`test`('hello world')
    const html = elementVarToHtmlString(element)

    expect(html).toBe('<div class="test">hello world</div>')
  })

  it('renders div.class`test`(_=> "hello world")', () => {
    const element = div.class`test`(() => 'hello world')
    const html = elementVarToHtmlString(element)

    expect(html).toBe('<div class="test">hello world</div>')
  })

  it('renders div.class(_=> `test2`)(_=> "hello world2")', () => {
    const element = div.class(() => 'test2')(() => 'hello world2')
    const html = elementVarToHtmlString(element)

    expect(html).toBe('<div class="test2">hello world2</div>')
  })

  it('renders div.class`test`(span("hello world"))', () => {
    const element = div.class`test`(span('hello world'))
    const html = elementVarToHtmlString(element)

    expect(html).toBe('<div class="test"><span>hello world</span></div>')
  })

  it('renders tag(() => div("hello world"))', () => {
    const someTag = tag((x: string) => div('hello world', _=> x))
    const html = elementVarToHtmlString(someTag(' love'))

    expect(html).toBe('<div>hello world love</div>')
  })

  describe('renders outerHTML', () => {
    it('renders outerHTML', () => {
      const someTag = tag(function someTagFn(x: string) {
        return div('hello world', _=> x)
      })
      const html = someTag(' love').outerHTML

      expect(html).toBe('<div>hello world love</div>')
    })

    it('renders array return outerHTML', () => {
      const someTag = tag(function someTagFun2(x: string) {
        return noElement(
        div('hello world', _=> x, 1),
        div('hello world', _=> x, 2),
      )})
      const html = someTag(' love').outerHTML

      expect(html).toBe('<div>hello world love1</div><div>hello world love2</div>')
    })
  })

  it('no events', () => {
    const element = div
      .class`test`
      .onChange(() => undefined)
      .onClick(() => undefined)(
        span('hello world')
      )
    const html = elementVarToHtmlString(element)

    expect(html).toBe('<div class="test"><span>hello world</span></div>')
  })

  it('self to string', () => {
    const element = div
      .class`test`
      .onChange(() => undefined)
      .onClick(() => undefined)(
        span('hello world')
      )
    const html = element.toString()

    expect(html).toBe('<div class="test"><span>hello world</span></div>')
  })
})
