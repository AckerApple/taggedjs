import { tag, state, states, Subject, ValueSubject, subscribeWith, subscribe, html } from "taggedjs"

export const subscribeAttributes = tag(() => {
  const subColor$ = state(() => new Subject<string>())
  const subColorPurpleOrange$ = state(() => new ValueSubject<'purple' | 'orange'>('purple'))
  const subColorGreenYellow$ = state(() => new ValueSubject<'yellow' | 'green'>('green'))
  
  let shouldHideAttributes = false
  
  states(get => [{shouldHideAttributes}] = get({shouldHideAttributes}))
  
  return html`
    <fieldset style="flex-grow:1">
      <legend>subscribe attributes</legend>
      
      ${shouldHideAttributes ? '' : html`
        <div style="display:flex;flex-wrap:wrap;gap:1em;font-size:0.8em" id="subscribe-attributes-wrap">
          <div style="display:flex;flex-wrap:wrap;gap:1em">
            <fieldset style="flex-grow:1">
              <legend>subscribe special attribute</legend>
              <span id="subscribe-style-dot-bg-color-changer" style.background-color=${subscribeWith(subColor$, 'red')}>background color changer</span>
            </fieldset>

            <fieldset style="flex-grow:1">
              <legend>subscribe style attribute</legend>
              <span id="subscribe-style-bg-color" style=${subscribeWith(subColor$, 'red', subColor => 'background-color:' + subColor)}>subscribe bg color</span>
            </fieldset>

            <fieldset style="flex-grow:1">
              <legend>sometimes subscribe style attribute</legend>
              <span style=${(subColor$.value === 'blue' && subscribe(subColorPurpleOrange$, subColor => {
                return 'background-color:' + subColor
              })) || (subColor$.value === 'red' && subscribe(subColorGreenYellow$, subColor => {
                return 'background-color:' + subColor
              })) || 'background-color:pink;'} id="multiple-subscribe-bg-color">multiple subscribe bg color</span>
            </fieldset>
          </div>
        </div>
      `}
      
      <button id="toggle-color-btn" type="button" onclick=${() => {
        const currentColor = subColor$.value
        subColor$.next(currentColor === 'red' ? 'blue' : 'red')
      }}>
        Toggle Color (${subscribe(subColor$)})
      </button>
      
      <button id="toggle-attributes-btn" type="button"
        onclick=${() => shouldHideAttributes = !shouldHideAttributes}
      >
        ${shouldHideAttributes ? 'Show' : 'Hide'} Attributes
      </button>
      
      <button id="clear-color-btn" type="button" onclick=${() => subColor$.next('')}>
        Clear Color
      </button>

      subscriptions: <span id="subscriptions-count">${subscribeWith(Subject.globalSubCount$, Subject.globalSubCount$.value)}</span>
    </fieldset>
  `
})