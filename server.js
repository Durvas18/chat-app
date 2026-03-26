const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const users = {}; // socket.id -> username

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    users[socket.id] = username;
    io.emit('system', `${username} joined the chat`);
    io.emit('user_count', Object.keys(users).length);
  });

  socket.on('chat_message', (msg) => {
    const username = users[socket.id] || 'Anonymous';
    io.emit('chat_message', { username, msg, time: new Date().toLocaleTimeString() });
  });

  socket.on('typing', () => {
    const username = users[socket.id];
    socket.broadcast.emit('typing', username);
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];
    if (username) io.emit('system', `${username} left the chat`);
    io.emit('user_count', Object.keys(users).length);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
