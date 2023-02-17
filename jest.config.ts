import type {Config} from 'jest';

const config: Config = {
    bail: false,
    clearMocks: true,
    preset: 'ts-jest',
    testMatch: [
        '**/__test__/**.test.ts'
    ],
    verbose: true,
};

export default config;