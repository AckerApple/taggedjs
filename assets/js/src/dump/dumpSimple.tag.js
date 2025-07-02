import { html, states, tag } from "taggedjs";
import { copyText } from "./copyText.function";
export function dumpSimple({ key, value, onHeaderClick, everySimpleValue }) {
    const isLinkValue = value.search && (value.slice(0, 8) === 'https://' || value.slice(0, 7) === 'http://');
    // const result = everySimpleValue && everySimpleValue(value, key)
    let displayValue;
    if (everySimpleValue) {
        displayValue = simpleValue({ value, everySimpleValue });
    }
    else {
        displayValue = isLinkValue ? linkValue(value) : simpleValue({ value });
    }
    return html `
    <div style="font-size:75%;flex:1 1 10em;color:#111111">
      ${key && html `
        <div class="taggedjs-simple-label"
          style.cursor=${onHeaderClick && "pointer"}
          onclick=${onHeaderClick}
        >${key}</div>
      `}
      ${displayValue}
    </div>
  `;
}
const simpleValue = tag(({ value, everySimpleValue }) => {
    const isLikeNull = [undefined, null, 'null'].includes(value);
    const number = value;
    const isLargeNumber = !isNaN(number) && number > 1000000000;
    const title = !isLargeNumber ? '' : getLargeNumberTitle(number);
    let downTime = 0;
    states(get => [downTime] = get(downTime));
    const startMouseDown = () => {
        downTime = Date.now();
    };
    const markMouseUp = (event) => {
        if (Date.now() - downTime > 300) {
            event.preventDefault();
            event.stopPropagation();
            return true; // a manual drag copy is taking place
        }
        copyText(value); // a regular click took place
    };
    let displayValue = value;
    if (everySimpleValue) {
        displayValue = everySimpleValue(value);
    }
    displayValue = displayValue === null && 'null' || displayValue === false && 'false' || displayValue === undefined && 'undefined' || displayValue;
    return html `
    <div class="hover-bg-warning active-bg-energized"
      onmousedown=${startMouseDown}
      onmouseup=${markMouseUp}
      style="cursor:pointer;"
      style.background-color=${isLikeNull ? 'rgba(0,0,0,.5)' : ''}
      style.color = ${(value === true && '#28a54c') ||
        (value === false && '#e42112') ||
        isLikeNull && 'white' || ''}
      title=${title}
    >${displayValue}</div>
  `;
});
function getLargeNumberTitle(number) {
    return number > 946702800000 ?
        'Milliseconds > Unix epoch:\n' + (new Date(number).toLocaleString()) :
        'Seconds > Unix epoch:\n' + (new Date(number * 1000).toLocaleString());
}
const linkValue = (value) => {
    return html `
    <a onclick=${() => copyText(value)} href=${value}
      target="_blank"
      class="hover-bg-warning active-bg-energized"
      title="tap to copy"
    >${value}</a>
  `;
};
//# sourceMappingURL=dumpSimple.tag.js.map