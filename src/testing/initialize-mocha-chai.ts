// This module initializes Mocha and Chai when imported
import * as chai from 'chai';

console.log('🔧 initialize-mocha-chai.ts: Starting initialization...');

// We need to load Mocha script that sets up globals
// Use a simple path that will work when served
const mochaUrl = './node_modules/mocha/mocha.js';

// Create a promise that resolves when Mocha is loaded
export const mochaLoaded = new Promise<void>((resolve) => {
  // Load Mocha script dynamically to ensure it sets up globals
  if (typeof window !== 'undefined' && !window.mocha) {
    console.log('🔧 initialize-mocha-chai.ts: Loading Mocha from:', mochaUrl);
    const script = document.createElement('script');
    script.src = mochaUrl;
    script.onload = () => {
      console.log('✅ initialize-mocha-chai.ts: Mocha script loaded, setting up...');
      
      // Setup Mocha after it loads
      window.mocha.setup({
        ui: 'bdd',
        reporter: 'spec', 
        timeout: 5000
      });
      
      console.log('✅ initialize-mocha-chai.ts: Mocha setup complete. window.describe available?', typeof window.describe);
      
      // Create mocha div if needed
      if (!document.getElementById('mocha')) {
        const mochaDiv = document.createElement('div');
        mochaDiv.id = 'mocha';
        mochaDiv.style.display = 'none';
        document.body.appendChild(mochaDiv);
      }
      
      resolve();
    };
    document.head.appendChild(script);
  } else {
    console.log('⚠️ initialize-mocha-chai.ts: Mocha already loaded or not in browser');
    resolve();
  }
});

// Make Chai expect globally available
const expect = chai.expect;
if (typeof window !== 'undefined') {
  (window as any).expect = expect;
  (window as any).chai = chai;
}

export { expect };