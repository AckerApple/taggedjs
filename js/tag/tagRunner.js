// Life cycle 4 - end of life
export function runBeforeDestroy(support, global) {
    const providers = support.context.providers;
    if (providers) {
        for (const provider of providers) {
            for (let index = provider.children.length - 1; index >= 0; --index) {
                const child = provider.children[index];
                if (child.context.global === global) {
                    provider.children.splice(index, 1);
                }
            }
        }
    }
    // global.deleted = true
    support.context.destroy$.next();
    support.context.renderCount = 0; // if it comes back, wont be considered an update
}
//# sourceMappingURL=tagRunner.js.map