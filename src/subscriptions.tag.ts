import { subscribeWith, html, tag, ValueSubject, state, combineLatest, willPromise, subscribe, Subject, host, states } from "taggedjs"
import { Subject as RxSubject, startWith } from "rxjs"

export const subscriptions = tag(() => {
  const sub0 = state(() => new Subject<number>())
  const sub1 = state(() => new ValueSubject<number>(3))
  const subArray = state(() => new ValueSubject<string[]>(['a','b','c']))
  const vs0 = state(() => new ValueSubject(0))
  const vs1 = state(() => new ValueSubject(1))

  return html`
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
    
    <fieldset id="noParentTagFieldset">
      <legend>Pass subscription</legend>
      ${passSubscription({sub0, sub1})}
    </fieldset>
  `
})

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

  console.log('sub0', sub0.value)

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
            () => tag.element.get().innerHTML = Date.now().toString(),
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