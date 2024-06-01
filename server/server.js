const path    = require('node:path');
const crypto  = require('node:crypto');
const express = require('express');
const ws      = require('ws');
const tst     = require('trucksim-telemetry');

const app      = express();
const wsServer = new ws.Server({ noServer: true });
// @ts-ignore
const telemetry = tst();

app.use(express.static(path.resolve(__dirname, '../public')));

const sockets = new Map()
wsServer.on('connection', (socket) => {
  const id = crypto.randomUUID();
  sockets.set(id, socket);

  socket.on('close', () => {
    sockets.delete(id);
  });
})

const server = app.listen(3000, () => console.log('Server listening on port 3000')); //TODO: find open port
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

let isConnect = false;
telemetry.game.on('connected',    () => {
  isConnect = true;
  if (socketData) {
    socketData.isConnect = isConnect
    sockets.forEach((socket) => socket.send(JSON.stringify(socketData)));
  }
});
telemetry.game.on('disconnected', () => {
  isConnect = false;
  if (socketData) {
    socketData.isConnect = isConnect
    sockets.forEach((socket) => socket.send(JSON.stringify(socketData)));
  }
});

/**
 * @typedef {object} SocketData
 * @prop {boolean} isConnect
 * @prop {{id: number; name: string}} game
 * @prop {{
 *   pos: number[];
 *   heading: number;
 *   speed: number;
 *   gear: number;
 * }} truck
 * @prop {number} wheelPosition
 * @prop {number} clutchPosition
 * @prop {number} brakePosition
 * @prop {number} throttlePosition
 */

/** @type {SocketData} */
let socketData;

telemetry.watch({interval: 1000/30}, (/** @type {import('trucksim-telemetry').TelemetryData} */ data) => {
  socketData = {
    isConnect,
    game: data.game.game,
    truck: {
      pos: [
        data.truck.position.X,
        data.truck.position.Z,
      ],
      heading: data.truck.orientation.heading,
      speed:   data.truck.speed.value,
      gear:    data.truck.transmission.gear.selected
    },
    wheelPosition:    data.controls.input.steering,
    clutchPosition:   data.controls.input.clutch,
    brakePosition:    data.controls.input.brake,
    throttlePosition: data.controls.input.throttle,
  }

  sockets.forEach((socket) => socket.send(JSON.stringify(socketData)));
});

module.exports = {
  sockets,
  server
}
