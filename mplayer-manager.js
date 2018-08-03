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
    this.mp = {};
    console.log('new mplayer manager init !');
  };

  playStream(url) {
    console.log(this);
    this.mp = spawn("mplayer", this.options.cli.concat(url.url));

    this.mp.stdout.on('data', data => {
      const tmp = data.toString().trim();
      if (tmp.substr(0, 2) === 'A:') {
        this.currentlyPlaying = tmp;
      }else{
        this.runtime = this.runtime.concat((tmp.split("\n").length > 0) ? tmp.split("\n") : [tmp]);
        console.log(this.runtime);
      }
      // console.log(this.currentlyPlaying);
    });
    this.mp.stderr.on('data', data => {
      console.log('error', data.toString());
    });
    this.mp.on('close', () => {
      console.log('fin');
    });
  };

  getStatus() {
    if (!this.mp || !this.mp.stdin) return {};
    this.mp.stdin.write("get_time_pos\n");
  }

  getUrl() {
    return this.url;
  };
};
