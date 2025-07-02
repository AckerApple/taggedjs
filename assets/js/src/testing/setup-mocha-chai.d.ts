import { expect as chaiExpect } from 'chai';
import 'mocha/mocha';
declare global {
    const expect: typeof chaiExpect;
    const describe: typeof describe;
    const it: typeof it;
    const beforeEach: typeof beforeEach;
    const afterEach: typeof afterEach;
    const before: typeof before;
    const after: typeof after;
}
export { chaiExpect as expect };
export declare const runMochaTests: () => Promise<unknown>;
