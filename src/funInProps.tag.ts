import { InputElementTargetEvent, html, letState, tag } from "taggedjs";
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
  addArrayItem = (x?: string) => {array = array.map(x => x);array.push(typeof(x) === 'string' ? x : 'push'+array.length)},
  deleteItem = (item: string) => array = array.filter(x => x !== item)
) => html`
  <button id="fun-parent-button" onclick=${myFunction}>🤰 ++parent</button>
  <span id="fun_in_prop_display">${counter}</span>
  ${renderCountDiv({renderCount, name:'funInProps_tag_parent'})}
  <div>
    <strong>🆎 main:</strong><span id="main_wrap_state">${(main.function as any).toCall ? 'taggjedjs-wrapped' : 'nowrap'}</span>:${main.count}
  </div>
  <button id="toggle-fun-in-child" type="button" onclick=${() => showChild = !showChild}>toggle child</button>
  array length: ${array.length}
  <button onclick=${addArrayItem}>reset add</button>
  <hr />
  ${showChild && funInPropsChild({
    myFunction, array, addArrayItem, deleteItem,
    child: {myChildFunction: myFunction}
  }, main, myFunction)}
  ${addArrayComponent(addArrayItem)}
`)

const addArrayComponent = tag((
  addArrayItem: (x: any) => any
) => (
  renderCount = letState(0)(x => [renderCount, renderCount=x]),
  _ = ++renderCount,
  handleKeyDown = (e: InputElementTargetEvent & KeyboardEvent) => {
    if (e.key === "Enter") {
        const value = e.target.value.trim();
        addArrayItem(value)
        e.target.value = "";
    }
  },
) => html`
  <input type="text" onkeydown=${handleKeyDown} onchange=${e => {addArrayItem(e.target.value);e.target.value=''}} />
  <button type="button" onclick=${addArrayItem}>add by outside</button>
  ${renderCountDiv({renderCount, name:'addArrayComponent'})}
`)

const funInPropsChild = tag((
  arg0: {
    array: unknown[],
    addArrayItem: (x: any) => any,
    myFunction: () => any,
    deleteItem: (x: string) => any,
    child: {myChildFunction: () => any}
  },
  mainProp: typeof main,
  myFunction3: () => any
) => (
  other = letState('other')(x => [other, other = x]),
  counter = letState(0)(x => [counter, counter = x]),
  renderCount = letState(0)(x => [renderCount, renderCount = x]),
  _ = ++renderCount,
  {addArrayItem, myFunction, deleteItem, child, array} = arg0,
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

  <button id="fun_in_prop1" onclick=${myFunction}>🤰 ++object argument</button>
  <button id="fun_in_prop2" onclick=${child.myChildFunction}>🤰 ++child.myChildFunction</button>
  <button id="fun_in_prop3" onclick=${myFunction3}>+🤰 +argument</button>
  <button onclick=${main.function}>🆎 ++main</button>
  <button onclick=${() => ++counter}>++me</button>
  
  <div>
    child array length: ${array.length}
    ${array.map(item => arrayFunTag(item, deleteItem).key(item))}
    <button onclick=${addArrayItem}>addArrayItem</button>
  </div>
  
  <div>
    counter:<span>${counter}</span>
  </div>
  ${renderCountDiv({renderCount, name:'funInProps_tag_child'})}
`)

const arrayFunTag = tag((item, deleteItem) => html`
  <div style="border:1px solid black;">
    ${item}<button type="button" onclick=${() => deleteItem(item)}>delete</button>
  </div>
`)