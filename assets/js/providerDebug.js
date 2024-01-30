import { tagDebugProvider, upperTagDebugProvider } from "./tagJsDebug.js"
import { state, html, tag, providers } from "./taggedjs/index.js"

export const providerDebug = tag(function ProviderDebug() {
  const provider = providers.inject( tagDebugProvider )
  const upperProvider = providers.inject( upperTagDebugProvider )

  let renderCount = state(0, x => [renderCount, renderCount = x])

  ++renderCount

  return html`<!--providerDebug.js-->
    <button id="increase-provider" onclick=${() => ++provider.test}
    >increase provider.test ${provider.test}</button>
    
    <button onclick=${() => console.info('render count', renderCount)}>render counter: ${renderCount}</button>
    
    <button onclick=${() => ++upperProvider.test}
    >increase upper.provider.test ${upperProvider.test}</button>
  `
})
