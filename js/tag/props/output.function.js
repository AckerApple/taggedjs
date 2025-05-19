import { getSupportInCycle } from "../getSupportInCycle.function";
import { safeRenderSupport } from "./alterProp.function";
export function output(callback) {
    const support = getSupportInCycle();
    if (!support) {
        throw new Error('output must be used in render sync fashion');
    }
    return (...args) => {
        const c = callback(args);
        const newest = support.subject.global.newest;
        safeRenderSupport(newest, newest.ownerSupport);
        return c;
    };
}
//# sourceMappingURL=output.function.js.map