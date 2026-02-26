import { noElement, button, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
export const statePropDebug = tag((propCounter, child) => {
    statePropDebug.updates(x => [propCounter, child] = x);
    let edit = false;
    let renderCount = 0;
    ++renderCount;
    return noElement('propCounter:', _ => propCounter, button.type `button`.onClick(() => edit = !edit)('edit: ', _ => edit), 'child: ', _ => child, _ => renderCountDiv({ renderCount, name: 'statePropDebug-tag' }));
});
export default statePropDebug;
//# sourceMappingURL=statePropDebug.tag.js.map