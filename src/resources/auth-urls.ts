import { BASE_URL } from "./base-url";

const AUTH_BASE = BASE_URL + "api/auth";

export type AuthUrlsType = {
  signIn: string;
  signUp: string;
  changePswrd: string;
  verifyCode: string;
  resetPswrd: string;
};

export const AuthUrls: AuthUrlsType = {
  signIn: AUTH_BASE + "/login",
  signUp: AUTH_BASE + "/registration",
  changePswrd: AUTH_BASE + "/registration",
  verifyCode: AUTH_BASE + "/verify-code",
  resetPswrd: AUTH_BASE + "/reset-password",
};
