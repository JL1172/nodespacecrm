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
import ResetPassword from "./pages/ResetPassword";
import { registerInitialState, useRegister } from "./hooks/useRegister";
import {
  initialStateForVerifyingEmail,
  useVerifyEmail,
} from "./hooks/useVerifyEmail";
import VerifyEmail from "./pages/VerifyEmail";

export default function App() {
  const nav = useNavigate();
  const [verifyEmailData, changeVerifyEmailData] = useVerifyEmail(
    initialStateForVerifyingEmail,
    nav
  );
  const [registerData, changeRegisterData, submitRegisterData] = useRegister(
    registerInitialState,
    nav
  );
  const [
    loginData,
    change,
    submit,
    spinnerOn,
    globalError,
    setLandingPageError,
    landingPageError,
  ] = useLogin(initialState, nav);
  const [
    resetData,
    resetChange,
    firstStepOfPswrdReset,
    changeHandlerForVerificationCode,
    secondStepOfPasswordResetProcess,
    regenerateVerificationCode,
    thirdStepOfPasswordResetProcess,
  ] = useResetPassword(initialResetPassword, nav);
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
        regenerateVerificationCode,
        thirdStepOfPasswordResetProcess,
        registerData,
        changeRegisterData,
        submitRegisterData,
        changeVerifyEmailData,
        verifyEmailData,
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/verify-code" element={<VerificationCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/protected" element={<ProtectRoute />} />
      </Routes>
    </GlobalNavigationContext.Provider>
  );
}
