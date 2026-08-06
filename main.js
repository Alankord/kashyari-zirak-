const { app, BrowserWindow, Menu, dialog, globalShortcut } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      zoomFactor: 1.0
    }
  });

  Menu.setApplicationMenu(null);
  mainWindow.setFullScreen(true);
  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(1.0);
  });
}

app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();

  globalShortcut.register('CommandOrControl+=', () => {
    const zoom = mainWindow.webContents.getZoomFactor();
    mainWindow.webContents.setZoomFactor(Math.min(zoom + 0.1, 3.0));
  });

  globalShortcut.register('CommandOrControl+-', () => {
    const zoom = mainWindow.webContents.getZoomFactor();
    mainWindow.webContents.setZoomFactor(Math.max(zoom - 0.1, 0.5));
  });

  globalShortcut.register('F11', () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });

  globalShortcut.register('Escape', () => {
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
    }
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'وەشانی نوێ',
    message: 'وەشانێکی نوێ دابەزێنرا. پرۆگرامەکە دادەخرێتەوە بۆ دامەزراندنی نوێکردنەوەکە.',
    buttons: ['باشە']
  }).then(() => {
    autoUpdater.quitAndInstall();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
