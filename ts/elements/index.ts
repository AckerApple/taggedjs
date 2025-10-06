import { designElement } from './designElement.function.js'
export type { ElementVar } from './designElement.function.js'
export { noElement } from './noElement.function.js'

export const button = designElement('button')
export const select = designElement('select')
export const option = designElement('option')
export const input = designElement('input')

// BLOCK ELEMENTS

export const hr = designElement('hr')

export const h1 = designElement('h1')
export const h2 = designElement('h2')
export const h3 = designElement('h3')
export const h4 = designElement('h4')
export const h5 = designElement('h5')
export const h6 = designElement('h6')

export const ol = designElement('ol')
export const li = designElement('li')
export const div = designElement('div')

export const fieldset = designElement('fieldset')
export const legend = designElement('legend')

// INLINE ELEMENTS

export const p = designElement('p')
export const a = designElement('a')
export const span = designElement('span')
export const strong = designElement('strong')
export const small = designElement('small')
export const label = designElement('label')
export const sup = designElement('sup')
