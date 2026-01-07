function isTemplateStringsArray(value) {
    return (Array.isArray(value) &&
        Object.prototype.hasOwnProperty.call(value, 'raw'));
}
export function makeAttrCallable(attrName, attr) {
    return function (item, stringsOrValue, values) {
        if (isTemplateStringsArray(stringsOrValue)) {
            const attrValue = stringsOrValue.reduce((all, chunk, index) => all + chunk + (values[index] ?? ''), '');
            return attr(item, [attrName, attrValue]);
        }
        return attr(item, [attrName, stringsOrValue]);
    };
}
//# sourceMappingURL=attributeCallables.js.map