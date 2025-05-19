export function getStringsId(strings) {
    const array = strings.map(lengthMapper);
    array.push(strings.length);
    return Number(array.join(''));
}
function lengthMapper(x) {
    return x.length;
}
//# sourceMappingURL=getStringsId.function.js.map