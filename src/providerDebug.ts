import { fadeInDown, fadeOutUp } from "./animations.js"
import { renderCountDiv } from "./renderCount.component.js"
import { dialog } from "./providerDialog.tag.js"
import { letState, html, tag, providers, state, callbackMaker, Subject, onInit } from "taggedjs"

export class TagDebugProvider {
  tagDebug = 0
  showDialog = false
}

const ProviderFunc = () => ({counter: 0})


export function tagDebugProvider() {
  const upper = providers.create( upperTagDebugProvider )
  return {
    upper,
    test: 0
  }
}

export function upperTagDebugProvider() {
  state('ensure states in providers are stable')
  return {
    name: 'upperTagDebugProvider',
    test: 0
  }
}

export const providerDebugBase = tag((_x = 'providerDebugBase') => {
  // providerDebugBase, has provider
  
  providers.create(ProviderFunc) // test that an arrow function can be a provider
  const providerClass: TagDebugProvider = providers.create( TagDebugProvider )
  const provider = providers.create( tagDebugProvider )

  const test = letState('props debug base')
  let propCounter = letState(0)(x => [propCounter, propCounter = x])
  let renderCount = letState(0)(x => [renderCount, renderCount = x])

  if(providerClass.showDialog) {
    (document.getElementById('provider_debug_dialog') as any).showModal()
  }

  ++renderCount

  return html`<!--providerDebug.js-->
    <div>
      <strong>provider.test sugar-daddy-77</strong>:${provider.test}
    </div>
    <div>
      <strong>provider.upper?.test</strong>:${provider.upper?.test || '?'}
    </div>
    <div>
      <strong>providerClass.tagDebug</strong>:${providerClass.tagDebug || '?'}
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <div>
        <button id="increase-provider-🍌-0-button"
          onclick=${() => ++provider.test}
        >🍌 increase provider.test ${provider.test}</button>
        <span>
          🍌 <span id="increase-provider-🍌-0-display">${provider.test}</span>
        </span>
      </div>
      
      <div>
        <button id="increase-provider-upper-🌹-0-button" onclick=${() => ++provider.upper.test}
        >🌹 increase upper.provider.test ${provider.upper.test}</button>
        <span>
          🌹 <span id="increase-provider-upper-🌹-0-display">${provider.upper.test}</span>
        </span>
      </div>
      
      <div>
        <button id="increase-provider-🍀-0-button" onclick=${() => ++providerClass.tagDebug}
        >🍀 increase provider class ${providerClass.tagDebug}</button>
        <span>
          🍀 <span id="increase-provider-🍀-0-display">${providerClass.tagDebug}</span>
        </span>
      </div>

      <div>
        <button id="increase-prop-🐷-0-button" onclick=${() => ++propCounter}
        >🐷 increase propCounter ${propCounter}</button>
        <span>
          🐷 <span id="increase-prop-🐷-0-display">${propCounter}</span>
        </span>
      </div>

      <button onclick=${() => providerClass.showDialog = true}
      >💬 toggle dialog ${providerClass.showDialog}</button>
    </div>

    <hr />

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${providerDebug({
        propCounter,
        propCounterChange: x => {
          propCounter = x
        }
      })}
    </div>

    <hr />
    renderCount outer:<span name="render_count_outer">${renderCount}</span>
    ${renderCountDiv({renderCount, name:'providerDebugBase'})}

    ${dialog(providerClass)}

    TODOTODOTODOTODO
    ${/*tagSwitchingWithProvider()*/false}
  `
})
/*
const tagSwitchingWithProvider = tag(() => (
  upperProvider = providers.inject( upperTagDebugProvider )
) => html`
  <div>
    <button id="increase-provider-switch-🌹-0-button" onclick=${() => ++upperProvider.test}
    >🌹 increase switch.provider.test ${upperProvider.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-0-display">${upperProvider.test}</span>
    </span>
  </div>
  <hr />
  <div>statue:${upperProvider.test % 2 == 0 ? 'off' : 'on'}</div>
  ${tagSwitchingProChild1()}
  <hr />
  ${upperProvider.test % 2 == 0 ? null : tagSwitchingProChild2()}
`)
*/
const tagSwitchingProChild1 = tag(() => (
  upperProvider = providers.inject( upperTagDebugProvider ),
) => upperProvider.test % 2 == 0 ? null : html`
  <div>
    <button id="increase-provider-switch-🌹-1-button" onclick=${() => ++upperProvider.test}
    >🌹 increase switch.provider.test ${upperProvider.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-1-display">${upperProvider.test}</span>
    </span>
  </div>
`)

