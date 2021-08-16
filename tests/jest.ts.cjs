const path = require('path')

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    rootDir: path.join(__dirname, '..'),
    displayName: 'ts',
    preset: 'ts-jest',
    testEnvironment: "node",
    moduleNameMapper: {
        "[$]app/(.*)": ["<rootDir>/.svelte-kit/dev/runtime/app/$1", "<rootDir>/.svelte-kit/build/runtime/app/$1"],
        "[$]lib/(.*)": ["<rootDir>/src/lib/$1"]
        // from https://github.com/kulshekhar/ts-jest/issues/414#issuecomment-369876280
        // see also: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
    },
    transform: {
        "^.+\\.(ts)$": "ts-jest",
    },
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    // testMatch: ["<rootDir>/src/**/*!(svelte).test.ts"],
}

module.exports = config;