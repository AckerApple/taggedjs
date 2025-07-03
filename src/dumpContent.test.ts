import { describe, it, expect } from './testing'
// taggedjs-no-compile

import { byId, triggerChangeElm, click, html, query } from './testing'
describe('taggedjs-dump', () => {
  it('starts with nothing THEN becomes object THEN object with array', () => {
    const elm = byId('taggedjs-dump-user-textarea') as HTMLTextAreaElement

    expect(elm.value).toBe('')
    
    elm.value = '{test:22}'
    triggerChangeElm(elm)
    
    expect(elm.value).toBe('{test:22}')
    const resultElms = query('#taggedjs-dump-user-result .taggedjs-simple-label')
    expect(resultElms.length).toBe(1)
    expect(resultElms[0].innerText).toBe('test')

    elm.value = '{test:22, ace:[22, {testb:33}, 55]}'
    triggerChangeElm(elm)

    const resultElms2 = query('#taggedjs-dump-user-result .taggedjs-simple-label')
    expect(resultElms2.length).toBe(2)
    expect(resultElms2[0].innerText).toBe('test')
    expect(resultElms2[1].innerText).toBe('testb')

    elm.value = ''
    triggerChangeElm(elm)
  })
})
