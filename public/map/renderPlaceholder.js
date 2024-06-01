import { canvas, ctx } from './graphics.js';

/**
 * @param {boolean} isMissingLocation
 */
export const renderPlaceholder = (isMissingLocation) => {
  ctx.save()

  ctx.fillStyle = '#222222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#FFFFFF';
  ctx.font      = 'bold 47px Arial';
  ctx.textAlign = "center";

  if (isMissingLocation) {
    ctx.fillText('Vehicle location', canvas.width / 2, canvas.height / 2-25);
    ctx.fillText('not found',        canvas.width / 2, canvas.height / 2+25);
  } else {
    ctx.fillText('Game',         canvas.width / 2, canvas.height / 2-25);
    ctx.fillText('disconnected', canvas.width / 2, canvas.height / 2+25);
  }

  ctx.restore();
}