#!/usr/bin/env node
console.error('Entering createVersion');
const { spawn } = require('child_process');
const child = spawn('git', ['describe']);
child.stdout.on('data', (chunk) => {
    line = chunk.toString().trim();
    console.error(line);
    console.log('export function version() {');
    console.log('    return "'+line+'";');
    console.log('}');
});
console.error('Exiting createVersion');
