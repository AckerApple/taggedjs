import { Input } from "./input";
import { ADD_ITEM } from "../constants";
import { html } from "taggedjs";

export function Header(dispatch: any) {
    const addItem = (title: string) => dispatch({ type: ADD_ITEM, payload: { title } });
    return html`
        <header class="header" data-testid="header">
            <h1>todos</h1>
            ${Input({onSubmit:addItem, label:"New Todo Input", placeholder:"What needs to be done?"})}
        </header>
    `;
}
