#!/usr/bin/env node
const { spawn } = require('child_process');
const child = spawn('git', ['describe']);
child.stdout.on('data', (chunk) => {
    line = chunk.toString().trim();
    console.log('export function version() {');
    console.log('    return "'+line+'";');
    console.log('}');
});
