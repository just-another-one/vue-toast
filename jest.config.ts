import type { Config } from '@jest/types';
import { defaultsESM as tsjPreset } from 'ts-jest/presets';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.vue$': '@vue/vue3-jest',
  },

  moduleFileExtensions: ['js', 'ts', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue-tjw'],
};
export default config;
