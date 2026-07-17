# ☁️ دروستکردنی بەرنامە بە تەواوی ئۆنلاین (بەبێ کۆمپیوتەر!)

## 🎯 چی پێویستە:
- ئەکاونتی GitHub (ئازادە)
- ٥ خولەک کات
- هیچ دانەمەزراندنێک!

---

## 🚀 ڕێگای ١: GitHub Actions (پێشنیارکراو)

### ١. ئەکاونتی GitHub دروستبکە
https://github.com/signup (ئازادە)

### ٢. Repository دروستبکە
1. بچۆ بۆ https://github.com/new
2. ناو بنووسە: `kashyari-zirak`
3. کلیک لەسەر "Create repository"

### ٣. فایلەکان بەرزبکەرەوە
1. لە ڕێگای "uploading an existing file"
2. هەموو فایلەکانی `kashyari-zirak-electron` بەرزبکەرەوە
3. Commit message: "Initial commit"
4. "Commit changes"

### ٤. چاوەڕێبە — خۆکارانە دروستدەبێت!
1. بچۆ بۆ "Actions" tab
2. دوای ٥-١٠ خولەک، build تەواودەبێت
3. بچۆ بۆ "Artifacts" — فایلی `.exe` ئامادەیە!

### ٥. Download بکە
- `Kashyari-Zirak-Portable-Windows7-32bit` ← باشترین بۆ ویندۆز ٧
- `Kashyari-Zirak-Installer-Windows` ← دامەzrاندنی ڕاستەقینە

---

## 🚀 ڕێگای ٢: GitHub Desktop (ئاسانتر)

### ١. GitHub Desktop دابمەزرێنە
https://desktop.github.com/

### ٢. Repository دروستبکە
1. "File" → "New repository"
2. ناو: `kashyari-zirak`
3. "Create repository"

### ٣. فایلەکان دابنێ
1. هەموو فایلەکانی `kashyari-zirak-electron` بخە ناو فۆڵدەرەکە
2. GitHub Desktop → commit → push

### ٤. Actions چاوەڕێبکە
1. بچۆ بۆ github.com → repository → Actions
2. دوای ٥-١٠ خولەک، فایلەکان ئامادەن

---

## 🚀 ڕێگای ٣: Direct Download (باشترین!)

### ئەگەر من (developer) repository دروستبکەم:

تەنیا ئەم لینکە بەکاربهێنە:
```
https://github.com/YOUR-USERNAME/kashyari-zirak/actions
```

یان Releases:
```
https://github.com/YOUR-USERNAME/kashyari-zirak/releases
```

---

## 📦 ئەنجامەکان

| فایل | باشە بۆ | قەبارە |
|------|---------|--------|
| Portable-32bit.exe | ویندۆز ٧ (٣٢-bit) | ~80 MB |
| Portable-64bit.exe | ویندۆز ١٠/١١ | ~85 MB |
| Setup-32bit.exe | دامەzrاندنی ویندۆز ٧ | ~85 MB |
| Setup-64bit.exe | دامەzrاندنی ویندۆز ١٠/١١ | ~90 MB |

---

## ⚡ خێراترین ڕێگا

> **تەنیا ٣ هەنگاو:**
> 1. Repository دروستبکە (٢ خولەک)
> 2. فایلەکان بەرزبکەرەوە (٢ خولەک)
> 3. Download بکە (١ خولەک)

**هیچ دانەمەزراندنێک — هیچ command prompt — هیچ Node.js!**

---

## 🆘 ئەگەر کێشە هەبوو

### "Actions not enabled"
- Repository → Settings → Actions → General → "Allow all actions"

### "Build failed"
- Bchwo Actions → click on failed build → check logs
- Usually: missing icon file → create `assets/icon.ico`

### "Can't find artifacts"
- Wait 10 minutes
- Refresh page
- Check "Summary" page

---

## 🎉 دوای Download

1. فایلی `.exe` download بکە
2. Double-click بکە
3. کار دەکات! 🎉

**Portable** = بەبێ دامەzrاندن
**Setup** = دامەzrاندنی ڕاستەقینە (Shortcut, Uninstall, etc.)
