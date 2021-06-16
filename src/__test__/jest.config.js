//jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src', '<rootDir>/res'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/src/__test__/__mocks__/svgMock.js',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^.+\\.svg$': '<rootDir>/src/__test__/__mocks__/svgMock.js',
  },
};
