import { useState } from "react";
import {
  firstStepPasswordReset,
  secondStepPasswordReset,
} from "../utils/authentication-endpoint";

// email: string;
export type ChangePasswordBody = {
  email: string;
  verification_code: string[];
  password: string;
  confirmedPassword: string;
  firstStepError: string;
  firstStepSuccessMessage: string;
  firstStepGeneralError: string;
  secondStepError: string;
  secondStepGeneralError: string;
  thirdStepError: string;
  thirdStepGeneralError: string;
  secondStepSuccess: string;
  spinnerOn: boolean;
  loading: boolean;
  loading2: boolean;
};

export const initialResetPassword: ChangePasswordBody = {
  email: "",
  verification_code: ["", "", "", "", "", ""],
  password: "",
  confirmedPassword: "",
  firstStepError: "",
  firstStepSuccessMessage: "",
  firstStepGeneralError: "",
  secondStepError: "",
  secondStepGeneralError: "",
  thirdStepError: "",
  thirdStepGeneralError: "",
  secondStepSuccess: "",
  spinnerOn: false,
  loading: false,
  loading2: false,
};

export const useResetPassword = (
  state: ChangePasswordBody,
  nav: (address: string) => void
): [
  ChangePasswordBody,
  typeof change,
  typeof firstStepOfPasswordResetProcess,
  typeof changeHandlerForVerificationCode,
  typeof secondStepOfPasswordResetProcess,
  typeof regenerateVerificationCode
] => {
  const [data, setData] = useState(state);
  const change = (name: string, value: string | boolean) => {
    setData((data) => ({ ...data, [name]: value }));
  };
  const changeHandlerForVerificationCode = (value: string, idx: number) => {
    setData((data) => ({
      ...data,
      verification_code: data.verification_code.map((n, i) =>
        idx === i ? (n = value) : n
      ),
    }));
  };
  const firstStepOfPasswordResetProcess = async () => {
    setData((data) => ({ ...data, spinnerOn: true, firstStepError: "" }));
    try {
      const res = await firstStepPasswordReset(data.email);
      setData((data) => ({ ...data, firstStepSuccessMessage: res.data }));
      window.localStorage.setItem("email", data.email);
      nav("/verify-code");
      //eslint-disable-next-line
    } catch (err: any) {
      const emailMessage = err?.response?.data?.message?.email?.isNotEmpty;
      if (!emailMessage) {
        setData((data) => ({
          ...data,
          firstStepGeneralError:
            err?.response?.data?.message || "An Unexpected Error Occurred.",
        }));
      } else {
        setData((data) => ({ ...data, firstStepError: emailMessage }));
      }
    } finally {
      setData((data) => ({ ...data, spinnerOn: false }));
      setTimeout(() => {
        setData((data) => ({
          ...data,
          firstStepGeneralError: "",
          firstStepSuccessMessage: "",
        }));
      }, 4000);
    }
  };
  const regenerateVerificationCode = async () => {
    setData((data) => ({
      ...data,
      loading: true,
      firstStepSuccessMessage: "",
    }));
    try {
      const email = window.localStorage.getItem("email");
      const res = await firstStepPasswordReset(email + "");
      setData((data) => ({
        ...data,
        loading: false,
        loading2: true,
        firstStepSuccessMessage: res.data,
      }));
      setTimeout(() => {
        setData((data) => ({
          ...data,
          loading2: false,
          firstStepSuccessMessage: "",
        }));
      }, 4000);
    } catch (err) {
      setData((data) => ({
        ...data,
        firstStepGeneralError:
          "Error Generating New Code. Restart Reset Password Process.",
      }));
      setTimeout(() => {
        setData((data) => ({ ...data, firstStepGeneralError: "" }));
      }, 4000);
      nav("/change-password");
    } finally {
      setTimeout(() => {
        setData((data) => ({ ...data, loading: false }));
      }, 1000);
    }
  };
  const secondStepOfPasswordResetProcess = async () => {
    setData((data) => ({ ...data, spinnerOn: true, secondStepError: "" }));
    try {
      const email = window.localStorage.getItem("email");
      const res = await secondStepPasswordReset({
        email: email + "",
        verification_code: data.verification_code.join(""),
      });
      window.localStorage.clear();
      setData((data) => ({ ...data, secondStepSuccess: res.data.message }));
      window.localStorage.setItem("token", res.data.token);
      nav("/reset-password");
      setTimeout(() => {
        setData((data) => ({ ...data, secondStepSuccess: "" }));
      }, 4000);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setData((data) => ({
        ...data,
        spinnerOn: false,
        verification_code: ["", "", "", "", "", ""],
      }));
      setTimeout(() => {
        setData((data) => ({ ...data, secondStepGeneralError: "" }));
      }, 3000);
    }
  };
  return [
    data,
    change,
    firstStepOfPasswordResetProcess,
    changeHandlerForVerificationCode,
    secondStepOfPasswordResetProcess,
    regenerateVerificationCode,
  ];
};
