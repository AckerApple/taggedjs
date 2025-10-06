import { InputElementTargetEvent, input, tag, ElementVar, button } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";

export const addArrayComponent = tag((
  addArrayItem: (x: any) => any,
) => (
  renderCount = 0,
  __ = ++renderCount,
  handleKeyUp = (e: InputElementTargetEvent & KeyboardEvent) => {
    console.log('e', e)
    if (e.key === "Enter") {
        const value = e.target.value.trim();
        addArrayItem(value)
        e.target.value = "";
    }
  },
) => {
  const x: ElementVar[] = [ 
    input({
      type: "text",
      onKeyup: handleKeyUp,
      onChange: (e: InputElementTargetEvent) => {addArrayItem(e.target.value);e.target.value=''},
    }),

    button({type: "button", onClick:addArrayItem},
      'add by outside'
    ),
    
    _=> renderCountDiv({renderCount, name:'addArrayComponent'})
  ]

  return x
})
