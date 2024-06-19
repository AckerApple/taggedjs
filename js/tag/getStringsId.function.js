export function getStringsId(strings, values) {
    const array = strings.map(x => x.length);
    array.push(strings.length);
    // array.push(values.length)
    return Number(array.join(''));
}
//# sourceMappingURL=getStringsId.function.js.map