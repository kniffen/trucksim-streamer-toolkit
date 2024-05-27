import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.webContents.openDevTools(); // TODO: Enable this only when running in dev mode
  win.loadFile(path.join(__dirname, "../index.html"));
}

app.whenReady().then(() => {
  createWindow();
});