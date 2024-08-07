export function elmCount(selector) {
    return document.querySelectorAll(selector).length;
}
export function query(query) {
    return document.querySelectorAll(query); // allow .style to just work
}
export function focus(q) {
    return query(q).forEach(elm => elm.focus());
}
export function click(q) {
    const items = [...query(q)];
    items.map(elm => elm.click());
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
export function clickOne(q, index = 0) {
    const element = query(q)[index];
    element.click();
}
export function html(q) {
    let html = '';
    query(q).forEach(elm => html = html + elm.innerHTML);
    return html;
}
export function byId(id) {
    return document.getElementById(id);
}
export function htmlById(id) {
    return document.getElementById(id).innerHTML;
}
export function lastById(id) {
    const elms = document.querySelectorAll('#' + id);
    return elms[elms.length - 1];
}
//# sourceMappingURL=elmSelectors.js.map