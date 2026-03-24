export function tagFakeTemplater(tag) {
    const templater = getFakeTemplater();
    templater.tag = tag;
    tag.templater = templater;
    return templater;
}
export function getFakeTemplater() {
}
//# sourceMappingURL=processTag.function.js.map