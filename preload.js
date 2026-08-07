const { contextBridge, ipcRenderer } = require('electron');

// ئاسایشی contextIsolation/nodeIntegration هەروەک خۆی دەمێنێتەوە — لێرە تەنیا
// دوو فەنکشنی زۆر سادە و سنووردار دەخەینە بەردەست لای لاپەڕەکە (renderer)، هیچ شتێکی
// تری Node.js یان فایل سیستەم لە بەردەست نانرێت.
contextBridge.exposeInMainWorld('updaterAPI', {
    // بانگکردنی ئەم فەنکشنە لە index.html -> داوای پشکنینی نوێکاری دەکات لە main.js
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),

    // بۆ وەرگرتنی هەواڵی دۆخی نوێکاری (checking / available / not-available / downloading / downloaded / error)
    onUpdateStatus: (callback) => {
        ipcRenderer.on('update-status', (event, data) => callback(data));
    }
});
