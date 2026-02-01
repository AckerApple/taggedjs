import { renderCountDiv } from "./renderCount.component.js"
import { providerDialog } from "./providerDialog.tag.js"
import { tag, providers, callbackMaker, Subject, host, div, strong, button, span, hr, h3, textarea } from "taggedjs"
import { fx } from "taggedjs-animate-css"
import { inCycleContextComms, inCycleParent } from "./inCycleContextComms.tag.js"

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
  // state('ensure states in providers are stable')
  return {
    name: 'upperTagDebugProvider',
    test: 0
  }
}

export const providerDebug = tag((_x = 'providerDebugBase') => {
  // providerDebugBase, has provider
  
  providers.create(ProviderFunc) // test that an arrow function can be a provider
  const providerClass: TagDebugProvider = providers.create( TagDebugProvider )
  const provider = providers.create( tagDebugProvider )

  let propCounter = 0
  let renderCount = 0

  const toggleDialog = () => {
    const modal = document.getElementById('provider_debug_dialog') as HTMLDialogElement
    modal.showModal()
    providerClass.showDialog = !providerClass.showDialog
  }

  ++renderCount

  return div(
    div(
      strong('provider.test sugar-daddy-77'),
      ':',
      _=> provider.test
    ),

    div(
      strong('provider.upper?.test'),
      ':',
      _=> provider.upper?.test || '?'
    ),

    div(
      strong('providerClass.tagDebug'),
      ':',
      _=> providerClass.tagDebug || '?'/*2*/
    ),

    div({style: "display:flex;flex-wrap:wrap;gap:1em"},
      div(
        button({id: "increase-provider-🍌-0-button",
          onClick: () => ++provider.test
        },
          '🍌 increase provider.test ',
          _=> provider.test/*4*/
        ),
        span(
          '🍌 ',
          span({id: "increase-provider-🍌-0-display"},
            _=> provider.test
          )
        )
      ),

      div(
        button({id: "increase-provider-upper-🌹-0-button",
          onClick: () => ++provider.upper.test
        },
          '🌹 increase upper.provider.test ',
          _=> provider.upper.test/*7*/
        ),
        span(
          '🌹 ',
          span({id: "increase-provider-upper-🌹-0-display"},
            _=> provider.upper.test
          )
        )
      ),

      div(
        button({id: "increase-provider-🍀-0-button",
          onClick: () => ++providerClass.tagDebug
        },
          '🍀 increase provider class ',
          _=> providerClass.tagDebug/*10*/
        ),
        span(
          '🍀 ',
          span({id: "increase-provider-🍀-0-display"},
            _=> providerClass.tagDebug
          )
        )
      ),

      div(
        button({id: "increase-prop-🐷-0-button",
          onClick: () => {
            ++propCounter
          }
        },
          '⬇️ 🐷 ++propCounter in parent ',
          _=> propCounter/*13*/
        ),
        span(
          '⬇️ 🐷 ',
          span({id: "increase-prop-🐷-0-display"},
            _=> propCounter
          )
        )
      ),

      button({ onClick: toggleDialog },
        '💬 toggle dialog in parent ',
        _=> providerClass.showDialog/*16*/
      )
    ),

    hr,

    div({style: "display:flex;flex-wrap:wrap;gap:1em"},
      _=> {
        return providerChildDebug({
          propCounter,
          propCounterChange: x => {
            propCounter = x
          }
        })
      }
    ),

    hr,

    'renderCount outer:',
    span({name: "render_count_outer"}, _=> renderCount),

    _=> renderCountDiv({renderCount, name:'providerDebugBase'}),

    providerDialog(providerClass),

    inCycleContextComms, /*20*/
  )
})

