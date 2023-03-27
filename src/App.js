import { gapi } from "gapi-script";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { requestFirebaseNotificationPermission } from "./firebase";

const clientId =
  "503680745865-fmij5kcfrluhid1pr05onmb19cb366gf.apps.googleusercontent.com";

function App() {
  const errorResponseGoogle = (response) => {
    console.log("f", response);
  };

  const successResponseGoogle = (response) => {
    console.log("s", response);
  };

  const home = async () => {
    requestFirebaseNotificationPermission().then((fcm) => {
      console.log("🚀 ~ fcm", fcm);
      localStorage.setItem("fcm", fcm);
    });
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId,
        scope: "",
      });
    });

    home();
  }, []);

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={successResponseGoogle}
        onFailure={errorResponseGoogle}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

export default App;
