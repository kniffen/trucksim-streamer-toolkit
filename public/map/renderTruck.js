import { canvas, ctx } from './graphics.js';

/**
 * @param {number} heading
 */
export const renderTruck = (heading) => {
  ctx.save()
  ctx.translate(
    canvas.width / 2,
    canvas.height / 2
  );

  // TODO: Add ability to use custom image for the truck

  // truck
  ctx.fillStyle = '#3498db';
  ctx.beginPath();
  ctx.rotate((heading * -360 * Math.PI)/180)
  ctx.fillRect(
    -5,
    -15,
    10,
    30
  );

  // Cabin
  ctx.fillStyle = '#3053bf';
  ctx.beginPath();
  ctx.fillRect(
    -5,
    -15,
    10,
    10
  );

  ctx.restore();
}