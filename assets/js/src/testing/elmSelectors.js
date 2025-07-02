export function count(selector) {
    return document.querySelectorAll(selector).length;
}
export const elmCount = count;
export function query(query) {
    return document.querySelectorAll(query); // allow .style to just work
}
export function focus(q) {
    return query(q).forEach(elm => elm.focus());
}
/** document.querySelectorAll(...).forEach(i => i.click()) */
export function click(q) {
    clickEach([...query(q)]);
}
export function clickEach(items) {
    items.forEach(elm => elm.click());
}
export function clickById(id) {
    click('#' + id);
}
export function clickOne(q, index = 0) {
    const element = query(q)[index];
    element.click();
}
export function keydownOn(input, key) {
    const keyEvent = new KeyboardEvent('keydown', {
        key,
        bubbles: true, // Ensure the event bubbles
    });
    input.dispatchEvent(keyEvent);
}
export function keyupOn(input, key) {
    const keyEvent = new KeyboardEvent('keyup', {
        key,
        bubbles: true, // Ensure the event bubbles
    });
    input.dispatchEvent(keyEvent);
}
export function changeOne(q, index = 0) {
    const target = query(q)[index];
    changeElm(target);
}
export function changeElm(target) {
    ;
    target.change({ target });
}
export function html(q) {
    let html = '';
    query(q).forEach(elm => html = html + elm.innerHTML);
    return html;
}
export function textContent(q) {
    let html = '';
    query(q).forEach(elm => html = html + elm.textContent);
    return html;
}
export function byId(id) {
    return document.getElementById(id);
}
/** Returns empty string also when element not found */
export function htmlById(id) {
    const element = document.getElementById(id);
    return element?.innerHTML || '';
}
export function lastById(id) {
    const elms = document.querySelectorAll('#' + id);
    return elms[elms.length - 1];
}
export function blur(q) {
    return query(q).forEach(elm => triggerBlurElm(elm));
}
export function change(q) {
    // return query(q).forEach(elm => triggerChangeElm((elm as HTMLElement)))
    return query(q).forEach(elm => changeElm(elm));
}
const blurEvent = new Event('focusout', {
    bubbles: true, // Blur events typically do not bubble, but this can be set to true if needed
    cancelable: false // Blur events are not cancelable
});
export function triggerBlurElm(elm) {
    elm.dispatchEvent(blurEvent);
}
const changeEvent = new Event('change', {
    bubbles: true, // Blur events typically do not bubble, but this can be set to true if needed
    cancelable: false // Blur events are not cancelable
});
export function triggerChangeElm(elm) {
    elm.dispatchEvent(changeEvent);
}
//# sourceMappingURL=elmSelectors.js.map