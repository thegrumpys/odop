import { TextDecoder, TextEncoder } from 'util';

// React Router uses these browser APIs, which Jest's jsdom does not provide.
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
