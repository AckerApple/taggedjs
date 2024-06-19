// taggedjs-no-compile
import { ValueTypes } from './ValueTypes.enum.js';
export const variablePrefix = ':tagvar';
export const variableSuffix = ':';
export const escapeVariable = '--' + variablePrefix + '--';
export const escapeSearch = new RegExp(escapeVariable, 'g');
export class BaseTag {
    values;
    tagJsType;
    // present only when an array. Populated by Tag.key()
    arrayValue;
    templater;
    constructor(values) {
        this.values = values;
    }
    /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
    key(arrayValue) {
        this.arrayValue = arrayValue;
        return this;
    }
}
export class Tag extends BaseTag {
    strings;
    values;
    tagJsType = ValueTypes.tag;
    children;
    constructor(strings, values) {
        super(values);
        this.strings = strings;
        this.values = values;
    }
    html(strings, ...values) {
        this.children = { strings, values };
        return this;
    }
}
export class Dom extends BaseTag {
    dom;
    values;
    tagJsType = ValueTypes.dom;
    children;
    constructor(dom, values) {
        super(values);
        this.dom = dom;
        this.values = values;
    }
    html = {
        // $this: this,
        dom: (dom, ...values) => {
            this.children = { dom, values };
            return this;
        }
    };
}
//# sourceMappingURL=Tag.class.js.map