import { html } from "taggedjs";
export const renderCountDiv = ({ renderCount, name }) => html `
  <div>
    <small>(${name} render count <span id=${name + '_render_count'}>${renderCount}</span>)</small>
  </div>
`;
//# sourceMappingURL=renderCount.component.js.map