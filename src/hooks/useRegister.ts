import { useState } from "react";
import { signUp } from "../utils/authentication-endpoint";

export type RegisterStateType = {
  //eslint-disable-next-line
  [key: string]: any;
  email?: string;
  first_name?: string;
  last_name?: string;
  age?: number;
  username?: string;
  password?: string;
  emailErr?: Record<string, string>;
  firstNameErr?: Record<string, string>;
  lastNameErr?: Record<string, string>;
  ageErr?: Record<string, string>;
  usernameErr?: Record<string, string>;
  passwordErr?: Record<string, string>;
  generalRegistrationErr?: string;
  isRegisterSpinnerLoading?: boolean;
  isRedirectingSpinnerLoading?: boolean;
  company_name?: string;
  companyNameErr?: Record<string, string>;
  redirectSuccessMessage?: string;
};
export const registerInitialState: RegisterStateType = {
  email: "",
  first_name: "",
  last_name: "",
  age: 0,
  username: "",
  password: "",
  emailErr: {},
  firstNameErr: {},
  lastNameErr: {},
  ageErr: {},
  usernameErr: {},
  passwordErr: {},
  generalRegistrationErr: "",
  isRegisterSpinnerLoading: false,
  isRedirectingSpinnerLoading: false,
  company_name: "",
  companyNameErr: {},
  redirectSuccessMessage: "",
};

export const useRegister = (
  state: RegisterStateType, nav: (address:string) => void,
): [
  RegisterStateType,
  typeof changeRegisterData,
  typeof submitRegistrationData
] => {
  const [data, setData] = useState(state);
  const changeRegisterData = (
    name: string,
    value: string | number | boolean
  ): void => {
    setData((data) => ({ ...data, [name]: value }));
  };
  const submitRegistrationData = async () => {
    const errReset: RegisterStateType = {};
    for (const key in data) {
      if (/Err/.test(key) && key !== "generalRegistrationErr") {
        errReset[key] = {};
      } else if (key === "isRegisterSpinnerLoading") {
        errReset[key] = true;
      } else {
        errReset[key] = data[key];
      }
    }
    errReset["generalRegistrationErr"] = "";
    setData(errReset);
    try {
      const credsToSend: RegisterStateType = {};
      for (const key in data) {
        if (!/Err/.test(key) && !/Spinner/.test(key)) {
          credsToSend[key] = data[key];
        }
      }
      credsToSend.age = Number(credsToSend.age);
      const res = await signUp(credsToSend);
      window.localStorage.clear();
      window.localStorage.setItem('email', data.email + "");
      setData(data => ({...data, redirectSuccessMessage: res.data.message}))
      nav('/verify-email')
      setTimeout(() => {
        setData(registerInitialState)
      }, (5000));
      //todo need to figure out success steps, redirecting, clearing local storage, setting email to localstorage
      //eslint-disable-next-line
    } catch (err: any) {
      if (
        err?.response?.data?.message !== "Too Many Registration Attempts." &&
        err?.response?.data?.message !== "An Unexpected Problem Occurred." &&
        err?.response?.data?.message !==
          "Username and Email Already Associated With A Different Account."
      ) {
        const {
          email = {},
          first_name = {},
          last_name = {},
          password = {},
          username = {},
          age = {},
          company_name = {},
        } = err.response.data.message;
        setData((data) => ({
          ...data,
          emailErr: email,
          firstNameErr: first_name,
          lastNameErr: last_name,
          passwordErr: password,
          usernameErr: username,
          ageErr: age,
          companyNameErr: company_name,
        }));
      } else {
        setData((data) => ({
          ...data,
          generalRegistrationErr:
            err.response.data.message || "An Unexpected Problem Occurred.",
        }));
        setTimeout(() => {
          setData((data) => ({ ...data, generalRegistrationErr: "" }));
        }, 3000);
      }
      //todo need to figure out error handling, individual and then general.
    } finally {
      setData((data) => ({ ...data, isRegisterSpinnerLoading: false }));
    }
  };
  return [data, changeRegisterData, submitRegistrationData];
};
