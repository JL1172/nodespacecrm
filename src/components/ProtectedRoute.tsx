import { useEffect, useState } from "react";
import { validateToken } from "../utils/authentication-endpoint";
import Dashboard from "../pages/Dashboard";
import FallingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function ProtectRoute() {
  const nav = useNavigate();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function validateJwt(t: string): Promise<void> {
      try {
        const res = await validateToken(t);
        console.log(res);
        setSuccess(true);
      } catch (err) {
        console.log(err);
        setSuccess(false);
        nav("/");
      }
    }
    validateJwt(token + "");
  }, []);//eslint-disable-line
  return success ? <Dashboard /> : <FallingSpinner />;
}
