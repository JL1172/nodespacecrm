import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import { useNavigate } from "react-router-dom";
import { GlobalNavigationContext } from "./contexts/GlobalNavigationContext";
import SignUp from "./pages/SignUp";
import { initialState, useLogin } from "./hooks/useLogin";
import ProtectRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import {
  initialResetPassword,
  useResetPassword,
} from "./hooks/useResetPassword";
import VerificationCode from "./pages/VerificationCode";

export default function App() {
  const nav = useNavigate();
  const [
    loginData,
    change,
    submit,
    spinnerOn,
    globalError,
    setLandingPageError,
    landingPageError,
  ] = useLogin(initialState, nav);
  const [resetData, resetChange, firstStepOfPswrdReset, changeHandlerForVerificationCode,secondStepOfPasswordResetProcess,regenerateVerificationCode] = useResetPassword(
    initialResetPassword,
    nav
  );
  return (
    <GlobalNavigationContext.Provider
      value={{
        nav,
        change,
        loginData,
        submit,
        spinnerOn,
        globalError,
        setLandingPageError,
        landingPageError,
        resetData,
        resetChange,
        firstStepOfPswrdReset,
        changeHandlerForVerificationCode,
        secondStepOfPasswordResetProcess,
        regenerateVerificationCode
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/verify-code" element={<VerificationCode />} />
        <Route path="/protected" element={<ProtectRoute />} />
      </Routes>
    </GlobalNavigationContext.Provider>
  );
}
