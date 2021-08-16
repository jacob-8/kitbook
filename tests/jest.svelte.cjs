const path = require('path')

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    rootDir: path.join(__dirname, '..'),
    displayName: 'svelte',
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "[$]app/(.*)": ["<rootDir>/.svelte-kit/dev/runtime/app/$1", "<rootDir>/.svelte-kit/build/runtime/app/$1"],
        "[$]lib/(.*)": ["<rootDir>/src/lib/$1"]
        // from https://github.com/kulshekhar/ts-jest/issues/414#issuecomment-369876280
        // see also: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
    },
    transform: {
        "^.+\\.svelte$": [
            "svelte-jester",
            {
                // "preprocess": "./tests/jest-config-hack/svelte.config.js",
                // "debug": true,
                // "preprocess": import("./svelte.config.cjs") // once Jest v27 is released w/ support for async imports, would think it might work like this?
                "preprocess": true // for use with a default svelte.config.js file
            }
        ],
        "^.+\\.ts$": "ts-jest"
    },
    moduleFileExtensions: [
        "js",
        "ts",
        "svelte"
    ],
    setupFilesAfterEnv: [
        "./tests/jest.svelte.setup.ts"
    ],
    testMatch: ["<rootDir>/src/**/*.spec.ts"],
    // testMatch: ["<rootDir>/src/**/*.svelte.test.ts"],
};

module.exports = config;
