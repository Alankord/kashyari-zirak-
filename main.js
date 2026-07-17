const { app, BrowserWindow, ipcMain, dialog, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// Windows 7 compatibility settings
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('disable-features', 'VizDisplayCompositor');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    title: 'کاشێری زیرەک - SMART POS',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    show: false,
    // Windows 7 compatibility: disable hardware acceleration for older GPUs
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false,
      // Windows 7: software rendering for compatibility
      offscreen: false
    },
    rtl: true,
    // Windows 7: disable transparency effects
    transparent: false,
    backgroundColor: '#0D1117'
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'file:') {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

function createMenu() {
  const template = [
    {
      label: 'فایل',
      submenu: [
        {
          label: 'چاپکردن',
          accelerator: 'Ctrl+P',
          click: () => {
            if (mainWindow) mainWindow.webContents.print();
          }
        },
        { type: 'separator' },
        {
          label: 'داخستن',
          accelerator: 'Alt+F4',
          click: () => { app.quit(); }
        }
      ]
    },
    {
      label: 'بینین',
      submenu: [
        { role: 'reload', label: 'نوێکردنەوە' },
        { role: 'forceReload', label: 'نوێکردنەوەی تەواو' },
        { type: 'separator' },
        {
          label: 'تەواو شاشە',
          accelerator: 'F11',
          click: () => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        },
        { type: 'separator' },
        { role: 'zoomIn', label: 'گەورەکردن' },
        { role: 'zoomOut', label: 'بچووککردن' },
        { role: 'resetZoom', label: 'قەبارەی سەرەتایی' }
      ]
    },
    {
      label: 'یارمەتی',
      submenu: [
        {
          label: 'دەربارە',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'دەربارە',
              message: 'کاشێری زیرەک - SMART POS',
              detail: 'وەشان 1.0.0\nسیستەمی فرۆشتنی زیرەک\n١٠٠٪ ئۆفلاین\nWindows 7 Compatible',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers
ipcMain.handle('export-data', async (event, data, filename) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    defaultPath: filename,
    filters: [
      { name: 'CSV files', extensions: ['csv'] },
      { name: 'JSON files', extensions: ['json'] },
      { name: 'All files', extensions: ['*'] }
    ]
  });
  if (filePath) {
    fs.writeFileSync(filePath, data, 'utf8');
    return { success: true, path: filePath };
  }
  return { success: false };
});

ipcMain.handle('import-data', async () => {
  const { filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'CSV files', extensions: ['csv'] },
      { name: 'JSON files', extensions: ['json'] },
      { name: 'All files', extensions: ['*'] }
    ]
  });
  if (filePaths && filePaths.length > 0) {
    const data = fs.readFileSync(filePaths[0], 'utf8');
    return { success: true, data, path: filePaths[0] };
  }
  return { success: false };
});
