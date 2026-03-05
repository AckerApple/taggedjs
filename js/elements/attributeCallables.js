function isTemplateStringsArray(value) {
    return (Array.isArray(value) &&
        Object.prototype.hasOwnProperty.call(value, 'raw'));
}
export function makeAttrCallable(attrName, attr) {
    return function makeAttrCallableFunction(item, stringsOrValue, values) {
        if (isTemplateStringsArray(stringsOrValue)) {
            const parts = [];
            for (let index = 0; index < stringsOrValue.length; ++index) {
                parts.push(stringsOrValue[index]);
                if (index < values.length) {
                    parts.push(String(values[index] ?? ''));
                }
            }
            const attrValue = parts.join('');
            return attr(item, [attrName, attrValue]);
        }
        return attr(item, [attrName, stringsOrValue]);
    };
}
//# sourceMappingURL=attributeCallables.js.map