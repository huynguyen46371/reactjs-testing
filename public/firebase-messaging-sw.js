importScripts("https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js"
);

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
