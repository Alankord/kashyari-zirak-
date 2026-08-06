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
      contextIsolation: true
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

  const zoomIn = () => {
    const zoom = mainWindow.webContents.getZoomFactor();
    mainWindow.webContents.setZoomFactor(Math.min(zoom + 0.1, 3.0));
  };

  const zoomOut = () => {
    const zoom = mainWindow.webContents.getZoomFactor();
    mainWindow.webContents.setZoomFactor(Math.max(zoom - 0.1, 0.5));
  };

  const zoomReset = () => {
    mainWindow.webContents.setZoomFactor(1.0);
  };

  globalShortcut.register('CommandOrControl+=', zoomIn);
  globalShortcut.register('CommandOrControl+Plus', zoomIn);
  globalShortcut.register('CommandOrControl+numadd', zoomIn);
  globalShortcut.register('CommandOrControl+-', zoomOut);
  globalShortcut.register('CommandOrControl+numsub', zoomOut);
  globalShortcut.register('CommandOrControl+0', zoomReset);
  globalShortcut.register('CommandOrControl+num0', zoomReset);

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
