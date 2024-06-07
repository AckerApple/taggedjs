// import { useCallback } from "react";

import { html } from "taggedjs";

const sanitize = (string: string) => {
    const map: any = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match: any) => map[match]);
};

const hasValidMin = (value: any, min: any) => {
    return value.length >= min;
};

export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }: any) {
    const handleBlur = () => {
        if (onBlur)
            onBlur();
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            const value = e.target.value.trim();

            if (!hasValidMin(value, 2))
                return;

            onSubmit(sanitize(value));
            e.target.value = "";
        }
    };

    return html`
        <div class="input-container">
            <input class="new-todo" id="todo-input" type="text" data-testid="text-input" placeholder=${placeholder} value=${defaultValue} onblur=${handleBlur} onKeyDown=${handleKeyDown} />
            <label htmlFor="todo-input" style="visibility:hidden">
                ${label}
            </label>
        </div>
    `;
}
