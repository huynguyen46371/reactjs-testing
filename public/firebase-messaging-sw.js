importScripts("https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js"
);

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

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log(event);
  return event;
});
