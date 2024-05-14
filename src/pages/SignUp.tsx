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
import { StyledSignUp } from "../styles/page-styles/StyledSignUp";
import FallingSpinner from "../components/LoadingSpinner";

const defaultTheme = createTheme();

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const { ...state } = React.useContext(GlobalNavigationContext);
  const { changeRegisterData, submitRegisterData, nav } = state;
  const {
    isRedirectingSpinnerLoading,
    isRegisterSpinnerLoading,
    emailErr,
    passwordErr,
    firstNameErr,
    lastNameErr,
    usernameErr,
    username,
    first_name,
    last_name,
    password,
    email,
    age,
    ageErr,
    generalRegistrationErr,
  } = state.registerData;
  return (
    //todo need to work on error handling 
    <StyledSignUp>
      {isRegisterSpinnerLoading ? (
        <FallingSpinner />
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <IoArrowBack
            onClick={() => nav("/")}
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
            maxWidth="xs"
            sx={{
              height: "90dvh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CssBaseline />
            <Box
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
                Sign up
              </Typography>
              <Box
                component="form"
                onClick={(e) => e.preventDefault()}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={first_name}
                      onChange={(e) =>
                        changeRegisterData(e.target.name, e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      onChange={(e) =>
                        changeRegisterData(e.target.name, e.target.value)
                      }
                      fullWidth
                      id="last_name"
                      value={last_name}
                      label="Last Name"
                      name="last_name"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={(e) =>
                        changeRegisterData(e.target.name, e.target.value)
                      }
                      value={email}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      onChange={(e) =>
                        changeRegisterData(e.target.name, e.target.value)
                      }
                      fullWidth
                      value={username}
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="age"
                      onChange={(e) =>
                        changeRegisterData(e.target.name, e.target.value)
                      }
                      value={age}
                      type="number"
                      label="Age"
                      name="age"
                      autoComplete="age"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ position: "relative" }}>
                    <TextField
                      required
                      fullWidth
                      onChange={(e) =>
                        changeRegisterData(e.target.name, e.target.value)
                      }
                      value={password}
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
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    submitRegisterData();
                  }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={() => nav("/sign-in")} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </StyledSignUp>
  );
}
