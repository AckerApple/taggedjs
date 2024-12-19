import { watch, html, tag, states } from "taggedjs"

export const watchTesting = tag.deepPropWatch(() => (
  stateNum = 0,
  stateNumChangeCount = 0,
  slowChangeCount = 0,
  subjectChangeCount = 0,
  truthChange = false,
  truthChangeCount = 0,
  truthSubChangeCount = 0,

  _states = states(get => [{
    stateNum, stateNumChangeCount, slowChangeCount, subjectChangeCount,
    truthChange, truthChangeCount,
    truthSubChangeCount,
  }] = get({
    stateNum, stateNumChangeCount, slowChangeCount, subjectChangeCount,
    truthChange, truthChangeCount,
    truthSubChangeCount,
  })),

  _ = watch([stateNum], () => ++stateNumChangeCount),
  watchPropNumSlow = watch.noInit([stateNum], () => ++slowChangeCount),
  
  watchPropNumSubject = watch.asSubject([stateNum], () => {
    return ++subjectChangeCount
  }),

  watchTruth = watch.truthy([truthChange], () => ++truthChangeCount),
  watchTruthAsSub = watch.truthy.asSubject([truthChange], () => {
    ++truthSubChangeCount
    return truthChange
  }).pipe(
    x => {
      if(x === undefined) {
        return 'undefined'
      }      
      
      return truthSubChangeCount
    }
  ),
) => html`<!-- watchTesting.tag.ts -->
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
    <fieldset>
      <legend>simple truth</legend>      
      <div>
        <small>
          watchTruth:<span id="🦷-watchTruth">${watchTruth || 'false'}</span>
        </small>
      </div>
      <div>
        <small>
          (truthChangeCount:<span id="🦷-truthChangeCount">${truthChangeCount}</span>)
        </small>
      </div>
    </fieldset>
    <fieldset>
      <legend>truth subject</legend>      
      <div>
        <small>
        watchTruthAsSub:<span id="🦷-watchTruthAsSub">${watchTruthAsSub}</span>
        </small>
      </div>
      <div>
        <small>
          (truthSubChangeCount:<span id="🦷-truthSubChangeCount">${truthSubChangeCount}</span>)
        </small>
      </div>
    </fieldset>

    <button id="🦷-truthChange-button" type="button"
      onclick=${() => truthChange = !truthChange}
    >🦷 toggle to ${truthChange ? 'true' : 'false'}</button>
  </fieldset>`
)
