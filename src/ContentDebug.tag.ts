import { subscribeWith, LikeObjectChildren, html, tag, ValueSubject, state, combineLatest, willPromise, states, subscribe, Subject, getInnerHTML, subject, host, onDestroy } from "taggedjs"
import { dumpContent } from "./dumpContent.tag"
import { renderCountDiv } from "./renderCount.component"
import { Subject as RxSubject, startWith } from "rxjs"
import { fx } from "taggedjs-animate-css"

export const testStaggerBy = 20

const animateWrap = (
  counts: ValueSubject<{added: number, removed: number}>,
  staggerBy: number = testStaggerBy,
) => {
  const innerHTML = getInnerHTML()
  
  return html`
    <div ${fx({stagger: staggerBy, duration: '.1s'})}
      style.border="1px solid orange"
    >${innerHTML}</div>
  `.acceptInnerHTML(innerHTML)
}

const outerHtml = (
  staggerBy = 10,
) => {
  const innerHTML = getInnerHTML()
  
  return html`
    <div id="outer-html-fx-test" ${fx({stagger: staggerBy, duration: '.1s'})}
      style.border="1px solid orange"
    >${innerHTML}</div>
  `.acceptInnerHTML(innerHTML)
}

export const concatStyles = tag((innerHTML: any) => {
  let width = 1
  let borderColor = 'white'

  states(get => [{borderColor, width}] = get({borderColor, width}))

  return html`
    <div id="dynamic-border-element"
      style="border-width:${width}px;border-color:${borderColor};border-style:solid;"
    >${innerHTML}</div>
    
    <div>
      borderWidth:
      <input id="dynamic-border-width" type="range" min="0" max="10" step="1"
        value=${width} onchange=${event => width = Number(event.target.value)}
      /> - ${width}px
    </div>

    <div>
      borderColor:
      <select id="dynamic-border-color" onchange=${event => borderColor = event.target.value}>
        <option ${borderColor === '' ? 'selected' : ''} value=""></option>
        <option ${borderColor === 'black' ? 'selected' : ''} value="black">black</option>
        <option ${borderColor === 'blue' ? 'selected' : ''} value="blue">blue</option>
        <option ${borderColor === 'white' ? 'selected' : ''} value="white">white</option>
      </select>
    </div>
  `
})

