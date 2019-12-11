# MedSpa - React Native App

This app is th react native one using Firebase Realtime Database.

### Pre-Requisites
1. MacOS Mojave 10.14.3 or above
1. [Git](https://git-scm.com/)
1. Android Studio
1. Xcode
   To test the app on physical device, You'll need an [Apple Developer Account](https://developer.apple.com/)
1. [CocoaPods](https://cocoapods.org)
1. [Node.js® and NPM](https://treehouse.github.io/installation-guides/mac/node-mac.html)
1. [React Native CLI](https://facebook.github.io/react-native/docs/getting-started)

### Getting Started

Clone the repository in your pc using git.
```sh
$ git clone https://github.com/superdev115/MedSpa.git
$ cd MedSpa
```
Install node packages
```sh
$ npm install
```
Install pod files for iOS Project.
```sh
$ cd ios
$ pod install
$ cd ..
```

### Run the application
Run the application on Android Platform
```sh
$ react-native run-android
```
Run the application on iOS Platform
```sh
$ react-native run-ios
```

### Make the executable files(APK & IPA)
1. Make signed APK file
    ```sh
    $ cd android
    $ ./gradlew assembleRelease
    $ cd ..
    ```

### Contributing

### Authors

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

