import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import { useNavigate } from "react-router-dom";
import { GlobalNavigationContext } from "./contexts/GlobalNavigationContext";
import SignUp from "./pages/SignUp";
import { initialState, useLogin } from "./hooks/useLogin";

export default function App() {
  const nav = useNavigate();
  const [loginData, change, submit, spinnerOn, globalError] = useLogin(initialState);
  return (
    <GlobalNavigationContext.Provider
      value={{ nav, change, loginData, submit, spinnerOn, globalError }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </GlobalNavigationContext.Provider>
  );
}
