const { app, BrowserWindow, Menu, dialog, globalShortcut, ipcMain } = require('electron');
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
  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(1.0);
    mainWindow.setFullScreen(true);
  });

  mainWindow.on('enter-full-screen', () => {
    setTimeout(() => {
      mainWindow.webContents.executeJavaScript('window.dispatchEvent(new Event("resize"));');
    }, 100);
  });
}

app.whenReady().then(() => {
  createWindow();
  // تێبینی: هیچ پشکنینی خۆکاری نوێکاری لێرە نییە چیتر (پێشتر autoUpdater.checkForUpdatesAndNotify()
  // بوو کە لە کردنەوەی بەرنامەدا خۆکارانە دەیکرد). ئێستا تەنیا کاتێک بەکارهێنەر خۆی دوگمەی
  // "پشکنین بۆ نوێکاری" دەگرێتەوە (لە ڕێکخستنەکاندا) پشکنین دەکرێت — بۆ ئەوەی بارگرانی
  // سەر کۆمپیوتەر/ئینتەرنێتی هێواش کەمبکرێتەوە.

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

// ==================== پشکنینی نوێکاری بەدەستی (کلیک-کراو) ====================
// ئێستا تەنیا کاتێک لاپەڕەکە (renderer) داوای پشکنین دەکات (دوگمەی "پشکنین بۆ نوێکاری")،
// پشکنین دەکرێت — نەک خۆکارانە لە کردنەوەی بەرنامەدا.
let _checkingUpdate = false;

ipcMain.handle('check-for-updates', async () => {
  if (_checkingUpdate) return { status: 'already-checking' };
  _checkingUpdate = true;
  try {
    mainWindow.webContents.send('update-status', { status: 'checking' });
    await autoUpdater.checkForUpdates();
    return { status: 'ok' };
  } catch (err) {
    mainWindow.webContents.send('update-status', { status: 'error', message: err.message });
    return { status: 'error', message: err.message };
  } finally {
    _checkingUpdate = false;
  }
});

autoUpdater.on('update-available', (info) => {
  mainWindow.webContents.send('update-status', { status: 'available', version: info.version });
});

autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('update-status', { status: 'not-available' });
});

autoUpdater.on('error', (err) => {
  mainWindow.webContents.send('update-status', { status: 'error', message: err == null ? 'نەزانراو' : err.message });
});

autoUpdater.on('download-progress', (progress) => {
  mainWindow.webContents.send('update-status', { status: 'downloading', percent: Math.round(progress.percent) });
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update-status', { status: 'downloaded' });
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
