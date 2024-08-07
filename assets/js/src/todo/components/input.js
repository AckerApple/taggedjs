import { html } from "taggedjs";
const hasValidMin = (value, min) => {
    return value.length >= min;
};
export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }) {
    const handleBlur = () => {
        if (onBlur)
            onBlur();
    };
    const handleKeyChange = (e) => {
        if (e.key === "Enter") {
            const value = e.target.value.trim();
            if (!hasValidMin(value, 2))
                return;
            onSubmit(value);
            e.target.value = "";
        }
    };
    return html `
        <div class="input-container">
            <input
                class       = "new-todo"
                id          = "todo-input"
                type        = "text"
                data-testid = "text-input"
                placeholder = ${placeholder}
                value       = ${defaultValue}
                onblur      = ${handleBlur}
                onKeyUp     = ${handleKeyChange}
                style       = "width:100%"
            />
            <label htmlFor="todo-input" style="visibility:hidden">
                ${label}
            </label>
        </div>
    `;
}
//# sourceMappingURL=input.js.map