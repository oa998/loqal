add push notifications:

```
npm install @capacitor/push-notifications
npx cap sync
```

copy over changes to the android build:

```
ionic capacitor copy android
```

open in android studio

```
ionic capacitor open android
```

1. run `ionic serve` in one tab
2. run the the android build in Android Studio
3. can use chrome://inspect to see the token.
