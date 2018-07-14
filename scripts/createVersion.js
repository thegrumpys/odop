#!/usr/bin/env node
const { exec } = require('child_process');
exec('git describe', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  line = stdout.toString().trim();
  console.log('export function version() {');
  console.log('    return "'+line+'";');
  console.log('}');
});
