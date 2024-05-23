import { isSubjectInstance } from "../isInstance";
import { combineLatest } from "./combineLatest.function";
import { getSubscription, runPipedMethods } from "./subject.utils";
export class Subject {
    value;
    onSubscription;
    methods = [];
    isSubject = true;
    subscribers = [];
    subscribeWith;
    // unsubcount = 0 // 🔬 testing
    constructor(value, onSubscription) {
        this.value = value;
        this.onSubscription = onSubscription;
    }
    subscribe(callback) {
        const subscription = getSubscription(this, callback);
        // are we within a pipe?
        const subscribeWith = this.subscribeWith;
        if (subscribeWith) {
            // are we in a pipe?
            if (this.methods.length) {
                const orgCallback = callback;
                callback = (value) => {
                    runPipedMethods(value, this.methods, lastValue => orgCallback(lastValue, subscription));
                };
            }
            return subscribeWith(callback);
        }
        this.subscribers.push(subscription);
        // Subject.globalSubs.push(subscription) // 🔬 testing
        const count = Subject.globalSubCount$.value;
        Subject.globalSubCount$.set(count + 1); // 🔬 testing
        if (this.onSubscription) {
            this.onSubscription(subscription);
        }
        return subscription;
    }
    set(value) {
        this.value = value;
        // Notify all subscribers with the new value
        const subs = [...this.subscribers]; // subs may change as we call callbacks
        const length = subs.length;
        for (let index = 0; index < length; ++index) {
            const sub = subs[index];
            sub.callback(value, sub);
        }
    }
    // next() is available for rxjs compatibility
    next = this.set;
    toPromise() {
        return new Promise(res => {
            this.subscribe((x, subscription) => {
                subscription.unsubscribe();
                res(x);
            });
        });
    }
    /** like toPromise but faster */
    toCallback(callback) {
        this.subscribe((x, subscription) => {
            subscription.unsubscribe();
            callback(x);
        });
        return this;
    }
    pipe(...operations) {
        const subject = new Subject(this.value);
        subject.methods = operations;
        subject.subscribeWith = (x) => this.subscribe(x);
        subject.set = x => this.set(x);
        subject.next = subject.set;
        return subject;
    }
    static all(args) {
        const switched = args.map(arg => {
            if (isSubjectInstance(arg))
                return arg;
            // Call the callback immediately with the current value
            const x = new Subject(arg, subscription => {
                subscription.next(arg);
                return subscription;
            });
            return x;
        });
        return combineLatest(switched);
    }
    static globalSubCount$ = new Subject(0); // for ease of debugging
}
//# sourceMappingURL=Subject.class.js.map