import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [isValidCaptcha, setIsValidCaptcha] = useState(true);
  const [isValidUser, setIsValidUser] = useState(false);
  const captcha = useRef();

  const onChange = () => {
    if (captcha.current.getValue()) {
      setIsValidCaptcha(true);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (captcha.current.getValue()) {
      setIsValidUser(true);
      setIsValidCaptcha(true);
    } else {
      setIsValidUser(false);
      setIsValidCaptcha(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen min-w-[320px] place-content-center place-items-center">
        {!isValidUser ? (
          <>
            <h1>Sign Up</h1>
            <article className="rounded-sm p-4 border-2 border-stone-700 mt-5">
              <form className="flex flex-col gap-4" action="" onSubmit={submit}>
                <input
                  className="rounded-sm px-2 py-1"
                  type="text"
                  name="user"
                  id="user"
                  placeholder="User"
                />
                <input
                  className="rounded-sm px-2 py-1"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <input
                  className="rounded-sm px-2 py-1"
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="Repeat password"
                />
                <ReCAPTCHA
                  ref={captcha}
                  sitekey={import.meta.env.VITE_API_KEY_CAPTCHA}
                  onChange={onChange}
                />
                {!isValidCaptcha && (
                  <p className="text-red-500 text-center">
                    Please, complete the captcha
                  </p>
                )}
                <button type="submit">Sign Up</button>
              </form>
            </article>
          </>
        ) : (
          <h1>Welcome</h1>
        )}
      </div>
    </>
  );
}

export default App;
