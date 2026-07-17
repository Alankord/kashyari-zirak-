const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  exportData: (data, filename) => ipcRenderer.invoke('export-data', data, filename),
  importData: () => ipcRenderer.invoke('import-data'),

  // App info
  platform: process.platform,
  versions: {
    node: process.versions.node,
    electron: process.versions.electron,
    chrome: process.versions.chrome
  }
});

// Notify renderer that Electron is ready
window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-electron', 'true');
});
