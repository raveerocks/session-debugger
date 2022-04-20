const { app, BrowserWindow } = require('electron');
const { logger } = require('../util/logger');

const frontEndURL = 'http://localhost:3001';
const width = 1300;
const height = 1000;

const createWindow = () => {
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL(frontEndURL);
  logger.info('Desktop application started.');
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
