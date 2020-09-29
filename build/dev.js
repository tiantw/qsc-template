'use strict'

const spawn = require('child_process').spawn;

const args = process.argv.slice(2);
if (args.length) {
  spawn('poi', ['--serve', `src/apps/${args[0]}/index.js`], {
    stdio: 'inherit',
    shell: true
  }) 
} else {
  spawn('poi', ['--serve'], {
    stdio: 'inherit',
    shell: true
  })
}