import { createContext } from "react";
import { LoginStateType } from "../hooks/useLogin";
import { ChangePasswordBody } from "../hooks/useResetPassword";

type GlobalNaviationContextType = {
  nav: (address: string) => void;
  change: (name: string, value: string) => void;
  loginData: LoginStateType;
  submit: () => void;
  spinnerOn: boolean;
  globalError: string;
  setLandingPageError: (message: string) => void;
  landingPageError: string;
  resetData: ChangePasswordBody,
  resetChange: (name: string, value: string | boolean) => void;
  firstStepOfPswrdReset: () => void;
  changeHandlerForVerificationCode: (name:string, idx: number) => void;
  secondStepOfPasswordResetProcess: () => void;
  regenerateVerificationCode: () => void;
  thirdStepOfPasswordResetProcess: () => void;
};

export const GlobalNavigationContext = createContext<
  GlobalNaviationContextType | undefined
>(undefined);
