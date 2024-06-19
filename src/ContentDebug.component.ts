import { html, tag, letState, ValueSubject, state, combineLatest, willPromise } from "taggedjs"
import { ObjectChildren } from "taggedjs/js/interpolations/optimizers/ObjectNode.types"

export const contentDebug = tag(() => {
  const vs0 = state(() => new ValueSubject(0))
  const vs1 = state(() => new ValueSubject(1))

  let renderCount: number = letState(0)(x => [renderCount, renderCount=x])

  ++renderCount

  const dom: ObjectChildren = [{nodeName: 'b', attributes:[], children:[{
    nodeName: 'text',
    textContent: 'big',
  }]}]

  return html`<!-- content-debug-testing -->
    <div id="hello-big-dom-world">hello ${html.dom(dom)} world</div>
    <div id="hello-big-string-world">hello ${html`<b>big</b>`} world</div>

    <div style="display:flex;flex-wrap:wrap;gap:1em;font-size:0.8em">
      <div style="flex-grow:1">
        <fieldset>
          <legend>zero test</legend>
          P.0 You should see "0" here => "${0}"
        </fieldset>
      </div>
      <!--proof you cannot see false values -->
      <div style="flex-grow:1">
        <fieldset>
          <legend>false test</legend>
          P.1 You should see "" here => "${false}"
        </fieldset>
      </div>
      <div style="flex-grow:1">
        <fieldset>
          <legend>null test</legend>
          P.2 You should see "" here => "${null}"
        </fieldset>
      </div>
      <div style="flex-grow:1">
        <fieldset>
          <legend>undefined test</legend>
          P.3 You should see "" here => "${undefined}"
        </fieldset>
      </div>
      <!--proof you can see true booleans -->
      <div style="flex-grow:1">
        <fieldset>
          <legend>true test</legend>
          P.4 You should see "true" here => "${true}"
        </fieldset>
      </div>
      <!--proof you can try to use the tagVar syntax -->
      <fieldset>
        <div style="flex-grow:1">
          P.5 You should see "{22}" here => "${'{'}22${'}'}"</div>
      </fieldset>
      <fieldset>
        <div style="flex-grow:1">
          P.6 You should see "${'{'}__tagVar0${'}'}" here => "{__tagVar0}"
        </div>
      </fieldset>
      <div style="flex-grow:1">
        should be a safe string no html "&lt;div&gt;hello&lt;/div&gt;" here => "${'<div>hello</div>'}"
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset style="flex-grow:1">
          <legend>value subject</legend>
          0 === ${vs0}
        </fieldset>
        
        <fieldset style="flex-grow:1">
          <legend>piped subject</legend>        
          <span id="content-subject-pipe-display0">55</span> ===
          <span id="content-subject-pipe-display1">${vs0.pipe(() => 55)}</span>
        </fieldset>
        
        <fieldset style="flex-grow:1">
          <legend>combineLatest</legend>
          <span id="content-combineLatest-pipe-display0">1</span> ===
          <span id="content-combineLatest-pipe-display1">${combineLatest([vs0, vs1]).pipe(x => x[1])}</span>
        </fieldset>
        
        <fieldset style="flex-grow:1">
          <legend>combineLatest piped html</legend>
          <span id="content-combineLatest-pipeHtml-display0"><b>bold 77</b></span> ===
          <span id="content-combineLatest-pipeHtml-display1">${
            combineLatest([vs0, vs1]).pipe(
              willPromise(x => Promise.resolve(html`<b>bold 77</b>`))
            )
          }</span>
        </fieldset>
      </div>
    </div>
    (render count ${renderCount})
  `
})