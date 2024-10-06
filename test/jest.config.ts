import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '.spec.ts$',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
};

export default config;
