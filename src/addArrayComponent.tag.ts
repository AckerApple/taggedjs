import { InputElementTargetEvent, input, tag, button, TagChildContent } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";

export const addArrayComponent = tag((
  addArrayItem: (x: any) => any,
) => {
  let renderCount = 0
  ++renderCount
  
  const handleKeyUp = (e: InputElementTargetEvent) => {
    if (e.key === "Enter") {
        const value = e.target.value.trim();
        addArrayItem(value)
        e.target.value = "";
    }
  }

  const x: TagChildContent[] = [ 
    input({
      type: "text",
      onKeyup: handleKeyUp,
      onChange: (e: InputElementTargetEvent) => {addArrayItem(e.target.value);e.target.value=''},
    }),

    button({type: "button", onClick:addArrayItem},
      'add by outside', _=> 33,
    ),
    
    _=> renderCountDiv({renderCount, name:'addArrayComponent'}),
  ]

  return x
})
