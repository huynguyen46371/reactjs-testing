importScripts("https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js"
);

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
