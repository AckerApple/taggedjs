import { parseHTML } from './parseHTML.function'

describe('#parseHTML', () => {
  it('basic', () => {
    const result = parseHTML('<div></div>')
    expect(result).toEqual([{nn: 'div'}])
  })

  it('attribute', () => {
    const result = parseHTML('<div id="22"></div>')
    expect(result).toEqual([{nn: 'div', at: [['id','22']]}])
  })

  it('attribute two', () => {
    const result = parseHTML('<div id="22" ngIf="something"></div>')
    expect(result).toEqual([{nn: 'div', at: [['id','22'], ['ngif', 'something']]}])
  })

  it('attribute with * is removed', () => {
    const result = parseHTML('<div id="22" *ngIf="something"></div>')
    expect(result).toEqual([{nn: 'div', at: [['id','22'], ['ngif', 'something']]}])
  })

  it('stand alone attribute', () => {
    const result = parseHTML('<input checked />')
    expect(result).toEqual([{nn: 'input', at: [['checked']]}])
  })
})
