import { useState } from "react";

export type VerifyEmailBody = {
  email: string;
  verification_code: string[];
  verifyEmailSpinner: boolean;
  emailError: string;
  codeError: string;
  generalErrorForVerifyEmail: string;
  generateNewCodeStatus: boolean;
  newCodeSuccessMessage: boolean;
};

export const initialStateForVerifyingEmail: VerifyEmailBody = {
  email: "",
  verification_code: ["", "", "", "", "", ""],
  verifyEmailSpinner: false,
  codeError: "",
  emailError: "",
  generalErrorForVerifyEmail: "",
  generateNewCodeStatus: false,
  newCodeSuccessMessage: false,
};
export const useVerifyEmail = (
  state: VerifyEmailBody,
  nav: (address: string) => void
): [VerifyEmailBody, typeof change] => {
  const [data, setData] = useState(state);
  const change = (value: string, idx: number) => {
      setData((data) => ({
        ...data,
        verification_code: data.verification_code.map((n, i) =>
          idx === i ? (n = value) : n
        ),
      }));
  };
  const generateNewVerificationCode = async() => {

  }
  const submitVerificationCode = async () => {
    try {

    } catch (err) {
      
    }
  }
  return [data, change];
};
