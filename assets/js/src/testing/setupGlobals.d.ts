import * as chai from 'chai';
import 'mocha/mocha';
declare global {
    interface Window {
        chai: typeof chai;
        expect: typeof chai.expect;
        describe: typeof describe;
        it: typeof it;
        before: typeof before;
        after: typeof after;
        beforeEach: typeof beforeEach;
        afterEach: typeof afterEach;
    }
    const expect: typeof chai.expect;
    const describe: typeof describe;
    const it: typeof it;
}
export { chai, expect } from 'chai';
export declare const describe: any, it: any, before: any, after: any, beforeEach: any, afterEach: any;
