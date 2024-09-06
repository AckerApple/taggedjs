/** This is the function that enhances elements such as [class.something] and [style.color] OR it fixes elements that alter innerHTML */
export function afterChildrenBuilt(children, // HTMLCollection // Element[],
subject, ownerSupport) {
    const kids = children;
    const len = kids.length;
    let index = 0;
    while (index < len) {
        const elmMeta = kids[index];
        const attributes = elmMeta.at;
        if (!attributes) {
            ++index;
            continue;
        }
        const domElm = elmMeta.domElement;
        attributes.forEach(attribute => {
            const name = attribute[0];
        });
        const children = elmMeta.ch; // children
        if (children) {
            afterChildrenBuilt(children, subject, ownerSupport);
        }
        ++index;
    }
}
//# sourceMappingURL=afterChildrenBuilt.function.js.map