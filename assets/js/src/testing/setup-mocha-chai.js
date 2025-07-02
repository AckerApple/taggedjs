// Import Mocha and Chai
import { expect as chaiExpect } from 'chai';
import 'mocha/mocha';
// Set up Mocha in browser
if (typeof window !== 'undefined') {
    // Make expect globally available
    window.expect = chaiExpect;
    // Mocha should already have made describe/it global when imported
    // But let's ensure they're available
    if (!window.describe && window.mocha) {
        window.describe = window.mocha.describe;
        window.it = window.mocha.it;
        window.beforeEach = window.mocha.beforeEach;
        window.afterEach = window.mocha.afterEach;
        window.before = window.mocha.before;
        window.after = window.mocha.after;
    }
    // Setup Mocha
    if (window.mocha) {
        window.mocha.setup({
            ui: 'bdd',
            reporter: 'spec',
            timeout: 5000
        });
    }
}
// Export for convenience
export { chaiExpect as expect };
export const runMochaTests = () => {
    if (typeof window !== 'undefined' && window.mocha) {
        return new Promise((resolve, reject) => {
            window.mocha.run((failures) => {
                if (failures > 0) {
                    reject(new Error(`${failures} test(s) failed`));
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    throw new Error('Mocha not available');
};
//# sourceMappingURL=setup-mocha-chai.js.map