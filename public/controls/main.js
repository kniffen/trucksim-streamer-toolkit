const wheel    = document.getElementById('wheel');
const clutch   = document.getElementById('clutch');
const brake    = document.getElementById('brake');
const throttle = document.getElementById('throttle');

const socket = new WebSocket(`ws://${location.host}`);
socket.addEventListener('message', (message) => {
  /** @type {import('../../server/server').SocketData} */
  const telemetry = JSON.parse(message.data);

  if (wheel) wheel.style.transform = `rotate(${450 * telemetry.wheelPosition * -1}deg)`;

  if (clutch)   clutch.style.height   = `${100 * telemetry.clutchPosition}%`;
  if (brake)    brake.style.height    = `${100 * telemetry.brakePosition}%`;
  if (throttle) throttle.style.height = `${100 * telemetry.throttlePosition}%`;
});