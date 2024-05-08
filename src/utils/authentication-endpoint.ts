import { LoginStateType } from "../hooks/useLogin";
import axios from "axios";
import { AuthUrls } from "../resources/auth-urls";
import { RegisterStateType } from "../hooks/useRegister";

export const signIn = (creds: LoginStateType) => {
  return axios.post(AuthUrls.signIn, creds);
};

export const signUp = (creds: RegisterStateType) => {
  return axios.post(AuthUrls.signUp, creds);
};
