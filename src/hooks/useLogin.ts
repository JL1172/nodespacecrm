import { useState } from "react";

type LoginStateType = {
  username: string;
  password: string;
};

export const initialState: LoginStateType = {
  username: "",
  password: "",
};

export const useLogin = (state: LoginStateType) => {
  const [data, setData] = useState(state);
  const change = (name: string, value: string) => {
    setData((data) => ({ ...data, [name]: value }));
  };
  const submit = () => {
    
  }
};
