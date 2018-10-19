"use strict";

const express = require('express');
const fallback = require('express-history-api-fallback')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
// même port que mopidy pour execution sur mediaballe
const port = 6680;

const mPlayerManager = require('./mplayer-manager.js');
const mp = new mPlayerManager();

const cors = require('cors');
app.use(cors());

const fileManager = require('./json-file-middleware.js');
const jsonParser = require('body-parser').json();

app.use('/fileActions', jsonParser);
app.get('/fileActions', fileManager.get);
app.post('/fileActions', fileManager.post);
app.put('/fileActions/:id', fileManager.put);
app.delete('/fileActions/:id', fileManager.delete);

const root = path.resolve(__dirname, 'front');
app.use(express.static(root));
app.use(fallback('index.html', { root: root }))

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

http.listen(port, function(){
  console.log('listening on *:' + port);
});

