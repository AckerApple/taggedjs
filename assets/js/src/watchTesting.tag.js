import { watch, letState, html, tag } from "taggedjs";
export const watchTesting = tag.deepPropWatch(() => (stateNum = letState(0)(x => [stateNum, stateNum = x]), stateNumChangeCount = letState(0)(x => [stateNumChangeCount, stateNumChangeCount = x]), _ = watch([stateNum], () => ++stateNumChangeCount), slowChangeCount = letState(0)(x => [slowChangeCount, slowChangeCount = x]), watchPropNumSlow = watch.noInit([stateNum], () => ++slowChangeCount), subjectChangeCount = letState(0)(x => [subjectChangeCount, subjectChangeCount = x]), watchPropNumSubject = watch.asSubject([stateNum], () => {
    return ++subjectChangeCount;
}), truthChange = letState(false)(x => [truthChange, truthChange = x]), truthChangeCount = letState(0)(x => [truthChangeCount, truthChangeCount = x]), watchTruth = watch.truthy([truthChange], () => ++truthChangeCount), truthSubChangeCount = letState(0)(x => [truthSubChangeCount, truthSubChangeCount = x]), watchTruthAsSub = watch.truthy.asSubject([truthChange], () => {
    ++truthSubChangeCount;
    return truthChange;
}).pipe(x => {
    if (x === undefined) {
        return 'undefined';
    }
    return x ? truthSubChangeCount : truthSubChangeCount;
})) => html `<!-- watchTesting.tag.ts -->
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
  </fieldset>`);
//# sourceMappingURL=watchTesting.tag.js.map