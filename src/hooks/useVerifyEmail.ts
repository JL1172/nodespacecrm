import { useState } from "react";
import {
  generateVerifyEmailCode,
  verifyEmailCode,
} from "../utils/authentication-endpoint";

export type VerifyEmailBody = {
  email: string;
  verification_code: string[];
  verifyEmailSpinner: boolean;
  generalErrorForVerifyEmail: string;
  emailErrorMessage: boolean;
  generateNewCodeStatus: boolean;
  newCodeSuccessMessage: boolean;
};

export const initialStateForVerifyingEmail: VerifyEmailBody = {
  email: "",
  verification_code: ["", "", "", "", "", ""],
  verifyEmailSpinner: false,
  generalErrorForVerifyEmail: "",
  generateNewCodeStatus: false,
  emailErrorMessage: false,
  newCodeSuccessMessage: false,
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
    try {
      setData(initialStateForVerifyingEmail);
      setData((data) => ({ ...data, generateNewCodeStatus: true }));
      const email = window.localStorage.getItem("email") + "" || data.email;
      if (!email) {
        setData(initialStateForVerifyingEmail);
        setData((data) => ({
          ...data,
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
      }
      const res = await generateVerifyEmailCode({ email: email + "" });
      setData((data) => ({
        ...data,
        generateNewCodeStatus: false,
        newCodeSuccessMessage: true,
      }));
      setTimeout(() => {
        setData(initialStateForVerifyingEmail);
      }, 3000);
      console.log(res);
      //eslint-disable-next-line
    } catch (err: any) {
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
    } finally {
      setData((data) => ({
        ...data,
        generateNewCodeStatus: false,
        newCodeSuccessMessage: false,
      }));
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
      const email = window.localStorage.getItem("email");
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
      }
      const reqBody = {
        email: email + "",
        verification_code: data.verification_code.join(""),
      };
      const res = await verifyEmailCode(reqBody);
      console.log(res);
      //eslint-disable-next-line
    } catch (err: any) {
      console.log(err);
      setData((data) => ({
        ...data,
        generalErrorForVerifyEmail: err?.response?.data?.message,
        verification_code: new Array(6).fill(""),
      }));
      setTimeout(() => {
        setData((data) => ({ ...data, generalErrorForVerifyEmail: "" }));
      }, 3000);
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
