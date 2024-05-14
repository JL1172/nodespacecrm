import axios from "axios";
import { AuthUrls } from "./auth-urls";
import { RegisterStateType } from "../hooks/useRegister";

export const signIn = (creds: { username: string; password: string }) => {
  return axios.post(AuthUrls.signIn, creds);
};

export const signUp = (creds: RegisterStateType) => {
  return axios.post(AuthUrls.signUp, creds);
};

export const validateToken = (token: string) => {
  return axios
    .create({ headers: { Authorization: token } })
    .get(AuthUrls.validateToken);
};

export const logout = (token: string) => {
  return axios
    .create({ headers: { Authorization: token } })
    .get(AuthUrls.logout);
};

export const firstStepPasswordReset = (email: string) => {
  return axios.post(AuthUrls.changePswrd, { email: email });
};

export const secondStepPasswordReset = (reqBody: {
  email: string;
  verification_code: string;
}) => {
  return axios.post(AuthUrls.verifyCode, reqBody);
};
export const thirdStepPasswordReset = (reqBody: {
  password: string;
  confirmedPassword: string;
}) => {
  const token = window.localStorage.getItem("token");
  return axios
    .create({ headers: { Authorization: token } })
    .post(AuthUrls.resetPswrd, reqBody);
};

