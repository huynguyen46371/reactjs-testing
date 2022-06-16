import { Button, Checkbox, Form, Input, Space } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import "./App.css";
import { requestFirebaseNotificationPermission } from "./firebase";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithCredential,
  getIdToken,
} from "firebase/auth";

const API = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 1000,
});

function App() {
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState("");
  const fcmToken = localStorage.getItem("fcmToken");

  const startGoogle = () => {
    gapi.auth2.init({
      client_id:
        "1072316615470-8hrstmj8m8gnps2kovo0psffm7shcfau.apps.googleusercontent.com", // google client id
    });
  };

  useEffect(() => {
    requestFirebaseNotificationPermission().then((fcm) => {
      localStorage.setItem("fcmToken", fcm);
    });

    gapi.load("client:auth2", startGoogle);
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
    <div className="App">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          email: "+84947754271",
          password: "123",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <div id="recaptcha-container" />

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Space>
        <GoogleLogin
          clientId="1072316615470-8hrstmj8m8gnps2kovo0psffm7shcfau.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin appId="691844758756625" callback={handleFacebookLogin} />
      </Space>

      <Input value={code} onChange={(event) => setCode(event.target.value)} />
      <Button
        onClick={async () => {
          console.log("🚀 ~ confirm", confirm);
          if (confirm) {
            const c = await confirm.confirm(code);
            console.log(c);
          }
        }}
      >
        Code
      </Button>
    </div>
  );
}

export default App;
