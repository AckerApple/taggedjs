import { html, StringTag, Tag } from "../../tag"
import { htmlInterpolationToDomMeta } from "./htmlInterpolationToDomMeta.function"
import { ObjectChildren } from "./LikeObjectElement.type"
import { DomObjectChildren, DomObjectElement } from "./ObjectNode.types"

describe('#htmlInterpolationToDomMeta', () => {
  describe('attributes', () => {    
    it('style becomes first argument', () => {
      const something = 'background-color:black;'
      const htmlResult = html`<div id="22" style=${something}></div>`
      const templater = htmlResult as Tag
      const result = htmlInterpolationToDomMeta((templater as any).strings, templater.values)
      expect(result).toEqual([{ nn: 'div', at: [[ 'style', ':tagvar0:' ], [ 'id', '22' ] ] }])
    })
    
    it('injection', () => {
      const htmlResult = html`<div id=:tagvar00: name=":tagvar11:" style=${22}>:tagvar55:${33}end:tagva&#x72;66:</div>`
      const templater = htmlResult as Tag
      const result = htmlInterpolationToDomMeta((templater as any).strings, templater.values)

      expect(result).toEqual([{
        nn: 'div',
        at: [
          [ 'style', ':tagvar0:' ],
          [ 'id', ':tagva&#x72;00:' ],
          [ 'name', ':tagva&#x72;11:' ],
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
        [
          'style',
          [ 'background-color:', ':tagvar1:', ';color:', ':tagvar2:', ';' ]
        ],
        [ 'id', ':tagvar0:' ],
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

  it('multiple single attributes', () => {
    const htmlResult = html`
      <input class="hidden" type="file" directory webkitdirectory
        id=${'robustFolderPicker-' + 1}
        name=${'robustFolderPicker-' + 1}
        onchange=${($event) => undefined}
      />
    `

    const templater = htmlResult as Tag
    const result = htmlInterpolationToDomMeta((templater as any).strings, templater.values)
    const firstDom = result[0] as DomObjectElement
    
    expect(firstDom).toEqual({
      nn: 'input',
      at: [
        [ 'class', 'hidden' ],
        [ 'type', 'file' ],
        [ 'directory' ],
        [ 'webkitdirectory' ],
        [ 'id', ':tagvar0:' ],
        [ 'name', ':tagvar1:' ],
        [ 'change', ':tagvar2:' ]
      ]
    })
  })

  it('with standalones and static style', () => {
    const fx = () => {}
    let borderColor = 'black'
    const innerHTML = 5

    const htmlResult = html`
      <div ${fx}
        style="--animate-duration: .1s;border-size:1px;border-color:black;"
        style.z-index=${20}
        onclick=${() => undefined}
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
      [
        'style', '--animate-duration: .1s;border-size:1px;border-color:black;'
      ],
      [ ':tagvar0:' ],
      [ 'style.z-index', ':tagvar1:', 'style' ],
      ['click', ':tagvar2:'],
    ])
    expect(firstDom.ch).toEqual([
      { nn: 'text', tc: '\n        23' },
      { nn: 'text', tc: ':tagvar3:' },
      { nn: 'text', tc: '23-' },
      { nn: 'text', tc: ':tagvar4:' },
      { nn: 'text', tc: '\n      ' }
    ])
  })

  it('with standalones', () => {
    const fx = () => {}
    const duration = 3
    let borderColor = 'black'
    const innerHTML = 5

    const htmlResult = html`
      <div ${fx}
        style="--animate-duration: ${duration};border-size:1px;border-color:${borderColor};"
        onclick=${() => undefined}
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
      [
        'style',
        [
          '--animate-duration: ',
          ':tagvar1:',
          ';border-size:1px;border-color:',
          ':tagvar2:',
          ';'
        ]
      ],
      [ ':tagvar0:' ],
      ['click', ':tagvar3:'],
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