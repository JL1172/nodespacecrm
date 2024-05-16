import { useState } from "react";
import {
  generateVerifyEmailCode,
  verifyEmailCode,
} from "../utils/authentication-endpoint";

export type VerifyEmailBody = {
  email: string;
  verification_code: string[];
  generalErrorForVerifyEmail: string;
  verifyEmailSpinner: boolean;
  loadingSpinner: boolean;
  emailErrorMessage: boolean;
  successfullySentSpinner: boolean;
  successMessageForEmailVerification: string;
};

export const initialStateForVerifyingEmail: VerifyEmailBody = {
  email: "",
  verification_code: ["", "", "", "", "", ""],
  verifyEmailSpinner: false,
  generalErrorForVerifyEmail: "",
  loadingSpinner: false,
  successfullySentSpinner: false,
  emailErrorMessage: false,
  successMessageForEmailVerification: "",
};
export const useVerifyEmail = (
  state: VerifyEmailBody,
  nav: (address: string) => void
): [
  VerifyEmailBody,
  typeof change,
  typeof submitVerificationCode,
  typeof generateNewVerificationCode,
  typeof handleChangeForEmail,
  typeof submitEmail
] => {
  const [data, setData] = useState(state);
  const change = (value: string, idx: number) => {
    setData((data) => ({
      ...data,
      verification_code: data.verification_code.map((n, i) =>
        idx === i ? (n = value) : n
      ),
    }));
  };
  const generateNewVerificationCode = async () => {
    setData((data) => ({
      ...data,
      loadingSpinner: true,
      generalErrorForVerifyEmail: "",
    }));
    try {
      const email = window.localStorage.getItem("email") || data.email;
      if (!email) {
        console.log(email);
        setData((data) => ({
          ...data,
          verification_code: new Array(6).fill(""),
          successfullySentSpinner: false,
          loadingSpinner: false,
          generalErrorForVerifyEmail:
            "An Unexpected Problem Occurred, Enter Email Address To Continue.",
          emailErrorMessage: true,
        }));
        setTimeout(() => {
          setData((data) => ({
            ...data,
            generalErrorForVerifyEmail: "",
          }));
        }, 4000);
      } else {
        await generateVerifyEmailCode({ email: email + "" });
        window.localStorage.clear();
        window.localStorage.setItem("email", email);
        setData((data) => ({
          ...data,
          loadingSpinner: false,
          emailErrorMessage: false,
          successfullySentSpinner: true,
        }));
        setTimeout(() => {
          setData((data) => ({
            ...data,
            generalErrorForVerifyEmail: "",
          }));
        }, 5000);
      }
      //eslint-disable-next-line
    } catch (err: any) {
      if (
        err?.response?.data?.message?.response ===
        "Account Already Verified, Proceed To Login."
      ) {
        setData((data) => ({
          ...data,
          successMessageForEmailVerification:
            err?.response?.data?.message?.response + " Redirecting soon.",
        }));
        setTimeout(() => {
          setData(initialStateForVerifyingEmail);
          window.localStorage.clear();
          nav("/sign-in");
        }, 3000);
      } else {
        if (typeof err?.response?.data?.message === "string") {
          setData((data) => ({
            ...data,
            generalErrorForVerifyEmail: err.response.data.message,
          }));
        } else {
          setData((data) => ({
            ...data,
            generalErrorForVerifyEmail: Object.values(
              err.response.data.message.email
            ).join(""),
          }));
        }
        setTimeout(() => {
          setData((data) => ({ ...data, generalErrorForVerifyEmail: "" }));
        }, 3000);
      }
    } finally {
      setTimeout(() => {
        setData((data) => ({
          ...data,
          loadingSpinner: false,
          successfullySentSpinner: false,
        }));
      }, 5000);
    }
  };

  const handleChangeForEmail = (value: string) => {
    setData((data) => ({ ...data, email: value }));
  };
  const submitEmail = async () => {
    // window.localStorage.clear();
    // window.localStorage.setItem("email", data.email);
    // setData(initialStateForVerifyingEmail);
    // await generateNewVerificationCode();
  };
  const submitVerificationCode = async () => {
    try {
      setData((data) => ({ ...data, verifyEmailSpinner: true }));
      const email = window.localStorage.getItem("email") || data.email;
      if (!email) {
        setData(initialStateForVerifyingEmail);
        window.localStorage.clear();
        setData((data) => ({
          ...data,
          generalErrorForVerifyEmail:
            "An Unexpected Problem Occurred. Enter Email To Send New Code.",
          emailErrorMessage: true,
        }));
        setTimeout(() => {
          setData((data) => ({
            ...data,
            generalErrorForVerifyEmail: "",
          }));
        }, 4000);
      } else {
        const reqBody = {
          email: email + "",
          verification_code: data.verification_code.join(""),
        };
        const res = await verifyEmailCode(reqBody);
        setData((data) => ({
          ...data,
          successMessageForEmailVerification: res.data + " Redirecting soon.",
        }));
        setTimeout(() => {
          setData(initialStateForVerifyingEmail);
          window.localStorage.clear();
          nav("/sign-in");
        }, 3000);
      }
      //eslint-disable-next-line
    } catch (err: any) {
      if (
        err?.response?.data?.message?.response ===
        "Account Already Verified. Proceed To Sign In."
      ) {
        setData((data) => ({
          ...data,
          successMessageForEmailVerification:
            err?.response?.data?.message.response + " Redirecting soon.",
        }));
        setTimeout(() => {
          setData(initialStateForVerifyingEmail);
          window.localStorage.clear();
          nav("/sign-in");
        }, 3000);
      } else {
        setData((data) => ({
          ...data,
          generalErrorForVerifyEmail: err?.response?.data?.message,
          verification_code: new Array(6).fill(""),
        }));
        setTimeout(() => {
          setData((data) => ({ ...data, generalErrorForVerifyEmail: "" }));
        }, 3000);
      }
    } finally {
      setData((data) => ({ ...data, verifyEmailSpinner: false }));
    }
  };
  return [
    data,
    change,
    submitVerificationCode,
    generateNewVerificationCode,
    handleChangeForEmail,
    submitEmail,
  ];
};
