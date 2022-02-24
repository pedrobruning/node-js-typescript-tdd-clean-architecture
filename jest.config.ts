export default {
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
