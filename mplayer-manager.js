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
      app: '/usr/bin/mplayer',
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
    this.killCB = false;
    this.loop = false;
    this.intStatus = setInterval(() => {
      this.emitStatus();
    }, 1000);
  };

  checkStatus(cb) {
    if (this.mpIsRunning()) {
      this.killCB = cb;
      return this.killPlayer();
    }
    cb();
  }
  mpIsRunning() {
    return (this.mp && this.mp.hasOwnProperty('pid')) ? true : false;
  }
  killPlayer() {
    if (!this.mpIsRunning()) return;
    this.mp.stdin.write('quit\n');
  }
  setVolume(val, abs) {
    if (!this.mpIsRunning()) return;
    if (abs) return this.mp.stdin.write(`volume ${val} 1\n`);
    return this.mp.stdin.write(`volume ${val}\n`);
  }
  mpNewPlayer(url) {
    this.mp = spawn(this.options.app, this.options.cli.concat(url.url));
    this.loop = false;
    this.nowPlaying.status = LOADING;
    this.nowPlaying.url = Object.assign({}, url);

    this.mp.stdout.on('data', data => this.mpStdout(data));
    this.mp.stderr.on('data', data => this.mpStderr(data));
    this.mp.on('close', () => this.mpClose());
  }
  mpStdout(data) {
    const tmp = data.toString().trim();
    if (tmp.substr(0, 2) === 'A:') {
      this.currentlyPlaying = tmp;
      if (this.nowPlaying.status !== PLAYING) this.nowPlaying.status = PLAYING;
      if (!this.loop) {
        this.loop = true;
        this.mp.stdin.write('loop 0');
      }
    }else{
      this.runtime = this.runtime.concat((tmp.split("\n").length > 0) ? tmp.split("\n") : [tmp]);
      // if (this.intRT) clearTimeout(this.intRT);
      // this.intRT = setTimeout(() => {
        // console.log(this.runtime);
      // }, 2000);
    }
    // console.log(this.currentlyPlaying);
  }
  mpStderr(data) {
    console.log('error', data.toString());
  }
  mpClose() {
    console.log('fin');
    this.nowPlaying.status = STOPPED;
    this.resetMp();
  }

  resetMp() {
    this.mp.stdout.removeAllListeners('data');
    this.mp.stderr.removeAllListeners('data');
    this.mp.removeAllListeners('close');
    this.mp = {};
    if (typeof this.killCB === "function") return this.killCB();
  }

  playStream(url) {
    this.checkStatus(() => {
      this.mpNewPlayer(url);
      this.killCB = false;
    });
  };

  stopStream(url) {
    this.killPlayer();
  }
  volumeUp() {
    this.setVolume(1);
  }
  volumeDown() {
    this.setVolume(-1);
  }
  volume(val) {
    this.setVolume(Number(val), true);
  }

  getStatus() {
    if (!this.mp || !this.mp.stdin) return {};
    this.mp.stdin.write("get_time_pos\n");
  }

  getUrl() {
    return this.url;
  };
};
