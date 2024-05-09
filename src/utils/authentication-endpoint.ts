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
