import { html, letState, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
import { funInPropsChild } from "./funInPropsChild.tag";
import { addArrayComponent } from "./addArrayComponent.tag";
export const main = {
    function: () => ++main.count,
    count: 0,
};
export default tag(() => (array = letState([])(x => [array, array = x]), counter = letState(0)(x => [counter, counter = x]), myFunction = () => ++counter, renderCount = letState(0)(x => [renderCount, renderCount = x]), showChild = letState(true)(x => [showChild, showChild = x]), somethingElse = letState('a')(x => [somethingElse, somethingElse = x]), _ = ++renderCount, addArrayItem = (x) => { array = array.map(x => x); array.push(typeof (x) === 'string' ? x : 'push' + array.length); }, deleteItem = (item) => array = array.filter(x => x !== item)) => html `
  <button id="fun-parent-button" onclick=${myFunction}>🤰 ++parent</button>
  <span id="fun_in_prop_display">${counter}</span>
  ${renderCountDiv({ renderCount, name: 'funInProps_tag_parent' })}
  <div>
    <strong>🆎 main:</strong><span id="main_wrap_state">${main.function.toCall ? 'taggjedjs-wrapped' : 'nowrap'}</span>:${main.count}
  </div>
  <button id="toggle-fun-in-child" type="button" onclick=${() => showChild = !showChild}
    >toggle child</button>
  array length: ${array.length}
  <button onclick=${addArrayItem}>reset add</button>
  <hr />
  ${showChild && funInPropsChild({
    myFunction, array, addArrayItem, deleteItem,
    child: { myChildFunction: myFunction }
}, main, myFunction)}
  ${addArrayComponent(addArrayItem)}
`);
//# sourceMappingURL=funInProps.tag.js.map