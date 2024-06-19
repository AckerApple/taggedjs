import { Tag, Dom } from './Tag.class.js';
export function html(strings, ...values) {
    return new Tag(strings, values);
}
html.dom = function (dom, ...values) {
    return new Dom(dom, values);
};
//# sourceMappingURL=html.js.map