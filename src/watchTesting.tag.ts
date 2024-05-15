import { watch, letState, html, tag, InputElementTargetEvent, onInit } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"

export const watchTesting = tag(() => (
  stateNum = letState(0)(x => [stateNum, stateNum=x]),
  stateNumChangeCount = letState(0)(x => [stateNumChangeCount, stateNumChangeCount=x]),
  _ = watch([stateNum], () => ++stateNumChangeCount),
  slowChangeCount = letState(0)(x => [slowChangeCount, slowChangeCount=x]),
  watchPropNumSlow = watch.noInit([stateNum], () => ++slowChangeCount),
  subjectChangeCount = letState(0)(x => [subjectChangeCount, subjectChangeCount=x]),
  watchPropNumSubject = watch.asSubject([stateNum], () => {
    return ++subjectChangeCount
  }),
  truthChange = letState(false)(x => [truthChange, truthChange=x]),
  truthChangeCount = letState(0)(x => [truthChangeCount, truthChangeCount=x]),
  watchTruth = watch.truthy([truthChange], () => ++truthChangeCount),
) => html`
  stateNum:<span id="watch-testing-num-display">${stateNum}</span>
  <button id="watch-testing-num-button" type="button"
    onclick=${() => ++stateNum}
  >++ stateNum</button>
  <div>
    <small>stateNumChangeCount:<span id="stateNumChangeCount">${stateNumChangeCount}</span></small>
  </div>
  <fieldset>
    <legend>🍄 slowChangeCount</legend> 
    <div>
      <small>
        <span id="🍄-slowChangeCount">${slowChangeCount}</span>
      </small>
    </div>
    <div>
      <small>
        watchPropNumSlow:<span id="🍄-watchPropNumSlow">${watchPropNumSlow}</span>
      </small>
    </div>
  </fieldset>

  <fieldset>
    <legend>🍄‍🟫 subjectChangeCount</legend>    
    <div>
      <small>
        <span id="🍄‍🟫-subjectChangeCount">${subjectChangeCount}</span>
      </small>
    </div>
    <div>
      <small>
        (watchPropNumSubject:<span id="🍄‍🟫-watchPropNumSubject">${watchPropNumSubject}</span>)
      </small>
    </div>
  </fieldset>

  <fieldset>
    <legend>🦷 truthChange</legend>
    <div>
      <small>
        <span id="🦷-truthChange">${truthChange ? 'true' : 'false'}</span>
      </small>
    </div>
    <div>
      <small>
        watchTruth:<span id="🦷-watchTruth">${watchTruth ? 'true' : 'false'}</span>
      </small>
    </div>
    <div>
      <small>
        (truthChangeCount:<span id="🦷-truthChangeCount">${truthChangeCount}</span>)
      </small>
    </div>
    <button id="🦷-truthChange-button" type="button"
      onclick=${() => truthChange = !truthChange}
    >toggle ${truthChange}</button>
  </fieldset>
`)
