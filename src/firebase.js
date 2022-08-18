import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const config = {
  apiKey: "AIzaSyD1UnYMTWjjgV57Zie8Fh4GZkTW2nk98hY",
  authDomain: "maby-8fe31.firebaseapp.com",
  projectId: "maby-8fe31",
  storageBucket: "maby-8fe31.appspot.com",
  messagingSenderId: "401440894126",
  appId: "1:401440894126:web:cdbb901ad90fb9e718d13f",
  measurementId: "G-JRZE23W3EC",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise(async (resolve, reject) => {
    const token = await messaging.getToken();

    resolve(token);
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
