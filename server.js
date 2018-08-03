"use strict";

const { spawn } = require('child_process');
const path = require('path');

const options = {
  cli: [
    // '-loop 0',
    '-ao alsa'
  ]
};
const url = require(path.resolve('./').concat('/radioStreams.json'));

const mp = spawn("mplayer", options.cli.concat(url[0].url));

mp.stdout.on('data', data => {
  console.log(data.toString());
});
mp.stderr.on('data', data => {
  console.log('error', data.toString());
});
mp.on('close', () => {
  console.log('fin');
});
