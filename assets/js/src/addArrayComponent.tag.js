import { input, tag, button } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
export const addArrayComponent = tag((addArrayItem) => {
    let renderCount = 0;
    ++renderCount;
    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            const value = e.target.value.trim();
            addArrayItem(value);
            e.target.value = "";
        }
    };
    const x = [
        input.type `text`.onKeyup(handleKeyUp).onChange((e) => { addArrayItem(e.target.value); e.target.value = ''; })(),
        button.type `button`.onClick(addArrayItem)('add by outside', _ => 33),
        _ => renderCountDiv({ renderCount, name: 'addArrayComponent' }),
    ];
    return x;
});
//# sourceMappingURL=addArrayComponent.tag.js.map