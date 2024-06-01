export const tileMapInfo = {
  rows:    256,
  columns: 256,
  maxX: 131072,
  maxY: 131072,
  tileSize: 512,
  map: {
    ets2: {
      x1: -94621.8047,
      x2:  79370.13,
      y1: -80209.1641,
      y2:  93782.77,
    },
    ats: {
      x1: -127721.344,
      x2:   20049.6563,
      y1:  -72181.5,
      y2:   75589.5,
    }
  }
}

const createTile = () => {
  const img = document.createElement('img');

  img.width  = tileMapInfo.tileSize;
  img.height = tileMapInfo.tileSize;
  img.src    = '/assets/tiles/default.png';

  return {
    img
  };
}

export const tiles = [
  [createTile(), createTile(), createTile()],
  [createTile(), createTile(), createTile()],
  [createTile(), createTile(), createTile()],
]

/**
 * @param {import('./data').Data} data
 */
export const updateTiles = (data) => {
  if (!data.telemetry) return;

  const [ x, y ] = data.mapPos;
  const game = data.telemetry.game.name;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const tile   = tiles[dy+1][dx+1];
      const column = Math.floor(x) + dx
      const row    = Math.floor(y) + dy
      const src    = `/assets/tiles/${game}/${column}/${row}.png`;

      if (!tile.img.src.endsWith(src)) tile.img.src = src;
    }
  }
}
