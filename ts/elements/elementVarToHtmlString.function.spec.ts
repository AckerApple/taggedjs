import { div, span } from './index.js'
import { elementVarToHtmlString } from './elementVarToHtmlString.function.js'

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

  it('no events', () => {
    const element = div
      .class`test`
      .onChange(() => console.log(44))
      .onClick(() => console.log(44))(
        span('hello world')
      )
    const html = elementVarToHtmlString(element)

    expect(html).toBe('<div class="test"><span>hello world</span></div>')
  })

  it('self to string', () => {
    const element = div
      .class`test`
      .onChange(() => console.log(44))
      .onClick(() => console.log(44))(
        span('hello world')
      )
    const html = element.toString()

    expect(html).toBe('<div class="test"><span>hello world</span></div>')
  })
})
