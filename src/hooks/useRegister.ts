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
};

export const useRegister = (
  state: RegisterStateType
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
    for (const key in state) {
      if (/Err/.test(key)) {
        errReset[key] = {};
      } else if (key === "isRegisterSpinnerLoading") {
        errReset[key] = true;
      } else {
        errReset[key] = state[key];
      }
    }
    setData(errReset);
    try {
      const credsToSend: RegisterStateType = {};
      for (const key in state) {
        if (!/Err/.test(key) && !/Spinner/.test(key)) {
          credsToSend[key] = state[key];
        }
      }
      const res = await signUp(credsToSend);
      console.log(res);
      //todo need to figure out success steps, redirecting, clearing local storage, setting email to localstorage
    } catch (err) {
      console.log(err);
      //todo need to figure out error handling, individual and then general.
    } finally {
      setData((data) => ({ ...data, isRegisterSpinnerLoading: false }));
      setTimeout(() => {}, 3000);
    }
  };
  return [data, changeRegisterData, submitRegistrationData];
};
