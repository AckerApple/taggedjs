/** Looking for (class | style) followed by a period */
export function isSpecialAttr(attrName) {
    if (attrName.startsWith('class.')) {
        return 'class';
    }
    const specialAction = isSpecialAction(attrName);
    if (specialAction !== false) {
        return specialAction;
    }
    if (attrName.startsWith('style.')) {
        return 'style';
    }
    return false;
}
export function isSpecialAction(attrName) {
    switch (attrName) {
        case 'autoselect':
            return 'autoselect';
        case 'autofocus':
            return 'autofocus';
        case 'oninit': // when read in compile process
        case 'init': // when read in realtime
            return 'init';
        case 'ondestroy': // when read in compile process
        case 'destroy': // when read in realtime
            return 'destroy';
    }
    return false;
}
//# sourceMappingURL=isSpecialAttribute.function.js.map