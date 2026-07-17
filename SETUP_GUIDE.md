# 🏪 ڕێنمایی دامەزراندنی کاشێری زیرەک - Electron

## 📋 پێداویستییەکان

- **Node.js** 18+ (https://nodejs.org)
- **Windows 10/11** یان **macOS 10.15+** یان **Linux**
- **RAM**: لانیکەم 4GB
- **Disk**: لانیکەم 200MB بۆ دامەزراندن

---

## 🚀 ڕێگای ١: بەکارهێنان بەبێ دامەزراندن (خێراترین)

### Windows:
```
1. فۆڵدەری "kashyari-zirak-electron" بکەرەوە
2. دووجار کلیک لەسەر "start.bat" بکە
3. چاوەڕێی دابەزاندنی پێداویستییەکان بکە (یەکەم جار)
4. بەرنامەکە دەکرێتەوە!
```

### macOS / Linux:
```bash
cd kashyari-zirak-electron
chmod +x start.sh
./start.sh
```

---

## 📦 ڕێگای ٢: دروستکردنی فایلی دامەزراندن (.exe / .dmg / .AppImage)

### Windows Installer (.exe):
```bash
# ١. بچۆ بۆ فۆڵدەر
cd kashyari-zirak-electron

# ٢. دابمەزرێنە
npm install

# ٣. دروستکردن
npm run build-win

# ٤. فایلەکە لە "dist" دەیبینیت:
#    "کاشێری-زیرەک Setup 1.0.0.exe"
```

یان تەنها دووجار کلیک لەسەر `build-windows.bat` بکە!

### macOS (.dmg):
```bash
cd kashyari-zirak-electron
npm install
npm run build-mac
# فایلەکە: dist/کاشێری-زیرەک-1.0.0.dmg
```

### Linux (.AppImage / .deb):
```bash
cd kashyari-zirak-electron
npm install
npm run build-linux
# فایلەکان: dist/*.AppImage یان dist/*.deb
```

---

## ⚡ ڕێگای ٣: Portable (بەبێ دامەزراندن - Windows)

```bash
npm install
npm run build-win
# فایلی "کاشێری-زیرەک-Portable-1.0.0-x64.exe" لە "dist" دەیبینیت
```

ئەم فایلە دەتوانیت لە USB یان هەر شوێنێک بەکاربهێنیت بەبێ دامەزراندن!

---

## 🔧 ڕێگای ٤: Development (بۆ گۆڕین و باشکردن)

```bash
# ١. دابمەزرێنە
npm install

# ٢. دەستپێکردن بە DevTools (چاککردن)
npm start
# دوگمەی F12 بەکاربهێنە بۆ DevTools
```

---

## 📁 پێکهاتەی فۆڵدەر

```
kashyari-zirak-electron/
├── 📄 index.html          ← بەرنامەی سەرەکی (HTML/CSS/JS)
├── 📄 main.js             ← Electron Main Process
├── 📄 preload.js          ← Secure Bridge
├── 📄 package.json        ← پێداویستییەکان و ڕێکخستن
├── 📄 installer.nsh       ← ڕێکخستنی دامەزراندن
├── 📄 LICENSE.txt         ← مافی بەکارهێنان
├── 📄 README.md           ← ڕێنمایی
├── 📁 assets/
│   ├── 🎨 icon.svg        ← ئایکۆنی SVG
│   ├── 🎨 icon.ico        ← ئایکۆنی Windows (دروستی بکە)
│   ├── 🎨 icon.icns       ← ئایکۆنی macOS (دروستی بکە)
│   └── 📄 ICON_CONVERSION.md
├── 📄 start.bat           ← دەستپێکردنی خێرا (Windows)
├── 📄 start.sh            ← دەستپێکردنی خێرا (Mac/Linux)
├── 📄 build-windows.bat   ← دروستکردنی Windows
├── 📄 build.sh            ← دروستکردنی هەموو سیستەمەکان
└── 📄 .gitignore
```

---

## 🎯 دوای دامەزراندن

### لە Windows:
- **Start Menu** → "کاشێری زیرەک"
- **Desktop** → دوگمەی "کاشێری زیرەک"
- **Uninstall** → Control Panel → Programs

### لە macOS:
- **Applications** → "کاشێری زیرەک"
- **Uninstall** → Drag to Trash

### لە Linux:
- **AppImage**: دووجار کلیک بکە
- **deb**: `sudo apt remove kashyari-zirak`

---

## ⚠️ ئاگاداری پاراستنی داتا

> **گرنگ:** داتاکان لەم شوێنانە پاشەکەوت دەبن:
> 
> **Windows:** `C:\Users\[ناو]\AppData\Roaming\kashyari-zirak`
> **macOS:** `~/Library/Application Support/kashyari-zirak`
> **Linux:** `~/.config/kashyari-zirak`
>
> بۆ گواستنەوەی داتا بۆ کۆمپیوتەرێکی تر:
> 1. CSV Export بکە لە بەرنامەکە
> 2. فایلەکە بگوازەرەوە
> 3. CSV Import بکە لە کۆمپیوتەری نوێ

---

## 🆘 چارەسەرکردنی کێشەکان

| کێشە | چارەسەر |
|------|---------|
| "npm not found" | Node.js دابمەزرێنە: https://nodejs.org |
| "Cannot find module" | `npm install` دووبارە بکە |
| بەرنامە ناکرێتەوە | `npm start` لە Terminal بەکاربهێنە بۆ بینینی هەڵە |
| Icon نیشان نادات | فایلی `icon.ico` لە `assets/` دابنێ |
| Build سەرنەکەوت | `npm install --force` دووبارە بکە |

---

## 📞 پشتگیری

ئەگەر هەر کێشەیەکت هەبوو، فایلی `index.html` ڕاستەوخۆ لە browser بکەرەوە وەک چارەسەرێکی خێرا.

**بەرنامەکە ١٠٠٪ ئۆفلاینە و هیچ ئینتەرنێت پێویست نییە!**
