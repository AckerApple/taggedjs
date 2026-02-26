import { host, tag } from "taggedjs";
import { injectionWrap } from "./injectionWrap.host.js";
export const injectionTarget = host((value) => {
    // const context = getContextInCycle()
    const wrapHost = tag.inject(injectionWrap);
    // should only run once
    // wrapHost.targets.push(value)
    tag.onInit(() => {
        wrapHost.targets.push(value);
    }).onDestroy(() => {
        const index = wrapHost.targets.findIndex((x) => x === value);
        if (index !== -1) {
            wrapHost.targets.splice(index, 1);
        }
    });
    const element = tag.element;
    element.onclick(() => {
        const index = wrapHost.selected.findIndex((x) => x === value);
        if (index !== -1) {
            wrapHost.selected.splice(index, 1);
        }
        else {
            wrapHost.selected.push(value);
        }
    });
    // return 'true'
});
//# sourceMappingURL=injectionTarget.host.js.map