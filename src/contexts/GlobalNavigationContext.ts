import { createContext } from "react";
import { LoginStateType } from "../hooks/useLogin";
import { ChangePasswordBody } from "../hooks/useResetPassword";
import { RegisterStateType } from "../hooks/useRegister";
import { VerifyEmailBody } from "../hooks/useVerifyEmail";

type GlobalNaviationContextType = {
  nav: (address: string) => void;
  change: (name: string, value: string) => void;
  loginData: LoginStateType;
  submit: () => void;
  spinnerOn: boolean;
  globalError: string;
  setLandingPageError: (message: string) => void;
  landingPageError: string;
  resetData: ChangePasswordBody;
  resetChange: (name: string, value: string | boolean) => void;
  firstStepOfPswrdReset: () => void;
  changeHandlerForVerificationCode: (name: string, idx: number) => void;
  secondStepOfPasswordResetProcess: () => void;
  regenerateVerificationCode: () => void;
  thirdStepOfPasswordResetProcess: () => void;
  registerData: RegisterStateType;
  changeRegisterData: (name: string, value: string | boolean | number) => void;
  submitRegisterData: () => void;
  changeVerifyEmailData: (value: string, idx: number) => void;
  verifyEmailData: VerifyEmailBody;
  submitVerificationCode: () => void;
  generateNewVerificationCode: () => void;
  handleChangeForEmail: (email: string) => void;
  submitEmail: () => Promise<void>;
};

export const GlobalNavigationContext = createContext<
  GlobalNaviationContextType | undefined
>(undefined);
