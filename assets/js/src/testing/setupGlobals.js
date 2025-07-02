// Import Mocha and Chai from node_modules
import * as chai from 'chai';
import 'mocha/mocha';
// Setup Mocha
if (typeof window !== 'undefined' && window.mocha) {
    window.mocha.setup({
        ui: 'bdd',
        reporter: 'spec',
        timeout: 5000
    });
}
// Make chai available globally
if (typeof window !== 'undefined') {
    window.chai = chai;
    window.expect = chai.expect;
    // Make Mocha functions globally available if loaded
    if (window.mocha) {
        window.describe = window.describe || describe;
        window.it = window.it || it;
    }
}
// Export for direct use
export { chai, expect } from 'chai';
export const { describe, it, before, after, beforeEach, afterEach } = window.mocha || {};
//# sourceMappingURL=setupGlobals.js.map