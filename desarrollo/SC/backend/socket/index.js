module.exports = (io) => {
  io.on('connection', socket => {
    console.log(`${socket.id} has entered`);
    socket.on('disconnect', () => {
      console.log(`${socket.id} has left`);
    })
    socket.on('join', data => {
      socket.join(data.room);
      console.log(`${socket.id} has entered to ${data.room}`)
      socket.broadcast.to(data.room).emit('join', {
        socket: socket.id,
        room: data.room
      });
    });
    socket.on('updateChat', data => {
      socket.broadcast.to(data.room).emit('updateChat', {
        chat: data.chat,
        room: data.room
      });
    });
    socket.on('addMessage', data => {
      socket.broadcast.to(data.room).emit('addMessage', {
        message: data.message,
        room: data.room
      })
    })
  });
}
