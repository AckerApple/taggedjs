export default {
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  "transformIgnorePatterns": [
    "node_modules/(?!(taggedjs)/)" // Add more packages as necessary
  ],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
  moduleFileExtensions: [
    "js",
    "json",
    "node",
    "ts"
  ],
  "rootDir": "./src",
  "testRegex": ".*(\\.spec)\\.ts$",
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.{ts,js,jsx}",
    "!**/*.spec.{ts,js,jsx}",
    "!**/*.spec.e2e.{ts,js,jsx}",
    "!**/_*.{ts,js,jsx}",
    "!**/node_modules/**",
    "!**/app/**",
    "!**/.history/**",
    "!**/message-definitions/**"
  ],
  "coverageDirectory": "../coverage",
  "coverageReporters": ["cobertura"]
}
