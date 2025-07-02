// This file sets up Mocha for browser usage
import 'mocha/mocha.css';
// Import mocha and make it available globally
import mocha from 'mocha/mocha-es2018';
import { expect } from 'chai';
// Make everything globally available
if (typeof window !== 'undefined') {
    window.mocha = mocha;
    window.expect = expect;
    // Setup mocha
    mocha.setup({
        ui: 'bdd',
        reporter: 'html',
        timeout: 5000
    });
    // Create mocha div if it doesn't exist
    if (!document.getElementById('mocha')) {
        const mochaDiv = document.createElement('div');
        mochaDiv.id = 'mocha';
        document.body.appendChild(mochaDiv);
    }
}
export { mocha, expect };
//# sourceMappingURL=browser-mocha-setup.js.map