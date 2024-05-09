import { useState } from "react";
import { logout } from "../utils/authentication-endpoint";

export type DashboardStateType = {
  globalError: string;
  open: boolean;
};
export const initialStateForDashBoard: DashboardStateType = {
  globalError: "",
  open: true,
};

export const useDashBoard = (
  state: DashboardStateType,
  nav: (address: string) => void
): [DashboardStateType, typeof change, typeof log_out] => {
  const [data, setData] = useState(state);
  const change = (name: string, value: string | boolean) => {
    setData((data) => ({ ...data, [name]: value }));
  };
  const log_out = async () => {
    try {
      const token = window.localStorage.getItem("token");
      await logout(token + "");
      window.localStorage.clear();
      nav('/')
    } catch (err) {
      //nothing necessary for this
    }
  };
  return [data, change, log_out];
};
