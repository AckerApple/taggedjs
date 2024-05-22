export * from "./tag/tag"
export * from "./tag/html"
export * from "./errors"
export * from "./isInstance"
export * from "./state/index"
export * from "./subject/index"
export * from "./tag/TagSupport.class"
export * from "./interpolations/ElementTargetEvent.interface"
export * from "./interpolations/interpolateElement"

export { tagElement } from "./tag/tagElement"
export { Tag } from "./tag/Tag.class"
export { runBeforeRender } from "./tag/tagRunner"
export { renderTagSupport } from "./tag/render/renderTagSupport.function"
export { renderWithSupport } from "./tag/render/renderWithSupport.function"
export { isLikeValueSets } from "./tag/isLikeTags.function"

import { renderTagOnly } from "./tag/render/renderTagOnly.function"
import { renderTagSupport } from "./tag/render/renderTagSupport.function"
import { renderWithSupport } from "./tag/render/renderWithSupport.function"
import { tagElement } from "./tag/tagElement"
export const hmr = {
  tagElement, renderWithSupport, renderTagSupport,
  renderTagOnly,
}

export { Wrapper } from './TemplaterResult.class'