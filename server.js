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
  console.log('this a connection !');
  socket.on('disconnect', reason => {
    console.log('this is a deconnection: ' + reason);
  });
  socket.on('getUrl', () => {
    socket.emit('url', mp.getUrl());
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

