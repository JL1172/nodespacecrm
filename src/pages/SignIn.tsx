import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalNavigationContext } from "../contexts/GlobalNavigationContext";
import { IoArrowBack, IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import FallingSpinner from "../components/LoadingSpinner";
import { Alert } from "@mui/material";
import { StyledSignIn } from "../styles/page-styles/StyledSignIn";

const defaultTheme = createTheme();

export default function SignIn() {
  const { ...state } = React.useContext(GlobalNavigationContext);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <StyledSignIn>
      {state.globalError && (
        <Alert
          severity="error"
          sx={{ position: "fixed", top: "0", width: "100%", zIndex: 2 }}
        >
          {state.globalError}
        </Alert>
      )}
      {state.spinnerOn && <FallingSpinner />}
      {!state.spinnerOn && (
        <ThemeProvider theme={defaultTheme}>
          <IoArrowBack
            onClick={() => state.nav("/")}
            id="arrow-pointer"
            style={{
              position: "fixed",
              top: "1rem",
              left: "1rem",
              width: "1.2rem",
              height: "1.2rem",
              cursor: "pointer",
            }}
          />
          <Container
            component="main"
            sx={{
              height: "100dvh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CssBaseline />
            <Box
              className="box"
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                className="inner-box"
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <TextField
                  onChange={(e) => state.change(e.target.name, e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={state.loginData.username}
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                {state.loginData.usernameError && (
                  <Alert
                    variant="outlined"
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {Object.values(state.loginData.usernameError).map(
                      (n, i) => {
                        return (
                          <span
                            style={{ display: "flex", flexDirection: "column" }}
                            key={i}
                          >
                            {n}
                          </span>
                        );
                      }
                    )}
                  </Alert>
                )}
                <div className="relative">
                  <TextField
                    required
                    fullWidth
                    onChange={(e) =>
                      state.change(e.target.name, e.target.value)
                    }
                    value={state.loginData.password}
                    name="password"
                    label="Password"
                    type={passwordVisible === true ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                  />
                  {passwordVisible === true ? (
                    <IoEyeOutline
                      id="password-visibility"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  ) : (
                    <IoEyeOffSharp
                      id="password-visibility"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  )}
                </div>
                {state.loginData.passwordError && (
                  <Alert
                    variant="outlined"
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {Object.values(state.loginData.passwordError).map(
                      (n, i) => {
                        return (
                          <span
                            style={{ display: "flex", flexDirection: "column" }}
                            key={i}
                          >
                            {n}
                          </span>
                        );
                      }
                    )}
                  </Alert>
                )}
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    state.submit();
                  }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      sx={{ cursor: "pointer" }}
                      onClick={() => state.nav("/change-password")}
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      sx={{ cursor: "pointer" }}
                      onClick={() => state.nav("/sign-up")}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </StyledSignIn>
    //   );
  );
}
