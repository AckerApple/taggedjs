import { paintAfters, paintBefore, paintCommands } from '../render/paint.function.js';
import { processElementVar } from './processElementVar.function.js';
export function processDesignElementInit(value, context, ownerSupport, insertBefore) {
    context.contexts = context.contexts || []; // added contexts
    context.htmlDomMeta = [];
    // prevent children from calling a parent function and causing a mid render
    context.locked = 34;
    const element = processElementVar(value, context, ownerSupport, context.contexts);
    delete context.locked;
    const paintCommand = [
        paintBefore, [insertBefore, element, 'htmlTag.processInit']
    ];
    paintCommands.push(paintCommand);
    context.paintCommands = [paintCommand];
    paintAfters.push([() => {
            delete context.paintCommands;
        }, []]);
    const dom = {
        nn: value.tagName,
        domElement: element,
        at: value.attributes, // TODO: most likely does nothing
    };
    context.htmlDomMeta = [dom];
    return element;
}
//# sourceMappingURL=processDesignElementInit.function.js.map