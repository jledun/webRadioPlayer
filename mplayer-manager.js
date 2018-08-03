"use strict";

const { spawn } = require('child_process');
const EventEmitter = require('events');
const util = require('util');
const path = require('path');

module.exports = class mPlayerManager extends EventEmitter {

  constructor() {
    super();
    this.url = require(path.resolve('./').concat('/radioStreams.json'));
    this.options = {
      cli: ['-slave']
    };
    this.runtime = [];
    this.currentlyPlaying = "";
    console.log('new mplayer manager init !');
  };

  playStream(url) {
    const mp = spawn("mplayer", this.options.cli.concat(this.url[0].url));

    mp.stdout.on('data', data => {
      const tmp = data.toString().trim();
      if (tmp.substr(0, 2) === 'A:') {
        this.currentlyPlaying = tmp;
      }else{
        this.runtime = this.runtime.concat((tmp.split("\n").length > 0) ? tmp.split("\n") : [tmp]);
      }
      console.log(this.runtime);
      console.log(this.currentlyPlaying);
    });
    mp.stderr.on('data', data => {
      console.log('error', data.toString());
    });
    mp.on('close', () => {
      console.log('fin');
    });
  };

  getUrl() {
    return this.url;
  };
};
