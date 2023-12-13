export { html } from "./html.js"
export { tag } from "./tag.js"
export { providers } from "./providers.js"
export { state } from "./state.js"

export function wait(ms) {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, ms)
  })
}
