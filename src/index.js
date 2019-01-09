import io from 'socket.io-client';

window.onload = function onLoad() {
  const socket = io.connect('http://localhost:8889');

  socket.on('logger', (data) => {
    console.log(22228989);
    console.log(data);
    // document.getElementById('socket').innerHTML = data;
  });
};
