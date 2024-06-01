const { app, BrowserWindow } = require('electron');
const path = require('node:path');
require('./server/server.js');

const createWindow = () => {
  const win = new BrowserWindow({
    width:  800,
    height: 600,
  });

  win.webContents.openDevTools(); // TODO: Enable this only when running in dev mode
  win.loadFile(path.resolve(__dirname, './index.html'));
}

app.whenReady().then(() => {
  createWindow();
});
