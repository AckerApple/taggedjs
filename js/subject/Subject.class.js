import { isSubjectInstance } from '../isInstance.js';
import { combineLatest } from './combineLatest.function.js';
import { getSubscription, runPipedMethods } from './subject.utils.js';
export class Subject {
    onSubscription;
    // private?
    methods = [];
    isSubject = true;
    // private?
    subscribers = [];
    subscribeWith;
    value;
    constructor(value, 
    // private? - only used by extending classes
    onSubscription) {
        this.onSubscription = onSubscription;
        // defineValueOn(this)
        if (arguments.length > 0) {
            this.value = value;
        }
    }
    subscribe(callback) {
        const subscription = getSubscription(this, callback, this.subscribers);
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
        if (this.onSubscription) {
            this.onSubscription(subscription);
        }
        return subscription;
    }
    next(value) {
        this.value = value;
        this.emit();
    }
    set = this.next.bind(this);
    emit() {
        const value = this.value;
        // Notify all subscribers with the new value
        // const subs = [...this.subscribers] // subs may change as we call callbacks
        const subs = this.subscribers; // subs may change as we call callbacks
        // const length = subs.length
        for (const sub of subs) {
            sub.callback(value, sub);
        }
    }
    toPromise() {
        return new Promise(res => {
            this.subscribe((x, subscription) => {
                subscription.unsubscribe();
                res(x);
            });
        });
    }
    /** like toPromise but faster.
     * Once called, unsubscribe occurs.
     * No subscription to manage UNLESS the callback will never occur THEN subscription needs to be closed with result.unsubscribe() */
    toCallback(callback) {
        const subscription = this.subscribe((x, runtimeSub) => {
            const tagJsUnsub = runtimeSub?.unsubscribe;
            if (tagJsUnsub) {
                tagJsUnsub(); // its from taggedjs
            }
            else {
                setTimeout(() => subscription.unsubscribe(), 0);
            }
            callback(x);
        });
        // return this 10-2025 remove
        return subscription;
    }
    pipe(...operations) {
        const args = [];
        if ('value' in this) {
            args.push(this.value);
        }
        const subject = new Subject(...args);
        subject.setMethods(operations);
        subject.subscribeWith = (x) => this.subscribe(x);
        subject.next = x => this.next(x);
        return subject;
    }
    setMethods(operations) {
        this.methods = operations;
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
    static globalSubCount$ = new Subject(0); // for ease of debugging}
}
export class Subjective extends Subject {
    _value;
    constructor(...args) {
        super(...args);
        this._value = args[0];
        defineValueOn(this);
    }
    next(value) {
        this._value = value;
        this.emit();
    }
    emit() {
        const value = this._value;
        // Notify all subscribers with the new value
        // const subs = [...this.subscribers] // subs may change as we call callbacks
        const subs = this.subscribers; // subs may change as we call callbacks
        // const length = subs.length
        for (const sub of subs) {
            sub.callback(value, sub);
        }
    }
}
export function defineValueOn(subject) {
    Object.defineProperty(subject, 'value', {
        // supports subject.value = x
        set(value) {
            subject._value = value;
            subject.emit();
        },
        // supports subject.value
        get() {
            return subject._value;
        }
    });
}
//# sourceMappingURL=Subject.class.js.map