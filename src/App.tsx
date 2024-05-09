import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import { useNavigate } from "react-router-dom";
import { GlobalNavigationContext } from "./contexts/GlobalNavigationContext";
import SignUp from "./pages/SignUp";
import { initialState, useLogin } from "./hooks/useLogin";
import ProtectRoute from "./components/ProtectedRoute";

export default function App() {
  const nav = useNavigate();
  const [loginData, change, submit, spinnerOn, globalError, setLandingPageError, landingPageError] = useLogin(
    initialState,
    nav
  );
  return (
    <GlobalNavigationContext.Provider
      value={{ nav, change, loginData, submit, spinnerOn, globalError, setLandingPageError, landingPageError }}
    >
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/protected" element={<ProtectRoute />} />
      </Routes>
    </GlobalNavigationContext.Provider>
  );
}