/* child of main provider testing */
const providerChildDebug = tag(({
  propCounter,
  propCounterChange,
  _ = 'providerDebug.js@child',
}: {
  propCounter: number,
  propCounterChange: (x: number) => unknown,
  _?: string
}) => {
  providerChildDebug.updates(x => {
    [{ propCounter, propCounterChange }] = x
  })
  const funcProvider = providers.inject( ProviderFunc ) // test that an arrow function can be a provider
  const provider = providers.inject( tagDebugProvider )
  const providerClass = providers.inject( TagDebugProvider )
  const upperProvider = providers.inject( upperTagDebugProvider )

  let showProProps: boolean = false
  let renderCount: number = 0

  const callbacks = callbackMaker()
  const callbackTestSub = new Subject()
  console.info('providerDebug.ts: 👉 👉 providers should only ever run once')

  const sub = callbackTestSub.subscribe(x => {
    callbacks((y) => {
      provider.test = x as number
    })()
  })

  tag.onDestroy(() => {
    sub.unsubscribe()
  })

  ++renderCount

  return div(
    div(
      button({id: "increase-provider-🍌-1-button",
        onClick: () => ++provider.test
      },
        '🍌 increase provider.test ',
        _=> provider.test
      ),
      span(
        '🍌 ',
        span({id: "increase-provider-🍌-1-display"},
          _=> provider.test
        )
      )
    ),

    div(
      button({id: "increase-provider-upper-🌹-1-button",
        onClick: () => ++upperProvider.test
      },
        '🌹 increase upper.provider.test ',
        _=> upperProvider.test
      ),
      span(
        '🌹',
        span({id: "increase-provider-upper-🌹-1-display"},
          _=> upperProvider.test
        )
      )
    ),

    div(
      button({id: "increase-arrow-provider-⚡️-1-button",
        onClick: () => ++funcProvider.counter
      },
        '⚡️ increase upper.provider.test ',
        _=> funcProvider.counter
      ),
      span(
        '⚡️',
        span({id: "increase-arrow-provider-⚡️-1-display"},
          _=> funcProvider.counter
        )
      )
    ),

    div(
      button({id: "subject-increase-counter",
        onClick: () => callbackTestSub.next(provider.test + 1)
      },
        '🍌 subject increase:'
      ),
      span(
        '🍌 ',
        span({id: "subject-counter-display"},
          _=> provider.test
        )
      )
    ),

    div(
      button({id: "increase-provider-🍀-1-button",
        onClick: () => ++providerClass.tagDebug
      },
        '🍀 increase provider class ',
        _=> providerClass.tagDebug
      ),
      span(
        '🍀 ',
        span({id: "increase-provider-🍀-1-display"},
          _=> providerClass.tagDebug
        )
      )
    ),

    div(
      button({id: "increase-prop-🐷-1-button",
        onClick: () => {
          propCounterChange(++propCounter)
        }
      },
        '⬆️ 🐷 ++propCounter in child ',
        _=> propCounter
      ),
      span(
        '⬆️ 🐷 ',
        span({id: "increase-prop-🐷-1-display"},
          _=> propCounter
        )
      )
    ),

    button({
      onClick: () => {
        providerClass.showDialog = !providerClass.showDialog

        if(providerClass.showDialog === true) {
          const modal = document.getElementById('provider_debug_dialog') as HTMLDialogElement
          modal.showModal()
        }
      }
    },
      '💬 toggle dialog in child ',
      _=> providerClass.showDialog
    ),

    button({onClick: () => showProProps = !showProProps},
      _=> showProProps ? 'hide' : 'show',
      ' provider as props'
    ),

    _=> showProProps &&
      div({attr:fx()},
        hr,
        h3('Provider as Props'),
        _=> testProviderAsProps(providerClass)
      ),

    div(
      'renderCount inner:',
      _=> renderCount,
      _=> renderCountDiv({renderCount, name:'providerDebugInner'})
    )
  )
})


const testProviderAsProps = tag((
  providerClass: TagDebugProvider
) => {
  return textarea({wrap:"off", rows:"20", style:"width:100%;font-size:0.6em"},
    _=> JSON.stringify(providerClass, null, 2)
  )
})

export const inCycleChild = host((color = 'green') => {
  const parent = tag.inject( inCycleParent )
  const element = tag.element.get()
  element.style.border = '2px solid ' + color
  element.style.flex = '1'
  element.innerHTML = `wonderful - parent(${parent.color})`
})

export const inCycleChild2 = host((color = 'green') => {
  const element = tag.element.get()
  element.style.border = '2px solid ' + color
  element.style.flex = '1'
})

export const inCycleChild3 = host((color = 'green') => {
  const element = tag.element.get()
  element.style.color = color
})

export const colorOptions = ['red', 'blue', 'green', 'purple', 'orange']
