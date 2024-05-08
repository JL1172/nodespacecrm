import { createContext } from "react";

type GlobalNaviationContextType = {
  nav: (address: string) => void;
};

export const GlobalNavigationContext = createContext<
  GlobalNaviationContextType | undefined
>(undefined);
