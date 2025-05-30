import { html, StringTag, Tag } from "../../tag"
import { htmlInterpolationToDomMeta } from "./htmlInterpolationToDomMeta.function"
import { DomObjectElement } from "./ObjectNode.types"

describe('#htmlInterpolationToDomMeta', () => {
  describe('attributes', () => {    
    it('basic', () => {
      const something = 'background-color:black;'
      const htmlResult = html`<div id="22" style=${something}></div>`
      const templater = htmlResult as Tag
      const result = htmlInterpolationToDomMeta((templater as any).strings, templater.values)
      expect(result).toEqual([{ nn: 'div', at: [[ 'id', '22' ], [ 'style', ':tagvar0:' ] ] }])
    })
    
    it('injection', () => {
      const htmlResult = html`<div id=:tagvar00: name=":tagvar11:" style=${22}>:tagvar55:${33}end:tagva&#x72;66:</div>`
      const templater = htmlResult as Tag
      const result = htmlInterpolationToDomMeta((templater as any).strings, templater.values)

      expect(result).toEqual([{
        nn: 'div',
        at: [
          [ 'id', ':tagva&#x72;00:' ],
          [ 'name', ':tagva&#x72;11:' ],
          [ 'style', ':tagvar0:' ]
        ],
        ch: [
          { nn: 'text', tc: ':tagva&#x72;55:' },
          { nn: 'text', tc: ':tagvar1:' },
          { nn: 'text', tc: 'end:tagva&#x72;66:' }
        ]
      }])
    })

    it('style.border', () => {
      const htmlResult = html`<div id="style-var-border-orange" style.border=${"3px solid orange"}>var orange border</div>` as Tag
      const result = htmlInterpolationToDomMeta((htmlResult as StringTag).strings, htmlResult.values)
      expect(result).toEqual([{
        nn: 'div',
        at: [
          [ 'id', 'style-var-border-orange' ],
          [ 'style.border', ':tagvar0:', 'style' ]
        ],
        ch: [ { nn: 'text', tc: 'var orange border' } ]
      }])
    })

    it('mixed attribute', () => {
      const something = 'background-color:black;'
      const color = 'red'
      const htmlResult = html`<div id=${22} style="background-color:${something};color:${color};"></div>`
      const result = htmlInterpolationToDomMeta((htmlResult as StringTag).strings, htmlResult.values)
      const ats = (result[0] as DomObjectElement).at

      expect(ats).toEqual([
        [ 'id', ':tagvar0:' ],
        [
          'style',
          [ 'background-color:', ':tagvar1:', ';color:', ':tagvar2:', ';' ]
        ]
      ])
    })
  })

  it('basic content', () => {
    const something = 'background-color:black;'
    const htmlResult = html`<div id="22">${something}</div>`
    const templater = htmlResult as Tag
    const result = htmlInterpolationToDomMeta((templater as any).strings, templater.values)
    expect(result).toEqual([{ nn: 'div', at: [[ 'id', '22' ]], ch: [{nn: 'text', tc: ':tagvar0:'}] }])
  })

  it('with standalones', () => {
    const fxIn = 1
    const fxOut = 2
    const duration = 3
    let borderColor = 'black'
    const innerHTML = 5

    const htmlResult = html`
      <div oninit=${fxIn} ondestroy=${fxOut}
        style="--animate-duration: ${duration};border-size:1px;border-color:${borderColor};"
      >
        23${innerHTML}23-${borderColor}
      </div>
      borderColor:
      <select onchange=${event => borderColor = event.target.value}>
        <option ${borderColor === '' ? 'selected' : '7'} value=""></option>
        <option ${borderColor === 'black' ? 'selected' : ''} value="black">black</option>
        <option ${borderColor === 'blue' ? 'selected' : '9'} value="blue">blue</option>
      </select>
    `

    const templater = htmlResult as Tag
    const result = htmlInterpolationToDomMeta((templater as any).strings, templater.values)
    const firstDom = result[0] as DomObjectElement

    expect(firstDom.at).toEqual([
      [ 'init', ':tagvar0:', true ],
      [ 'destroy', ':tagvar1:', true ],
      [
        'style',
        [
          '--animate-duration: ',
          ':tagvar2:',
          ';border-size:1px;border-color:',
          ':tagvar3:',
          ';'
        ]
      ]
    ])
    expect(firstDom.ch).toEqual([
      { nn: 'text', tc: '\n        23' },
      { nn: 'text', tc: ':tagvar4:' },
      { nn: 'text', tc: '23-' },
      { nn: 'text', tc: ':tagvar5:' },
      { nn: 'text', tc: '\n      ' }
    ])
  })
})