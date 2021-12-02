/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  bail: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(ts|tsx)', '**/?(*.)+(spec|test).+(ts|tsx)'],
  watchPathIgnorePatterns: ['.git'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
