import { state, html, tag } from "taggedjs";
export const propsDebug = tag(function PropsDebug(props) {
    let renderCount = state(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    function pasteProps(event) {
        const value = JSON.parse(event.target.value);
        console.log('value', value);
        Object.assign(props, value);
    }
    return html `<!--propsDebug.js-->
    <textarea wrap="off" onchange=${pasteProps}>${JSON.stringify(props, null, 2)}</textarea>
    <pre>${JSON.stringify(props, null, 2)}</pre>
    <div><small>(renderCount:${renderCount})</small></div>
  `;
});
//# sourceMappingURL=PropsDebug.component.js.map