import { tiles, tileMapInfo } from './tiles.js';
import { canvas, ctx } from './graphics.js'

/**
 * @param {number[]} pos
 */
export const renderMap = (pos) => {
  const [x, y] = pos;
  const offsetX = (x - Math.floor(x));
  const offsetY = (y - Math.floor(y));
  const tileSize = tileMapInfo.tileSize;

  ctx.save()
  ctx.translate(
    canvas.width  / 2,
    canvas.height / 2
  );

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const tile = tiles[dy+1][dx+1];

      ctx.drawImage(
        tile.img,
        Math.floor((dx * tileSize) -(offsetX * tileSize)),
        Math.floor((dy * tileSize) -(offsetY * tileSize)),
        tileSize,
        tileSize
      );
    }
  }

  ctx.restore();
}