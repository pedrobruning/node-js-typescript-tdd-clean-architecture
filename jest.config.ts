export default {
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*protocols/**',
    '!<rootDir>/src/**/*-protocols.ts'
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  preset: '@shelf/jest-mongodb',
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
