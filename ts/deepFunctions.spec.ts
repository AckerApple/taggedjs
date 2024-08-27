import { deepClone, deepEqual } from './deepFunctions.js'

describe('deepFunctions', () => {
  it('empty object', () => {
    const x =  deepClone({}, 2)
    const y = {}

    const equal = deepEqual(x, y)
    expect(equal).toBeTruthy()
  })

  it('object', () => {
    const x =  deepClone({renderCount: 12, name: 'innerHtmlTest'}, 2)
    const y = {renderCount: 12, name: 'innerHtmlTest'}

    const equal = deepEqual(x, y)
    expect(equal).toBeTruthy()
  })

  it('undefined', () => {
    const x =  deepClone({name: undefined}, 2)
    const y = {name: undefined}

    const equal = deepEqual(x, y)
    expect(equal).toBeTruthy()
  })

  it('string date objects correctly', () => {
    const x =  deepClone({date:new Date(0)}, 2)
    const y = {date: new Date(10000)}

    x.date = x.date.toString() as any as Date
    ;(y as any).date = y.date.toString()

    const equal = deepEqual(x, y)
    expect(equal).toBeFalsy()
  })
  
  it('date objects correctly', () => {
    const x =  deepClone({date:new Date(0)}, 2)
    const y = {date: new Date(10000)}
    const equal = deepEqual(x, y)  
    expect(equal).toBeFalsy()
  })
})