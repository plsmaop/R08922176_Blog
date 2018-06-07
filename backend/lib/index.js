'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _userData = require('./userData');

var _userData2 = _interopRequireDefault(_userData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config
var backend = (0, _express2.default)();
var server = _http2.default.Server(backend);
var io = new _socket2.default(server);
var port = process.env.PORT || 3001;

// user data
var userPool = [];
var robot = new _userData2.default('Badass Robot', 'suck');
userPool.push(robot);

// chat history
var chatHistory = {};

// socket.io
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.emit('socket id', socket.id);
  console.log(socket.id);
  socket.emit('user list', userPool);

  socket.on('dickkk', function () {
    console.log('pong');
    socket.emit('dickkk');
  });

  // add new user
  socket.on('add user', function (name) {
    console.log('add a user ' + name + ', id: ' + socket.id);
    var user = new _userData2.default(name, socket.id);
    userPool.push(user);
    io.emit('user list', userPool);
    // socket.handshake.session.save();
  });

  // load chat history
  socket.on('create chat room', function (packet) {
    var id = packet.id,
        targetId = packet.targetId;

    console.log(id + ' wants to chat with ' + targetId);
    var chatHistoryEntry1 = id + targetId;
    var chatHistoryEntry2 = targetId + id;
    if (typeof chatHistory[chatHistoryEntry1] === 'undefined') {
      if (typeof chatHistory[chatHistoryEntry2] !== 'undefined') {
        chatHistory[chatHistoryEntry1] = chatHistory[chatHistoryEntry2];
      } else {
        var chatHistryArray = [];
        chatHistory[chatHistoryEntry1] = chatHistryArray;
        chatHistory[chatHistoryEntry2] = chatHistryArray;
      }
    }
    socket.emit('load chat history', chatHistory[chatHistoryEntry1]);
  });

  // deliver msg
  socket.on('msg', function (msgPacket) {
    var from = msgPacket.from,
        to = msgPacket.to;

    var chatHistoryEntry1 = from + to;
    var chatHistoryEntry2 = to + from;
    if (typeof chatHistory[chatHistoryEntry1] === 'undefined') {
      if (typeof chatHistory[chatHistoryEntry2] !== 'undefined') {
        chatHistory[chatHistoryEntry1] = chatHistory[chatHistoryEntry2];
      } else {
        var chatHistryArray = [];
        chatHistory[chatHistoryEntry1] = chatHistryArray;
        chatHistory[chatHistoryEntry2] = chatHistryArray;
      }
    }
    chatHistory[chatHistoryEntry1].push(msgPacket);
    io.to(from).emit('msg', msgPacket);
    console.log(chatHistory[chatHistoryEntry1]);
    console.log(chatHistory[chatHistoryEntry2]);
    if (to === 'suck') {
      var badAssPacket = {
        from: 'suck',
        to: from,
        msg: 'You Suck!!'
      };
      io.to(from).emit('msg', badAssPacket);
      chatHistory[chatHistoryEntry1].push(badAssPacket);
      return;
    }
    io.to(to).emit('msg', msgPacket);
  });

  socket.on('disconnect', function () {
    console.log('a user go out');
    userPool = userPool.filter(function (user) {
      return user.id !== socket.id;
    });
    io.emit('user list', userPool);
  });
});

// backend.use('/', (req, res) => res.sendFile(__dirname+'/build/index.html'));
backend.use(_express2.default.static(__dirname + '/build'));

server.listen(port, function () {
  return console.log('listen ' + port);
});