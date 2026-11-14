
module.exports = {
    testEnvironment: 'jsdom',

    setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],

    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: {
                    jsx: 'react-jsx',
                    esModuleInterop: true
                }
            }
        ]
    },

    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    }
}

