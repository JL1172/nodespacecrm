import { BASE_URL } from "./base-url";

const AUTH_BASE = BASE_URL + "api/auth";

export type AuthUrlsType = {
  signIn: string;
  signUp: string;
  changePswrd: string;
  verifyCode: string;
  resetPswrd: string;
  validateToken: string;
  logout: string;
  generateEmailVerificationCode: string;
  verifyEmail: string;
};

export const AuthUrls: AuthUrlsType = {
  signIn: AUTH_BASE + "/login",
  signUp: AUTH_BASE + "/registration",
  changePswrd: AUTH_BASE + "/change-password",
  verifyCode: AUTH_BASE + "/verify-code",
  resetPswrd: AUTH_BASE + "/reset-password",
  validateToken: AUTH_BASE + "/restricted",
  logout: AUTH_BASE + "/logout",
  generateEmailVerificationCode: AUTH_BASE + "/generate-verification-code",
  verifyEmail: AUTH_BASE + "/verify-email",
};
