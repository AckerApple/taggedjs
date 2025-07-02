// This file replaces the custom expect.ts with direct Mocha/Chai usage
import './setup-mocha-chai';
import { runMochaTests } from './setup-mocha-chai';
// Export a compatible execute function for existing code
export async function execute() {
    console.debug('🏃 Running tests with Mocha/Chai...');
    try {
        await runMochaTests();
        console.info('✅ All tests passed');
        return true;
    }
    catch (error) {
        console.error('❌ Tests failed:', error);
        throw error;
    }
}
// For backward compatibility - these are now global from setup-mocha-chai.ts
export const describe = window.describe;
export const it = window.it;
export const expect = window.expect;
//# sourceMappingURL=mocha-expect.js.map