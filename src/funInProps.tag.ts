import { html, states, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
import { funInPropsChild } from "./funInPropsChild.tag";
import { addArrayComponent } from "./addArrayComponent.tag";

export const main = {
  function: () => ++main.count,
  count: 0,
}

export default tag(() => (
  array = [] as string[],
  counter = 0,
  renderCount = 0,
  showChild = true,
  somethingElse = 'a',
  myFunction = () => ++counter,

  _states = states(get => [{
    array, counter, renderCount, showChild, somethingElse
  }] = get({
    array, counter, renderCount, showChild, somethingElse
  })),

  _ = ++renderCount,
  addArrayItem = (x?: string) => {
    array = array.map(x => x)
    array.push(typeof(x) === 'string' ? x : 'push'+array.length)
  },
  deleteItem = (item: string) => array = array.filter(x => x !== item),
) => html`
  <button id="fun-parent-button" onclick=${myFunction}>🤰 ++parent</button>
  <span id="fun_in_prop_display">${counter}</span>
  ${renderCountDiv({renderCount, name:'funInProps_tag_parent'})}
  <div>
    <strong>🆎 main:</strong><span id="main_wrap_state">${(main.function as any).original ? 'taggjedjs-wrapped' : 'nowrap'}</span>:${main.count}
  </div>
  <button id="toggle-fun-in-child" type="button" onclick=${() => showChild = !showChild}
    >toggle child</button>
  array length: ${array.length}
  <button onclick=${addArrayItem}>reset add</button>
  
  <hr />
  
  ${showChild && funInPropsChild({
    myFunction, array, addArrayItem, deleteItem,
    child: {myChildFunction: myFunction}
  }, main, myFunction)}
  
  ${addArrayComponent(addArrayItem)}
`)