export const content = tag(() => {
  const sub0 = state(() => new Subject<number>())
  const sub1 = state(() => new ValueSubject<number>(3))
  const subArray = state(() => new ValueSubject<string[]>(['a','b','c']))
  const vs0 = state(() => new ValueSubject(0))
  const vs1 = state(() => new ValueSubject(1))

  let renderCount: number = 0
  let orangeToggle = true
  let boldToggle = false
  let counter = 0
  let staggerBy = testStaggerBy
  let showHideFx = false
  const counts = state(() => new Subject({ added: 0, removed: 0})) as ValueSubject<{added: number, removed: number}>

  states(get => [{
    renderCount, orangeToggle, boldToggle, counter, showHideFx, staggerBy,
  }] = get({
    renderCount, orangeToggle, boldToggle, counter, showHideFx, staggerBy,
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

  return html`<!-- content-debug-testing -->
    <fieldset style="flex-grow:1">
      <legend>
        piped subject click <span id="pipe-counter-click-display">${counter}</span>
      </legend>
      ${pipe}
      <button type="button" onclick=${() => ++counter}>increase outside ${counter}</button>
    </fieldset>

    <fieldset style="flex-grow:1">
      <legend>
        hide show
      </legend>
      
      <button id="content-toggle-fx" type="button"
        onclick=${() => showHideFx = !showHideFx}
      >toggle hideshow fx</button>

      ${showHideFx && (html`
        <div name="test-the-tester" ${fx({duration:'10ms'})}>test the tester - 0</div>
      `)}
      ${showHideFx && (html`
        <div name="test-the-tester" ${fx({duration:'10ms', stagger: staggerBy})}>test the tester - 1</div>
      `)}
      ${showHideFx && (html`
        <div name="test-the-tester" ${fx({duration:'10ms', stagger: staggerBy * 2})}>test the tester - 2</div>
      `)}
      ${showHideFx && (outerHtml(staggerBy).innerHTML = innerHtmlTag())}

      <div>
        <div>
          added: <span id="content-fx-added">${subscribe(counts, counts => counts.added)}</span>&nbsp;
          removed: <span id="content-fx-removed">${subscribe(counts, counts => counts.removed)}</span>
        </div>
        <div>
          staggerBy:<input type="range" min="10" max="300" step="1" onchange=${event => staggerBy = Number(event.target.value)} />
        </div>
      </div>

      <hr />
      
      ${concatStyles(html`
        test the tester2
      `)}
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
      ${passSubscription({sub0, sub1})}
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

      <fieldset>
        <legend>tagvar injection</legend>
        <div>
          <div id="inject-tagvar-0">&#58;tagvar0&#58;</div>===<div id="inject-read-tagvar-0">:tagvar0:</div>
          <div id="inject-tagvar-1">&#58;tagvarx0x&#58;</div>===<div id="inject-read-tagvar-1">:tagvarx0x:</div>
          <div id="inject-tagvar-2">&#58;tagvar0&#58;</div>===<div id="inject-read-tagvar-2">:tagva&#x72;0:</div>
        </div>        
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
        >bold toggle ${boldToggle ? 'true' : 'false'}</button>
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
        should be a safe string no html&nbsp;
        <span id="content-dom-parse-0-0">"&lt;div&gt;hello&lt;/div&gt;"</span>&nbsp;
        here =>&nbsp;
        <span id="content-dom-parse-0-1">"${'<div>hello</div>'}"</span>
      </div>
    </div>
    <fieldset>
      <legend>Subscribe()</legend>
      
      <div style="display:flex;flex-wrap:wrap;gap:1em;font-size:0.8em">
        <div style="display:flex;flex-wrap:wrap;gap:1em">
          <fieldset style="flex-grow:1">
            <legend>subscribe</legend>
            0 === <span id="content-subscribe-sub0">${subscribe(sub0)}</span>
          </fieldset>
  
          <fieldset style="flex-grow:1">
            <legend>subscribe map</legend>
            0 === <span id="content-subscribe-sub-map">${subscribe(subArray, array => {
              return array.map(x => html`👉<strong>${x}</strong>👈`.key(x))
            })}</span>
          </fieldset>
  
          <fieldset style="flex-grow:1">
            <legend>subscribe select</legend>
            <select>
              <option value="">select option</option>
              ${subscribe(subArray, array => {
                return array.map(x => html`<option value=${x}>${x}</option>`.key(x))
              })}
            </select>
        
          </fieldset>
  
          <fieldset style="flex-grow:1">
            <legend>subscribe with default</legend>
            0 === <span id="content-subscribe-sub0-with">${subscribeWith(sub0, -1)}</span>
          </fieldset>

          <fieldset style="flex-grow:1">
            <legend>value subject</legend>
            0 === ${subscribe(vs0)}
          </fieldset>
          
          <fieldset style="flex-grow:1">
            <legend>piped subject</legend>        
            <span id="content-subject-pipe-display0">55</span>&nbsp;===&nbsp;
            <span id="content-subject-pipe-display1">
              ${subscribe(vs0, () => 55)}
            </span>
          </fieldset>
          
          ${testHost()}
  
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
    </fieldset>
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
  sub0, sub1,
}: {
  sub0: Subject<number>
  sub1: Subject<number>
}) => {
  let onOff = false
  // const ob = state(() => new Observable()) as any
  const ob = state(() => new RxSubject()) as any

  states(get => [onOff] = get(onOff))

  return html`
    <span>sub-value:<span id="passed-in-output">${subscribe(sub0)}</span></span>
    
    <button id="passed-in-sub-increase"
      onclick=${() => sub0.next((sub0.value || 0) + 1)}
    >sub0 increase</button>
    
    <button id="passed-in-sub-next"
      onclick=${() => ob.next(sub0.value = (sub0.value || 0) + 1)}
    >ob increase</button>
    
    <button id="passed-in-sub-hide-show" onclick=${() => onOff = !onOff}
    >hide/show on/off = ${onOff ? 'show' : 'hide'}</button>
    <span>onOffValue:<span id="passed-in-sub-hideShow-value">${onOff}</span></span>
    
    <div>
      <strong>test 0</strong>
      <div id="passed-in-sub-ex0">0||${onOff && subscribe(sub0)}||0</div>
    </div>
    <div>
      <strong>test 1</strong>
      <div id="passed-in-sub-ex1">1||${onOff && subscribe(sub0, numberFun)}||1</div>
    </div>
    <div id="passed-in-sub-ex2">2||${onOff && subscribe(sub0, numberTag)}||2</div>
    <div id="passed-in-sub-ex3">3||${subscribe(sub1, numberTag)}||3</div>
    <div id="passed-in-sub-ex4">4||${subscribe(ob, numberTag)}||4</div>
    <div id="passed-in-sub-ex4">5||${subscribe(ob.pipe( startWith(33) ), numberTag)}||5</div>
    <div id="passed-in-sub-ex4">6||${subscribe(ob.pipe( startWith(undefined) ), (x: number) => numberTag(x))}||6</div>
    <div id="passed-in-sub-ex4">7||${subscribe(ob, (x: number) => numberTag(x))}||7</div>
  `
})

const numberFun = (x: number) => {
  return html`your fun number ${x}`
}

const numberTag = tag((x: number) => {
  return html`your tag number ${x}`
})

const innerHtmlTag = tag(() => {
  return html`inner html tag`
})

const testHost = tag(() => {
  let hideShow = true
  let destroyCount = 0
  let clickCounter = 0

  states(get => [{
    hideShow, destroyCount, clickCounter,
  }] = get({
    hideShow, destroyCount, clickCounter,
  }))

  return html`
    <fieldset style="flex-grow:1">
      <legend>host</legend>
      ${hideShow && html`
        <span id="hostedContent"
          ${host(
            () => tag.getElement().innerHTML = Date.now().toString(),
            {
              onDestroy: () => ++destroyCount,
            }
          )}
        ></span>
        <button type="button" onclick=${() => ++clickCounter}>
          clickCounter:${clickCounter}
        </button>
      `}
      <button id="hostHideShow"
        onclick=${() => hideShow = !hideShow}
      >hide/show</button>
      <div>destroyCount: <span id="hostDestroyCount">${destroyCount}</span></div>
    </fieldset>
  `
})