const tagSwitchingProChild2 = tag(() => (
  upperProvider = providers.inject( upperTagDebugProvider )
) => html`
  <div>
    <button id="increase-provider-switch-🌹-2-button" onclick=${() => ++upperProvider.test}
    >🌹 increase switch.provider.test ${upperProvider.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-2-display">${upperProvider.test}</span>
    </span>
  </div>
`)

const providerDebug = tag(({
  propCounter,
  propCounterChange,
}: {
  propCounter: number,
  propCounterChange: (x: number) => unknown
}) => {
  const funcProvider = providers.inject(ProviderFunc) // test that an arrow function can be a provider
  const provider = providers.inject( tagDebugProvider )
  const providerClass = providers.inject( TagDebugProvider )
  const upperProvider = providers.inject( upperTagDebugProvider )

  let showProProps: boolean = letState(false)(x => [showProProps, showProProps = x])
  let renderCount: number = letState(0)(x => [renderCount, renderCount = x])
  // let propCounter: number = letState(0)(x => [propCounter, propCounter = x])

  const callbacks = callbackMaker()
  const callbackTestSub = state(() => new Subject())

  onInit(() => {
    console.info('providerDebug.ts: 👉 👉 i should only ever run once')

    callbackTestSub.subscribe(x => {
      callbacks((y) => {
        provider.test = x as number
      })()
    })
  })

  ++renderCount

  return html`<!--providerDebug.js-->
    <div>
      <button id="increase-provider-🍌-1-button" onclick=${() => ++provider.test}
      >🍌 increase provider.test ${provider.test}</button>
      <span>
        🍌 <span id="increase-provider-🍌-1-display">${provider.test}</span>
      </span>
    </div>
    
    <div>
      <button id="increase-provider-upper-🌹-1-button" onclick=${() => ++upperProvider.test}
      >🌹 increase upper.provider.test ${upperProvider.test}</button>
      <span>
        🌹<span id="increase-provider-upper-🌹-1-display">${upperProvider.test}</span>
      </span>
    </div>

    <div>
      <button id="increase-arrow-provider-⚡️-1-button" onclick=${() => ++funcProvider.counter}
      >⚡️ increase upper.provider.test ${funcProvider.counter}</button>
      <span>
      ⚡️<span id="increase-arrow-provider-⚡️-1-display">${funcProvider.counter}</span>
      </span>
    </div>

    <div>
      <button id="subject-increase-counter"
        onclick=${() => callbackTestSub.next(provider.test + 1)}
      >🍌 subject increase:</button>
      <span>
        🍌 <span id="subject-counter-display">${provider.test}</span>
      </span>
    </div>
    
    <div>
      <button id="increase-provider-🍀-1-button" onclick=${() => ++providerClass.tagDebug}
      >🍀 increase provider class ${providerClass.tagDebug}</button>
      <span>
        🍀 <span id="increase-provider-🍀-1-display">${providerClass.tagDebug}</span>
      </span>
    </div>

    <div>
      <button id="increase-prop-🐷-1-button" onclick=${() => propCounterChange(++propCounter)}
      >🐷 increase propCounter ${propCounter}</button>
      <span>
        🐷 <span id="increase-prop-🐷-1-display">${propCounter}</span>
      </span>
    </div>

    <button onclick=${() => providerClass.showDialog = true}
      >💬 toggle dialog ${providerClass.showDialog}</button>

    <button onclick=${() => showProProps = !showProProps}
    >${showProProps ? 'hide' : 'show'} provider as props</button>
    
    ${showProProps && html`
      <div oninit=${fadeInDown} ondestroy=${fadeOutUp}>
        <hr />
        <h3>Provider as Props</h3>
        ${testProviderAsProps(providerClass)}
      </div>
    `}

    <div>
      renderCount inner:${renderCount}
      ${renderCountDiv({renderCount, name:'providerDebugInner'})}
    </div>
  `
})


const testProviderAsProps = tag((
  providerClass: TagDebugProvider
) => {
  return html`<!--providerDebug.js@TestProviderAsProps-->
    <textarea wrap="off" rows="20" style="width:100%;font-size:0.6em">${JSON.stringify(providerClass, null, 2)}</textarea>
  `
})