import { canvas, ctx } from './graphics.js';
import { renderMap } from './renderMap.js';
import { renderTruck } from './renderTruck.js';
import { renderPlaceholder } from './renderPlaceholder.js';
import { data } from './data.js';

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!data.telemetry || !data.telemetry.isConnect) {
    renderPlaceholder(false);
  } else if (!data.isLocated) {
    renderPlaceholder(true);
  } else {
    renderMap(data.mapPos);
    renderTruck(data.telemetry.truck.heading);
  }

  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);