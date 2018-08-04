"use strict";

const { spawn } = require('child_process');
const EventEmitter = require('events');
const util = require('util');
const path = require('path');

const STOPPED = "stopped";
const LOADING = "loading...";
const PLAYING = "playing";

module.exports = class mPlayerManager extends EventEmitter {

  emitStatus() {
    this.emit('status', this.nowPlaying);
  }

  constructor() {
    super();
    this.url = require(path.resolve('./').concat('/radioStreams.json'));
    this.options = {
      cli: ['-slave']
    };
    this.runtime = [];
    this.currentlyPlaying = "";
    this.nowPlaying = {
      status: STOPPED,
      url: {},
      statusList: {
        STOPPED: STOPPED,
        LOADING: LOADING,
        PLAYING: PLAYING
      }
    };
    this.mp = {};
    this.intStatus = setInterval(() => {
      this.emitStatus();
    }, 1000);
  };

  playStream(url) {
    this.mp = spawn("mplayer", this.options.cli.concat(url.url));
    this.nowPlaying.status = LOADING;
    this.nowPlaying.url = Object.assign({}, url);

    this.mp.stdout.on('data', data => {
      const tmp = data.toString().trim();
      if (tmp.substr(0, 2) === 'A:') {
        this.currentlyPlaying = tmp;
        if (this.nowPlaying.status !== PLAYING) this.nowPlaying.status = PLAYING;
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
      this.nowPlaying.status = STOPPED;
    });
  };

  stopStream(url) {
    console.log('stoppe moi !!!');
  }

  getStatus() {
    if (!this.mp || !this.mp.stdin) return {};
    this.mp.stdin.write("get_time_pos\n");
  }

  getUrl() {
    return this.url;
  };
};
