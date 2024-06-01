import { html, letState, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";

const main = {
  function: () => ++main.count,
  count: 0,
}

export default tag(() => (
  array = letState([] as string[])(x => [array, array = x]),
  counter = letState(0)(x => [counter, counter = x]),
  myFunction = () => ++counter,
  renderCount = letState(0)(x => [renderCount, renderCount = x]),
  showChild = letState(true)(x => [showChild, showChild = x]),
  somethingElse = letState('a')(x => [somethingElse, somethingElse = x]),
  _ = ++renderCount,
  addArrayItem = () => {
    array = array.map(x => x);array.push('push'+array.length)
    console.log('array', array, array.length)
  },
) => html`
  <button id="fun-parent-button" onclick=${myFunction}>++parent</button><span id="fun_in_prop_display">${counter}</span>
  ${renderCountDiv({renderCount, name:'funInProps_tag_parent'})}
  <div>
    <strong>main:</strong><span id="main_wrap_state">${(main.function as any).toCall ? 'taggjedjs-wrapped' : 'nowrap'}</span>:${main.count}
  </div>
  <button id="toggle-fun-in-child" type="button" onclick=${() => showChild = !showChild}>toggle child</button>
  array length: ${array.length}
  <button onclick=${addArrayItem}>reset add</button>
  <hr />
  ${showChild && funInPropsChild({myFunction, array, child: {myChildFunction: myFunction}}, main, myFunction)}
`)

const funInPropsChild = tag((
  {myFunction, child, array}: {
    array: unknown[], myFunction: () => any, child: {myChildFunction: () => any}
  },
  mainProp: typeof main,
  myFunction3: () => any
) => (
  other = letState('other')(x => [other, other = x]),
  counter = letState(0)(x => [counter, counter = x]),
  renderCount = letState(0)(x => [renderCount, renderCount = x]),
  _ = ++renderCount,
) => html`
  <div>
    <strong>mainFunction:</strong>${(mainProp.function as any).toCall ? 'taggjedjs-wrapped' : 'nowrap'}:
    <span>${mainProp.count}</span>
  </div>
  <div>
    <strong>childFunction:</strong>${(child.myChildFunction as any).toCall ? 'taggjedjs-wrapped' : 'nowrap'}
  </div>
  <div>
    <strong>myFunction:</strong>${(myFunction as any).toCall ? 'taggjedjs-wrapped' : 'nowrap'}
  </div>

  <button id="fun_in_prop1" onclick=${myFunction}>++object argument</button>
  <button id="fun_in_prop2" onclick=${child.myChildFunction}>++child.myChildFunction</button>
  <button id="fun_in_prop3" onclick=${myFunction3}>++argument</button>
  <button onclick=${main.function}>++main</button>
  <button onclick=${() => ++counter}>++me</button>
  
  child array length: ${array.length}
  
  <span>${counter}</span>
  ${renderCountDiv({renderCount, name:'funInProps_tag_child'})}
`)
