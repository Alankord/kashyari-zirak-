# 🪟 ڕێنمایی ویندۆز ٧ - کاشێری زیرەک

> ⚠️ **گرنگ:** Electron ٢٢ دوایین وەشانە کە پشتگیری ویندۆز ٧/٨/٨.١ دەکات.
> وەشانی نوێتر (٢٣+) تەنها ویندۆز ١٠/١١ پشتگیری دەکات.

---

## 📋 پێداویستییەکانی ویندۆز ٧

| پێداویستی | لانیکەم |
|-----------|---------|
| Windows | 7 SP1 (Service Pack 1) |
| .NET Framework | 4.5+ |
| RAM | 2 GB |
| Disk | 150 MB |
| Processor | x86 (32-bit) یان x64 (64-bit) |

---

## 🔧 هەڵبژاردنی وەشان

### بۆ ویندۆز ٧ (٣٢-bit یان ٦٤-bit):
```bash
npm install
cd kashyari-zirak-electron
npm install electron@22.3.27 --save-dev
npm run build-win
```

### بۆ ویندۆز ١٠/١١ (نوێترین وەشان):
```bash
npm install
cd kashyari-zirak-electron
npm install electron@28.0.0 --save-dev
npm run build-win
```

---

## 🚀 ڕێگاکانی دامەزراندن لە ویندۆز ٧

### ڕێگای ١: Portable (باشترین بۆ ویندۆز ٧)

```bash
cd kashyari-zirak-electron
npm install
npm run build-win-portable
```

**ئەنجام:** `dist/کاشێری-زیرەک-Portable-1.0.0-ia32.exe`
- بەبێ دامەzrاندن کار دەکات
- دەتوانی لە USB بخەیت
- هیچ ڕێگەپێدانێک پێویست نییە

### ڕێگای ٢: Installer (.exe)

```bash
cd kashyari-zirak-electron
npm install
npm run build-win
```

**ئەنجام:** `dist/کاشێری-زیرەک-Setup-1.0.0-ia32.exe`
- دامەزراندنی ڕاستەقینە
- Shortcut لە Desktop و Start Menu
- Uninstall لە Control Panel

### ڕێگای ٣: ZIP (بەبێ دامەzrاندن)

```bash
cd kashyari-zirak-electron
npm install
npm run build-win-zip
```

**ئەنجام:** `dist/کاشێری-زیرەک-1.0.0-ia32-win.zip`
- فۆڵدەر بکەرەوە
- `کاشێری زیرەک.exe` دووجار کلیک بکە

---

## ⚡ خێراترین ڕێگا (بەبێ Node.js دانەمەزراندن)

ئەگەر Node.js ناتوانیت دابمەزرێنیت لە ویندۆز ٧:

1. **لە کۆمپیوتەرێکی نوێتر (ویندۆز ١٠/١١):**
   ```bash
   cd kashyari-zirak-electron
   npm install
   npm run build-win
   ```

2. **فایلە دروستکراوەکان بگوازەرەوە بۆ ویندۆز ٧:**
   - `dist/کاشێری-زیرەک-Portable-1.0.0-ia32.exe`
   - یان `dist/کاشێری-زیرەک-Setup-1.0.0-ia32.exe`

3. **لە ویندۆز ٧ دووجار کلیک بکە و بەکاربهێنە!**

---

## 🛠️ چارەسەرکردنی کێشەکانی ویندۆز ٧

### کێشە ١: "The program can't start because..."
**هۆکار:** Visual C++ Redistributable نییە
**چارەسەر:**
1. دابمەزرێنە: https://aka.ms/vs/17/release/vc_redist.x86.exe
2. دووبارە هەوڵبدە

### کێشە ٢: "A JavaScript error occurred..."
**هۆکار:** .NET Framework کۆنە
**چارەسەر:**
1. Windows Update بکە
2. .NET Framework 4.8 دابمەزرێنە

### کێشە ٣: بەرنامە هێواشە یان فریز دەکات
**هۆکار:** Hardware acceleration لە ویندۆز ٧
**چارەسەر:** (پێشتر لە main.js چاککراوە)
- GPU-ی کۆنە؟ `--disable-gpu` لە shortcut زیاد بکە:
  ```
  "C:\Program Files\کاشێری زیرەک\کاشێری زیرەک.exe" --disable-gpu
  ```

### کێشە ٤: "npm install" سەرنەکەوت
**هۆکار:** Node.js کۆنە یان Python پێویستە
**چارەسەر:**
```bash
# Node.js 16.20.2 (دوایین وەشان بۆ ویندۆز ٧)
# دابمەزرێنە: https://nodejs.org/dist/v16.20.2/

# دواتر:
npm config set python python2.7
npm install --legacy-peer-deps
```

---

## 📁 شوێنی پاشەکەوتکردنی داتا لە ویندۆز ٧

```
C:\Users\[ناوی بەکارهێنەر]\AppData\Roaming\kashyari-zirak
```

**بۆ گواستنەوەی داتا:**
1. CSV Export بکە لە بەرنامەکە
2. فایلەکە بگوازەرەوە
3. CSV Import بکە لە کۆمپیوتەری تر

---

## 💾 پێشنیاری سەختامێر بۆ ویندۆز ٧

| بەش | پێشنیار |
|-----|---------|
| CPU | Intel Core 2 Duo یان باشتر |
| RAM | 4 GB |
| GPU | DirectX 9.0c compatible |
| Disk | 500 MB بۆشایی |
| Display | 1366x768 یان باشتر |

---

## ✅ تایبەتمەندییەکانی ویندۆز ٧

- ✅ کارکردن بەبێ ئینتەرنێت
- ✅ سکانەری بارکۆد بە کامێرا
- ✅ چاپکردنی پسوولە
- ✅ CSV Export/Import
- ✅ ٣٢-bit و ٦٤-bit هەردووکی
- ✅ Portable version (بەبێ دامەزراندن)
- ❌ Windows Store (تەنها ویندۆز ١٠+)
- ❌ Auto-updates (پێویستە بە دەستی نوێ بکەیتەوە)

---

## 📞 پشتگیری ویندۆز ٧

ئەگەر هەر کێشەیەکت هەبوو:
1. **Node.js 16** دڵنیابەرەوە دامەزراوە
2. **Windows 7 SP1** دڵنیابەرەوە دامەزراوە
3. **Visual C++ Redistributable** دابمەزرێنە
4. یان بەکاربهێنە: **Portable version** (کەمترین کێشە)
