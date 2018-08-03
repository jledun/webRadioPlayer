"use strict";

const { spawn } = require('child_process');
const path = require('path');

const options = {
  cli: [
    '-slave',
    // '-loop 0',
    // '-ao pulse'
  ]
};
const url = require(path.resolve('./').concat('/radioStreams.json'));
let rt = [];
let status = "";

const mp = spawn("mplayer", options.cli.concat(url[0].url));

mp.stdout.on('data', data => {
  const tmp = data.toString().trim();
  if (tmp.substr(0, 2) === 'A:') {
    status = tmp;
  }else{
    rt = rt.concat((tmp.split("\n").length > 0) ? tmp.split("\n") : [tmp]);
  }
  console.log(rt);
  console.log(status);
});
mp.stderr.on('data', data => {
  console.log('error', data.toString());
});
mp.on('close', () => {
  console.log('fin');
});
