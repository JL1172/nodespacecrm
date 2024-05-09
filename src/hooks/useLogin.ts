import { useState } from "react";
import { signIn } from "../utils/authentication-endpoint";

export type LoginStateType = {
  username: string;
  password: string;
  usernameError: string;
  passwordError: string;
};

export const initialState: LoginStateType = {
  username: "",
  password: "",
  usernameError: "",
  passwordError: "",
};

export const useLogin = (
  state: LoginStateType,
  nav: (address: string) => void
): [
  LoginStateType,
  typeof change,
  typeof submit,
  typeof spinnerOn,
  typeof globalError,
  typeof changeLandingPageError,
  typeof landingPageError
] => {
  const [landingPageError, setLandingPageError] = useState<string>("");
  const [globalError, setGlobalError] = useState<string>("");
  const [spinnerOn, setSpinnerOn] = useState<boolean>(false);
  const [data, setData] = useState(state);
  const change = (name: string, value: string) => {
    setData((data) => ({ ...data, [name]: value }));
  };
  const changeLandingPageError = (err: string) => {
    setLandingPageError(err);
    setTimeout(() => {
      setLandingPageError("");
    }, 3000);
  };
  const submit = async () => {
    setSpinnerOn(true);
    setData((data) => ({
      ...data,
      usernameError: "",
      passwordError: "",
    }));
    setGlobalError("");
    try {
      const res = await signIn({
        username: data.username,
        password: data.password,
      });
      const token = res.data.token;
      window.localStorage.setItem("token", token);
      nav("/protected");
      //eslint-disable-next-line
    } catch (err: any) {
      const usernameMessage = err?.response?.data?.message?.username;
      const passwordMessage = err?.response?.data?.message?.password;
      if (!usernameMessage || !passwordMessage) {
        setGlobalError(
          err?.response.data.message || "An Unexpected Problem Occurred."
        );
      } else {
        setData((data) => ({
          ...data,
          usernameError: usernameMessage,
          passwordError: passwordMessage,
        }));
      }
    } finally {
      setTimeout(() => {
        setGlobalError("");
      }, 2000);
      setSpinnerOn(false);
    }
  };
  return [
    data,
    change,
    submit,
    spinnerOn,
    globalError,
    changeLandingPageError,
    landingPageError,
  ];
};
