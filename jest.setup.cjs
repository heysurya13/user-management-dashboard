const { TextEncoder, TextDecoder } = require('util')
require('@testing-library/jest-dom')
globalThis.TextEncoder = TextEncoder
globalThis.TextDecoder = TextDecoder
