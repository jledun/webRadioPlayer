"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const mPlayerManager = require('./mplayer-manager.js');
const mp = new mPlayerManager();
const mpStatusUpdate = (nowPlaying, socket) => {
  socket.emit('status', nowPlaying);
};

app.use(express.static(path.resolve(__dirname, 'front')));

io.on('connection', (socket) => {
  socket.on('disconnect', reason => {
    console.log('client deconnected: ' + reason);
    mp.removeListener('status', mpStatusUpdate);
  });
  socket.on('getUrl', () => {
    socket.emit('url', mp.getUrl());
  });
  socket.on('playStream', (url) => {
    return mp.playStream(url);
  });
  socket.on('stopStream', (url) => {
    return mp.stopStream(url);
  });
  socket.on('volumeUp', () => {console.log('volume up');});
  socket.on('volumeDown', () => {console.log('volume down');});
  mp.on('status', nowPlaying => {
    mpStatusUpdate(nowPlaying, socket);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

