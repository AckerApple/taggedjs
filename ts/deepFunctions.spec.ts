import { deepClone, deepEqual } from "./deepFunctions"

describe('deepFunctions', () => {
  it('empty object', () => {
    const x =  deepClone({})
    const y = {}

    const equal = deepEqual(x, y)
    expect(equal).toBeTruthy()
  })

  it('object', () => {
    const x =  deepClone({renderCount: 12, name: 'innerHtmlTest'})
    const y = {renderCount: 12, name: 'innerHtmlTest'}

    const equal = deepEqual(x, y)
    expect(equal).toBeTruthy()
  })

  it('undefined', () => {
    const x =  deepClone({name: undefined})
    const y = {name: undefined}

    const equal = deepEqual(x, y)
    expect(equal).toBeTruthy()
  })

  it('string date objects correctly', () => {
    const x =  deepClone({date:new Date(0)})
    const y = {date: new Date(10000)}

    x.date = x.date.toString()
    ;(y as any).date = y.date.toString()

    const equal = deepEqual(x, y)
    expect(equal).toBeFalsy()
  })
  
  it.only('date objects correctly', () => {
    const x =  deepClone({date:new Date(0)})
    const y = {date: new Date(10000)}
    const equal = deepEqual(x, y)  
    expect(equal).toBeFalsy()
  })
})