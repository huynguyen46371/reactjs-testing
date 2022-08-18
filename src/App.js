import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "antd/dist/antd.css";
import axios from "axios";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import "./App.css";
import { requestFirebaseNotificationPermission } from "./firebase";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51LQlJUGgUSYiE8h9tAopzaSKuTesQXGwKdNCSHebTxYdeA3jqKkrXOrvZxUahAdlwmsuNd5XnIG3ZRUmYObmG0o200rD60B9Oj"
);

const API = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 100000,
});

function App() {
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState("");
  const fcmToken = localStorage.getItem("fcmToken");

  useEffect(() => {
    requestFirebaseNotificationPermission().then((fcm) => {
      console.log("🚀 ~ fcm", fcm);
      localStorage.setItem("fcmToken", fcm);
    });
  }, []);

  const handleFacebookLogin = async (response) => {
    const login = await API.post("/auth/facebook", {
      accessToken: response.accessToken,
      fcmToken,
    });
    console.log("🚀 ~ login Facebook", login.data);
  };

  const handleGoogleLogin = async (response) => {
    const login = await API.post("/auth/google", {
      accessToken: response.accessToken,
      fcmToken,
    });
    console.log("🚀 ~ login Google", login.data);
  };

  const onFinish = async ({ remember, ...values }) => {
    console.log("🚀 ~ values", values);
    // const login = await API.post("/auth/login", { ...values, fcmToken });
    // console.log("🚀 ~ login", login.data);
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, values.email, appVerifier)
      .then((confirmationResult) => {
        console.log("🚀 ~ confirmationResult", confirmationResult);
        console.log("🚀 ~ verificationId", confirmationResult.verificationId);
        setConfirm(confirmationResult);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // ...
      })
      .catch((error) => {
        console.log("🚀 ~ error", error);
        // Error; SMS not sent
        // ...
      });
  };

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default App;
