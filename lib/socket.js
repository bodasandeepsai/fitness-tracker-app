// lib/socket.js
import { Server } from 'socket.io';

let io;

export default function SocketHandler(req, res) {
  if (!io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('A user connected');
    });
  }
  res.end();
}