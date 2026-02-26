import { header, h1, input } from 'taggedjs';
import { handleKey } from './item.tag';
export const Header = (dispatch) => header
    .class `header`
    .attr('data-testid', "header")(h1('src todos'), input
    .class `new-todo`
    .attr('autoFocus', true)
    .placeholder `What needs to be done?`
    .onKeydown(e => {
    const enter = handleKey(e, title => dispatch.addItem(title));
    if (enter) {
        e.target.value = "";
    }
}));
//# sourceMappingURL=header.tag.js.map