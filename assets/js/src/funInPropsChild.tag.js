import { html, letState, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
import { arrayFunTag } from "./arrayFun.tag";
import { main } from "./funInProps.tag";
export const funInPropsChild = tag((arg0, mainProp, myFunction3) => (other = letState('other')(x => [other, other = x]), counter = letState(0)(x => [counter, counter = x]), renderCount = letState(0)(x => [renderCount, renderCount = x]), _ = ++renderCount, { addArrayItem, myFunction, deleteItem, child, array } = arg0) => html `
  <div>
    <strong>mainFunction:</strong>${mainProp.function.toCall ? 'taggjedjs-wrapped' : 'nowrap'}:
    <span>${mainProp.count}</span>
  </div>
  <div>
    <strong>childFunction:</strong>${child.myChildFunction.toCall ? 'taggjedjs-wrapped' : 'nowrap'}
  </div>
  <div>
    <strong>myFunction:</strong>${myFunction.toCall ? 'taggjedjs-wrapped' : 'nowrap'}
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
  ${renderCountDiv({ renderCount, name: 'funInProps_tag_child' })}
`);
//# sourceMappingURL=funInPropsChild.tag.js.map