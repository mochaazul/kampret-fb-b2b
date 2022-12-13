
# React Native Skeleton

This project is a [React Native](https://facebook.github.io/react-native/) skeleton that can be used to kickstart a mobile application.

The skeleton provides **an optimized architecture for building solid cross-platform mobile applications** through separation of concerns between the UI and business logic.

## Requirements

Node 12 or greater is required. Development for iOS requires a Mac and Xcode 10 or up, and will target iOS 11 and up.

You also need to install the dependencies required by React Native.  
Go to the [React Native environment setup](https://reactnative.dev/docs/environment-setup), then select `React Native CLI Quickstart` tab.  
Follow instructions for your given `development OS` and `target OS`.

## Quick start

To create a new project using the boilerplate simply run :

```
git clone https://bitbucket.org/rebelworksco/react-native-skeleton.git
```

Assuming you have all the requirements installed, you can run the project by running:

- `yarn install` to install all depedencies
- `cd ios && pod install` to install all depedencies
- rename env.ts.sample to .env and complete the keys
- `yarn <platform>` to run the *platform* application (remember to start a simulator or connect a device)

## Reactotron

Reactotron is a macOS, Windows, and Linux app for inspecting your React JS and React Native apps. for detail about reactotron you can refer this link

```
 https://github.com/infinitered/reactotron
```

## Generate Third-Party Key

# OneSignal 
used for push notification signaling
- Create a Firebase project if you haven’t already and configure it for android https://console.firebase.google.com
- sign in to https://onesignal.com (sign up to create an account)
- Select Google Android, from the OneSignal Settings → Platforms
- select React Native on Configure Platform dialog and add Firebase Server Key and a Sender ID 
- go to settings → Keys & IDs → copy OneSignal App ID to RN_oneSignal on .env file

# AppCenter
used for OTA update via CodePush
- login to https://appcenter.ms/ (sign up to create an account)
- click Add new to create new apps environment
- copy app secret to RN_CODEPUSH_ANDROID_KEY on .env file

