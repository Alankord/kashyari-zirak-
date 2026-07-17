!macro customInstall
  ; Create desktop shortcut
  CreateShortcut "$DESKTOP\کاشێری زیرەک.lnk" "$INSTDIR\کاشێری زیرەک.exe" "" "$INSTDIR\resources\assets\icon.ico" 0

  ; Create Start Menu shortcut
  CreateDirectory "$SMPROGRAMS\کاشێری زیرەک"
  CreateShortcut "$SMPROGRAMS\کاشێری زیرەک\کاشێری زیرەک.lnk" "$INSTDIR\کاشێری زیرەک.exe" "" "$INSTDIR\resources\assets\icon.ico" 0
  CreateShortcut "$SMPROGRAMS\کاشێری زیرەک\لابردن.lnk" "$INSTDIR\Uninstall کاشێری زیرەک.exe"
!macroend

!macro customUnInstall
  ; Remove shortcuts
  Delete "$DESKTOP\کاشێری زیرەک.lnk"
  Delete "$SMPROGRAMS\کاشێری زیرەک\کاشێری زیرەک.lnk"
  Delete "$SMPROGRAMS\کاشێری زیرەک\لابردن.lnk"
  RMDir "$SMPROGRAMS\کاشێری زیرەک"
!macroend
