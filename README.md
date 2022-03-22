# diegesis-reboot
## Rebuilding the Diegesis App using Ionic 6 and Unfolding Word Proskomma Hooks

```
npm install -g @ionic/cli // If you want ionic tools
npm install
ionic serve // or
npm start
```

## Building for Android (experimental)

```
ionic capacitor copy android
emulator -avd Nexus_6_API_29 // Or some other virtual device
cd android
./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk
```
