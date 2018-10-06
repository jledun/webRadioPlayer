"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const mPlayerManager = require('./mplayer-manager.js');
const mp = new mPlayerManager();

app.use(express.static(path.resolve(__dirname, 'front')));

io.on('connection', (socket) => {
  socket.on('disconnect', reason => {
    console.log('client deconnected: ' + reason);
    mp.removeAllListeners('status');
  });
  socket.on('getUrl', () => {
    socket.emit('url', mp.getUrl());
  });
  socket.on('playStream', url => mp.playStream(url));
  socket.on('stopStream', url => mp.stopStream(url));
  socket.on('volumeUp', () => mp.volumeUp());
  socket.on('volumeDown', () => mp.volumeDown());
  socket.on('volume', (val) => mp.volume(val));
  mp.on('status', nowPlaying => socket.emit('status', nowPlaying));
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

