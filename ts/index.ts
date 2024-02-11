/** Must use .js and NOT .ts extensions here */

export * from "./html.js"
export * from "./Subject.js"
export * from "./interpolateElement.js"
export * from "./getTagSupport.js"
export * from "./redrawTag.function.js"
export * from "./tagGateway.function.js"

// TODO: export *
export { isTagComponent } from "./isInstance.js"
export { tags, tag } from "./tag.js"
export { TagComponent } from "./templater.utils.js"
export { tagElement } from "./tagElement.js"
export { Tag } from "./Tag.class.js"
export { runBeforeRender } from "./tagRunner.js"
export { setUse } from "./setUse.function.js"

/* hooks */
  // TODO: export *
  export { providers } from "./providers.js"
  // TODO: export *
  export { state } from "./state.js"
  export * from "./onInit.js"
  export * from "./onDestroy.js"
  export * from "./getCallback.js"
/* end: hooks */