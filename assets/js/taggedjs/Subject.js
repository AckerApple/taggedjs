export class Subject {
    isSubject = true;
    subscribers = [];
    value;
    // unsubcount = 0 // 🔬 testing
    subscribe(callback) {
        this.subscribers.push(callback);
        Subject.globalSubs.push(callback); // 🔬 testing
        ++Subject.globalSubCount;
        const unsubscribe = () => {
            unsubscribe.unsubscribe();
        };
        // Return a function to unsubscribe from the BehaviorSubject
        unsubscribe.unsubscribe = () => {
            removeSubFromArray(this.subscribers, callback);
            removeSubFromArray(Subject.globalSubs, callback); // 🔬 testing
            --Subject.globalSubCount;
            // any double unsubscribes will be ignored
            unsubscribe.unsubscribe = () => undefined;
        };
        return unsubscribe;
    }
    set(value) {
        this.value = value;
        // Notify all subscribers with the new value
        this.subscribers.forEach((callback) => {
            callback.value = value;
            callback(value);
        });
    }
    next = this.set;
}
function removeSubFromArray(subscribers, callback) {
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
        subscribers.splice(index, 1);
    }
}
;
Subject.globalSubCount = 0 // for ease of debugging
;
Subject.globalSubs = []; // 🔬 testing
//# sourceMappingURL=Subject.js.map