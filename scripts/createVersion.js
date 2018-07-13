#!/usr/bin/env node
const { spawn } = require('child_process');
const child = spawn('git', ['describe']);
child.stdout.on('data', (chunk) => {
    line = chunk.toString().trim();
    process.stdout.write('export function version() {\n');
    process.stdout.write('    return "'+line+'";\n');
    process.stdout.write('}\n');
});
