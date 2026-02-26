import { host, state } from "taggedjs";
/** Local to gh-pages, creates an array of selected with an emitter */
export const injectionWrap = host((selected, selectedChange) => {
    const targets = state([]);
    return { selected, targets };
});
//# sourceMappingURL=injectionWrap.host.js.map