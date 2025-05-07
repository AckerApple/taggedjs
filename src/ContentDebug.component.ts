import { LikeObjectChildren, html, tag, ValueSubject, state, combineLatest, willPromise, states, subscribe, Subject } from "taggedjs"
import { dumpContent } from "./dumpContent.tag"
import { renderCountDiv } from "./renderCount.component"

export const content = tag(() => {
  const sub0 = state(() => new Subject<number>())
  const vs0 = state(() => new ValueSubject(0))
  const vs1 = state(() => new ValueSubject(1))

  let renderCount: number = 0
  let orangeToggle = true
  let boldToggle = false
  let counter = 0

  states(get => [{
    renderCount, orangeToggle, boldToggle, counter,
  }] = get({
    renderCount, orangeToggle, boldToggle, counter,
  }))

  ++renderCount

  const dom: LikeObjectChildren = [{
    nn: 'b', ch:[{
      nn: 'text',
      tc: 'big',
    }]
  }]
  const injectionTest = '<script>alert("i should never run but be seen on page")</script>'

  const pipe = subscribe(vs0, () => {
    return html`
      <button type="button" onclick=${() => {
        ++counter
      }}>increase inside ${counter}</button>
      <button type="button" onclick=${() => vs0.next( vs0.value + 1 )}>increase vs0</button>
    `
  })

  ;(pipe as any).label = 'acker'

  return html`<!-- content-debug-testing -->
    <fieldset style="flex-grow:1">
      <legend>
        piped subject click <span id="pipe-counter-click-display">${counter}</span>
      </legend>
      ${pipe}
      <button type="button" onclick=${() => ++counter}>increase outside ${counter}</button>
    </fieldset>

    <fieldset>
      <legend>Dump Content</legend>
      ${dumpContent()}
      ${renderCountDiv({renderCount, name: 'ContentDebug'})}
    </fieldset>

    <fieldset id="noParentTagFieldset">
      <legend>No Parent Test</legend>
      ${numberedNoParents()}
    </fieldset>

    <fieldset id="noParentTagFieldset">
      <legend>Pass subscription</legend>
      ${passSubscription({sub0})}
    </fieldset>

    <hr id="noParentsTest2-start" />
    ${numberedNoParents()}
    <hr id="noParentsTest2-end" />

    <div style="display:flex;flex-wrap:wrap;gap:1em;">
      <fieldset>
        <legend>injection test</legend>        
        <div id="injection-test">injection test ${injectionTest}</div>
        <div id="hello-big-dom-world">hello ${html.dom(dom)} world</div>
        <div id="hello-big-string-world">hello ${html`<b>big</b>`} world</div>
      </fieldset>
      
      <div id="style-simple-border-orange" style.border="3px solid orange">simple orange border</div>
      <div id="style-var-border-orange" style.border=${"3px solid orange"}>var orange border</div>
      
      <div>
        <div id="style-toggle-border-orange"
          style.border=${ orangeToggle ? "3px solid orange" : "3px solid green"}
        >toggle orange border</div>
        <button id="toggle-border-orange"
          onclick=${() => orangeToggle = !orangeToggle}
        >orange toggle ${orangeToggle}</button>
      </div>

      <div>
        <div id="style-toggle-bold"
          ${ boldToggle ? {style:'font-weight:bold;'} : {}}
        >toggle orange border</div>
        <button id="toggle-bold"
          onclick=${() => boldToggle = !boldToggle}
        >bold toggle ${boldToggle}</button>
      </div>
      
      <div id="hello-spacing-dom-world">${54} ${'hello'} worlds</div>
    </div>

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
        should be a safe string no html <span id="content-dom-parse-0-0">"&lt;div&gt;hello&lt;/div&gt;"</span> here => <span id="content-dom-parse-0-1">"${'<div>hello</div>'}"</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset style="flex-grow:1">
          <legend>value subject</legend>
          0 === ${vs0}
        </fieldset>
        
        <fieldset style="flex-grow:1">
          <legend>piped subject</legend>        
          <span id="content-subject-pipe-display0">55</span>&nbsp;===&nbsp;
          <span id="content-subject-pipe-display1">
            ${subscribe(vs0, () => 55)}
          </span>
        </fieldset>
        
        <fieldset style="flex-grow:1">
          <legend>combineLatest</legend>
          <span id="content-combineLatest-pipe-display0">1</span>&nbsp;===&nbsp;
          <span id="content-combineLatest-pipe-display1">${subscribe(combineLatest([vs0, vs1]).pipe(x => x[1]))}</span>
        </fieldset>
        
        <fieldset style="flex-grow:1">
          <legend>combineLatest piped html</legend>
          <span id="content-combineLatest-pipeHtml-display0"><b>bold 77</b></span>&nbsp;===&nbsp;
          <span id="content-combineLatest-pipeHtml-display1">${
            subscribe(
              combineLatest([vs0, vs1]).pipe(
                willPromise(x => Promise.resolve(html`<b>bold 77</b>`))
              )
            )
          }</span>
        </fieldset>
      </div>
    </div>
    ${renderCountDiv({renderCount, name: 'ContentDebug'})}
  `
})

export function numberedNoParents() {
  return html`
    <hr />
    content1
    <hr />
    ${'test0'}
    <hr />
    content2
    <hr />
    ${'test1'}
    <hr />
    content3
    <hr />
    ${'test3'}
    <hr />
    content4
    <hr />
  `  
}

const passSubscription = tag(({
  sub0
}: {
  sub0: Subject<number>
}) => {
  let onOff = false

  states(get => [onOff] = get(onOff))

  return html`
    <span>sub-value:<span id="passed-in-output">${subscribe(sub0)}</span></span>
    <span>test:${onOff && subscribe(sub0)}:end</span>
    <button id="passed-in-sub-increase" onclick=${() => sub0.next((sub0.value || 0) + 1)}>increase</button>
    <button id="passed-in-sub-hide-show" onclick=${() => onOff = !onOff}>on/off - ${onOff}</button>
    <div id="passed-in-sub-ex0">0||${onOff && subscribe(sub0)}||0</div>
    <div id="passed-in-sub-ex1">1||${onOff && subscribe(sub0, numberFun)}||1</div>
    <div id="passed-in-sub-ex2">2||${onOff && subscribe(sub0, numberTag)}||2</div>
  `
})

const numberFun = (x: number) => {
  return html`your fun number ${x}`
}

const numberTag = tag((x: number) => {
  return html`your tag number ${x}`
})