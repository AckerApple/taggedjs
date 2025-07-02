import { html, tag } from "taggedjs";
import { dump } from "./index";
export const arrayDisplay = tag(({ array, showLevels, showAll, showKids, columnNames, formatChange, toggleColumnDialog, allowMaximize, everySimpleValue, }) => {
    return html `
    ${array.map((item, index) => {
        const value = paramValueKeys(item, columnNames);
        return html `${dump({
            value,
            showLevels,
            showAll,
            showKids: true, // showAll || showKids,
            isRootDump: false,
            formatChange,
            onHeaderClick: toggleColumnDialog,
            allowMaximize,
            everySimpleValue,
        })}`.key(index);
    })}
  `;
});
function paramValueKeys(inputObject, keysArray) {
    if (['string', 'number', 'boolean'].includes(typeof (inputObject))) {
        return inputObject;
    }
    if (Array.isArray(inputObject)) {
        return inputObject;
    }
    return filterObjectByKeys(inputObject, keysArray);
}
function filterObjectByKeys(inputObject, keysArray) {
    if (!keysArray) {
        // keysArray = Object.keys(inputObject)
        // return {...inputObject} // must be clone so unchecking items does not change original object
        return inputObject;
    }
    const filteredObject = {};
    keysArray.forEach(key => {
        if (inputObject.hasOwnProperty(key) || key in inputObject) {
            filteredObject[key] = inputObject[key];
        }
    });
    return filteredObject;
}
//# sourceMappingURL=arrayDisplay.tag.js.map