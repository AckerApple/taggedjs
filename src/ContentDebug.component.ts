import { html, tag, setLet, ValueSubject, set, combineLatest, willPromise } from "taggedjs"

export const contentDebug = tag(() => {
  const vs0 = set(() => new ValueSubject(0))
  const vs1 = set(() => new ValueSubject(1))

  let renderCount: number = setLet(0)(x => [renderCount, renderCount=x])

  ++renderCount

  return html`
    <div style="font-size:0.8em">You should see "0" here => "${0}"</div>
    <!--proof you cannot see false values -->
    <div style="font-size:0.8em">
      <fieldset>
        <legend>false test</legend>
        You should see "" here => "${false}"
      </fieldset>
    </div>
    <div style="font-size:0.8em">
      <fieldset>
        <legend>null test</legend>
        You should see "" here => "${null}"
      </fieldset>
    </div>
    <div style="font-size:0.8em">
      <fieldset>
        <legend>undefined test</legend>
        You should see "" here => "${undefined}"
      </fieldset>
    </div>
    <!--proof you can see true booleans -->
    <div style="font-size:0.8em">
      <fieldset>
        <legend>true test</legend>
        You should see "true" here => "${true}"
      </fieldset>
    </div>
    <!--proof you can try to use the tagVar syntax -->
    <div style="font-size:0.8em">You should see "${'{'}22${'}'}" here => "{22}"</div>
    <div style="font-size:0.8em">You should see "${'{'}__tagVar0${'}'}" here => "{__tagVar0}"</div>
    <div style="font-size:0.8em">should be a safe string no html "&lt;div&gt;hello&lt;/div&gt;" here => "${'<div>hello</div>'}"</div>
    <div style="display:flex;flex-wrap:wrap;gap;1em">
      <fieldset style="flex:1">
        <legend>value subject</legend>
        0 === ${vs0}
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>piped subject</legend>        
        <span id="content-subject-pipe-display0">55</span> ===
        <span id="content-subject-pipe-display1">${vs0.pipe(() => 55)}</span>
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>combineLatest</legend>
        <span id="content-combineLatest-pipe-display0">1</span> ===
        <span id="content-combineLatest-pipe-display1">${combineLatest([vs0, vs1]).pipe(x => x[1])}</span>
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>combineLatest piped html</legend>
        <span id="content-combineLatest-pipeHtml-display0"><b>bold 77</b></span> ===
        <span id="content-combineLatest-pipeHtml-display1">${
          combineLatest([vs0, vs1]).pipe(
            willPromise(x => Promise.resolve(html`<b>bold 77</b>`))
          )
        }</span>
      </fieldset>
    </div>
    (render count ${renderCount})
  `
})