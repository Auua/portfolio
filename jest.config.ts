import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('ts-jest').JestConfigWithTsJest} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '/__utils__/',
    '<rootDir>/v2/__tests__/',
    '<rootDir>/src/e2e/',
  ],
  preset: 'ts-jest',
  verbose: true,
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!next-auth|@next-auth)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/api/auth/[...nextauth]/**',
    '!**/_lib/**',
    '!**/*.spec.ts',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
