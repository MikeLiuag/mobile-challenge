# Mobile Dev Challenge

Hello! Thank you for participating in our selection process for the Mobile Engineer role at Kickserv.

The purpose of this challenge is to assess your React Native skills. This challenge should be completed by you and only you. The implementation and choice of tools may be discussed at another stage of the process.

Please make sure to read all this document before starting.

## Running locally

Make sure you have all the necessary dependencies installed on your system:

- Node.js
- Ruby
- Xcode
- CocoaPods
- Android Studio and all Java dependencies.

You can follow the instructions on the React Native docs to set up your local environment: https://reactnative.dev/docs/environment-setup

To run the project locally:

- Clone the repo
- Install the dependencies with `npm install`
- Run `cd ios && pod install && cd ..` to install all iOS dependencies
- Run the dev server with `npx react-native start`
- Build and Run the app with `npx react-native run-ios` for the iOS version or `npx react-native run-android` for the Android version

If you have problems with any of the instructions above, please refer to the React Native docs. This is a newly created app and the latest instructions there should help you get your environment up and running without issues.

Please keep in mind that this app doesn't use Expo and we need you to run the app with the React Native CLI.

## The Challenge

In this repo we have provided the skeleton of an app along with some prebuilt screens. You will have to build some extra functionalities on top of them, integrate an HTTP API and add tests. We have included some screenshots to help you implement the missing screens.

The API you're gonna use is [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction). It's free to use but you'll need to create a new account and request an API key. You should find all the instructions to get an API key in the linked docs. Please reach out if you encounter any issues getting an API key or using the API.

## Requirements

For a full list of requirements, please refer to the [REQUIREMENTS.md](./REQUIREMENTS.md) file in this repo

## Delivery

To deliver the challenge, please create a PR against the `main` branch on this repo.

We expect candidates to take 4 - 6 hours to complete this challenge. Please take your time and make sure to review your code for bugs, performance issues but above all, have fun!

Don't hesitate to reach out with any questions. Just try to do it as early as possible to avoid any blockages.

**One last thing**, please add tests. We are really interested in seeing how you write and structure tests.
