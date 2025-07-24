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
              <span style.background-color=${subscribeWith(subColor$, 'red')}>background blue</span>
            </fieldset>

            <fieldset style="flex-grow:1">
              <legend>subscribe style attribute</legend>
              <span style=${subscribeWith(subColor$, 'red', subColor => 'background-color:' + subColor)}>subscribe bg color</span>
            </fieldset>

            <fieldset style="flex-grow:1">
              <legend>sometimes subscribe style attribute</legend>
              <span style=${(subColor$.value === 'blue' && subscribe(subColorPurpleOrange$, subColor => {
                return 'background-color:' + subColor
              })) || (subColor$.value === 'red' && subscribe(subColorGreenYellow$, subColor => {
                return 'background-color:' + subColor
              })) || 'background-color:pink;'}>subscribe bg color</span>
            </fieldset>
          </div>
        </div>
      `}
      
      <button type="button" onclick=${() => {
        const currentColor = subColor$.value
        subColor$.next(currentColor === 'red' ? 'blue' : 'red')
      }}>
        Toggle Color (${subscribe(subColor$)})
      </button>
      
      <button type="button"
        onclick=${() => shouldHideAttributes = !shouldHideAttributes}
      >
        ${shouldHideAttributes ? 'Show' : 'Hide'} Attributes
      </button>
      
      <button type="button" onclick=${() => subColor$.next('')}>
        Clear Color
      </button>

      subscriptions: ${subscribeWith(Subject.globalSubCount$, Subject.globalSubCount$.value)}
    </fieldset>
  `
})