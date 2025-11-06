import { div, label as labelElm, input } from "taggedjs";

const hasValidMin = (value: any, min: any) => {
    return value.length >= min;
};

export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }: any) {
    const handleBlur = () => {
        if (onBlur)
            onBlur();
    };

    const handleKeyChange = (e: any) => {
        if (e.key === "Enter") {
            const value = e.target.value.trim();

            if (!hasValidMin(value, 2))
                return;

            onSubmit(value);
            e.target.value = "";
        }
    };

    return div({class:"input-container"},
        input({
            class         : "new-todo",
            id            : "todo-input",
            type          : "text",
            'data-testid' : "text-input",
            placeholder   : placeholder,
            value         : defaultValue,
            onBlur        : handleBlur,
            onKeyUp       : handleKeyChange,
            style         : "width:100%"
        }),
        labelElm({htmlFor:"todo-input", style:"visibility:hidden"}, _=> label),'*'
    )
}
