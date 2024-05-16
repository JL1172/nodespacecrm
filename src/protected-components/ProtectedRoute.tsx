import { useContext, useEffect, useState } from "react";
import { validateToken } from "../utils/authentication-endpoint";
import Dashboard from "../pages/Dashboard";
import FallingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { GlobalNavigationContext } from "../contexts/GlobalNavigationContext";

export default function ProtectRoute() {
  const nav = useNavigate();
  const [success, setSuccess] = useState(false);
  const {...state} = useContext(GlobalNavigationContext);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function validateJwt(t: string): Promise<void> {
      try {
        const res = await validateToken(t);
        setSuccess(res.data.authorized);
      } catch (err) {
        state.setLandingPageError('Unauthorized.');
        setSuccess(false);
        nav("/");
      }
    }
    validateJwt(token + "");
  }, []); //eslint-disable-line
  return success ? <Dashboard /> : <FallingSpinner />;
}
