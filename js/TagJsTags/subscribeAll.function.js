import { Subject } from "../index.js";
import { subscribe } from "./subscribe.function.js";
/** Observe an array of Subscriptions and when any fires than the callback is fired */
export function subscribeAll(subjects, callback) {
    return subscribe(Subject.all(subjects), callback);
}
//# sourceMappingURL=subscribeAll.function.js.map