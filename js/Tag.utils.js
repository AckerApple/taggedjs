import { ValueSubject } from "./ValueSubject";
import { bindSubjectCallback } from "./bindSubjectCallback.function";
export function getSubjectFunction(value, tag) {
    return new ValueSubject(bindSubjectCallback(value, tag));
}
//# sourceMappingURL=Tag.utils.js.map