import { createContext } from "react";
import { LoginStateType } from "../hooks/useLogin";

type GlobalNaviationContextType = {
  nav: (address: string) => void;
  change: (name: string, value: string) => void;
  loginData: LoginStateType;
  submit: () => void;
  spinnerOn: boolean;
  globalError: string;
  setLandingPageError: (message: string) => void;
  landingPageError: string;
};

export const GlobalNavigationContext = createContext<
  GlobalNaviationContextType | undefined
>(undefined);
