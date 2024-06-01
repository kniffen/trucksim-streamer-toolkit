const express   = require('express');
const expressWs = require('express-ws');

expressWs(express());

export const router = express.Router();

router.ws('/', (ws, req) => {
  ws.on('message', (message) => {
    console.log(message);
  })
});

