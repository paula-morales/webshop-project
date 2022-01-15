# Webshop

## Project built with React v 17.0.2

In this project I use Firebase, Sass and Bootstrap

## Development server

Run `npm install` to install dependencies.

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Firebase settings

You need to connect your Firebase database creating a file called `keys.js` in `src/config`

```
export const FirebaseConfig = {
  apiKey: "XXXXXXX",
  authDomain: "project-name.firebaseapp.com",
  projectId: "project-name",
  storageBucket: "project-name.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX",
  measurementId: "XXXXX",
};
```
