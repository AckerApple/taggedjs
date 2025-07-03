const fs = require('fs');
const glob = require('glob');

// Find all test files
const testFiles = glob.sync('src/**/*.test.ts');

console.log(`Updating ${testFiles.length} test files for dual environment support`);

testFiles.forEach(file => {
  console.log(`Updating ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace vitest imports with testing/index imports
  content = content.replace(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]vitest['"]/g, 
    (match, imports) => {
      const importList = imports.split(',').map(i => i.trim());
      const testImports = importList.filter(i => ['it', 'describe', 'expect'].includes(i));
      const otherImports = importList.filter(i => !['it', 'describe', 'expect'].includes(i));
      
      let result = '';
      if (testImports.length > 0) {
        result = `import { ${testImports.join(', ')} } from './testing'`;
      }
      
      if (otherImports.length > 0) {
        console.warn(`  ⚠️  File has non-standard imports: ${otherImports.join(', ')}`);
      }
      
      return result;
    });
  
  // Update other imports
  content = content.replace(/from\s*['"]\.\/testing\/elmSelectors['"]/g, `from './testing'`);
  content = content.replace(/from\s*['"]\.\/testing\/expect\.html['"]/g, `from './testing'`);
  
  fs.writeFileSync(file, content);
});

console.log('\nDone!');