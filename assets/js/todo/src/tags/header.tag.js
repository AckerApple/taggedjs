import { html, tag } from 'taggedjs';
import { handleKey } from './item.tag';
export const Header = (dispatch) => tag.renderOnce = () => html `
    <header class="header" data-testid="header">
        <h1>todos</h1>
        <input autoFocus class="new-todo"
            placeholder="What needs to be done?"
            onKeyDown=${e => {
    const enter = handleKey(e, title => dispatch.addItem(title));
    if (enter) {
        e.target.value = "";
    }
}}
        />
    </header>
`;
//# sourceMappingURL=header.tag.js.map