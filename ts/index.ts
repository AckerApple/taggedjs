export * from './tag/index.js'
export * from './state/index.js'
export * from './render/index.js'
export * from './subject/index.js'
export * from './interpolations/index.js'

export * from './errors.js'
export * from './isInstance.js'
export { states } from './state/states.function.js'
export * from './tag/createHtmlSupport.function.js'
export * from './interpolations/attributes/howToSetInputValue.function.js'
export * from './interpolations/attributes/ElementTargetEvent.interface.js'

export { type Wrapper } from './tag/getTemplaterResult.function.js'

import { renderTagOnly } from './render/renderTagOnly.function.js'
import { renderSupport } from './render/renderSupport.function.js'
import { renderWithSupport } from './render/renderWithSupport.function.js'

import { tagElement } from './tag/tagElement.js'
import { paint } from './render/paint.function.js'

export const hmr = {
  tagElement, renderWithSupport, renderSupport,
  renderTagOnly, paint,
}

