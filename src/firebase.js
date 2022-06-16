import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const config = {
  apiKey: "AIzaSyDCwdE_e-xFdCMN-m6c1_0ECFnDZb8UU7w",
  authDomain: "vbike-c71cb.firebaseapp.com",
  projectId: "vbike-c71cb",
  storageBucket: "vbike-c71cb.appspot.com",
  messagingSenderId: "337667559060",
  appId: "1:337667559060:web:220c623c61dd0a46d16e81",
  measurementId: "G-LZYBDHNPTC",
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
