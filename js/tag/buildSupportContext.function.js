export function buildSupportContext(support) {
    const global = support.subject.global;
    const context = global.context = [];
    const thisTag = support.templater.tag;
    const values = thisTag.values; // this.values || thisTag.values
    for (const value of values) {
        // 🆕 First time values below
        context.push({
            value,
            global,
        });
    }
    return context;
}
//# sourceMappingURL=buildSupportContext.function.js.map