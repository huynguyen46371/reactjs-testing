import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const config = {
  apiKey: "AIzaSyDRhnn2US1qsJFviDHWIytnswB8bRqbe_M",
  authDomain: "t-message-e4e09.firebaseapp.com",
  projectId: "t-message-e4e09",
  storageBucket: "t-message-e4e09.appspot.com",
  messagingSenderId: "503680745865",
  appId: "1:503680745865:web:5c9098a54701b7f158a158",
  measurementId: "G-PEFZ3M51T8",
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
