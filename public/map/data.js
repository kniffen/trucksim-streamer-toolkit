import { tileMapInfo, updateTiles } from './tiles.js';

/**
 * @typedef {object} Data
 * @prop {boolean} isLocated
 * @prop {number[]} mapPos
 * @prop {import('../../server/server').SocketData | null} telemetry
 */

/** @type {Data} */
export const data = {
  isLocated: false,
  mapPos: [0, 0],
  telemetry: null
}

const socket = new WebSocket(`ws://${location.host}`);
socket.addEventListener('message', (message) => {
  /** @type {import('../../server/server').SocketData} */
  const telemetry = JSON.parse(message.data);
  const game = telemetry.game.name;

  if ('ets2' !== game && 'ats' !== game) return
  const mapInfo = tileMapInfo.map[game];
  const tileSizeCoords = (mapInfo.x2 - mapInfo.x1) / tileMapInfo.columns;

  data.isLocated = telemetry.truck.pos[0] !== 0 && telemetry.truck.pos[1] !== 0 && telemetry.isConnect
  data.mapPos[0] = (telemetry.truck.pos[0] - mapInfo.x1) / tileSizeCoords;
  data.mapPos[1] = (telemetry.truck.pos[1] - mapInfo.y1) / tileSizeCoords;
  data.telemetry = telemetry;

  updateTiles(data);
});