import { header, h1, input } from "taggedjs";
import { handleKey } from "./item.js";
export const Header = (dispatch) => header.class `header`["data-testid"] `header`(h1('component todos'), input({
    autoFocus: true,
    class: "new-todo",
    placeholder: "What needs to be done?",
    onKeydown: (e) => {
        const enter = handleKey(e, title => dispatch.addItem(title));
        if (enter) {
            e.target.value = "";
        }
    }
}));
//# sourceMappingURL=header.js.map